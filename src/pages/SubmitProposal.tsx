import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, Send, Calendar, Users, DollarSign } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SubmitProposal = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventType: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    expectedAttendees: "",
    budget: "",
    organizer: "",
    contactEmail: "",
    contactPhone: "",
    requirements: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Proposal Submitted Successfully!",
        description: "Your event proposal has been submitted for review. You'll receive an update within 48 hours.",
      });
      setIsSubmitting(false);
      // Reset form
      setFormData({
        eventTitle: "",
        eventType: "",
        description: "",
        date: "",
        time: "",
        venue: "",
        expectedAttendees: "",
        budget: "",
        organizer: "",
        contactEmail: "",
        contactPhone: "",
        requirements: ""
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/20 text-accent">
                <FileText className="h-3 w-3 mr-2" />
                Event Proposal
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Submit Event Proposal</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have an idea for a campus event? Submit your proposal here with all the necessary details. 
                Our team will review it within 48 hours.
              </p>
            </div>

            {/* Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-accent" />
                    Basic Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventTitle">Event Title *</Label>
                      <Input
                        id="eventTitle"
                        value={formData.eventTitle}
                        onChange={(e) => handleInputChange("eventTitle", e.target.value)}
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select onValueChange={(value) => handleInputChange("eventType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="social">Social Service</SelectItem>
                          <SelectItem value="entrepreneurship">Entrepreneurship</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe your event in detail..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Event Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-accent" />
                    Event Details
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="time">Event Time *</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="venue">Preferred Venue *</Label>
                      <Input
                        id="venue"
                        value={formData.venue}
                        onChange={(e) => handleInputChange("venue", e.target.value)}
                        placeholder="Auditorium, Open Ground, etc."
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="expectedAttendees">Expected Attendees *</Label>
                      <Input
                        id="expectedAttendees"
                        type="number"
                        value={formData.expectedAttendees}
                        onChange={(e) => handleInputChange("expectedAttendees", e.target.value)}
                        placeholder="Number of expected attendees"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Estimated Budget (₹) *</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        placeholder="Estimated budget in rupees"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Users className="h-5 w-5 mr-2 text-accent" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="organizer">Organizer Name *</Label>
                      <Input
                        id="organizer"
                        value={formData.organizer}
                        onChange={(e) => handleInputChange("organizer", e.target.value)}
                        placeholder="Your name or club name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="your.email@iiitd.ac.in"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone *</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="Your phone number"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-accent" />
                    Additional Requirements
                  </h3>
                  <div>
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="Any special equipment, permissions, or arrangements needed..."
                      rows={3}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="documents">Upload Documents (PDF)</Label>
                    <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your files here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Upload event proposal, budget plan, venue requirements (PDF only, max 10MB)
                      </p>
                      <Input type="file" accept=".pdf" multiple className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Upload className="h-5 w-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Submit Proposal
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    By submitting this proposal, you agree to the event guidelines and policies of IIIT Delhi.
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubmitProposal;