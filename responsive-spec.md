# Responsive spec — portfolio Luigi De Giorgi

Specifica per adattare le 4 pagine del sito a mobile. I riferimenti visivi completi sono nel file Figma, pagina **"Mobile Portfolio"** (4 frame da 375px: Home, My Work, About, Contact). Copia questo file come prompt in Claude Code dopo aver costruito le versioni desktop.

---

## 1. Strategia generale

**Breakpoint**: un solo breakpoint principale a `768px` (Tailwind `md:`). Sotto, layout mobile a colonna singola; sopra, il layout desktop già costruito.

**Container**: padding orizzontale `20px` su mobile (`px-5`) invece di `32px`/`64px` su desktop.

**Nav**: su mobile la barra di navigazione orizzontale diventa un'icona hamburger (☰) a destra del logo. Il menu si apre come overlay/drawer a schermo intero con i 4 link impilati verticalmente, stessa tipografia mono maiuscola del desktop. Nessun mega-menu, nessuna sotto-navigazione.

**Tipografia**: riduzione sistematica dei titoli Anton su mobile — circa il 45-55% della dimensione desktop:

| Elemento | Desktop | Mobile |
|---|---|---|
| Hero H1 (Home) | 68px | 34px |
| H1 (My Work / About / Contact) | 48px | 30-32px |
| H2 sezione | 30px | 24px |
| H3 case study | 20px | 17-18px |
| Body | 16-18px | 15px |

**Bottoni**: su mobile tutti i CTA passano da riga orizzontale a colonna verticale, larghezza piena (`w-full`), mai affiancati.

---

## 2. Home

⚠️ **Breakpoint intermedio verificato**: l'hero (larghezza fissa 480px) e il bento affiancati si rompono visibilmente tra 1024px e 1200px di larghezza finestra — a 1024px il bottone "Let's talk" esce dal contenitore e si sovrappone al bento, il titolo si scontra con le card. A 1200px è ancora leggibile. Per sicurezza, **fai scattare lo stack verticale (hero sopra, bento sotto) a `1100px`**, non al breakpoint mobile standard di 768px usato per il resto del sito. Sotto i 1100px l'hero deve passare a `w-full` (non più 480px fissi) prima ancora di impilarsi, così non c'è un intervallo dove il layout è già compresso ma non ancora impilato.

```jsx
// Home: breakpoint dedicato più alto del resto del sito
<div className="flex flex-col min-[1100px]:flex-row gap-8 min-[1100px]:gap-16 px-5 md:px-16 py-12 md:py-24">
  <section className="w-full min-[1100px]:w-[480px]">{/* hero */}</section>
  <div className="w-full min-[1100px]:flex-1">{/* bento grid */}</div>
</div>
```

- **Bento**: da griglia 2 colonne a **colonna singola** — tutte le card (MyLocalGuide, Fenwick, NoLimits, On the shelf, About) impilate, ognuna a piena larghezza. Le card immagine (MyLocalGuide, Fenwick, NoLimits) mantengono lo sfondo scuro con overlay testo, altezza ridotta (~160-220px invece di 188-276px).
- **Tag "On the shelf"**: wrap su più righe, nessun problema di overflow essendo già `flex-wrap`.

## 3. My Work

