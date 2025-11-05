"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Calendar,
  Target,
  CheckCircle,
  Vote,
} from "lucide-react";

export const AboutCouncil = () => {
  const [activeTab, setActiveTab] = useState("scope");

  const { data: representatives = [], isLoading } = useQuery({
    queryKey: ["student-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_representatives")
        .select("*")
        .order("pref_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Minimal decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-3xl rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-secondary/5 rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 px-6 py-3 text-sm font-medium border-primary/40 text-primary bg-primary/10">
              Student Council
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              About the Student Council
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-lg">
              Learn about the scope, composition, and functioning of the IIITD
              Student Council — the official student body representing voices
              and ideas on campus.
            </p>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex w-full justify-center mb-12 gap-3 bg-transparent p-2 rounded-2xl">
              <TabsTrigger
                value="scope"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Target className="h-4 w-4" />
                Scope & Guidelines
              </TabsTrigger>
              <TabsTrigger
                value="composition"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
              >
                <Users className="h-4 w-4" />
                Composition
              </TabsTrigger>
            </TabsList>

            {/* Scope Tab */}
            <TabsContent value="scope">
              <Card className="overflow-hidden border border-border/50 bg-card rounded-2xl">
                <CardHeader className="bg-primary/10 p-6">
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Target className="h-5 w-5 text-primary"/>
                    Scope & Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <p className="text-muted-foreground text-lg">
                    The scope of the student council is limited to non-academic and
                    extra-curricular activities within the Institute. It serves
                    as the main student body to represent these areas.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "The council will decide which clubs to start and which activities students should participate in.",
                      "All such decisions must be approved by the Dean of Students.",
                      "Student council will have a say in allocation of budget for student activities.",
                      "In matters concerning student interests, the council will send representatives to present student views.",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg text-sm">
                    <strong>Note:</strong> To learn more about other student bodies at IIITD:{" "}
                    <a
                      href="https://www.instagram.com/cc_iiitd/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline relative z-10 cursor-pointer"
                    >
                      Cultural Council
                    </a>
                    {", "}
                    <a
                      href="https://www.instagram.com/iiitdtechcouncil?igsh=czJpdTJrN3I5cGxl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline relative z-10 cursor-pointer"
                    >
                      Technical Council
                    </a>
                    {", "}
                    <a
                      href="https://www.instagram.com/iiitdsports?igsh=bHVyb3RvMXJ3eWNo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline relative z-10 cursor-pointer"
                    >
                      Sports Council
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Composition Tab */}
            <TabsContent value="composition">
              <Tabs defaultValue="members" className="w-full">
                <TabsList className="flex w-full justify-center mb-8 gap-2 bg-transparent p-2 rounded-xl">
                  <TabsTrigger
                    value="members"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    Members
                  </TabsTrigger>
                  <TabsTrigger
                    value="elections"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <Vote className="h-4 w-4" />
                    Elections
                  </TabsTrigger>
                  <TabsTrigger
                    value="meetings"
                    className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                  >
                    <Calendar className="h-4 w-4" />
                    Meetings
                  </TabsTrigger>
                </TabsList>

                {/* Members */}
                <TabsContent value="members">
                  <Card className="border border-border/50 bg-card rounded-2xl">
                    <CardHeader className="bg-primary/10 p-6">
                      <CardTitle className="text-foreground">
                        Student Council Leadership
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        The following are the current leadership positions and
                        election details.
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                      <div className="rounded-lg border p-4 text-sm">
                        <p>
                          <strong>Elections held:</strong> 26th May 2025
                        </p>
                        <p className="mt-1">
                          <strong>BTech 2025:</strong> 9 Representatives across
                          CSE, ECE, CSAM, CSSS, CSD, CSB, CSAI, EVE
                        </p>
                        <p className="mt-1">
                          Eligibility: CGPA of 7.0 or above
                        </p>
                        <p className="mt-1">
                          Student coordinators selected in consultation with the
                          Dean
                        </p>
                      </div>

                      <div className="rounded-lg border p-4 text-sm">
                        <h4 className="font-medium mb-2">
                          Leadership Positions
                        </h4>
                        <ul className="space-y-1">
                          <li>• President</li>
                          <li>• Vice-President</li>
                          <li>• Treasurer</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Elections */}
                <TabsContent value="elections">
                  <Card className="border border-border/50 bg-card rounded-2xl">
                    <CardHeader className="bg-primary/10 p-6">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Vote className="h-5 w-5 text-primary" />
                        Election Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid md:grid-cols-2 gap-6 text-sm">
                      <div>
                        <h4 className="font-medium mb-2">Election Schedule</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Elections held in March (even semester)</li>
                          <li>• Council takes charge by April</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Term Details</h4>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• Term is 1 year</li>
                          <li>• May be re-elected once more</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Meetings */}
                <TabsContent value="meetings">
                  <Card className="border border-border/50 bg-card rounded-2xl">
                    <CardHeader className="bg-primary/10 p-6">
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-5 w-5 text-primary" />
                        Meeting Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6 text-sm">
                      {[
                        {
                          title: "Meeting Coordination",
                          desc: "Each meeting is coordinated by a rotating member, responsible for writing and circulating minutes.",
                        },
                        {
                          title: "Patron & Invitees",
                          desc: "Dean of Student Affairs is Patron and permanent invitee; may nominate faculty/staff.",
                        },
                        {
                          title: "Meeting Minutes",
                          desc: "Minutes are recorded and sent to all members and invitees.",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary font-medium">
                            {idx + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">
                              {item.title}
                            </h4>
                            <p className="text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
