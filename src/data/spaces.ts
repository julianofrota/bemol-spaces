import { MediaSpace, MediaSpaceType, StoreSector } from '@/types';
import { storeLocations } from './locations';

// Função auxiliar para gerar IDs únicos
const generateId = (index: number) => `space-${String(index + 1).padStart(3, '0')}`;

type BaseSpace = {
  id: string;
  name: string;
  type: MediaSpaceType;
  description: string;
  price: number;
  exposurePotential: number;
  occupancyRate: number;
  category: string;
};

// Função para criar espaços em massa com variações
const createSpaces = () => {
  const baseSpaces: Omit<BaseSpace, 'id'>[] = [
    {
      name: 'Vitrine Premium',
      type: 'window',
      description: 'Vitrine principal com alta visibilidade',
      price: 3000,
      exposurePotential: 8000,
      occupancyRate: 90,
      category: 'premium'
    },
    {
      name: 'Display Digital',
      type: 'digital-display',
      description: 'Tela digital interativa em alta resolução',
      price: 2000,
      exposurePotential: 6000,
      occupancyRate: 85,
      category: 'digital'
    },
    {
      name: 'Ponta de Gôndola',
      type: 'endcap',
      description: 'Espaço privilegiado no fim do corredor',
      price: 1500,
      exposurePotential: 5000,
      occupancyRate: 75,
      category: 'standard'
    },
    {
      name: 'Display de Chão',
      type: 'floor-standing',
      description: 'Display standalone para produtos em destaque',
      price: 1200,
      exposurePotential: 4000,
      occupancyRate: 70,
      category: 'standard'
    },
    {
      name: 'Área de Checkout',
      type: 'checkout',
      description: 'Espaço próximo aos caixas',
      price: 800,
      exposurePotential: 3000,
      occupancyRate: 95,
      category: 'standard'
    }
  ];

  const availableSectors: StoreSector[] = [
    'Salão',
    'Autosserviço',
    'Linha Branca',
    'Móveis',
    'Telefonia',
    'Eletrônicos'
  ];

  const spaces: MediaSpace[] = [];

  // Gerar 150 espaços (3 páginas com 50 itens cada)
  for (let i = 0; i < 150; i++) {
    const baseSpace = baseSpaces[i % baseSpaces.length];
    const store = storeLocations[i % storeLocations.length];
    const sector = availableSectors[i % availableSectors.length];
    const variation = Math.floor(i / baseSpaces.length) + 1;

    // Calcular preço com variação
    const priceVariation = 1 + (variation % 3) * 0.1;
    const finalPrice = Math.round(baseSpace.price * priceVariation);

    spaces.push({
      id: generateId(i),
      name: `${baseSpace.name} ${variation}`,
      type: baseSpace.type,
      description: `${baseSpace.description} - Unidade ${store.name}`,
      images: ['/placeholder.svg', '/placeholder.svg'],
      price: finalPrice,
      location: {
        store: store.name,
        sector: sector,
        city: store.city
      },
      status: i % 10 === 0 ? 'high-demand' : i % 5 === 0 ? 'reserved' : 'available',
      exposurePotential: Math.round(baseSpace.exposurePotential * (1 + (variation % 3) * 0.1)),
      occupancyRate: Math.min(100, baseSpace.occupancyRate + (variation % 3) * 5)
    });
  }

  return spaces;
};

export const spaces = createSpaces();

export const successCases = [
  {
    id: 'electrolux',
    brand: 'Electrolux',
    title: 'Lançamento da Linha InteliSense',
    description: 'Aumento de 45% nas vendas com exposição premium nas lojas Bemol.',
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30',
    results: 'Crescimento de 45% nas vendas | ROI de 300% | Lançamento bem sucedido',
    testimonial: 'A parceria com a Bemol Media foi fundamental para o sucesso do lançamento da nossa nova linha de produtos no Norte do Brasil.',
    contactPerson: 'Carlos Silva, Diretor de Marketing da Electrolux Brasil'
  },
  {
    id: 'samsung',
    brand: 'Samsung',
    title: 'Campanha de Black Friday',
    description: 'Venda recorde de TVs com estratégia multicanal e presença em lojas.',
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
    results: 'Crescimento de 70% nas vendas | Esgotamento de estoque | Maior conversão da história',
    testimonial: 'A estratégia integrada com a Bemol nos permitiu atingir resultados extraordinários durante a Black Friday.',
    contactPerson: 'Patricia Mendes, Gerente de Trade Marketing da Samsung'
  },
  {
    id: 'brastemp',
    brand: 'Brastemp',
    title: 'Renovação de Linha de Refrigeradores',
    description: 'Entrada no mercado amazonense com forte presença visual nas lojas.',
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30',
    results: 'Market share de 22% | Reconhecimento de marca aumentou 35% | ROI de 250%',
    testimonial: 'A Bemol foi nossa principal parceira para estabelecer presença no mercado do Norte, com resultados acima do esperado.',
    contactPerson: 'Roberto Almeida, VP Comercial da Whirlpool Brasil'
  }
];
