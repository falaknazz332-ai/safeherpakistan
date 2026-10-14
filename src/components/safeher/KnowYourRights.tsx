import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Scale } from "lucide-react";

type Right = {
  title: string;
  law: string;
  summary: string;
  whatToDo: string[];
  evidence: string[];
  authority: string;
  helpline: string;
  website: string;
};

const RIGHTS: Right[] = [
  {
    title: "Protection Against Workplace Harassment",
    law: "Protection Against Harassment of Women at the Workplace Act 2010",
    summary:
      "Every organization with 10+ employees must have an internal Inquiry Committee. You may file a complaint internally or directly with the Ombudsperson.",
    whatToDo: [
      "Document every incident with date, time, witnesses.",
      "Submit written complaint to the Inquiry Committee within 30 days.",
      "If unresolved or you fear retaliation, approach the Ombudsperson.",
      "You may not be penalized for filing a complaint.",
    ],
    evidence: [
      "Emails, WhatsApp messages, screenshots.",
      "Witness statements.",
      "Audio/video recordings (if legally obtained).",
    ],
    authority: "Federal / Provincial Ombudsperson for Harassment",
    helpline: "1099 (Ministry of Human Rights)",
    website: "https://mohr.gov.pk",
  },
  {
    title: "Cyber Harassment & Online Abuse",
    law: "Prevention of Electronic Crimes Act (PECA) 2016",
    summary:
      "PECA criminalizes cyber-stalking, blackmail using intimate images, hate speech, and hacking. The FIA Cyber Crime Wing investigates.",
    whatToDo: [
      "Take dated screenshots (do not delete originals).",
      "File complaint at nr3c.gov.pk or nearest Cyber Crime Reporting Centre.",
      "Do not share passwords with the perpetrator.",
      "Request expedited action if minors or intimate media involved.",
    ],
    evidence: [
      "Screenshots including URL, timestamp, profile.",
      "Chat exports (WhatsApp, Instagram DM).",
      "Payment receipts (in extortion cases).",
    ],
    authority: "FIA Cyber Crime Wing",
    helpline: "1991",
    website: "https://www.nr3c.gov.pk",
  },
  {
    title: "Domestic Violence Protection",
    law: "Domestic Violence (Prevention & Protection) Acts — provincial",
    summary:
      "Punjab, Sindh, KP and Balochistan have laws that allow a survivor to apply for a Protection Order restraining the abuser.",
    whatToDo: [
      "Move to a safe location — Dar-ul-Aman if needed.",
      "Get medical examination documented.",
      "File FIR at nearest police station.",
      "Apply to Family/District Court for a Protection Order.",
    ],
    evidence: [
      "Medico-legal report (MLR).",
      "Photographs of injuries.",
      "Witness statements from neighbors/relatives.",
    ],
    authority: "District Court / Women Protection Authority",
    helpline: "1099 · 1043 (Punjab)",
    website: "https://pcsw.punjab.gov.pk",
  },
  {
    title: "Right to File an FIR",
    law: "Code of Criminal Procedure, Section 154",
    summary:
      "The police are legally bound to register your FIR for any cognizable offence — they cannot refuse.",
    whatToDo: [
      "Go to the police station in whose jurisdiction the offence occurred.",
      "Provide a written or verbal statement.",
      "Insist on a copy of the FIR (free of cost).",
      "If refused, contact the DPO/SP or use the Citizen-Police Liaison portal.",
    ],
    evidence: [
      "Your own statement is enough to register the FIR.",
      "Bring any documentary evidence you have.",
    ],
    authority: "SHO of concerned Police Station",
    helpline: "15",
    website: "https://punjabpolice.gov.pk",
  },
  {
    title: "Right to Equal Inheritance",
    law: "Muslim Family Laws Ordinance 1961 & Protection of Women Act 2011",
    summary:
      "Women have a guaranteed share of inheritance. Denying it is a criminal offence carrying imprisonment and fine.",
    whatToDo: [
      "Obtain the succession certificate.",
      "If deprived, file a civil suit for partition.",
      "You may also lodge FIR under Section 498-A PPC.",
      "Consult a female lawyer via AGHS or Dastak.",
    ],
    evidence: [
      "Nikahnama / Marriage Certificate.",
      "Death certificate of the deceased.",
      "Property documents.",
    ],
    authority: "Civil Court / Federal Ombudsperson",
    helpline: "1099",
    website: "https://mohr.gov.pk",
  },
  {
    title: "Anti-Rape (Investigation & Trial) Act 2021",
    law: "Anti-Rape (Investigation & Trial) Act 2021",
    summary:
      "Establishes Special Courts, requires trials within 4 months, provides for anti-rape crisis cells, and protects survivor identity.",
    whatToDo: [
      "Go to the nearest Anti-Rape Crisis Cell (in DHQ hospitals).",
      "Do not bathe or change clothes before medical exam.",
      "You have the right to a female medical officer.",
      "Free legal aid must be provided.",
    ],
    evidence: [
      "Medico-legal examination.",
      "Clothing worn at the time.",
      "Any witnesses.",
    ],
    authority: "Special Court under the Act",
    helpline: "1099",
    website: "https://mohr.gov.pk",
  },
];

export function KnowYourRights() {
  return (
    <section id="rights" className="py-14 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary mb-4">
            <Scale className="w-4 h-4" />
            Know Your Rights
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            Your Rights, <span className="gradient-text">Explained Simply</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every card expands to show the law, what to do, evidence you need, and
            where to file. All information verified against Pakistani legislation.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {RIGHTS.map((r, i) => (
            <AccordionItem
              key={r.title}
              value={`r-${i}`}
              className="glass-strong rounded-3xl px-6 border-none animate-fade-up"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <AccordionTrigger className="hover:no-underline py-5 min-w-0 gap-2">
                <div className="flex min-w-0 flex-1 items-start gap-3 text-start">
                  <div className="w-10 h-10 rounded-2xl bg-primary-gradient grid place-items-center shrink-0 text-primary-foreground font-bold">
                    {i + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold text-base">{r.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{r.law}</div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-sm text-muted-foreground mb-4">{r.summary}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
                      What to do
                    </div>
                    <ul className="space-y-1.5">
                      {r.whatToDo.map((w) => (
                        <li key={w} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-rose">✓</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider font-semibold text-primary mb-2">
                      Evidence to keep
                    </div>
                    <ul className="space-y-1.5">
                      {r.evidence.map((w) => (
                        <li key={w} className="text-xs text-muted-foreground flex gap-2">
                          <span className="text-lavender">•</span>
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 grid sm:grid-cols-3 gap-2 text-xs">
                  <div className="glass rounded-xl p-3">
                    <div className="font-semibold">Authority</div>
                    <div className="text-muted-foreground">{r.authority}</div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <div className="font-semibold">Helpline</div>
                    <div className="text-muted-foreground">{r.helpline}</div>
                  </div>
                  <a
                    href={r.website}
                    target="_blank"
                    rel="noreferrer"
                    className="glass rounded-xl p-3 hover-lift"
                  >
                    <div className="font-semibold">Official Site</div>
                    <div className="text-primary truncate">{r.website.replace("https://", "")}</div>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
