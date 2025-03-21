import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelectedSpaces } from '@/contexts/SelectedSpacesContext';
import { formatPrice } from '@/lib/formatters';
import { toast } from "sonner";
import { ArrowLeft, Trash2, Calendar, Clock, Store, MapPin, Image as ImageIcon } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { addDays, differenceInDays } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { api } from '@/lib/api';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { selectedSpaces, removeSpace, clearSpaces } = useSelectedSpaces();
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 30),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = selectedSpaces.reduce((acc, space) => acc + space.price, 0);
  
  // Calcular métricas dos espaços selecionados
  const uniqueStores = new Set(selectedSpaces.map(space => space.location.store));
  const totalExposure = selectedSpaces.reduce((acc, space) => acc + space.exposurePotential, 0);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return;

    const daysDifference = differenceInDays(range.to, range.from);
    if (daysDifference < 30) {
      toast.error("Período inválido", {
        description: "O período mínimo de locação é de 1 mês (30 dias).",
      });
      return;
    }

    setDateRange(range);
  };

  const handleSubmit = async () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Período não selecionado", {
        description: "Por favor, selecione o período de locação.",
      });
      return;
    }

    const daysDifference = differenceInDays(dateRange.to, dateRange.from);
    if (daysDifference < 30) {
      toast.error("Período inválido", {
        description: "O período mínimo de locação é de 1 mês (30 dias).",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post('/reservations', {
        spaces: selectedSpaces.map(space => ({
          id: space.id,
          price: space.price
        })),
        startDate: dateRange.from,
        endDate: dateRange.to,
        totalPrice: totalPrice,
        status: 'pending'
      });

      if (response.status === 201) {
        toast.success("Reserva realizada com sucesso!", {
          description: "Sua solicitação de reserva foi enviada para análise.",
        });
        clearSpaces();
        navigate('/dashboard/reservations');
      }
    } catch (error) {
      console.error('Erro ao criar reserva:', error);
      toast.error("Erro ao realizar reserva", {
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedSpaces.length === 0) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Carrinho vazio</h2>
          <p className="text-gray-600 mb-6">
            Você precisa selecionar pelo menos um espaço para fazer uma reserva.
          </p>
          <Button
            onClick={() => navigate('/spaces')}
            className="bg-bemol-blue hover:bg-bemol-lightblue text-white"
          >
            Voltar para Espaços
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  const header = (
    <div className="container flex h-14 items-center gap-4 px-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate('/spaces')}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <h1 className="text-2xl font-semibold">Finalizar Reserva</h1>
    </div>
  );

  return (
    <DashboardLayout header={header}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Espaços Selecionados</h2>
            <div className="space-y-4">
              {selectedSpaces.map((space) => (
                <div key={space.id} className="flex items-start gap-4 p-4 border rounded-lg">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {space.images?.[0] ? (
                      <img
                        src={space.images[0]}
                        alt={space.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{space.name}</h3>
                        <p className="text-xs text-gray-500">ID: {space.id}</p>
                        <p className="text-sm text-gray-600">{space.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{space.location.store} - {space.location.city}</span>
                        </div>
                        <p className="text-sm font-medium mt-1">{formatPrice(space.price)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpace(space.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo da Locação</h2>
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Período de Locação</p>
                  <DateRangePicker
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Store className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Lojas Selecionadas</p>
                    <p className="font-medium">{uniqueStores.size} lojas diferentes</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Espaços</p>
                    <p className="font-medium">{selectedSpaces.length} espaços selecionados</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Potencial de Exposição</p>
                    <p className="font-medium">{totalExposure.toLocaleString('pt-BR')} visualizações/dia</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold text-bemol-blue">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  * O valor final será calculado com base no período selecionado
                </p>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full bg-bemol-blue hover:bg-bemol-lightblue text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CheckoutPage; 