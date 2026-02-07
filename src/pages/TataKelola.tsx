import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";

interface BoardMember {
  name: string;
  position: string;
  description: string;
  initials: string;
}

const direksi: BoardMember[] = [
  {
    name: "Ahmad Surya Wijaya",
    position: "Direktur Utama",
    description: "Memimpin perseroan sejak 2018 dengan pengalaman lebih dari 25 tahun di industri infrastruktur dan energi. Lulusan S2 Teknik Sipil dari ITB dan MBA dari Universitas Indonesia.",
    initials: "AS",
  },
  {
    name: "Sri Mulyani Rahayu",
    position: "Direktur Keuangan",
    description: "Bertanggung jawab atas pengelolaan keuangan perusahaan. Berpengalaman 20 tahun di bidang keuangan korporasi. Lulusan S2 Akuntansi dari Universitas Gadjah Mada.",
    initials: "SM",
  },
  {
    name: "Bambang Prasetyo",
    position: "Direktur Operasional",
    description: "Mengawasi seluruh operasional proyek di empat divisi utama. Berpengalaman dalam manajemen proyek berskala besar. Lulusan S2 Manajemen Konstruksi dari ITS.",
    initials: "BP",
  },
  {
    name: "Ratna Dewi Kusuma",
    position: "Direktur SDM & Umum",
    description: "Memimpin pengembangan sumber daya manusia dan tata kelola perusahaan. Berpengalaman 18 tahun di bidang HR. Lulusan S2 Psikologi Industri dari UI.",
    initials: "RD",
  },
];

const komisaris: BoardMember[] = [
  {
    name: "Prof. Dr. Hartono Subroto",
    position: "Komisaris Utama",
    description: "Akademisi dan praktisi berpengalaman di bidang teknik sipil dan infrastruktur. Guru Besar di Universitas Indonesia dengan berbagai penghargaan nasional.",
    initials: "HS",
  },
  {
    name: "Dr. Siti Nurhaliza",
    position: "Komisaris",
    description: "Pakar ekonomi pembangunan dengan pengalaman luas di sektor publik dan swasta. Mantan pejabat di Kementerian Pekerjaan Umum dan Perumahan Rakyat.",
    initials: "SN",
  },
  {
    name: "Ir. Budi Santoso",
    position: "Komisaris Independen",
    description: "Profesional independen dengan keahlian di bidang tata kelola perusahaan dan audit. Berpengalaman 30 tahun di industri keuangan dan infrastruktur.",
    initials: "BS",
  },
];

function MemberCard({ member }: { member: BoardMember }) {
  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:corporate-shadow transition-all duration-300">
      {/* Avatar */}
      <div className="bg-primary/5 py-8 flex items-center justify-center">
        <div className="h-24 w-24 rounded-full bg-primary flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground">{member.initials}</span>
        </div>
      </div>
      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-foreground mb-0.5">{member.name}</h3>
        <p className="text-sm font-medium text-accent mb-3">{member.position}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{member.description}</p>
      </div>
    </div>
  );
}

const TataKelola = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              Good Corporate Governance
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              Tata Kelola Perusahaan
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-xl">
              Kami berkomitmen menerapkan prinsip-prinsip tata kelola perusahaan yang baik 
              demi transparansi, akuntabilitas, dan keberlanjutan.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Direksi */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                Dewan Direksi
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Jajaran Direksi</h2>
              <p className="text-muted-foreground mt-3">
                Para pemimpin yang menjalankan operasional perusahaan sehari-hari dengan visi dan integritas.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {direksi.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Komisaris */}
      <section className="section-padding section-alt">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                Dewan Komisaris
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Jajaran Komisaris</h2>
              <p className="text-muted-foreground mt-3">
                Para pengawas yang memastikan perusahaan berjalan sesuai prinsip tata kelola yang baik.
              </p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {komisaris.map((member, i) => (
              <FadeIn key={member.name} delay={i * 0.1}>
                <MemberCard member={member} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TataKelola;
