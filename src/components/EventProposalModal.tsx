import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Upload, X, FileText, Calendar, Users, DollarSign, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface EventProposalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EventProposalModal = ({ open, onOpenChange }: EventProposalModalProps) => {
  const { toast } = useToast();
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    description: "",
    date: "",
    time: "",
    duration: "",
    venue: "",
    expectedAttendees: "",
    budget: "",
    organizer: "",
    email: "",
    phone: "",
    department: "",
    specialRequirements: "",
    marketingPlan: "",
  });

  const resetForm = () => {
    setFormData({
      eventName: "",
      eventType: "",
      description: "",
      date: "",
      time: "",
      duration: "",
      venue: "",
      expectedAttendees: "",
      budget: "",
      organizer: "",
      email: "",
      phone: "",
      department: "",
      specialRequirements: "",
      marketingPlan: "",
    });
    setUploadedFile(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setUploadedFile(file);
        toast({
          title: "File uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file only.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.eventName || !formData.eventType || !formData.description || !formData.organizer || !formData.email) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare the data for Supabase
      const proposalData = {
        event_name: formData.eventName,
        event_type: formData.eventType,
        description: formData.description,
        event_date: formData.date,
        start_time: formData.time,
        end_time: formData.time, // Using same time for now, can be enhanced
        venue: formData.venue || 'TBD',
        expected_participants: parseInt(formData.expectedAttendees) || 0,
        budget_estimate: parseFloat(formData.budget) || 0,
        organizer_name: formData.organizer,
        organizer_email: formData.email,
        organizer_phone: formData.phone || null,
        additional_requirements: formData.specialRequirements || null,
        objectives: formData.marketingPlan || null,
        status: 'pending'
      };

      const { error } = await supabase
        .from('event_proposals')
        .insert([proposalData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Proposal submitted successfully!",
        description: "Your event proposal has been submitted for review. You'll hear back within 24-48 hours.",
      });
      
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Error submitting proposal:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your proposal. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    const hasData = Object.values(formData).some(value => value.trim() !== "") || uploadedFile;
    
    if (hasData) {
      setShowConfirmCancel(true);
    } else {
      onOpenChange(false);
    }
  };

  const confirmCancel = () => {
    toast({
      title: "Proposal canceled",
      description: "Your event proposal has been canceled.",
      variant: "destructive",
    });
    resetForm();
    setShowConfirmCancel(false);
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      handleCancel();
    } else {
      onOpenChange(newOpen);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Submit Event Proposal
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your event proposal. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Event Details */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Event Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Event Name *</Label>
                  <Input
                    id="eventName"
                    value={formData.eventName}
                    onChange={(e) => handleInputChange("eventName", e.target.value)}
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <Label htmlFor="eventType">Event Type *</Label>
                  <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="seminar">Seminar</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Event Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Provide a detailed description of your event"
                    rows={4}
                  />
                </div>
              </div>
            </Card>

            {/* Event Logistics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Event Logistics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="date">Event Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Start Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange("duration", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 hour</SelectItem>
                      <SelectItem value="2-hours">2 hours</SelectItem>
                      <SelectItem value="3-hours">3 hours</SelectItem>
                      <SelectItem value="half-day">Half day</SelectItem>
                      <SelectItem value="full-day">Full day</SelectItem>
                      <SelectItem value="multi-day">Multiple days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="venue">Preferred Venue</Label>
                  <Input
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    placeholder="e.g., Auditorium, Classroom, Outdoor"
                  />
                </div>
                <div>
                  <Label htmlFor="expectedAttendees">Expected Attendees</Label>
                  <Input
                    id="expectedAttendees"
                    type="number"
                    value={formData.expectedAttendees}
                    onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
                    placeholder="Number of attendees"
                  />
                </div>
                <div>
                  <Label htmlFor="budget">Estimated Budget (₹)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => handleInputChange("budget", e.target.value)}
                    placeholder="0"
                  />
                </div>
              </div>
            </Card>

            {/* Organizer Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Organizer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="organizer">Primary Organizer *</Label>
                  <Input
                    id="organizer"
                    value={formData.organizer}
                    onChange={(e) => handleInputChange("organizer", e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@iiitd.ac.in"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department/Club</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                    placeholder="Your department or club"
                  />
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                    placeholder="Any special equipment, permissions, or arrangements needed"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="marketingPlan">Marketing & Promotion Plan</Label>
                  <Textarea
                    id="marketingPlan"
                    value={formData.marketingPlan}
                    onChange={(e) => handleInputChange("marketingPlan", e.target.value)}
                    placeholder="How do you plan to promote this event?"
                    rows={3}
                  />
                </div>
              </div>
            </Card>

            {/* File Upload */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Supporting Documents
              </h3>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <div className="mb-2">
                  <Label htmlFor="file-upload" className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80">
                    Upload PDF document
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload budget breakdown, venue plans, or other supporting documents (PDF only, max 10MB)
                </p>
                {uploadedFile && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                    <FileText className="h-4 w-4" />
                    {uploadedFile.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                      className="h-auto p-1"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmCancel} onOpenChange={setShowConfirmCancel}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancellation</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to cancel? All your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirmCancel(false)}>
              Continue Editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};