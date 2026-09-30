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
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-xl animate-scale-in" role="dialog" aria-label="JAGO AI Assistant">
          {/* Header */}
          <div className="bg-navy px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">JAGO Assistant</p>
                <p className="text-white/60 text-[10px]">AI-powered · RAG on scheme rules</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white" aria-label="Close JAGO">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                  m.from === "user"
                    ? "bg-navy text-white rounded-br-md"
                    : "bg-bg-warm text-ink border border-line-subtle rounded-bl-md"
                }`}>
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.from === "user" ? "text-white/50" : "text-mute"}`}>{m.timestamp}</p>
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="bg-bg-warm rounded-2xl rounded-bl-md px-4 py-3 border border-line-subtle">
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
            <div className="px-3 pb-2 flex flex-wrap gap-1.5">
              {quickActions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => sendMessage(a.query)}
                  className="text-xs px-2.5 py-1.5 rounded-full border border-line hover:bg-navy hover:text-white hover:border-navy transition-colors"
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-line p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(query)}
              placeholder="Ask JAGO..."
              aria-label="Message JAGO"
              className="input text-sm !rounded-full !py-2"
            />
            <button
              onClick={() => sendMessage(query)}
              disabled={!query.trim()}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white hover:bg-navy-light disabled:opacity-40 transition-colors"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close JAGO" : "Open JAGO assistant"}
        className={`ml-auto flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl hover:scale-105 ${
          open ? "bg-ink text-white rotate-0" : "bg-saffron text-white"
        }`}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
