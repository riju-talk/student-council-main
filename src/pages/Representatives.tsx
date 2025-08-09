import { Header } from "@/components/Header";
import { Representatives as RepresentativesSection } from "@/components/Representatives";
import { Footer } from "@/components/Footer";

const Representatives = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <RepresentativesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Representatives;