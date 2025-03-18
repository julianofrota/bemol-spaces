
import React from 'react';
import SearchAndFilter from '@/components/SearchAndFilter';
import SpacesList from '@/components/SpacesList';
import { MediaSpace } from '@/data/spaces';

interface SpacesSectionProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  filteredSpaces: MediaSpace[];
  onSpaceSelect: (space: MediaSpace) => void;
}

const SpacesSection = ({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  filteredSpaces,
  onSpaceSelect
}: SpacesSectionProps) => {
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedType('all');
  };

  return (
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

        <SearchAndFilter 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        <SpacesList 
          filteredSpaces={filteredSpaces} 
          onSelect={onSpaceSelect}
          onClearFilters={handleClearFilters}
        />
      </div>
    </section>
  );
};

export default SpacesSection;
