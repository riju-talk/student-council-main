import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, CheckCircle, Users, Calendar } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-accent/5"></div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/20 text-accent">
            <Users className="h-3 w-3 mr-2" />
            Official Student Council Portal
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to{" "}
            <span className="text-accent">IIIT Delhi</span>
            <br />
            Student Council
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your gateway to event planning, proposal submissions, and academic collaboration. 
            Streamlining student initiatives with professional efficiency.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="px-8 py-3 text-base font-medium">
              <FileText className="h-5 w-5 mr-2" />
              Submit Event Proposal
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-base">
              <Calendar className="h-5 w-5 mr-2" />
              View Events
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Event Proposals</h3>
              <p className="text-muted-foreground text-sm">
                Submit detailed event proposals with document uploads and budget planning
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quick Approval</h3>
              <p className="text-muted-foreground text-sm">
                Track approval status in real-time with automated notifications
              </p>
            </Card>

            <Card className="p-6 border-2 hover:border-accent/20 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mb-4 mx-auto">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Collaboration</h3>
              <p className="text-muted-foreground text-sm">
                Connect with faculty and administrators for seamless coordination
              </p>
            </Card>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">150+</div>
              <div className="text-sm text-muted-foreground">Events Approved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">24h</div>
              <div className="text-sm text-muted-foreground">Average Response</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};