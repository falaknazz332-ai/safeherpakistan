import { Heart, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 px-4 pb-8">
      <div className="max-w-7xl mx-auto glass-strong rounded-4xl p-6 sm:p-8 md:p-12 shadow-soft">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-primary-gradient grid place-items-center shadow-glow">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <div className="font-display font-bold text-lg gradient-text">SafeHer Pakistan</div>
                <div className="text-xs text-muted-foreground uppercase tracking-widest">
                  by SafeHer Foundation
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              A premium safety companion for women in Pakistan — combining
              emergency response, AI guidance, legal rights and community help
              in one beautifully designed space.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { i: Instagram, l: "Instagram" },
                { i: Twitter, l: "Twitter" },
                { i: Facebook, l: "Facebook" },
                { i: Mail, l: "Email" },
              ].map(({ i: Icon, l }) => (
                <a
                  key={l}
                  href="#"
                  aria-label={l}
                  className="w-10 h-10 rounded-full glass grid place-items-center hover-lift text-primary"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-3">Explore</div>
            <ul className="space-y-2 text-sm">
              {[
                ["#features", "Features"],
                ["#emergency", "Emergency"],
                ["#ai-toolkit", "AI Toolkit"],
                ["#rights", "Know Your Rights"],
                ["#quiz", "Safety Quiz"],
              ].map(([h, l]) => (
                <li key={h}>
                  <a href={h} className="text-muted-foreground hover:text-primary transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-3">Emergency</div>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-muted-foreground"><span>Police</span><span className="font-bold text-primary">15</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Rescue</span><span className="font-bold text-primary">1122</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Women Helpline</span><span className="font-bold text-primary">1099</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Cyber Crime</span><span className="font-bold text-primary">1991</span></li>
              <li className="flex justify-between text-muted-foreground"><span>Edhi</span><span className="font-bold text-primary">115</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-muted-foreground">
            © {new Date().getFullYear()} SafeHer Foundation · A NovaTech Solutions Project
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-primary inline animate-pulse" fill="currentColor" /> by{" "}
            <span className="font-semibold gradient-text">Falak &amp; Fatiha</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
