import { Header } from "@/components/Header";
import { About as AboutSection } from "@/components/About";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/ui/page-transition";

const About = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <AboutSection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default About;