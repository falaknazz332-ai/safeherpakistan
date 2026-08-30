import { useState } from "react";
import { Siren, MapPin, HeartHandshake, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function Hero() {
  const [locating, setLocating] = useState(false);

  const shareLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported on this device.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const url = `https://maps.google.com/?q=${latitude},${longitude}`;
        const text = `I need help. My live location: ${url}`;
        try {
          if (navigator.share) {
            await navigator.share({ title: "SafeHer — My Location", text, url });
          } else {
            await navigator.clipboard.writeText(text);
            toast.success("Location copied to clipboard!");
          }
        } catch {
          await navigator.clipboard.writeText(text);
          toast.success("Location copied to clipboard!");
        }
        setLocating(false);
      },
      (err) => {
        toast.error("Could not get location: " + err.message);
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const triggerSOS = () => {
    const el = document.getElementById("emergency");
    el?.scrollIntoView({ behavior: "smooth" });
    toast("🚨 Emergency contacts ready. Tap any number to call.", {
      description: "Rescue 1122 · Police 15 · Women Helpline 1099",
    });
  };

  return (
    <section id="home" className="relative pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-hero opacity-70" />
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-primary/20 blur-3xl animate-float" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-lavender/30 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            SafeHer Foundation · A NovaTech Solutions Project
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6">
            Empowering{" "}
            <span className="gradient-text">Safety</span>,
            <br />
            One Click at a Time.
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
            A premium safety companion for women in Pakistan — emergency contacts,
            live location, AI safety toolkit, legal rights and community help,
            all in one beautifully designed place.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              onClick={triggerSOS}
              size="lg"
              className="w-full sm:w-auto rounded-full bg-primary-gradient shadow-glow hover:opacity-90 animate-pulse-glow text-sm sm:text-base h-12 sm:h-14 px-6 sm:px-7"
            >
              <Siren className="w-5 h-5 mr-2" />
              Emergency SOS
            </Button>
            <Button
              onClick={shareLocation}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto rounded-full glass border-primary/30 hover:bg-secondary h-12 sm:h-14 px-6 sm:px-7 text-sm sm:text-base"
              disabled={locating}
            >
              <MapPin className="w-5 h-5 mr-2" />
              {locating ? "Locating…" : "Share Live Location"}
            </Button>
            <a href="#ai-toolkit" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full glass border-lavender/40 hover:bg-secondary h-12 sm:h-14 px-6 sm:px-7 text-sm sm:text-base"
              >
                <HeartHandshake className="w-5 h-5 mr-2" />
                Get Help
              </Button>
            </a>
          </div>

          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              24/7 Emergency Access
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose" />
              AI-Powered Guidance
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-lavender" />
              Community First
            </div>
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary-gradient opacity-30 blur-3xl rounded-full" />
            <div className="relative glass-strong rounded-4xl p-5 sm:p-8 shadow-glow">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Emergency Contacts", value: "12+", icon: "📞", color: "primary" },
                  { label: "AI Tools", value: "8", icon: "🤖", color: "rose" },
                  { label: "Rights Guides", value: "20+", icon: "⚖️", color: "lavender" },
                  { label: "Safety Tips", value: "Daily", icon: "💜", color: "primary" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl p-5 hover-lift"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className="text-2xl font-black gradient-text">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 glass rounded-2xl p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-gradient grid place-items-center shrink-0">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold">Today's Tip</div>
                  <div className="text-xs text-muted-foreground truncate">
                    Share your ride details with a trusted contact before you leave.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
