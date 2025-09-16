import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

const Penalties = () => {
  const penaltyData = [
    {
      offense: "Forged documents (Medical certificate, rent agreement, tickets, bills, etc.)",
      penalty: "Hostel debarment (remaining tenure), ₹2000 fine, no position of responsibility.",
      graduatingPenalty: "1-year campus debarment, ₹2000 fine, alumni status cancelled, no recognition letter."
    },
    {
      offense: "Forged fee receipt / impersonation",
      penalty: "Hostel debarment, recovery of actual fee + ₹2000 fine, no position of responsibility.",
      graduatingPenalty: "1-year campus debarment, recovery of fee + ₹2000 fine, alumni status cancelled, no recognition letter."
    },
    {
      offense: "Misconduct in clubs/events/sponsorships",
      penalty: "Related bills/prizes not processed, fine = 2× cost involved, no position of responsibility.",
      graduatingPenalty: "1-year campus debarment, fine = 2× cost, alumni status cancelled (1 year), no recognition letter."
    },
    {
      offense: "Illicit material, fighting, weapons, property damage, rash driving, theft involvement, bullying, eve-teasing",
      penalty: "Hostel debarment, ₹5000 fine, community work, no position of responsibility.",
      additionalInfo: "Serious cases → referred to DAC. Rash driving → vehicle entry banned."
    },
    {
      offense: "Theft",
      penalty: "Return item OR pay cost, ₹2000 fine, community service."
    },
    {
      offense: "Damage to institute property/equipment",
      penalty: "5× cost of damaged item, hostel debarment, no position of responsibility."
    },
    {
      offense: "Illegal hostel stay (both allottee & day scholar)",
      penalty: "₹1000 fine, hostel debarment."
    },
    {
      offense: "Unauthorized parking",
      penalty: "₹500 per night fine, community work."
    },
    {
      offense: "Nuisance, littering, dirtiness",
      penalty: "₹2000 fine, community work."
    },
    {
      offense: "Allowing illegal entry (outsiders/alumni/pets)",
      penalty: "₹5000 fine, hostel debarment."
    },
    {
      offense: "Discrimination (religion, race, caste, sex, etc.)",
      penalty: "₹5000 fine, hostel debarment, report to DAC."
    },
    {
      offense: "Entering opposite gender hostel",
      penalty: "₹5000 fine, hostel debarment, community work, report to DAC."
    },
    {
      offense: "Gambling/betting",
      penalty: "₹5000 fine, hostel debarment, report to DAC."
    },
    {
      offense: "Violating hostel policies (non-cooperation, late vacating, late fee, unauthorized room change)",
      penalty: "₹3000 fine, hostel debarment."
    },
    {
      offense: "Misbehaving with faculty/staff/security",
      penalty: "₹2000 fine, report to DAC."
    },
    {
      offense: "Shifting furniture without consent",
      penalty: "₹500 fine."
    },
    {
      offense: "Extra mattress without approval",
      penalty: "₹1000 fine."
    },
    {
      offense: "Illegal use of electric appliances",
      penalty: "₹500 fine + appliance confiscation."
    },
    {
      offense: "Misconduct in the infirmary, mess, hostel, or campus",
      penalty: "₹3000 fine, hostel debarment, and report to DAC."
    },
    {
      offense: "Any other act not listed",
      penalty: "Penalty decided by Committee/SA office."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Header */}
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Badge variant="outline" className="mb-4 px-4 py-2 border-destructive/20 text-destructive hover-lift">
                  <AlertTriangle className="h-3 w-3 mr-2" />
                  Campus Discipline Policy
                </Badge>
                <h1 className="text-4xl font-bold text-white font-display">
                  IIIT Delhi – Campus Discipline & Fine Policy
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete guide to campus discipline policies and penalties for non-academic matters.
                </p>
              </motion.div>

              {/* Important Notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="border-destructive/20 bg-destructive/5 hover-lift transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive">
                      <Shield className="h-5 w-5" />
                      Important Notice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>• This policy applies to all students of IIIT Delhi for non-academic disciplinary matters.</p>
                      <p>• Penalties may include fines, hostel debarment, community service, and reporting to the Disciplinary Action Committee (DAC).</p>
                      <p>• For graduating batch students, additional penalties may include campus debarment and cancellation of alumni status.</p>
                      <p>• Serious offenses will be referred to the DAC for further action.</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Penalties Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="hover-lift transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Offense & Penalty Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-hidden">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-border">
                            <th className="text-left py-3 px-4 font-semibold">Offense</th>
                            <th className="text-left py-3 px-4 font-semibold">Penalty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {penaltyData.map((item, index) => (
                            <motion.tr 
                              key={index} 
                              className="border-b hover:bg-muted/50 transition-colors"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: (index * 0.05) + 0.3, ease: [0.16, 1, 0.3, 1] }}
                              whileHover={{ x: 5, transition: { duration: 0.2 } }}
                            >
                              <td className="py-4 px-4 text-sm font-medium max-w-md">
                                {item.offense}
                              </td>
                              <td className="py-4 px-4 text-sm">
                                <div className="space-y-2">
                                  <div className="text-destructive font-medium">
                                    {item.penalty}
                                  </div>
                                  {item.graduatingPenalty && (
                                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                                      <strong>Graduating Batch:</strong> {item.graduatingPenalty}
                                    </div>
                                  )}
                                  {item.additionalInfo && (
                                    <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded border border-orange-200">
                                      <strong>Additional Info:</strong> {item.additionalInfo}
                                    </div>
                                  )}
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Footer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="bg-muted/30 hover-lift transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium">
                        For more information or clarification on any penalty, contact the Student Affairs Office.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        This policy is subject to updates and amendments by the institute administration.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Please refer to this document for more details.
                      </p>
                      <button className="text-xs text-primary hover:text-black transition-colors border border-primary rounded px-2 py-1 mt-5 hover:bg-primary" onClick={() => window.open("https://mail.google.com/mail/u/0?ui=2&ik=ff089cdbdd&attid=0.1&permmsgid=msg-f:1841699105986221814&th=198f0794437696f6&view=att&disp=inline&realattid=198f078f8585d5fd1a91&zw", "_blank")}>
                        View Document
                      </button>
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

export default Penalties;