import HeroSection from "@/components/HeroSection";
import PortfolioPreview from "@/components/PortfolioPreview";
import ServicesGrid from "@/components/ServicesGrid";
import TechStackSection from "@/components/TechStackSection";
import ClientsSection from "@/components/ClientsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PortfolioPreview />
        <ServicesGrid />
        <TechStackSection />
        <ClientsSection />
        <TestimonialsSection />
        <ContactSection />

    </main>
  );
}
