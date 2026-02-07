import { Link } from "react-router-dom";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { label: "Tentang Kami", path: "/profil" },
  { label: "Tata Kelola", path: "/tata-kelola" },
  { label: "Berita", path: "/berita" },
  { label: "PPID", path: "/ppid" },
  { label: "Kontak", path: "/kontak" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="h-9 w-9 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-bold text-base leading-tight">PT Nusantara Sejahtera</p>
                <p className="text-[10px] tracking-widest uppercase opacity-70">Mandiri</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-80 max-w-md">
              Perusahaan terkemuka di Indonesia yang bergerak di bidang infrastruktur, energi, 
              properti, dan teknologi informasi. Berdiri sejak 1998 dengan komitmen membangun 
              Indonesia yang lebih maju.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 gold-accent">
              Tautan Cepat
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 gold-accent">
              Hubungi Kami
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm opacity-80">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-80">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(021) 5150-1234</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm opacity-80">
                <Mail className="h-4 w-4 shrink-0" />
                <span>info@nusantarasejahtera.co.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs opacity-60">
            © {new Date().getFullYear()} PT Nusantara Sejahtera Mandiri. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/ppid" className="text-xs opacity-60 hover:opacity-100 transition-opacity">
              Kebijakan Privasi
            </Link>
            <Link to="/ppid" className="text-xs opacity-60 hover:opacity-100 transition-opacity">
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
