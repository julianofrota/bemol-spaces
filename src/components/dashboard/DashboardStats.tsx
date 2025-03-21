import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarDays, CheckCircle2, DollarSign, Users } from "lucide-react";
import { formatCurrency } from "@/lib/formatters";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </CardContent>
  </Card>
);

interface DashboardStatsProps {
  totalReservations: number;
  activeReservations: number;
  totalInvestment: number;
  estimatedImpact: number;
}

export const DashboardStats = ({
  totalReservations,
  activeReservations,
  totalInvestment,
  estimatedImpact,
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total de Reservas"
        value={totalReservations}
        icon={<CalendarDays className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Reservas Ativas"
        value={activeReservations}
        icon={<CheckCircle2 className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Investimento Total"
        value={formatCurrency(totalInvestment)}
        icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Pessoas Impactadas"
        value={estimatedImpact.toLocaleString()}
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}; 