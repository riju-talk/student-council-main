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
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        {/* About Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/20 text-accent">
            <Heart className="h-3 w-3 mr-2" />
            About Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The Student Council at IIIT Delhi is the official voice of our student body, dedicated to 
            enhancing campus life, advocating for student rights, and fostering academic excellence. 
            We bridge the gap between students and administration, ensuring every voice is heard 
            and every concern is addressed. Through our diverse clubs and committees, we create 
            opportunities for personal growth, skill development, and community engagement.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-accent/20">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </Card>
            );
          })}
        </div>

        {/* Clubs Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Clubs & Committees</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Diverse opportunities for every interest and passion, fostering growth and community engagement
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/20">
                <h3 className="font-semibold text-lg mb-2">{club.name}</h3>
                <p className="text-sm text-muted-foreground">{club.focus}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};