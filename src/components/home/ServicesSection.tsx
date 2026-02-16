import { Building, Zap, Home, Monitor } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

const iconMap = { Building, Zap, Home, Monitor } as const;

export function ServicesSection() {
  const { content } = usePageContent("beranda", defaultContent.beranda);
  const services = content.services;

  return (
    <section className="section-padding bg-card">
      <div className="container">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
              {services.eyebrow}
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {services.heading}
            </h2>
            <p className="text-muted-foreground">
              {services.description}
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.items.map((service, i) => {
            const Icon = iconMap[(service.icon as keyof typeof iconMap) ?? "Building"] ?? Building;
            return (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="group p-6 rounded-xl border bg-card hover:corporate-shadow transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
