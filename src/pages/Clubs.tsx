import { useState } from "react";
import { format } from "date-fns";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import {
  ExternalLink,
  Mail,
  Users,
  FileText,
  Plus,
  ChevronDown,
  Calendar,
  Search,
} from "lucide-react";

type Club = {
  id: string;
  name: string;
  description: string;
  category?: string;
  avatar_url: string | null;
  coordinator_names: string;
  coordinator_emails: string;
  faculty_advisor?: string | null;
  created_at: string;
  member_count?: number | null;
  channel_links?: string | null;
  instagram_link?: string | null;
  is_active: boolean;
  updated_at: string;
};

const clubLogos: Record<string, string> = {
  "Coding Club": "darkcode.png",
  "Cultural Society": "Muse.jpg",
  "Sports Club": "madtoes.jpg",
  "Robotics Club": "Cyborg.jpg",
  "Photography Club": "tasveer.png",
  "Technical Society": "ieee.png",
  "Literary Society": "unquote.jpg",
  "Entrepreneurship Cell": "enactus.png",
  "Social Service": "girlup.png",
  "ACM Student Chapter": "acm.png",
  "IEEE Student Branch": "ieee.png",
  "Electroholics": "Electroholics.jpg",
  "BioBytes": "BioBytes.png",
  "Astronuts": "Astronuts.png",
  "Finnexia": "Finnexia.jpg",
  "MicDrop": "MicDrop.png",
  "Philosoc": "Philosoc.png",
  "Trivialis": "Trivialis.png",
  "AudioBytes": "audiobytes.jpeg",
  "BYLD": "byld.jpg",
  "CyFuse": "cyfuse.jpg",
  "DesignHub": "designhub.png",
  "Evariste": "evariste.png",
  "FooBar": "foobar.png",
  "GirlUp": "girlup.png",
  "IGDA": "igda.jpg",
  "IRC": "irc.jpg",
  "LDA": "lda.png",
  "Machaan": "machaan.png",
  "OWASP": "owasp.png",
  "RoamRovers": "roamrovers.jpg",
  "SaltNPepper": "saltnpepper.jpg",
  "SPIC MACAY": "spic-macay.jpeg",
  "The65thSquare": "the65thsquare.jpg",
  "URC": "urc.png",
  "Women in Tech": "women-in-tech-iiitd.jpg",
  "LeanIn": "leanin.jpg",
  "Meraki": "meraki.jpg",
};

const getClubLogo = (clubName: string): string | null => {
  if (!clubName) return null;

  if (clubLogos[clubName]) return clubLogos[clubName];

  const clubKey = Object.keys(clubLogos).find(
    (key) =>
      clubName.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(clubName.toLowerCase())
  );

  return clubKey ? clubLogos[clubKey] : null;
};

