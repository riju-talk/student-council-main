import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Heart } from "lucide-react";

export const About = () => {
  const values = [
    {
      icon: Users,
      title: "Student Representation",
      description: "Amplifying every student's voice in academic and administrative decisions"
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Maintaining high standards in all council activities and initiatives"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Bringing fresh ideas and modern solutions to campus life"
    },
    {
      icon: Heart,
      title: "Community",
      description: "Building a stronger, more connected IIITD community"
    }
  ];

  const clubs = [
    { name: "Technical Society", focus: "Coding, Hackathons, Tech Events" },
    { name: "Cultural Committee", focus: "Arts, Music, Dance, Drama" },
    { name: "Sports Committee", focus: "Athletics, Tournaments, Fitness" },
    { name: "Literary Society", focus: "Writing, Debates, Publications" },
    { name: "Entrepreneurship Cell", focus: "Startups, Business, Innovation" },
    { name: "Social Service", focus: "Community Outreach, Volunteering" }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 geometric-grid opacity-30"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-3xl rotate-45"></div>
        <div className="floating-element absolute bottom-32 right-20 w-24 h-24 bg-secondary/15 rounded-full"></div>
      </div>
      
      <div className="container px-4 relative z-10">
        {/* About Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 text-primary bg-primary/10">
            <Heart className="h-3 w-3 mr-2" />
            About Us
          </Badge>
          <h2 className="text-3xl md:text-4xl gold-standard mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Student Council at IIIT Delhi is the official voice of our student body, dedicated to 
            enhancing campus life, advocating for student rights, and fostering academic excellence. 
            We bridge the gap between students and administration, ensuring every voice is heard 
            and every concern is addressed.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="card-hover p-6 text-center bg-card/80 backdrop-blur-sm border border-border/50">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-4 mx-auto">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};