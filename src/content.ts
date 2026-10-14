// All portfolio copy in one file: edit it here.

export const PROFILE = {
  name: "Luigi De Giorgi",
  role: "Product Designer",
  email: "luigidegiorgi1998@gmail.com",
  linkedin: "https://www.linkedin.com/in/luigi-de-giorgi-6216941b1",
  cv: "/cv/luigi-de-giorgi-cv.pdf",
  portrait: "/images/about/luigi-portrait.png",
};

// Pokédex message (one "page" per text box)
export const POKEDEX_PAGES = [
  "New message received on the POKéDEX!",
  "Hi! I'm LUIGI DE GIORGI, a product designer. 8 years ago I was fixing cars. Last year I was making coffee in Toronto.",
  "Today I design digital products: apps, brands and dashboards. I taught myself design and front-end by building real things.",
  "The lab has 3 POKé BALLS: my WORK, my STORY and my CONTACT. Pick one!",
];

export type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  role: string;
  thumb: string;
  tags: string[];
  summary: string;
  problem: string;
  outcome: string;
  highlights?: string[];
  imageNote?: string;
  kind: "client" | "concept";
  /** Hidden from the site until its images are in place. */
  draft?: boolean;
  images: { src: string; alt: string }[];
  liveUrl?: string;
};

