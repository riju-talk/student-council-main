import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  Search,
  Award,
  Users,
  Crown,
  Shield,
  Trophy,
  Heart,
  Globe,
  Building,
  Briefcase,
  MessageCircle,
  Calendar,
  UserCheck,
  GraduationCap,
  Utensils,
  Volleyball,
  IndianRupee,
  Palette,
  Laptop,
  Megaphone,
  TreePine,
} from "lucide-react";

const Representatives = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: representatives = [], isLoading } = useQuery({
    queryKey: ["student-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_representatives")
        .select("*")
        .order("pref_order", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  // Memoize search filter
  const filteredRepresentatives = useMemo(() => {
    return representatives.filter(
      (rep) =>
        rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rep.program.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [representatives, searchQuery]);

  // Memoize leadership/members split
  const { leadership, members } = useMemo(() => {
    return {
      leadership: filteredRepresentatives.filter(
        (rep) => rep.position !== "Member"
      ),
      members: filteredRepresentatives.filter((rep) => rep.position === "Member"),
    };
  }, [filteredRepresentatives]);

  // Memoized icon mapping
  const getPositionIcon = useMemo(
    () =>
      (position: string) => {
        switch (position) {
          case "President":
            return Crown;
          case "Vice-President":
            return Shield;
          case "Treasurer":
            return IndianRupee;
          case "Sports Secretary":
            return Volleyball;
          case "Technical Secretary":
            return Laptop;
          case "Cultural Secretary":
            return Palette;
          case "Web Dev Head":
            return Laptop;
          case "PR Head":
            return Megaphone;
          case "Head of Communication":
            return MessageCircle;
          case "Alumni Secretary":
            return GraduationCap;
          case "Diversity and Inclusion Secretary":
            return Heart;
          case "Clubs Coordinator":
            return Users;
          case "Hostel Secretary":
            return Building;
          case "Environment and Sustainability Secretary":
            return TreePine;
          case "Well-Being Secretary":
            return Heart;
          case "Day Scholars Affairs Secretary":
            return Calendar;
          case "Mess Secretary":
            return Utensils;
          case "DAC Representative":
            return UserCheck;
          case "SA office Representative":
            return Briefcase;
          case "Batch Representatives":
            return Users;
          case "Member":
            return Users;
          default:
            return Award;
        }
      },
    []
  );

  // Memoized color mapping (every position has a unique scheme, "Member" = muted)
  const getPositionColor = useMemo(
    () =>
      (position: string) => {
        const colorMap: Record<string, string> = {
          President: "bg-gradient-to-r from-yellow-500 to-yellow-700 text-white",
          "Vice President": "bg-gradient-to-r from-purple-500 to-purple-700 text-white",
          Treasurer: "bg-gradient-to-r from-green-500 to-green-700 text-white",
          "Sports Secretary": "bg-gradient-to-r from-blue-500 to-blue-700 text-white",
          "Technical Secretary": "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white",
          "Cultural Secretary": "bg-gradient-to-r from-pink-500 to-pink-700 text-white",
          "Web Dev Head": "bg-gradient-to-r from-cyan-500 to-cyan-700 text-white",
          "PR Head": "bg-gradient-to-r from-red-500 to-red-700 text-white",
          "Head of Communication": "bg-gradient-to-r from-amber-500 to-amber-700 text-white",
          "Alumni Secretary": "bg-gradient-to-r from-emerald-500 to-emerald-700 text-white",
          "Diversity and Inclusion Secretary":
            "bg-gradient-to-r from-rose-500 to-rose-700 text-white",
          "Clubs Coordinator": "bg-gradient-to-r from-teal-500 to-teal-700 text-white",
          "Hostel Secretary": "bg-gradient-to-r from-stone-500 to-stone-700 text-white",
          "Environment and Sustainability Secretary":
            "bg-gradient-to-r from-green-600 to-green-800 text-white",
          "Well-Being Secretary": "bg-gradient-to-r from-fuchsia-500 to-fuchsia-700 text-white",
          "Day Scholars Affairs Secretary":
            "bg-gradient-to-r from-orange-500 to-orange-700 text-white",
          "Mess Secretary": "bg-gradient-to-r from-lime-500 to-lime-700 text-white",
          "DAC Representative": "bg-gradient-to-r from-sky-500 to-sky-700 text-white",
          "SA office Representative": "bg-gradient-to-r from-slate-500 to-slate-700 text-white",
          "Batch Representatives": "bg-gradient-to-r from-violet-500 to-violet-700 text-white",
          Member: "bg-muted text-muted-foreground",
        };

        return colorMap[position] || "bg-muted text-muted-foreground";
      },
    []
  );

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
      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white font-display">
              Student Representatives
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the elected student representatives working for the
              betterment of campus life and student affairs.
            </p>
          </div>

          {/* Search Bar */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, position, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background/50 border-border/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Leadership Team */}
          {leadership.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-white font-display mb-2">
                  Leadership Team
                </h2>
                <p className="text-muted-foreground">
                  Executive positions and secretaries leading various student
                  affairs
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {leadership.map((rep) => {
                  const IconComponent = getPositionIcon(rep.position);
                  return (
                    <Card
                      key={rep.id}
                      className="card-hover bg-card/80 backdrop-blur-sm border-border/50"
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                            <IconComponent className="h-8 w-8 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg font-display text-foreground">
                              {rep.name}
                            </CardTitle>
                            <Badge
                              className={`mt-2 ${getPositionColor(rep.position)}`}
                            >
                              {rep.position}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center text-sm text-muted-foreground">
                          {rep.year === 0
                            ? "PhD"
                            : `${rep.year} ${rep.program}${
                                rep.branch ? ` - ${rep.branch}` : ""
                              }`}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-center justify-center">
                            <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <a
                              href={`mailto:${rep.email}`}
                              className="text-primary hover:underline truncate text-center"
                            >
                              {rep.email}
                            </a>
                          </div>
                          {rep.official_email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <a
                                href={`mailto:${rep.official_email}`}
                                className="text-primary hover:underline truncate"
                              >
                                {rep.official_email}
                              </a>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* General Members */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white font-display mb-2">
                General Members
              </h2>
              <p className="text-muted-foreground">
                Student council members representing various departments and
                batches
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="animate-pulse bg-card/80">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="h-5 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((rep) => {
                  const IconComponent = getPositionIcon(rep.position);
                  return (
                    <Card
                      key={rep.id}
                      className="card-hover bg-card/80 backdrop-blur-sm border-border/50"
                    >
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{rep.name}</h3>
                              <Badge
                                className={`mt-1 ${getPositionColor(rep.position)}`}
                                variant="secondary"
                              >
                                <IconComponent className="h-3 w-3 mr-1" />
                                {rep.position}
                              </Badge>
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            {rep.program} {rep.year} - {rep.branch}
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <a
                                href={`mailto:${rep.email}`}
                                className="text-primary hover:underline truncate"
                              >
                                {rep.email}
                              </a>
                            </div>
                            {rep.official_email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <a
                                  href={`mailto:${rep.official_email}`}
                                  className="text-primary hover:underline truncate"
                                >
                                  {rep.official_email}
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {members.length === 0 && !isLoading && (
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No members found matching your search criteria.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Representatives;
