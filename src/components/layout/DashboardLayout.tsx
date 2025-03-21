import { Link, Outlet, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Store,
  CalendarDays,
  User,
  LogOut,
  Menu,
  X,
  ShoppingCart
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSelectedSpaces } from "@/contexts/SelectedSpacesContext"

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const { selectedSpaces } = useSelectedSpaces()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Espaços",
      href: "/spaces",
      icon: Store
    },
    {
      name: "Carrinho",
      href: "/dashboard/checkout",
      icon: ShoppingCart,
      badge: selectedSpaces.length > 0 ? selectedSpaces.length : undefined
    },
    {
      name: "Minhas Reservas",
      href: "/reservations",
      icon: CalendarDays
    },
    {
      name: "Perfil",
      href: "/profile",
      icon: User
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para Desktop */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png"
                alt="Bemol Spaces"
                className="h-8"
              />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-lg",
                    isActive
                      ? "bg-bemol-blue text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                  {item.badge && (
                    <span className="ml-auto bg-bemol-blue text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="border-t p-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">João Silva</p>
                <p className="text-xs text-gray-500">Empresa A</p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className={cn(
        "lg:pl-64 flex flex-col min-h-screen",
        isSidebarOpen && "blur-sm lg:blur-none"
      )}>
        {/* Header Mobile */}
        <header className="lg:hidden sticky top-0 z-40 flex items-center h-16 bg-white border-b px-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="ml-4">
            <img 
              src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png"
              alt="Bemol Spaces"
              className="h-8"
            />
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Overlay para fechar o sidebar no mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default DashboardLayout 