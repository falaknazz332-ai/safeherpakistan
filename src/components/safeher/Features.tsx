import { useState } from "react";
import { MapPin, Route, ShieldCheck, FileText, MessageCircle, Award, Search, Scale, Building2, Video, SquareCheck as CheckSquare, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  short: string;
  details: string;
  whatToDo: string[];
  rights: string;
  authority: string;
  helpline: string;
};

const FEATURES: Feature[] = [
  {
    icon: MapPin,
    title: "Live Location Sharing",
    short: "Share your location instantly with trusted contacts.",
    details:
      "Uses your device's Geolocation API to fetch your precise coordinates and creates a Google Maps link you can share via WhatsApp, SMS, or any app.",
    whatToDo: [
      "Enable location permissions on your browser/phone.",
      "Tap 'Share Live Location' from the hero section.",
      "Send it to a family member or friend.",
      "Keep sharing on when traveling alone at night.",
    ],
    rights: "You have the right to privacy — this data stays on your device.",
    authority: "Self-service (no third party stores your location)",
    helpline: "1099 (Women Helpline)",
  },
  {
    icon: Building2,
    title: "Nearby Safe Places",
    short: "Find police stations, hospitals, pharmacies & shelters near you.",
    details:
      "Powered by Google Places API — locate the nearest verified safe places when you need urgent help. Includes women protection centers and Dar-ul-Aman.",
    whatToDo: [
      "Allow location access.",
      "Choose a category (Police / Hospital / Pharmacy / Shelter).",
      "Tap any result to open directions in Google Maps.",
      "Call the location directly before heading there.",
    ],
    rights: "Right to protection under Protection of Women Act 2006.",
    authority: "Women Protection Authority (provincial)",
    helpline: "1043 (Punjab) · 1099 (National)",
  },
  {
    icon: Route,
    title: "Safe Route Planner",
    short: "Plan safer routes avoiding poorly-lit or high-risk areas.",
    details:
      "A UI demo of a smarter navigation flow that prefers well-lit, populated streets and known safe checkpoints between your origin and destination.",
    whatToDo: [
      "Enter start and destination.",
      "Review flagged low-safety segments.",
      "Share the chosen route with a contact.",
      "Recheck route in real-time if plans change.",
    ],
    rights: "Right to safe mobility in public spaces.",
    authority: "City Traffic Police / District Administration",
    helpline: "15 (Police)",
  },
  {
    icon: Video,
    title: "Self-Defense Resources",
    short: "Curated video tutorials and quick techniques you can learn today.",
    details:
      "A library of short-form self-defense videos, awareness drills, and de-escalation techniques taught by certified instructors — many in Urdu.",
    whatToDo: [
      "Start with situational awareness videos.",
      "Practice 3 basic escape moves weekly.",
      "Attend a local workshop if available.",
      "Teach a friend — safety in numbers.",
    ],
    rights: "Right to self-defense under Pakistan Penal Code Section 96–106.",
    authority: "Local self-defense academies (e.g. Sahil, Bedari)",
    helpline: "1099",
  },
  {
    icon: CheckSquare,
    title: "Safety Toolkit Checklist",
    short: "Personal safety checklist saved on your device.",
    details:
      "A living checklist of things to prepare — emergency contacts saved, location shared, safe apps installed, ID copies stored securely. Progress saves to LocalStorage.",
    whatToDo: [
      "Open the checklist below.",
      "Tick items as you complete them.",
      "Revisit weekly to update.",
      "Print or share with a friend.",
    ],
    rights: "Right to personal safety preparedness.",
    authority: "Self-managed",
    helpline: "—",
  },
  {
    icon: FileText,
    title: "Report Incident (UI)",
    short: "Quick, private incident logging with structured fields.",
    details:
      "A structured form to note down what happened, when, where, and who — so if you decide to file an official report later, you have all the details ready.",
    whatToDo: [
      "Fill in date, time, location, description.",
      "Add photos or evidence if any (kept locally).",
      "Export as PDF and take to police / lawyer.",
      "Follow up with Women Protection Authority.",
    ],
    rights: "Right to file an FIR under CrPC Section 154.",
    authority: "Nearest Police Station SHO",
    helpline: "15 / 1099",
  },
  {
    icon: MessageCircle,
    title: "I'm Safe Message Generator",
    short: "One-tap reassuring message to your family.",
    details:
      "Generates a friendly 'I'm safe' message with your current location and time — perfect for after work, late-night arrivals, or long travel.",
    whatToDo: [
      "Tap the generator.",
      "Review the message.",
      "Share via WhatsApp / SMS.",
      "Schedule daily check-ins.",
    ],
    rights: "Right to open communication with family.",
    authority: "Self-managed",
    helpline: "—",
  },
  {
    icon: Award,
    title: "Safety Quiz & Badges",
    short: "Test your safety knowledge and earn cute badges.",
    details:
      "A short interactive quiz covering emergency response, cyber safety, legal rights, and everyday awareness. Earn badges you can share.",
    whatToDo: [
      "Play the quiz below.",
      "Read the explanations after each question.",
      "Share your badge with friends.",
      "Retake monthly.",
    ],
    rights: "Right to information about your safety.",
    authority: "SafeHer Foundation",
    helpline: "—",
  },
  {
    icon: Lightbulb,
    title: "Daily Safety Tips",
    short: "Fresh, practical tips delivered every day.",
    details:
      "Bite-sized daily tips — for commuting, ride-sharing, digital safety, home security, workplace, and more. Written for the Pakistani context.",
    whatToDo: [
      "Check the tip of the day.",
      "Apply one tip per day.",
      "Discuss with your circle.",
      "Suggest new tips via the community form.",
    ],
    rights: "Right to safety education.",
    authority: "SafeHer Editorial Team",
    helpline: "—",
  },
  {
    icon: Search,
    title: "Powerful Search",
    short: "Instantly find rights, laws, helplines, or resources.",
    details:
      "A single search bar that indexes every helpline, law, right, and resource on SafeHer. Type any keyword — 'harassment', 'FIR', 'shelter'.",
    whatToDo: [
      "Tap the search box.",
      "Type a keyword.",
      "Open the best-matching result.",
      "Bookmark for later.",
    ],
    rights: "Right to accessible information.",
    authority: "SafeHer Search Engine",
    helpline: "—",
  },
  {
    icon: Scale,
    title: "Know Your Rights",
    short: "Plain-language guides to Pakistani women's rights.",
    details:
      "Covering workplace harassment, marriage, inheritance, cyber crime, domestic violence, and constitutional protections — with the exact law and where to complain.",
    whatToDo: [
      "Browse the Rights section below.",
      "Read the guide relevant to your case.",
      "Save the helpline and authority.",
      "Consult a lawyer if needed.",
    ],
    rights: "Constitution of Pakistan, Articles 25 & 34.",
    authority: "National Commission on Status of Women",
    helpline: "1099",
  },
  {
    icon: ShieldCheck,
    title: "Complaint Center",
    short: "Directory of official complaint channels.",
    details:
      "One-stop directory: FIA Cyber Crime, Ombudsperson for Harassment at Workplace, Wafaqi Mohtasib, provincial Women Protection Authorities and more.",
    whatToDo: [
      "Identify the right authority for your case.",
      "Prepare evidence (screenshots, emails, witnesses).",
      "File complaint via official portal or helpline.",
      "Keep a record of your complaint number.",
    ],
    rights: "Right to redressal under multiple statutes.",
    authority: "Ombudsperson / FIA / Provincial WPA",
    helpline: "1991 (FIA) · 1099",
  },
];

