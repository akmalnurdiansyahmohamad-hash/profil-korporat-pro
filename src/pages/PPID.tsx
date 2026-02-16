import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { FileText, Download, BookOpen, Scale, HelpCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

const PPID = () => {
  const { content } = usePageContent("ppid", defaultContent.ppid);
  const hero = content.hero;
  const documents = content.documents;
  const regulations = content.regulations;

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

      {/* Documents */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{content.documentsHeading}</h2>
                <p className="text-sm text-muted-foreground">{content.documentsSubheading}</p>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-3">
            {documents.map((doc, i) => (
              <FadeIn key={doc.title} delay={i * 0.05}>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.category} · {doc.size} · {doc.date}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent"
                    onClick={() => window.open(doc.url, '_blank')}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Regulations */}
      <section className="section-padding section-alt">
        <div className="container">
          <FadeIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{content.regulationsHeading}</h2>
                <p className="text-sm text-muted-foreground">{content.regulationsSubheading}</p>
              </div>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-5">
            {regulations.map((reg, i) => (
              <FadeIn key={reg.title} delay={i * 0.1}>
                <div className="p-5 rounded-xl border bg-card">
                  <div className="flex items-start gap-3">
                    <BookOpen className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{reg.title}</h3>
                      <p className="text-sm text-muted-foreground">{reg.desc}</p>
                      <button 
                      className="text-xs text-accent font-medium mt-2 flex items-center gap-1 hover:underline"
                      onClick={() => window.open(reg.url, '_blank')}
                    >
                        Baca selengkapnya <ExternalLink className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Information Request */}
      <section className="section-padding bg-card">
        <div className="container">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="h-7 w-7 text-accent" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                {content.requestHeading}
              </h2>
              <p className="text-muted-foreground mb-6">
                {content.requestDescription}
              </p>
              <div className="text-left bg-muted/50 rounded-xl p-6 space-y-4 text-sm">
                {content.requestSteps.map((step, i) => (
                  <div key={i}>
                    <p className="font-semibold text-foreground mb-1">{step.title}</p>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
};

export default PPID;
