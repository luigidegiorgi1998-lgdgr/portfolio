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
  images: { src: string; alt: string }[];
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "mylocalguide",
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
    ],
  },
  {
    id: "nolimits",
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
      "17 athlete screens, a coach panel with 10 web sections plus mobile equivalents, and a prototype with 436 links across three Figma pages. Design and features approved by the coaches; user trials come next. Accessibility gaps are documented (9-10px labels, tap targets under 44pt) to fix before a build.",
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
];

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
  { label: "Product", value: 82 },
  { label: "Systems", value: 76 },
  { label: "Prototype", value: 88 },
  { label: "Research", value: 64 },
  { label: "Figma", value: 92 },
  { label: "AI", value: 85 },
];

export const CARD_FIELDS = [
  { label: "ROLE", value: "Designer" },
  { label: "SINCE", value: "2018" },
  { label: "PROJECTS", value: "3" },
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
