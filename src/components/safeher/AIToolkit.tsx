import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateAIToolkitResponse } from "@/lib/ai-toolkit.functions";
import {
  Bot,
  FileText,
  MessageSquare,
  Backpack,
  Plane,
  Lock,
  Scale,
  MapPin,
  Copy,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type ToolId =
  | "safety-advisor"
  | "complaint-letter"
  | "emergency-message"
  | "safety-checklist"
  | "travel-safety"
  | "cyber-safety"
  | "rights-guide"
  | "resource-finder";

type Tool = {
  id: ToolId;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  title: string;
  desc: string;
  placeholder: string;
};

const TOOLS: Tool[] = [
  {
    id: "safety-advisor",
    icon: Bot,
    emoji: "🤖",
    title: "AI Safety Advisor",
    desc: "Ask anything about personal safety — get calm, expert guidance.",
    placeholder: "e.g. I feel unsafe walking home from work at night in Karachi. What should I do?",
  },
  {
    id: "complaint-letter",
    icon: FileText,
    emoji: "📝",
    title: "Complaint Letter Generator",
    desc: "Draft a formal complaint letter to the right authority.",
    placeholder: "e.g. My colleague has been sending inappropriate messages on WhatsApp for two weeks…",
  },
  {
    id: "emergency-message",
    icon: MessageSquare,
    emoji: "💬",
    title: "Emergency Message Generator",
    desc: "Instant SOS message you can send to your family.",
    placeholder: "e.g. Alone in a rickshaw near Liberty Market, driver taking unfamiliar route.",
  },
  {
    id: "safety-checklist",
    icon: Backpack,
    emoji: "🎒",
    title: "Safety Checklist Generator",
    desc: "Personalized checklist for your situation.",
    placeholder: "e.g. Moving alone to a new hostel in Islamabad next week.",
  },
  {
    id: "travel-safety",
    icon: Plane,
    emoji: "🧳",
    title: "Travel Safety Planner",
    desc: "Route, transport, packing, and etiquette tips for your trip.",
    placeholder: "e.g. Traveling from Lahore to Hunza solo for 5 days by bus.",
  },
  {
    id: "cyber-safety",
    icon: Lock,
    emoji: "🔒",
    title: "Cyber Safety Advisor",
    desc: "Protect against online harassment, blackmail, and fake profiles.",
    placeholder: "e.g. Someone made a fake Instagram account using my photos.",
  },
  {
    id: "rights-guide",
    icon: Scale,
    emoji: "⚖️",
    title: "Rights Guide",
    desc: "Know your rights and the exact law that protects you.",
    placeholder: "e.g. My manager keeps making inappropriate remarks in meetings.",
  },
  {
    id: "resource-finder",
    icon: MapPin,
    emoji: "📍",
    title: "Resource Finder",
    desc: "Find NGOs, shelters, and support organizations in Pakistan.",
    placeholder: "e.g. Domestic violence support organizations in Karachi.",
  },
];

export function AIToolkit() {
  const [active, setActive] = useState<Tool | null>(null);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [displayed, setDisplayed] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const call = useServerFn(generateAIToolkitResponse);

  const openTool = (t: Tool) => {
    setActive(t);
    setInput("");
    setOutput("");
    setDisplayed("");
    setError(null);
  };

  const submit = async () => {
    if (!active || !input.trim()) return;
    setLoading(true);
    setError(null);
    setOutput("");
    setDisplayed("");
    try {
      const res = await call({ data: { tool: active.id, prompt: input } });
      const text = res.content || "";
      setOutput(text);
      // Typing animation
      let i = 0;
      const step = Math.max(1, Math.floor(text.length / 200));
      const interval = setInterval(() => {
        i = Math.min(text.length, i + step);
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, 15);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard!");
  };

  const shareResult = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "SafeHer AI", text: output });
      } else {
        await navigator.clipboard.writeText(output);
        toast.success("Copied (share not supported).");
      }
    } catch {
      /* dismissed */
    }
  };

  return (
    <section id="ai-toolkit" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            AI Toolkit
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Meet Your <span className="gradient-text">AI Safety Companion</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Eight beautifully crafted AI tools — from complaint letters to travel
            plans — tailored for women in Pakistan. Tap any card to begin.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((t, i) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => openTool(t)}
                className="text-left glass-strong rounded-3xl p-6 hover-lift group animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-gradient grid place-items-center shadow-soft group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl">{t.emoji}</span>
                </div>
                <h3 className="font-bold text-base mb-1">{t.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{t.desc}</p>
                <div className="mt-3 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Open →
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-2xl w-[95vw] sm:w-full glass-strong border-primary/20 rounded-3xl p-0 overflow-hidden">
          {active && (
            <>
              <div className="bg-primary-gradient p-5 sm:p-6 text-primary-foreground">
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 grid place-items-center text-2xl backdrop-blur">
                      {active.emoji}
                    </div>
                    <div className="min-w-0">
                      <DialogTitle className="text-xl text-primary-foreground">
                        {active.title}
                      </DialogTitle>
                      <DialogDescription className="text-primary-foreground/80 text-sm">
                        {active.desc}
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-xs uppercase tracking-wider font-semibold text-primary mb-2 block">
                    Your situation
                  </label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={active.placeholder}
                    rows={4}
                    className="rounded-2xl resize-none border-primary/20"
                  />
                </div>

                <Button
                  onClick={submit}
                  disabled={loading || !input.trim()}
                  className="w-full rounded-full bg-primary-gradient shadow-glow h-12"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {loading ? "Generating…" : "Generate with AI"}
                </Button>

                {loading && (
                  <div className="space-y-2 glass rounded-2xl p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-11/12" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                )}

                {error && (
                  <div className="glass rounded-2xl p-4 border border-destructive/30 text-sm text-destructive">
                    {error}
                  </div>
                )}

                {displayed && (
                  <div className="glass rounded-2xl p-5 animate-fade-up">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {displayed}
                      {displayed.length < output.length && (
                        <span className="inline-block w-2 h-4 bg-primary ml-0.5 animate-pulse" />
                      )}
                    </div>
                    {displayed === output && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button size="sm" onClick={copyResult} variant="outline" className="rounded-full">
                          <Copy className="w-3.5 h-3.5 mr-1" /> Copy
                        </Button>
                        <Button size="sm" onClick={shareResult} variant="outline" className="rounded-full">
                          <Share2 className="w-3.5 h-3.5 mr-1" /> Share
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setInput("");
                            setOutput("");
                            setDisplayed("");
                          }}
                          className="rounded-full ml-auto"
                        >
                          <X className="w-3.5 h-3.5 mr-1" /> Clear
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