export function Features() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="features" className="py-14 sm:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            ✨ Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Everything You Need, <span className="gradient-text">Beautifully Simple</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tap any card to expand and see the details, your rights, what to do,
            and where to complain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const open = openIdx === i;
            return (
              <div
                key={f.title}
                className={`text-start glass-strong rounded-3xl p-5 sm:p-6 hover-lift transition-all animate-fade-up ${
                  open ? "ring-2 ring-primary shadow-glow" : ""
                }`}
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-gradient grid place-items-center shadow-soft mb-4">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{f.short}</p>

                <Accordion
                  type="single"
                  collapsible
                  value={open ? "d" : ""}
                  onValueChange={(v) => setOpenIdx(v ? i : null)}
                >
                  <AccordionItem value="d" className="border-b-0">
                    <AccordionTrigger className="text-xs uppercase tracking-wider text-primary font-semibold hover:no-underline py-2">
                      {open ? "Hide details" : "See details"}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-3">{f.details}</p>
                      <div className="mb-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">What to do</div>
                        <ul className="space-y-1">
                          {f.whatToDo.map((t) => (
                            <li key={t} className="text-xs text-muted-foreground flex gap-2">
                              <span className="text-rose">✓</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-xs">
                        <div className="glass rounded-xl p-2">
                          <span className="font-semibold">Your right:</span>{" "}
                          <span className="text-muted-foreground">{f.rights}</span>
                        </div>
                        <div className="glass rounded-xl p-2">
                          <span className="font-semibold">Authority:</span>{" "}
                          <span className="text-muted-foreground">{f.authority}</span>
                        </div>
                        <div className="glass rounded-xl p-2">
                          <span className="font-semibold">Helpline:</span>{" "}
                          <span className="text-muted-foreground">{f.helpline}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
