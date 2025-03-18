
import React from 'react';
import { Button } from '@/components/ui/button';
import SpaceCard from '@/components/SpaceCard';
import { MediaSpace } from '@/data/spaces';

interface SpacesListProps {
  filteredSpaces: MediaSpace[];
  onSelect: (space: MediaSpace) => void;
  onClearFilters: () => void;
}

const SpacesList = ({ filteredSpaces, onSelect, onClearFilters }: SpacesListProps) => {
  if (filteredSpaces.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg">Nenhum espaço encontrado com os filtros atuais.</p>
        <Button 
          variant="outline" 
          className="mt-4"
          onClick={onClearFilters}
        >
          Limpar filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSpaces.map((space, index) => (
        <div key={space.id} className="animate-on-scroll" style={{ transitionDelay: `${index * 100}ms` }}>
          <SpaceCard space={space} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
};

export default SpacesList;
