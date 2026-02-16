import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

interface BoardMember {
  name: string;
  position: string;
  description: string;
  initials: string;
}

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
  const { content } = usePageContent("tata-kelola", defaultContent["tata-kelola"]);
  const hero = content.hero;
  const direksi = (content.direksi ?? []) as BoardMember[];
  const komisaris = (content.komisaris ?? []) as BoardMember[];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              {hero.eyebrow}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              {hero.heading}
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-xl">
              {hero.description}
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
