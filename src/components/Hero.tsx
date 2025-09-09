import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Calendar, Award, Star, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect, useMemo, useCallback } from "react";

export const Hero = () => {
  const [activeMembers, setActiveMembers] = useState(0);
  const [activeClubs, setActiveClubs] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const { count: membersCount } = await supabase
        .from("student_representatives")
        .select('*', { count: 'exact', head: true });
      
      const { count: clubsCount } = await supabase
        .from("clubs")
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true);

      setActiveMembers(membersCount || 0);
      setActiveClubs(clubsCount || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden geometric-grid">
      {/* Sophisticated Background Elements inspired by the posts */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40">
        <div className="relative">
          {/* Central council logo with glow */}
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center shadow-glow">
            <img 
              src="student_council.jpg" 
              alt="Student Council Logo" 
              className="w-80 h-80 rounded-full object-cover border-4 border-primary/30" 
            />
          </div>
          
          {/* Geometric flowing elements like the posts */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>
      </div>

      {/* Floating geometric elements inspired by the post design */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-3xl rotate-45 animate-bounce [animation-duration:8s] [animation-delay:0s]"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/15 rounded-full animate-pulse [animation-duration:6s] [animation-delay:1s]"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-primary/25 rounded-2xl transform rotate-12 animate-bounce [animation-duration:7s] [animation-delay:2s]"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-secondary/10 rounded-full animate-pulse [animation-duration:9s] [animation-delay:3s]"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-primary/15 rounded-xl animate-bounce [animation-duration:5s] [animation-delay:1.5s]"></div>
      </div>
      
      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300 text-foreground">
            <Award className="h-4 w-4 mr-2" />
            Student Leadership Excellence
          </Badge>

          {/* Main Heading with typography matching the posts */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block text-foreground">IIIT Delhi</span>
            <span className="block bg-gradient-primary bg-clip-text text-transparent text-glow-primary">
           Student Council
            </span>
          </h1>

          {/* Subtitle with professional styling */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Empowering voices, fostering innovation, and building an extraordinary campus community through 
            <span className="text-primary font-medium"> collaborative leadership</span> and 
            <span className="text-secondary font-medium"> meaningful impact</span>.
          </p>

          {/* Enhanced Stats Section */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            <div className="text-center group">
              <div className="relative">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {activeMembers}
                </div>
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Student Representatives</div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  500+
                </div>
                <div className="absolute -inset-2 bg-secondary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Events This Year</div>
            </div>
            <div className="text-center group">
              <div className="relative">
                <div className="text-5xl md:text-6xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {activeClubs}
                </div>
                <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Active Communities</div>
            </div>
          </div>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="px-8 py-4 bg-gradient-primary hover:shadow-primary text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105" 
              asChild
            >
              <a href="#about">
                <Users className="h-5 w-5 mr-2" />
                Discover Our Mission
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 border-2 border-primary/30 hover:border-primary text-foreground hover:bg-primary/10 font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105" 
              asChild
            >
              <a href="#representatives">
                <Star className="h-5 w-5 mr-2" />
                Meet Our Leaders
              </a>
            </Button>
          </div>

          {/* Mission Cards with sophisticated styling */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-hover p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto shadow-primary">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Student Representation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Amplifying every student's voice in academic and administrative decisions through democratic leadership
              </p>
            </Card>

            <Card className="card-hover p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-secondary rounded-2xl mb-6 mx-auto shadow-secondary">
                <Calendar className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Campus Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Orchestrating transformative cultural, technical, and social experiences that define campus life
              </p>
            </Card>

            <Card className="card-hover p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-6 mx-auto shadow-primary">
                <Zap className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Student Empowerment</h3>
              <p className="text-muted-foreground leading-relaxed">
                Providing comprehensive support, resources, and opportunities for academic and personal excellence
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};