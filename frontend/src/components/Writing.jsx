import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { ARTICLES } from '../data/content';

export default function Writing() {
  const [ref, visible] = useReveal();

  return (
    <section id="writing" className="py-24 px-6">
      <div ref={ref} className={`max-w-3xl mx-auto section-reveal ${visible ? 'visible' : ''}`}>
        <div className="eyebrow text-violet-400 mb-3">06 / Writing</div>
        <h2 className="font-display text-3xl sm:text-4xl text-ink-100 mb-10">Notes from the build.</h2>

        <div className="border-t border-void-700">
          {ARTICLES.map((a) => (
            <button
              key={a.title}
              type="button"
              className="group flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-6 border-b border-void-700 hover:px-2 transition-all duration-300 w-full text-left"
            >
              <div>
                <h3 className="font-display text-lg text-ink-100 group-hover:text-violet-400 transition-colors mb-1">
                  {a.title}
                </h3>
                <p className="text-sm text-ink-700 max-w-md">{a.excerpt}</p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-ink-700 flex-shrink-0">
                {a.readTime}
                <ArrowUpRight size={14} className="group-hover:text-teal-400 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
