import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, BookOpen, Target, CheckCircle, Vote } from "lucide-react";

export const AboutCouncil = () => {
  const [activeTab, setActiveTab] = useState("scope");

  // Fetch representatives from Supabase
  const { data: representatives = [], isLoading } = useQuery({
    queryKey: ["student-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_representatives")
        .select("*")
        .order("position", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">About Student Council</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about the scope, composition, and functioning of the IIITD Student Council
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scope" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Scope & Guidelines
              </TabsTrigger>
              <TabsTrigger value="composition" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Composition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scope" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Scope and Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    The scope of student council is limited to academic and extra curricular activities within the context of the Institute. 
                    The student council will be the main student body for these activities.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">The council will decide which clubs to start, which activities students should participate in, etc.</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">All such decisions must be approved by Dean of Students.</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Student council will have a say in allocation of budget for student activities.</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">In most matters where student interests are involved, student council will be invited to send a representative to give student's view.</span>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Note:</strong> To know about Cultural Council, which is an independent body, 
                      <a href="https://www.instagram.com/cc_iiitd/?hl=en" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">click here</a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="composition" className="space-y-6">
              <Tabs defaultValue="members" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="members" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Members
                  </TabsTrigger>
                  <TabsTrigger value="elections" className="flex items-center gap-2">
                    <Vote className="h-4 w-4" />
                    Elections
                  </TabsTrigger>
                  <TabsTrigger value="meetings" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Meetings
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="members" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Council Leadership</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        The following are the current leadership positions in the Student Council.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* --- Elections and Members Info --- */}
                        <div className="p-4 rounded-lg bg-gradient-to-r from-primary/90 to-accent/80 text-white shadow-md">
                          <p className="text-sm">
                            <strong>The elections were conducted on 26th May 2025 for open positions in the Student Council.</strong>
                          </p>
                          <p className="text-sm mt-1">
                            <strong>BTech 2025: 9 Student Representatives:</strong> 2 for CSE; 1 for ECE; 1 for CSAM, 1 for CSSS, 1 for CSD, 1 for CSB, 1 for CSAI, 1 for EVE
                          </p>
                          <p className="text-sm mt-1">
                            <strong>Any student representative must have a CGPA of 7.0 or above.</strong>
                          </p>
                          <p className="text-sm mt-1">
                            <strong>Student coordinators for identified activity clubs</strong> – students will select in consultation with the Dean.
                          </p>
                        </div>

                        {/* --- Leadership Positions --- */}
                        <div className="p-4 rounded-lg bg-gradient-to-r from-secondary/90 to-muted/80 text-foreground shadow-md border border-secondary">
                          <h4 className="font-medium mb-2">Leadership Positions</h4>
                          <ul className="text-sm space-y-1">
                            <li>• President</li>
                            <li>• Vice-President</li>
                            <li>• Treasurer</li>
                            <li>• Sports Secretary</li>
                          </ul>
                        </div>

                        {/* --- Leadership Cards --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {isLoading ? (
                            [...Array(4)].map((_, i) => (
                              <Card key={i} className="animate-pulse">
                                <CardContent className="p-4">
                                  <div className="space-y-2">
                                    <div className="h-5 bg-muted rounded w-3/4" />
                                    <div className="h-4 bg-muted rounded w-1/2" />
                                    <div className="h-4 bg-muted rounded w-full" />
                                  </div>
                                </CardContent>
                              </Card>
                            ))
                          ) : (
                            representatives
                              .filter(rep =>
                                ["President", "Vice-President", "Treasurer", "Sports Secretary"].includes(rep.position)
                              )
                              .map((rep, index) => (
                                <Card key={rep.id || index} className="hover:shadow-md transition-shadow">
                                  <CardContent className="p-4">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">{rep.name}</h4>
                                      <Badge variant="secondary">{rep.position}</Badge>
                                      <div className="text-sm text-muted-foreground space-y-1">
                                        <p>
                                          {rep.program || rep.year} - {rep.branch}
                                        </p>
                                        <a href={`mailto:${rep.email}`} className="text-primary hover:underline break-all">
                                          {rep.email}
                                        </a>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="elections" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Vote className="h-5 w-5" />
                        Election Process
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Election Schedule
                          </h4>
                          <ul className="text-sm space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              Every year, elections are held in March (even semester)
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              Newly elected council takes charge at the end of even semester (April)
                            </li>
                          </ul>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Term Details
                          </h4>
                          <ul className="text-sm space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              Term of a student council member is 1 year
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              May be re-elected at most once more
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="meetings" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Meeting Structure
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-sm font-medium">1</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Meeting Coordination</h4>
                            <p className="text-sm text-muted-foreground">
                              Each meeting will be coordinated by one of the members, who will be suggested by the council, and will be rotated. 
                              The coordinator will write and circulate the minutes of the meeting.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-sm font-medium">2</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Patron & Invitees</h4>
                            <p className="text-sm text-muted-foreground">
                              Dean of student affairs will be the Patron of this council and a permanent invitee to all meetings; 
                              he/she may nominate some faculty member or staff for this.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-sm font-medium">3</span>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Meeting Minutes</h4>
                            <p className="text-sm text-muted-foreground">
                              Minutes of all meetings of the student council will be recorded, and sent to all members and invitees.
                            </p>
                          </div>
                        </div>
                      </div>
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