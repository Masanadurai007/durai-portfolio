import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PROFILE, NAV_LINKS } from "../data/content";

export default function Footer() {
  const scrollTo = (id) =>
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-void-700 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-[1.4fr_1fr_1fr] gap-10 mb-12">
          <div>
            <button
              onClick={() => scrollTo("Home")}
              className="font-mono text-sm tracking-[0.2em] text-ink-100 hover:text-violet-400 transition-colors mb-4 inline-flex items-center gap-1"
            >
              Durai
              <span className="text-teal-400">{"."}</span>
            </button>
            <p className="text-ink-700 text-sm leading-relaxed max-w-sm mb-5">
              {PROFILE.name} — Fullstack Developer and AI Engineer based in{" "}
              {PROFILE.location}, building agentic AI systems, RAG pipelines,
              and production-grade fullstack products for freelance clients.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:border-violet-500/60 hover:bg-violet-500/10 transition-all duration-300"
              >
                <Github size={15} />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:border-teal-400/60 hover:bg-teal-400/10 transition-all duration-300"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                aria-label="Email"
                className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-ink-100 hover:border-violet-500/60 hover:bg-violet-500/10 transition-all duration-300"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div>
            <div className="eyebrow text-ink-700 mb-4">Navigate</div>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l)}
                    className="text-sm text-ink-500 hover:text-violet-400 transition-colors underline-draw"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-ink-700 mb-4">What I build</div>
            <ul className="space-y-2.5 text-sm text-ink-500">
              <li>Agentic AI systems</li>
              <li>RAG &amp; LLM integration</li>
              <li>Fullstack AI products</li>
              <li>Backend &amp; API development</li>
            </ul>
          </div>
        </div>

        <div className="divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-ink-700 text-center sm:text-left">
            © {year} {PROFILE.name}. Fullstack Developer &amp; AI Engineer,{" "}
            {PROFILE.location}. All rights reserved.
          </p>
          <button
            onClick={() => scrollTo("Home")}
            aria-label="Back to top"
            className="w-9 h-9 rounded-full border border-void-600 flex items-center justify-center text-ink-500 hover:text-violet-400 hover:border-violet-500/60 transition-all duration-300"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
