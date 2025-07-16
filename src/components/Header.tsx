
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Settings, CreditCard, LogOut, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navItems = user 
    ? [
        { name: 'Home', path: '/' },
        { name: 'Assine', path: '/assine' },
        { name: 'Aulas', path: '/aulas' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Assine', path: '/assine' },
        { name: 'Aulas', path: '/aulas' },
        { name: 'Login', path: '/login' },
      ];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yoga-sage to-yoga-lavender rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-2xl font-light text-gray-800">Estrela Yoga</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium ${
                    isActive ? 'text-yoga-sage border-b-2 border-yoga-sage' : ''
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {/* User Menu */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 hover:text-yoga-sage"
                  >
                    {isAdmin ? (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        ADMINISTRADOR
                      </>
                    ) : (
                      <>
                        <User className="mr-2 h-4 w-4" />
                        PERFIL
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAdmin ? (
                    <DropdownMenuItem asChild>
                      <NavLink to="/admin" className="flex items-center">
                        <Shield className="mr-2 h-4 w-4" />
                        Dashboard Admin
                      </NavLink>
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <NavLink to="/gerenciar-perfil" className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          Gerenciar Perfil
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <NavLink to="/gerenciar-assinatura" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Gerenciar Assinatura
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium px-4 py-2 ${
                      isActive ? 'text-yoga-sage bg-yoga-sage/10 rounded-lg' : ''
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              
              {/* Mobile User Menu */}
              {user && (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {isAdmin ? (
                    <NavLink
                      to="/admin"
                      className="flex items-center text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium px-4 py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Dashboard Admin
                    </NavLink>
                  ) : (
                    <>
                      <NavLink
                        to="/gerenciar-perfil"
                        className="flex items-center text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium px-4 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Gerenciar Perfil
                      </NavLink>
                      <NavLink
                        to="/gerenciar-assinatura"
                        className="flex items-center text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium px-4 py-2"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        Gerenciar Assinatura
                      </NavLink>
                    </>
                  )}
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-yoga-sage transition-colors duration-200 font-medium px-4 py-2 w-full text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
