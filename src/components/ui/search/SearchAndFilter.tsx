import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, LayoutGrid, List, Check, ChevronDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatSpaceType } from '@/lib/formatters';
import { spaces } from '@/data/spaces';

interface FilterOption {
  value: string;
  label: string;
}

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  variant?: 'simple' | 'advanced';
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  
  // Para seleção única (variant: 'simple')
  selectedType?: string;
  setSelectedType?: (type: string) => void;
  selectedLocation?: string;
  setSelectedLocation?: (location: string) => void;
  selectedPrice?: string;
  setSelectedPrice?: (price: string) => void;
  selectedStore?: string;
  setSelectedStore?: (store: string) => void;
  
  // Para seleção múltipla (variant: 'advanced')
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedCities: string[];
  setSelectedCities: (cities: string[]) => void;
  selectedSectors: string[];
  setSelectedSectors: (sectors: string[]) => void;
  selectedPrices: string[];
  setSelectedPrices: (prices: string[]) => void;
  selectedStores: string[];
  setSelectedStores: (stores: string[]) => void;
}

const uniqueTypes = Array.from(new Set(spaces.map(space => space.type)));
const uniqueStores = Array.from(new Set(spaces.map(space => space.location.store)));
const uniqueCities = Array.from(new Set(spaces.map(space => space.location.city)));
const uniqueSectors = Array.from(new Set(spaces.map(space => space.location.sector)));

const typeOptions: FilterOption[] = uniqueTypes.map(type => ({
  value: type,
  label: formatSpaceType(type)
}));

const storeOptions: FilterOption[] = uniqueStores.map(store => ({
  value: store.toLowerCase(),
  label: store
}));

const cityOptions: FilterOption[] = uniqueCities.map(city => ({
  value: city.toLowerCase(),
  label: city
}));

const sectorOptions: FilterOption[] = uniqueSectors.map(sector => ({
  value: sector.toLowerCase(),
  label: sector
}));

interface PriceRange {
  value: string;
  label: string;
  min?: number;
  max?: number;
}

const priceRanges: PriceRange[] = [
  { value: 'low', label: 'Até R$ 1.000', max: 1000 },
  { value: 'medium', label: 'R$ 1.000 - R$ 3.000', min: 1000, max: 3000 },
  { value: 'high', label: 'Acima de R$ 3.000', min: 3000 }
];

const renderFilterButton = (
  options: FilterOption[],
  selected: string | string[],
  label: string,
  onSelect: (value: string | string[]) => void,
  singular: string,
  plural: string
) => {
  const isArray = Array.isArray(selected);
  const selectedCount = isArray ? selected.length : 0;
  const selectedLabel = isArray
    ? selectedCount === 0
      ? label
      : `${selectedCount} ${selectedCount === 1 ? singular : plural}`
    : selected || label;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="justify-between"
        >
          {selectedLabel}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${label.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    if (isArray) {
                      const newSelected = selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value];
                      onSelect(newSelected);
                    } else {
                      onSelect(option.value);
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      isArray
                        ? selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                        : selected === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const SearchAndFilter = ({ 
  searchTerm,
  setSearchTerm,
  variant = 'simple',
  viewMode,
  setViewMode,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
  selectedPrice,
  setSelectedPrice,
  selectedStore,
  setSelectedStore,
  selectedTypes,
  setSelectedTypes,
  selectedCities,
  setSelectedCities,
  selectedSectors,
  setSelectedSectors,
  selectedPrices,
  setSelectedPrices,
  selectedStores,
  setSelectedStores,
}: SearchAndFilterProps) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="relative md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Buscar espaços..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {variant === 'advanced' ? (
            <>
              {renderFilterButton(
                typeOptions,
                selectedTypes,
                "Tipos de Espaço",
                (value) => setSelectedTypes(value as string[]),
                "tipo",
                "tipos selecionados"
              )}
              {renderFilterButton(
                cityOptions,
                selectedCities,
                "Localização",
                (value) => setSelectedCities(value as string[]),
                "cidade",
                "cidades selecionadas"
              )}
              {renderFilterButton(
                sectorOptions,
                selectedSectors,
                "Setor",
                (value) => setSelectedSectors(value as string[]),
                "setor",
                "setores selecionados"
              )}
              {renderFilterButton(
                storeOptions,
                selectedStores,
                "Loja",
                (value) => setSelectedStores(value as string[]),
                "loja",
                "lojas selecionadas"
              )}
              {renderFilterButton(
                priceRanges,
                selectedPrices,
                "Faixa de Preço",
                (value) => setSelectedPrices(value as string[]),
                "faixa",
                "faixas selecionadas"
              )}
            </>
          ) : (
            <>
              {renderFilterButton(
                [{ value: 'all', label: 'Todos' }, ...typeOptions],
                selectedType || '',
                "Tipos de Espaço",
                (value) => setSelectedType?.(value as string),
                "tipo",
                "tipos"
              )}
              {renderFilterButton(
                [{ value: 'all', label: 'Todas as Cidades' }, ...cityOptions],
                selectedLocation || '',
                "Localização",
                (value) => setSelectedLocation?.(value as string),
                "cidade",
                "cidades"
              )}
              {renderFilterButton(
                [{ value: 'all', label: 'Todas as Lojas' }, ...storeOptions],
                selectedStore || '',
                "Lojas",
                (value) => setSelectedStore?.(value as string),
                "loja",
                "lojas"
              )}
              {renderFilterButton(
                [{ value: 'all', label: 'Todos os Preços' }, ...priceRanges],
                selectedPrice || '',
                "Faixa de Preço",
                (value) => setSelectedPrice?.(value as string),
                "faixa",
                "faixas"
              )}
            </>
          )}

          <div className="flex items-center gap-1 border rounded-md p-1">
            <Button
              variant={viewMode === 'grid' ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
