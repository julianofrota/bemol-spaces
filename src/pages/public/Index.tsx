import { useState, useEffect } from 'react';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import LocationMap from '@/components/sections/map/LocationMap';
import SpaceDetails from '@/components/spaces/SpaceDetails';
import SuccessCase from '@/components/sections/SuccessCase';
import Footer from '@/components/layout/Footer';
import SpacesSection from '@/components/spaces/SpacesSection';
import CTASection from '@/components/sections/CTASection';
import { MediaSpace } from '@/types';

const Index = () => {
  const [selectedSpace, setSelectedSpace] = useState<MediaSpace | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Função para mostrar detalhes do espaço
  const handleSpaceSelect = (space: MediaSpace) => {
    setSelectedSpace(space);
    setDetailsOpen(true);
  };

  // Observer para animações ao scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />

      <Hero />

      <SpacesSection 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSpaceSelect={handleSpaceSelect}
      />

      <LocationMap />
      
      <SuccessCase />

      <CTASection />

      <Footer />

      {/* Modal de Detalhes */}
      <SpaceDetails 
        space={selectedSpace} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
    </div>
  );
};

export default Index; 