import React from "react";
import { useReveal } from "../hooks/useReveal";
import { PROFILE } from "../data/content";

export default function About() {
  const [ref, visible] = useReveal();

  return (
    <section id="about" className="py-24 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto section-reveal ${visible ? "visible" : ""}`}
      >
        <div
          className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Get to know me
        </div>

        <h2
          className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-10 max-w-2xl transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          About Me
        </h2>

        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">
          <div>
            <p
              className={`text-ink-500 leading-loose text-[15px] mb-7 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              I'm <span className="text-ink-100">{PROFILE.name}</span>. I build
              at the intersection of AI and software engineering — agents that
              reason and act, retrieval systems that ground every answer in real
              data, and fullstack products wired together end to end. What I
              care about isn't the demo, it's the version that's still standing
              after real users, real traffic, and real edge cases hit it. I
              bring that mindset to every freelance project I take on, whether
              it's a single agent or a full product build.
            </p>

            <blockquote
              className={`border-l-2 border-violet-500 pl-5 font-display italic text-lg text-ink-100 max-w-md transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
            >
              "Good code ships quietly. It's the broken kind that gets noticed."
            </blockquote>
          </div>

          <div
            className={`relative transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-br from-violet-500/20 via-teal-400/10 to-transparent blur-lg animate-pulse-slower pointer-events-none" />
            <div className="absolute -inset-2 rounded-xl border border-violet-500/20 pointer-events-none" />
            <div className="relative rounded-lg overflow-hidden border border-void-600 bg-void-900 w-full lg:w-[520px] lg:-mr-12">
              <video
                src="/about_video.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="block w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
