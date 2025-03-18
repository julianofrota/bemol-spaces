
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MediaSpace } from '@/data/spaces';
import { storeLocations } from '@/data/locations';
import { DollarSign, Users, Maximize, Store, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SpaceDetailsProps {
  space: MediaSpace | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpaceDetails = ({ space, open, onOpenChange }: SpaceDetailsProps) => {
  const { toast } = useToast();

  if (!space) return null;

  const stores = storeLocations.filter(store => space.storeIds.includes(store.id));

  const handleReserve = () => {
    toast({
      title: "Pré-reserva realizada",
      description: `Você pré-reservou ${space.name}. Nossa equipe entrará em contato em breve.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <DialogHeader>
              <div className="mb-2">
                <Badge className="bg-bemol-blue text-white rounded-full px-3 py-1">
                  {space.type === 'endcap' ? 'Ponta de Gôndola' : 
                   space.type === 'digital-display' ? 'Display Digital' :
                   space.type === 'window' ? 'Vitrine' :
                   space.type === 'floor-standing' ? 'Display de Chão' :
                   space.type === 'checkout' ? 'Área de Checkout' : 'Entrada da Loja'}
                </Badge>
              </div>
              <DialogTitle className="text-2xl font-bold">{space.name}</DialogTitle>
            </DialogHeader>
            
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Descrição</h4>
              <p className="text-gray-600 mb-6">{space.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <DollarSign size={18} className="text-bemol-blue mr-2" />
                    <h5 className="font-medium">Preço semanal</h5>
                  </div>
                  <p className="text-xl font-semibold">R$ {space.price.weekly.toLocaleString('pt-BR')}</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <DollarSign size={18} className="text-bemol-blue mr-2" />
                    <h5 className="font-medium">Preço mensal</h5>
                  </div>
                  <p className="text-xl font-semibold">R$ {space.price.monthly.toLocaleString('pt-BR')}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Maximize size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Dimensões:</span>
                  <span className="ml-2 font-medium">{space.dimensions}</span>
                </div>
                
                <div className="flex items-center">
                  <Users size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Potencial de exposição:</span>
                  <span className="ml-2 font-medium">{space.exposurePotential.toLocaleString('pt-BR')} pessoas/dia</span>
                </div>
                
                <div className="flex items-center">
                  <Store size={18} className="text-gray-500 mr-2" />
                  <span className="text-gray-600">Disponível em:</span>
                  <span className="ml-2 font-medium">{space.storeIds.length} lojas</span>
                </div>
                
                <div className="flex items-center">
                  {space.availability ? (
                    <Check size={18} className="text-green-500 mr-2" />
                  ) : (
                    <X size={18} className="text-red-500 mr-2" />
                  )}
                  <span className="text-gray-600">Status:</span>
                  <span className={`ml-2 font-medium ${space.availability ? 'text-green-600' : 'text-red-600'}`}>
                    {space.availability ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
              </div>
              
              <h4 className="font-semibold mb-2">Características</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {space.features.map((feature, idx) => (
                  <Badge key={idx} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <DialogFooter className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={handleReserve} 
                  className="bg-bemol-blue hover:bg-bemol-lightblue w-full"
                  disabled={!space.availability}
                >
                  {space.availability ? 'Pré-reservar espaço' : 'Indisponível'}
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                  Fechar
                </Button>
              </DialogFooter>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 md:p-8">
            <Tabs defaultValue="gallery">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="gallery" className="flex-1">Galeria</TabsTrigger>
                <TabsTrigger value="video" className="flex-1" disabled={!space.videoUrl}>Vídeo</TabsTrigger>
                <TabsTrigger value="stores" className="flex-1">Lojas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="gallery" className="mt-0">
                <div className="space-y-4">
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
              
              <TabsContent value="video" className="mt-0">
                {space.videoUrl && (
                  <div className="overflow-hidden rounded-lg">
                    <AspectRatio ratio={16/9}>
                      <iframe
                        src={space.videoUrl}
                        title={`${space.name} - Vídeo`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>
                    </AspectRatio>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="stores" className="mt-0">
                <div className="space-y-3">
                  {stores.map((store) => (
                    <div key={store.id} className="bg-white p-3 rounded-lg">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={store.imageUrl} 
                            alt={store.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{store.name}</h4>
                          <p className="text-sm text-gray-500">{store.address}</p>
                          <p className="text-sm text-gray-500">{store.city}, {store.state}</p>
                          <div className="mt-1 text-xs text-gray-600">
                            Tráfego: {store.footTraffic.toLocaleString('pt-BR')} pessoas/dia
                          </div>
                        </div>
                      </div>
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
