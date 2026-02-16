import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { Calendar, ArrowRight } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  url?: string;
}

const categoryColors: Record<string, string> = {
  Infrastruktur: "bg-accent/10 text-accent",
  Keuangan: "bg-corporate-gold/10 text-corporate-gold-foreground",
  Penghargaan: "bg-accent/10 text-accent",
  Energi: "bg-green-100 text-green-700",
  CSR: "bg-accent/10 text-accent",
  Teknologi: "bg-accent/10 text-accent",
};

const Berita = () => {
  const { content } = usePageContent("berita", defaultContent.berita);
  const hero = content.hero;
  const newsData = (content.items ?? []) as NewsItem[];
  const featured = newsData[0];

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

      {/* Featured */}
      <section className="section-padding bg-card">
        <div className="container">
          {featured && (
            <FadeIn>
              <div className="rounded-2xl border overflow-hidden bg-card corporate-shadow mb-12">
                <div className="grid lg:grid-cols-1">
                  <div className="relative">
                    {featured.image ? (
                      <img 
                        src={featured.image} 
                        alt={featured.title}
                        className="w-full h-64 md:h-96 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 md:h-96 bg-primary/5 flex items-center justify-center">
                        <div className="text-center">
                          <div className="h-16 w-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-8 w-8 text-accent" />
                          </div>
                          <p className="text-sm text-muted-foreground">Berita Utama</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="max-w-4xl mx-auto">
                        <span
                          className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                            categoryColors[featured.category] || "bg-muted text-muted-foreground"
                          }`}
                        >
                          {featured.category}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{featured.title}</h2>
                        <p className="text-white/90 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-white/80 flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {featured.date}
                          </p>
                          <button 
                            className="text-sm text-white font-medium flex items-center gap-1 hover:underline bg-accent px-4 py-2 rounded-lg"
                            onClick={() => {
                              if (featured.url) {
                                window.open(featured.url, '_blank');
                              }
                            }}
                          >
                            Baca selengkapnya <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          )}

          {/* News Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.slice(featured ? 1 : 0).map((news, i) => (
              <FadeIn key={news.id} delay={i * 0.08}>
                <article className="rounded-xl border bg-card overflow-hidden hover:corporate-shadow transition-all duration-300 group">
                  <div className="relative mb-4">
                    {news.image ? (
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-primary/5 flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[news.category] || "bg-muted text-muted-foreground"}`}>
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 bg-red-50">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{news.excerpt}</p>
                    <div className="mt-4">
                      <button 
                        className="text-sm text-accent font-medium flex items-center gap-1 hover:underline w-full justify-center py-2 px-4 rounded-lg bg-accent text-white"
                        onClick={() => {
                          if (news.url) {
                            window.open(news.url, '_blank');
                          }
                        }}
                      >
                        Baca selengkapnya <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Berita;
