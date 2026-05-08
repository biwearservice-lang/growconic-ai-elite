import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AuthorityStrip from "@/components/AuthorityStrip";
import ProblemSection from "@/components/ProblemSection";
import SystemVideoSection from "@/components/SystemVideoSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import WhyGrowconic from "@/components/WhyGrowconic";
import ParticlesOverlay from "@/components/ParticlesOverlay";

import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <ParticlesOverlay />
        <div className="relative z-[2]">
          <Hero />
          <AuthorityStrip />
          <ProblemSection />
          <SystemVideoSection />
          <ServicesSection />
        </div>
      </div>
      <HowItWorks />
      <WhyGrowconic />
      
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;

