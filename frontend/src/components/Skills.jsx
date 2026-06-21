import React from "react";
import * as Icons from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { SKILLS_ROW_1, SKILLS_ROW_2 } from "../data/content";

function MarqueeRow({ items, direction = "left" }) {
  const doubled = [...items, ...items];
  const animClass =
    direction === "left" ? "animate-scroll-left" : "animate-scroll-right";

  return (
    <div className="marquee-row overflow-hidden marquee-mask mb-3.5">
      <div className={`marquee-track ${animClass}`}>
        {doubled.map((item, i) => {
          const Icon = Icons[item.icon] || Icons.Code2;
          return (
            <span
              key={`${item.name}-${i}`}
              className="skill-chip flex items-center gap-2 px-4 py-2.5 rounded-full text-sm text-ink-100 whitespace-nowrap"
            >
              <Icon size={15} className="text-violet-400" />
              {item.name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useReveal();

  return (
    <section id="skills" className="py-24">
      <div ref={ref} className="max-w-6xl mx-auto px-6 mb-10">
        <div
          className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          What I reach for
        </div>
        <h2
          className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Skills
        </h2>
        <p
          className={`text-ink-700 text-sm font-mono transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          hover any chip to pause
        </p>
      </div>

      <div
        className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <MarqueeRow items={SKILLS_ROW_1} direction="left" />
        <MarqueeRow items={SKILLS_ROW_2} direction="right" />
      </div>
    </section>
  );
}
