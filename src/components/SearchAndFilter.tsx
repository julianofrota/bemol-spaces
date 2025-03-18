
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedType, 
  setSelectedType 
}: SearchAndFilterProps) => {
  return (
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
  );
};

export default SearchAndFilter;
