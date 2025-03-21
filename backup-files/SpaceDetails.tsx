import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MediaSpace } from '@/types';
import { storeLocations } from '@/data/locations';
import { Users, Store } from 'lucide-react';
import { toast } from "sonner";
import { formatPrice, formatSpaceType } from '@/lib/formatters';
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';

interface SpaceDetailsProps {
  space: MediaSpace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpaceDetails = ({ space, open, onOpenChange }: SpaceDetailsProps) => {
  const { addSpace, removeSpace, isSpaceSelected } = useSelectedSpaces();

  if (!space) return null;

  const stores = storeLocations.filter(store => store.name === space.location.store);
  const selected = isSpaceSelected(space.id);

  const handleSelectClick = () => {
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95%] md:max-w-4xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4 sm:p-6 md:p-8">
            <DialogHeader>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <Badge className="bg-bemol-blue text-white rounded-full px-3 py-1 text-xs sm:text-sm">
                  {formatSpaceType(space.type)}
                </Badge>
                {space.status === 'available' ? (
                  <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs sm:text-sm">
                    Disponível
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 rounded-full px-3 py-1 text-xs sm:text-sm">
                    Indisponível
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-bold break-words">{space.name}</DialogTitle>
              <div className="flex items-center mt-1 text-gray-500 text-xs sm:text-sm">
                <span>ID: {space.id}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{space.description}</p>
            </DialogHeader>

            <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Preço por período</p>
                  <p className="text-lg sm:text-xl font-semibold text-bemol-blue">
                    {formatPrice(space.price)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-wrap items-center text-sm">
                  <Users size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">Potencial de exposição:</span>
                  <span className="ml-1 sm:ml-2 font-medium text-sm">{space.exposurePotential.toLocaleString('pt-BR')} pessoas/dia</span>
                </div>
                
                <div className="flex flex-wrap items-center text-sm">
                  <Store size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">Loja:</span>
                  <span className="ml-1 sm:ml-2 font-medium text-sm">{space.location.store}</span>
                </div>

                <div className="flex flex-wrap items-center text-sm">
                  <Store size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">Setor:</span>
                  <span className="ml-1 sm:ml-2 font-medium text-sm">{space.location.sector}</span>
                </div>

                <div className="flex flex-wrap items-center text-sm">
                  <Store size={16} className="text-gray-500 mr-2" />
                  <span className="text-gray-600 text-sm">Cidade:</span>
                  <span className="ml-1 sm:ml-2 font-medium text-sm">{space.location.city}</span>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-6 sm:mt-8">
              <Button 
                onClick={handleSelectClick}
                className={`w-full text-sm sm:text-base ${
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
                  ? 'Adicionar à Seleção'
                  : 'Indisponível'
                }
              </Button>
            </DialogFooter>
          </div>
          
          <div className="bg-gray-50 p-4 sm:p-6 md:p-8">
            <Tabs defaultValue="gallery">
              <TabsList className="w-full mb-3 sm:mb-4">
                <TabsTrigger value="gallery" className="flex-1 text-xs sm:text-sm">Galeria</TabsTrigger>
                <TabsTrigger value="stores" className="flex-1 text-xs sm:text-sm">Loja</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="mt-0">
                <div className="space-y-3 sm:space-y-4">
                  {space.images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={image} 
                          alt={`${space.name} - Imagem ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="stores" className="mt-0">
                <div className="space-y-3 sm:space-y-4">
                  {stores.map((store) => (
                    <div key={store.id} className="bg-white p-3 sm:p-4 rounded-lg">
                      <h4 className="font-semibold mb-1 text-sm sm:text-base">{store.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600">{store.address}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {store.city}, {store.state}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpaceDetails;
