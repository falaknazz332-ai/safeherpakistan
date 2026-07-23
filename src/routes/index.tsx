import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/safeher/Navbar";
import { Hero } from "@/components/safeher/Hero";
import { EmergencyContacts } from "@/components/safeher/EmergencyContacts";
import { Features } from "@/components/safeher/Features";
import { AIToolkit } from "@/components/safeher/AIToolkit";
import { KnowYourRights } from "@/components/safeher/KnowYourRights";
import { SafetyToolkit } from "@/components/safeher/SafetyToolkit";
import { SafetyQuiz } from "@/components/safeher/SafetyQuiz";
import { DailyTip } from "@/components/safeher/DailyTip";
import { Footer } from "@/components/safeher/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeHer Pakistan — Empowering Safety, One Click at a Time" },
      {
        name: "description",
        content:
          "SafeHer Pakistan is a premium women's safety companion — emergency contacts, live location, AI safety toolkit, legal rights and community help, designed for Pakistan.",
      },
      {
        property: "og:title",
        content: "SafeHer Pakistan — Women's Safety & Rights",
      },
      {
        property: "og:description",
        content:
          "Emergency SOS, live location, AI-powered safety tools and Pakistani legal rights — all in one beautifully designed place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&family=Quicksand:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <DailyTip />
        <EmergencyContacts />
        <Features />
        <AIToolkit />
        <SafetyToolkit />
        <KnowYourRights />
        <SafetyQuiz />
      </main>
      <Footer />
      <Toaster position="top-center" richColors />
    </div>
  );
}
