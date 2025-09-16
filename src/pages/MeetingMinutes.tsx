import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, FileText } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

// Use the generated Supabase type for meeting minutes
type MeetingMinute = Tables<"minutes">;

function MinutesList() {
  const [minutes, setMinutes] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const fetchMinutes = async () => {
      // Debug connection
      setDebugInfo("Attempting to fetch minutes...");
      
      // Test connection with a count query first
      const { count, error: countError } = await supabase
        .from("minutes")
        .select("*", { count: 'exact', head: true });
      
      setDebugInfo(prev => prev + `\nCount: ${count}, Count error: ${countError?.message || 'None'}`);
      
      const { data, error } = await supabase
        .from("minutes")
        .select("*")
        .order("created_at", { ascending: false }); // Use created_at for ordering

      if (error) {
        setDebugInfo(prev => prev + `\nFetch error: ${error.message}`);
        setMinutes([]);
      } else {
        setDebugInfo(prev => prev + `\nFetched ${data?.length || 0} minutes successfully`);
        setMinutes(data || []);
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
        {debugInfo && (
          <div className="mt-4 p-4 bg-muted/20 rounded-lg text-left max-w-md mx-auto">
            <h4 className="font-semibold mb-2">Debug Info:</h4>
            <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
          </div>
        )}
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
        {debugInfo && (
          <div className="mt-6 p-4 bg-muted/20 rounded-lg text-left max-w-md mx-auto">
            <h4 className="font-semibold mb-2">Debug Info:</h4>
            <pre className="text-xs whitespace-pre-wrap">{debugInfo}</pre>
            <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">Likely Issue: RLS Policy</p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                If count shows 0 but data exists in Supabase, you need to create a Row Level Security policy:
              </p>
              <code className="block mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-xs">
                CREATE POLICY "Public read minutes" ON public.minutes FOR SELECT USING (true);
              </code>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {minutes.map((meeting) => (
        <Card
          key={meeting.meeting_id}
          className="hover:shadow-lg transition-shadow duration-300"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold line-clamp-2">
                {meeting.title}
              </CardTitle>
              <Badge>Published</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 mr-2" />
                {new Date(meeting.date || meeting.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-3">
                {meeting.description}
              </p>

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
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)] animate-pulse"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />

          <main className="container mx-auto px-4 py-8 flex-1">
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-white font-display mb-4">
                Meeting Minutes
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access official records of Student Council meetings, decisions,
                and discussions.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="text-center py-12">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-4 animate-pulse" />
                  <p className="text-muted-foreground">
                    Loading meeting minutes...
                  </p>
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
