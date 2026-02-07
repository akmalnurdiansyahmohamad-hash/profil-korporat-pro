import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { FileText, Download, BookOpen, Scale, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const documents = [
  { title: "Laporan Tahunan 2024", category: "Laporan", size: "4.2 MB", date: "15 Januari 2025" },
  { title: "Laporan Keuangan Q3 2024", category: "Keuangan", size: "2.8 MB", date: "20 Oktober 2024" },
  { title: "Laporan Keberlanjutan 2023", category: "CSR", size: "5.1 MB", date: "1 Maret 2024" },
  { title: "Profil Perusahaan 2024", category: "Umum", size: "8.5 MB", date: "10 Februari 2024" },
  { title: "Laporan GCG 2023", category: "Tata Kelola", size: "3.2 MB", date: "28 Februari 2024" },
  { title: "Kode Etik Perusahaan", category: "Kebijakan", size: "1.1 MB", date: "1 Januari 2023" },
];

const regulations = [
  { title: "Kebijakan Anti Korupsi", desc: "Pedoman pencegahan dan penanganan praktik korupsi di lingkungan perusahaan." },
  { title: "Kebijakan Whistleblowing", desc: "Mekanisme pelaporan pelanggaran secara aman dan rahasia." },
  { title: "Kebijakan Manajemen Risiko", desc: "Kerangka kerja identifikasi, analisis, dan mitigasi risiko perusahaan." },
  { title: "Kebijakan Keselamatan Kerja", desc: "Standar K3 yang diterapkan di seluruh proyek dan fasilitas perusahaan." },
];

const PPID = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              Pejabat Pengelola Informasi & Dokumentasi
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              Informasi Publik
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-xl">
              Keterbukaan informasi sebagai wujud komitmen kami terhadap transparansi 
              dan akuntabilitas perusahaan.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Documents */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Dokumen Publik</h2>
                <p className="text-sm text-muted-foreground">Unduh dokumen resmi perusahaan</p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {documents.map((doc, i) => (
              <FadeIn key={doc.title} delay={i * 0.05}>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.category} · {doc.size} · {doc.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-accent">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding section-alt">
        <div className="container">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Regulasi & Kebijakan</h2>
                <p className="text-sm text-muted-foreground">Kebijakan perusahaan yang berlaku</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {regulations.map((reg, i) => (
              <FadeIn key={reg.title} delay={i * 0.1}>
                <div className="p-5 rounded-xl border bg-card">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{reg.title}</h3>
                      <p className="text-sm text-muted-foreground">{reg.desc}</p>
                      <button className="text-xs text-accent font-medium mt-2 flex items-center gap-1 hover:underline">
                        Baca selengkapnya <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Information Request */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Mekanisme Permohonan Informasi
              </h2>
              <p className="text-muted-foreground mb-6">
                Sesuai dengan UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik, 
                masyarakat dapat mengajukan permohonan informasi kepada PPID perusahaan.
              </p>
              <div className="text-left bg-muted/50 rounded-xl p-6 space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-foreground mb-1">1. Mengajukan Permohonan</p>
                  <p className="text-muted-foreground">
                    Kirim surat permohonan informasi melalui email ke ppid@nusantarasejahtera.co.id 
                    atau datang langsung ke kantor pusat.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">2. Verifikasi & Proses</p>
                  <p className="text-muted-foreground">
                    PPID akan memverifikasi dan memproses permohonan dalam waktu 10 hari kerja.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">3. Penyampaian Informasi</p>
                  <p className="text-muted-foreground">
                    Informasi akan disampaikan sesuai format yang diminta melalui media yang disepakati.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default PPID;