const ALL_PROJECTS: Project[] = [
  {
    id: "mylocalguide",
    kind: "concept",
    title: "MyLocalGuide",
    type: "Travel app",
    year: "2025",
    role: "Product Designer",
    thumb: "/images/home/mylocalguide-card.png",
    tags: ["Design system", "Mobile UI", "0→1", "Travel"],
    summary:
      "MyLocalGuide helps travellers find authentic local experiences in the city they're visiting: not the ten photos everyone already has, but the walk, the terrace, the passage a local would actually send you.",
    problem:
      "Most travel apps optimise for booking volume: the same ranked list of \"top attractions\" in every city. I designed for curiosity instead, a product that feels like a well-travelled friend texting you a recommendation.",
    highlights: [
      "Built the UI kit and the product side by side, so every component was validated against real screens.",
      "Immersive, full-bleed login and onboarding: the first screen sets the tone.",
      "Discovery built around curated spots and city collections instead of a generic search bar.",
      "A map view for browsing spots by area, so exploring a neighborhood doesn't mean scrolling a list.",
    ],
    outcome:
      "Validated the core premise with a 25-person survey before locking the MVP scope. Usability test scenarios are written; sessions are the next step before refining the screens further.",
    images: [
      { src: "/images/mywork/mylocalguide-1.png", alt: "MyLocalGuide: onboarding" },
      { src: "/images/mywork/mylocalguide-2.png", alt: "MyLocalGuide: discover" },
      { src: "/images/mywork/mylocalguide-3.png", alt: "MyLocalGuide: checkout" },
      { src: "/images/mywork/mylocalguide-system.png", alt: "MyLocalGuide design system: colours, typography, spacing, radius, shadows and components" },
    ],
  },
  {
    id: "nolimits",
    kind: "client",
    title: "NoLimits",
    type: "Coaching app",
    year: "2025",
    role: "Product Designer (solo)",
    thumb: "/images/mywork/nolimits-editor.png",
    tags: ["Product design", "Mobile app", "Web dashboard", "Design system", "Prototyping"],
    summary:
      "A premium online coaching app that trains the body and supports the mind, for athletes who want more than workouts. I designed the athlete app and the coach panel for a real coaching business.",
    problem:
      "NoLimits coaches run everything through WhatsApp and Instagram, with training plans in Excel. Plans get buried in chat threads and progress isn't tracked anywhere consistent. I felt it first-hand as a client, so I proposed an app.",
    highlights: [
      "Packages shape the product: three tiers, each unlocking the sections that belong to it.",
      "WhatsApp stays for the community; the app takes over plans, tracking and history.",
      "One exercise per screen, and the diet follows the day (Day ON / Day OFF).",
      "A Mind module: sleep and energy check-ins on a 1-5 scale, from a notification or a lockscreen widget.",
      "Three visual directions; I rejected a redesign that drifted from the original design system and rebuilt it with the existing components.",
    ],
    outcome:
      "17 athlete screens, a coach panel with 10 web sections plus mobile equivalents, and a prototype with 436 links across three Figma pages. The NoLimits team appreciated the design and the features a lot, and user testing is now being prepared. Accessibility gaps are documented (9-10px labels, tap targets under 44pt) to fix before a build.",
    imageNote:
      "The interface is in Italian because NoLimits' athletes and coaches are Italian-speaking. Captions are in English.",
    images: [
      { src: "/images/mywork/nolimits-app.png", alt: "Athlete app: Home, Workout, Mind and plan selection" },
      { src: "/images/mywork/nolimits-editor.png", alt: "Coach panel: workout editor with muscle body map" },
      { src: "/images/mywork/nolimits-dashboard.png", alt: "Coach panel: dashboard" },
      { src: "/images/mywork/nolimits-iterazioni.png", alt: "The visual iterations of the screens" },
    ],
  },
  {
    id: "fenwick",
    kind: "concept",
    title: "Fenwick",
    type: "B2B dashboard",
    year: "2026",
    role: "Product Designer",
    thumb: "/images/home/fenwick-card-image2.png",
    tags: ["SaaS", "Dashboards", "B2B", "0→1"],
    summary:
      "An expense-approval dashboard for managers and finance teams, built to surface the context a manager needs (budget left, category, urgency) at the moment of the decision.",
    problem:
      "Fenwick grew from 60 to 200 people in 18 months. Approvals still ran through Slack threads and shared spreadsheets, averaging 4 days, and 15% of requests got lost entirely.",
    highlights: [
      "A queue that leads with signal, not chronology: over-budget and urgent requests are flagged first.",
      "Team budget context (spent vs. total) shown inside each request.",
      "A request history view to spot a requester's patterns at a glance.",
      "Light/dark theme with two switchable palettes.",
    ],
    outcome:
      "A working prototype covering the full manager decision loop, designed to cut approval time from 4 days to under 24 hours. Tested with mock data at realistic scale: 9 queued requests and a 20-request history.",
    images: [
      { src: "/images/mywork/fenwick-1.png", alt: "Fenwick: expense detail" },
      { src: "/images/mywork/fenwick-2.png", alt: "Fenwick: approvals queue" },
      { src: "/images/mywork/fenwick-3.png", alt: "Fenwick: budget overview" },
    ],
    liveUrl: "https://fenwick-expense-tool-ldg.vercel.app",
  },
  {
    id: "mira",
    kind: "client",
    title: "MIRA",
    type: "E-commerce",
    year: "2026",
    role: "Lead UX/UI designer (sole designer)",
    thumb: "/images/mywork/mira-hero.png",
    tags: ["E-commerce", "Design system", "Web + mobile", "Developer handoff"],
    summary:
      "I took an independent Italian clothing brand from an Instagram profile to a complete, developer-ready e-commerce design: brand analysis, design system, 8 page types for web and mobile, and a purchase flow built for Shopify.",
    problem:
      "MIRA sells small drops of tailored clothing. The founders had a strong identity on Instagram and nothing else: no site, no domain, no product data. The store had to sell the clothes and tell the story of the project, and launch in step with their releases.",
    highlights: [
      "Minimal product cards over editorial ones: two directions designed, the client chose the quiet grid that lets the photography lead.",
      "Fixed a contrast failure (about 2.1:1 on light photos) with blur and a text halo, keeping the look the client approved.",
      "Five concepts to build anticipation before the next drop; the client picked a countdown with an email waitlist.",
      "Mobile behaviour agreed page by page: full-screen menu, header that turns solid on scroll, bottom sheets, sticky add-to-cart bar.",
      "Compared 7 platforms and recommended Shopify Basic, with a checkout that follows its native structure.",
    ],
    outcome:
      "A complete clickable prototype of the whole purchase flow on web and mobile, and a developer handoff spec revised four times. Structure, card direction, lookbook, product page and checkout were approved by the client on 29 September. The site is not live yet, so there are no launch metrics.",
    imageNote:
      "The client is Italian, so the interface is in Italian. A language selector (IT / EN) is part of the header.",
    images: [
      { src: "/images/mywork/mira-hero.png", alt: "Home page on web and mobile: brand signature and full-bleed photography" },
      { src: "/images/mywork/mira-system.png", alt: "Design system: palette, type, buttons, cards, header, footer, size chips and input fields" },
      { src: "/images/mywork/mira-cards.png", alt: "Minimal product card: image only, details on hover or when fully in view on mobile" },
      { src: "/images/mywork/mira-contrast.png", alt: "Overlay opacity tests from 88% to 40%, and the final fix: 40% with a background blur and a text halo" },
      { src: "/images/mywork/mira-next-drop.png", alt: "The chosen pre-launch concept: a countdown with an email waitlist, on the home page and above the shop grid" },
      { src: "/images/mywork/mira-product.png", alt: "Made-to-measure product page with a size guide and a custom-measurements form; sold-out sizes are crossed by a slanted line" },
      { src: "/images/mywork/mira-checkout.png", alt: "Purchase flow: cart drawer, checkout following Shopify's native structure, and order confirmation" },
      // Still to add: mobile rules (menu, solid header, bottom sheet, sticky bar).
    ],
  },
];

export const PROJECTS = ALL_PROJECTS.filter((p) => !p.draft);

