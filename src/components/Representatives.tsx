import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Crown } from "lucide-react";

export const Representatives = () => {
  // Fetch representatives from Supabase
  const { data: representatives = [], isLoading } = useQuery({
    queryKey: ["student-representatives"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("student_representatives")
        .select("*")
        .order("pref_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const filteredReps = useMemo(() => {
    return representatives
      .filter((rep: any) => rep.position !== 'Member')
      .slice(0, 7);
  }, [representatives]);
  

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute inset-0 geometric-grid opacity-30"></div>
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary/30 via-secondary/20 to-transparent blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 via-secondary/20 to-transparent blur-2xl opacity-30" />
      </div>

      <div className="container px-4 relative z-10">
        {/* Representatives Section */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-primary/30 text-primary bg-primary/10">
              <Crown className="h-3 w-3 mr-2" />
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Student Representatives</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated students who represent your voice and work tirelessly to improve campus life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
  {isLoading ? (
    [...Array(4)].map((_, index) => (
      <Card
        key={index}
        className="p-6 animate-pulse rounded-2xl shadow-xl bg-card/80 border border-border/50"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="h-16 w-16 mb-2 ring-4 ring-primary/30 shadow-lg rounded-full bg-muted" />
          <div className="h-4 bg-muted rounded w-3/4 mb-2" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
        <div className="space-y-2 text-sm">
          <div className="h-3 bg-muted rounded w-1/3" />
        </div>
      </Card>
    ))
  ) : (
    <>
      {filteredReps.map((rep: any, index: number) => (
        <Card
          key={rep.id}
          className="p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-xl group relative overflow-hidden transition-transform hover:scale-105"
        >
          <div className="flex flex-col items-center relative z-10">
            <h3 className="font-bold text-xl text-white mb-1 text-center">
              {rep.name}
            </h3>
            <div className="flex items-center text-primary text-base font-medium mb-2 text-center">
              {rep.position}
            </div>
            <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full mb-2 tracking-wide">
              {rep.year === 0 ? "PhD" : `Batch of ${rep.year}`}
            </span>
            <div className="flex items-center text-muted-foreground text-sm mt-2">
              <span className="break-all">{rep.email}</span>
            </div>
          </div>
        </Card>
      ))}

      {/* 8th card: View All Representatives */}
      <Card
        key="view-all"
        className="cursor-pointer p-8 rounded-2xl bg-primary/80 backdrop-blur-sm border border-border/50 shadow-xl group relative overflow-hidden transition-transform hover:scale-105 flex flex-col items-center justify-center text-white"
        onClick={() => (window.location.href = "/representatives")}
      >
        <div className="text-center">
          <h3 className="font-bold text-xl mb-2">View All</h3>
          <p className="text-sm">See the full list of student representatives</p>
        </div>
      </Card>
    </>
  )}
</div>
        </div>
      </div>
    </section>
  );
};