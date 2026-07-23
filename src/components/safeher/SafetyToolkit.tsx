import { useEffect, useState } from "react";
import { CheckSquare, Trophy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const ITEMS = [
  "Saved emergency numbers (15, 1122, 1099) as speed dial",
  "Shared live location access with a trusted family member",
  "Installed a ride-sharing app (Careem/InDrive) with SOS button",
  "Kept a small pepper spray or safety alarm in my bag",
  "Backed up important IDs (CNIC, passport) to secure cloud",
  "Set a family check-in time when traveling alone",
  "Memorized one emergency contact number by heart",
  "Reviewed my social media privacy settings this month",
  "Know the nearest hospital & police station to my home",
  "Have a code word with family for silent SOS",
];

const KEY = "safeher-toolkit";

export function SafetyToolkit() {
  const [checked, setChecked] = useState<boolean[]>(() => ITEMS.map(() => false));

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = (i: number) => {
    const next = [...checked];
    next[i] = !next[i];
    setChecked(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const reset = () => {
    const next = ITEMS.map(() => false);
    setChecked(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const done = checked.filter(Boolean).length;
  const pct = Math.round((done / ITEMS.length) * 100);

  return (
    <section id="toolkit" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            <CheckSquare className="w-4 h-4" />
            Safety Toolkit
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Your Personal <span className="gradient-text">Safety Checklist</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tick off as you go — your progress saves automatically on this device.
          </p>
        </div>

        <div className="glass-strong rounded-4xl p-6 md:p-8 shadow-soft">
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="min-w-0">
              <div className="text-sm text-muted-foreground">Your progress</div>
              <div className="text-3xl font-black gradient-text">
                {done}/{ITEMS.length}{" "}
                <span className="text-base font-normal text-muted-foreground">complete</span>
              </div>
            </div>
            {done === ITEMS.length ? (
              <div className="flex items-center gap-2 text-primary font-semibold">
                <Trophy className="w-6 h-6" />
                Champion!
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={reset}
                className="rounded-full text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-1" /> Reset
              </Button>
            )}
          </div>

          <Progress value={pct} className="mb-6 h-3" />

          <ul className="space-y-2">
            {ITEMS.map((item, i) => (
              <li key={item}>
                <button
                  onClick={() => toggle(i)}
                  className={`w-full text-left glass rounded-2xl p-4 flex items-start gap-3 hover-lift transition-all ${
                    checked[i] ? "bg-primary/10 border-primary/40" : ""
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg grid place-items-center shrink-0 mt-0.5 border-2 transition-all ${
                      checked[i]
                        ? "bg-primary-gradient border-transparent"
                        : "border-primary/30"
                    }`}
                  >
                    {checked[i] && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-primary-foreground"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      checked[i] ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
