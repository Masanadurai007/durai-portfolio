import React from "react";
import { useReveal } from "../hooks/useReveal";
import { EXPERIENCE, ACHIEVEMENTS } from "../data/content";

export default function Experience() {
  const [ref, visible] = useReveal();

  return (
    <section id="experience" className="py-24 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <div
          className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          The path so far
        </div>
        <h2
          className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Experience
        </h2>

        <div className="relative pl-7 mb-16">
          <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px timeline-line" />
          {EXPERIENCE.map((exp, i) => (
            <div
              key={exp.title}
              className={`relative mb-10 last:mb-0 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span
                className="absolute -left-7 top-1.5 w-2.5 h-2.5 rounded-full"
                style={{ background: exp.accent }}
              />
              <div className="eyebrow mb-1.5" style={{ color: exp.accent }}>
                {exp.period}
              </div>
              <h3 className="font-display text-lg text-ink-100 mb-2">
                {exp.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed max-w-lg">
                {exp.description}
              </p>
            </div>
          ))}
        </div>

        <div className="divider mb-12" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={a.label}
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${600 + i * 100}ms` }}
            >
              <div
                className="font-display text-3xl mb-1.5"
                style={{ color: a.accent }}
              >
                {a.value}
              </div>
              <div className="font-mono text-[10px] text-ink-700 uppercase tracking-wide">
                {a.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
