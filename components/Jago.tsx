"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { jagoReply } from "@/lib/mock";

const quickActions = [
  { label: "Find scholarships", query: "Which schemes am I eligible for?" },
  { label: "Check eligibility", query: "How to check eligibility?" },
  { label: "Document help", query: "What documents do I need to upload?" },
  { label: "Track application", query: "Where is my application status?" },
];

interface Message {
  from: "user" | "jago";
  text: string;
  timestamp: string;
}

export default function Jago() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "jago",
      text: "Hello! I'm JAGO, your AI scholarship assistant. I can help you with eligibility, documents, application status, and more. What would you like to know?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((m) => [...m, { from: "user", text, timestamp: now }]);
    setQuery("");
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      const reply = jagoReply(text);
      setMessages((m) => [
        ...m,
        { from: "jago", text: reply, timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-2 sm:mb-3 flex h-[min(480px,calc(100vh-5.5rem))] w-[calc(100vw-1.5rem)] xs:w-[330px] sm:w-[360px] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl animate-scale-in" role="dialog" aria-label="JAGO AI Assistant">
          {/* Header */}
          <div className="bg-navy px-3.5 sm:px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-white/20">
                <Sparkles size={15} className="text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-xs sm:text-sm font-semibold truncate">JAGO Assistant</p>
                <p className="text-white/60 text-[9px] sm:text-[10px] truncate">AI-powered · RAG on scheme rules</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded transition-colors cursor-pointer shrink-0"
              aria-label="Close JAGO"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3 overscroll-contain">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs sm:text-sm ${
                  m.from === "user"
                    ? "bg-navy text-white rounded-br-md"
                    : "bg-bg-warm text-ink border border-line-subtle rounded-bl-md"
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  <p className={`text-[9px] sm:text-[10px] mt-1 ${m.from === "user" ? "text-white/50" : "text-mute"}`}>{m.timestamp}</p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-bg-warm rounded-2xl rounded-bl-md px-3.5 py-2.5 border border-line-subtle">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-mute rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-mute rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-mute rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick actions */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-1.5 shrink-0">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => sendMessage(a.query)}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-line hover:bg-navy hover:text-white hover:border-navy transition-colors cursor-pointer"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-line p-2.5 sm:p-3 shrink-0 bg-white">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(query)}
              placeholder="Ask JAGO..."
              aria-label="Message JAGO"
              className="input text-xs sm:text-sm !rounded-full !py-1.5 sm:!py-2"
            />
            <button
              onClick={() => sendMessage(query)}
              disabled={!query.trim()}
              className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white hover:bg-navy-light disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Send"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close JAGO" : "Open JAGO assistant"}
        className={`ml-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 cursor-pointer ${
          open ? "bg-ink text-white rotate-0" : "bg-saffron text-white"
        }`}
      >
        {open ? <X size={20} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
