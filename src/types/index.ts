export type MediaSpaceType = 'endcap' | 'digital-display' | 'window' | 'floor-standing' | 'checkout' | 'entrance';

export type SpaceStatus = 'available' | 'reserved' | 'high-demand'

export type StoreSector = 
  | 'Salão'
  | 'Autosserviço'
  | 'Linha Branca'
  | 'Móveis'
  | 'Telefonia'
  | 'Eletrônicos'
  | 'Eletrodomésticos'
  | 'Cama, Mesa e Banho'
  | 'Moda'
  | 'Alimentos';

export interface MediaSpace {
  id: string;
  name: string;
  description: string;
  type: MediaSpaceType;
  location: {
    store: string;
    sector: StoreSector;
    city: string;
  };
  price: number;
  images: string[];
  status: 'available' | 'reserved' | 'high-demand';
  exposurePotential: number;
  occupancyRate: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  storeSize: 'small' | 'medium' | 'large';
  footTraffic: number;
  imageUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  sectors: StoreSector[];
}

export interface ReservationRequest {
  spaceId: string;
  startDate: string;
  endDate: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}

export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  totalPrice: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  company: string;
  role: string;
}

export interface SuccessCase {
  id: string;
  brand: string;
  title: string;
  description: string;
  imageUrl: string;
  results: string;
  testimonial: string;
  contactPerson: string;
} 