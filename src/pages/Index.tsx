import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ServicesSection from "@/components/ServicesSection";
import SLASection from "@/components/SLASection";
import TechStackSection from "@/components/TechStackSection";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <MissionSection />
    <ServicesSection />
    <SLASection />
    <TechStackSection />
    <Footer />
  </div>
);

export default Index;
