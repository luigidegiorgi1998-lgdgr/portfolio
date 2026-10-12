// Tutti i testi del portfolio in un unico file: modificali qui.

export const PROFILE = {
  name: "Luigi De Giorgi",
  role: "Product Designer",
  email: "luigidegiorgi1998@gmail.com",
  linkedin: "https://www.linkedin.com/in/luigi-de-giorgi-6216941b1",
  cv: "/cv/luigi-de-giorgi-cv.pdf",
  portrait: "/images/about/luigi-portrait.png",
};

// Messaggio del Pokédex (una "pagina" per riquadro di testo)
export const POKEDEX_PAGES = [
  "Nuovo messaggio ricevuto dal POKéDEX!",
  "Ciao! Sono LUIGI DE GIORGI, product designer. 8 anni fa ripa- ravo auto. L'anno scorso preparavo caffè a Toronto.",
  "Oggi progetto prodotti digitali: app, brand e dashboard. Ho imparato design e front-end costruendo cose vere.",
  "Nel laboratorio ci sono 3 POKéBALL: i miei LAVORI, la mia STORIA e i miei CONTATTI. Scegline una!",
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
  images: { src: string; alt: string }[];
  liveUrl?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "mylocalguide",
    title: "MyLocalGuide",
    type: "App di viaggio",
    year: "2025",
    role: "Product Designer",
    thumb: "/images/home/mylocalguide-card.png",
    tags: ["Design system", "Mobile UI", "0→1"],
    summary:
      "Un'app che aiuta i viaggiatori a trovare le parti di una città che non finiscono nelle guide: la passeggiata, la terrazza, il passaggio che un local ti consiglierebbe davvero.",
    problem:
      "Le app di viaggio ottimizzano le prenotazioni: la stessa lista di \"top attrazioni\" in ogni città. Ho progettato per la curiosità, come un amico che gira il mondo e ti scrive un consiglio.",
    outcome:
      "Premessa validata con un sondaggio su 25 persone prima di fissare l'MVP. Gli scenari di usability test sono pronti: le sessioni sono il prossimo passo.",
    images: [
      { src: "/images/mywork/mylocalguide-1.png", alt: "MyLocalGuide: onboarding" },
      { src: "/images/mywork/mylocalguide-2.png", alt: "MyLocalGuide: scoperta" },
      { src: "/images/mywork/mylocalguide-3.png", alt: "MyLocalGuide: checkout" },
    ],
  },
  {
    id: "nolimits",
    title: "NoLimits",
    type: "App di coaching",
    year: "2025",
    role: "Product Designer (solo)",
    thumb: "/images/home/nolimits-home.png",
    tags: ["Product design", "App mobile", "Dashboard web", "Design system", "Prototipo"],
    summary:
      "Un'app di coaching premium che allena il corpo e cura la mente. Ho progettato l'app atleta e il pannello coach (web e mobile) per un vero business di coaching di cui sono cliente.",
    problem:
      "I coach gestiscono tutto tra WhatsApp e Instagram, con le schede in Excel: i piani si perdono nelle chat e i progressi non sono tracciati in modo coerente. L'ho vissuto da cliente e ho proposto un'app.",
    highlights: [
      "Tre pacchetti, tre livelli di accesso: ogni piano sblocca le sezioni che gli appartengono.",
      "WhatsApp resta per la community; l'app gestisce piani, tracking e storico.",
      "Un esercizio per schermata, e la dieta segue il giorno (Day ON / Day OFF).",
      "Modulo Mind: check-in di sonno e energia da 1 a 5, da notifica o widget.",
      "Tre direzioni visive: ho scartato un redesign troppo lontano dal design system originale e ricostruito le schermate con i suoi componenti.",
    ],
    outcome:
      "17 schermate atleta, 10 sezioni del pannello coach web con equivalenti mobile e un prototipo con 436 collegamenti su tre pagine Figma. Design e funzionalità approvati dai coach; il passo successivo sono i test con atleti e coach. Accessibilità documentata: label da 9-10px e target sotto i 44pt da correggere prima dello sviluppo.",
    images: [
      { src: "/images/mywork/nolimits-1.png", alt: "NoLimits: esercizio" },
      { src: "/images/mywork/nolimits-2.png", alt: "NoLimits: home" },
      { src: "/images/mywork/nolimits-3.png", alt: "NoLimits: piano alimentare" },
    ],
  },
  {
    id: "fenwick",
    title: "Fenwick",
    type: "Dashboard B2B",
    year: "2026",
    role: "Product Designer",
    thumb: "/images/home/fenwick-card-image2.png",
    tags: ["SaaS", "Dashboard", "0→1"],
    summary:
      "Dashboard di approvazione spese: mostra a manager e finance il contesto giusto (budget residuo, categoria, urgenza) nel momento della decisione.",
    problem:
      "Fenwick è passata da 60 a 200 persone in 18 mesi. Le approvazioni viaggiavano su Slack e fogli condivisi: 4 giorni in media, e il 15% delle richieste andava perso.",
    outcome:
      "Prototipo funzionante dell'intero ciclo decisionale, progettato per portare i tempi da 4 giorni a meno di 24 ore. Tema chiaro/scuro con due palette.",
    images: [
      { src: "/images/mywork/fenwick-1.png", alt: "Fenwick: dettaglio spesa" },
      { src: "/images/mywork/fenwick-2.png", alt: "Fenwick: coda approvazioni" },
      { src: "/images/mywork/fenwick-3.png", alt: "Fenwick: budget" },
    ],
    liveUrl: "https://fenwick-expense-tool-ldg.vercel.app",
  },
];

