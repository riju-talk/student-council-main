import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Crown, Users, Briefcase } from "lucide-react";

export const Representatives = () => {
  const representatives = [
    {
      name: "Arjun Sharma",
      position: "President",
      year: "4th Year, CSE",
      email: "president@iiitd.ac.in",
      phone: "+91 98765 43210",
      avatar: "/placeholder.svg",
      icon: Crown
    },
    {
      name: "Priya Patel",
      position: "Vice President",
      year: "3rd Year, ECE",
      email: "vp@iiitd.ac.in",
      phone: "+91 98765 43211",
      avatar: "/placeholder.svg",
      icon: Briefcase
    },
    {
      name: "Rahul Singh",
      position: "General Secretary",
      year: "3rd Year, CSE",
      email: "secretary@iiitd.ac.in",
      phone: "+91 98765 43212",
      avatar: "/placeholder.svg",
      icon: Users
    },
    {
      name: "Ananya Gupta",
      position: "Cultural Secretary",
      year: "2nd Year, CSB",
      email: "cultural@iiitd.ac.in",
      phone: "+91 98765 43213",
      avatar: "/placeholder.svg",
      icon: Users
    },
    {
      name: "Vikram Rao",
      position: "Sports Secretary",
      year: "3rd Year, CSD",
      email: "sports@iiitd.ac.in",
      phone: "+91 98765 43214",
      avatar: "/placeholder.svg",
      icon: Users
    },
    {
      name: "Sneha Jain",
      position: "Technical Secretary",
      year: "2nd Year, CSE",
      email: "technical@iiitd.ac.in",
      phone: "+91 98765 43215",
      avatar: "/placeholder.svg",
      icon: Users
    }
  ];

  const committees = [
    {
      name: "Academic Committee",
      members: ["Rohan Mehta", "Kavya Shetty", "Aditya Kumar"],
      focus: "Curriculum feedback, academic policies, student welfare"
    },
    {
      name: "Infrastructure Committee", 
      members: ["Siddharth Joshi", "Meera Singh", "Harsh Agarwal"],
      focus: "Campus facilities, maintenance, student amenities"
    },
    {
      name: "Disciplinary Committee",
      members: ["Abhishek Tiwari", "Ritika Sharma", "Varun Khanna"],
      focus: "Student conduct, conflict resolution, policy enforcement"
    }
  ];

  return (
    <section className="py-20">
      <div className="container px-4">
        {/* Representatives Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/20 text-accent">
              <Crown className="h-3 w-3 mr-2" />
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Student Representatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated students who represent your voice and work tirelessly to improve campus life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {representatives.map((rep, index) => {
              const Icon = rep.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/20">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={rep.avatar} alt={rep.name} />
                      <AvatarFallback className="bg-accent/10 text-accent">
                        {rep.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{rep.name}</h3>
                      <div className="flex items-center text-accent text-sm">
                        <Icon className="h-3 w-3 mr-1" />
                        {rep.position}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-muted-foreground">{rep.year}</p>
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-3 w-3 mr-2" />
                      {rep.email}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-3 w-3 mr-2" />
                      {rep.phone}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Committees Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Committees</h2>
            <p className="text-muted-foreground">
              Specialized committees working on specific aspects of student life and campus improvement
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {committees.map((committee, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/20">
                <h3 className="font-semibold text-lg mb-3">{committee.name}</h3>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Members:</h4>
                  <ul className="text-sm space-y-1">
                    {committee.members.map((member, idx) => (
                      <li key={idx} className="text-foreground">{member}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Focus:</h4>
                  <p className="text-sm text-foreground">{committee.focus}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};