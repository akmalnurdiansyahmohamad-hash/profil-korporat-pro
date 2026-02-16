import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { defaultContent } from "@/content/defaultContent";
import { getPageContent, upsertPageContent } from "@/lib/siteContent";
import { isSupabaseConfigured } from "@/lib/supabaseClient";
import { Loader2 } from "lucide-react";

type ProfilContent = typeof defaultContent.profil;

export function ProfilEditor() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ProfilContent>(defaultContent.profil as unknown as ProfilContent);

  useEffect(() => {
    (async () => {
      try {
        if (!isSupabaseConfigured) {
          setContent(defaultContent.profil as unknown as ProfilContent);
          return;
        }
        const row = await getPageContent("profil");
        if (row?.content && typeof row.content === "object") {
          setContent({ ...defaultContent.profil, ...(row.content as any) } as ProfilContent);
        }
      } catch (err: any) {
        toast.error(err?.message ?? "Gagal memuat konten profil");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updateField = (section: string, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...(prev as any)[section], [field]: value },
    } as any));
  };

  const updateParagraph = (index: number, value: string) => {
    setContent((prev) => {
      const paragraphs = [...(prev as any).about.paragraphs];
      paragraphs[index] = value;
      return { ...prev, about: { ...prev.about, paragraphs } } as any;
    });
  };

  const addParagraph = () => {
    setContent((prev) => {
      const paragraphs = [...(prev as any).about.paragraphs, ""];
      return { ...prev, about: { ...prev.about, paragraphs } } as any;
    });
  };

  const removeParagraph = (index: number) => {
    setContent((prev) => {
      const paragraphs = [...(prev as any).about.paragraphs];
      paragraphs.splice(index, 1);
      return { ...prev, about: { ...prev.about, paragraphs } } as any;
    });
  };

  const updateMissionItem = (index: number, value: string) => {
    setContent((prev) => {
      const items = [...(prev as any).mission.items];
      items[index] = value;
      return { ...prev, mission: { ...prev.mission, items } } as any;
    });
  };

  const addMissionItem = () => {
    setContent((prev) => {
      const items = [...(prev as any).mission.items, ""];
      return { ...prev, mission: { ...prev.mission, items } } as any;
    });
  };

  const removeMissionItem = (index: number) => {
    setContent((prev) => {
      const items = [...(prev as any).mission.items];
      items.splice(index, 1);
      return { ...prev, mission: { ...prev.mission, items } } as any;
    });
  };

  const onSave = async () => {
    if (!isSupabaseConfigured) {
      toast.error("Supabase belum dikonfigurasi.");
      return;
    }
    setSaving(true);
    try {
      await upsertPageContent("profil", content);
      toast.success("Konten profil berhasil disimpan!");
    } catch (err: any) {
      toast.error(err?.message ?? "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const about = (content as any).about;
  const vision = (content as any).vision;
  const mission = (content as any).mission;
  const hero = (content as any).hero;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hero Banner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Eyebrow</label>
            <Input value={hero.eyebrow} onChange={(e) => updateField("hero", "eyebrow", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Heading</label>
            <Input value={hero.heading} onChange={(e) => updateField("hero", "heading", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Tentang */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tentang Perusahaan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Judul</label>
            <Input value={about.heading} onChange={(e) => updateField("about", "heading", e.target.value)} />
          </div>
          {about.paragraphs.map((p: string, i: number) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Paragraf {i + 1}</label>
                {about.paragraphs.length > 1 && (
                  <Button variant="ghost" size="sm" className="text-destructive h-auto p-0 text-xs" onClick={() => removeParagraph(i)}>
                    Hapus
                  </Button>
                )}
              </div>
              <Textarea rows={3} value={p} onChange={(e) => updateParagraph(i, e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addParagraph}>+ Tambah Paragraf</Button>
        </CardContent>
      </Card>

      {/* Visi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Visi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Judul</label>
            <Input value={vision.heading} onChange={(e) => updateField("vision", "heading", e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Teks Visi</label>
            <Textarea rows={3} value={vision.text} onChange={(e) => updateField("vision", "text", e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Misi */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Misi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Judul</label>
            <Input value={mission.heading} onChange={(e) => updateField("mission", "heading", e.target.value)} />
          </div>
          {mission.items.map((item: string, i: number) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Misi {i + 1}</label>
                {mission.items.length > 1 && (
                  <Button variant="ghost" size="sm" className="text-destructive h-auto p-0 text-xs" onClick={() => removeMissionItem(i)}>
                    Hapus
                  </Button>
                )}
              </div>
              <Input value={item} onChange={(e) => updateMissionItem(i, e.target.value)} />
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addMissionItem}>+ Tambah Misi</Button>
        </CardContent>
      </Card>

      {/* Save */}
      <div className="flex gap-3">
        <Button variant="accent" onClick={onSave} disabled={saving}>
          {saving ? "Menyimpan..." : "Simpan Semua Perubahan"}
        </Button>
      </div>
    </div>
  );
}
