import { useState } from "react";
import { Award, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Q = {
  q: string;
  options: string[];
  correct: number;
  explain: string;
};

const QUESTIONS: Q[] = [
  {
    q: "What is the correct number to call for police in Pakistan?",
    options: ["115", "15", "1122", "1099"],
    correct: 1,
    explain: "15 is the nationwide police emergency helpline.",
  },
  {
    q: "Which authority handles online harassment complaints?",
    options: ["Rescue 1122", "Edhi", "FIA Cyber Crime Wing", "NADRA"],
    correct: 2,
    explain: "FIA Cyber Crime Wing investigates offences under PECA 2016 — helpline 1991.",
  },
  {
    q: "The Workplace Harassment Act 2010 applies to organizations with…",
    options: ["Any size", "10 or more employees", "50 or more employees", "Only government"],
    correct: 1,
    explain: "The Act mandates an internal Inquiry Committee for orgs with 10+ employees.",
  },
  {
    q: "If police refuse to register your FIR, you can approach…",
    options: [
      "Nobody, only the same station",
      "The DPO/SP or Citizen-Police Liaison",
      "The Prime Minister only",
      "Only a private lawyer",
    ],
    correct: 1,
    explain:
      "You can escalate to the DPO/SP, or file a complaint under Section 22-A CrPC in a court.",
  },
  {
    q: "Before sharing a ride at night, the safest habit is to…",
    options: [
      "Turn off your phone to save battery",
      "Share ride details & live location with family",
      "Sit in the front passenger seat",
      "Pay only after reaching",
    ],
    correct: 1,
    explain: "Sharing driver details and live location gives your family real-time awareness.",
  },
];

const badgeFor = (score: number) => {
  const pct = (score / QUESTIONS.length) * 100;
  if (pct === 100) return { name: "SafeHer Champion", emoji: "🏆", color: "primary" };
  if (pct >= 60) return { name: "Safety Star", emoji: "🌟", color: "rose" };
  return { name: "Safety Learner", emoji: "🌸", color: "lavender" };
};

export function SafetyQuiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[i];

  const answer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  };

  const next = () => {
    if (i + 1 >= QUESTIONS.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setI(0);
    setScore(0);
    setSelected(null);
    setDone(false);
  };

  if (done) {
    const badge = badgeFor(score);
    return (
      <section id="quiz" className="py-20 px-4">
        <div className="max-w-2xl mx-auto glass-strong rounded-4xl p-10 text-center animate-fade-up shadow-glow">
          <div className="text-7xl mb-4 animate-float">{badge.emoji}</div>
          <div className="inline-block px-4 py-1.5 rounded-full bg-primary-gradient text-primary-foreground text-sm font-semibold mb-4">
            Badge unlocked!
          </div>
          <h2 className="text-3xl font-black mb-2">{badge.name}</h2>
          <p className="text-muted-foreground mb-6">
            You scored {score} / {QUESTIONS.length}
          </p>
          <Button onClick={reset} className="rounded-full bg-primary-gradient shadow-glow">
            <RotateCcw className="w-4 h-4 mr-2" /> Play Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="quiz" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            <Award className="w-4 h-4" />
            Safety Quiz
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3">
            Test Your <span className="gradient-text">Safety Knowledge</span>
          </h2>
          <p className="text-muted-foreground">Earn a cute badge you can share.</p>
        </div>

        <div className="glass-strong rounded-4xl p-8 shadow-soft animate-fade-up">
          <div className="flex items-center justify-between mb-4 text-xs uppercase tracking-wider text-muted-foreground">
            <span>
              Question {i + 1} / {QUESTIONS.length}
            </span>
            <span className="text-primary font-semibold">Score: {score}</span>
          </div>
          <h3 className="text-xl font-bold mb-6">{q.q}</h3>
          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isCorrect = selected !== null && idx === q.correct;
              const isWrong = selected === idx && idx !== q.correct;
              return (
                <button
                  key={opt}
                  onClick={() => answer(idx)}
                  disabled={selected !== null}
                  className={`w-full text-left glass rounded-2xl p-4 flex items-center gap-3 hover-lift transition-all ${
                    isCorrect ? "border-2 border-primary bg-primary/10" : ""
                  } ${isWrong ? "border-2 border-destructive bg-destructive/10" : ""}`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg grid place-items-center font-bold text-sm shrink-0 ${
                      isCorrect
                        ? "bg-primary-gradient text-primary-foreground"
                        : isWrong
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm">{opt}</span>
                </button>
              );
            })}
          </div>

          {selected !== null && (
            <div className="mt-5 glass rounded-2xl p-4 animate-fade-up">
              <div className="flex items-start gap-2 text-sm">
                <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">
                    {selected === q.correct ? "Correct! " : "Not quite. "}
                  </span>
                  <span className="text-muted-foreground">{q.explain}</span>
                </div>
              </div>
              <Button
                onClick={next}
                className="mt-4 rounded-full bg-primary-gradient shadow-glow w-full"
              >
                {i + 1 === QUESTIONS.length ? "See my badge" : "Next question →"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
