
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import BenefitsSection from '@/components/BenefitsSection';
import ContactForm from '@/components/ContactForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSlider />
      <BenefitsSection />
      <ContactForm />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
