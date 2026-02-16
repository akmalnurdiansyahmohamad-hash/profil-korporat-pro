import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { Target, Eye, Heart, Shield, Award, Lightbulb, Users, Clock } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

const valueIconMap = { Shield, Award, Lightbulb, Users, Heart, Clock } as const;

const Profil = () => {
  const { content } = usePageContent("profil", defaultContent.profil);
  const hero = content.hero;
  const about = content.about;
  const vision = content.vision;
  const mission = content.mission;
  const values = content.values;
  const timeline = content.timeline;

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container">
          <FadeIn>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-3">
              {hero.eyebrow}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              {hero.heading}
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
                  {about.heading}
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
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
                    <h3 className="text-lg font-bold text-foreground">{vision.heading}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {vision.text}
                  </p>
                </div>

                {/* Mission */}
                <div className="p-6 rounded-xl border bg-card corporate-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{mission.heading}</h3>
                  </div>
                  <ul className="space-y-2 text-muted-foreground text-sm leading-relaxed">
                    {mission.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
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
                {values.eyebrow}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {values.heading}
              </h2>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.items.map((value, i) => {
              const Icon = valueIconMap[(value.icon as keyof typeof valueIconMap) ?? "Shield"] ?? Shield;
              return (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="p-6 rounded-xl bg-card border hover:corporate-shadow transition-all duration-300">
                  <div className="h-11 w-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </div>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                {timeline.eyebrow}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                {timeline.heading}
              </h2>
            </div>
          </FadeIn>

          <div className="max-w-2xl mx-auto">
            {timeline.items.map((m, i) => (
              <FadeIn key={m.year} delay={i * 0.08}>
                <div className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-accent">{m.year.slice(2)}</span>
                    </div>
                    {i < timeline.items.length - 1 && (
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
