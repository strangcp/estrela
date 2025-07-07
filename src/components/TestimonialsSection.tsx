
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ana Silva",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      text: "O yoga mudou completamente minha vida. Encontrei paz interior e uma nova perspectiva sobre o bem-estar. As aulas são incríveis!",
      rating: 5
    },
    {
      id: 2,
      name: "Carlos Santos",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      text: "Depois de meses de estresse no trabalho, o yoga me trouxe o equilíbrio que eu precisava. Recomendo para todos!",
      rating: 5
    },
    {
      id: 3,
      name: "Maria Oliveira",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      text: "As aulas online são perfeitas para minha rotina. Consigo praticar no conforto de casa com a mesma qualidade.",
      rating: 5
    },
    {
      id: 4,
      name: "João Costa",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      text: "Nunca pensei que conseguiria me conectar tanto comigo mesmo. O yoga me ensinou a viver o presente.",
      rating: 5
    },
    {
      id: 5,
      name: "Lucia Fernandes",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      text: "Minha flexibilidade e força melhoraram muito. Além disso, durmo melhor e me sinto mais calma no dia a dia.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentTestimonial + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-yoga-lavender/10 to-yoga-mint/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            O que nossos alunos dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça as experiências transformadoras de quem já faz parte da nossa comunidade
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg hover:bg-gray-50 rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <Card key={testimonial.id} className="glass-effect border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  {/* Stars */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Photo */}
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className="text-xl font-medium text-gray-800 mb-4">
                    {testimonial.name}
                  </h3>
                  
                  {/* Testimonial Text */}
                  <p className="text-gray-600 italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial 
                    ? 'bg-yoga-sage scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
