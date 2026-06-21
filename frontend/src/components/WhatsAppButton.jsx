import React from "react";
import { PROFILE } from "../data/content";

export default function WhatsAppButton() {
  const url = `https://wa.me/${PROFILE.whatsappNumber}?text=${encodeURIComponent(
    "Hi Durai, I'd like to talk about a project.",
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Message Durai on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed z-[1000] flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
      style={{
        bottom: "92px",
        right: "24px",
        width: "45px",
        height: "45px",
        background: "#25D366",
        boxShadow: "0 4px 16px rgba(37,211,102,0.35)",
      }}
    >
      <svg viewBox="0 0 24 24" width="19" height="19" fill="#08070F">
        <path d="M17.6 6.32A7.85 7.85 0 0 0 12.04 4a7.94 7.94 0 0 0-6.88 11.9L4 20l4.2-1.1a7.93 7.93 0 0 0 3.84.98h.003c4.38 0 7.95-3.56 7.95-7.94a7.9 7.9 0 0 0-2.38-5.62Zm-5.56 12.2h-.003a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 0 1-1.01-3.51 6.62 6.62 0 0 1 11.3-4.67 6.57 6.57 0 0 1 1.94 4.67c0 3.65-2.97 6.6-6.61 6.6Zm3.62-4.95c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.51.64-.63.77-.12.13-.23.15-.43.05a5.4 5.4 0 0 1-1.59-.98 5.95 5.95 0 0 1-1.1-1.37c-.11-.2 0-.3.09-.4.09-.1.2-.23.3-.34.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.61-1.48-.16-.39-.33-.33-.45-.34h-.39a.74.74 0 0 0-.54.25c-.18.2-.71.7-.71 1.7s.73 1.97.83 2.1c.1.13 1.43 2.18 3.46 3.06.48.21.86.33 1.15.43.49.15.93.13 1.28.08.39-.06 1.17-.48 1.34-.94.16-.46.16-.86.11-.94-.05-.08-.18-.13-.38-.23Z" />
      </svg>
    </a>
  );
}
