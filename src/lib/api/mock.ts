import { MediaSpace, ReservationRequest, Reservation } from '@/types';
import { mockReservations } from './mockReservations';

export const mockSpaces: MediaSpace[] = [
  {
    id: "space-001",
    name: "Endcap Premium",
    type: "endcap",
    description: "Ponto de exposição na ponta de gôndola em áreas de alto tráfego, ideal para lançamentos de produtos.",
    images: [
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    price: 8000,
    location: {
      store: "Loja Centro",
      sector: "Eletrônicos",
      city: "Manaus"
    },
    status: "available",
    exposurePotential: 5000,
    occupancyRate: 85
  },
  {
    id: "space-002",
    name: "Display Digital 55\"",
    type: "digital-display",
    description: "Tela digital de 55 polegadas localizada em pontos estratégicos da loja para exibição de anúncios e conteúdo promocional.",
    images: [
      "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    price: 5500,
    location: {
      store: "Loja Shopping",
      sector: "Telefonia",
      city: "Manaus"
    },
    status: "available",
    exposurePotential: 6000,
    occupancyRate: 75
  }
];

// Função auxiliar para simular delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  getSpaces: async () => {
    await delay(800);
    return mockSpaces;
  },

  getSpaceById: async (id: string) => {
    await delay(500);
    const space = mockSpaces.find(space => space.id === id);
    if (!space) throw new Error('Space not found');
    return space;
  },

  getReservations: async () => {
    await delay(800);
    return mockReservations;
  },

  reserveSpace: async (request: ReservationRequest) => {
    await delay(1000);
    const space = mockSpaces.find(s => s.id === request.spaceId);
    if (!space) throw new Error('Space not found');

    const newReservation: Reservation = {
      id: 'res-' + Math.random().toString(36).substr(2, 9),
      spaceId: request.spaceId,
      userId: "user-001", // Mock user ID
      startDate: new Date(request.startDate),
      endDate: new Date(request.endDate),
      status: 'pending',
      totalPrice: space.price,
      paymentStatus: 'pending',
      companyName: request.companyName,
      contactName: request.contactName,
      contactEmail: request.contactEmail,
      contactPhone: request.contactPhone,
      notes: request.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockReservations.push(newReservation);
    return newReservation;
  },

  cancelReservation: async (id: string) => {
    await delay(800);
    const reservation = mockReservations.find(r => r.id === id);
    if (!reservation) throw new Error('Reservation not found');

    reservation.status = 'cancelled';
    reservation.paymentStatus = 'refunded';
    reservation.updatedAt = new Date();

    return reservation;
  }
}; 