import { Header } from "@/components/Header";
import { About as AboutSection } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        <div className="sticky top-0 z-50 w-full">
          <Header />
        </div>
        <main className="flex-1 mt-20">
          <AboutSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;