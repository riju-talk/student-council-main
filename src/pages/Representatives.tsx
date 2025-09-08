import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Search, Award, Users, Crown, Shield, Trophy, Heart, Globe, Building, Briefcase, MessageCircle, Calendar, UserCheck, GraduationCap, Utensils, Volleyball, IndianRupee, Palette, Laptop, Megaphone, TreePine } from "lucide-react";

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

  // Separate leadership roles from regular members - all non-"Member" positions are leadership
  const leadershipRoles = [
    'President', 'Vice President', 'Treasurer', 'Sports Secretary', 'Technical Secretary',
    'Cultural Secretary', 'Web Dev Head', 'PR Head', 'Head of Communication', 'Alumni Secretary',
    'Diversity and Inclusion Secretary', 'Clubs Coordinator', 'Hostel Secretary', 
    'Environment and Sustainability Secretary', 'Well-Being Secretary', 'Day Scholars Affairs Secretary',
    'Mess Secretary', 'DAC Representative', 'SA office Representative', 'Batch Representatives'
  ];
  
  const leadership = filteredRepresentatives.filter(rep => 
    leadershipRoles.includes(rep.position)
  );
  const members = filteredRepresentatives.filter(rep => 
    rep.position === 'Member'
  );

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'President':
        return Crown;
      case 'Vice President':
        return Shield;
      case 'Treasurer':
        return IndianRupee;
      case 'Sports Secretary':
        return Volleyball;
      case 'Technical Secretary':
        return Laptop;
      case 'Cultural Secretary':
        return Palette;
      case 'Web Dev Head':
        return Laptop;
      case 'PR Head':
        return Megaphone;
      case 'Head of Communication':
        return MessageCircle;
      case 'Alumni Secretary':
        return GraduationCap;
      case 'Diversity and Inclusion Secretary':
        return Heart;
      case 'Clubs Coordinator':
        return Users;
      case 'Hostel Secretary':
        return Building;
      case 'Environment and Sustainability Secretary':
        return TreePine;
      case 'Well-Being Secretary':
        return Heart;
      case 'Day Scholars Affairs Secretary':
        return Calendar;
      case 'Mess Secretary':
        return Utensils;
      case 'DAC Representative':
        return UserCheck;
      case 'SA office Representative':
        return Briefcase;
      case 'Batch Representatives':
        return Users;
      case 'Member':
        return Users;
      default:
        return Award;
    }
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case 'President':
        return 'bg-primary text-primary-foreground';
      case 'Vice President':
        return 'bg-accent text-accent-foreground';
      case 'Treasurer':
        return 'bg-green-500 text-white';
      case 'Sports Secretary':
        return 'bg-blue-500 text-white';
      case 'Technical Secretary':
        return 'bg-purple-500 text-white';
      case 'Cultural Secretary':
        return 'bg-pink-500 text-white';
      case 'Web Dev Head':
        return 'bg-indigo-500 text-white';
      case 'PR Head':
        return 'bg-orange-500 text-white';
      case 'Head of Communication':
        return 'bg-cyan-500 text-white';
      case 'Alumni Secretary':
        return 'bg-amber-500 text-white';
      case 'Diversity and Inclusion Secretary':
        return 'bg-rose-500 text-white';
      case 'Clubs Coordinator':
        return 'bg-teal-500 text-white';
      case 'Hostel Secretary':
        return 'bg-slate-500 text-white';
      case 'Environment and Sustainability Secretary':
        return 'bg-emerald-500 text-white';
      case 'Well-Being Secretary':
        return 'bg-red-400 text-white';
      case 'Day Scholars Affairs Secretary':
        return 'bg-violet-500 text-white';
      case 'Mess Secretary':
        return 'bg-yellow-600 text-white';
      case 'DAC Representative':
        return 'bg-gray-600 text-white';
      case 'SA office Representative':
        return 'bg-stone-500 text-white';
      case 'Batch Representatives':
        return 'bg-sky-500 text-white';
      case 'Member':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background/80">
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
                <h2 className="text-2xl font-semibold mb-2">Student Council Leadership</h2>
                <p className="text-muted-foreground">Executive positions and secretaries leading various student affairs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              <h2 className="text-2xl font-semibold mb-2">General Members</h2>
              <p className="text-muted-foreground">Student council members in general roles</p>
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