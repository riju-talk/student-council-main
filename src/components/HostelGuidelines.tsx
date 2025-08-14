import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, Phone, Mail, Users } from "lucide-react";

const HostelGuidelines = () => {
  const hostelRules = [
    "Hostel accommodation is a privilege and not a right. The Institute has the final say in allotment and can ask someone to vacate from the hostel if behavior etc. is not found acceptable.",
    "To go out of the campus after 11 pm, adult students need to sign the register. Minors are not allowed to be outside the campus after 11 pm.",
    "A student's parents and other same-gender guests may visit in his/her room from 7 am – 11 pm.",
    "Hostel residents are not allowed to keep motorized vehicle with them.",
    "Any act of intimidation or violence, wilful damage to property or drunk and riotous behaviour constitutes an offence.",
    "Use of narcotics and consumption of alcoholic beverages are strictly prohibited.",
    "Use of audio equipment in hostels is acceptable only if it is not objectionable to other residents.",
    "Rooms have to be vacated every semester for maintenance. Common storage facility will be provided for outside Delhi students during the holidays.",
    "Damages caused to any room or common areas of the hostel, unless they are due to natural wear-and-tear, may be charged to individuals causing the damage or residents collectively."
  ];

  const complaintContacts = [
    {
      type: "FACILITY",
      description: "Electricity, Air Conditioning, Plumbing, Carpentry, Housekeeping",
      phone: ["+91 9868878433", "+91 11 26906566", "Extn. 566"],
      email: "admin-facilities@iiitd.ac.in"
    },
    {
      type: "SECURITY",
      description: "Security Related Issues",
      phone: ["+91 9868244868", "+91 11 26907592", "Extn. 592"],
      email: "security@iiitd.ac.in"
    },
    {
      type: "IT",
      description: "IT Support",
      phone: ["+91 11 26907576", "Extn. 576"],
      email: "helpdesk@iiitd.ac.in"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Rules Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Hostel Rules & Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hostelRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <span className="text-sm leading-relaxed">{rule}</span>
              </div>
            ))}
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-2">
                <Phone className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-800 dark:text-amber-200">FMS Contact</span>
              </div>
              <p className="text-sm text-amber-700 dark:text-amber-300">+91 - 9868878433</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complaints Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            How to File Complaints
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">The Right Procedure:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <li>Email FMS (admin-facilities@iiitd.ac.in) for individual problems or issues in bathroom/washroom (clearly state the problem and your Room Number)</li>
                <li>They will reply with a Complaint Number. Note that down (Email will always give you a faster response)</li>
                <li>Call them once to remind if they do not respond on time</li>
              </ol>
            </div>
            
            <div className="grid gap-4">
              {complaintContacts.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{contact.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.phone.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{contact.email}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HostelGuidelines;