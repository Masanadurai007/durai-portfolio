import React from "react";
import { Bot, Search, Layers, Server } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { SERVICES } from "../data/content";

const ICONS = { A: Bot, B: Search, C: Layers, D: Server };
const ACCENTS = {
  A: { color: "#7C5CFF", glow: "rgba(124,92,255,0.15)" },
  B: { color: "#33E0C7", glow: "rgba(51,224,199,0.15)" },
  C: { color: "#9B85FF", glow: "rgba(155,133,255,0.15)" },
  D: { color: "#5FEBD4", glow: "rgba(95,235,212,0.15)" },
};

export default function Services() {
  const [ref, visible] = useReveal();

  return (
    <section id="services" className="py-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          What I can build for you
        </div>
        <h2
          className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Services
        </h2>

        <div className="grid sm:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.letter] || Bot;
            const accent = ACCENTS[s.letter] || ACCENTS.A;
            return (
              <div
                key={s.letter}
                className={`group relative rounded-xl p-6 border border-void-700 bg-void-900/60 overflow-hidden transition-all duration-700 hover:-translate-y-1.5 hover:border-white/10 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${200 + i * 120}ms` }}
              >
                <div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: accent.glow }}
                />

                <div className="relative flex items-start justify-between mb-5">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: accent.glow, color: accent.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="font-mono text-xs text-ink-700">
                    {s.letter}
                  </span>
                </div>

                <h3 className="relative font-display text-xl text-ink-100 mb-2">
                  {s.title}
                </h3>
                <p className="relative text-ink-500 text-sm leading-relaxed mb-5">
                  {s.description}
                </p>

                <span
                  className="relative font-mono text-[11px] inline-block px-2.5 py-1 rounded-full border"
                  style={{
                    borderColor: `${accent.color}33`,
                    color: accent.color,
                  }}
                >
                  {s.tags}
                </span>

                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, ${accent.color}, transparent)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
