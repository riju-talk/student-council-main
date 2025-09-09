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
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Grid background like the posts */}
      <div className="absolute inset-0 geometric-grid opacity-60"></div>
      
      {/* Sophisticated Background Elements inspired by the posts */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <div className="relative">
          {/* Central council logo with glow */}
          <div className="w-96 h-96 rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center logo-glow">
            <img 
              src="student_council.jpg" 
              alt="Student Council Logo" 
              className="w-80 h-80 rounded-full object-cover border-4 border-primary/50 brightness-125" 
            />
          </div>
          
          {/* Geometric flowing elements like the posts */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
        </div>
      </div>

      {/* Floating geometric elements inspired by the post design */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-primary/25 rounded-3xl rotate-45"></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full"></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-primary/30 rounded-2xl transform rotate-12"></div>
        <div className="floating-element absolute bottom-20 right-1/3 w-28 h-28 bg-secondary/15 rounded-full"></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-16 h-16 bg-primary/20 rounded-xl"></div>
      </div>
      
      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Premium Badge */}
          <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 transition-all duration-300 text-foreground">
            <Award className="h-4 w-4 mr-2" />
            Student Leadership Excellence
          </Badge>

          {/* Main Heading with typography matching the posts */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-glow-primary">
            <span className="block text-foreground">IIIT Delhi</span>
            <span className="block gold-standard text-glow-primary">
           Student Council
            </span>
          </h1>

          {/* Subtitle with professional styling */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Empowering voices, fostering innovation, and building an extraordinary campus community through 
            <span className="text-primary font-medium"> collaborative leadership</span> and 
            <span className="text-secondary font-medium"> meaningful impact</span>.
          </p>

          {/* Premium Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="px-8 py-4 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105" 
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
              className="px-8 py-4 border-2 border-primary/50 hover:border-primary text-foreground hover:bg-primary/20 font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25" 
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
            <Card className="card-hover p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-6 mx-auto">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Student Representation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Amplifying every student's voice in academic and administrative decisions through democratic leadership
              </p>
            </Card>

            <Card className="card-hover p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-2xl mb-6 mx-auto">
                <Calendar className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Campus Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Orchestrating transformative cultural, technical, and social experiences that define campus life
              </p>
            </Card>

    </section>
  );
};