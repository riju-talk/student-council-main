import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, CheckCircle, Users, Calendar } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Student Council Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
        <div className="w-96 h-96 rounded-full bg-accent/30 dark:bg-accent/20 flex items-center justify-center">
          <Users className="w-64 h-64 text-accent dark:text-primary" />
        </div>
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