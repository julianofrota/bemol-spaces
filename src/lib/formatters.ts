import { MediaSpace } from "@/types"
import { SPACE_STATUS, SPACE_TYPES } from "./constants"

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

export const formatPrice = (price: number): string => {
  return `${formatCurrency(price)}/mês`
}

export const formatSpaceType = (type: MediaSpace['type']): string => {
  return SPACE_TYPES[type]
}

export const formatStatus = (status: MediaSpace['status']): {
  label: string
  color: 'default' | 'secondary' | 'destructive'
} => {
  return SPACE_STATUS[status]
}

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`
} 