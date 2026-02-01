import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AuthorityStrip from "@/components/AuthorityStrip";
import ProblemSection from "@/components/ProblemSection";
import ServicesSection from "@/components/ServicesSection";
import HowItWorks from "@/components/HowItWorks";
import WhyGrowconic from "@/components/WhyGrowconic";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <AuthorityStrip />
      <ProblemSection />
      <ServicesSection />
      <HowItWorks />
      <WhyGrowconic />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;
