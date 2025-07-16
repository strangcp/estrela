import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Calendar, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Json } from '@/integrations/supabase/types';

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  features: Json;
  is_promotional: boolean;
  original_price?: number;
}

const GerenciarAssinatura = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<any>(null);

  useEffect(() => {
    if (user) {
      fetchPlans();
      fetchCurrentSubscription();
    }
  }, [user]);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .eq('active', true)
        .order('order_index');

      if (error) throw error;
      setPlans(data || []);
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os planos",
        variant: "destructive"
      });
    }
  };

  const fetchCurrentSubscription = async () => {
    // Simulação de dados de assinatura atual
    // Em um ambiente real, isso viria de uma integração com Stripe ou similar
    setCurrentSubscription({
      plan: 'Plano Premium',
      status: 'active',
      next_billing: '2024-08-15',
      amount: 49.90
    });
  };

  const handleCancelSubscription = async () => {
    setLoading(true);
    try {
      // Aqui seria implementada a lógica de cancelamento
      // Por enquanto, apenas simula o cancelamento
      
      toast({
        title: "Solicitação enviada",
        description: "Sua solicitação de cancelamento foi enviada. Você receberá um email de confirmação."
      });
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      toast({
        title: "Erro",
        description: "Não foi possível processar o cancelamento",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = (planId: string) => {
    toast({
      title: "Redirecionando",
      description: "Você será redirecionado para a página de pagamento"
    });
    // Aqui seria implementada a lógica de upgrade/mudança de plano
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yoga-sage/10 to-yoga-lavender/10 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Você precisa estar logado para acessar esta página.</p>
            <NavLink to="/login" className="text-yoga-sage hover:underline">
              Fazer login
            </NavLink>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-sage/10 to-yoga-lavender/10 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <NavLink 
            to="/" 
            className="inline-flex items-center text-yoga-sage hover:text-yoga-sage/80 transition-colors mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao início
          </NavLink>
          <h1 className="text-3xl font-light text-gray-800 flex items-center">
            <CreditCard className="mr-3 h-8 w-8 text-yoga-sage" />
            Gerenciar Assinatura
          </h1>
          <p className="text-gray-600 mt-2">Gerencie sua assinatura e explore outros planos</p>
        </div>

        {/* Current Subscription */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Assinatura Atual
              <Badge variant={currentSubscription?.status === 'active' ? 'default' : 'secondary'}>
                {currentSubscription?.status === 'active' ? (
                  <>
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Ativa
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 h-3 w-3" />
                    Inativa
                  </>
                )}
              </Badge>
            </CardTitle>
            <CardDescription>
              Informações sobre sua assinatura atual
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentSubscription ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-gray-500">Plano</h4>
                    <p className="text-lg font-semibold">{currentSubscription.plan}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-gray-500">Próxima Cobrança</h4>
                    <p className="text-lg font-semibold flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {new Date(currentSubscription.next_billing).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-sm text-gray-500">Valor</h4>
                    <p className="text-lg font-semibold">R$ {currentSubscription.amount}/mês</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={handleCancelSubscription} disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Cancelar Assinatura'
                    )}
                  </Button>
                  <Button variant="outline">
                    Alterar Forma de Pagamento
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Você não possui uma assinatura ativa</p>
                <NavLink to="/assine">
                  <Button>Assinar Agora</Button>
                </NavLink>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Plans */}
        <Card>
          <CardHeader>
            <CardTitle>Planos Disponíveis</CardTitle>
            <CardDescription>
              Explore outros planos ou faça upgrade da sua assinatura
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold">R$ {plan.price}</span>
                      <span className="text-gray-500 ml-1">/mês</span>
                    </div>
                    {plan.is_promotional && plan.original_price && (
                      <div className="flex items-center mt-1">
                        <span className="text-sm text-gray-500 line-through">
                          R$ {plan.original_price}
                        </span>
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Promoção
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <ul className="space-y-2">
                      {Array.isArray(plan.features) ? plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          {typeof feature === 'string' ? feature : String(feature)}
                        </li>
                      )) : (
                        <li className="flex items-center text-sm">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Recursos inclusos
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <Button 
                    onClick={() => handleUpgrade(plan.id)}
                    className="w-full"
                    variant={currentSubscription?.plan === plan.name ? "secondary" : "default"}
                  >
                    {currentSubscription?.plan === plan.name ? 'Plano Atual' : 'Selecionar Plano'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GerenciarAssinatura;