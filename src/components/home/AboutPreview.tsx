import { ArrowRight, Shield, Target, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/FadeIn";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

const highlightIcons = [Shield, Target, Award];

export function AboutPreview() {
  const { content } = usePageContent("beranda", defaultContent.beranda);
  const about = content.aboutPreview;

  return (
    <section className="section-padding section-alt">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <FadeIn direction="left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-accent mb-3">
                {about.eyebrow}
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                {about.heading}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {about.paragraph1}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {about.paragraph2}
              </p>
              <Button variant="accent" asChild>
                <Link to={about.ctaTo}>
                  {about.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          {/* Right - Highlights */}
          <div className="space-y-5">
            {about.highlights.map((item, i) => {
              const Icon = highlightIcons[i % highlightIcons.length];
              return (
              <FadeIn key={item.title} delay={i * 0.15} direction="right">
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card corporate-shadow">
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
