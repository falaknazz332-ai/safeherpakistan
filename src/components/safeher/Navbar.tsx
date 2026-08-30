import { useEffect, useState } from "react";
import { Heart, Moon, Sun, Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n";

const links = [
  { href: "#home", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#emergency", label: "Emergency" },
  { href: "#ai-toolkit", label: "AI Toolkit" },
  { href: "#rights", label: "Rights" },
  { href: "#quiz", label: "Quiz" },
];

export function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle: toggleLang } = useLanguage();

  useEffect(() => {
    const saved = localStorage.getItem("safeher-theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("safeher-theme", next ? "dark" : "light");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass-strong rounded-3xl px-5 py-3 flex items-center justify-between transition-all ${scrolled ? "shadow-soft" : ""}`}>
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl bg-primary-gradient grid place-items-center shadow-glow group-hover:scale-105 transition-transform">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-bold text-lg gradient-text">SafeHer</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Pakistan</span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleDark}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <a href="#emergency" className="hidden sm:block">
              <Button className="rounded-full bg-primary-gradient shadow-glow hover:opacity-90">
                🚨 SOS
              </Button>
            </a>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden rounded-full"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {open && (
          <div className="glass-strong mt-2 rounded-3xl p-4 md:hidden animate-fade-up">
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-foreground/80 hover:bg-secondary text-center"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
