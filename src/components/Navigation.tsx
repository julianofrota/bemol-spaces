
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png" 
              alt="Bemol Spaces" 
              className="h-10 md:h-12 transition-all duration-300"
            />
          </a>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#spaces" className="text-gray-700 hover:text-bemol-blue transition-colors">
            Espaços
          </a>
          <a href="#locations" className="text-gray-700 hover:text-bemol-blue transition-colors">
            Lojas
          </a>
          <a href="#success-cases" className="text-gray-700 hover:text-bemol-blue transition-colors">
            Casos de Sucesso
          </a>
          <Button variant="default" className="bg-bemol-blue hover:bg-bemol-lightblue transition-all duration-300 text-white ml-2">
            Acessar Catálogo
          </Button>
        </nav>

        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#spaces" 
              className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Espaços
            </a>
            <a 
              href="#locations" 
              className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Lojas
            </a>
            <a 
              href="#success-cases" 
              className="text-gray-700 hover:text-bemol-blue transition-colors py-2 px-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Casos de Sucesso
            </a>
            <Button className="bg-bemol-blue hover:bg-bemol-lightblue w-full transition-all duration-300">
              Acessar Catálogo
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
