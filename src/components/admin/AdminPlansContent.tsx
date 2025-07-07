
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type SubscriptionPlanRow = Database['public']['Tables']['subscription_plans']['Row'];

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  features: string[];
  category: string;
  is_promotional: boolean;
  active: boolean;
  order_index: number;
}

const AdminPlansContent = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    price: 0,
    original_price: null as number | null,
    features: [''],
    category: '',
    is_promotional: false,
  });

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('order_index');

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedPlans: SubscriptionPlan[] = (data || []).map((plan: SubscriptionPlanRow) => ({
        ...plan,
        features: Array.isArray(plan.features) ? plan.features as string[] : []
      }));
      
      setPlans(transformedPlans);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar planos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePlan = async (plan: SubscriptionPlan) => {
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .update({
          name: plan.name,
          description: plan.description,
          price: plan.price,
          original_price: plan.original_price,
          features: plan.features,
          category: plan.category,
          is_promotional: plan.is_promotional,
        })
        .eq('id', plan.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Plano atualizado com sucesso',
      });
      setEditingPlan(null);
      loadPlans();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar plano',
        variant: 'destructive',
      });
    }
  };

  const addPlan = async () => {
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .insert([{
          ...newPlan,
          order_index: plans.length,
        }]);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Plano adicionado com sucesso',
      });
      setShowAddForm(false);
      setNewPlan({
        name: '',
        description: '',
        price: 0,
        original_price: null,
        features: [''],
        category: '',
        is_promotional: false,
      });
      loadPlans();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao adicionar plano',
        variant: 'destructive',
      });
    }
  };

  const deletePlan = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscription_plans')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Plano removido com sucesso',
      });
      loadPlans();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover plano',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Planos de Assinatura</span>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus size={16} className="mr-2" />
              Novo Plano
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium mb-3">Novo Plano</h3>
              <div className="space-y-3">
                <Input
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                  placeholder="Nome do plano"
                />
                <Textarea
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Descrição"
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan({ ...newPlan, price: parseFloat(e.target.value) })}
                    placeholder="Preço"
                  />
                  <Input
                    type="number"
                    value={newPlan.original_price || ''}
                    onChange={(e) => setNewPlan({ ...newPlan, original_price: e.target.value ? parseFloat(e.target.value) : null })}
                    placeholder="Preço original (opcional)"
                  />
                </div>
                <Input
                  value={newPlan.category}
                  onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value })}
                  placeholder="Categoria"
                />
                <div className="flex space-x-2">
                  <Button onClick={addPlan}>
                    <Save size={16} className="mr-1" />
                    Salvar
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </div>
          )}

          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-lg p-4">
              {editingPlan === plan.id ? (
                <div className="space-y-3">
                  <Input
                    value={plan.name}
                    onChange={(e) => setPlans(plans.map(p => 
                      p.id === plan.id ? { ...p, name: e.target.value } : p
                    ))}
                    placeholder="Nome do plano"
                  />
                  <Textarea
                    value={plan.description}
                    onChange={(e) => setPlans(plans.map(p => 
                      p.id === plan.id ? { ...p, description: e.target.value } : p
                    ))}
                    placeholder="Descrição"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      value={plan.price}
                      onChange={(e) => setPlans(plans.map(p => 
                        p.id === plan.id ? { ...p, price: parseFloat(e.target.value) } : p
                      ))}
                      placeholder="Preço"
                    />
                    <Input
                      type="number"
                      value={plan.original_price || ''}
                      onChange={(e) => setPlans(plans.map(p => 
                        p.id === plan.id ? { ...p, original_price: e.target.value ? parseFloat(e.target.value) : null } : p
                      ))}
                      placeholder="Preço original"
                    />
                  </div>
                  <Input
                    value={plan.category}
                    onChange={(e) => setPlans(plans.map(p => 
                      p.id === plan.id ? { ...p, category: e.target.value } : p
                    ))}
                    placeholder="Categoria"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => updatePlan(plan)}>
                      <Save size={16} className="mr-1" />
                      Salvar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingPlan(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                    <p className="text-lg font-semibold text-yoga-sage mt-1">
                      R$ {plan.price.toFixed(2)}
                      {plan.original_price && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          R$ {plan.original_price.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">Categoria: {plan.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPlan(plan.id)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPlansContent;
