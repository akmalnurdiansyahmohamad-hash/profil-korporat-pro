import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { usePageContent } from "@/hooks/usePageContent";
import { defaultContent } from "@/content/defaultContent";

const iconMap = { MapPin, Phone, Mail, Clock } as const;

const Kontak = () => {
  const { content } = usePageContent("kontak", defaultContent.kontak);
  const hero = content.hero;
  const contactInfo = content.infoCards;
  const formCopy = content.form;
  const map = content.map;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      toast.success(formCopy.successToast);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

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

      {/* Contact Info Cards */}
      <section className="section-padding bg-card">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {contactInfo.map((info, i) => (
              <FadeIn key={info.title} delay={i * 0.1}>
                <div className="p-5 rounded-xl border bg-card hover:corporate-shadow transition-all duration-300 h-full">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    {(() => {
                      const Icon = iconMap[(info.icon as keyof typeof iconMap) ?? "MapPin"] ?? MapPin;
                      return <Icon className="h-5 w-5 text-accent" />;
                    })()}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{info.title}</h3>
                  {info.lines.map((line, j) => (
                    <p key={j} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-10">
            <FadeIn direction="left">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{formCopy.heading}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {formCopy.subheading}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Nama Lengkap *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Email *
                      </label>
                      <Input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contoh@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        No. Telepon
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08xx-xxxx-xxxx"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1.5 block">
                        Subjek *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Subjek pesan"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Pesan *
                    </label>
                    <Textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tuliskan pesan Anda..."
                    />
                  </div>
                  <Button variant="accent" size="lg" type="submit" disabled={loading}>
                    {loading ? formCopy.sendingLabel : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {formCopy.submitLabel}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{map.heading}</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {map.description}
                </p>
                <div className="rounded-xl overflow-hidden border h-[400px] lg:h-[calc(100%-4rem)]">
                  <iframe
                    src={map.iframeSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={map.iframeTitle}
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Kontak;
