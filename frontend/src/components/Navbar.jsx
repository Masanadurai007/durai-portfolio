// import React, { useEffect, useState } from 'react';
// import { Menu, X, MessageCircle } from 'lucide-react';
// import { NAV_LINKS, PROFILE } from '../data/content';

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   const scrollTo = (id) => {
//     document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
//     setOpen(false);
//   };

//   const whatsappUrl = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
//     "Hi Durai, I'd like to talk about a project."
//   )}`;

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//         scrolled ? 'glass-panel border-b border-void-700/60 py-3' : 'py-6'
//       }`}
//     >
//       <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
//         <button
//           onClick={() => scrollTo('Home')}
//           className="font-mono text-sm tracking-[0.2em] text-ink-100 hover:text-violet-400 transition-colors"
//         >
//           DURAI
//         </button>

//         <div className="hidden md:flex items-center gap-9">
//           {NAV_LINKS.map((l) => (
//             <button
//               key={l}
//               onClick={() => scrollTo(l)}
//               className="underline-draw text-sm text-ink-500 hover:text-ink-100 transition-colors"
//             >
//               {l}
//             </button>
//           ))}
//         </div>

//         <div className="hidden md:flex items-center gap-5">
//           <a
//             href={whatsappUrl}
//             target="_blank"
//             rel="noreferrer"
//             aria-label="Message Durai on WhatsApp"
//             className="text-teal-400 hover:text-teal-300 transition-colors"
//           >
//             <MessageCircle size={18} />
//           </a>
//           <button
//             onClick={() => scrollTo('Contact')}
//             className="btn-line px-5 py-2 text-sm rounded-sm"
//           >
//             Let's talk
//           </button>
//         </div>

//         <button className="md:hidden text-ink-100" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//           {open ? <X size={22} /> : <Menu size={22} />}
//         </button>
//       </div>

//       {open && (
//         <div className="md:hidden glass-panel border-t border-void-700/60 px-6 py-5 flex flex-col gap-4">
//           {NAV_LINKS.map((l) => (
//             <button key={l} onClick={() => scrollTo(l)} className="text-left text-ink-300 text-sm py-1">
//               {l}
//             </button>
//           ))}
//           <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-teal-400 text-sm py-1">
//             <MessageCircle size={16} /> WhatsApp
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// }

import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../data/content";

function WhatsAppIcon({ size = 18, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.04 4a7.94 7.94 0 0 0-6.88 11.9L4 20l4.2-1.1a7.93 7.93 0 0 0 3.84.98h.003c4.38 0 7.95-3.56 7.95-7.94a7.9 7.9 0 0 0-2.38-5.62Zm-5.56 12.2h-.003a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 0 1-1.01-3.51 6.62 6.62 0 0 1 11.3-4.67 6.57 6.57 0 0 1 1.94 4.67c0 3.65-2.97 6.6-6.61 6.6Zm3.62-4.95c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.51.64-.63.77-.12.13-.23.15-.43.05a5.4 5.4 0 0 1-1.59-.98 5.95 5.95 0 0 1-1.1-1.37c-.11-.2 0-.3.09-.4.09-.1.2-.23.3-.34.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.39-.33-.33-.45-.34h-.39a.74.74 0 0 0-.54.25c-.18.2-.71.7-.71 1.7s.73 1.97.83 2.1c.1.13 1.43 2.18 3.46 3.06.48.21.86.33 1.15.43.49.15.93.13 1.28.08.39-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const whatsappUrl = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
    "Hi Durai, I'd like to talk about a project.",
  )}`;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel border-b border-void-700/60 py-3" : "py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <button
          onClick={() => scrollTo("Home")}
          className="flex items-center gap-1.5 font-mono text-sm tracking-[0.2em] text-ink-100 hover:text-violet-400 transition-colors group"
        >
          {/* <span className="text-violet-500 group-hover:text-teal-400 transition-colors">
            {"<"}
          </span> */}
          Durai
          <span className="text-teal-400 group-hover:text-violet-400 transition-colors">
            {"."}
          </span>
        </button>

        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="underline-draw text-sm text-ink-500 hover:text-ink-100 transition-colors"
            >
              {l}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Message Durai on WhatsApp"
            className="text-teal-400 hover:text-teal-300 transition-colors"
          >
            <WhatsAppIcon size={28} />
          </a>
          <button
            onClick={() => scrollTo("Contact")}
            className="btn-line px-5 py-2 text-sm rounded-sm"
          >
            Let's talk
          </button>
        </div>

        <button
          className="md:hidden text-ink-100"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-panel border-t border-void-700/60 px-6 py-5 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => scrollTo(l)}
              className="text-left text-ink-300 text-sm py-1"
            >
              {l}
            </button>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-teal-400 text-sm py-1"
          >
            <WhatsAppIcon size={16} /> WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
