import { Phone, Copy, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Contact = {
  name: string;
  number: string;
  desc: string;
  website?: string;
  emoji: string;
  tips: string[];
  authority: string;
};

const CONTACTS: Contact[] = [
  {
    name: "Rescue 1122",
    number: "1122",
    desc: "Emergency ambulance & rescue services nationwide.",
    website: "https://rescue.gov.pk",
    emoji: "🚑",
    authority: "Punjab Emergency Service",
    tips: [
      "State your exact location clearly.",
      "Mention if there are injuries or fire.",
      "Stay on the line — do not hang up.",
    ],
  },
  {
    name: "Police",
    number: "15",
    desc: "Nationwide police emergency helpline.",
    website: "https://punjabpolice.gov.pk",
    emoji: "👮",
    authority: "Pakistan Police",
    tips: [
      "Provide your name, location, and nature of emergency.",
      "Note the operator's badge or reference number.",
      "Request a female officer if you feel unsafe.",
    ],
  },
  {
    name: "Women Helpline",
    number: "1099",
    desc: "Ministry of Human Rights helpline for women in distress.",
    website: "https://mohr.gov.pk",
    emoji: "💜",
    authority: "Ministry of Human Rights",
    tips: [
      "Free legal aid and counseling available.",
      "All calls are confidential.",
      "Available 24/7 across Pakistan.",
    ],
  },
  {
    name: "Madadgar Helpline",
    number: "1098",
    desc: "National child & women protection helpline.",
    website: "https://madadgaar.org",
    emoji: "🤝",
    authority: "Madadgaar National Helpline",
    tips: [
      "Free counseling and legal referral.",
      "Handles domestic violence and abuse.",
      "Also serves as child protection line.",
    ],
  },
  {
    name: "Edhi Foundation",
    number: "115",
    desc: "Ambulance, shelter & humanitarian services.",
    website: "https://edhi.org",
    emoji: "🏥",
    authority: "Edhi Foundation",
    tips: [
      "Free ambulance in most cities.",
      "Shelter homes for women available.",
      "Missing person services provided.",
    ],
  },
  {
    name: "Chhipa Welfare",
    number: "1020",
    desc: "Ambulance and welfare services in Karachi & beyond.",
    website: "https://chhipa.org",
    emoji: "🚨",
    authority: "Chhipa Welfare Association",
    tips: [
      "Fast ambulance dispatch in Karachi.",
      "Also runs shelter and food programs.",
      "Volunteer support for women in distress.",
    ],
  },
  {
    name: "FIA Cyber Crime",
    number: "1991",
    desc: "Report online harassment, blackmail, and cyber crime.",
    website: "https://www.nr3c.gov.pk",
    emoji: "🔒",
    authority: "FIA Cyber Crime Wing",
    tips: [
      "Preserve screenshots, chat logs, and URLs.",
      "Do not delete messages from the accused.",
      "File complaint online at nr3c.gov.pk.",
    ],
  },
  {
    name: "Punjab Women Helpline",
    number: "1043",
    desc: "Punjab government helpline for women in distress.",
    website: "https://pcsw.punjab.gov.pk",
    emoji: "🌸",
    authority: "Punjab Commission on Status of Women",
    tips: [
      "Legal advice and referrals to Dar-ul-Aman.",
      "Confidential and free.",
      "Available in Punjab, 24/7.",
    ],
  },
];

export function EmergencyContacts() {
  const call = (num: string) => {
    window.location.href = `tel:${num}`;
  };
  const copy = async (num: string, name: string) => {
    await navigator.clipboard.writeText(num);
    toast.success(`${name} number copied!`);
  };

  return (
    <section id="emergency" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-block px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            🚨 Emergency Contacts
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Help is <span className="gradient-text">One Tap Away</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Verified helplines across Pakistan. Tap to call, copy, or open the
            official website. Every card expands for what to do and important tips.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CONTACTS.map((c, i) => (
            <div
              key={c.name}
              className="glass-strong rounded-3xl p-6 hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-primary-gradient grid place-items-center text-2xl shadow-soft">
                  {c.emoji}
                </div>
                <span className="text-2xl font-black gradient-text">{c.number}</span>
              </div>
              <h3 className="font-bold text-lg mb-1">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{c.desc}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                <Button
                  size="sm"
                  onClick={() => call(c.number)}
                  className="rounded-full bg-primary-gradient shadow-soft"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copy(c.number, c.name)}
                  className="rounded-full"
                >
                  <Copy className="w-3.5 h-3.5 mr-1" />
                  Copy
                </Button>
                {c.website && (
                  <a href={c.website} target="_blank" rel="noreferrer">
                    <Button size="sm" variant="ghost" className="rounded-full">
                      <Globe className="w-3.5 h-3.5 mr-1" />
                      Website
                    </Button>
                  </a>
                )}
              </div>

              <Accordion type="single" collapsible>
                <AccordionItem value="tips" className="border-b-0">
                  <AccordionTrigger className="text-xs uppercase tracking-wider text-primary font-semibold hover:no-underline py-2">
                    <span className="flex items-center gap-1">
                      Safety tips & authority
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-xs text-muted-foreground mb-2">
                      <span className="font-semibold text-foreground">Authority:</span> {c.authority}
                    </div>
                    <ul className="space-y-1.5">
                      {c.tips.map((t) => (
                        <li key={t} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-primary">•</span>
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
