
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Users, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Aulas = () => {
  const navigate = useNavigate();

  const presencialClasses = [
    {
      name: 'Yoga Matinal',
      time: '07:00 - 08:00',
      days: 'Segunda, Quarta, Sexta',
      instructor: 'Ana Silva',
      level: 'Todos os níveis',
      capacity: '12 pessoas'
    },
    {
      name: 'Hatha Yoga',
      time: '18:30 - 19:30',
      days: 'Terça, Quinta',
      instructor: 'Carlos Santos',
      level: 'Iniciante',
      capacity: '15 pessoas'
    },
    {
      name: 'Vinyasa Flow',
      time: '19:45 - 20:45',
      days: 'Segunda, Quarta',
      instructor: 'Maria Oliveira',
      level: 'Intermediário',
      capacity: '10 pessoas'
    },
    {
      name: 'Yin Yoga',
      time: '20:00 - 21:00',
      days: 'Terça, Quinta, Sábado',
      instructor: 'João Costa',
      level: 'Todos os níveis',
      capacity: '8 pessoas'
    },
    {
      name: 'Yoga Terapêutico',
      time: '16:00 - 17:00',
      days: 'Quarta, Sexta',
      instructor: 'Lucia Fernandes',
      level: 'Especializado',
      capacity: '6 pessoas'
    },
    {
      name: 'Meditação',
      time: '06:30 - 07:00',
      days: 'Todos os dias',
      instructor: 'Ana Silva',
      level: 'Todos os níveis',
      capacity: '20 pessoas'
    }
  ];

  const handleOnlineClasses = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yoga-cream/30 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-yoga-sage to-yoga-lavender text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Nossas Aulas
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Escolha entre aulas presenciais em nosso estúdio ou aulas online no conforto da sua casa
          </p>
        </div>
      </section>

      {/* Class Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Presencial Classes */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yoga-sage to-yoga-mint text-white text-center py-12">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-light mb-4">
                  Aulas Presenciais
                </CardTitle>
                <p className="text-lg opacity-90">
                  Experimente a energia do nosso estúdio e conecte-se com nossa comunidade
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4">
                      <MapPin className="w-5 h-5 text-yoga-sage mr-2" />
                      <span className="text-gray-700 font-medium">Localização</span>
                    </div>
                    <p className="text-gray-600">
                      Rua da Paz, 123 - Vila Serenidade<br />
                      São Paulo - SP, 01234-567
                    </p>
                  </div>
                  
                  <div className="bg-yoga-sage/5 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-4">Informações importantes:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Chegue 10 minutos antes do início</li>
                      <li>• Traga sua esteira (ou alugue no local)</li>
                      <li>• Água disponível gratuitamente</li>
                      <li>• Vestiário com chuveiros disponível</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Online Classes */}
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-yoga-lavender to-yoga-rose text-white text-center py-12">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-8 h-8" />
                </div>
                <CardTitle className="text-3xl font-light mb-4">
                  Aulas Online
                </CardTitle>
                <p className="text-lg opacity-90">
                  Pratique no conforto da sua casa com aulas ao vivo e gravadas
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <Button
                      size="lg"
                      onClick={handleOnlineClasses}
                      className="bg-gradient-to-r from-yoga-lavender to-yoga-rose hover:scale-105 transition-all duration-300 text-white px-8 py-4 text-lg font-medium"
                    >
                      Acessar Aulas Online
                    </Button>
                    <p className="text-sm text-gray-600 mt-4">
                      Faça login para acessar nosso conteúdo exclusivo
                    </p>
                  </div>
                  
                  <div className="bg-yoga-lavender/5 p-6 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-4">O que você encontrará:</h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Aulas ao vivo e gravadas</li>
                      <li>• Múltiplas categorias disponíveis</li>
                      <li>• Acesso 24/7 ao conteúdo</li>
                      <li>• Suporte personalizado</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Presencial Schedule */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-800 mb-6">
              Horários das Aulas Presenciais
            </h2>
            <p className="text-xl text-gray-600">
              Confira nossa programação semanal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presencialClasses.map((classe, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-gray-800 mb-2">
                    {classe.name}
                  </CardTitle>
                  <div className="flex items-center text-yoga-sage">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="font-medium">{classe.time}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Dias:</span>
                      <p className="text-gray-600">{classe.days}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Instrutor:</span>
                      <p className="text-gray-600">{classe.instructor}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Nível:</span>
                      <p className="text-gray-600">{classe.level}</p>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-600">{classe.capacity}</span>
                    </div>
                  </div>
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

export default Aulas;
