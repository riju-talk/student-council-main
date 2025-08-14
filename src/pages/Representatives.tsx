import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Award, Users } from "lucide-react";

const Representatives = () => {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getPositionColor = (position: string) => {
    const colors: { [key: string]: string } = {
      'President': 'bg-primary text-primary-foreground',
      'Vice-President': 'bg-secondary text-secondary-foreground',
      'Treasurer': 'bg-accent text-accent-foreground',
      'Sports Secretary': 'bg-blue-500 text-white',
      'Member': 'bg-muted text-muted-foreground'
    };
    return colors[position] || colors['Member'];
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <CardHeader className="text-center pb-4">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-20 h-20 bg-muted rounded-full" />
                      <div className="space-y-2">
                        <div className="h-6 bg-muted rounded w-32" />
                        <div className="h-5 bg-muted rounded w-20" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {representatives.map((rep) => (
                <Card key={rep.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback className="text-lg font-semibold">
                          {getInitials(rep.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{rep.name}</CardTitle>
                        <Badge className={`mt-2 ${getPositionColor(rep.position)}`}>
                          {rep.position}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>{rep.program} {rep.year} - {rep.branch}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${rep.email}`} className="text-primary hover:underline">
                          {rep.email}
                        </a>
                      </div>
                      {rep.official_email && (
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${rep.official_email}`} className="text-primary hover:underline">
                            {rep.official_email}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Representatives;