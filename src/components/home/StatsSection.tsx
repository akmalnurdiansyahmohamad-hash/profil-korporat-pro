import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Calendar, Briefcase, Users, Handshake } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return { count, ref };
}

const stats = [
  { icon: Calendar, value: 27, suffix: "+", label: "Tahun Pengalaman", sublabel: "Berdiri sejak 1998" },
  { icon: Briefcase, value: 500, suffix: "+", label: "Proyek Selesai", sublabel: "Di seluruh Indonesia" },
  { icon: Users, value: 2500, suffix: "+", label: "Karyawan", sublabel: "Profesional berpengalaman" },
  { icon: Handshake, value: 150, suffix: "+", label: "Mitra Strategis", sublabel: "Dalam & luar negeri" },
];

export function StatsSection() {
  return (
    <section className="section-padding bg-card">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const { count, ref } = useCounter(stat.value);
            return (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <div ref={ref} className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent/10 mb-4">
                    <stat.icon className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-3xl lg:text-4xl font-bold text-foreground">
                    {count.toLocaleString("id-ID")}
                    <span className="text-accent">{stat.suffix}</span>
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
