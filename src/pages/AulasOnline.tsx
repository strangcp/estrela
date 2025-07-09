
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Clock, User, Star, GraduationCap, BookOpen, Heart } from 'lucide-react';

const AulasOnline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Todas as Aulas', count: 24 },
    { id: 'meditacao', name: 'Meditação', count: 6 },
    { id: 'iniciantes', name: 'Iniciantes', count: 8 },
    { id: 'avancado', name: 'Avançado', count: 5 },
    { id: 'terapeutico', name: 'Terapêutico', count: 5 }
  ];

  const classes = [
    {
      id: 1,
      title: 'Meditação Matinal Guiada',
      category: 'meditacao',
      instructor: 'Ana Silva',
      duration: '15 min',
      level: 'Todos os níveis',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop',
      description: 'Comece seu dia com paz e foco através desta meditação guiada.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 2,
      title: 'Yoga para Iniciantes - Primeira Aula',
      category: 'iniciantes',
      instructor: 'Carlos Santos',
      duration: '30 min',
      level: 'Iniciante',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop',
      description: 'Introdução completa ao yoga com posturas básicas e respiração.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 3,
      title: 'Vinyasa Flow Avançado',
      category: 'avancado',
      instructor: 'Maria Oliveira',
      duration: '45 min',
      level: 'Avançado',
      rating: 4.9,
      thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop',
      description: 'Sequência dinâmica e desafiadora para praticantes experientes.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 4,
      title: 'Yoga Terapêutico para Coluna',
      category: 'terapeutico',
      instructor: 'João Costa',
      duration: '25 min',
      level: 'Terapêutico',
      rating: 4.7,
      thumbnail: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=250&fit=crop',
      description: 'Posturas específicas para alívio de dores nas costas.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 5,
      title: 'Respiração e Mindfulness',
      category: 'meditacao',
      instructor: 'Lucia Fernandes',
      duration: '20 min',
      level: 'Todos os níveis',
      rating: 4.8,
      thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=250&fit=crop',
      description: 'Técnicas de respiração para reduzir estresse e ansiedade.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 6,
      title: 'Hatha Yoga Suave',
      category: 'iniciantes',
      instructor: 'Ana Silva',
      duration: '35 min',
      level: 'Iniciante',
      rating: 4.6,
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop',
      description: 'Prática suave focada no alinhamento e estabilidade.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const filteredClasses = selectedCategory === 'all' 
    ? classes 
    : classes.filter(classe => classe.category === selectedCategory);

  const handleWatchVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
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
            Acesse suas aulas, pratique e evolua sua jornada no yoga
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="watch-classes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="watch-classes" className="flex items-center space-x-2">
                <GraduationCap size={16} />
                <span>Assistir Aulas</span>
              </TabsTrigger>
              <TabsTrigger value="my-progress" className="flex items-center space-x-2">
                <BookOpen size={16} />
                <span>Meu Progresso</span>
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center space-x-2">
                <Heart size={16} />
                <span>Favoritas</span>
              </TabsTrigger>
            </TabsList>

            {/* Assistir Aulas Tab */}
            <TabsContent value="watch-classes" className="mt-8">
              {/* Categories Filter */}
              <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Filtrar por Categoria</h3>
                <div className="flex flex-wrap gap-4">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id 
                          ? 'bg-yoga-sage hover:bg-yoga-sage/90' 
                          : 'hover:bg-yoga-sage/10'
                      }`}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>

              {/* Classes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredClasses.map((classe) => (
                  <Card key={classe.id} className="hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="relative">
                      <img 
                        src={classe.thumbnail} 
                        alt={classe.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <Button
                          onClick={() => handleWatchVideo(classe.videoUrl)}
                          className="bg-white/90 text-gray-800 hover:bg-white rounded-full p-4"
                        >
                          <Play className="w-6 h-6" />
                        </Button>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded-full text-sm font-medium">
                        {classe.level}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg line-clamp-2">
                        {classe.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        <span>{classe.instructor}</span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {classe.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{classe.duration}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          <span>{classe.rating}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleWatchVideo(classe.videoUrl)}
                        className="w-full bg-gradient-to-r from-yoga-sage to-yoga-lavender hover:from-yoga-sage/90 hover:to-yoga-lavender/90"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Assistir Aula
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Meu Progresso Tab */}
            <TabsContent value="my-progress" className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-yoga-sage mb-4" />
                <h3 className="text-xl font-medium mb-2">Seu Progresso</h3>
                <p className="text-gray-600 mb-6">
                  Acompanhe suas práticas e veja sua evolução no yoga
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-yoga-cream/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-yoga-sage mb-2">12</div>
                    <div className="text-sm text-gray-600">Aulas Concluídas</div>
                  </div>
                  <div className="bg-yoga-cream/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-yoga-sage mb-2">8h 30m</div>
                    <div className="text-sm text-gray-600">Tempo Praticado</div>
                  </div>
                  <div className="bg-yoga-cream/20 rounded-lg p-6">
                    <div className="text-2xl font-bold text-yoga-sage mb-2">7</div>
                    <div className="text-sm text-gray-600">Dias Consecutivos</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Favoritas Tab */}
            <TabsContent value="favorites" className="mt-8">
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Heart className="w-16 h-16 mx-auto text-yoga-sage mb-4" />
                <h3 className="text-xl font-medium mb-2">Suas Aulas Favoritas</h3>
                <p className="text-gray-600 mb-6">
                  Aqui você encontrará as aulas que marcou como favoritas
                </p>
                <Button className="bg-gradient-to-r from-yoga-sage to-yoga-lavender hover:from-yoga-sage/90 hover:to-yoga-lavender/90">
                  <Heart className="w-4 h-4 mr-2" />
                  Explorar Aulas
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium">Assistindo Aula</h3>
              <Button variant="ghost" onClick={closeVideo}>
                ✕
              </Button>
            </div>
            <div className="aspect-video">
              <iframe
                src={selectedVideo}
                title="Yoga Class Video"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AulasOnline;
