import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSpaces } from "@/hooks/useSpaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { RESERVATION_STATUS } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Reservation } from "@/types";
import { Search, Calendar } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { formatDateRange } from "@/lib/formatters";

const MyReservations = () => {
  const { reservations, isLoadingReservations, cancelReservation, isCanceling, getSpaceById } = useSpaces();
  const [activeTab, setActiveTab] = useState("active");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<DateRange | undefined>(undefined);
  const [filteredActiveReservations, setFilteredActiveReservations] = useState<Reservation[]>([]);
  const [filteredCompletedReservations, setFilteredCompletedReservations] = useState<Reservation[]>([]);

  // Ensure reservations is an array before filtering
  const reservationsArray = Array.isArray(reservations) ? reservations : [];

  const activeReservations = reservationsArray.filter(
    (reservation: Reservation) => reservation.status !== "completed" && reservation.status !== "cancelled"
  );

  const completedReservations = reservationsArray.filter(
    (reservation: Reservation) => reservation.status === "completed" || reservation.status === "cancelled"
  );

  // Apply filters whenever search term or date filter changes
  useEffect(() => {
    // Filter active reservations
    setFilteredActiveReservations(
      activeReservations.filter((reservation: Reservation) => {
        const space = getSpaceById(reservation.spaceId);
        const matchesSearch = searchTerm === "" || 
          (space?.name && space.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDateRange = !dateFilter?.from || !dateFilter?.to || 
          (new Date(reservation.startDate) <= dateFilter.to && 
           new Date(reservation.endDate) >= dateFilter.from);
        
        return matchesSearch && matchesDateRange;
      })
    );

    // Filter completed reservations
    setFilteredCompletedReservations(
      completedReservations.filter((reservation: Reservation) => {
        const space = getSpaceById(reservation.spaceId);
        const matchesSearch = searchTerm === "" || 
          (space?.name && space.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          reservation.id.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDateRange = !dateFilter?.from || !dateFilter?.to || 
          (new Date(reservation.startDate) <= dateFilter.to && 
           new Date(reservation.endDate) >= dateFilter.from);
        
        return matchesSearch && matchesDateRange;
      })
    );
  }, [searchTerm, dateFilter, activeReservations, completedReservations, getSpaceById]);

  const handleCancelReservation = async (reservationId: string) => {
    try {
      await cancelReservation(reservationId);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      toast.error("Erro ao cancelar reserva. Tente novamente.");
    }
  };

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

  const handleResetFilters = () => {
    setSearchTerm("");
    setDateFilter(undefined);
  };

  if (isLoadingReservations) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Minhas Reservas</h1>
      
      {/* Filtros */}
      <div className="mb-6 grid gap-4 md:grid-cols-[1fr,auto,auto]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Buscar por espaço ou ID"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DateRangePicker
          value={dateFilter}
          onChange={setDateFilter}
          className="w-full md:w-auto"
        />
        <Button 
          variant="outline" 
          onClick={handleResetFilters}
          className="w-full md:w-auto"
        >
          Limpar Filtros
        </Button>
      </div>
      
      <Tabs defaultValue="active" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="active">Reservas Ativas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {filteredActiveReservations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {activeReservations.length === 0 
                ? "Você não possui reservas ativas no momento."
                : "Nenhuma reserva encontrada com os filtros aplicados."}
            </p>
          ) : (
            <div className="space-y-8">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">ID</TableHead>
                      <TableHead className="text-left">Espaço</TableHead>
                      <TableHead className="text-left">Período</TableHead>
                      <TableHead className="text-left">Valor</TableHead>
                      <TableHead className="text-left">Status</TableHead>
                      <TableHead className="text-left">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActiveReservations.map((reservation: Reservation) => {
                      const space = getSpaceById(reservation.spaceId);
                      return (
                        <TableRow key={reservation.id}>
                          <TableCell className="font-medium text-left">
                            {space?.id ? `${space.id}` : "ID não encontrado"}
                          </TableCell>
                          <TableCell className="font-medium text-left">{space?.name || "Espaço não encontrado"}</TableCell>
                          <TableCell className="text-left">
                            {formatDateRange(new Date(reservation.startDate), new Date(reservation.endDate))}
                          </TableCell>
                          <TableCell className="text-left">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(reservation.totalPrice)}
                          </TableCell>
                          <TableCell className="text-left">
                            <Badge className={getStatusColor(reservation.status)}>
                              {RESERVATION_STATUS[reservation.status as keyof typeof RESERVATION_STATUS]}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-left">
                            {reservation.status === "pending" && (
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleCancelReservation(reservation.id)}
                                disabled={isCanceling}
                              >
                                Cancelar
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {filteredCompletedReservations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              {completedReservations.length === 0 
                ? "Você ainda não possui histórico de reservas."
                : "Nenhuma reserva encontrada com os filtros aplicados."}
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left">ID</TableHead>
                  <TableHead className="text-left">Espaço</TableHead>
                  <TableHead className="text-left">Período</TableHead>
                  <TableHead className="text-left">Valor</TableHead>
                  <TableHead className="text-left">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompletedReservations.map((reservation: Reservation) => {
                  const space = getSpaceById(reservation.spaceId);
                  return (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium text-left">
                        {space?.id ? `${space.id}` : "ID não encontrado"}
                      </TableCell>
                      <TableCell className="font-medium text-left">{space?.name || "Espaço não encontrado"}</TableCell>
                      <TableCell className="text-left">
                        {formatDateRange(new Date(reservation.startDate), new Date(reservation.endDate))}
                      </TableCell>
                      <TableCell className="text-left">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(reservation.totalPrice)}
                      </TableCell>
                      <TableCell className="text-left">
                        <Badge className={getStatusColor(reservation.status)}>
                          {RESERVATION_STATUS[reservation.status as keyof typeof RESERVATION_STATUS]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyReservations; 