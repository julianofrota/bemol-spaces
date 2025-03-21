import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (textRef.current) {
            textRef.current.classList.add('animate-slide-up', 'opacity-100');
          }
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  const scrollToSpaces = () => {
    const spacesSection = document.getElementById('spaces');
    if (spacesSection) {
      spacesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute w-full h-full object-cover"
          poster="/placeholder.svg"
        >
          <source src="/videos/store-interior.mp4" type="video/mp4" />
          <img 
            src="/placeholder.svg"
            alt="Loja Bemol interior" 
            className="absolute w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 py-20">
        <div 
          ref={textRef} 
          className="max-w-4xl mx-auto text-center opacity-0 transition-all duration-1000"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 animate-fade-in">
            BEMOL SPACES
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Encontre o Espaço Perfeito para Sua Marca
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Aumente a visibilidade dos seus produtos com as melhores localizações nas lojas Bemol
            e alavanque suas vendas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={scrollToSpaces}
              className="bg-bemol-blue hover:bg-bemol-lightblue text-white px-8 py-6 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105"
            >
              Explorar Espaços
            </Button>
            <Link to="/auth/register">
              <Button 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white px-8 py-6 rounded-lg font-medium text-lg transition-all"
              >
                Cadastre-se Agora
              </Button>
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-white/80">
              Já tem uma conta?{' '}
              <Link to="/auth/login" className="text-white hover:text-bemol-blue underline">
                Faça login
              </Link>
            </p>
          </div>
          
          {/* Scroll indicator - moved here */}
          <div className="mt-12 flex justify-center animate-bounce">
            <button 
              onClick={scrollToSpaces}
              aria-label="Rolar para baixo"
              className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/30"
            >
              <ChevronDown className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 