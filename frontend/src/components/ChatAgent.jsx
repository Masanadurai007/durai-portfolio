import React, { useEffect, useRef, useState } from "react";
import { X, Send, Loader2, Sparkles } from "lucide-react";
import { CHAT_STARTERS } from "../data/content";
import { sendChatMessage } from "../lib/api";
import { useSessionId } from "../hooks/useSessionId";

function DuraiAvatar({ size = 28 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 font-display font-semibold"
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #7C5CFF, #33E0C7)",
        color: "#08070F",
        fontSize: size * 0.42,
      }}
    >
      D
    </div>
  );
}

function ChatIcon({ open }) {
  return (
    <div className="relative w-6 h-6">
      <span
        className={`absolute inset-0 transition-all duration-300 ${open ? "opacity-0 rotate-45 scale-50" : "opacity-100 rotate-0 scale-100"}`}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
          <path
            d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-4 4v-4H5.5C4.67 16 4 15.33 4 14.5v-9Z"
            fill="#08070F"
          />
          <circle cx="8.5" cy="10" r="1.1" fill="#33E0C7" />
          <circle cx="12" cy="10" r="1.1" fill="#33E0C7" />
          <circle cx="15.5" cy="10" r="1.1" fill="#33E0C7" />
        </svg>
      </span>
      <span
        className={`absolute inset-0 transition-all duration-300 ${open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-45 scale-50"}`}
      >
        <X size={24} color="#08070F" />
      </span>
    </div>
  );
}

export default function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey, I'm Durai. What are you building? Ask me anything, or tell me about your project.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastTrace, setLastTrace] = useState([]);
  const sessionId = useSessionId();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleToggle = () => {
    setOpen(!open);
    setHasUnread(false);
  };

  const handleSend = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const data = await sendChatMessage(sessionId, trimmed);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
      setLastTrace(data.trace || []);

      if (data.lead_captured?.ready) {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Got it — I've saved your details (${data.lead_captured.name}, ${data.lead_captured.email}). The real Durai will follow up by email soon.`,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting to my backend right now. Please try the contact form or WhatsApp instead — sorry about that.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleToggle}
        className="chat-launcher relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(135deg, #7C5CFF, #33E0C7)",
          boxShadow: "0 8px 24px rgba(124,92,255,0.35)",
        }}
        aria-label={open ? "Close chat with Durai" : "Open chat with Durai"}
      >
        <ChatIcon open={open} />
        {hasUnread && !open && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-teal-400 border-2 border-void-950 animate-pulse-dot" />
        )}
      </button>

      {open && (
        <div className="chat-window glass-panel border border-void-600 rounded-xl overflow-hidden flex flex-col shadow-2xl">
          <div
            className="flex items-center gap-3 px-4 py-4 border-b border-void-700 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(124,92,255,0.12), rgba(51,224,199,0.08))",
            }}
          >
            <DuraiAvatar size={36} />
            <div className="flex-1 relative">
              <div className="text-sm text-ink-100 font-semibold flex items-center gap-1.5">
                Durai
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
            style={{ maxHeight: 360, minHeight: 260 }}
          >
            {messages.map((m, i) => (
              <div key={i}>
                {m.role === "system" ? (
                  <div className="flex justify-center">
                    <div className="text-[11px] font-mono text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-full px-3.5 py-1.5 max-w-[90%] text-center">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div
                    className={`flex items-end gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {m.role === "assistant" && <DuraiAvatar size={24} />}
                    <div
                      className={`text-[13px] leading-relaxed px-3.5 py-2.5 max-w-[78%] ${
                        m.role === "user"
                          ? "rounded-2xl rounded-br-sm text-ink-100"
                          : "rounded-2xl rounded-bl-sm bg-void-800 border border-void-600 text-ink-300"
                      }`}
                      style={
                        m.role === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, rgba(124,92,255,0.25), rgba(51,224,199,0.15))",
                              border: "1px solid rgba(124,92,255,0.3)",
                            }
                          : undefined
                      }
                    >
                      {m.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-end gap-2">
                <DuraiAvatar size={24} />
                <div className="bg-void-800 border border-void-600 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ink-700 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ink-700 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-ink-700 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            )}
            {!loading && lastTrace.length > 0 && (
              <div className="trace-text pl-8">[{lastTrace.join(" → ")}]</div>
            )}
          </div>

          {messages.length <= 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5">
              {CHAT_STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  className="text-[11px] font-mono text-ink-500 border border-void-700 rounded-full px-3 py-1.5 hover:border-violet-500/50 hover:text-violet-400 hover:bg-violet-500/5 transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 px-3.5 py-3 border-t border-void-700"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Durai anything..."
              className="flex-1 text-[13px] py-1.5"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30"
              style={{
                background: input.trim()
                  ? "linear-gradient(135deg, #7C5CFF, #33E0C7)"
                  : "transparent",
              }}
            >
              <Send size={14} color={input.trim() ? "#08070F" : "#6B6680"} />
            </button>
          </form>
          <div className="text-center pb-2.5 font-mono text-[9px] text-ink-700">
            AI-generated · may be inaccurate
          </div>
        </div>
      )}
    </>
  );
}
