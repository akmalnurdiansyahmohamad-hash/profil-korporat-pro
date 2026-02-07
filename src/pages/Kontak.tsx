import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { FadeIn } from "@/components/animations/FadeIn";
import { MapPin, Mail, Phone, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Alamat Kantor",
    lines: ["Jl. Jend. Sudirman Kav. 52-53", "Gedung NSM Tower, Lantai 25-30", "Jakarta Selatan 12190"],
  },
  {
    icon: Phone,
    title: "Telepon",
    lines: ["(021) 5150-1234", "(021) 5150-5678 (Fax)"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@nusantarasejahtera.co.id", "ppid@nusantarasejahtera.co.id"],
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    lines: ["Senin - Jumat: 08.00 - 17.00 WIB", "Sabtu - Minggu: Tutup"],
  },
];

const Kontak = () => {
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
      toast.success("Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.");
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
              Hubungi Kami
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground max-w-3xl">
              Kami Siap Membantu Anda
            </h1>
            <p className="text-primary-foreground/70 mt-4 max-w-xl">
              Silakan hubungi kami untuk pertanyaan, kerja sama, atau informasi lebih lanjut 
              mengenai layanan perusahaan.
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
                    <info.icon className="h-5 w-5 text-accent" />
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
                <h2 className="text-2xl font-bold text-foreground mb-2">Kirim Pesan</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Isi formulir di bawah ini dan kami akan merespons dalam 1-2 hari kerja.
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
                    {loading ? "Mengirim..." : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Kirim Pesan
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Lokasi Kami</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  Kunjungi kantor pusat kami di jantung kawasan bisnis Jakarta.
                </p>
                <div className="rounded-xl overflow-hidden border h-[400px] lg:h-[calc(100%-4rem)]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMzAuMCJTIDEwNsKwNDgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi PT Nusantara Sejahtera Mandiri"
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
