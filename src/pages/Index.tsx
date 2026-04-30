import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import ServicesOverview from "@/components/ServicesOverview";
import StatsSection from "@/components/StatsSection";
import WhyUsSection from "@/components/WhyUsSection";
import HowItWorks from "@/components/HowItWorks";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-transparent">
    <Header />
    <main className="pt-[110px]">
      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <ServicesOverview />
      <StatsSection />
      <WhyUsSection />
      <HowItWorks />
      <CTABanner />
    </main>
    <Footer />
  </div>
);

export default Index;
