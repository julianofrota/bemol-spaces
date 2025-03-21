import { api } from '@/lib/api/client';
import { mockApi } from '@/lib/api/mock';
import type { MediaSpace, ReservationRequest, Reservation } from '@/types';
import { AxiosInstance } from 'axios';

// Interface para o tipo do apiClient
interface ApiClient {
  getSpaces: () => Promise<MediaSpace[]>;
  getSpaceById: (id: string) => Promise<MediaSpace>;
  getReservations: () => Promise<Reservation[]>;
  reserveSpace: (request: ReservationRequest) => Promise<Reservation>;
  cancelReservation: (id: string) => Promise<Reservation>;
}

// Use mock API durante desenvolvimento
const isDev = import.meta.env.DEV;
const apiClient: ApiClient | AxiosInstance = isDev ? mockApi : api;

export const spacesService = {
  getSpaces: async () => {
    if (isDev) return (apiClient as ApiClient).getSpaces();
    
    const { data } = await (apiClient as AxiosInstance).get<MediaSpace[]>('/spaces');
    return data;
  },

  getSpaceById: async (id: string) => {
    if (isDev) return (apiClient as ApiClient).getSpaceById(id);
    
    const { data } = await (apiClient as AxiosInstance).get<MediaSpace>(`/spaces/${id}`);
    return data;
  },

  reserveSpace: async (request: ReservationRequest) => {
    if (isDev) return (apiClient as ApiClient).reserveSpace(request);
    
    const { data } = await (apiClient as AxiosInstance).post('/reservations', request);
    return data;
  },

  getReservations: async () => {
    if (isDev) return (apiClient as ApiClient).getReservations();
    
    const { data } = await (apiClient as AxiosInstance).get('/reservations');
    return data;
  },

  cancelReservation: async (id: string) => {
    if (isDev) return (apiClient as ApiClient).cancelReservation(id);
    
    const { data } = await (apiClient as AxiosInstance).delete(`/reservations/${id}`);
    return data;
  },
}; 