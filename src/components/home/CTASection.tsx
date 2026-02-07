import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";

export function CTASection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 20% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(43 96% 56% / 0.2) 0%, transparent 50%)",
      }} />

      <div className="container relative z-10 text-center">
        <FadeIn>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] gold-accent mb-4">
            Siap Bermitra?
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 max-w-2xl mx-auto">
            Mari Wujudkan Proyek Anda Bersama Kami
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Hubungi tim kami untuk konsultasi dan kolaborasi. Kami siap memberikan solusi 
            terbaik untuk kebutuhan bisnis Anda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/kontak">
                Hubungi Kami
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/profil">Pelajari Lebih Lanjut</Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
