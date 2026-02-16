import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSupabaseSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sessionLoading && session) {
      navigate("/admin", { replace: true });
    }
  }, [navigate, session, sessionLoading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSupabaseConfigured || !supabase) {
      toast.error("Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success("Login berhasil");
      navigate("/admin", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="section-padding bg-card">
        <div className="container max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Admin Login</CardTitle>
              <CardDescription>Masuk untuk mengubah konten website</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
                </div>
                <Button type="submit" variant="accent" disabled={loading || sessionLoading} className="w-full">
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminLogin;
