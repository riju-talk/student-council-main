import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Phone, Users, Clock, Shield, Wifi, Car, Coffee } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

const Hostel = () => {
  const hostelRules = [
    "Suspension or termination (academic or non-academic) results in automatic hostel debarment and removal from all positions of responsibility.",
    "Hostel allocation is strictly for academic purposes within IIITD; no other reasons are accepted.",
    "Entry is gender-restricted — students may enter only their respective hostels.",
    "Students must be medically fit to reside in the hostel and maintain cooperation with hostel authorities; any misconduct may lead to debarment.",
    "Smoking, drugs, alcohol, and gambling are strictly prohibited; violations result in permanent hostel expulsion.",
    "Possession of prohibited materials or involvement in violence or property damage leads to immediate debarment and penalties.",
    "Cooking in rooms, vehicle parking, or leaving campus after midnight is prohibited; non-residents cannot stay overnight.",
    "Damage costs must be covered by the responsible student(s); all residents must follow decorum and hostel discipline."
  ];
  const generalInfo = {
    "Admin Email": " admin-hostel@iiitd.ac.in",
    "Common room Access for Day Scholars": "8:00 AM - 8:00 PM",
    "Mess Timings": "Breakfast: 7:30-10:00 AM, Lunch: 12:30-2:30 PM, Dinner: 8:00-9:30 PM",
    "Visiting Hours": "8:00 AM - 8:00 PM",
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent flex flex-col">
        <div className="sticky top-0 z-50 w-full">
          <Header />
        </div>
        <main className="container mx-auto px-4 py-8 my-5 flex-1">
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
                        <strong>Student Affairs (Emergency Contact):</strong> 97737 93614
                      </p>
                      <p className="text-sm">
                        <strong>Infirmary (Medical Assistance):</strong> 78271 03055
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </main>
          <Footer />
        </div>
    </PageTransition>
  );
};
export default Hostel;