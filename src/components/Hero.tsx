
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

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
          poster="https://images.unsplash.com/photo-1613160717888-fec8b8c14eb4?q=80&w=1920&auto=format&fit=crop"
        >
          <source src="https://cdn.coverr.co/videos/coverr-retail-store-interior-4379/1080p.mp4" type="video/mp4" />
          <img 
            src="https://images.unsplash.com/photo-1613160717888-fec8b8c14eb4?q=80&w=1920&auto=format&fit=crop" 
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
            Conquiste os melhores espaços nas lojas Bemol
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto">
            Acesse nosso catálogo digital e reserve pontos de mídia premium em nossas lojas
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={scrollToSpaces}
              className="bg-bemol-blue hover:bg-bemol-lightblue text-white px-8 py-6 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105"
            >
              Explorar Espaços
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 text-white px-8 py-6 rounded-lg font-medium text-lg transition-all"
            >
              Contato Comercial
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <button 
          onClick={scrollToSpaces}
          aria-label="Rolar para baixo"
          className="bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/30"
        >
          <ChevronDown className="h-6 w-6 text-white" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
