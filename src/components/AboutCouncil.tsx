import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, BookOpen, Target, CheckCircle, Vote } from "lucide-react";

export const AboutCouncil = () => {
  const [activeTab, setActiveTab] = useState("scope");

  const representatives = [
    { name: "John Doe", position: "President", year: "B.Tech 2022", department: "CSE", email: "john.doe@iiitd.ac.in" },
    { name: "Jane Smith", position: "Vice President", year: "B.Tech 2022", department: "ECE", email: "jane.smith@iiitd.ac.in" },
    { name: "Mike Johnson", position: "Secretary", year: "B.Tech 2023", department: "CSAM", email: "mike.johnson@iiitd.ac.in" },
    { name: "Sarah Wilson", position: "Treasurer", year: "B.Tech 2023", department: "CSSS", email: "sarah.wilson@iiitd.ac.in" },
    { name: "Alex Brown", position: "CSE Representative", year: "B.Tech 2024", department: "CSE", email: "alex.brown@iiitd.ac.in" },
    { name: "Emma Davis", position: "CSD Representative", year: "B.Tech 2024", department: "CSD", email: "emma.davis@iiitd.ac.in" },
    { name: "Chris Lee", position: "CSB Representative", year: "B.Tech 2025", department: "CSB", email: "chris.lee@iiitd.ac.in" },
    { name: "Taylor Garcia", position: "CSAI Representative", year: "B.Tech 2025", department: "CSAI", email: "taylor.garcia@iiitd.ac.in" },
    { name: "Jordan Martinez", position: "EVE Representative", year: "B.Tech 2025", department: "EVE", email: "jordan.martinez@iiitd.ac.in" }
  ];

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
                      <a href="/cultural-council" className="text-primary hover:underline ml-1">click here</a>
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
                      <CardTitle>Student Representatives</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        The elections were conducted on 26th May 2025 for open positions in the Student Council.
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">BTech 2025: 9 Student Representatives</h4>
                          <ul className="text-sm space-y-1 text-muted-foreground">
                            <li>• 2 for CSE</li>
                            <li>• 1 for ECE, CSAM, CSSS, CSD, CSB, CSAI, EVE (each)</li>
                          </ul>
                          <p className="text-sm mt-2 font-medium">
                            Requirement: Any student representative must have a CGPA of 7.0 or above.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {representatives.map((rep, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium">{rep.name}</h4>
                                  <Badge variant="secondary">{rep.position}</Badge>
                                  <div className="text-sm text-muted-foreground space-y-1">
                                    <p>{rep.year} - {rep.department}</p>
                                    <a href={`mailto:${rep.email}`} className="text-primary hover:underline break-all">
                                      {rep.email}
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Student Coordinators</h4>
                          <p className="text-sm text-muted-foreground">
                            Student coordinators for identified activity clubs – students will select in consultation with the Dean.
                          </p>
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