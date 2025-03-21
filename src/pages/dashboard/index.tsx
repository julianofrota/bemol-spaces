import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Users, DollarSign, Clock, PieChart, BarChart3, Construction } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MediaSpace, Reservation } from "@/types"
import { formatCurrency, formatDateRange } from "@/lib/formatters"
import { useState, useEffect } from "react"
import { RESERVATION_STATUS } from "@/lib/constants"
import SpaceCard from "@/components/spaces/SpaceCard"
import SpaceDetails from "@/components/spaces/SpaceDetails"
import { useSpaces } from "@/hooks/useSpaces"
import DashboardLayout from "@/components/dashboard/DashboardLayout"
import { DashboardStats } from "@/components/dashboard/DashboardStats"

// Mock data - Apenas para desenvolvimento
const mockReservations: Reservation[] = [
  {
    id: "1",
    spaceId: "1",
    userId: "user1",
    startDate: new Date("2024-03-15"),
    endDate: new Date("2024-03-30"),
    status: "confirmed",
    totalPrice: 2500,
    paymentStatus: "paid",
    companyName: "Empresa A",
    contactName: "João Silva",
    contactEmail: "joao@empresa.com",
    contactPhone: "(92) 98765-4321",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    spaceId: "2",
    userId: "user1",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-04-15"),
    status: "pending",
    totalPrice: 1800,
    paymentStatus: "pending",
    companyName: "Empresa A",
    contactName: "João Silva",
    contactEmail: "joao@empresa.com",
    contactPhone: "(92) 98765-4321",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    spaceId: "3",
    userId: "user1",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-03-10"),
    status: "completed",
    totalPrice: 3200,
    paymentStatus: "paid",
    companyName: "Empresa A",
    contactName: "João Silva",
    contactEmail: "joao@empresa.com",
    contactPhone: "(92) 98765-4321",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const mockSpaces: MediaSpace[] = [
  {
    id: "1",
    name: "Vitrine Principal",
    type: "window",
    description: "Vitrine principal da loja",
    images: ["/placeholder.svg"],
    price: 2500,
    location: {
      store: "Loja Centro",
      sector: "Eletrônicos",
      city: "Manaus"
    },
    status: "available",
    exposurePotential: 95,
    occupancyRate: 85
  },
  {
    id: "2",
    name: "Totem Digital",
    type: "digital-display",
    description: "Display digital interativo",
    images: ["/placeholder.svg"],
    price: 1800,
    location: {
      store: "Loja Shopping",
      sector: "Telefonia",
      city: "Manaus"
    },
    status: "high-demand",
    exposurePotential: 88,
    occupancyRate: 72
  },
  {
    id: "3",
    name: "Espaço Endcap",
    type: "endcap",
    description: "Ponta de gôndola em área de grande circulação",
    images: ["/placeholder.svg"],
    price: 3200,
    location: {
      store: "Loja Shopping",
      sector: "Eletrônicos",
      city: "Manaus"
    },
    status: "available",
    exposurePotential: 92,
    occupancyRate: 78
  },
  {
    id: "4",
    name: "Display de Checkout",
    type: "checkout",
    description: "Display próximo aos caixas",
    images: ["/placeholder.svg"],
    price: 1500,
    location: {
      store: "Loja Centro",
      sector: "Autosserviço",
      city: "Manaus"
    },
    status: "available",
    exposurePotential: 85,
    occupancyRate: 65
  }
]

const DashboardPage = () => {
  // Em produção, usar apenas o useSpaces() hook para acessar dados reais
  const { reservations: apiReservations, isLoadingReservations, getSpaceById: apiGetSpaceById } = useSpaces();
  
  // Usar os dados da API em produção, ou mocks em desenvolvimento
  const [spaces] = useState<MediaSpace[]>(mockSpaces)
  const [selectedSpace, setSelectedSpace] = useState<MediaSpace | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  
  // Função para obter espaço por ID - usa a API se disponível, caso contrário usa a função local
  const getSpaceById = (spaceId: string) => {
    if (apiGetSpaceById) {
      return apiGetSpaceById(spaceId);
    }
    return spaces.find(space => space.id === spaceId);
  };
  
  // Usando os dados da API se disponíveis, caso contrário, usa os mock data
  const allReservations = Array.isArray(apiReservations) && apiReservations.length > 0 
    ? apiReservations 
    : mockReservations;
  
  // Ordenar reservas por data mais recente
  const sortedReservations = [...allReservations].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
  
  // Pegar as 5 últimas reservas para exibir no dashboard
  const latestReservations = sortedReservations.slice(0, 5);
  
  // Total de todas as reservas
  const totalReservations = allReservations.length;

  // Reservas ativas (confirmadas)
  const activeReservations = allReservations
    .filter(r => r.status === "confirmed")
    .length;

  // Investimento total (todas as reservas)
  const totalInvestment = allReservations
    .reduce((acc, curr) => acc + curr.totalPrice, 0);

  // Pessoas impactadas (usando exposurePotential como estimativa)
  const estimatedImpact = allReservations
    .map(r => {
      const space = getSpaceById(r.spaceId);
      return space ? space.exposurePotential * 100 : 0; // multiplicando por 100 para simular número de pessoas
    })
    .reduce((acc, curr) => acc + curr, 0);

  // Espaços recomendados (ordenados por potencial de exposição)
  const recommendedSpaces = [...spaces]
    .sort((a, b) => b.exposurePotential - a.exposurePotential)
    .slice(0, 3);

  // Função para obter a cor do status - idêntica à usada em MyReservations
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  // Função para abrir os detalhes de um espaço
  const handleSpaceSelect = (space: MediaSpace) => {
    setSelectedSpace(space);
    setDetailsOpen(true);
  };

  const header = (
    <div className="container flex h-14 items-center px-4">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
    </div>
  );

  return (
    <DashboardLayout header={header}>
      <div className="space-y-6">
        <DashboardStats
          totalReservations={totalReservations}
          activeReservations={activeReservations}
          totalInvestment={totalInvestment}
          estimatedImpact={estimatedImpact}
        />
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Últimas Reservas</h3>
              <div className="relative w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Espaço</TableHead>
                      <TableHead>Período</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoadingReservations ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          Carregando...
                        </TableCell>
                      </TableRow>
                    ) : latestReservations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          Você não possui reservas no momento.
                        </TableCell>
                      </TableRow>
                    ) : (
                      latestReservations.map((reservation) => {
                        const space = getSpaceById(reservation.spaceId);
                        if (!space) return null;

                        return (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">{reservation.id}</TableCell>
                            <TableCell>{space.name}</TableCell>
                            <TableCell>{formatDateRange(new Date(reservation.startDate), new Date(reservation.endDate))}</TableCell>
                            <TableCell>{formatCurrency(reservation.totalPrice)}</TableCell>
                            <TableCell>
                              <Badge className={getStatusColor(reservation.status)}>
                                {RESERVATION_STATUS[reservation.status as keyof typeof RESERVATION_STATUS]}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Espaços Recomendados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedSpaces.map(space => (
                  <SpaceCard 
                    key={space.id} 
                    space={space} 
                    onSelect={handleSpaceSelect} 
                  />
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6 md:p-8 text-center">
              <Construction className="h-10 w-10 md:h-16 md:w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Em Breve</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Estamos trabalhando para trazer análises detalhadas sobre seus espaços e reservas.
                Esta funcionalidade estará disponível em breve.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card className="p-6 md:p-8 text-center">
              <Construction className="h-10 w-10 md:h-16 md:w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-2">Em Breve</h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Estamos desenvolvendo relatórios personalizados para ajudá-lo a visualizar melhor
                seus resultados. Esta funcionalidade estará disponível em breve.
              </p>
            </Card>
          </TabsContent>
        </Tabs>

        <SpaceDetails 
          space={selectedSpace} 
          open={detailsOpen} 
          onOpenChange={setDetailsOpen} 
        />
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage 