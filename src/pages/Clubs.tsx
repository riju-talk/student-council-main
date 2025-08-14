import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Mail, Users, FileText, Plus } from "lucide-react";

const Clubs = () => {
  const [isNewClubModalOpen, setIsNewClubModalOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const { toast } = useToast();

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clubs")
        .select("*")
        .eq("is_active", true)
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const handleNewClubSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormSubmitting(true);
    
    const formData = new FormData(event.currentTarget);

    try {
      const clubData = {
        club_name: formData.get("clubName") as string,
        proposed_by_name: formData.get("proposedByName") as string,
        proposed_by_email: formData.get("proposedByEmail") as string,
        proposed_by_phone: (formData.get("proposedByPhone") as string) || null,
        club_description: formData.get("clubDescription") as string,
        club_objectives: formData.get("clubObjectives") as string,
        faculty_advisor: (formData.get("facultyAdvisor") as string) || null,
        initial_members: (formData.get("initialMembers") as string).split(",").map(m => m.trim()).filter(m => m.length > 0),
        proposed_activities: (formData.get("proposedActivities") as string) || null,
        status: 'pending'
      };

      const { error } = await supabase
        .from("club_formation_requests")
        .insert([clubData]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      toast({
        title: "Club Formation Request Submitted",
        description: "Your request has been submitted successfully and will be reviewed by the council.",
      });

      setIsNewClubModalOpen(false);
      event.currentTarget.reset();
    } catch (error) {
      console.error("Error submitting club formation request:", error);
      toast({
        title: "Error",
        description: "Failed to submit club formation request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsFormSubmitting(false);
    }
  };

  const clubGuidelines = [
    "At least 15 active members and 3 co-ordinators are required for any club to exist. The 3 co-ordinators can be a part of the 15 active members.",
    "There must be at least two activities per semester.",
    "The internal website of the club should be regularly updated. It shall, at least, have an updated list of club members, events list, budget details, and contact details of co-ordinators.",
    "If any club has a requirement of a visiting instructor, there must be at least 15 interested students who will benefit from it.",
    "The tentative annual budget should be provided to the Student Council (when the new session starts). The budget can be ZERO depending on the nature of the group. The club must give a justification for the usage of money, and a strong justification must be provided if the requirement is more than Rs. 30,000.",
    "The detailed breakdown of the budget (in terms of events, inventory, etc.) should be provided as well."
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Student Clubs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our vibrant community of student clubs and organizations. Join existing clubs or propose a new one!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline">
              <a href="/club-charter.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                Club Charter
              </a>
            </Button>
            <Dialog open={isNewClubModalOpen} onOpenChange={setIsNewClubModalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Propose New Club
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Propose a New Club</DialogTitle>
                  <DialogDescription>
                    Fill out this form to propose a new student club. All fields are required.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleNewClubSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clubName">Club Name</Label>
                      <Input id="clubName" name="clubName" required />
                    </div>
                    <div>
                      <Label htmlFor="facultyAdvisor">Faculty Advisor</Label>
                      <Input id="facultyAdvisor" name="facultyAdvisor" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proposedByName">Your Name</Label>
                      <Input id="proposedByName" name="proposedByName" required />
                    </div>
                    <div>
                      <Label htmlFor="proposedByEmail">Your Email</Label>
                      <Input id="proposedByEmail" name="proposedByEmail" type="email" required />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="proposedByPhone">Your Phone</Label>
                    <Input id="proposedByPhone" name="proposedByPhone" type="tel" />
                  </div>
                  
                  <div>
                    <Label htmlFor="clubDescription">Club Description</Label>
                    <Textarea id="clubDescription" name="clubDescription" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="clubObjectives">Club Objectives</Label>
                    <Textarea id="clubObjectives" name="clubObjectives" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="proposedActivities">Proposed Activities</Label>
                    <Textarea id="proposedActivities" name="proposedActivities" required />
                  </div>
                  
                  <div>
                    <Label htmlFor="initialMembers">Initial Members (comma-separated names)</Label>
                    <Textarea id="initialMembers" name="initialMembers" placeholder="John Doe, Jane Smith, ..." required />
                  </div>
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsNewClubModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isFormSubmitting}>
                      {isFormSubmitting ? "Submitting..." : "Submit Proposal"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Club Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Club Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clubGuidelines.map((guideline, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-sm">{guideline}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Clubs List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Active Clubs</h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clubs.map((club) => (
                  <Card key={club.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{club.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {club.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {club.description && (
                        <p className="text-sm text-muted-foreground">{club.description}</p>
                      )}
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4" />
                          <span className="font-medium">Coordinator:</span>
                          <span>{club.coordinator_name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4" />
                          <a 
                            href={`mailto:${club.coordinator_email}`}
                            className="text-primary hover:underline"
                          >
                            {club.coordinator_email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {club.channel_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={club.channel_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Channel
                            </a>
                          </Button>
                        )}
                        
                        {club.instagram_link && (
                          <Button size="sm" variant="outline" asChild>
                            <a href={club.instagram_link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Instagram
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Clubs;