// Mappa della "regione": il mio percorso
export const ROUTE = [
  {
    year: "2018",
    place: "Officina",
    title: "Meccanico",
    text: "Ho iniziato riparando auto. Ho imparato a diagnosticare ascoltando cosa non va davvero, non cosa è più comodo incolpare.",
    x: 26,
    y: 70,
  },
  {
    year: "2025",
    place: "Porto Espresso",
    title: "Barista a Toronto",
    text: "Mi sono trasferito a Toronto e ho fatto caffè. Ho capito quanto conta un buon sistema quando hai 90 secondi e la fila fuori.",
    x: 60,
    y: 78,
  },
  {
    year: "2026",
    place: "Borgo Design",
    title: "Product Designer",
    text: "Ho imparato design e front-end costruendo cose vere: un'app di viaggio, un brand di coaching, una dashboard B2B.",
    x: 98,
    y: 42,
  },
  {
    year: "Ora",
    place: "Prossima Tappa",
    title: "In cerca del prossimo problema",
    text: "Aperto a ruoli di product design: in-house, agenzia o research. A inizio carriera, ma non nuovo a cavarmela sotto pressione.",
    x: 126,
    y: 24,
  },
];

// Statistiche (segnaposto: valori da ritoccare a piacere, 0-100)
export const STATS = [
  { label: "Prodotto", value: 82 },
  { label: "Sistemi", value: 76 },
  { label: "Prototipi", value: 88 },
  { label: "Ricerca", value: 64 },
  { label: "Figma", value: 92 },
  { label: "AI", value: 85 },
];

export const CARD_FIELDS = [
  { label: "RUOLO", value: "Designer" },
  { label: "DAL", value: "2018" },
  { label: "PROGETTI", value: "3" },
];

export const BAG_ITEMS = [
  {
    id: "email",
    label: "EMAIL",
    desc: `Scrivimi a ${PROFILE.email}. Rispondo in fretta, promesso.`,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    desc: "Il mio profilo professionale: esperienze, percorso e contatti.",
  },
  {
    id: "cv",
    label: "CV (PDF)",
    desc: "Scarica il mio curriculum in PDF: una MT da usare subito.",
  },
] as const;

export const NPC_LINES = {
  prof: [
    "Prof: Benvenuto nel mio laboratorio!",
    "Prof: Sul tavolo ci sono 3 POKéBALL. Mettiti davanti a una e premi A!",
  ],
  rival: ["Rivale: Io ho già scelto. Anzi, le ho guardate tutte e tre!"],
  assistant: ["Assistente: Il portfolio più veloce di Kanto... e dintorni."],
  machine: ["Un macchinario misterioso. Meglio non toccare."],
};
