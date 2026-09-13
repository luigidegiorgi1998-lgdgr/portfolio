# Motion spec — portfolio Luigi De Giorgi

Specifica tecnica per le transizioni tra pagine e il cursore personalizzato. Copia questo file come primo prompt in Claude Code per implementarli nel sito (Next.js/React).

---

## 1. Transizioni tra pagine

Due comportamenti distinti, a seconda del tipo di navigazione.

### 1a. Shared element (Home → case study specifico in My Work)

Quando l'utente clicca una card progetto in Home (MyLocalGuide, Fenwick, NoLimits), il titolo del progetto deve trasformarsi in modo fluido nell'headline della sezione corrispondente in My Work — stesso elemento visivo che si muove e cambia dimensione, non due animazioni indipendenti.

**Implementazione**: View Transitions API nativa del browser.

```css
/* Sul titolo della card in Home */
.home-card-title--mylocalguide {
  view-transition-name: title-mylocalguide;
}

/* Sull'headline della sezione corrispondente in My Work */
.mywork-heading--mylocalguide {
  view-transition-name: title-mylocalguide;
}
```

Ripetere lo stesso pattern per Fenwick (`title-fenwick`) e NoLimits (`title-nolimits`). Ogni `view-transition-name` deve essere univoco nel documento e presente su un solo elemento per volta.

Se il routing è gestito da Next.js App Router, avvolgere la navigazione con `document.startViewTransition()`:

```js
function navigateToCaseStudy(href) {
  if (!document.startViewTransition) {
    router.push(href);
    return;
  }
  document.startViewTransition(() => {
    router.push(href);
  });
}
```

Durata/easing di default del browser vanno bene; se serve controllo fine, usare `::view-transition-group(title-mylocalguide)` in CSS per impostare `animation-duration` e `animation-timing-function` custom (consigliato: 400ms, `cubic-bezier(0.4, 0, 0.2, 1)`).

### 1b. Micro-motion in ingresso (tutte le altre navigazioni)

Nessuna transizione tra la pagina uscente e quella entrante — il cambio è istantaneo. Al caricamento della nuova pagina, gli elementi principali dell'header/hero entrano con un piccolo stagger:

- L'eyebrow (label mono maiuscola) parte da `opacity: 0; transform: translateY(8px)` e arriva a `opacity: 1; transform: translateY(0)` in 300ms, easing `ease-out`.
- Il titolo segue con lo stesso movimento, ma con un ritardo di 80ms rispetto all'eyebrow.

Esempio con CSS puro:

```css
@keyframes enter-up {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.page-eyebrow {
  animation: enter-up 0.3s ease-out both;
}

.page-title {
  animation: enter-up 0.3s ease-out 0.08s both;
}
```

Se il sito usa Framer Motion, equivalente:

```jsx
<motion.p
  className="page-eyebrow"
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {eyebrow}
</motion.p>
<motion.h1
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut', delay: 0.08 }}
>
  {title}
</motion.h1>
```

---

## 2. Cursore personalizzato

**Forma**: scia di 6 puntini viola semi-trasparenti che seguono il cursore con un leggero ritardo elastico (ogni puntino insegue quello precedente).

- Colore: `rgba(109, 40, 217, 0.35)` (viola del brand, al 35% di opacità)
- Dimensioni decrescenti: dal puntino più vicino al cursore (10px) al più lontano (5px)
- Fattore di inseguimento: ogni puntino si muove del 35% della distanza dal precedente ad ogni frame (`lerp` factor 0.35)
- Nessuno stato speciale sugli hover di bottoni o link — la scia resta identica ovunque, nessun effetto magnetico sui bottoni (scartato)
- Cursore di sistema nascosto (`cursor: none`) solo su dispositivi con puntatore fine (mouse/trackpad); su touch resta il comportamento nativo

Implementazione di riferimento (vanilla JS, adattabile a un hook React `useCursorTrail`):

```js
function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip su touch

  const DOT_COUNT = 6;
  const dots = Array.from({ length: DOT_COUNT }, (_, i) => {
    const el = document.createElement('div');
    const size = 10 - i;
    el.style.cssText = `
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 9999;
      width: ${size}px; height: ${size}px; border-radius: 50%;
      background: rgba(109, 40, 217, 0.35);
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    document.body.appendChild(el);
    return { el, x: -100, y: -100 };
  });

  let mouseX = -100, mouseY = -100, active = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!active) dots.forEach(d => { d.x = mouseX; d.y = mouseY; });
    active = true;
    dots.forEach(d => { d.el.style.opacity = '1'; });
  });

  document.addEventListener('mouseleave', () => {
    active = false;
    dots.forEach(d => { d.el.style.opacity = '0'; });
  });

  function animate() {
    if (active) {
      let px = mouseX, py = mouseY;
      dots.forEach(d => {
        d.x += (px - d.x) * 0.35;
        d.y += (py - d.y) * 0.35;
        d.el.style.left = `${d.x}px`;
        d.el.style.top = `${d.y}px`;
        px = d.x; py = d.y;
      });
    }
    requestAnimationFrame(animate);
  }
  animate();

  document.body.style.cursor = 'none';
}
```

In React, richiamare `initCursorTrail()` in un `useEffect` a livello di layout root, con cleanup che rimuove i listener e i nodi creati se il componente si smonta.

---

## 3. Caroselli dei case study (MyLocalGuide, NoLimits, Fenwick)

**Stile scelto**: slide orizzontale classica. La slide in arrivo entra da destra spingendo via quella uscente verso sinistra (e viceversa per la freccia "indietro").

- Durata: 400ms, easing `ease` (o `cubic-bezier(0.4, 0, 0.2, 1)` se serve un feel più deciso)
- La slide uscente e quella entrante si muovono in parallelo, nella stessa animazione (non in sequenza)
- Su desktop: click sulle frecce o sui puntini. Su touch: swipe orizzontale con drag reale (non solo i pulsanti) — è il gesto naturale per questo tipo di contenuto ed è quasi gratuito da implementare con Framer Motion (`drag="x"` + `dragConstraints`)

Esempio con Framer Motion (`AnimatePresence` + `custom` per la direzione):

```jsx
const variants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
};

<AnimatePresence initial={false} custom={direction}>
  <motion.div
    key={activeSlide}
    custom={direction}
    variants={variants}
    initial="enter"
    animate="center"
    exit="exit"
    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    drag="x"
    dragConstraints={{ left: 0, right: 0 }}
    onDragEnd={(e, info) => {
      if (info.offset.x < -50) goToNext();
      else if (info.offset.x > 50) goToPrev();
    }}
  >
    {slides[activeSlide]}
  </motion.div>
</AnimatePresence>
```

`direction` è `1` quando si va avanti (freccia destra / swipe verso sinistra) e `-1` quando si va indietro, così la slide entra sempre dal lato coerente col gesto dell'utente.

Rispettare `prefers-reduced-motion`: se l'utente ha impostato la preferenza di sistema per ridurre le animazioni, saltare sia la scia del cursore che le micro-motion di ingresso pagina (mostrare tutto staticamente).

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) return; // skip cursore + entrata animata
```
