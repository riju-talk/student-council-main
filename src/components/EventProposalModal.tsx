import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface EventProposalFormData {
  event_name: string;
  event_type: string;
  description: string;
  organizer_email: string;
  organizer_phone: string;
}

interface EventProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventProposalModal = ({
  open,
  onOpenChange,
}: EventProposalModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<EventProposalFormData>({
    event_name: "",
    event_type: "",
    description: "",
    organizer_email: "",
    organizer_phone: "",
  });
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const resetForm = () => {
    setFormData({
      event_name: "",
      event_type: "",
      description: "",
      organizer_email: "",
      organizer_phone: "",
    });
    setUploadedFile(null);
  };

  const handleInputChange = (field: keyof EventProposalFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (
        file.type === "application/pdf" ||
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setUploadedFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document only.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const requiredFields: (keyof EventProposalFormData)[] = [
      "event_name",
      "event_type",
      "organizer_email",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: `Please fill in all required fields: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let pdfUrl = "";

      // Upload file if exists
      if (uploadedFile) {
        const fileExt = uploadedFile.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `event_documents/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("event-documents")
          .upload(filePath, uploadedFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from("event-documents")
          .getPublicUrl(filePath);

        pdfUrl = publicUrl;
      }

      // Prepare data for submission matching database schema
      const submissionData = {
        event_name: formData.event_name,
        event_type: formData.event_type,
        description: formData.description,
        organizer_email: formData.organizer_email,
        organizer_phone: formData.organizer_phone || null,
        pdf_document_url: pdfUrl || null,
      };

      // Insert event proposal
      const { error } = await supabase
        .from("event_proposals")
        .insert([submissionData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Event proposal submitted successfully!",
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast({
        title: "Error",
        description: "Failed to submit event proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Check if form has any data to show confirmation dialog
    const hasData = Object.values(formData).some(value => 
      value !== "" && value !== 0 && value !== "0"
    ) || uploadedFile !== null;

    if (hasData) {
      setShowConfirmCancel(true);
    } else {
      resetForm();
      onOpenChange(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Event Proposal</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your event proposal for review.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {/* Event Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Event Information</h3>

                <div>
                  <Label htmlFor="event_name">Event Name *</Label>
                  <Input
                    id="event_name"
                    value={formData.event_name}
                    onChange={(e) => handleInputChange("event_name", e.target.value)}
                    placeholder="Enter event name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="event_type">Event Type *</Label>
                  <select
                    id="event_type"
                    value={formData.event_type}
                    onChange={(e) => handleInputChange("event_type", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  >
                    <option value="">Select event type</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="competition">Competition</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Provide a detailed description of your event"
                    rows={4}
                    required
                  />
                </div>


                <div>
                  <Label>Upload Document (Optional)</Label>
                  <div className="mt-1 flex items-center gap-2">
                    <label
                      htmlFor="file-upload"
                      className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
                    >
                      <Upload className="h-4 w-4" />
                      <span>
                        {uploadedFile ? uploadedFile.name : "Upload PDF/DOC"}
                      </span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                    </label>
                    {uploadedFile && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setUploadedFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF or Word document (max 5MB)
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>

                <div>
                  <Label htmlFor="organizer_email">Email *</Label>
                  <Input
                    id="organizer_email"
                    type="email"
                    value={formData.organizer_email}
                    onChange={(e) => handleInputChange("organizer_email", e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organizer_phone">Phone Number</Label>
                  <Input
                    id="organizer_phone"
                    type="tel"
                    value={formData.organizer_phone}
                    onChange={(e) => handleInputChange("organizer_phone", e.target.value)}
                    placeholder="+91 1234567890"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Proposal"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmCancel} onOpenChange={setShowConfirmCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Any unsaved changes will be lost. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep editing</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};