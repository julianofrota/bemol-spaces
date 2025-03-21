import { MediaSpaceType, SpaceStatus } from "@/types"

export const SPACE_TYPES: Record<MediaSpaceType, string> = {
  'endcap': 'Ponta de Gôndola',
  'digital-display': 'Display Digital',
  'window': 'Vitrine',
  'floor-standing': 'Display de Chão',
  'checkout': 'Checkout',
  'entrance': 'Entrada',
  'banner': 'Banner',
  'gondola': 'Gôndola'
}

export const SPACE_STATUS: Record<SpaceStatus, {
  label: string
  color: 'default' | 'secondary' | 'destructive'
}> = {
  'available': {
    label: 'Disponível',
    color: 'default'
  },
  'reserved': {
    label: 'Reservado',
    color: 'destructive'
  },
  'high-demand': {
    label: 'Alta Demanda',
    color: 'secondary'
  }
}

export const RESERVATION_STATUS = {
  'pending': 'Pendente',
  'confirmed': 'Confirmado',
  'cancelled': 'Cancelado',
  'completed': 'Concluído'
} as const

export const PAYMENT_STATUS = {
  'pending': 'Pendente',
  'paid': 'Pago',
  'refunded': 'Reembolsado'
} as const

export const DIMENSION_UNITS = {
  'm': 'metros',
  'cm': 'centímetros',
  'inches': 'polegadas'
} as const

export const PRICE_PERIODS = {
  'day': 'dia',
  'week': 'semana',
  'month': 'mês'
} as const

export const STORES = [
  {
    id: 'store-1',
    name: 'Loja Centro',
    city: 'Manaus',
    address: 'Av. Eduardo Ribeiro, 520 - Centro'
  },
  {
    id: 'store-2',
    name: 'Loja Shopping',
    city: 'Manaus',
    address: 'Shopping Manauara - Av. Mário Ypiranga'
  }
] as const 