const Clubs = () => {
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const { data: clubs = [], isLoading } = useQuery<Club[]>({
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

  const filteredClubs = clubs.filter(
    (club) =>
      club.name?.toLowerCase().includes(search.toLowerCase()) ||
      club.category?.toLowerCase().includes(search.toLowerCase()) ||
      club.description?.toLowerCase().includes(search.toLowerCase())
  );

  const clubGuidelines = [
    "At least 15 active members and 3 co-ordinators are required for any club to exist...",
    "At least two activities per semester.",
    "Regular updates to club website...",
    "15 interested students needed for visiting instructors...",
    "Tentative annual budget with justification...",
    "Detailed breakdown of budget must be provided.",
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 geometric-grid opacity-40"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-3xl rotate-45"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-secondary/15 rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-primary/25 rounded-2xl transform rotate-12"></div>
      </div>

      <Header />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold gold-standard text-glow-primary">
            Student Clubs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our vibrant community of student clubs and organizations.
            Join existing clubs or propose a new one!
          </p>
        </div>

        <div className="flex justify-center mb-6 pt-6">
          <div className="relative w-full max-w-md">
            <Input
              type="text"
              placeholder="Search clubs by name, category, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-background/50 border-border/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Club Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clubGuidelines.map((guideline, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">{guideline}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 pt-6">
          <h2 className="text-2xl font-semibold gold-standard">
            Active Clubs
          </h2>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card
                  key={i}
                  className="animate-pulse rounded-2xl bg-card/80 border-border/50"
                >
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
              {filteredClubs.map((club) => {
                const logo = getClubLogo(club.name);

                return (
                  <div key={club.id}>
                    <Card
                      onClick={() => setSelectedClub(club)}
                      className="card-hover cursor-pointer bg-card/80 backdrop-blur-sm border-border/50"
                    >
                      <CardHeader className="pb-3 flex items-center gap-3">
                        <div className="h-20 w-20 flex-shrink-0 bg-white rounded-lg border overflow-hidden flex items-center justify-center">
                          {logo ? (
                            <img
                              src={logo}
                              alt={club.name}
                              className="w-full h-full object-contain"
                            />
                          ) : club.avatar_url ? (
                            <img
                              src={club.avatar_url}
                              alt={club.name}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="bg-primary/10 text-primary w-full h-full flex items-center justify-center text-xl font-medium">
                              {club.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle>{club.name}</CardTitle>
                          {club.category && (
                            <Badge variant="secondary">{club.category}</Badge>
                          )}
                        </div>
                      </CardHeader>

                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-4">
                          {club.description?.slice(0, 120) +
                            (club.description.length > 120 ? "..." : "")}
                        </p>
                        <Button variant="link" size="sm">
                          View details{" "}
                          <ChevronDown className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>

                    <Dialog
                      open={!!selectedClub && selectedClub.id === club.id}
                      onOpenChange={(open) => !open && setSelectedClub(null)}
                    >
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        {selectedClub && (
                          <>
                            <DialogHeader>
                              <DialogTitle>{selectedClub.name}</DialogTitle>
                            </DialogHeader>

                            <div className="space-y-6">
                              <div className="flex items-center gap-4">
                                {getClubLogo(selectedClub.name) ? (
                                  <img
                                    src={getClubLogo(selectedClub.name)!}
                                    alt={selectedClub.name}
                                    className="h-24 w-24 object-contain rounded-lg border bg-white"
                                  />
                                ) : selectedClub.avatar_url ? (
                                  <img
                                    src={selectedClub.avatar_url}
                                    alt={selectedClub.name}
                                    className="h-24 w-24 object-contain rounded-lg border bg-white"
                                  />
                                ) : (
                                  <div className="bg-primary/10 text-primary h-24 w-24 flex items-center justify-center text-3xl font-medium rounded-lg border bg-white">
                                    {selectedClub.name.charAt(0).toUpperCase()}
                                  </div>
                                )}

                                <div className="space-y-2">
                                  {selectedClub.category && (
                                    <Badge variant="secondary">
                                      {selectedClub.category}
                                    </Badge>
                                  )}

                                  <div className="flex gap-2">
                                    {selectedClub.channel_links && (
                                      <Button
                                        variant="outline"
                                        asChild
                                        size="sm"
                                      >
                                        <a
                                          href={selectedClub.channel_links}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <ExternalLink className="h-3 w-3 mr-1" />{" "}
                                          Channel
                                        </a>
                                      </Button>
                                    )}

                                    {selectedClub.instagram_link && (
                                      <Button
                                        variant="outline"
                                        asChild
                                        size="sm"
                                      >
                                        <a
                                          href={selectedClub.instagram_link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <ExternalLink className="h-3 w-3 mr-1" />{" "}
                                          Instagram
                                        </a>
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <h3 className="font-semibold">About</h3>
                              <p className="text-muted-foreground">
                                {selectedClub.description ?? "N/A"}
                              </p>

                              <h3 className="font-semibold">Coordinators</h3>
                              <div className="space-y-3">
                                {(selectedClub.coordinator_names ?? "")
                                  .split(",")
                                  .map((name, idx) => {
                                    const email =
                                      (selectedClub.coordinator_emails ?? "")
                                        .split(",")[idx]?.trim();

                                    return (
                                      <div
                                        key={idx}
                                        className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg"
                                      >
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                          {name.trim().charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                          <div>{name.trim()}</div>
                                          {email && (
                                            <a
                                              href={`mailto:${email}`}
                                              className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
                                            >
                                              <Mail className="h-3 w-3" />{" "}
                                              {email}
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                              </div>

                              <h3 className="font-semibold">Details</h3>
                              <div className="space-y-3">
                                {selectedClub.faculty_advisor && (
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Faculty Advisor:</span>
                                    <span>
                                      {selectedClub.faculty_advisor}
                                    </span>
                                  </div>
                                )}
                                {selectedClub.created_at && (
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    <span>Established:</span>
                                    <span>
                                      {format(
                                        new Date(
                                          selectedClub.created_at
                                        ),
                                        "MMMM yyyy"
                                      )}
                                    </span>
                                  </div>
                                )}
                                {selectedClub.member_count !== undefined && (
                                  <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4" />
                                    <span>Members:</span>
                                    <span>{selectedClub.member_count}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Clubs;
