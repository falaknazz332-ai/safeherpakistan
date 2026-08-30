import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ur";

/**
 * Urdu dictionary keyed by the exact English string that appears in the UI.
 * Text nodes are swapped live when Urdu is selected; anything missing here
 * gracefully stays in English.
 */
const UR: Record<string, string> = {
  // Nav / brand
  Home: "ہوم",
  Features: "خصوصیات",
  Emergency: "ایمرجنسی",
  "AI Toolkit": "اے آئی ٹول کٹ",
  Rights: "حقوق",
  Quiz: "کوئز",
  SafeHer: "سیف ہر",
  Pakistan: "پاکستان",
  "🚨 SOS": "🚨 ایس او ایس",
  "Toggle theme": "تھیم تبدیل کریں",

  // Hero
  "SafeHer Foundation · A NovaTech Solutions Project":
    "سیف ہر فاؤنڈیشن · نووا ٹیک سلوشنز کا پروجیکٹ",
  Empowering: "بااختیار",
  Safety: "تحفظ",
  "One Click at a Time.": "ایک کلک میں۔",
  "A premium safety companion for women in Pakistan — emergency contacts, live location, AI safety toolkit, legal rights and community help, all in one beautifully designed place.":
    "پاکستان میں خواتین کے لیے ایک بہترین سیفٹی ساتھی — ایمرجنسی نمبرز، لائیو لوکیشن، اے آئی سیفٹی ٹول کٹ، قانونی حقوق اور کمیونٹی مدد، سب ایک خوبصورت جگہ پر۔",
  "Emergency SOS": "ایمرجنسی ایس او ایس",
  "Share Live Location": "لائیو لوکیشن شیئر کریں",
  "Locating…": "لوکیشن معلوم کی جا رہی ہے…",
  "Get Help": "مدد حاصل کریں",
  "24/7 Emergency Access": "چوبیس گھنٹے ایمرجنسی رسائی",
  "AI-Powered Guidance": "اے آئی سے رہنمائی",
  "Community First": "کمیونٹی سب سے پہلے",
  "Emergency Contacts": "ایمرجنسی رابطے",
  "AI Tools": "اے آئی ٹولز",
  "Rights Guides": "حقوق کے رہنما",
  "Safety Tips": "حفاظتی مشورے",
  Daily: "روزانہ",
  "Today's Tip": "آج کا مشورہ",
  "Share your ride details with a trusted contact before you leave.":
    "نکلنے سے پہلے اپنی سواری کی تفصیل کسی قابلِ اعتماد فرد کو بھیجیں۔",

  // Daily tip
  "💜 Today's Safety Tip": "💜 آج کا حفاظتی مشورہ",
  "Save at least one emergency contact as an ICE (In Case of Emergency) entry.":
    "کم از کم ایک ایمرجنسی نمبر ICE کے طور پر محفوظ کریں۔",
  "Before boarding a rickshaw, note and photograph the license plate.":
    "رکشے میں بیٹھنے سے پہلے نمبر پلیٹ نوٹ کریں اور تصویر لے لیں۔",
  "Use only ride-hailing apps with a live SOS button.":
    "صرف وہی رائیڈ ایپس استعمال کریں جن میں لائیو ایس او ایس بٹن ہو۔",
  "Enable two-factor authentication on WhatsApp and Instagram.":
    "واٹس ایپ اور انسٹاگرام پر ٹو فیکٹر تصدیق آن کریں۔",
  "Trust your gut — if a situation feels wrong, leave immediately.":
    "اپنی چھٹی حس پر بھروسہ کریں — کچھ غلط لگے تو فوراً وہاں سے نکل جائیں۔",
  "Keep a low-cost secondary phone charged for emergencies.":
    "ایمرجنسی کے لیے ایک سستا اضافی فون چارج رکھیں۔",
  "Share long-trip routes with a family member before you leave.":
    "لمبے سفر سے پہلے اپنا راستہ گھر والوں کو بتا دیں۔",
  "Never share your CNIC picture over social media DMs.":
    "اپنے شناختی کارڈ کی تصویر کبھی سوشل میڈیا پر نہ بھیجیں۔",
  "Learn 3 basic self-defense moves — practice them monthly.":
    "خود دفاعی کے تین بنیادی طریقے سیکھیں اور ہر ماہ مشق کریں۔",
  "Program 15, 1122, and 1099 as speed-dial numbers.":
    "15، 1122 اور 1099 کو اسپیڈ ڈائل پر رکھیں۔",

  // Emergency section
  "🚨 Emergency Contacts": "🚨 ایمرجنسی رابطے",
  "Help is": "مدد صرف",
  "One Tap Away": "ایک ٹیپ کی دوری پر",
  "Verified helplines across Pakistan. Tap to call, copy, or open the official website. Every card expands for what to do and important tips.":
    "پورے پاکستان کی مصدقہ ہیلپ لائنز۔ کال کریں، نمبر کاپی کریں یا سرکاری ویب سائٹ کھولیں۔ ہر کارڈ میں مزید ہدایات اور مشورے موجود ہیں۔",
  Call: "کال",
  Copy: "کاپی",
  Website: "ویب سائٹ",
  "Safety tips & authority": "حفاظتی مشورے اور ادارہ",
  "Authority:": "ادارہ:",
  "Rescue 1122": "ریسکیو 1122",
  Police: "پولیس",
  "Women Helpline": "ویمن ہیلپ لائن",
  "Madadgar Helpline": "مددگار ہیلپ لائن",
  "Edhi Foundation": "ایدھی فاؤنڈیشن",
  "Chhipa Welfare": "چھیپا ویلفیئر",
  "FIA Cyber Crime": "ایف آئی اے سائبر کرائم",
  "Punjab Women Helpline": "پنجاب ویمن ہیلپ لائن",
  "Emergency ambulance & rescue services nationwide.":
    "ملک بھر میں ایمبولینس اور ریسکیو سروسز۔",
  "Nationwide police emergency helpline.": "ملک گیر پولیس ایمرجنسی ہیلپ لائن۔",
  "Ministry of Human Rights helpline for women in distress.":
    "مشکل میں گھری خواتین کے لیے وزارتِ انسانی حقوق کی ہیلپ لائن۔",
  "National child & women protection helpline.":
    "بچوں اور خواتین کے تحفظ کی قومی ہیلپ لائن۔",
  "Ambulance, shelter & humanitarian services.":
    "ایمبولینس، پناہ گاہ اور فلاحی خدمات۔",
  "Ambulance and welfare services in Karachi & beyond.":
    "کراچی اور دیگر شہروں میں ایمبولینس و فلاحی خدمات۔",
  "Report online harassment, blackmail, and cyber crime.":
    "آن لائن ہراسانی، بلیک میلنگ اور سائبر کرائم کی شکایت کریں۔",
  "Punjab government helpline for women in distress.":
    "مشکل میں گھری خواتین کے لیے پنجاب حکومت کی ہیلپ لائن۔",

  // Features
  "✨ Features": "✨ خصوصیات",
  "Everything You Need,": "آپ کی ضرورت کی ہر چیز،",
  "Beautifully Simple": "خوبصورتی سے آسان",
  "Tap any card to expand and see the details, your rights, what to do, and where to complain.":
    "کسی بھی کارڈ پر ٹیپ کریں اور تفصیل، آپ کے حقوق، کیا کرنا ہے اور شکایت کہاں کرنی ہے دیکھیں۔",
  "Live Location Sharing": "لائیو لوکیشن شیئرنگ",
  "Share your location instantly with trusted contacts.":
    "اپنی لوکیشن فوراً قابلِ اعتماد افراد کو بھیجیں۔",
  "Nearby Safe Places": "قریبی محفوظ مقامات",
  "Find police stations, hospitals, pharmacies & shelters near you.":
    "اپنے قریب پولیس اسٹیشن، ہسپتال، فارمیسی اور پناہ گاہیں تلاش کریں۔",
  "Safe Route Planner": "محفوظ راستے کا منصوبہ",
  "Plan safer routes avoiding poorly-lit or high-risk areas.":
    "کم روشنی اور خطرناک علاقوں سے بچتے ہوئے محفوظ راستہ بنائیں۔",
  "Self-Defense Resources": "خود دفاعی وسائل",
  "Curated video tutorials and quick techniques you can learn today.":
    "منتخب ویڈیو ٹیوٹوریلز اور آسان تکنیکیں جو آج ہی سیکھی جا سکتی ہیں۔",
  "Safety Toolkit Checklist": "سیفٹی ٹول کٹ چیک لسٹ",
  "Personal safety checklist saved on your device.":
    "ذاتی حفاظتی چیک لسٹ جو آپ کے ڈیوائس پر محفوظ رہتی ہے۔",
  "Report Incident (UI)": "واقعہ رپورٹ کریں",
  "Quick, private incident logging with structured fields.":
    "نجی اور تیز طریقے سے واقعے کی تفصیل محفوظ کریں۔",
  "I'm Safe Message Generator": "‘میں محفوظ ہوں’ پیغام",
  "One-tap reassuring message to your family.":
    "ایک ٹیپ سے گھر والوں کو اطمینان بھرا پیغام بھیجیں۔",
  "Safety Quiz & Badges": "سیفٹی کوئز اور بیجز",
  "Test your safety knowledge and earn cute badges.":
    "اپنی حفاظتی معلومات جانچیں اور پیارے بیجز حاصل کریں۔",
  "Daily Safety Tips": "روزانہ حفاظتی مشورے",
  "Fresh, practical tips delivered every day.":
    "ہر روز نئے اور کارآمد مشورے۔",
  "Powerful Search": "طاقتور تلاش",
  "Instantly find rights, laws, helplines, or resources.":
    "حقوق، قوانین، ہیلپ لائنز اور وسائل فوراً تلاش کریں۔",
  "Know Your Rights": "اپنے حقوق جانیں",
  "Plain-language guides to Pakistani women's rights.":
    "پاکستانی خواتین کے حقوق کی آسان زبان میں رہنمائی۔",
  "Complaint Center": "شکایت مرکز",
  "Directory of official complaint channels.":
    "سرکاری شکایتی اداروں کی فہرست۔",
  "What to do": "کیا کرنا ہے",
  "Your rights": "آپ کے حقوق",
  Authority: "ادارہ",
  Helpline: "ہیلپ لائن",
  Details: "تفصیل",

  // AI toolkit
  "Meet Your": "ملیے اپنے",
  "AI Safety Companion": "اے آئی سیفٹی ساتھی سے",
  "Eight beautifully crafted AI tools — from complaint letters to travel plans — tailored for women in Pakistan. Tap any card to begin.":
    "آٹھ خوبصورت اے آئی ٹولز — شکایتی خط سے سفری منصوبے تک — خاص طور پر پاکستانی خواتین کے لیے۔ شروع کرنے کے لیے کسی کارڈ پر ٹیپ کریں۔",
  "Open →": "کھولیں →",
  "Your situation": "آپ کی صورتحال",
  "Generate with AI": "اے آئی سے بنائیں",
  "Generating…": "بنایا جا رہا ہے…",
  Share: "شیئر",
  Clear: "صاف کریں",

  // Safety toolkit
  "Safety Toolkit": "سیفٹی ٹول کٹ",
  Reset: "دوبارہ شروع",
  Progress: "پیش رفت",

  // Quiz
  "Safety Quiz": "سیفٹی کوئز",
  "Test Your": "آزمائیں اپنی",
  "Safety Knowledge": "حفاظتی معلومات",
  "Earn a cute badge you can share.":
    "ایک پیارا بیج حاصل کریں جسے آپ شیئر کر سکتی ہیں۔",
  Question: "سوال",
  "Badge unlocked!": "بیج مل گیا!",
  "Play Again": "دوبارہ کھیلیں",
  "You scored": "آپ کا اسکور",

  // Footer
  Explore: "دریافت کریں",
  "SafeHer Pakistan": "سیف ہر پاکستان",
  "by SafeHer Foundation": "سیف ہر فاؤنڈیشن کی جانب سے",
  "A premium safety companion for women in Pakistan — combining emergency response, AI guidance, legal rights and community help in one beautifully designed space.":
    "پاکستان میں خواتین کے لیے ایک بہترین سیفٹی ساتھی — ایمرجنسی مدد، اے آئی رہنمائی، قانونی حقوق اور کمیونٹی سپورٹ ایک ہی خوبصورت جگہ پر۔",
  Rescue: "ریسکیو",
  "Cyber Crime": "سائبر کرائم",
  Edhi: "ایدھی",
  "Made with": "بنایا گیا",
  by: "بذریعہ",
};

