import React, { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { PROFILE } from "../data/content";

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = PROFILE.roles[roleIdx];
    let timeout;
    if (!deleting) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          65,
        );
      } else {
        timeout = setTimeout(() => setDeleting(true), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setDeleting(false);
        setRoleIdx((roleIdx + 1) % PROFILE.roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 bg-grid"
    >
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #7C5CFF 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-12 md:items-center relative z-10">
        <div className="animate-fade-up order-2 md:order-1">
          <div className="eyebrow text-teal-400 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-dot" />
            available for freelance · {PROFILE.location}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl text-ink-100 mb-3 leading-tight">
            {PROFILE.name}
          </h1>

          <div className="font-mono text-lg sm:text-xl text-violet-400 h-8 mb-6">
            {displayed}
            <span className="cursor-blink h-5 align-middle ml-0.5" />
          </div>

          <p className="text-ink-500 text-base max-w-md leading-relaxed mb-9">
            I turn ambitious ideas into AI agents and products that actually
            ship multi-agent pipelines, RAG systems, and fullstack builds
            engineered to hold up in production, not just in a demo.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <button
              onClick={() => scrollTo("contact")}
              className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-sm text-sm"
            >
              Start a project <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollTo("works")}
              className="btn-line px-6 py-3 rounded-sm text-sm"
            >
              See my work
            </button>
          </div>

          <div className="flex flex-wrap gap-x-7 gap-y-2 font-mono text-xs text-ink-700 border-t border-void-700 pt-5">
            <span>
              <span className="text-ink-300">5+</span> projects delivered
            </span>
            <span>
              <span className="text-ink-300">1+</span> ongoing projects
            </span>
            <span>
              <span className="text-ink-300">100%</span> client satisfaction
            </span>
          </div>

          <div className="flex items-center gap-5 mt-7">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:border-violet-500/60 hover:bg-violet-500/10 transition-all duration-300"
            >
              <Github size={16} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:border-teal-400/60 hover:bg-teal-400/10 transition-all duration-300"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        <div
          className="relative justify-self-center animate-fade-up order-1 md:order-2"
          style={{ animationDelay: "150ms" }}
        >
          <div className="absolute -inset-3 rounded-full border border-violet-500/20 animate-spin-slower" />
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-violet-500/40 via-teal-400/30 to-transparent blur-md animate-pulse-slow" />
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-70 lg:h-70 xl:w-80 xl:h-80 rounded-full bg-gradient-to-br from-void-700 to-void-900 border border-void-600 overflow-hidden">
            <img
              src="/photo.jpg"
              alt="Durai"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 right-2 bg-void-900 border border-teal-400/30 rounded-full px-3.5 py-1.5 font-mono text-[10px] text-teal-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-dot" />
            Available
          </div>
        </div>
      </div>
    </section>
  );
}
