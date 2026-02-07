import { Building, Zap, Home, Monitor } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

const services = [
  {
    icon: Building,
    title: "Infrastruktur",
    desc: "Pembangunan jalan, jembatan, pelabuhan, dan infrastruktur publik berskala besar di seluruh Indonesia.",
  },
  {
    icon: Zap,
    title: "Energi & Sumber Daya",
    desc: "Pengembangan proyek energi terbarukan dan pengelolaan sumber daya alam yang berkelanjutan.",
  },
  {
    icon: Home,
    title: "Properti & Real Estate",
    desc: "Pengembangan kawasan hunian, komersial, dan industri dengan standar kualitas tinggi.",
  },
  {
    icon: Monitor,
    title: "Teknologi Informasi",
    desc: "Solusi digital dan transformasi teknologi untuk mendukung efisiensi bisnis dan layanan publik.",
  },
];

export function ServicesSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
              Bidang Usaha
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Layanan Unggulan Kami
            </h2>
            <p className="text-muted-foreground">
              Kami beroperasi di empat sektor strategis yang saling mendukung untuk memberikan 
              solusi komprehensif bagi kemajuan Indonesia.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 0.1}>
              <div className="group p-6 rounded-xl border bg-card hover:corporate-shadow transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
