
export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  storeSize: 'small' | 'medium' | 'large';
  footTraffic: number; // Average visitors per day
  openingHours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  imageUrl: string;
}

export const storeLocations: StoreLocation[] = [
  {
    id: "store-001",
    name: "Bemol Manaus - Centro",
    address: "Av. Eduardo Ribeiro, 520",
    city: "Manaus",
    state: "AM",
    postalCode: "69010-010",
    phone: "(92) 3232-9900",
    email: "centro@bemol.com.br",
    coordinates: {
      lat: -3.1313,
      lng: -60.0231
    },
    storeSize: "large",
    footTraffic: 2500,
    openingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "09:00 - 18:00",
      sunday: "12:00 - 17:00"
    },
    imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "store-002",
    name: "Bemol Manaus - Shopping Manauara",
    address: "Av. Mário Ypiranga, 1300 - Adrianópolis",
    city: "Manaus",
    state: "AM",
    postalCode: "69057-002",
    phone: "(92) 3232-9950",
    email: "manauara@bemol.com.br",
    coordinates: {
      lat: -3.1003,
      lng: -60.0233
    },
    storeSize: "medium",
    footTraffic: 3000,
    openingHours: {
      weekdays: "10:00 - 22:00",
      saturday: "10:00 - 22:00",
      sunday: "14:00 - 20:00"
    },
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80"
  },
  {
    id: "store-003",
    name: "Bemol Manaus - Cidade Nova",
    address: "Av. Noel Nutels, 1762 - Cidade Nova",
    city: "Manaus",
    state: "AM",
    postalCode: "69095-000",
    phone: "(92) 3232-9930",
    email: "cidadenova@bemol.com.br",
    coordinates: {
      lat: -3.0413,
      lng: -59.9478
    },
    storeSize: "large",
    footTraffic: 2200,
    openingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "09:00 - 18:00",
      sunday: "09:00 - 15:00"
    },
    imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=1349&q=80"
  },
  {
    id: "store-004",
    name: "Bemol Boa Vista",
    address: "Av. Ville Roy, 1725 - Caçari",
    city: "Boa Vista",
    state: "RR",
    postalCode: "69307-725",
    phone: "(95) 3628-4300",
    email: "boavista@bemol.com.br",
    coordinates: {
      lat: 2.8235,
      lng: -60.6758
    },
    storeSize: "medium",
    footTraffic: 1800,
    openingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "09:00 - 18:00",
      sunday: "09:00 - 15:00"
    },
    imageUrl: "https://images.unsplash.com/photo-1555196301-9acc011dfde2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: "store-005",
    name: "Bemol Porto Velho",
    address: "Av. Carlos Gomes, 1223 - Centro",
    city: "Porto Velho",
    state: "RO",
    postalCode: "76801-123",
    phone: "(69) 3224-5000",
    email: "portovelho@bemol.com.br",
    coordinates: {
      lat: -8.7612,
      lng: -63.9099
    },
    storeSize: "medium",
    footTraffic: 1700,
    openingHours: {
      weekdays: "09:00 - 19:00",
      saturday: "09:00 - 18:00",
      sunday: "Fechado"
    },
    imageUrl: "https://images.unsplash.com/photo-1514481538271-cf9f99627dc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];
