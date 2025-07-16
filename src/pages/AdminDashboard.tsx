
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Home, CreditCard, Play, Users, Settings, GraduationCap } from 'lucide-react';
import AdminHomeContent from '@/components/admin/AdminHomeContent';
import AdminPlansContent from '@/components/admin/AdminPlansContent';
import AdminClassesContent from '@/components/admin/AdminClassesContent';
import AdminUsersContent from '@/components/admin/AdminUsersContent';

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/admin/login');
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yoga-sage"></div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yoga-sage to-yoga-lavender rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Painel Administrativo</h1>
              <p className="text-sm text-gray-500">Estrela Yoga</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Home size={16} />
              <span>Voltar ao Site</span>
            </Button>
            <Button
              onClick={() => navigate('/aulas-online')}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <GraduationCap size={16} />
              <span>Assistir Aulas</span>
            </Button>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </Button>
          </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="home" className="flex items-center space-x-2">
              <Home size={16} />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="plans" className="flex items-center space-x-2">
              <CreditCard size={16} />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center space-x-2">
              <Play size={16} />
              <span className="hidden sm:inline">Aulas</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users size={16} />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <AdminHomeContent />
          </TabsContent>

          <TabsContent value="plans">
            <AdminPlansContent />
          </TabsContent>

          <TabsContent value="classes">
            <AdminClassesContent />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersContent />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
