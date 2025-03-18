
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MediaSpace } from '@/data/spaces';
import { Eye, DollarSign, Maximize, Store } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpaceCardProps {
  space: MediaSpace;
  onSelect: (space: MediaSpace) => void;
}

const SpaceCard = ({ space, onSelect }: SpaceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toast } = useToast();

  const handleReserveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Adicionado à pré-reserva",
      description: `${space.name} foi adicionado à sua lista de pré-reserva.`,
    });
  };

  return (
    <Card 
      className="overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 cursor-pointer"
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
          <p className="text-white/80 text-sm line-clamp-1">{space.description}</p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
            <DollarSign size={14} /> 
            R$ {space.price.weekly.toLocaleString('pt-BR')} / semana
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
            <Eye size={14} /> 
            {space.exposurePotential.toLocaleString('pt-BR')} visualizações/dia
          </Badge>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
              <Maximize size={14} /> 
              {space.dimensions}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
              <Store size={14} /> 
              {space.storeIds.length} lojas
            </Badge>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="bg-bemol-blue hover:bg-bemol-lightblue text-white"
            onClick={handleReserveClick}
          >
            Pré-reservar
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-1">
            {space.features.slice(0, 2).map((feature, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs font-normal">
                {feature}
              </Badge>
            ))}
            {space.features.length > 2 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{space.features.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SpaceCard;