- **Ogni case study**: da griglia 2 colonne (testo | carosello) a **stack verticale** — eyebrow, titolo, sottotitolo, riga Role/Year, tag, descrizione, (link prototipo live se presente), poi il carosello, poi Problem/Approach/Outcome impilati uno sotto l'altro (invece che 3 colonne affiancate).
- **Carosello**: stessa logica di swipe orizzontale già definita in `motion-spec.md`, ma il contenitore passa a piena larghezza mobile. Frecce prev/next restano cliccabili ma possono diventare più piccole o nascoste in favore del solo swipe touch su schermi molto stretti (<400px).
- **Role/Year**: da riga a 2 colonne fisse a riga con `gap` ridotto, restano affiancate (c'è spazio).
- **The Approach — "Read more"**: solo su mobile (`<768px`), la lista di bullet in "The Approach" mostra i primi 2 punti, con un link "Read more (N more) ↓" che espande il resto al click. "The Problem" e "The Outcome" restano sempre completi, senza troncamento — sono un paragrafo unico già breve, non ha senso nasconderne parte. Su desktop la lista resta sempre interamente visibile, nessun troncamento.

```jsx
function ApproachList({ items }) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)'); // o equivalente
  const visible = isMobile && !expanded ? items.slice(0, 2) : items;
  const hiddenCount = items.length - 2;

  return (
    <div className="flex flex-col gap-2.5">
      {visible.map((text, i) => (
        <BulletRow key={i} text={text} />
      ))}
      {isMobile && !expanded && hiddenCount > 0 && (
        <button
          onClick={() => setExpanded(true)}
          className="font-mono text-[11px] tracking-widest text-[#6d28d9] uppercase text-left"
        >
          Read more ({hiddenCount} more) ↓
        </button>
      )}
    </div>
  );
}
```

Nessuna animazione elaborata richiesta: un semplice fade/slide-down di 200-250ms sui bullet che compaiono è sufficiente (`AnimatePresence` se si usa Framer Motion, altrimenti una CSS transition su `max-height`/`opacity`).

## 4. About

- **Hero**: da griglia testo+foto affiancati a **stack verticale** — titolo e testo introduttivo, poi la foto sotto (non a fianco), piena larghezza, altezza ridotta (~220px).
- **The route here**: la timeline con bordo sinistro diventa più semplice su mobile — si può mantenere il pallino/bordo o passare a blocchi impilati senza linea verticale (nel Figma mobile ho usato la versione senza linea, più pulita a schermi stretti).
- **How I work**: da 3 colonne a 3 blocchi impilati verticalmente, ognuno con bordo superiore invece che laterale.
- **Skills**: i tag restano in `flex-wrap`, nessun cambiamento strutturale necessario oltre alla larghezza del contenitore.

## 5. Contact

- **Hero**: da due colonne (testo | pulsanti verticali) a **stack verticale** — titolo, testo, poi i 3 pulsanti (Download CV, Email, LinkedIn) impilati a piena larghezza, sempre in colonna anche su desktop quindi qui cambia solo la larghezza del contenitore, non l'orientamento.

---

## 6. Note tecniche per l'implementazione

```jsx
// Esempio pattern Tailwind per il passaggio hero+bento (Home)
<div className="flex flex-col md:flex-row gap-8 md:gap-16 px-5 md:px-16 py-12 md:py-24">
  <section className="w-full md:w-[480px]">{/* hero */}</section>
  <div className="w-full md:flex-1">{/* bento grid */}</div>
</div>

// Bento grid: 1 colonna sotto md, 2 colonne sopra
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">...</div>

// Bottoni hero: colonna piena su mobile, riga su desktop
<div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">...</div>
```

**Menu mobile (hamburger)**: implementare come componente separato con stato `isOpen` (useState), overlay `fixed inset-0` con `z-50`, chiusura su click di un link o sul pulsante di chiusura. Bloccare lo scroll del body quando il menu è aperto (`overflow-hidden` su `<body>`).

**Immagini**: tutte le immagini (screenshot, foto) devono usare `next/image` con `sizes` responsive, non dimensioni fisse — sui mobile frame Figma le altezze indicate (200px per i placeholder carosello, 220px per la foto About) sono un riferimento, non un vincolo rigido: lascia che l'aspect ratio reale dell'immagine determini l'altezza a larghezza piena.

**Test**: dopo l'implementazione, verificare su un viewport reale ≤390px (iPhone standard) che nessun testo venga tagliato e che i caroselli rispondano correttamente al touch/swipe.
