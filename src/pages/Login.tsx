
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/aulas-online');
      }
    }
  }, [user, isAdmin, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Erro no login",
          description: error.message || "Email ou senha incorretos",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando...",
        });
        // O redirecionamento será feito automaticamente pelo useEffect
      }
    } catch (error) {
      console.error('Unexpected error during login:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    if (registerData.name && registerData.email && registerData.password) {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Bem-vindo à comunidade Serenity Yoga!",
      });
      navigate('/aulas-online');
    } else {
      toast({
        title: "Erro no cadastro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Email enviado!",
      description: "Instruções para redefinir sua senha foram enviadas para seu email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-cream/30 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-yoga-sage to-yoga-lavender text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Área do Aluno
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Acesse suas aulas online e continue sua jornada de bem-estar
          </p>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-light text-gray-800">
                  Bem-vindo de volta
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="login">Entrar</TabsTrigger>
                    <TabsTrigger value="register">Cadastrar</TabsTrigger>
                  </TabsList>
                  
                  {/* Login Tab */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({...prev, email: e.target.value}))}
                          placeholder="seu@email.com"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Senha
                        </label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={loginData.password}
                            onChange={(e) => setLoginData(prev => ({...prev, password: e.target.value}))}
                            placeholder="Sua senha"
                            className="w-full pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>
                      
                       <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yoga-sage to-yoga-lavender hover:from-yoga-sage/90 hover:to-yoga-lavender/90 text-white py-3 text-lg font-medium"
                        disabled={isLoading}
                      >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                      </Button>
                      
                      <div className="text-center">
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-sm text-yoga-sage hover:text-yoga-sage/80 font-medium"
                        >
                          Esqueci minha senha
                        </button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  {/* Register Tab */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Nome Completo
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={registerData.name}
                          onChange={(e) => setRegisterData(prev => ({...prev, name: e.target.value}))}
                          placeholder="Seu nome completo"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-2">
                          E-mail
                        </label>
                        <Input
                          id="register-email"
                          type="email"
                          required
                          value={registerData.email}
                          onChange={(e) => setRegisterData(prev => ({...prev, email: e.target.value}))}
                          placeholder="seu@email.com"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
                          Senha
                        </label>
                        <Input
                          id="register-password"
                          type="password"
                          required
                          value={registerData.password}
                          onChange={(e) => setRegisterData(prev => ({...prev, password: e.target.value}))}
                          placeholder="Criar senha"
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmar Senha
                        </label>
                        <Input
                          id="confirm-password"
                          type="password"
                          required
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData(prev => ({...prev, confirmPassword: e.target.value}))}
                          placeholder="Confirmar senha"
                          className="w-full"
                        />
                      </div>
                      
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-yoga-sage to-yoga-lavender hover:from-yoga-sage/90 hover:to-yoga-lavender/90 text-white py-3 text-lg font-medium"
                      >
                        Criar Conta
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
