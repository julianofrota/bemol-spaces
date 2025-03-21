import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spacesService } from '@/services/spaces';
import type { MediaSpace, ReservationRequest } from '@/types';
import { toast } from 'sonner';

export const useSpaces = () => {
  const queryClient = useQueryClient();

  const { data: spaces, isLoading: isLoadingSpaces } = useQuery({
    queryKey: ['spaces'],
    queryFn: spacesService.getSpaces,
  });

  const { data: reservations, isLoading: isLoadingReservations } = useQuery({
    queryKey: ['reservations'],
    queryFn: spacesService.getReservations,
  });

  const { mutate: reserveSpace, isPending: isReserving } = useMutation({
    mutationFn: spacesService.reserveSpace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reserva realizada com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao realizar reserva. Tente novamente.');
      console.error('Reservation error:', error);
    },
  });

  const { mutate: cancelReservation, isPending: isCanceling } = useMutation({
    mutationFn: spacesService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reserva cancelada com sucesso!');
    },
    onError: (error) => {
      toast.error('Erro ao cancelar reserva. Tente novamente.');
      console.error('Cancellation error:', error);
    },
  });

  const getSpaceById = (id: string): MediaSpace | undefined => {
    return spaces?.find((space) => space.id === id);
  };

  return {
    spaces,
    reservations,
    isLoadingSpaces,
    isLoadingReservations,
    isReserving,
    isCanceling,
    reserveSpace,
    cancelReservation,
    getSpaceById,
  };
}; 