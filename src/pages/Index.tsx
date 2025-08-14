import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Representatives } from "@/components/Representatives";
import { EventSubmission } from "@/components/EventSubmission";
import { Footer } from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Representatives />
        <EventSubmission />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
