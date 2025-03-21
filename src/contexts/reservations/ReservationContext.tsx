import { createContext, useContext, useState, ReactNode } from "react";
import { MediaSpace } from "@/types";
import { formSchema } from "@/components/reservations/NewReservationForm";
import * as z from "zod";

export interface Reservation {
  id: string;
  space: MediaSpace;
  status: "pending" | "confirmed" | "cancelled";
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  message?: string;
}

interface ReservationContextType {
  reservations: Reservation[];
  addReservation: (data: z.infer<typeof formSchema>) => void;
  removeReservation: (id: string) => void;
  updateReservation: (id: string, data: Partial<Reservation>) => void;
}

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const addReservation = (data: z.infer<typeof formSchema>) => {
    const newReservation: Reservation = {
      id: Math.random().toString(36).substr(2, 9),
      space: data.space,
      status: "pending",
      companyName: data.companyName,
      contactName: data.contactName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };

    setReservations((prev) => [...prev, newReservation]);
  };

  const removeReservation = (id: string) => {
    setReservations((prev) => prev.filter((reservation) => reservation.id !== id));
  };

  const updateReservation = (id: string, data: Partial<Reservation>) => {
    setReservations((prev) =>
      prev.map((reservation) =>
        reservation.id === id ? { ...reservation, ...data } : reservation
      )
    );
  };

  return (
    <ReservationContext.Provider
      value={{ reservations, addReservation, removeReservation, updateReservation }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservations() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("useReservations must be used within a ReservationProvider");
  }
  return context;
} 