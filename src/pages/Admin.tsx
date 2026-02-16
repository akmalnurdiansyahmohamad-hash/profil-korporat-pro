import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { defaultContent } from "@/content/defaultContent";
import { deletePageContent, getPageContent, type PageSlug, upsertPageContent } from "@/lib/siteContent";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

const PAGE_SLUGS: Array<{ slug: PageSlug; label: string }> = [
  { slug: "beranda", label: "Beranda" },
  { slug: "profil", label: "Profil" },
  { slug: "tata-kelola", label: "Tata Kelola" },
  { slug: "ppid", label: "PPID" },
  { slug: "berita", label: "Berita" },
  { slug: "kontak", label: "Kontak" },
];

function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

const Admin = () => {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSupabaseSession();
  const [active, setActive] = useState<PageSlug>("beranda");
  const [loading, setLoading] = useState(false);
  const [rawJson, setRawJson] = useState<string>(prettyJson(defaultContent.beranda));
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [lastLoadedAt, setLastLoadedAt] = useState<number>(0);

  const defaultsBySlug = useMemo(() => {
    return {
      beranda: defaultContent.beranda,
      profil: defaultContent.profil,
      "tata-kelola": defaultContent["tata-kelola"],
      ppid: defaultContent.ppid,
      berita: defaultContent.berita,
      kontak: defaultContent.kontak,
    } as const;
  }, []);

  useEffect(() => {
    if (!sessionLoading && !session) {
      navigate("/admin/login", { replace: true });
    }
  }, [navigate, session, sessionLoading]);

  const load = async (slug: PageSlug) => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        const content = defaultsBySlug[slug];
        setRawJson(prettyJson(content));
        setLastLoadedAt(Date.now());
        // Set default first section
        const firstSection = Object.keys(content)[0];
        setActiveSection(firstSection);
        return;
      }
      const row = await getPageContent(slug);
      const value = row?.content ?? defaultsBySlug[slug];
      setRawJson(prettyJson(value));
      setLastLoadedAt(Date.now());
      // Set default first section
      const firstSection = Object.keys(value)[0];
      setActiveSection(firstSection);
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal memuat konten");
      setRawJson(prettyJson(defaultsBySlug[active]));
      setLastLoadedAt(Date.now());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(active);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const onSave = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        toast.error("Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.");
        return;
      }
      const parsed = JSON.parse(rawJson);
      await upsertPageContent(active, parsed);
      toast.success("Tersimpan");
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const onSaveSection = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        toast.error("Supabase belum dikonfigurasi. Set VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY.");
        return;
      }
      const fullContent = JSON.parse(rawJson);
      const textareaEl = document.querySelector(`textarea[data-section="${activeSection}"]`) as HTMLTextAreaElement;
      const sectionJson = JSON.parse(textareaEl?.value || "{}");
      fullContent[activeSection] = sectionJson;
      await upsertPageContent(active, fullContent);
      setRawJson(prettyJson(fullContent));
      toast.success(`Bagian ${activeSection} tersimpan`);
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal menyimpan bagian");
    } finally {
      setLoading(false);
    }
  };

  const onResetToDefault = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        setRawJson(prettyJson(defaultsBySlug[active]));
        toast.success("Reset ke default");
        return;
      }
      await deletePageContent(active);
      setRawJson(prettyJson(defaultsBySlug[active]));
      toast.success("Reset ke default");
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal reset");
    } finally {
      setLoading(false);
    }
  };

  const onReload = async () => {
    await load(active);
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      navigate("/admin/login", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal logout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <section className="section-padding bg-card">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Konten</h1>
              <p className="text-sm text-muted-foreground">Edit konten per halaman (format JSON)</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onReload} disabled={loading || sessionLoading}>
                Reload
              </Button>
              <Button variant="destructive" onClick={onLogout} disabled={loading || sessionLoading}>
                Logout
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Konten Halaman</CardTitle>
              <CardDescription>
                Pilih halaman, ubah JSON, lalu simpan. Terakhir load: {lastLoadedAt ? new Date(lastLoadedAt).toLocaleString("id-ID") : "-"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={active} onValueChange={(v) => setActive(v as PageSlug)}>
                <TabsList className="flex flex-wrap h-auto">
                  {PAGE_SLUGS.map((p) => (
                    <TabsTrigger key={p.slug} value={p.slug}>
                      {p.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {PAGE_SLUGS.map((p) => {
                  const content = JSON.parse(rawJson || "{}");
                  const sections = Object.keys(content);
                  return (
                    <TabsContent key={p.slug} value={p.slug} className="mt-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {sections.map((section) => (
                            <Button
                              key={section}
                              variant={activeSection === section ? "default" : "outline"}
                              size="sm"
                              onClick={() => setActiveSection(section)}
                            >
                              {section}
                            </Button>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <Textarea
                            data-section={activeSection}
                            className="min-h-[320px] font-mono text-xs"
                            value={prettyJson(content[activeSection] || {})}
                            onChange={(e) => {
                              const updated = { ...content };
                              try {
                                updated[activeSection] = JSON.parse(e.target.value);
                                setRawJson(prettyJson(updated));
                              } catch {
                                // ignore invalid JSON while typing
                              }
                            }}
                            spellCheck={false}
                          />
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button variant="accent" onClick={onSaveSection} disabled={loading || sessionLoading}>
                              Simpan Bagian Ini
                            </Button>
                            <Button variant="outline" onClick={onSave} disabled={loading || sessionLoading}>
                              Simpan Semua
                            </Button>
                            <Button variant="outline" onClick={onResetToDefault} disabled={loading || sessionLoading}>
                              Reset ke Default
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  );
                })}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Admin;
