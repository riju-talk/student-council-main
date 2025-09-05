import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, CheckCircle, Users, Calendar } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background Student Council Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-96 h-96 rounded-full bg-accent/20 flex items-center justify-center">
          <img src="student_council.jpg" alt="Student Council Logo" className="w-96 h-96 text-accent" />
        </div>
      </div>

      {/* Animated Floating Polygons */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large polygons */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-primary/20 rounded-3xl rotate-45 animate-bounce [animation-duration:8s] [animation-delay:0s] transform-gpu"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/15 rounded-full animate-pulse [animation-duration:6s] [animation-delay:1s] transform-gpu"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-accent/25 rounded-2xl transform rotate-12 animate-bounce [animation-duration:7s] [animation-delay:2s] transform-gpu"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-primary/10 rounded-full animate-pulse [animation-duration:9s] [animation-delay:3s] transform-gpu"></div>
        
        {/* Medium polygons */}
        <div className="absolute top-1/3 left-1/2 w-16 h-16 bg-secondary/20 rounded-2xl transform rotate-45 animate-bounce [animation-duration:5s] [animation-delay:1.5s] transform-gpu"></div>
        <div className="absolute top-1/4 right-1/4 w-14 h-14 bg-accent/15 rounded-xl rotate-12 animate-pulse [animation-duration:4s] [animation-delay:0.5s] transform-gpu"></div>
        <div className="absolute bottom-1/3 left-20 w-18 h-18 bg-primary/15 rounded-full animate-bounce [animation-duration:6s] [animation-delay:2.5s] transform-gpu"></div>
        <div className="absolute top-60 right-40 w-12 h-12 bg-secondary/25 rounded-xl transform rotate-90 animate-pulse [animation-duration:7s] [animation-delay:1s] transform-gpu"></div>
        
        {/* Small polygons */}
        <div className="absolute top-80 left-1/3 w-8 h-8 bg-accent/30 rounded-full animate-bounce [animation-duration:3s] [animation-delay:0.8s] transform-gpu"></div>
        <div className="absolute bottom-40 right-20 w-10 h-10 bg-primary/20 rounded-lg transform rotate-45 animate-pulse [animation-duration:4s] [animation-delay:1.2s] transform-gpu"></div>
        <div className="absolute top-1/2 left-40 w-6 h-6 bg-secondary/35 rounded-lg animate-bounce [animation-duration:5s] [animation-delay:2s] transform-gpu"></div>
        <div className="absolute bottom-60 left-1/2 w-12 h-12 bg-accent/20 rounded-xl transform rotate-12 animate-pulse [animation-duration:6s] [animation-delay:0.3s] transform-gpu"></div>
        
        {/* Extra floating elements */}
        <div className="absolute top-32 right-1/3 w-5 h-5 bg-primary/40 rounded-full animate-bounce [animation-duration:4s] [animation-delay:3s] transform-gpu"></div>
        <div className="absolute bottom-80 right-10 w-7 h-7 bg-secondary/30 rounded-lg transform rotate-45 animate-pulse [animation-duration:5s] [animation-delay:1.8s] transform-gpu"></div>
        <div className="absolute top-1/4 left-10 w-9 h-9 bg-accent/25 rounded-xl rotate-90 animate-bounce [animation-duration:7s] [animation-delay:0.7s] transform-gpu"></div>
      </div>
      
      <div className="container relative z-10 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/20 text-accent">
            <Users className="h-3 w-3 mr-2" />
            Student Leadership
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            IIIT Delhi
            <br />
            <span className="text-accent">Student Council</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your voice, our mission. Connecting students, fostering growth, and building a vibrant campus community at IIIT Delhi.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
              <div className="text-sm text-muted-foreground">Events This Year</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent">6</div>
              <div className="text-sm text-muted-foreground">Active Clubs</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
              <a href="#about">
                <Users className="h-5 w-5 mr-2" />
                Learn About Us
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#representatives">
                <Users className="h-5 w-5 mr-2" />
                Meet Our Team
              </a>
            </Button>
          </div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Student Representation</h3>
              <p className="text-muted-foreground text-sm">
                Amplifying every student's voice in academic and administrative decisions
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Campus Events</h3>
              <p className="text-muted-foreground text-sm">
                Organizing vibrant cultural, technical, and social events for the community
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Student Support</h3>
              <p className="text-muted-foreground text-sm">
                Providing support, resources, and guidance for academic and personal growth
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};