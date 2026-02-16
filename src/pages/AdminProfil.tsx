import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { ProfilEditor } from "@/components/admin/ProfilEditor";

const AdminProfil = () => {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSupabaseSession();

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate, session, sessionLoading]);

  return (
    <AdminLayout>
      <section className="section-padding bg-card">
        <div className="container max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Edit Profil</h1>
            <p className="text-sm text-muted-foreground">Ubah konten halaman Profil (Tentang, Visi, Misi)</p>
          </div>
          <ProfilEditor />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminProfil;
