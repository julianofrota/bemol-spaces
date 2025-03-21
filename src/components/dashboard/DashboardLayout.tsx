import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

const DashboardLayout = ({
  children,
  sidebar,
  header,
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {header && (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}
      
      <div className="flex">
        {sidebar && (
          <aside className="hidden lg:block fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 border-r bg-background">
            {sidebar}
          </aside>
        )}
        
        <main className={`flex-1 ${sidebar ? 'lg:pl-64' : ''}`}>
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 