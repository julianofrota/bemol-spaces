
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LocationMap from '@/components/LocationMap';
import SpaceDetails from '@/components/SpaceDetails';
import ReservationModal from '@/components/ReservationModal';
import SuccessCase from '@/components/SuccessCase';
import Footer from '@/components/Footer';
import SpacesSection from '@/components/SpacesSection';
import CTASection from '@/components/CTASection';
import { mediaSpaces, MediaSpace } from '@/data/spaces';

const Index = () => {
  const [selectedSpace, setSelectedSpace] = useState<MediaSpace | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filtrar espaços com base no termo de pesquisa e tipo selecionado
  const filteredSpaces = mediaSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          space.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || space.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Função para alternar entre detalhes e modal de reserva
  const handleSpaceSelect = (space: MediaSpace) => {
    setSelectedSpace(space);
    setDetailsOpen(true);
  };

  // Iniciar reserva a partir da tela de detalhes
  const handleStartReservation = () => {
    setDetailsOpen(false);
    setReservationOpen(true);
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
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        filteredSpaces={filteredSpaces}
        onSpaceSelect={handleSpaceSelect}
      />

      <LocationMap />
      
      <SuccessCase />

      <CTASection />

      <Footer />

      {/* Modais */}
      <SpaceDetails 
        space={selectedSpace} 
        open={detailsOpen} 
        onOpenChange={setDetailsOpen} 
      />
      
      <ReservationModal 
        space={selectedSpace} 
        open={reservationOpen} 
        onOpenChange={setReservationOpen} 
      />
    </div>
  );
};

export default Index;
