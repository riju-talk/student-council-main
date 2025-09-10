import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText, Clock } from "lucide-react";

const MeetingMinutes = () => {
  // Sample meeting minutes data - replace with actual data from your backend
  const meetingMinutes = [
    {
      id: 1,
      title: "Student Council General Meeting",
      date: "2024-01-15",
      duration: "2 hours",
      attendees: 12,
      status: "published",
      summary: "Discussion on upcoming events, budget allocation, and new club registrations.",
      downloadUrl: "#"
    },
    {
      id: 2,
      title: "Academic Affairs Committee Meeting",
      date: "2024-01-08", 
      duration: "1.5 hours",
      attendees: 8,
      status: "published",
      summary: "Review of academic policies and student feedback on course evaluation systems.",
      downloadUrl: "#"
    },
    {
      id: 3,
      title: "Cultural Committee Planning Session",
      date: "2024-01-03",
      duration: "1 hour",
      attendees: 6,
      status: "draft",
      summary: "Planning for annual cultural fest and budget discussions for various events.",
      downloadUrl: "#"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] animate-pulse"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-primary/10 to-transparent rounded-full animate-bounce [animation-duration:6s]"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-l from-accent/10 to-transparent rounded-lg rotate-45 animate-pulse [animation-duration:4s]"></div>
        <div className="absolute bottom-40 left-20 w-20 h-20 bg-gradient-to-t from-muted/20 to-transparent rounded-full animate-bounce [animation-duration:5s] [animation-delay:1s]"></div>
        <div className="absolute bottom-20 right-40 w-16 h-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg animate-pulse [animation-duration:3s] [animation-delay:2s]"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
      
        <main className="container mx-auto px-4 py-8 flex-1">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white font-display mb-4">Meeting Minutes</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access official records of Student Council meetings, decisions, and discussions.
            </p>
          </div>

          {/* Meeting Minutes Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetingMinutes.map((meeting) => (
              <Card key={meeting.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold line-clamp-2">
                      {meeting.title}
                    </CardTitle>
                    <Badge variant={meeting.status === 'published' ? 'default' : 'secondary'}>
                      {meeting.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Meeting Details */}
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {new Date(meeting.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {meeting.duration} • {meeting.attendees} attendees
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {meeting.summary}
                    </p>

                    {/* Download Link */}
                    {meeting.status === 'published' && (
                      <a
                        href={meeting.downloadUrl}
                        className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Download Minutes
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State or Load More */}
          {meetingMinutes.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Meeting Minutes Available
              </h3>
              <p className="text-muted-foreground">
                Meeting minutes will be published here after each council session.
              </p>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MeetingMinutes;