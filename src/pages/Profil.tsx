import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { Target, Eye, Heart, Shield, Award, Lightbulb, Users, Clock } from "lucide-react";

const values = [
  { icon: Shield, title: "Integritas", desc: "Menjunjung tinggi kejujuran dan etika dalam setiap aspek bisnis." },
  { icon: Award, title: "Profesionalisme", desc: "Bekerja dengan standar tertinggi dan komitmen pada kualitas." },
  { icon: Lightbulb, title: "Inovasi", desc: "Terus berinovasi untuk menciptakan solusi yang lebih baik." },
  { icon: Users, title: "Kolaborasi", desc: "Membangun kemitraan strategis yang saling menguntungkan." },
  { icon: Heart, title: "Tanggung Jawab Sosial", desc: "Berkontribusi positif bagi masyarakat dan lingkungan." },
  { icon: Clock, title: "Keberlanjutan", desc: "Menjalankan bisnis yang berkelanjutan untuk generasi mendatang." },
];

const milestones = [
  { year: "1998", event: "Didirikan di Jakarta sebagai perusahaan konsultan teknik." },
  { year: "2003", event: "Memperluas bisnis ke sektor infrastruktur dan mendapat proyek pemerintah pertama." },
  { year: "2008", event: "Membuka divisi energi dan sumber daya alam." },
  { year: "2012", event: "Ekspansi ke sektor properti dan real estate." },
  { year: "2016", event: "Meluncurkan divisi teknologi informasi dan transformasi digital." },
  { year: "2020", event: "Mencapai 2.000+ karyawan dan 400+ proyek selesai." },
  { year: "2024", event: "Menjadi salah satu perusahaan infrastruktur terkemuka di Indonesia." },
];

const Profil = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              Profil Perusahaan
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              Membangun Indonesia dengan Dedikasi dan Profesionalisme
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* About */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                  Tentang PT Nusantara Sejahtera Mandiri
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    PT Nusantara Sejahtera Mandiri (NSM) adalah perusahaan multisektor yang didirikan pada 
                    tahun 1998 di Jakarta. Berawal dari sebuah perusahaan konsultan teknik kecil, NSM telah 
                    berkembang menjadi salah satu perusahaan infrastruktur dan pengembangan terkemuka di Indonesia.
                  </p>
                  <p>
                    Dengan portofolio yang mencakup lebih dari 500 proyek di seluruh Nusantara, kami telah 
                    membuktikan komitmen kami dalam pembangunan infrastruktur yang berkualitas tinggi. Didukung 
                    oleh lebih dari 2.500 tenaga profesional berpengalaman, kami terus memperluas jangkauan 
                    dan meningkatkan kapabilitas.
                  </p>
                  <p>
                    Kami percaya bahwa infrastruktur yang berkualitas adalah fondasi kemajuan bangsa. Itulah 
                    mengapa setiap proyek yang kami kerjakan selalu mengutamakan kualitas, keberlanjutan, 
                    dan manfaat bagi masyarakat luas.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div className="space-y-6">
                {/* Vision */}
                <div className="p-6 rounded-xl border bg-card corporate-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Eye className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Visi</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Menjadi perusahaan infrastruktur dan pengembangan terkemuka di Asia Tenggara yang 
                    berkontribusi nyata dalam pembangunan berkelanjutan dan kesejahteraan masyarakat.
                  </p>
                </div>

                {/* Mission */}
                <div className="p-6 rounded-xl border bg-card corporate-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">Misi</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Menyediakan layanan infrastruktur berkualitas tinggi dengan standar internasional.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Mengembangkan sumber daya manusia yang kompeten dan berintegritas.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Menerapkan tata kelola perusahaan yang baik (Good Corporate Governance).
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Berkontribusi pada pembangunan berkelanjutan dan tanggung jawab sosial.
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding section-alt">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                Nilai-Nilai Perusahaan
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Prinsip yang Kami Pegang Teguh
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="p-6 rounded-xl bg-card border hover:corporate-shadow transition-all duration-300">
                  <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                Sejarah Perusahaan
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Perjalanan Kami
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            {milestones.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">{m.year.slice(2)}</span>
                    </div>
                    {i < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pt-1.5 pb-4">
                    <p className="text-sm font-bold text-accent mb-1">{m.year}</p>
                    <p className="text-sm text-muted-foreground">{m.event}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profil;
