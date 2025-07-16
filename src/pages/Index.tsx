
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import BenefitsSection from '@/components/BenefitsSection';
import ContactForm from '@/components/ContactForm';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, Settings } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Index = () => {
  const { user, isAdmin, loading } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Admin Banner */}
      {!loading && user && isAdmin && (
        <div className="bg-gradient-to-r from-yoga-sage to-yoga-lavender">
          <div className="container mx-auto px-4 py-3">
            <Alert className="border-white/20 bg-white/10 text-white">
              <Shield className="h-4 w-4 text-white" />
              <AlertDescription className="flex items-center justify-between">
                <span className="flex items-center">
                  <strong className="mr-2">Modo Administrador</strong>
                  Você tem acesso ao painel administrativo do site
                </span>
                <NavLink to="/admin">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Acessar Painel
                  </Button>
                </NavLink>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}
      
      <HeroSlider />
      <BenefitsSection />
      <ContactForm />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
