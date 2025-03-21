import { z } from "zod"

export const mediaSpaceSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  type: z.enum(["endcap", "digital-display", "window", "floor-standing", "checkout", "entrance", "banner", "gondola"] as const),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres"),
  images: z.array(z.string().url("URL inválida")).min(1, "Adicione pelo menos uma imagem"),
  videoUrl: z.string().url("URL inválida").optional(),
  price: z.number().positive("Valor deve ser positivo"),
  dimensions: z.object({
    width: z.number().positive("Largura deve ser positiva"),
    height: z.number().positive("Altura deve ser positiva"),
    unit: z.enum(["m", "cm", "inches"] as const),
  }),
  location: z.object({
    store: z.string().min(1, "Selecione uma loja"),
    sector: z.string().min(1, "Selecione um setor"),
  }),
  status: z.enum(["available", "reserved", "high-demand"] as const),
})

export const reservationRequestSchema = z.object({
  spaceId: z.string().uuid("ID do espaço inválido"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  companyName: z.string().min(2, "Nome da empresa deve ter pelo menos 2 caracteres"),
  contactName: z.string().min(3, "Nome do contato deve ter pelo menos 3 caracteres"),
  contactEmail: z.string().email("Email inválido"),
  contactPhone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido"),
  notes: z.string().optional(),
}).refine(
  (data) => new Date(data.startDate) < new Date(data.endDate),
  {
    message: "Data final deve ser posterior à data inicial",
    path: ["endDate"],
  }
)

export type MediaSpaceForm = z.infer<typeof mediaSpaceSchema>
export type ReservationRequestForm = z.infer<typeof reservationRequestSchema> 