import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Home, Phone, Users, Clock, Shield, Wifi, Car, Coffee, Search } from "lucide-react";
import HostelGuidelines from "@/components/HostelGuidelines";
import { useState } from "react";

const Hostel = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: hostels = [], isLoading } = useQuery({
    queryKey: ["hostels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hostel_info")
        .select("*")
        .order("hostel_name");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: messCommittee = [], isLoading: isCommitteeLoading } = useQuery({
    queryKey: ["mess-hostel-committee"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("mess_hostel_committee")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data;
    },
  });

  const filteredCommittee = messCommittee.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const facilityIcons: { [key: string]: any } = {
    "WiFi": Wifi,
    "Parking": Car,
    "Cafeteria": Coffee,
    "Security": Shield,
    "Common Room": Users,
  };

  const hostelRules = [
    "Visitors must register at the reception",
    "No outside guests after 11 PM",
    "Maintain cleanliness in common areas",
    "No loud music or disturbances after 10 PM",
    "Report any maintenance issues immediately",
    "Follow mess timings strictly",
    "ID cards must be carried at all times",
    "No smoking or alcohol consumption"
  ];

  const generalInfo = {
    "Check-in Time": "2:00 PM - 6:00 PM",
    "Check-out Time": "10:00 AM",
    "Mess Timings": "Breakfast: 7:30-9:30 AM, Lunch: 12:30-2:30 PM, Dinner: 7:30-9:30 PM",
    "Visiting Hours": "9:00 AM - 10:00 PM",
    "Emergency Contact": "+91 11 26907504",
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Hostel Information</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete guide to campus hostels, facilities, rules, and contact information.
            </p>
          </div>

          {/* General Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                General Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(generalInfo).map(([key, value]) => (
                  <div key={key} className="flex flex-col space-y-1">
                    <span className="font-medium text-sm">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hostel Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Hostel Rules & Regulations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hostelRules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">{index + 1}</span>
                    </div>
                    <span className="text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Hostels List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Home className="h-6 w-6" />
              Campus Hostels
            </h2>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded" />
                        <div className="h-4 bg-muted rounded w-3/4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : hostels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hostels.map((hostel) => (
                  <Card key={hostel.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{hostel.hostel_name}</CardTitle>
                      {hostel.capacity && (
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          Capacity: {hostel.capacity}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {hostel.warden_name && (
                        <div>
                          <h4 className="font-medium text-sm mb-1">Warden</h4>
                          <p className="text-sm text-muted-foreground">{hostel.warden_name}</p>
                          {hostel.warden_contact && (
                            <div className="flex items-center gap-2 mt-1">
                              <Phone className="h-3 w-3" />
                              <span className="text-sm">{hostel.warden_contact}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {hostel.facilities && hostel.facilities.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm mb-2">Facilities</h4>
                          <div className="flex flex-wrap gap-1">
                            {hostel.facilities.map((facility, index) => {
                              const IconComponent = facilityIcons[facility] || Home;
                              return (
                                <Badge key={index} variant="outline" className="text-xs">
                                  <IconComponent className="h-3 w-3 mr-1" />
                                  {facility}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {hostel.timings && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Timings
                          </h4>
                          <div className="text-sm text-muted-foreground">
                            {Object.entries(hostel.timings).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span>{key}:</span>
                                <span>{value as string}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {hostel.emergency_contact && (
                        <div>
                          <h4 className="font-medium text-sm mb-1 flex items-center gap-1">
                            <Shield className="h-3 w-3" />
                            Emergency Contact
                          </h4>
                          <p className="text-sm text-muted-foreground">{hostel.emergency_contact}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Hostel information will be available soon. Please contact the administration for details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Hostel Guidelines */}
          <HostelGuidelines />

          {/* Mess and Hostel Committee */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mess and Hostel Committee
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {isCommitteeLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4 font-medium">Name</th>
                        <th className="text-left py-2 px-4 font-medium">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCommittee.map((member) => (
                        <tr key={member.id} className="border-b hover:bg-muted/50">
                          <td className="py-2 px-4">{member.name}</td>
                          <td className="py-2 px-4">
                            <a 
                              href={`mailto:${member.email}`}
                              className="text-primary hover:underline"
                            >
                              {member.email}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Hostel Fee Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Hostel & Mess Fee Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm space-y-2">
                <p>
                  A regular student was charged for single room occupancy and the twin-sharing basis an amount of <strong>Rs 90,000</strong> and <strong>Rs 68,000</strong> respectively for two semesters except breaks.
                </p>
                <p>
                  Hostel fees are revised annually. Mess charges may be between <strong>Rs 10,000 and Rs 15,000</strong> for four months.
                </p>
                <p className="text-muted-foreground">
                  Hostel security will be refunded only at the time of passing out/leaving the institute through No Dues Form.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Hostel Key Conduct Rules */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Hostel Key Conduct Rules
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="space-y-2">
                  <p>• Any form of suspension or termination due to academic/non-academic reasons by the institute will automatically lead to hostel debarment & removal from the position of responsibility of any kind.</p>
                  <p>• Hostel allocation is only for academic requirements within the institute. No other means for allocation will be entertained.</p>
                  <p>• Students of the same gender are only allowed to enter in their respective hostels (Institute girl students are not allowed to enter the institute Boys Hostel and vice versa).</p>
                  <p>• The students should be medically fit to join the hostel.</p>
                  <p>• Smoking, use of narcotics, consumption of alcoholic beverages and gambling are strictly prohibited. Any individual(s) found involved (actively or passively) will be permanently debarred from hostel accommodation immediately.</p>
                  <p>• If any prohibited material is found inside the room, the student will be immediately debarred from the hostel.</p>
                  <p>• Any act of intimidation or violence, willful damage to property and drunken riotous behavior constitute an offence.</p>
                  <p>• Hostel residents are not allowed to keep motorized vehicles on the campus.</p>
                  <p>• Hostel residents are not allowed to leave the campus after midnight.</p>
                  <p>• A non-resident cannot stay in the hostel overnight.</p>
                  <p>• Cooking in the rooms is prohibited.</p>
                  <p>• No Day Scholars Allowed in Hostel Rooms: Day scholars are not permitted inside hostel rooms at any time.</p>
                  <p>• Common Rooms Access for Day Scholars: Common rooms will be open for day scholars from 8.00 a.m. until 8 p.m.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fine List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                Fine List
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2 font-medium text-sm">S. No.</th>
                      <th className="text-left py-2 px-2 font-medium text-sm">Type of Applicability</th>
                      <th className="text-left py-2 px-2 font-medium text-sm">Applicable Fine</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">1</td>
                      <td className="py-2 px-2">Rash Driving in the campus</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 2000</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">2</td>
                      <td className="py-2 px-2">Damage to institute property/equipment</td>
                      <td className="py-2 px-2 text-destructive font-medium">5X to the cost + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">3</td>
                      <td className="py-2 px-2">Illegal stay in hostel</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 1000 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">4</td>
                      <td className="py-2 px-2">Unauthorized parking</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 500/night + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">5</td>
                      <td className="py-2 px-2">Creating nuisance/littering</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 2000 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">6</td>
                      <td className="py-2 px-2">Allowing illegal entry to outsiders</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 2000 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">7</td>
                      <td className="py-2 px-2">Misbehaving with Faculty/Officers/Security</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 2000 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">8</td>
                      <td className="py-2 px-2">Shifting furniture without consent</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 500 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">9</td>
                      <td className="py-2 px-2">Illegal use of electric appliances</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 500 + punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">10</td>
                      <td className="py-2 px-2">Acquisition of weapons/banned substances</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 5000 + severe punishment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-2 px-2">11</td>
                      <td className="py-2 px-2">Misdemeanor in infirmary/mess/hostel</td>
                      <td className="py-2 px-2 text-destructive font-medium">Rs. 3000 + punishment</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Information */}
          <Card className="border-destructive/20 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <Shield className="h-5 w-5" />
                Emergency Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm">
                  <strong>Medical Emergency:</strong> Contact campus medical center at Ext. 592
                </p>
                <p className="text-sm">
                  <strong>Security Emergency:</strong> Contact security at +91 9868244868
                </p>
                <p className="text-sm">
                  <strong>Hostel Warden:</strong> Contact your respective hostel warden immediately
                </p>
                <p className="text-sm">
                  <strong>Dean Student Affairs:</strong> +91 9810165438
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  <strong>Contact:</strong> Hostel-related communications shall be done via only admin-hostel@iiitd.ac.in
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Hostel;