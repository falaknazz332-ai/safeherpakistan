import { useMemo } from "react";
import { Lightbulb } from "lucide-react";

const TIPS = [
  "Save at least one emergency contact as an ICE (In Case of Emergency) entry.",
  "Before boarding a rickshaw, note and photograph the license plate.",
  "Use only ride-hailing apps with a live SOS button.",
  "Enable two-factor authentication on WhatsApp and Instagram.",
  "Trust your gut — if a situation feels wrong, leave immediately.",
  "Keep a low-cost secondary phone charged for emergencies.",
  "Share long-trip routes with a family member before you leave.",
  "Never share your CNIC picture over social media DMs.",
  "Learn 3 basic self-defense moves — practice them monthly.",
  "Program 15, 1122, and 1099 as speed-dial numbers.",
];

export function DailyTip() {
  const tip = useMemo(() => {
    const d = new Date();
    const day = d.getFullYear() * 1000 + d.getMonth() * 50 + d.getDate();
    return TIPS[day % TIPS.length];
  }, []);

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto glass-strong rounded-4xl p-6 md:p-8 flex items-center gap-5 shadow-soft animate-fade-up">
        <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-gradient grid place-items-center shadow-glow">
          <Lightbulb className="w-7 h-7 text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
            💜 Today's Safety Tip
          </div>
          <div className="text-base md:text-lg font-medium">{tip}</div>
        </div>
      </div>
    </section>
  );
}
