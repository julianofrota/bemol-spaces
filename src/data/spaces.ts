
export interface MediaSpace {
  id: string;
  name: string;
  type: 'endcap' | 'digital-display' | 'window' | 'floor-standing' | 'checkout' | 'entrance';
  description: string;
  images: string[];
  videoUrl?: string;
  price: {
    weekly: number;
    monthly: number;
  };
  dimensions: string;
  storeIds: string[];
  features: string[];
  availability: boolean;
  exposurePotential: number; // Potential viewers per day
  category: string;
}

export const mediaSpaces: MediaSpace[] = [
  {
    id: "space-001",
    name: "Endcap Premium",
    type: "endcap",
    description: "Ponto de exposição na ponta de gôndola em áreas de alto tráfego, ideal para lançamentos de produtos.",
    images: [
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/jYMx2RQpf-U",
    price: {
      weekly: 2500,
      monthly: 8000
    },
    dimensions: "2m x 1.5m x 2m",
    storeIds: ["store-001", "store-002", "store-003"],
    features: ["Alta visibilidade", "Espaço personalizável", "Iluminação direcional", "Sinalização digital"],
    availability: true,
    exposurePotential: 5000,
    category: "Eletrodomésticos"
  },
  {
    id: "space-002",
    name: "Display Digital 55\"",
    type: "digital-display",
    description: "Tela digital de 55 polegadas localizada em pontos estratégicos da loja para exibição de anúncios e conteúdo promocional.",
    images: [
      "https://images.unsplash.com/photo-1581091877018-dac6a371d50f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1581091012184-7e0cdfbb6797?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/jYMx2RQpf-U",
    price: {
      weekly: 1800,
      monthly: 5500
    },
    dimensions: "121.8cm x 68.5cm",
    storeIds: ["store-001", "store-004", "store-005"],
    features: ["Conteúdo dinâmico", "Alta resolução", "Programação remota", "Métricas de visualização"],
    availability: true,
    exposurePotential: 6000,
    category: "Eletrônicos"
  },
  {
    id: "space-003",
    name: "Vitrine Central",
    type: "window",
    description: "Espaço premium na vitrine principal da loja, com alta visibilidade tanto para quem passa pela loja quanto para quem entra.",
    images: [
      "https://images.unsplash.com/photo-1559171667-142cd4c147fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    price: {
      weekly: 3000,
      monthly: 10000
    },
    dimensions: "3m x 2m x 3m",
    storeIds: ["store-002", "store-003"],
    features: ["Visibilidade externa", "Iluminação premium", "Espaço totalmente personalizável", "Destaque na entrada"],
    availability: false,
    exposurePotential: 8000,
    category: "Móveis"
  },
  {
    id: "space-004",
    name: "Display de Chão Premium",
    type: "floor-standing",
    description: "Espaço para display de chão em áreas de alto tráfego, perfeito para demonstração de produtos.",
    images: [
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/jYMx2RQpf-U",
    price: {
      weekly: 1200,
      monthly: 4000
    },
    dimensions: "1.5m x 1m x 2m",
    storeIds: ["store-001", "store-004", "store-005"],
    features: ["Localização central", "Personalização completa", "Espaço para amostra de produto", "Excelente para interação"],
    availability: true,
    exposurePotential: 4500,
    category: "Eletrodomésticos"
  },
  {
    id: "space-005",
    name: "Área de Checkout",
    type: "checkout",
    description: "Espaço publicitário localizado na área de checkout, ideal para produtos de impulso e pequenas ofertas.",
    images: [
      "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80"
    ],
    price: {
      weekly: 1000,
      monthly: 3500
    },
    dimensions: "0.5m x 0.5m x 1m",
    storeIds: ["store-001", "store-002", "store-003", "store-004", "store-005"],
    features: ["Alta conversão", "Momento de decisão de compra", "Compatível com material POP", "Ideal para produtos de baixo valor"],
    availability: true,
    exposurePotential: 7000,
    category: "Todos"
  },
  {
    id: "space-006",
    name: "Espaço de Entrada",
    type: "entrance",
    description: "Localizado logo na entrada da loja, este espaço garante que todos os clientes vejam seu produto assim que entram.",
    images: [
      "https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1527186504227-0a47582ea5ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    videoUrl: "https://www.youtube.com/embed/jYMx2RQpf-U",
    price: {
      weekly: 2800,
      monthly: 9500
    },
    dimensions: "2.5m x 2m x 2.5m",
    storeIds: ["store-002", "store-003"],
    features: ["Máxima visibilidade", "Primeiro ponto de contato", "Ideal para novos produtos", "Alta taxa de observação"],
    availability: true,
    exposurePotential: 7500,
    category: "Eletrônicos"
  }
];

export const successCases = [
  {
    id: "case-001",
    brand: "Electrolux",
    title: "Lançamento da Linha IntelliSense",
    description: "Aumento de 45% nas vendas com exposição premium nas lojas Bemol.",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    results: "Crescimento de 45% nas vendas | ROI de 300% | Lançamento bem sucedido",
    testimonial: "A parceria com a Bemol Media foi fundamental para o sucesso do lançamento da nossa nova linha de produtos no Norte do Brasil.",
    contactPerson: "Carlos Silva, Diretor de Marketing da Electrolux Brasil"
  },
  {
    id: "case-002",
    brand: "Samsung",
    title: "Campanha de Black Friday",
    description: "Venda recorde de TVs com estratégia multicanal e presença em lojas.",
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    results: "Crescimento de 70% nas vendas | Esgotamento de estoque | Maior conversão da história",
    testimonial: "A estratégia integrada com a Bemol nos permitiu atingir resultados extraordinários durante a Black Friday.",
    contactPerson: "Patrícia Mendes, Gerente de Trade Marketing da Samsung"
  },
  {
    id: "case-003",
    brand: "Brastemp",
    title: "Renovação de Linha de Refrigeradores",
    description: "Entrada no mercado amazonense com forte presença visual nas lojas.",
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    results: "Market share de 22% | Reconhecimento de marca aumentou 35% | ROI de 250%",
    testimonial: "A Bemol foi nossa principal parceira para estabelecer presença no mercado do Norte, com resultados acima do esperado.",
    contactPerson: "Roberto Almeida, VP Comercial da Whirlpool Brasil"
  }
];
