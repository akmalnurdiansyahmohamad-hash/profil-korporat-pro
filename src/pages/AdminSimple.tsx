import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import { defaultContent } from "@/content/defaultContent";
import { deletePageContent, getPageContent, type PageSlug, upsertPageContent } from "@/lib/siteContent";
import { isSupabaseConfigured, supabase } from "@/lib/supabaseClient";

const PAGE_SLUGS: Array<{ slug: PageSlug; label: string }> = [
  { slug: "beranda", label: "Beranda" },
  { slug: "profil", label: "Profil" },
  { slug: "tata-kelola", label: "Tata Kelola" },
  { slug: "ppid", label: "PPID" },
  { slug: "berita", label: "Berita" },
  { slug: "kontak", label: "Kontak" },
];

const AdminSimple = () => {
  const navigate = useNavigate();
  const { session, loading: sessionLoading } = useSupabaseSession();
  const [active, setActive] = useState<PageSlug>("beranda");
  const [loading, setLoading] = useState(false);
  const [lastLoadedAt, setLastLoadedAt] = useState<number>(0);

  // State untuk setiap bagian halaman dengan tipe any untuk sementara
  const [brand, setBrand] = useState<any>(defaultContent.beranda.brand);
  const [hero, setHero] = useState<any>(defaultContent.beranda.hero);
  const [stats, setStats] = useState<any>(defaultContent.beranda.stats);
  const [aboutPreview, setAboutPreview] = useState<any>(defaultContent.beranda.aboutPreview);
  const [services, setServices] = useState<any>(defaultContent.beranda.services);
  const [cta, setCta] = useState<any>(defaultContent.beranda.cta);

  // State untuk halaman lain
  const [profilHero, setProfilHero] = useState<any>(defaultContent.profil.hero);
  const [profilAbout, setProfilAbout] = useState<any>(defaultContent.profil.about);
  const [profilVision, setProfilVision] = useState<any>(defaultContent.profil.vision);
  const [profilMission, setProfilMission] = useState<any>(defaultContent.profil.mission);
  const [profilValues, setProfilValues] = useState<any>(defaultContent.profil.values);
  const [profilTimeline, setProfilTimeline] = useState<any>(defaultContent.profil.timeline);

  const [tataKelolaHero, setTataKelolaHero] = useState<any>(defaultContent["tata-kelola"].hero);
  const [tataKelolaDireksi, setTataKelolaDireksi] = useState<any>(defaultContent["tata-kelola"].direksi);
  const [tataKelolaKomisaris, setTataKelolaKomisaris] = useState<any>(defaultContent["tata-kelola"].komisaris);

  const [ppidHero, setPpidHero] = useState<any>(defaultContent.ppid.hero);
  const [ppidDocuments, setPpidDocuments] = useState<any>(defaultContent.ppid.documents);
  const [ppidRegulations, setPpidRegulations] = useState<any>(defaultContent.ppid.regulations);
  const [ppidRequestSteps, setPpidRequestSteps] = useState<any>(defaultContent.ppid.requestSteps);

  const [beritaHero, setBeritaHero] = useState<any>(defaultContent.berita.hero);
  const [beritaItems, setBeritaItems] = useState<any>(defaultContent.berita.items);

  const [kontakHero, setKontakHero] = useState<any>(defaultContent.kontak.hero);
  const [kontakInfoCards, setKontakInfoCards] = useState<any>(defaultContent.kontak.infoCards);
  const [kontakMap, setKontakMap] = useState<any>(defaultContent.kontak.map);
  const [kontakForm, setKontakForm] = useState<any>(defaultContent.kontak.form);

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
        const content = defaultsBySlug[slug] as any;
        if (slug === "beranda") {
          setBrand(content.brand || defaultContent.beranda.brand || {});
          setHero(content.hero || {});
          setStats(content.stats || []);
          setAboutPreview(content.aboutPreview || {});
          setServices(content.services || {});
          setCta(content.cta || {});
        } else if (slug === "profil") {
          setProfilHero(content.hero || {});
          setProfilAbout(content.about || {});
          setProfilVision(content.vision || {});
          setProfilMission(content.mission || {});
          setProfilValues(content.values || {});
          setProfilTimeline(content.timeline || {});
        } else if (slug === "tata-kelola") {
          setTataKelolaHero(content.hero || {});
          setTataKelolaDireksi(content.direksi || []);
          setTataKelolaKomisaris(content.komisaris || []);
        } else if (slug === "ppid") {
          setPpidHero(content.hero || {});
          setPpidDocuments(content.documents || []);
          setPpidRegulations(content.regulations || []);
          setPpidRequestSteps(content.requestSteps || []);
        } else if (slug === "berita") {
          setBeritaHero(content.hero || {});
          setBeritaItems(content.items || []);
        } else if (slug === "kontak") {
          setKontakHero(content.hero || {});
          setKontakInfoCards(content.infoCards || []);
          setKontakMap(content.map || {});
          setKontakForm(content.form || {});
        }
        setLastLoadedAt(Date.now());
        return;
      }
      const row = await getPageContent(slug);
      const value = row?.content ?? defaultsBySlug[slug];
      const content = value as any;
      
      if (slug === "beranda") {
        setBrand(content.brand || defaultContent.beranda.brand || {});
        setHero(content.hero || {});
        setStats(content.stats || []);
        setAboutPreview(content.aboutPreview || {});
        setServices(content.services || {});
        setCta(content.cta || {});
      } else if (slug === "profil") {
        setProfilHero(content.hero || {});
        setProfilAbout(content.about || {});
        setProfilVision(content.vision || {});
        setProfilMission(content.mission || {});
        setProfilValues(content.values || {});
        setProfilTimeline(content.timeline || {});
      } else if (slug === "tata-kelola") {
        setTataKelolaHero(content.hero || {});
        setTataKelolaDireksi(content.direksi || []);
        setTataKelolaKomisaris(content.komisaris || []);
      } else if (slug === "ppid") {
        setPpidHero(content.hero || {});
        setPpidDocuments(content.documents || []);
        setPpidRegulations(content.regulations || []);
        setPpidRequestSteps(content.requestSteps || []);
      } else if (slug === "berita") {
        setBeritaHero(content.hero || {});
        setBeritaItems(content.items || []);
      } else if (slug === "kontak") {
        setKontakHero(content.hero || {});
        setKontakInfoCards(content.infoCards || []);
        setKontakMap(content.map || {});
        setKontakForm(content.form || {});
      }
      setLastLoadedAt(Date.now());
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal memuat konten");
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
      let content: any = {};
      
      if (active === "beranda") {
        content = { brand, hero, stats, aboutPreview, services, cta };
      } else if (active === "profil") {
        content = { hero: profilHero, about: profilAbout, vision: profilVision, mission: profilMission, values: profilValues, timeline: profilTimeline };
      } else if (active === "tata-kelola") {
        content = { hero: tataKelolaHero, direksi: tataKelolaDireksi, komisaris: tataKelolaKomisaris };
      } else if (active === "ppid") {
        content = { hero: ppidHero, documents: ppidDocuments, regulations: ppidRegulations, requestSteps: ppidRequestSteps };
      } else if (active === "berita") {
        content = { hero: beritaHero, items: beritaItems };
      } else if (active === "kontak") {
        content = { hero: kontakHero, infoCards: kontakInfoCards, map: kontakMap, form: kontakForm };
      }
      
      await upsertPageContent(active, content);
      toast.success("Tersimpan");
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const onResetToDefault = async () => {
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        const defaults = defaultsBySlug[active] as any;
        if (active === "beranda") {
          setHero(defaults.hero || {});
          setStats(defaults.stats || []);
          setAboutPreview(defaults.aboutPreview || {});
          setServices(defaults.services || {});
          setCta(defaults.cta || {});
        } else if (active === "profil") {
          setProfilHero(defaults.hero || {});
          setProfilAbout(defaults.about || {});
          setProfilVision(defaults.vision || {});
          setProfilMission(defaults.mission || {});
          setProfilValues(defaults.values || {});
          setProfilTimeline(defaults.timeline || {});
        } else if (active === "tata-kelola") {
          setTataKelolaHero(defaults.hero || {});
          setTataKelolaDireksi(defaults.direksi || []);
          setTataKelolaKomisaris(defaults.komisaris || []);
        } else if (active === "ppid") {
          setPpidHero(defaults.hero || {});
          setPpidDocuments(defaults.documents || []);
          setPpidRegulations(defaults.regulations || []);
          setPpidRequestSteps(defaults.requestSteps || []);
        } else if (active === "berita") {
          setBeritaHero(defaults.hero || {});
          setBeritaItems(defaults.items || []);
        } else if (active === "kontak") {
          setKontakHero(defaults.hero || {});
          setKontakInfoCards(defaults.infoCards || []);
          setKontakMap(defaults.map || {});
          setKontakForm(defaults.form || {});
        }
        toast.success("Reset ke default");
        return;
      }
      await deletePageContent(active);
      const defaults = defaultsBySlug[active] as any;
      if (active === "beranda") {
        setBrand(defaults.brand || defaultContent.beranda.brand || {});
        setHero(defaults.hero || {});
        setStats(defaults.stats || []);
        setAboutPreview(defaults.aboutPreview || {});
        setServices(defaults.services || {});
        setCta(defaults.cta || {});
      } else if (active === "profil") {
        setProfilHero(defaults.hero || {});
        setProfilAbout(defaults.about || {});
        setProfilVision(defaults.vision || {});
        setProfilMission(defaults.mission || {});
        setProfilValues(defaults.values || {});
        setProfilTimeline(defaults.timeline || {});
      } else if (active === "tata-kelola") {
        setTataKelolaHero(defaults.hero || {});
        setTataKelolaDireksi(defaults.direksi || []);
        setTataKelolaKomisaris(defaults.komisaris || []);
      } else if (active === "ppid") {
        setPpidHero(defaults.hero || {});
        setPpidDocuments(defaults.documents || []);
        setPpidRegulations(defaults.regulations || []);
        setPpidRequestSteps(defaults.requestSteps || []);
      } else if (active === "berita") {
        setBeritaHero(defaults.hero || {});
        setBeritaItems(defaults.items || []);
      } else if (active === "kontak") {
        setKontakHero(defaults.hero || {});
        setKontakInfoCards(defaults.infoCards || []);
        setKontakMap(defaults.map || {});
        setKontakForm(defaults.form || {});
      }
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

  // Helper untuk update nested state
  const updateHero = (field: string, value: any) => {
    setHero(prev => ({ ...prev, [field]: value }));
  };

  const updateBrand = (field: string, value: any) => {
    setBrand(prev => ({ ...prev, [field]: value }));
  };

  const updateAboutPreview = (field: string, value: any) => {
    setAboutPreview(prev => ({ ...prev, [field]: value }));
  };

  const updateCta = (field: string, value: any) => {
    setCta(prev => ({ ...prev, [field]: value }));
  };

  const updateStats = (index: number, field: string, value: any) => {
    setStats(prev => {
      const newStats = [...(prev || [])];
      newStats[index] = { ...newStats[index], [field]: value };
      return newStats;
    });
  };

  const updateServiceItem = (index: number, field: string, value: any) => {
    setServices(prev => {
      const newItems = [...(prev.items || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  const updateServices = (field: string, value: any) => {
    setServices(prev => ({ ...prev, [field]: value }));
  };

  // Profil helpers
  const updateProfilHero = (field: string, value: any) => {
    setProfilHero(prev => ({ ...prev, [field]: value }));
  };

  const updateProfilAbout = (field: string, value: any) => {
    setProfilAbout(prev => ({ ...prev, [field]: value }));
  };

  const updateProfilVision = (field: string, value: any) => {
    setProfilVision(prev => ({ ...prev, [field]: value }));
  };

  const updateProfilMission = (field: string, value: any) => {
    setProfilMission(prev => ({ ...prev, [field]: value }));
  };

  const updateProfilValues = (field: string, value: any) => {
    setProfilValues(prev => ({ ...prev, [field]: value }));
  };

  const updateProfilTimeline = (index: number, field: string, value: any) => {
    setProfilTimeline(prev => {
      const newItems = [...(prev.items || [])];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, items: newItems };
    });
  };

  // Tata Kelola helpers
  const updateTataKelolaHero = (field: string, value: any) => {
    setTataKelolaHero(prev => ({ ...prev, [field]: value }));
  };

  const updateTataKelolaDireksi = (index: number, field: string, value: any) => {
    setTataKelolaDireksi(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const updateTataKelolaKomisaris = (index: number, field: string, value: any) => {
    setTataKelolaKomisaris(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  // PPID helpers
  const updatePpidHero = (field: string, value: any) => {
    setPpidHero(prev => ({ ...prev, [field]: value }));
  };

  const updatePpidDocuments = (index: number, field: string, value: any) => {
    setPpidDocuments(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const handlePpidDocumentUpload = async (index: number, file: File) => {
    if (!isSupabaseConfigured) {
      toast.error("Supabase belum dikonfigurasi");
      return;
    }

    // Validasi file PDF
    if (file.type !== 'application/pdf') {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    try {
      const fileName = `ppid-documents/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error("Gagal upload file: " + error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      updatePpidDocuments(index, "url", publicUrl);
      updatePpidDocuments(index, "title", file.name.replace('.pdf', ''));
      updatePpidDocuments(index, "size", `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      updatePpidDocuments(index, "date", new Date().toLocaleDateString('id-ID', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
      
      toast.success("File PDF berhasil diupload dan disimpan");
    } catch (err: any) {
      toast.error("Gagal upload: " + err.message);
    }
  };

  const handlePpidRegulationUpload = async (index: number, file: File) => {
    if (!isSupabaseConfigured) {
      toast.error("Supabase belum dikonfigurasi");
      return;
    }

    // Validasi file PDF
    if (file.type !== 'application/pdf') {
      toast.error("Hanya file PDF yang diperbolehkan");
      return;
    }

    // Validasi ukuran file (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    try {
      const fileName = `ppid-regulations/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        toast.error("Gagal upload file: " + error.message);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName);

      updatePpidRegulations(index, "url", publicUrl);
      updatePpidRegulations(index, "title", file.name.replace('.pdf', ''));
      updatePpidRegulations(index, "number", `REG-${Date.now().toString().slice(-4)}`);
      
      toast.success("File PDF berhasil diupload dan disimpan");
    } catch (err: any) {
      toast.error("Gagal upload: " + err.message);
    }
  };

  const updatePpidRegulations = (index: number, field: string, value: any) => {
    setPpidRegulations(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const updatePpidRequestSteps = (index: number, field: string, value: any) => {
    setPpidRequestSteps(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  // Berita helpers
  const updateBeritaHero = (field: string, value: any) => {
    setBeritaHero(prev => ({ ...prev, [field]: value }));
  };

  const updateBeritaItems = (index: number, field: string, value: any) => {
    setBeritaItems(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  // Kontak helpers
  const updateKontakHero = (field: string, value: any) => {
    setKontakHero(prev => ({ ...prev, [field]: value }));
  };

  const updateKontakInfoCards = (index: number, field: string, value: any) => {
    setKontakInfoCards(prev => {
      const newItems = [...prev];
      newItems[index] = { ...newItems[index], [field]: value };
      return newItems;
    });
  };

  const updateKontakMap = (field: string, value: any) => {
    setKontakMap(prev => ({ ...prev, [field]: value }));
  };

  const updateKontakForm = (field: string, value: any) => {
    setKontakForm(prev => ({ ...prev, [field]: value }));
  };

  const handleBrandLogoUpload = async (file: File) => {
    if (!isSupabaseConfigured) {
      toast.error("Supabase belum dikonfigurasi");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Hanya file gambar yang diperbolehkan");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    try {
      const fileName = `logos/${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error || !data) {
        toast.error("Gagal upload logo: " + (error?.message ?? ""));
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("documents").getPublicUrl(fileName);

      updateBrand("logoType", "image");
      updateBrand("logoUrl", publicUrl);

      toast.success("Logo berhasil diupload. Jangan lupa klik Simpan Semua.");
    } catch (err: any) {
      toast.error("Gagal upload logo: " + err.message);
    }
  };

  return (
    <AdminLayout>
      <section className="section-padding bg-card">
        <div className="container">
          <div className="flex items-center justify-between gap-4 mb-6">
            {/* ... (rest of the code remains the same) */}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Konten</h1>
              <p className="text-sm text-muted-foreground">Edit konten halaman dengan form yang mudah dipahami</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={onReload} disabled={loading || sessionLoading}>
                Reload
              </Button>
              <Button variant="destructive" onClick={onResetToDefault} disabled={loading || sessionLoading}>
                Reset ke Default
              </Button>
              <Button variant="accent" onClick={onSave} disabled={loading || sessionLoading}>
                Simpan Semua
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Konten Halaman</CardTitle>
              <CardDescription>
                Terakhir load: {lastLoadedAt ? new Date(lastLoadedAt).toLocaleString("id-ID") : "-"}
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

                {PAGE_SLUGS.map((p) => (
                  <TabsContent key={p.slug} value={p.slug} className="mt-6 space-y-8">
                    {p.slug === "beranda" && (
                      <>
                        {/* Brand / Logo Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Brand / Logo</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Nama PT</Label>
                              <Input
                                value={brand?.companyName || ""}
                                onChange={(e) => updateBrand("companyName", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Singkatan (untuk mobile)</Label>
                              <Input
                                value={brand?.companyAbbreviation || ""}
                                onChange={(e) => updateBrand("companyAbbreviation", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Tagline kecil</Label>
                              <Input
                                value={brand?.companyTagline || ""}
                                onChange={(e) => updateBrand("companyTagline", e.target.value)}
                              />
                            </div>
                            <div>
                              <Label>Alt text logo</Label>
                              <Input
                                value={brand?.logoAlt || ""}
                                onChange={(e) => updateBrand("logoAlt", e.target.value)}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Link logo (URL gambar)</Label>
                              <Input
                                value={brand?.logoUrl || ""}
                                onChange={(e) => {
                                  const url = e.target.value;
                                  updateBrand("logoUrl", url);
                                  updateBrand("logoType", url ? "image" : "icon");
                                }}
                                placeholder="https://contoh.com/logo.png"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Metode 1: Masukkan link gambar logo langsung di sini.
                              </p>
                            </div>
                            <div className="md:col-span-2">
                              <Label>Upload file logo (gambar)</Label>
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) handleBrandLogoUpload(file);
                                }}
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                Metode 2: Upload file logo. Setelah berhasil, sistem akan mengisi URL logo secara otomatis.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Hero Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Hero Section</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Tagline</Label>
                              <Input value={hero?.tagline || ""} onChange={(e) => updateHero("tagline", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading Prefix</Label>
                              <Input value={hero?.headingPrefix || ""} onChange={(e) => updateHero("headingPrefix", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading Highlight</Label>
                              <Input value={hero?.headingHighlight || ""} onChange={(e) => updateHero("headingHighlight", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading Suffix</Label>
                              <Input value={hero?.headingSuffix || ""} onChange={(e) => updateHero("headingSuffix", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={hero?.description || ""} onChange={(e) => updateHero("description", e.target.value)} rows={3} />
                            </div>
                            <div>
                              <Label>Label Tombol Utama</Label>
                              <Input value={hero?.primaryCtaLabel || ""} onChange={(e) => updateHero("primaryCtaLabel", e.target.value)} />
                            </div>
                            <div>
                              <Label>Link Tombol Utama</Label>
                              <Input value={hero?.primaryCtaTo || ""} onChange={(e) => updateHero("primaryCtaTo", e.target.value)} />
                            </div>
                            <div>
                              <Label>Label Tombol Sekunder</Label>
                              <Input value={hero?.secondaryCtaLabel || ""} onChange={(e) => updateHero("secondaryCtaLabel", e.target.value)} />
                            </div>
                            <div>
                              <Label>Link Tombol Sekunder</Label>
                              <Input value={hero?.secondaryCtaTo || ""} onChange={(e) => updateHero("secondaryCtaTo", e.target.value)} />
                            </div>
                          </div>
                        </div>

                        {/* Stats Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Stats Section</h3>
                          <div className="space-y-4">
                            {(stats || []).map((stat: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Nilai</Label>
                                  <Input type="number" value={stat?.value || 0} onChange={(e) => updateStats(index, "value", parseInt(e.target.value) || 0)} />
                                </div>
                                <div>
                                  <Label>Suffix</Label>
                                  <Input value={stat?.suffix || ""} onChange={(e) => updateStats(index, "suffix", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Label</Label>
                                  <Input value={stat?.label || ""} onChange={(e) => updateStats(index, "label", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Sublabel</Label>
                                  <Input value={stat?.sublabel || ""} onChange={(e) => updateStats(index, "sublabel", e.target.value)} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* About Preview Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">About Preview Section</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={aboutPreview?.eyebrow || ""} onChange={(e) => updateAboutPreview("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={aboutPreview?.heading || ""} onChange={(e) => updateAboutPreview("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Paragraf 1</Label>
                              <Textarea value={aboutPreview?.paragraph1 || ""} onChange={(e) => updateAboutPreview("paragraph1", e.target.value)} rows={3} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Paragraf 2</Label>
                              <Textarea value={aboutPreview?.paragraph2 || ""} onChange={(e) => updateAboutPreview("paragraph2", e.target.value)} rows={3} />
                            </div>
                            <div>
                              <Label>Label CTA</Label>
                              <Input value={aboutPreview?.ctaLabel || ""} onChange={(e) => updateAboutPreview("ctaLabel", e.target.value)} />
                            </div>
                            <div>
                              <Label>Link CTA</Label>
                              <Input value={aboutPreview?.ctaTo || ""} onChange={(e) => updateAboutPreview("ctaTo", e.target.value)} />
                            </div>
                          </div>
                        </div>

                        {/* Services Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Services Section</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={services?.eyebrow || ""} onChange={(e) => updateServices("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={services?.heading || ""} onChange={(e) => updateServices("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={services?.description || ""} onChange={(e) => updateServices("description", e.target.value)} rows={3} />
                            </div>
                          </div>
                        </div>

                        {/* CTA Section */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">CTA Section</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={cta?.eyebrow || ""} onChange={(e) => updateCta("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={cta?.heading || ""} onChange={(e) => updateCta("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={cta?.description || ""} onChange={(e) => updateCta("description", e.target.value)} rows={3} />
                            </div>
                            <div>
                              <Label>Label Tombol Utama</Label>
                              <Input value={cta?.primaryCtaLabel || ""} onChange={(e) => updateCta("primaryCtaLabel", e.target.value)} />
                            </div>
                            <div>
                              <Label>Link Tombol Utama</Label>
                              <Input value={cta?.primaryCtaTo || ""} onChange={(e) => updateCta("primaryCtaTo", e.target.value)} />
                            </div>
                            <div>
                              <Label>Label Tombol Sekunder</Label>
                              <Input value={cta?.secondaryCtaLabel || ""} onChange={(e) => updateCta("secondaryCtaLabel", e.target.value)} />
                            </div>
                            <div>
                              <Label>Link Tombol Sekunder</Label>
                              <Input value={cta?.secondaryCtaTo || ""} onChange={(e) => updateCta("secondaryCtaTo", e.target.value)} />
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {p.slug === "profil" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Profil Hero</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Eyebrow</Label>
                            <Input value={profilHero?.eyebrow || ""} onChange={(e) => updateProfilHero("eyebrow", e.target.value)} />
                          </div>
                          <div>
                            <Label>Heading</Label>
                            <Input value={profilHero?.heading || ""} onChange={(e) => updateProfilHero("heading", e.target.value)} />
                          </div>
                        </div>
                      </div>
                    )}

                    {p.slug === "tata-kelola" && (
                      <>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Tata Kelola Hero</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={tataKelolaHero?.eyebrow || ""} onChange={(e) => updateTataKelolaHero("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={tataKelolaHero?.heading || ""} onChange={(e) => updateTataKelolaHero("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={tataKelolaHero?.description || ""} onChange={(e) => updateTataKelolaHero("description", e.target.value)} rows={3} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Direksi</h3>
                          <div className="space-y-4">
                            {(tataKelolaDireksi || []).map((direksi: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Nama</Label>
                                  <Input value={direksi?.name || ""} onChange={(e) => updateTataKelolaDireksi(index, "name", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Posisi</Label>
                                  <Input value={direksi?.position || ""} onChange={(e) => updateTataKelolaDireksi(index, "position", e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                  <Label>Deskripsi</Label>
                                  <Textarea value={direksi?.description || ""} onChange={(e) => updateTataKelolaDireksi(index, "description", e.target.value)} rows={3} />
                                </div>
                                <div>
                                  <Label>Inisial</Label>
                                  <Input value={direksi?.initials || ""} onChange={(e) => updateTataKelolaDireksi(index, "initials", e.target.value)} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Dewan Komisaris</h3>
                          <div className="space-y-4">
                            {(tataKelolaKomisaris || []).map((komisaris: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Nama</Label>
                                  <Input value={komisaris?.name || ""} onChange={(e) => updateTataKelolaKomisaris(index, "name", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Posisi</Label>
                                  <Input value={komisaris?.position || ""} onChange={(e) => updateTataKelolaKomisaris(index, "position", e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                  <Label>Deskripsi</Label>
                                  <Textarea value={komisaris?.description || ""} onChange={(e) => updateTataKelolaKomisaris(index, "description", e.target.value)} rows={3} />
                                </div>
                                <div>
                                  <Label>Inisial</Label>
                                  <Input value={komisaris?.initials || ""} onChange={(e) => updateTataKelolaKomisaris(index, "initials", e.target.value)} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {p.slug === "ppid" && (
                      <>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">PPID Hero</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={ppidHero?.eyebrow || ""} onChange={(e) => updatePpidHero("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={ppidHero?.heading || ""} onChange={(e) => updatePpidHero("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={ppidHero?.description || ""} onChange={(e) => updatePpidHero("description", e.target.value)} rows={3} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Dokumen</h3>
                          <div className="space-y-4">
                            {(ppidDocuments || []).map((doc: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Judul Dokumen</Label>
                                  <Input value={doc?.title || ""} onChange={(e) => updatePpidDocuments(index, "title", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Kategori</Label>
                                  <Input value={doc?.category || ""} onChange={(e) => updatePpidDocuments(index, "category", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Upload PDF</Label>
                                  <Input 
                                    type="file" 
                                    accept=".pdf,application/pdf" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handlePpidDocumentUpload(index, file);
                                    }}
                                  />
                                  {doc?.url && (
                                    <div className="mt-2 space-y-1">
                                      <p className="text-xs text-muted-foreground">
                                        ✅ File tersimpan
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Ukuran: {doc?.size || 'N/A'}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Tanggal: {doc?.date || 'N/A'}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        File: <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Lihat PDF</a>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Regulasi</h3>
                          <div className="space-y-4">
                            {(ppidRegulations || []).map((reg: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Judul Regulasi</Label>
                                  <Input value={reg?.title || ""} onChange={(e) => updatePpidRegulations(index, "title", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Nomor</Label>
                                  <Input value={reg?.number || ""} onChange={(e) => updatePpidRegulations(index, "number", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Upload PDF</Label>
                                  <Input 
                                    type="file" 
                                    accept=".pdf,application/pdf" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) handlePpidRegulationUpload(index, file);
                                    }}
                                  />
                                  {reg?.url && (
                                    <div className="mt-2 space-y-1">
                                      <p className="text-xs text-muted-foreground">
                                        ✅ File tersimpan
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        Nomor: {reg?.number || 'N/A'}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        File: <a href={reg.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Lihat PDF</a>
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Tahapan Permintaan Informasi</h3>
                          <div className="space-y-4">
                            {(ppidRequestSteps || []).map((step: any, index: number) => (
                              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                                <div>
                                  <Label>Judul Tahap</Label>
                                  <Input value={step?.title || ""} onChange={(e) => updatePpidRequestSteps(index, "title", e.target.value)} />
                                </div>
                                <div>
                                  <Label>Deskripsi</Label>
                                  <Textarea value={step?.description || ""} onChange={(e) => updatePpidRequestSteps(index, "description", e.target.value)} rows={3} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {p.slug === "berita" && (
                      <>
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold">Berita Hero</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Eyebrow</Label>
                              <Input value={beritaHero?.eyebrow || ""} onChange={(e) => updateBeritaHero("eyebrow", e.target.value)} />
                            </div>
                            <div>
                              <Label>Heading</Label>
                              <Input value={beritaHero?.heading || ""} onChange={(e) => updateBeritaHero("heading", e.target.value)} />
                            </div>
                            <div className="md:col-span-2">
                              <Label>Deskripsi</Label>
                              <Textarea value={beritaHero?.description || ""} onChange={(e) => updateBeritaHero("description", e.target.value)} rows={3} />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">Daftar Berita</h3>
                            <Button 
                              onClick={() => {
                                const newItem = {
                                  id: Date.now().toString(),
                                  title: "Berita Baru",
                                  excerpt: "Ringkasan berita baru",
                                  date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
                                  category: "Umum",
                                  image: "",
                                  url: ""
                                };
                                setBeritaItems(prev => [...prev, newItem]);
                              }}
                            >
                              Tambah Berita
                            </Button>
                          </div>
                          
                          <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                              <thead className="bg-muted">
                                <tr>
                                  <th className="text-left p-3 text-sm font-medium">Judul Berita</th>
                                  <th className="text-left p-3 text-sm font-medium">Isi Singkat</th>
                                  <th className="text-left p-3 text-sm font-medium">Link Berita</th>
                                  <th className="text-left p-3 text-sm font-medium">Link Gambar</th>
                                  <th className="text-left p-3 text-sm font-medium">Aksi</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(beritaItems || []).map((item: any, index: number) => (
                                  <tr key={item?.id || index} className="border-t">
                                    <td className="p-3">
                                      <Input 
                                        value={item?.title || ""} 
                                        onChange={(e) => updateBeritaItems(index, "title", e.target.value)}
                                        className="w-full"
                                        placeholder="Judul berita"
                                      />
                                    </td>
                                    <td className="p-3">
                                      <Textarea 
                                        value={item?.excerpt || ""} 
                                        onChange={(e) => updateBeritaItems(index, "excerpt", e.target.value)}
                                        className="w-full"
                                        placeholder="Isi singkat berita"
                                        rows={3}
                                      />
                                    </td>
                                    <td className="p-3">
                                      <Input 
                                        value={item?.url || ""} 
                                        onChange={(e) => updateBeritaItems(index, "url", e.target.value)}
                                        className="w-full"
                                        placeholder="https://example.com/berita-lengkap"
                                      />
                                    </td>
                                    <td className="p-3">
                                      <Input 
                                        value={item?.image || ""} 
                                        onChange={(e) => updateBeritaItems(index, "image", e.target.value)}
                                        className="w-full"
                                        placeholder="https://example.com/image.jpg"
                                      />
                                    </td>
                                    <td className="p-3">
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => {
                                          setBeritaItems(prev => prev.filter((_, i) => i !== index));
                                        }}
                                      >
                                        Hapus
                                      </Button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </>
                    )}

                    {p.slug === "kontak" && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Kontak Hero</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Eyebrow</Label>
                            <Input value={kontakHero?.eyebrow || ""} onChange={(e) => updateKontakHero("eyebrow", e.target.value)} />
                          </div>
                          <div>
                            <Label>Heading</Label>
                            <Input value={kontakHero?.heading || ""} onChange={(e) => updateKontakHero("heading", e.target.value)} />
                          </div>
                          <div className="md:col-span-2">
                            <Label>Deskripsi</Label>
                            <Textarea value={kontakHero?.description || ""} onChange={(e) => updateKontakHero("description", e.target.value)} rows={3} />
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminSimple;
