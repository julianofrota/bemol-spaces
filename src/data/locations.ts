import { StoreLocation, StoreSector } from '@/types';

const availableSectors: StoreSector[] = [
  'Salão',
  'Autosserviço',
  'Linha Branca',
  'Móveis',
  'Telefonia',
  'Eletrônicos'
];

export const storeLocations: StoreLocation[] = [
  {
    id: '1',
    name: 'Bemol Manaus Shopping',
    address: 'Av. Djalma Batista, 482 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-010',
    phone: '(92) 2121-2121',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 50000,
    imageUrl: '/images/stores/manaus-shopping.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: availableSectors
  },
  {
    id: '2',
    name: 'Bemol Manauara',
    address: 'Av. Mário Ypiranga Monteiro, 1300 - Adrianópolis',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69057-002',
    phone: '(92) 2121-2122',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 45000,
    imageUrl: '/images/stores/manauara.jpg',
    coordinates: {
      lat: -3.0977,
      lng: -60.0253
    },
    sectors: availableSectors
  },
  {
    id: '3',
    name: 'Bemol Manaus Plaza',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2123',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '4',
    name: 'Bemol Manaus Plaza Shopping',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2124',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '5',
    name: 'Bemol Manaus Plaza Shopping II',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2125',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-2.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '6',
    name: 'Bemol Manaus Plaza Shopping III',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2126',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-3.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '7',
    name: 'Bemol Manaus Plaza Shopping IV',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2127',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-4.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '8',
    name: 'Bemol Manaus Plaza Shopping V',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2128',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-5.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '9',
    name: 'Bemol Manaus Plaza Shopping VI',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2129',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-6.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  },
  {
    id: '10',
    name: 'Bemol Manaus Plaza Shopping VII',
    address: 'Av. Djalma Batista, 2020 - Chapada',
    city: 'Manaus',
    state: 'AM',
    postalCode: '69050-020',
    phone: '(92) 2121-2130',
    openingHours: {
      weekdays: '09:00 - 22:00',
      saturday: '09:00 - 22:00',
      sunday: '12:00 - 20:00'
    },
    storeSize: 'large',
    footTraffic: 40000,
    imageUrl: '/images/stores/manaus-plaza-shopping-7.jpg',
    coordinates: {
      lat: -3.1190,
      lng: -60.0217
    },
    sectors: ['Eletrônicos', 'Eletrodomésticos', 'Móveis', 'Cama, Mesa e Banho', 'Moda', 'Alimentos']
  }
];
