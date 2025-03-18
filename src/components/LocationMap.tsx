
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Clock, Phone } from 'lucide-react';
import { storeLocations, StoreLocation } from '@/data/locations';

const LocationMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<StoreLocation | null>(null);

  return (
    <section id="locations" className="py-20 bg-bemol-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-bemol-blue/10 text-bemol-blue text-sm font-medium mb-4">
            NOSSAS LOJAS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Encontre os melhores espaços perto de você</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            A Bemol possui lojas em diversas localidades do Norte do Brasil, todas com ótimas oportunidades de exposição para sua marca
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Selecione uma loja</h3>
              <div className="space-y-3">
                {storeLocations.map((location) => (
                  <Card 
                    key={location.id} 
                    className={`p-3 cursor-pointer transition-all duration-300 ${
                      selectedLocation?.id === location.id 
                        ? 'border-bemol-blue bg-bemol-blue/5' 
                        : 'hover:border-bemol-blue/50'
                    }`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={location.imageUrl} 
                          alt={location.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{location.name}</h4>
                        <p className="text-sm text-gray-500">{location.city}, {location.state}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {selectedLocation ? (
                <div className="relative">
                  <div className="h-[400px] w-full bg-gray-100 relative">
                    <iframe 
                      title="Store Location Map"
                      className="w-full h-full border-0"
                      src={`https://maps.google.com/maps?q=${selectedLocation.coordinates.lat},${selectedLocation.coordinates.lng}&z=15&output=embed`}
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{selectedLocation.name}</h3>
                        <div className="flex items-start space-x-2 text-gray-600 mb-2">
                          <MapPin size={18} className="mt-1 flex-shrink-0" />
                          <p>{selectedLocation.address}, {selectedLocation.city} - {selectedLocation.state}, {selectedLocation.postalCode}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-2">
                          <Phone size={18} />
                          <p>{selectedLocation.phone}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 mb-4">
                          <Clock size={18} />
                          <div>
                            <p>Seg-Sex: {selectedLocation.openingHours.weekdays}</p>
                            <p>Sábado: {selectedLocation.openingHours.saturday}</p>
                            <p>Domingo: {selectedLocation.openingHours.sunday}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Informações da loja</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Tamanho:</span>
                            <span className="font-medium">
                              {selectedLocation.storeSize === 'small' ? 'Pequena' : 
                               selectedLocation.storeSize === 'medium' ? 'Média' : 'Grande'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Tráfego diário:</span>
                            <span className="font-medium">
                              <span className="flex items-center gap-1">
                                <Users size={16} />
                                {selectedLocation.footTraffic.toLocaleString('pt-BR')}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-bemol-blue hover:bg-bemol-lightblue text-white w-full md:w-auto">
                        Ver espaços disponíveis nesta loja
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-center p-6">
                  <MapPin size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Selecione uma loja</h3>
                  <p className="text-gray-500 max-w-md">
                    Escolha uma loja na lista à esquerda para ver detalhes e espaços disponíveis para sua marca.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
