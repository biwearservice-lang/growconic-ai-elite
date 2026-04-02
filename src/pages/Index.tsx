import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AuthorityStrip from "@/components/AuthorityStrip";
import ProblemSection from "@/components/ProblemSection";
import SystemVideoSection from "@/components/SystemVideoSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import WhyGrowconic from "@/components/WhyGrowconic";

import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AuthorityStrip />
      <ProblemSection />
      <SystemVideoSection />
      <ServicesSection />
      <HowItWorks />
      <WhyGrowconic />
      
      <FinalCTA />
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Index;
