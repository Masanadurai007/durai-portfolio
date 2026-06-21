import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { PROFILE } from "../data/content";
import { submitLead } from "../lib/api";

const MIN_WORDS = 10;

function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function Contact() {
  const [ref, visible] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [touched, setTouched] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const messageWordCount = wordCount(form.message);
  const messageTooShort = touched && messageWordCount < MIN_WORDS;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!form.name || !form.email || !form.message) return;
    if (wordCount(form.message) < MIN_WORDS) return;

    setStatus("sending");
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        subject: "New project inquiry from portfolio site",
        message: form.message,
        source: "contact_form",
      });
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTouched(false);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div ref={ref} className="max-w-5xl mx-auto">
        <div
          className={`eyebrow text-violet-400 mb-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Let's start something
        </div>
        <h2
          className={`font-display font-bold text-4xl sm:text-5xl text-ink-100 mb-12 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
        >
          Contact
        </h2>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          <div
            className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="rounded-2xl border border-void-700 bg-void-900/60 p-7 sm:p-9">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full pb-2.5 text-sm"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    required
                    className="w-full pb-2.5 text-sm"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={() => setTouched(true)}
                    placeholder="Tell me about your project — what you're building, the timeline, anything that helps me understand the scope"
                    required
                    rows={4}
                    className="w-full pb-2.5 text-sm resize-none"
                  />
                  <div className="flex justify-between mt-1.5">
                    <span
                      className={`text-[11px] font-mono ${messageTooShort ? "text-red-400" : "text-ink-700"}`}
                    >
                      {messageTooShort
                        ? `Add a bit more detail — at least ${MIN_WORDS} words helps me understand the project`
                        : `${messageWordCount} / ${MIN_WORDS} words minimum`}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-sm text-sm disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      Sending <Loader2 size={15} className="animate-spin" />
                    </>
                  ) : status === "sent" ? (
                    <>
                      Message sent <Check size={15} />
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={15} />
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p className="text-teal-400 text-xs font-mono">
                    Thanks — I'll get back to you within a day.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-red-400 text-xs font-mono">
                    Something went wrong. Please try WhatsApp or email directly.
                  </p>
                )}
              </form>
            </div>
          </div>

          <div
            className={`hidden lg:block transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="relative rounded-2xl overflow-hidden border border-void-700 mb-6 aspect-[4/3]">
              <img
                src="/contact.png"
                alt="Let's build something together"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <p className="font-display italic text-ink-100 text-sm leading-snug">
                  "Good projects start with a clear conversation."
                </p>
              </div>
            </div>

            <div className="font-mono text-xs text-ink-500 space-y-3.5">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-center gap-2 hover:text-violet-400 transition-colors"
              >
                <Mail size={14} className="text-teal-400" /> {PROFILE.email}
              </a>
              <a
                href={`tel:+${PROFILE.whatsappNumber}`}
                className="flex items-center gap-2 hover:text-violet-400 transition-colors"
              >
                <Phone size={14} className="text-teal-400" /> {PROFILE.phone}
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-teal-400" />{" "}
                {PROFILE.location}
              </div>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-violet-400 transition-colors"
              >
                <Github size={14} className="text-teal-400" /> GitHub
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-violet-400 transition-colors"
              >
                <Linkedin size={14} className="text-teal-400" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
