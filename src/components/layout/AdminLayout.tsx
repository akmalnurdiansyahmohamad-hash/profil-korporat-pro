import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { toast } from "sonner";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import { Menu, FileText, Home, LogOut, UserCircle } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading: sessionLoading } = useSupabaseSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: FileText, label: "Konten", path: "/admin" },
    { icon: UserCircle, label: "Profil", path: "/admin/profil" },
    { icon: Home, label: "Lihat Situs", path: "/" },
  ];

  const onLogout = async () => {
    try {
      if (!isSupabaseConfigured || !supabase) {
        navigate("/admin/login", { replace: true });
        return;
      }
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/admin/login", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal logout");
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-card border-r">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">PT Nusantara Sejahtera MANDIRI</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Button
                key={item.path}
                variant={isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={onLogout}
            disabled={sessionLoading}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-card">
          <div className="flex items-center justify-between h-16 px-4">
            <div>
              <h1 className="text-lg font-bold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">PT Nusantara Sejahtera MANDIRI</p>
            </div>
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="p-6 border-b">
                  <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
                  <p className="text-sm text-muted-foreground">PT Nusantara Sejahtera MANDIRI</p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Button
                        key={item.path}
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => {
                          navigate(item.path);
                          setSidebarOpen(false);
                        }}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {item.label}
                      </Button>
                    );
                  })}
                </nav>
                <div className="p-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={onLogout}
                    disabled={sessionLoading}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:block border-b bg-muted/30">
          <div className="container px-6 py-4">
            <h2 className="text-lg font-semibold text-foreground">Kelola Konten Website</h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Simple Footer */}
        <footer className="border-t bg-muted/30 py-4">
          <div className="container px-4 text-center text-sm text-muted-foreground">
            Admin Panel &copy; 2026 PT Nusantara Sejahtera MANDIRI
          </div>
        </footer>
      </div>
    </div>
  );
}