// The region map: my journey
export const ROUTE = [
  {
    year: "2018",
    place: "Garage",
    title: "Mechanic",
    text: "I started fixing cars. I learned to diagnose by listening for what's actually wrong, not what's easiest to blame.",
    x: 30,
    y: 62,
  },
  {
    year: "2025",
    place: "Espresso Port",
    title: "Barista in Toronto",
    text: "I moved to Toronto and pulled espresso for a living. I learned how much a good system matters with ninety seconds and a line out the door.",
    x: 60,
    y: 74,
  },
  {
    year: "2026",
    place: "Design Town",
    title: "Product Designer",
    text: "I taught myself design and front-end by building real things: a travel app, a coaching brand, a B2B dashboard.",
    x: 96,
    y: 50,
  },
  {
    year: "Now",
    place: "Next Stop",
    title: "Looking for the next problem",
    text: "Open to product design roles: in-house, agency or research-leaning. Early career, but not new to figuring things out under pressure.",
    x: 124,
    y: 28,
  },
];

// Stats (placeholder values to tweak, 0-100)
export const STATS = [
  { label: "Figma", value: 92 },
  { label: "Vibecoding", value: 80 },
  { label: "AI · Claude", value: 88 },
  { label: "Design system", value: 76 },
  { label: "Research", value: 64 },
  { label: "Prototyping", value: 88 },
];

export const CARD_FIELDS = [
  { label: "ROLE", value: "Designer" },
  { label: "SINCE", value: "2026" },
  { label: "PROJECTS", value: String(PROJECTS.length) },
];

export const BAG_ITEMS = [
  {
    id: "email",
    label: "EMAIL",
    desc: `Write to ${PROFILE.email}. I reply fast, promise.`,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    desc: "My professional profile: experience, journey and contacts.",
  },
  {
    id: "cv",
    label: "CV (PDF)",
    desc: "Download my CV as a PDF: a TM you can use right away.",
  },
] as const;

export const NPC_LINES = {
  prof: [
    "Prof: Welcome to my lab!",
    "Prof: There are 3 POKé BALLS on the table. Stand in front of one and press A!",
  ],
  rival: ["Rival: I already chose. Actually, I looked at all three!"],
  assistant: ["Assistant: The fastest portfolio in Kanto... and beyond."],
  machine: ["A mysterious machine. Better not touch it."],
};

// Library: each passion is a book. The cover carries the title, the pages are photos and videos.
// To add pages, drop the files in public/media/hobbies/<slug>/ and list them in `pages`.
export type HobbyPage = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  /** Video only: a still shown before it plays. */
  poster?: string;
};

export type Hobby = {
  title: string;
  cover: string[];
  color: string;
  ink: string;
  pages: HobbyPage[];
};

export const HOBBIES: Hobby[] = [
  {
    title: "Travel",
    cover: ["TRAVEL"],
    color: "#1f8a8a",
    ink: "#f4f2f8",
    pages: [
      { type: "image", src: "/media/hobbies/travel/barcelona.jpg", alt: "Barcelona", caption: "Barcelona" },
      { type: "video", src: "/media/hobbies/travel/niagara-falls.mp4", poster: "/media/hobbies/travel/niagara-falls-poster.jpg", alt: "Niagara Falls", caption: "Niagara Falls" },
      { type: "image", src: "/media/hobbies/travel/bangkok.jpg", alt: "Bangkok", caption: "Bangkok" },
      { type: "image", src: "/media/hobbies/travel/mexico-city.jpg", alt: "Mexico City", caption: "Mexico City" },
      { type: "image", src: "/media/hobbies/travel/los-angeles.jpg", alt: "Los Angeles", caption: "Los Angeles" },
      { type: "image", src: "/media/hobbies/travel/paris.jpg", alt: "Paris", caption: "Paris" },
      { type: "image", src: "/media/hobbies/travel/toronto.jpg", alt: "Toronto", caption: "Toronto" },
      { type: "image", src: "/media/hobbies/travel/philadelphia.jpg", alt: "Philadelphia", caption: "Philadelphia" },
      { type: "image", src: "/media/hobbies/travel/ko-samui.jpg", alt: "Ko Samui", caption: "Ko Samui" },
      { type: "image", src: "/media/hobbies/travel/new-york.jpg", alt: "New York", caption: "New York" },
    ],
  },
  { title: "Sport", cover: ["SPORT"], color: "#2f7d4f", ink: "#f4f2f8", pages: [] },
  { title: "Tech", cover: ["TECH"], color: "#2f5ea8", ink: "#f4f2f8", pages: [] },
  { title: "Music", cover: ["MUSIC"], color: "#7a3b8a", ink: "#f4f2f8", pages: [] },
  { title: "Breakdancing", cover: ["BREAK-", "DANCING"], color: "#d9622b", ink: "#2a2438", pages: [] },
  { title: "Cinema", cover: ["CINEMA"], color: "#a8222a", ink: "#f4f2f8", pages: [] },
  { title: "Food", cover: ["FOOD"], color: "#e0b02a", ink: "#2a2438", pages: [] },
];