const norm = (s: string) => s.replace(/\s+/g, " ").trim();
const DICT: Record<string, string> = Object.fromEntries(
  Object.entries(UR).map(([k, v]) => [norm(k), v]),
);

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx>({
  lang: "en",
  setLang: () => {},
  toggle: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

const ORIGINAL = new WeakMap<Text, string>();

function translateNode(root: Node, on: boolean) {
  if (typeof document === "undefined") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  let n = walker.nextNode();
  while (n) {
    nodes.push(n as Text);
    n = walker.nextNode();
  }
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent) continue;
    const tag = parent.tagName;
    if (tag === "SCRIPT" || tag === "STYLE") continue;
    if (on) {
      const source = ORIGINAL.get(node) ?? node.nodeValue ?? "";
      const hit = DICT[norm(source)];
      if (hit) {
        if (!ORIGINAL.has(node)) ORIGINAL.set(node, source);
        if (node.nodeValue !== hit) node.nodeValue = hit;
      }
    } else {
      const original = ORIGINAL.get(node);
      if (original !== undefined && node.nodeValue !== original) {
        node.nodeValue = original;
      }
    }
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("safeher-lang");
    if (saved === "ur") setLangState("ur");
  }, []);

  useEffect(() => {
    const on = lang === "ur";
    const html = document.documentElement;
    html.lang = on ? "ur" : "en";
    html.dir = on ? "rtl" : "ltr";
    html.classList.toggle("lang-ur", on);

    translateNode(document.body, on);

    if (!on) return;
    const observer = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((node) => translateNode(node, true));
        if (r.type === "characterData" && r.target.nodeType === 3) {
          translateNode(r.target.parentNode ?? r.target, true);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("safeher-lang", l);
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "ur" ? "en" : "ur"),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}
