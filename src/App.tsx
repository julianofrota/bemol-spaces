import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SelectedSpacesProvider } from "@/contexts/SelectedSpacesContext";

// Páginas
import Index from "./pages/home/Index";
import NotFound from "./pages/error/NotFound";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import ForgotPasswordPage from "./pages/auth/forgot-password";
import DashboardPage from "./pages/dashboard/index";
import SpacesPage from "./pages/spaces/index";
import CheckoutPage from "./pages/dashboard/checkout";
import MyReservations from "./pages/reservations/MyReservations";
import ProfilePage from "./pages/profile/ProfilePage";

// Layouts
import AuthLayout from "@/components/layout/AuthLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SelectedSpacesProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Rota pública principal */}
            <Route path="/" element={<Index />} />

            {/* Rotas de autenticação */}
            <Route element={<AuthLayout />}>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/auth/register" element={<RegisterPage />} />
              <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            </Route>

            {/* Rotas autenticadas */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/spaces" element={<SpacesPage />} />
              <Route path="/spaces/:id" element={<SpacesPage />} />
              <Route path="/dashboard/checkout" element={<CheckoutPage />} />
              <Route path="/reservations" element={<MyReservations />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>

            {/* Rota 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SelectedSpacesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
