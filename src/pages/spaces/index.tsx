import { useState } from 'react';
import { Button } from '@/components/ui/button';
import SpaceDetails from '@/components/spaces/SpaceDetails';
import { spaces } from '@/data/spaces';
import { MediaSpace } from '@/types';
import SpacesList from '@/components/spaces/SpacesList';
import SearchAndFilter from '@/components/ui/search/SearchAndFilter';
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ITEMS_PER_PAGE = 50;

export default function SpacesPage() {
  const navigate = useNavigate();
  const { selectedSpaces } = useSelectedSpaces();
  const [selectedSpace, setSelectedSpace] = useState<MediaSpace | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtrar espaços com base nos filtros selecionados
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = searchTerm === '' || 
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(space.type);

    const matchesCity = selectedCities.length === 0 || 
      selectedCities.includes(space.location.city.toLowerCase());

    const matchesSector = selectedSectors.length === 0 || 
      selectedSectors.includes(space.location.sector.toLowerCase());

    const matchesStore = selectedStores.length === 0 || 
      selectedStores.includes(space.location.store.toLowerCase());

    const matchesPrice = selectedPrices.length === 0 || selectedPrices.some(range => {
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

  // Calcular paginação
  const totalPages = Math.ceil(filteredSpaces.length / ITEMS_PER_PAGE);
  const paginatedSpaces = filteredSpaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Função para mostrar detalhes do espaço
  const handleSpaceSelect = (space: MediaSpace) => {
    setSelectedSpace(space);
    setDetailsOpen(true);
  };

  // Função para limpar filtros
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTypes([]);
    setSelectedCities([]);
    setSelectedSectors([]);
    setSelectedStores([]);
    setSelectedPrices([]);
    setCurrentPage(1);
  };

  // Função para mudar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Espaços</h2>
      </div>

      <SearchAndFilter
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
        variant="advanced"
      />

      {/* Lista de Espaços */}
      <SpacesList 
        filteredSpaces={paginatedSpaces}
        onSelect={handleSpaceSelect}
        onClearFilters={handleClearFilters}
        viewMode={viewMode}
      />

      {selectedSpaces.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t p-3 shadow-sm z-50">
          <div className="container mx-auto flex justify-end">
            <Button
              onClick={() => navigate('/dashboard/checkout')}
              className="bg-bemol-blue hover:bg-bemol-lightblue text-white flex items-center gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Finalizar Seleção</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
                {selectedSpaces.length}
              </span>
            </Button>
          </div>
        </div>
      )}

      {/* Paginação */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      <SpaceDetails
        space={selectedSpace}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
} 