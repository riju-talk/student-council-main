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
    <>
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Grid background - optimized with will-change */}
      <div className="absolute inset-0 geometric-grid opacity-60" style={{ willChange: 'opacity' }}></div>
      
      {/* Background Elements - optimized */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30" style={{ willChange: 'transform' }}>
        <div className="relative">
          {/* Central council logo */}
          <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/20 flex items-center justify-center logo-glow">
            <img 
              src="student_council.jpg" 
              alt="Student Council Logo" 
              className="w-[450px] h-[450px] rounded-full object-cover border-4 border-primary/50 brightness-125"
              loading="eager"
            />
          </div>
          
          {/* Geometric flowing elements - reduced intensity */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ willChange: 'opacity' }}></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-secondary/15 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:1.5s]" style={{ willChange: 'opacity' }}></div>
        </div>
      </div>

      {/* Floating geometric elements - optimized with containment */}
      <div className="absolute inset-0 pointer-events-none" style={{ contain: 'layout style paint' }}>
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-3xl rotate-45" style={{ willChange: 'transform' }}></div>
        <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-secondary/15 rounded-full [animation-delay:0.5s]" style={{ willChange: 'transform' }}></div>
        <div className="floating-element absolute bottom-32 left-1/4 w-20 h-20 bg-primary/25 rounded-2xl transform rotate-12 [animation-delay:1s]" style={{ willChange: 'transform' }}></div>
        <div className="floating-element absolute bottom-20 right-1/3 w-28 h-28 bg-secondary/10 rounded-full [animation-delay:1.5s]" style={{ willChange: 'transform' }}></div>
        <div className="floating-element absolute top-1/3 right-1/4 w-16 h-16 bg-primary/15 rounded-xl [animation-delay:0.8s]" style={{ willChange: 'transform' }}></div>
      </div>
      
      <div className="container relative z-10 px-6 md:px-8 text-center">
        <div className="max-w-6xl mx-auto py-12 md:py-16">
          {/* Badge - faster animation */}
          <Badge variant="outline" className="mb-8 px-6 py-3 text-sm font-medium border-primary/40 text-primary bg-primary/10 hover:bg-primary/15 transition-all duration-300 backdrop-blur-sm animate-fade-in-down" style={{ willChange: 'transform, opacity' }}>
            <Award className="h-4 w-4 mr-2" />
            Student Leadership Excellence
          </Badge>

          {/* Main Heading - optimized stagger */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-10 md:mb-12 leading-tight text-shadow-lg animate-fade-in-up animate-delay-100" style={{ willChange: 'transform, opacity' }}>
            <span className="block text-foreground drop-shadow-lg animate-slide-in-left">IIIT Delhi</span>
            <span className="text-primary block font-display font-bold mt-2 md:mt-4 animate-slide-in-right animate-delay-200">
           Student Council
            </span>
          </h1>

          {/* Subtitle - faster delay */}
          <p className="text-xl md:text-2xl text-foreground mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-light animate-fade-in-up animate-delay-300" style={{ willChange: 'transform, opacity' }}>
            Empowering voices, fostering innovation, and building an extraordinary campus community through 
            <span className="text-primary font-medium"> collaborative leadership</span> and 
            <span className="text-secondary font-medium"> meaningful impact</span>.
          </p>

          {/* Action Buttons - optimized */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 md:mb-24 animate-fade-in-scale animate-delay-400" style={{ willChange: 'transform, opacity' }}>
            <Button 
              size="lg" 
              className="px-8 py-4 bg-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 text-primary-foreground font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover-lift" 
              asChild
            >
              <a href="/about">
                <Users className="h-5 w-5 mr-2" />
                Discover Our Mission
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 border-2 border-primary/50 hover:border-primary text-foreground hover:bg-primary/20 font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 hover-lift" 
              asChild
            >
              <a href="/representatives">
                <Star className="h-5 w-5 mr-2" />
                Meet Our Leaders
              </a>
            </Button>
          </div>

          {/* Mission Cards - reduced stagger for faster perception */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4 md:px-0">
            <Card className="card-hover p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl hover-lift animate-fade-in-up animate-delay-500" style={{ willChange: 'transform' }}>
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 mx-auto animate-gentle-float">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Student Representation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Amplifying every student's voice in academic and administrative decisions through democratic leadership
              </p>
            </Card>

            <Card className="card-hover p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl hover-lift animate-fade-in-up animate-delay-600" style={{ willChange: 'transform' }}>
              <div className="flex items-center justify-center w-16 h-16 bg-secondary rounded-2xl mb-6 mx-auto animate-gentle-float animate-delay-100">
                <Calendar className="h-8 w-8 text-secondary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Campus Innovation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Orchestrating transformative cultural, technical, and social experiences that define campus life
              </p>
            </Card>

            <Card className="card-hover p-8 bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl hover-lift animate-fade-in-up animate-delay-700" style={{ willChange: 'transform' }}>
              <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 mx-auto animate-gentle-float animate-delay-200">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-display font-semibold mb-4 text-foreground">Student Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ensuring every student's needs are met through comprehensive support services
              </p>
            </Card>

          </div>
        </div>
      </div>
    </section>
    </>
  );
};