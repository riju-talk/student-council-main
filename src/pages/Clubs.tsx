import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Mail, Users, FileText, Plus, ChevronDown, ChevronUp, Eye, EyeOff, Search } from "lucide-react";

const Clubs = () => {
  const [isNewClubModalOpen, setIsNewClubModalOpen] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [visibleCards, setVisibleCards] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  // Toggle between showing description or coordinators/contact for each card
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});

  const toggleExpanded = (clubId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [clubId]: !prev[clubId]
    }));
  };

  const toggleVisible = (clubId: string) => {
    setVisibleCards(prev => ({
      ...prev,
      [clubId]: !prev[clubId]
    }));
  };

  const toggleDetails = (clubId: string) => {
    setShowDetails(prev => ({
      ...prev,
      [clubId]: !prev[clubId]
    }));
  };

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

  // Filter clubs by search
  const filteredClubs = clubs.filter((club: any) =>
    club.name?.toLowerCase().includes(search.toLowerCase()) ||
    club.category?.toLowerCase().includes(search.toLowerCase()) ||
    club.description?.toLowerCase().includes(search.toLowerCase())
  );

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

      if (event.currentTarget) {
        event.currentTarget.reset();
      }
      setIsNewClubModalOpen(false);
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Subtle animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Animated grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          style={{ zIndex: 1 }}
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#8884"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Animated bubbles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute bg-primary/20 rounded-full blur-2xl animate-bubble-slow"
            style={{ width: 180, height: 180, left: '10%', top: '10%' }} />
          <div className="absolute bg-accent/20 rounded-full blur-2xl animate-bubble-medium"
            style={{ width: 120, height: 120, left: '70%', top: '30%' }} />
          <div className="absolute bg-primary/10 rounded-full blur-2xl animate-bubble-fast"
            style={{ width: 100, height: 100, left: '50%', top: '70%' }} />
        </div>
        <style>
          {`
            @keyframes bubbleSlow {
              0% { transform: translateY(0) scale(1);}
              50% { transform: translateY(-30px) scale(1.05);}
              100% { transform: translateY(0) scale(1);}
            }
            @keyframes bubbleMedium {
              0% { transform: translateY(0) scale(1);}
              50% { transform: translateY(-20px) scale(1.08);}
              100% { transform: translateY(0) scale(1);}
            }
            @keyframes bubbleFast {
              0% { transform: translateY(0) scale(1);}
              50% { transform: translateY(-15px) scale(1.12);}
              100% { transform: translateY(0) scale(1);}
            }
            .animate-bubble-slow { animation: bubbleSlow 12s ease-in-out infinite; }
            .animate-bubble-medium { animation: bubbleMedium 8s ease-in-out infinite; }
            .animate-bubble-fast { animation: bubbleFast 6s ease-in-out infinite; }
          `}
        </style>
      </div>
      <Header />
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Student Clubs</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our vibrant community of student clubs and organizations. Join existing clubs or propose a new one!
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <Input
                type="text"
                placeholder="Search clubs by name, category, or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
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
                  <Card key={i} className="animate-pulse rounded-2xl shadow-xl bg-gradient-to-br from-background to-accent/10 border-0">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClubs.map((club: any) => {
                  const isDetails = showDetails[club.id] ?? false;
                  const description = club.description || "";
                  const shouldShowReadMore = description.length > 120;
                  const displayDescription = shouldShowReadMore && !isDetails
                    ? description.slice(0, 120) + "..."
                    : description;

                  return (
                    <Card
                      key={club.id}
                      className="hover:shadow-2xl transition-shadow h-full flex flex-col rounded-2xl bg-gradient-to-br from-background to-accent/10 border-0 shadow-xl hover:scale-[1.03] transition-transform duration-300 group relative overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute -inset-1 bg-gradient-to-tr from-accent/30 to-primary/10 blur-2xl opacity-30 group-hover:opacity-50 transition-opacity pointer-events-none" />
                      <CardHeader className="pb-3 relative z-10">
                        <div className="flex items-start gap-3">
                          <Avatar className="h-14 w-14 flex-shrink-0 ring-4 ring-accent/30 shadow-lg bg-white">
                            <AvatarImage src="/placeholder.svg" alt={club.name} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {club.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg leading-tight">{club.name}</CardTitle>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {club.category}
                            </Badge>
                          </div>
                          {/* Toggle details button */}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2"
                            onClick={() => toggleDetails(club.id)}
                            title={isDetails ? "Show Description" : "Show Coordinators & Contacts"}
                          >
                            {isDetails ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col space-y-4 relative z-10">
                        {!isDetails ? (
                          // Show description
                          <div>
                            <p className="text-sm text-muted-foreground">{displayDescription}</p>
                            {shouldShowReadMore && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleDetails(club.id)}
                                className="h-auto p-0 mt-1 text-primary hover:text-primary/80"
                              >
                                Show Coordinators & Contacts <ChevronDown className="h-3 w-3 ml-1" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          // Show coordinators and contacts
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <div className="flex items-start gap-2 text-sm">
                                <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-foreground">Coordinators:</span>
                                  <div className="mt-1 space-y-1">
                                    {(club as any).coordinator_names ? (
                                      (club as any).coordinator_names.split(',').map((name: string, index: number) => (
                                        <div key={index} className="text-sm text-muted-foreground truncate">
                                          {name.trim()}
                                        </div>
                                      ))
                                    ) : (
                                      <div className="text-sm text-muted-foreground">No coordinators listed</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-start gap-2 text-sm">
                                <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-foreground">Contact:</span>
                                  <div className="mt-1 space-y-1">
                                    {(club as any).coordinator_emails ? (
                                      (club as any).coordinator_emails.split(',').map((email: string, index: number) => (
                                        <a
                                          key={index}
                                          href={`mailto:${email.trim()}`}
                                          className="text-primary hover:underline block text-sm truncate"
                                          title={email.trim()}
                                        >
                                          {email.trim()}
                                        </a>
                                      ))
                                    ) : (
                                      <div className="text-sm text-muted-foreground">No contact info available</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleDetails(club.id)}
                              className="h-auto p-0 mt-1 text-primary hover:text-primary/80"
                            >
                              Show Description <ChevronUp className="h-3 w-3 ml-1" />
                            </Button>
                          </div>
                        )}
                        <div className="flex gap-2 mt-auto pt-2">
                          {club.channel_link && (
                            <Button size="sm" variant="outline" asChild className="flex-1">
                              <a href={club.channel_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Channel
                              </a>
                            </Button>
                          )}
                          {club.instagram_link && (
                            <Button size="sm" variant="outline" asChild className="flex-1">
                              <a href={club.instagram_link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Instagram
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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