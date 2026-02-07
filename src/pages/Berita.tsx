import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
}

const newsData: NewsItem[] = [
  {
    id: "1",
    title: "NSM Resmikan Proyek Jalan Tol Trans-Kalimantan Segmen III",
    excerpt: "PT Nusantara Sejahtera Mandiri meresmikan pembangunan segmen ketiga jalan tol Trans-Kalimantan yang menghubungkan Pontianak dengan Sintang sepanjang 120 km.",
    date: "28 Januari 2025",
    category: "Infrastruktur",
  },
  {
    id: "2",
    title: "Laporan Keuangan Q3 2024: Pertumbuhan Revenue 18%",
    excerpt: "Perseroan mencatatkan pertumbuhan pendapatan sebesar 18% year-on-year pada kuartal ketiga 2024, didorong oleh penyelesaian proyek infrastruktur dan properti.",
    date: "20 Oktober 2024",
    category: "Keuangan",
  },
  {
    id: "3",
    title: "NSM Raih Penghargaan Best Corporate Governance 2024",
    excerpt: "PT Nusantara Sejahtera Mandiri meraih penghargaan Best Corporate Governance dalam ajang Indonesia Corporate Governance Award 2024.",
    date: "15 September 2024",
    category: "Penghargaan",
  },
  {
    id: "4",
    title: "Kerja Sama Strategis dengan JICA untuk Proyek Energi Terbarukan",
    excerpt: "NSM menandatangani MoU dengan Japan International Cooperation Agency (JICA) untuk pengembangan proyek pembangkit listrik tenaga surya di Nusa Tenggara.",
    date: "5 Agustus 2024",
    category: "Energi",
  },
  {
    id: "5",
    title: "Program CSR: Beasiswa untuk 500 Mahasiswa Teknik",
    excerpt: "Melalui program Nusantara Cerdas, perusahaan memberikan beasiswa penuh kepada 500 mahasiswa teknik dari berbagai universitas di Indonesia.",
    date: "20 Juli 2024",
    category: "CSR",
  },
  {
    id: "6",
    title: "Peluncuran Smart Building Management System",
    excerpt: "Divisi Teknologi Informasi NSM meluncurkan sistem manajemen gedung pintar berbasis IoT yang telah diimplementasikan di 12 properti komersial.",
    date: "10 Juni 2024",
    category: "Teknologi",
  },
];

const categoryColors: Record<string, string> = {
  Infrastruktur: "bg-accent/10 text-accent",
  Keuangan: "bg-corporate-gold/10 text-corporate-gold-foreground",
  Penghargaan: "bg-accent/10 text-accent",
  Energi: "bg-green-100 text-green-700",
  CSR: "bg-accent/10 text-accent",
  Teknologi: "bg-accent/10 text-accent",
};

const Berita = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              Berita & Publikasi
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              Kabar Terbaru
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-xl">
              Ikuti perkembangan terbaru dan publikasi resmi dari PT Nusantara Sejahtera Mandiri.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="rounded-2xl border overflow-hidden bg-card corporate-shadow mb-12">
              <div className="grid lg:grid-cols-2">
                <div className="bg-primary/5 p-8 lg:p-12 flex items-center justify-center min-h-[250px]">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground">Berita Utama</p>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium mb-3 ${categoryColors[newsData[0].category]}`}>
                    {newsData[0].category}
                  </span>
                  <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    {newsData[0].title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {newsData[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {newsData[0].date}
                    </p>
                    <button className="text-sm text-accent font-medium flex items-center gap-1 hover:underline">
                      Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* News Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.slice(1).map((news, i) => (
              <FadeIn key={news.id} delay={i * 0.08}>
                <article className="rounded-xl border bg-card overflow-hidden hover:corporate-shadow transition-all duration-300 group">
                  <div className="bg-primary/5 h-40 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-muted-foreground/30" />
                  </div>
                  <div className="p-5">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[news.category] || "bg-muted text-muted-foreground"}`}>
                      {news.category}
                    </span>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{news.excerpt}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {news.date}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Berita;
