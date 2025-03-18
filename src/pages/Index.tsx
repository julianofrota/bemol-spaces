
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import SpaceCard from '@/components/SpaceCard';
import LocationMap from '@/components/LocationMap';
import SpaceDetails from '@/components/SpaceDetails';
import ReservationModal from '@/components/ReservationModal';
import SuccessCase from '@/components/SuccessCase';
import Footer from '@/components/Footer';
import { mediaSpaces, MediaSpace } from '@/data/spaces';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

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

      {/* Espaços de Mídia */}
      <section id="spaces" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll">
            <span className="inline-block py-1 px-3 rounded-full bg-bemol-blue/10 text-bemol-blue text-sm font-medium mb-4">
              CATÁLOGO DE ESPAÇOS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Encontre o espaço ideal para sua marca</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Escolha entre diversos tipos de mídia física para dar visibilidade aos seus produtos nas lojas Bemol
            </p>
          </div>

          {/* Filtros e Pesquisa */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 items-center animate-on-scroll">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Buscar espaços..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                className={selectedType === 'all' ? 'bg-bemol-blue hover:bg-bemol-lightblue' : ''}
                onClick={() => setSelectedType('all')}
              >
                Todos
              </Button>
              <Button
                variant={selectedType === 'endcap' ? 'default' : 'outline'}
                className={selectedType === 'endcap' ? 'bg-bemol-blue hover:bg-bemol-lightblue' : ''}
                onClick={() => setSelectedType('endcap')}
              >
                Ponta de Gôndola
              </Button>
              <Button
                variant={selectedType === 'digital-display' ? 'default' : 'outline'}
                className={selectedType === 'digital-display' ? 'bg-bemol-blue hover:bg-bemol-lightblue' : ''}
                onClick={() => setSelectedType('digital-display')}
              >
                Display Digital
              </Button>
              <Button
                variant={selectedType === 'window' ? 'default' : 'outline'}
                className={selectedType === 'window' ? 'bg-bemol-blue hover:bg-bemol-lightblue' : ''}
                onClick={() => setSelectedType('window')}
              >
                Vitrine
              </Button>
            </div>
          </div>

          {filteredSpaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpaces.map((space, index) => (
                <div key={space.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
                  <SpaceCard space={space} onSelect={handleSpaceSelect} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Nenhum espaço encontrado com os filtros atuais.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedType('all');
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <LocationMap />
      
      <SuccessCase />

      {/* Seção CTA */}
      <section className="py-20 bg-bemol-blue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para destacar sua marca?</h2>
          <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-3xl mx-auto">
            Aumente suas vendas com espaços estratégicos nas lojas Bemol
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-bemol-blue hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8 py-6 text-lg font-semibold"
            >
              Falar com um consultor
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold"
            >
              Ver apresentação
            </Button>
          </div>
        </div>
      </section>

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
