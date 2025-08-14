import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Search, Award, Users, Crown } from "lucide-react";

const Representatives = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: representatives = [], isLoading } = useQuery({
    queryKey: ["student-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_representatives")
        .select("*")
        .order("position", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const filteredRepresentatives = representatives.filter(rep =>
    rep.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rep.program.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate leadership roles from regular members
  const leadershipRoles = ['President', 'Vice-President', 'Treasurer', 'Sports Secretary'];
  const leadership = filteredRepresentatives.filter(rep => 
    leadershipRoles.includes(rep.position)
  );
  const members = filteredRepresentatives.filter(rep => 
    !leadershipRoles.includes(rep.position)
  );

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'President':
        return Crown;
      case 'Vice-President':
      case 'Treasurer':
      case 'Sports Secretary':
        return Award;
      default:
        return Users;
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'President':
        return 'bg-primary text-primary-foreground';
      case 'Vice-President':
        return 'bg-accent text-accent-foreground';
      case 'Treasurer':
        return 'bg-secondary text-secondary-foreground';
      case 'Sports Secretary':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Student Representatives</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the elected student representatives working for the betterment of campus life and student affairs.
            </p>
          </div>

          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, position, email, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Leadership Section */}
          {leadership.length > 0 && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Leadership Team</h2>
                <p className="text-muted-foreground">Key leadership positions in the Student Council</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {leadership.map((rep) => {
                  const IconComponent = getPositionIcon(rep.position);
                  return (
                    <Card key={rep.id} className="hover:shadow-lg transition-shadow border-2 hover:border-accent/20">
                      <CardHeader className="text-center pb-4">
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                            <IconComponent className="h-8 w-8 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{rep.name}</CardTitle>
                            <Badge className={`mt-2 ${getPositionColor(rep.position)}`}>
                              {rep.position}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="text-center text-sm text-muted-foreground">
                          {rep.program} {rep.year} - {rep.branch}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <a href={`mailto:${rep.email}`} className="text-primary hover:underline truncate">
                              {rep.email}
                            </a>
                          </div>
                          {rep.official_email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <a href={`mailto:${rep.official_email}`} className="text-primary hover:underline truncate">
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

          {/* All Members Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">All Members</h2>
              <p className="text-muted-foreground">Complete directory of student council members (excluding leadership)</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
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
                    <Card key={rep.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{rep.name}</h3>
                              <Badge className={`mt-1 ${getPositionColor(rep.position)}`} variant="secondary">
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
                              <a href={`mailto:${rep.email}`} className="text-primary hover:underline truncate">
                                {rep.email}
                              </a>
                            </div>
                            {rep.official_email && (
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                                <a href={`mailto:${rep.official_email}`} className="text-primary hover:underline truncate">
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
              <Card>
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