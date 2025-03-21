import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Eye, DollarSign, Store } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { toast } from "sonner";
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';
import { MediaSpace } from '@/types';
import { spaces } from '@/data/spaces';
import SearchAndFilter from './SearchAndFilter';
import SpaceDetails from './SpaceDetails';
import { motion } from 'framer-motion';
import SpaceCard from './SpaceCard';

interface SpacesSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  onSpaceSelect: (space: MediaSpace) => void;
}

const SpacesSection = ({ searchTerm, setSearchTerm, onSpaceSelect }: SpacesSectionProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<MediaSpace | null>(null);
  const { addSpace, removeSpace, isSpaceSelected } = useSelectedSpaces();

  // Filtrar espaços com base nos filtros selecionados
  const filteredSpacesByFilters = useMemo(() => {
    return spaces.filter(space => {
      const matchesSearch = searchTerm === "" || 
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           space.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(space.type);
      
      const matchesCity = selectedCities.length === 0 || 
        selectedCities.includes(space.location.city.toLowerCase());

      const matchesSector = selectedSectors.length === 0 || 
        selectedSectors.includes(space.location.sector.toLowerCase());
      
      const matchesStore = selectedStores.length === 0 || 
        selectedStores.includes(space.location.store.toLowerCase());

      const matchesPrice = selectedPrices.length === 0 || 
        selectedPrices.some(range => {
          const price = space.price;
          switch (range) {
            case 'low':
              return price <= 1000;
            case 'medium':
              return price > 1000 && price <= 3000;
            case 'high':
              return price > 3000;
            default:
        return false;
          }
      });
      
      return matchesSearch && matchesType && matchesCity && matchesSector && matchesStore && matchesPrice;
    });
  }, [spaces, searchTerm, selectedTypes, selectedCities, selectedSectors, selectedStores, selectedPrices]);

  // Limitar a exibição aos primeiros 6 espaços
  const displayedSpaces = filteredSpacesByFilters.slice(0, 6);

  const handleSelectClick = (e: React.MouseEvent, space: MediaSpace) => {
    e.stopPropagation();
    const selected = isSpaceSelected(space.id);
    if (selected) {
      removeSpace(space.id);
      toast.success("Removido da seleção", {
        description: `${space.name} foi removido da sua seleção.`,
      });
    } else {
      addSpace(space);
      toast.success("Adicionado à seleção", {
        description: `${space.name} foi adicionado à sua seleção.`,
      });
    }
  };

  const handleSpaceClick = (space: MediaSpace) => {
    onSpaceSelect(space);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="spaces" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Espaços Disponíveis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore nossa seleção de espaços publicitários premium em lojas estratégicas.
            Encontre o local perfeito para sua marca.
          </p>
        </div>

        <SearchAndFilter 
          variant="advanced"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
          selectedSectors={selectedSectors}
          setSelectedSectors={setSelectedSectors}
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
          selectedPrices={selectedPrices}
          setSelectedPrices={setSelectedPrices}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {displayedSpaces.length === 0 ? (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg">Nenhum espaço encontrado com os filtros atuais.</p>
          </motion.div>
        ) : viewMode === 'list' ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
            className="space-y-4"
          >
            {displayedSpaces.map((space) => {
              const selected = isSpaceSelected(space.id);
              return (
                <motion.div 
                  key={space.id} 
                  variants={itemVariants}
                >
                  <Card 
                    className={`overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer ${
                      selected ? 'ring-2 ring-bemol-blue' : ''
                    }`}
                    onClick={() => handleSpaceClick(space)}
                  >
                    <div className="flex flex-row">
                      {/* Imagem com gradiente */}
                      <div className="relative w-72 h-full">
                        <img 
                          src={space.images[0]} 
                          alt={space.name} 
                          className="w-full h-full object-cover"
                          style={{ height: '220px' }}
                        />
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-bemol-blue text-white rounded-full px-3 py-1">
                            {space.type === 'endcap' ? 'Ponta de Gôndola' : 
                             space.type === 'digital-display' ? 'Display Digital' :
                             space.type === 'window' ? 'Vitrine' :
                             space.type === 'floor-standing' ? 'Display de Chão' :
                             space.type === 'checkout' ? 'Área de Checkout' : 'Entrada da Loja'}
                          </Badge>
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="flex-1 p-4">
                        <h3 className="text-xl font-semibold mb-1">{space.name}</h3>
                        <div className="flex items-center text-gray-500 text-xs mb-2">
                          <span>ID: {space.id}</span>
                        </div>
                        <p className="text-gray-500 text-sm line-clamp-1 mb-3">{space.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                            <DollarSign size={14} /> 
                            {formatPrice(space.price)}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                            <Eye size={14} /> 
                            {space.exposurePotential.toLocaleString('pt-BR')} visualizações/dia
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                            <Store size={14} /> 
                            {space.location.store}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                            {space.location.sector}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                            {space.location.city}
                          </Badge>
                        </div>
                        
                        <Button 
                          variant="default" 
                          size="sm" 
                          className={`w-32 ${
                            selected 
                              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' 
                              : space.status === 'available'
                              ? 'bg-bemol-blue hover:bg-bemol-lightblue text-white'
                              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          }`}
                          onClick={(e) => handleSelectClick(e, space)}
                          disabled={space.status !== 'available'}
                        >
                          {selected 
                            ? 'Remover da Seleção' 
                            : space.status === 'available'
                            ? 'Selecionar'
                            : 'Indisponível'
                          }
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedSpaces.map((space) => (
              <motion.div
                key={space.id}
                variants={itemVariants}
              >
                <SpaceCard 
                  space={space} 
                  onSelect={handleSpaceClick}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {displayedSpaces.length > 0 && (
          <div className="text-center mt-8">
          <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-50"
              onClick={() => window.location.href = '/spaces'}
          >
            Ver Todos os Espaços
          </Button>
        </div>
        )}

        <SpaceDetails 
          space={selectedSpace}
          open={!!selectedSpace}
          onOpenChange={(open) => !open && setSelectedSpace(null)}
        />
      </div>
    </section>
  );
};

export default SpacesSection;
