import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaSpace } from '@/types';
import { Eye, DollarSign, Store } from 'lucide-react';
import { toast } from "sonner";
import { formatPrice } from '@/lib/formatters';
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';

interface SpaceCardProps {
  space: MediaSpace;
  onSelect: (space: MediaSpace) => void;
}

const SpaceCard = ({ space, onSelect }: SpaceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addSpace, removeSpace, isSpaceSelected } = useSelectedSpaces();
  const selected = isSpaceSelected(space.id);

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  return (
    <Card 
      className={`overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer ${
        selected ? 'ring-2 ring-bemol-blue' : ''
      }`}
      onClick={() => onSelect(space)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ height: '220px' }}>
        <img 
          src={space.images[0]} 
          alt={space.name} 
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          style={{ 
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
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
        
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold mb-1">{space.name}</h3>
          <div className="flex items-center text-white/80 text-xs mb-1">
            <span>ID: {space.id}</span>
          </div>
          <p className="text-white/80 text-sm line-clamp-1">{space.description}</p>
        </div>
      </div>
      
      <div className="p-4">
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
          onClick={handleSelectClick}
          className={`w-full ${
            selected 
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' 
              : space.status === 'available'
              ? 'bg-bemol-blue hover:bg-bemol-lightblue text-white'
              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
          }`}
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
    </Card>
  );
};

export default SpaceCard;
