import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2 } from "lucide-react";

const eventClosureSchema = z.object({
  eventId: z.string().min(1, "Please select an event"),
  reason: z.string().min(10, "Please provide a detailed reason for closure (minimum 10 characters)"),
});

type EventClosureFormData = z.infer<typeof eventClosureSchema>;

/** Match the real event_proposals columns (no event_date / venue / organizer_name etc.) */
interface ApprovedEvent {
  id: string;
  event_name: string;
  organizer_email?: string | null;
  organizer_phone?: string | null;
  event_type?: string | null;
  description?: string | null;
  pdf_document_url?: string | null;
  status?: string | null;
  created_at?: string | null; // ISO string from Supabase
}

interface EventClosureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventClosureModal = ({ open, onOpenChange }: EventClosureModalProps) => {
  const [approvedEvents, setApprovedEvents] = useState<ApprovedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<EventClosureFormData>({
    resolver: zodResolver(eventClosureSchema),
    defaultValues: {
      eventId: "",
      reason: "",
    },
  });

  const fetchApprovedEvents = async () => {
    setLoading(true);
    try {
      // Select only columns that exist in your schema.
      const { data: events, error } = await supabase
        .from("event_proposals")
        .select(
          "id, event_name, organizer_email, organizer_phone, event_type, description, pdf_document_url, status, created_at"
        )
        .order("created_at", { ascending: true });

      if (error) throw error;

      setApprovedEvents((events ?? []) as ApprovedEvent[]);
    } catch (err) {
      console.error("Error fetching events:", err);
      // Show a helpful toast with the error message if available
      const message = (err as any)?.message || "Failed to fetch events.";
      toast({
        title: "Error fetching events",
        description: message,
        variant: "destructive",
      });
      setApprovedEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) fetchApprovedEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onSubmit = async (data: EventClosureFormData) => {
    setSubmitting(true);
    try {
      const selectedEvent = approvedEvents.find(e => e.id === data.eventId);
      if (!selectedEvent) throw new Error("Selected event not found");
  
      // 1️⃣ Delete dependent approvals for this event
      const { error: approvalsError } = await supabase
        .from("approvals")
        .delete()
        .eq("proposal_id", data.eventId);
  
      if (approvalsError) throw approvalsError;
  
      // 2️⃣ Delete the event from proposals
      const { error: eventError } = await supabase
        .from("event_proposals")
        .delete()
        .eq("id", data.eventId);
  
      if (eventError) throw eventError;
      
      const { error: closedEventError } = await supabase
        .from("closed_events")
        .update({
          reason: data.reason,
        })
        .eq("name", selectedEvent.event_name);
      
      if (closedEventError) throw closedEventError;
      
      toast({
        title: "Event Closed Successfully",
        description: "The event was removed from proposals.",
      });
  
      form.reset();
      onOpenChange(false);
      fetchApprovedEvents(); // refresh
    } catch (err) {
      console.error("Error closing event:", err);
      toast({
        title: "Error closing event",
        description: (err as any)?.message || "Failed to close the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedEvent = approvedEvents.find((e) => e.id === form.watch("eventId"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Trash2 className="h-5 w-5 text-destructive" />
            Close Event
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Event Closure Instructions</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Select an approved event from the dropdown below</li>
              <li>• Provide a detailed reason for event closure</li>
              <li>• This action will permanently remove the event from the system</li>
              <li>• Use this form to verify events and delete proposals from the portal</li>
            </ul>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="eventId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Event to Close *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loading ? "Loading events..." : "Select an event to close"} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {loading ? (
                          <SelectItem value="loading" disabled>
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading events...
                            </div>
                          </SelectItem>
                        ) : approvedEvents.length === 0 ? (
                          <SelectItem value="no-events" disabled>
                            No approved events found
                          </SelectItem>
                        ) : (
                          approvedEvents.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{event.event_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {event.created_at ? new Date(event.created_at).toLocaleDateString() : "—"} • {event.event_type ?? "—"} • {event.organizer_email ?? "—"}
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedEvent && (
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">Selected Event Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Event Name:</span>
                      <p className="text-muted-foreground">{selectedEvent.event_name}</p>
                    </div>
                    <div>
                      <span className="font-medium">Created:</span>
                      <p className="text-muted-foreground">{selectedEvent.created_at ? new Date(selectedEvent.created_at).toLocaleString() : "—"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Organizer Email:</span>
                      <p className="text-muted-foreground">{selectedEvent.organizer_email ?? "—"}</p>
                    </div>
                    <div>
                      <span className="font-medium">Organizer Phone:</span>
                      <p className="text-muted-foreground">{selectedEvent.organizer_phone ?? "—"}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium">Type:</span>
                      <p className="text-muted-foreground">{selectedEvent.event_type ?? "—"}</p>
                    </div>
                    {selectedEvent.description && (
                      <div className="col-span-2">
                        <span className="font-medium">Description:</span>
                        <p className="text-muted-foreground text-sm">{selectedEvent.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Closure *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed reason for closing this event (e.g., event completed successfully, cancelled due to circumstances, etc.)"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={submitting || !form.watch("eventId")}
                  className="flex-1"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Closing Event...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Close Event
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
