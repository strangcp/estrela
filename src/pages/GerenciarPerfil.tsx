import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, Save, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const GerenciarPerfil = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile({
          name: data.name || '',
          email: data.email || user.email || ''
        });
      } else {
        setProfile({
          name: '',
          email: user.email || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          email: profile.email,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o perfil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
      <div className="container mx-auto px-4 max-w-2xl">
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
            <User className="mr-3 h-8 w-8 text-yoga-sage" />
            Gerenciar Perfil
          </h1>
          <p className="text-gray-600 mt-2">Atualize suas informações pessoais</p>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>
              Mantenha suas informações atualizadas para uma melhor experiência
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile(prev => ({...prev, name: e.target.value}))}
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile(prev => ({...prev, email: e.target.value}))}
                  placeholder="Digite seu email"
                />
                <p className="text-sm text-gray-500">
                  Este email será usado para comunicações importantes
                </p>
              </div>

              <div className="flex gap-4 pt-6">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
                <NavLink to="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Cancelar
                  </Button>
                </NavLink>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configurações da Conta</CardTitle>
            <CardDescription>
              Gerencie configurações avançadas da sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">ID da Conta</h4>
                  <p className="text-sm text-gray-500">Seu identificador único</p>
                </div>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {user.id}
                </code>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Data de Cadastro</h4>
                  <p className="text-sm text-gray-500">Quando você se juntou a nós</p>
                </div>
                <span className="text-sm">
                  {new Date(user.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GerenciarPerfil;