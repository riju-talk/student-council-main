import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload, CheckCircle, Clock, ArrowRight, Trash2 } from "lucide-react";
import { EventProposalModal } from "@/components/EventProposalModal";
import { EventClosureModal } from "@/components/EventClosureModal";
import { useState } from "react";

export const EventSubmission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosureModalOpen, setIsClosureModalOpen] = useState(false);
  const steps = [
    {
      icon: FileText,
      title: "Prepare Proposal",
      description: "Fill out the event details form with comprehensive information about your event"
    },
    {
      icon: Upload,
      title: "Upload Documents",
      description: "Attach required documents including budget plans, venue details, and promotional materials"
    },
    {
      icon: Clock,
      title: "Review Process",
      description: "Our team reviews your submission within 24-48 hours for completeness and feasibility"
    },
    {
      icon: CheckCircle,
      title: "Approval & Support",
      description: "Receive approval status and ongoing support for successful event execution"
    }
  ];

  const requirements = [
    "Event proposal with detailed description",
    "Budget breakdown and financial planning",
    "Venue requirements and logistics",
    "Timeline and event schedule",
    "Promotional materials and marketing plan",
    "Safety and emergency protocols"
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-text-primary text-primary bg-primary/10">
              <FileText className="h-3 w-3 mr-2 text-primary" />
              Event Portal
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Submit Your Event Proposal</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-muted-foreground">
              Transform your ideas into memorable campus events. Our streamlined process ensures
              quick approvals and comprehensive support for your initiatives.
            </p>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-text-primary/20">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-sm font-medium text-text-primary mb-2">Step {index + 1}</div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </Card>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Requirements */}
            <div>
              <h3 className="text-2xl font-bold mb-6">What You'll Need</h3>
              <Card className="p-6">
                <ul className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0 bg-primary/10 rounded-full text-primary" />
                      <span className="text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* CTA Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Ready to Start?</h3>
              <Card className="p-6 text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-primary" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2 text-primary">Event Proposal Form</h4>
                  <p className="text-sm text-muted-foreground mb-6 text-muted-foreground">
                    Complete the online form to submit your event proposal. Our team will review it promptly.
                  </p>
                </div>

                <Button
                  size="lg"
                  className="w-full mb-3 bg-gray-900 hover:bg-gray-800 text-white border-2 border-blue-400 hover:border-blue-300 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Start Event Proposal
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="destructive"
                  className="w-full mb-4 bg-gray-900 hover:bg-gray-800 text-red-400 border-2 border-red-400 hover:border-red-300 transition-colors"
                  onClick={() => setIsClosureModalOpen(true)}
                >
                  <Trash2 className="h-5 w-5 mr-2" />
                  Close Event
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>

                <p className="text-xs text-muted-foreground">
                  Need help? Contact us at rijusmit22400@iiitd.ac.in
                </p>
              </Card>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">48h</div>
              <div className="text-sm text-muted-foreground">Average Review Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Approval Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground">Events This Year</div>
            </div>
          </div>
        </div>
      </div>

      <EventProposalModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <EventClosureModal
        open={isClosureModalOpen}
        onOpenChange={setIsClosureModalOpen}
      />
    </section>
  );
};