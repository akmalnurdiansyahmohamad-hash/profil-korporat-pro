import { ArrowRight, Shield, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";

const highlights = [
  { icon: Shield, title: "Integritas", desc: "Menjalankan bisnis dengan standar etika tertinggi" },
  { icon: Target, title: "Inovasi", desc: "Terus berinovasi untuk solusi terbaik" },
  { icon: Award, title: "Keunggulan", desc: "Berkomitmen pada kualitas dan profesionalisme" },
];

export function AboutPreview() {
  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <FadeIn direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                Tentang Perusahaan
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Mitra Terpercaya dalam Pembangunan Indonesia
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                PT Nusantara Sejahtera Mandiri didirikan pada tahun 1998 dengan visi menjadi perusahaan 
                terkemuka yang berkontribusi nyata dalam pembangunan infrastruktur dan ekonomi Indonesia. 
                Dengan pengalaman lebih dari dua dekade, kami telah menyelesaikan ratusan proyek strategis 
                di seluruh Nusantara.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Didukung oleh tim profesional berpengalaman dan kemitraan strategis berskala nasional 
                maupun internasional, kami terus berkomitmen untuk memberikan layanan terbaik dan 
                berkontribusi pada kemajuan bangsa.
              </p>
              <Button variant="accent" asChild>
                <Link to="/profil">
                  Selengkapnya
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          {/* Right - Highlights */}
          <div className="space-y-5">
            {highlights.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.15} direction="right">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card corporate-shadow">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
