import { Reservation } from '@/types';

// Função auxiliar para criar datas
const createDate = (daysFromNow: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

// Dados mockados de reservas
export const mockReservations: Reservation[] = [
  {
    id: "res-001",
    spaceId: "space-001",
    userId: "user-001",
    startDate: createDate(5),
    endDate: createDate(35),
    status: "pending",
    totalPrice: 8000,
    paymentStatus: "pending",
    companyName: "Tech Solutions LTDA",
    contactName: "Maria Silva",
    contactEmail: "maria@techsolutions.com",
    contactPhone: "(92) 98765-4321",
    notes: "Preferência por horário de maior movimento",
    createdAt: createDate(-2),
    updatedAt: createDate(-2)
  },
  {
    id: "res-002",
    spaceId: "space-002",
    userId: "user-001",
    startDate: createDate(-30),
    endDate: createDate(0),
    status: "completed",
    totalPrice: 5500,
    paymentStatus: "paid",
    companyName: "Tech Solutions LTDA",
    contactName: "Maria Silva",
    contactEmail: "maria@techsolutions.com",
    contactPhone: "(92) 98765-4321",
    notes: "Campanha de lançamento de produto",
    createdAt: createDate(-60),
    updatedAt: createDate(0)
  },
  {
    id: "res-003",
    spaceId: "space-001",
    userId: "user-001",
    startDate: createDate(-15),
    endDate: createDate(15),
    status: "confirmed",
    totalPrice: 8000,
    paymentStatus: "paid",
    companyName: "Tech Solutions LTDA",
    contactName: "Maria Silva",
    contactEmail: "maria@techsolutions.com",
    contactPhone: "(92) 98765-4321",
    notes: "Campanha de férias",
    createdAt: createDate(-45),
    updatedAt: createDate(-15)
  },
  {
    id: "res-004",
    spaceId: "space-002",
    userId: "user-001",
    startDate: createDate(-60),
    endDate: createDate(-30),
    status: "cancelled",
    totalPrice: 5500,
    paymentStatus: "refunded",
    companyName: "Tech Solutions LTDA",
    contactName: "Maria Silva",
    contactEmail: "maria@techsolutions.com",
    contactPhone: "(92) 98765-4321",
    notes: "Cancelado devido a mudança de estratégia",
    createdAt: createDate(-90),
    updatedAt: createDate(-60)
  }
]; 