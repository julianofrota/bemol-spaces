import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SpaceCard from './SpaceCard';
import { MediaSpace } from '@/types';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Eye, DollarSign, Store } from 'lucide-react';
import { formatPrice } from '@/lib/formatters';
import { toast } from "sonner";
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';

interface SpacesListProps {
  filteredSpaces: MediaSpace[];
  onSelect: (space: MediaSpace) => void;
  onClearFilters: () => void;
  viewMode: 'grid' | 'list';
}

const SpacesList = ({ filteredSpaces, onSelect, onClearFilters, viewMode }: SpacesListProps) => {
  const { addSpace, removeSpace, isSpaceSelected } = useSelectedSpaces();

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

  if (filteredSpaces.length === 0) {
    return (
      <motion.div 
        className="text-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-500 text-lg">Nenhum espaço encontrado com os filtros atuais.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onClearFilters}
        >
          Limpar Filtros
        </Button>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {filteredSpaces.map((space) => {
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
                onClick={() => onSelect(space)}
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
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredSpaces.map((space) => (
        <motion.div 
          key={space.id} 
          variants={itemVariants}
        >
          <SpaceCard space={space} onSelect={onSelect} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SpacesList;
