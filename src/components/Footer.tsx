
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-yoga-sage to-yoga-lavender rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-2xl font-light">Estrela Yoga</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-4">
              Transforme sua vida através da prática do yoga. Encontre paz, equilíbrio 
              e bem-estar em nossa comunidade acolhedora e inspiradora.
            </p>
            <div className="flex items-center text-yoga-sage">
              <Heart className="w-4 h-4 mr-2" />
              <span className="text-sm">Feito com amor para sua jornada de bem-estar</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-yoga-sage" />
                <span className="text-gray-300">(11) 99999-9999</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-3 text-yoga-sage" />
                <span className="text-gray-300">contato@estrelayoga.com</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 text-yoga-sage mt-1" />
                <span className="text-gray-300">
                  Rua da Paz, 123<br />
                  São Paulo - SP
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Links Rápidos</h3>
            <div className="space-y-2">
              <a href="/" className="block text-gray-300 hover:text-yoga-sage transition-colors">
                Home
              </a>
              <a href="/assine" className="block text-gray-300 hover:text-yoga-sage transition-colors">
                Planos
              </a>
              <a href="/aulas" className="block text-gray-300 hover:text-yoga-sage transition-colors">
                Aulas
              </a>
              <a href="/login" className="block text-gray-300 hover:text-yoga-sage transition-colors">
                Área do Aluno
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Estrela Yoga. Todos os direitos reservados. | 
            Desenvolvido com dedicação para seu bem-estar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
