import { Link, Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-white border-b">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/976fd8bd-8c22-4237-9751-2f1e53020e6a.png"
              alt="Bemol Spaces"
              className="h-8"
            />
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Bemol Spaces. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}

export default AuthLayout 