
import { Heart, Brain, Dumbbell, Leaf, Smile } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Dumbbell,
      title: "Flexibilidade",
      description: "Melhore sua flexibilidade e mobilidade corporal"
    },
    {
      icon: Brain,
      title: "Foco Mental",
      description: "Desenvolva concentração e clareza mental"
    },
    {
      icon: Heart,
      title: "Saúde Física",
      description: "Fortaleça músculos e melhore sua postura"
    },
    {
      icon: Leaf,
      title: "Redução do Estresse",
      description: "Encontre paz e tranquilidade no dia a dia"
    },
    {
      icon: Smile,
      title: "Equilíbrio Emocional",
      description: "Cultive bem-estar e harmonia interior"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-yoga-cream to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">
            Benefícios do Yoga
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra como o yoga pode transformar sua vida, proporcionando 
            bem-estar físico, mental e emocional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <benefit.icon className="w-10 h-10 text-yoga-sage" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
