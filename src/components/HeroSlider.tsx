
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      title: "Encontre sua paz interior",
      subtitle: "Transforme sua vida através da prática do yoga",
      cta: "Comece sua jornada"
    },
    {
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      title: "Equilibrio e serenidade",
      subtitle: "Conecte corpo, mente e espírito em harmonia",
      cta: "Descubra o yoga"
    },
    {
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      title: "Sua jornada de bem-estar",
      subtitle: "Experimente uma vida mais plena e consciente",
      cta: "Pratique conosco"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 hero-gradient" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full text-center">
            <div className="max-w-4xl mx-auto px-4 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                {slide.subtitle}
              </p>
              <Button 
                size="lg" 
                className="bg-white text-yoga-sage hover:bg-white/90 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105"
              >
                {slide.cta}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
