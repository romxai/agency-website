import HeroSection from "@/components/HeroSection";
import PortfolioPreview from "@/components/PortfolioPreview";
import ServicesGrid from "@/components/ServicesGrid";
import TechStack from "@/components/TechStack";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PortfolioPreview />
      <div className="space-y-16 md:space-y-24">
        {" "}
        {/* Add spacing between sections */}
        <ServicesGrid />
        <TechStack />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </main>
  );
}
