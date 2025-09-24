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
import { sendClosureEmail } from "@/integrations/supabase/email";

const eventClosureSchema = z.object({
  eventId: z.string().min(1, "Please select an event"),
  reason: z.string().min(10, "Please provide a detailed reason for closure (minimum 10 characters)"),
});

type EventClosureFormData = z.infer<typeof eventClosureSchema>;

interface ApprovedEvent {
  id: string;
  event_name: string;
  event_date: string;
  organizer_name: string;
  organizer_email: string;
  venue: string;
  status?: string;
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
      // Get all event proposals from the table
      const { data: events, error } = await supabase
        .from('event_proposals')
        .select('id, event_name, event_date, organizer_name, organizer_email, venue, status')
        .order('event_date', { ascending: true });

      if (error) throw error;
      setApprovedEvents(events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to fetch events. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchApprovedEvents();
    }
  }, [open]);

  const onSubmit = async (data: EventClosureFormData) => {
    setSubmitting(true);
    try {
      // First, delete dependent approvals
      const { error: approvalsError } = await supabase
        .from("approvals")
        .delete()
        .eq("proposal_id", data.eventId);
  
      if (approvalsError) throw approvalsError;
  
      // Then delete the event itself
      const { error: eventError } = await supabase
        .from("event_proposals")
        .delete()
        .eq("id", data.eventId);
  
      if (eventError) throw eventError;
  
      // ✅ Send mail notifications to all authorized admins
      await sendClosureEmail(data.eventId, data.reason);
  
      toast({
        title: "Event Closed Successfully",
        description: "The selected event has been removed and admins notified.",
      });
  
      form.reset();
      onOpenChange(false);
      fetchApprovedEvents(); // Refresh list
    } catch (error) {
      console.error("Error closing event:", error);
      toast({
        title: "Error",
        description: "Failed to close the event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const selectedEvent = approvedEvents.find(event => event.id === form.watch('eventId'));

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
              <li>• Select any event from the dropdown below</li>
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
                            No events found
                          </SelectItem>
                        ) : (
                          approvedEvents.map((event) => (
                            <SelectItem key={event.id} value={event.id}>
                              <div className="flex flex-col items-start">
                                <span className="font-medium">{event.event_name}</span>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(event.event_date).toLocaleDateString()} • {event.venue} • by {event.organizer_name} • Status: {event.status || 'pending'}
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
                      <span className="font-medium">Date:</span>
                      <p className="text-muted-foreground">{new Date(selectedEvent.event_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="font-medium">Venue:</span>
                      <p className="text-muted-foreground">{selectedEvent.venue}</p>
                    </div>
                    <div>
                      <span className="font-medium">Organizer:</span>
                      <p className="text-muted-foreground">{selectedEvent.organizer_name}</p>
                    </div>
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
                  disabled={submitting || !form.watch('eventId')}
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