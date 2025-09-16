import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Phone, Mail, Search, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/ui/page-transition";

const ImportantContacts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["important-contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("important_contacts")
        .select("*")
        .order("display_order");
      
      if (error) throw error;
      return data;
    },
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.designation?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone_number.includes(searchQuery)
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-transparent flex flex-col">
        <div className="sticky top-0 z-50 w-full">
          <Header />
        </div>
        <main className="container mx-auto px-4 py-8 mt-20 flex-1">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-white font-display">Important Contacts</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Contact them in case of any query or emergency
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
                <h1 className="text-4xl font-bold text-white font-display">Important Contacts</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Contact them in case of any query or emergency
                </p>
              </motion.div>

              {/* Social Media Links */}
              <motion.div 
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <a 
                  href="https://facebook.com/iiitdelhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors hover-lift"
                >
                  <ExternalLink className="h-4 w-4" />
                  Facebook
                </a>
                <a 
                  href="https://instagram.com/iiitdelhi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors hover-lift"
                >
                  <ExternalLink className="h-4 w-4" />
                  Instagram
                </a>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors hover-lift">
                  Explore
                </button>
              </motion.div>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="hover-lift transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Type something in the input field to search the table for names, designations or emails"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background/50 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors duration-300"
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contacts Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="hover-lift transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Contact Directory
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-3">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="animate-pulse">
                            <div className="h-12 bg-muted rounded" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-semibold">NAME</TableHead>
                              <TableHead className="font-semibold">NUMBER</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredContacts.map((contact, index) => (
                              <motion.tr 
                                key={contact.id} 
                                className="hover:bg-muted/50 border-b transition-colors"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ x: 5, transition: { duration: 0.2 } }}
                              >
                                <TableCell>
                                  <div className="space-y-1">
                                    <div className="font-medium">{contact.name}</div>
                                    {contact.designation && (
                                      <div className="text-sm text-muted-foreground">
                                        {contact.designation}
                                        {contact.department && ` - ${contact.department}`}
                                      </div>
                                    )}
                                    {contact.email && (
                                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        <a 
                                          href={`mailto:${contact.email}`} 
                                          className="hover:text-primary hover:underline"
                                        >
                                          {contact.email}
                                        </a>
                                      </div>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-mono text-sm">{contact.phone_number}</span>
                                  </div>
                                </TableCell>
                              </motion.tr>
                            ))}
                          </TableBody>
                        </Table>
                        
                        {filteredContacts.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              No contacts found matching your search criteria.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Emergency Note */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Card className="border-destructive/20 bg-destructive/5 hover-lift transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-destructive/20 text-destructive rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-3 w-3" />
                      </div>
                      <div>
                        <h3 className="font-medium text-destructive mb-1">Emergency Contacts</h3>
                        <p className="text-sm text-muted-foreground">
                          For medical emergencies, contact campus medical center at Ext. 592. 
                          For security emergencies, contact security at +91 9868244868.
                        </p>
                      </div>
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

export default ImportantContacts;