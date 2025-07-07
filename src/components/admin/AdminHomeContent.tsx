
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Edit2, Trash2, Save } from 'lucide-react';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  order_index: number;
  active: boolean;
}

interface Testimonial {
  id: string;
  name: string;
  testimonial: string;
  image_url: string;
  order_index: number;
  active: boolean;
}

const AdminHomeContent = () => {
  const { toast } = useToast();
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [slidesResponse, testimonialsResponse] = await Promise.all([
        supabase.from('hero_slides').select('*').order('order_index'),
        supabase.from('testimonials').select('*').order('order_index')
      ]);

      if (slidesResponse.data) setSlides(slidesResponse.data);
      if (testimonialsResponse.data) setTestimonials(testimonialsResponse.data);
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSlide = async (slide: HeroSlide) => {
    try {
      const { error } = await supabase
        .from('hero_slides')
        .update({
          title: slide.title,
          subtitle: slide.subtitle,
          image_url: slide.image_url,
        })
        .eq('id', slide.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Slide atualizado com sucesso',
      });
      setEditingSlide(null);
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar slide',
        variant: 'destructive',
      });
    }
  };

  const updateTestimonial = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({
          name: testimonial.name,
          testimonial: testimonial.testimonial,
          image_url: testimonial.image_url,
        })
        .eq('id', testimonial.id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Depoimento atualizado com sucesso',
      });
      setEditingTestimonial(null);
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao atualizar depoimento',
        variant: 'destructive',
      });
    }
  };

  const deleteSlide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('hero_slides')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Sucesso',
        description: 'Slide removido com sucesso',
      });
      loadData();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Erro ao remover slide',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Hero Slides Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Slides do Banner</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {slides.map((slide) => (
            <div key={slide.id} className="border rounded-lg p-4">
              {editingSlide === slide.id ? (
                <div className="space-y-3">
                  <Input
                    value={slide.title}
                    onChange={(e) => setSlides(slides.map(s => 
                      s.id === slide.id ? { ...s, title: e.target.value } : s
                    ))}
                    placeholder="Título"
                  />
                  <Input
                    value={slide.subtitle || ''}
                    onChange={(e) => setSlides(slides.map(s => 
                      s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                    ))}
                    placeholder="Subtítulo"
                  />
                  <Input
                    value={slide.image_url}
                    onChange={(e) => setSlides(slides.map(s => 
                      s.id === slide.id ? { ...s, image_url: e.target.value } : s
                    ))}
                    placeholder="URL da Imagem"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => updateSlide(slide)}>
                      <Save size={16} className="mr-1" />
                      Salvar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingSlide(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{slide.title}</h3>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">Ordem: {slide.order_index}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingSlide(slide.id)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSlide(slide.id)}
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

      {/* Testimonials Section */}
      <Card>
        <CardHeader>
          <CardTitle>Depoimentos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="border rounded-lg p-4">
              {editingTestimonial === testimonial.id ? (
                <div className="space-y-3">
                  <Input
                    value={testimonial.name}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? { ...t, name: e.target.value } : t
                    ))}
                    placeholder="Nome"
                  />
                  <Textarea
                    value={testimonial.testimonial}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? { ...t, testimonial: e.target.value } : t
                    ))}
                    placeholder="Depoimento"
                  />
                  <Input
                    value={testimonial.image_url || ''}
                    onChange={(e) => setTestimonials(testimonials.map(t => 
                      t.id === testimonial.id ? { ...t, image_url: e.target.value } : t
                    ))}
                    placeholder="URL da Foto"
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => updateTestimonial(testimonial)}>
                      <Save size={16} className="mr-1" />
                      Salvar
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setEditingTestimonial(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{testimonial.testimonial}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingTestimonial(testimonial.id)}
                  >
                    <Edit2 size={16} />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHomeContent;
