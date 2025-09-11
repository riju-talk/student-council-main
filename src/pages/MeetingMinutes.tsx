import { Suspense, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";

// Type for the minutes table
type MeetingMinute = {
  meeting_id: number;
  created_at: string;
  title: string;
  description: string;
  date: string;
  link: string;
};

function MinutesList() {
  const [minutes, setMinutes] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMinutes = async () => {
      const { data, error } = await supabase
        .from("minutes" as any)
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching minutes:", error);
      } else {
        setMinutes(data ? (data as unknown as MeetingMinute[]) : []);
      }
      setLoading(false);
    };

    fetchMinutes();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12">
        <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4 animate-pulse" />
        <p className="text-muted-foreground">Loading meeting minutes...</p>
      </div>
    );
  }

  if (minutes.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No Meeting Minutes Available
        </h3>
        <p className="text-muted-foreground">
          Meeting minutes will be published here after each council session.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {minutes.map((meeting) => (
        <Card key={meeting.meeting_id} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {meeting.title}
              </CardTitle>
              <Badge>published</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Date */}
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2" />
                {new Date(meeting.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-3">
                {meeting.description}
              </p>

              {/* Download Link */}
              {meeting.link && (
                <a
                  href={meeting.link}
                  target="_blank"
                  rel="noopener noreferrer"
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
  );
}

const MeetingMinutes = () => {
  return (
    <PageTransition>
      <div className="min-h-screen relative overflow-hidden flex flex-col">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <main className="container mx-auto px-4 py-8 flex-1">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white font-display mb-4">
                Meeting Minutes
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access official records of Student Council meetings, decisions, and discussions.
              </p>
            </div>

            {/* Suspense for async load */}
            <Suspense
              fallback={
                <div className="text-center py-12">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4 animate-pulse" />
                  <p className="text-muted-foreground">Loading meeting minutes...</p>
                </div>
              }
            >
              <MinutesList />
            </Suspense>
          </main>

          <Footer />
        </div>
      </div>
    </PageTransition>
  );
};

export default MeetingMinutes;
