import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Home, Phone, Users, Clock, Shield, Wifi, Car, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

const Hostel = () => {
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
    <PageTransition>
      <div className="min-h-screen bg-transparent flex flex-col relative">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 w-full">
          <Header />
        </div>
        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 mt-10 flex-1">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Hostel Information</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete guide to campus hostels, facilities, rules, and contact information.
              </p>
            </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-8">
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h1 className="text-4xl font-bold text-white font-display">Hostel Information</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete guide to campus hostels, facilities, rules, and contact information.
                </p>
              </motion.div>

              {/* General Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="hover-lift transition-all duration-300">
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
              </motion.div>

              {/* Hostel Rules */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="hover-lift transition-all duration-300">
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
              </motion.div>

              {/* Hostels List */}
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-white font-display">
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
                    {hostels.map((hostel, index) => (
                      <motion.div
                        key={hostel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <Card className="hover:shadow-lg transition-shadow h-full">
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
                      </motion.div>
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
              </motion.div>

              {/* Emergency Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="border-destructive/20 bg-destructive/5 hover-lift transition-all duration-300">
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
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};
export default Hostel;