
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Assine = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'meditacao',
      name: 'Meditação',
      price: 'R$ 49',
      period: '/mês',
      description: 'Práticas focadas em mindfulness e meditação',
      features: [
        'Aulas de meditação guiada',
        'Técnicas de respiração',
        'Práticas de mindfulness',
        'Acesso por 30 dias',
        'Suporte por email'
      ],
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 'iniciantes',
      name: 'Yoga para Iniciantes',
      price: 'R$ 69',
      period: '/mês',
      description: 'Perfeito para quem está começando no yoga',
      features: [
        'Aulas básicas de yoga',
        'Posturas fundamentais',
        'Técnicas de respiração',
        'Flexibilidade e força',
        'Suporte personalizado'
      ],
      color: 'from-green-400 to-green-600'
    },
    {
      id: 'avancado',
      name: 'Yoga Avançado',
      price: 'R$ 89',
      period: '/mês',
      description: 'Para praticantes experientes',
      features: [
        'Posturas avançadas',
        'Sequências complexas',
        'Técnicas avançadas',
        'Workshops especiais',
        'Acompanhamento exclusivo'
      ],
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'terapeutico',
      name: 'Yoga Terapêutico',
      price: 'R$ 79',
      period: '/mês',
      description: 'Yoga focado na cura e reabilitação',
      features: [
        'Posturas terapêuticas',
        'Alívio de dores',
        'Reabilitação física',
        'Acompanhamento especializado',
        'Práticas personalizadas'
      ],
      color: 'from-pink-400 to-pink-600'
    }
  ];

  const premiumPlan = {
    id: 'completo',
    name: 'Acesso Completo',
    price: 'R$ 149',
    originalPrice: 'R$ 286',
    period: '/mês',
    description: 'Acesso ilimitado a todas as categorias',
    features: [
      'Todas as categorias incluídas',
      'Aulas presenciais e online',
      'Workshops exclusivos',
      'Acompanhamento personalizado',
      'Acesso prioritário a novos conteúdos',
      'Comunidade VIP',
      'Suporte 24/7'
    ],
    color: 'from-yoga-sage to-yoga-lavender',
    popular: true
  };

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Plano selecionado!",
      description: "Redirecionando para o pagamento...",
    });
    // Here you would redirect to payment gateway
    console.log(`Subscribing to plan: ${planId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-cream/30 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-yoga-sage to-yoga-lavender text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Escolha seu Plano
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Encontre o plano perfeito para sua jornada de bem-estar e transformação
          </p>
        </div>
      </section>

      {/* Premium Plan - Highlighted */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden shadow-2xl border-0">
              {/* Popular Badge */}
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Mais Popular
              </div>
              
              <CardHeader className={`bg-gradient-to-r ${premiumPlan.color} text-white text-center py-12`}>
                <CardTitle className="text-3xl font-light mb-2">
                  {premiumPlan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-5xl font-light">{premiumPlan.price}</span>
                  <span className="text-xl opacity-90">{premiumPlan.period}</span>
                  <div className="text-sm opacity-75 mt-2">
                    <span className="line-through">{premiumPlan.originalPrice}</span>
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded">48% OFF</span>
                  </div>
                </div>
                <p className="text-lg opacity-90">
                  {premiumPlan.description}
                </p>
              </CardHeader>
              
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-medium mb-4">Tudo que está incluído:</h4>
                    <ul className="space-y-3">
                      {premiumPlan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="bg-gradient-to-br from-yoga-sage/10 to-yoga-lavender/10 p-6 rounded-lg text-center">
                      <h4 className="text-xl font-medium mb-4 text-gray-800">
                        Economia de R$ 137/mês
                      </h4>
                      <p className="text-gray-600 mb-6">
                        Com o plano completo, você economiza significativamente comparado aos planos individuais.
                      </p>
                      <Button
                        size="lg"
                        onClick={() => handleSubscribe(premiumPlan.id)}
                        className={`w-full bg-gradient-to-r ${premiumPlan.color} hover:scale-105 transition-all duration-300 text-white py-4 text-lg font-medium`}
                      >
                        Assinar Agora
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Individual Plans */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-6">
              Ou escolha por categoria
            </h2>
            <p className="text-xl text-gray-600">
              Planos específicos para suas necessidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardHeader className={`bg-gradient-to-r ${plan.color} text-white text-center py-8`}>
                  <CardTitle className="text-xl font-light mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="mb-4">
                    <span className="text-3xl font-light">{plan.price}</span>
                    <span className="text-sm opacity-90">{plan.period}</span>
                  </div>
                  <p className="text-sm opacity-90">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => handleSubscribe(plan.id)}
                  >
                    Assinar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Assine;
