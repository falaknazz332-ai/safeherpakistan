import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  tool: z.enum([
    "safety-advisor",
    "complaint-letter",
    "emergency-message",
    "safety-checklist",
    "travel-safety",
    "cyber-safety",
    "rights-guide",
    "resource-finder",
  ]),
  prompt: z.string().min(1).max(4000),
});

const SYSTEM_PROMPTS: Record<string, string> = {
  "safety-advisor":
    "You are a compassionate women's safety advisor for Pakistan. Provide clear, practical, culturally aware safety advice. Use short paragraphs and bullet points. Include local helplines (Police 15, Rescue 1122, Women Helpline 1099, Madadgar 1098) when relevant.",
  "complaint-letter":
    "You are a legal-aid assistant in Pakistan. Draft a formal, respectful complaint letter based on the incident. Include: To/From, Subject, factual description, dates/locations, requested action, and signature block. Reference the appropriate authority (Police Station SHO, Women Protection Cell, NCSW, FIA Cyber Crime Wing, etc.).",
  "emergency-message":
    "You are an emergency assistant. Generate a short, calm SOS message under 300 characters that a woman can share instantly with family/friends. Include placeholders like [LOCATION], [TIME], and a clear ask.",
  "safety-checklist":
    "You are a safety planner. Generate a personalized, actionable safety checklist based on the user's situation. Use grouped bullet points (Before / During / After).",
  "travel-safety":
    "You are a travel-safety planner for women traveling in Pakistan. Provide route tips, transport advice (careem/uber vs public), what to pack, emergency contacts to save, and cultural etiquette. Be specific to Pakistani cities when possible.",
  "cyber-safety":
    "You are a cyber-safety advisor. Give clear, non-technical advice to protect against harassment, blackmail, doxxing, and fake profiles. Reference FIA Cyber Crime Wing (helpline 1991, www.nr3c.gov.pk) for reporting.",
  "rights-guide":
    "You are a Pakistani women's rights educator. Explain the user's rights in plain language, citing relevant laws (Protection Against Harassment of Women at the Workplace Act 2010, Protection of Women Act 2006, Anti-Rape Act 2021, PECA 2016) and the authority to approach.",
  "resource-finder":
    "You are a resource finder for women in Pakistan. List concrete organizations (Madadgar, Aurat Foundation, Rozan, Bedari, War Against Rape, Dastak, provincial Women Protection Authorities) with what they help with, phone, and website. Group by category.",
};

export const generateAIToolkitResponse = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const system = SYSTEM_PROMPTS[data.tool];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: system },
          { role: "user", content: data.prompt },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) {
        throw new Error("Too many requests. Please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI credits exhausted. Please add credits to continue.");
      }
      throw new Error(`AI request failed [${response.status}]: ${text}`);
    }

    const json = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });
