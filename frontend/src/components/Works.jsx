import React from "react";
import { useReveal } from "../hooks/useReveal";
import { PROJECTS } from "../data/content";

function ProjectRow({ project, index }) {
  const [ref, visible] = useReveal(0.1);
  const reversed = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 lg:gap-12 items-center py-10 border-b border-void-700 last:border-b-0 section-reveal ${visible ? "visible" : ""}`}
    >
      <div className={`flex-1 ${reversed ? "md:text-right" : ""}`}>
        <div className="eyebrow text-teal-400 mb-3">{project.tag}</div>
        <h3 className="font-display text-2xl text-ink-100 mb-4">
          {project.title}
        </h3>

        <div
          className={`space-y-2.5 mb-5 ${reversed ? "md:ml-auto" : ""}`}
          style={{ maxWidth: "440px" }}
        >
          <p className="text-sm text-ink-700 leading-relaxed">
            <span className="text-ink-500 font-medium">Problem — </span>
            {project.problem}
          </p>
          <p className="text-sm text-ink-300 leading-relaxed">
            <span className="text-violet-400 font-medium">Built — </span>
            {project.built}
          </p>
          <p className="text-sm text-teal-300/90 leading-relaxed">
            <span className="text-teal-400 font-medium">Result — </span>
            {project.result}
          </p>
        </div>

        <div
          className={`flex flex-wrap gap-2 ${reversed ? "md:justify-end" : ""}`}
        >
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[11px] text-ink-700 border border-void-700 rounded-full px-3 py-1"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="relative w-full md:w-[420px] lg:w-[480px] flex-shrink-0 group">
        <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-violet-500/20 via-teal-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500 pointer-events-none" />
        <div className="relative rounded-xl overflow-hidden border border-void-700 group-hover:border-violet-500/30 transition-colors duration-500">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

export default function Works() {
  const [headRef, headVisible] = useReveal();

  return (
    <section id="works" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div
          ref={headRef}
          className={`section-reveal ${headVisible ? "visible" : ""} mb-4`}
        >
          <div
            className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Things I've shipped
          </div>
          <h2
            className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-2 transition-all duration-700 delay-100 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Works
          </h2>
          <p
            className={`text-ink-700 text-sm transition-all duration-700 delay-200 ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
          >
            Production systems, not side projects.
          </p>
        </div>

        <div className="mt-8">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
