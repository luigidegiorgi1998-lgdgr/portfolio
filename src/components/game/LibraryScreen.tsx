"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HOBBIES, type Hobby } from "@/content";
import { useGamepad } from "./controls";
import { CancelButton } from "./ui";

function Cover({ h, big = false }: { h: Hobby; big?: boolean }) {
  return (
    <div
      className="relative flex h-full w-full overflow-hidden rounded-[0.6cqw] border-[0.35cqw] border-black/40 shadow-[0.8cqw_0.8cqw_0_rgba(0,0,0,0.35)]"
      style={{ background: h.color, color: h.ink }}
    >
      <span className="w-[9%] shrink-0 bg-black/25" aria-hidden />
      <span className="flex flex-1 flex-col items-center justify-center gap-[0.8cqw] px-[0.6cqw] text-center">
        <span className="h-[0.3cqw] w-[55%] bg-current opacity-60" aria-hidden />
        <span className="font-pixel leading-[1.6]" style={{ fontSize: big ? "clamp(14px, 3.6cqw, 34px)" : "clamp(7px, 1.5cqw, 15px)" }}>
          {h.cover.map((l) => (
            <span key={l} className="block">{l}</span>
          ))}
        </span>
        <span className="h-[0.3cqw] w-[55%] bg-current opacity-60" aria-hidden />
      </span>
      <span className="w-[4%] shrink-0 bg-[#f4ecd2]" aria-hidden />
    </div>
  );
}

export default function LibraryScreen({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0); // 0 = cover, 1..n = the book's pages
  const [dir, setDir] = useState(1); // direction of the last page turn
  const [cols, setCols] = useState(4);
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCols(el.clientWidth >= 520 ? 4 : 2));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    grid.current?.children[sel]?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const n = HOBBIES.length;
  const cur = HOBBIES[sel];
  const total = cur.pages.length; // pages after the cover

  const openBook = () => {
    setDir(1);
    setPage(0);
    setOpen(true);
  };
  const turn = (by: number) => {
    const next = Math.min(total, Math.max(0, page + by));
    if (next === page) return;
    setDir(by);
    setPage(next);
  };

  useGamepad({
    onDir: (d) => {
      if (open) {
        if (d === "right" || d === "down") turn(1);
        if (d === "left" || d === "up") turn(-1);
        return;
      }
      if (d === "left") setSel((v) => Math.max(0, v - 1));
      if (d === "right") setSel((v) => Math.min(n - 1, v + 1));
      if (d === "up") setSel((v) => (v - cols >= 0 ? v - cols : v));
      if (d === "down") setSel((v) => (v + cols < n ? v + cols : v));
    },
    onA: () => (open ? turn(1) : openBook()),
    onB: () => (open ? setOpen(false) : onBack()),
  });

  return (
    <div className="absolute inset-0 flex flex-col font-pixel text-[#f4f2f8]" style={{ background: "repeating-linear-gradient(90deg,#4a3324 0 2.4cqw,#3f2b1e 2.4cqw 4.8cqw)" }}>
      <p className="px-[3cqw] pt-[2.5cqw]" style={{ fontSize: "clamp(8px, 2cqw, 18px)" }}>LIBRARY · MY PASSIONS</p>

      <ul ref={grid} className="grid min-h-0 flex-1 grid-cols-2 [align-content:safe_center] gap-x-[3cqw] gap-y-[4.5cqw] overflow-y-auto px-[4cqw] pb-[3cqw] pt-[4.5cqw] @lg:grid-cols-4" role="listbox" aria-label="My passions">
        {HOBBIES.map((h, i) => (
          <li key={h.title} role="none" className="relative mx-auto aspect-[3/4] w-[58%] max-w-[170px] @lg:w-[62%]">
            <motion.button
              role="option"
              aria-selected={sel === i}
              aria-label={h.title}
              onClick={() => (sel === i ? openBook() : setSel(i))}
              onMouseEnter={() => setSel(i)}
              className="absolute inset-0 text-left"
              animate={{ opacity: 1, y: sel === i ? "-8%" : 0, scale: sel === i ? 1.06 : 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              initial={{ opacity: 0, y: 20 }}
            >
              <Cover h={h} />
            </motion.button>
            {/* shelf plank under the book */}
            <span className="pointer-events-none absolute -bottom-[1.6cqw] left-[-8%] right-[-8%] h-[1.4cqw] rounded-sm bg-[#2a1b12] shadow-[0_0.6cqw_0_rgba(0,0,0,0.3)]" aria-hidden />
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-[2cqw] p-[2.5cqw] pt-0">
        <div className="flex-1 rounded-[1.2cqw] border-[0.7cqw] border-[#3a3a58] bg-[#f8f8fc] px-[3cqw] py-[1.8cqw] text-[#2a2438]" style={{ fontSize: "clamp(8px, 1.9cqw, 18px)" }} aria-live="polite">
          {cur.title.toUpperCase()} · {sel + 1}/{n}
        </div>
        <CancelButton onClick={onBack} />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="open"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[2cqw] bg-black/75 pb-[3cqw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex w-full items-center justify-center gap-[2cqw] px-[2cqw]">
              <PageButton label="Previous page" disabled={page === 0} onClick={() => turn(-1)}>◀</PageButton>

              <div className="relative aspect-[3/4] w-[52cqw] max-w-[360px] @lg:w-[30cqw]" style={{ perspective: 1000 }}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={page}
                    className="absolute inset-0"
                    style={{ transformOrigin: dir > 0 ? "left center" : "right center" }}
                    initial={{ rotateY: dir > 0 ? 80 : -80, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: dir > 0 ? -80 : 80, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {page === 0 ? <Cover h={cur} big /> : <Sheet p={cur.pages[page - 1]} />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <PageButton label="Next page" disabled={page >= total} onClick={() => turn(1)}>▶</PageButton>
            </div>

            <p aria-live="polite" style={{ fontSize: "clamp(8px, 1.7cqw, 15px)" }}>
              {cur.title.toUpperCase()} · {total === 0 ? "NO PAGES YET" : page === 0 ? `${total} PAGE${total > 1 ? "S" : ""}` : `PAGE ${page}/${total}`}
            </p>
            <button onClick={() => setOpen(false)} className="rounded border-2 border-[#f4f2f8] px-3 py-1.5 hover:bg-white/10" style={{ fontSize: "clamp(8px, 1.7cqw, 15px)" }}>
              B · CLOSE BOOK
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PageButton({ children, label, disabled, onClick }: { children: React.ReactNode; label: string; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="shrink-0 rounded border-2 border-[#f4f2f8] px-[1.6cqw] py-[1.2cqw] text-[#f4f2f8] hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent"
      style={{ fontSize: "clamp(10px, 2.4cqw, 22px)" }}
    >
      {children}
    </button>
  );
}

/** One page of a book: a photo or a video on cream paper, with an optional caption. */
function Sheet({ p }: { p: Hobby["pages"][number] }) {
  return (
    <div className="flex h-full w-full flex-col gap-[1cqw] overflow-hidden rounded-[0.6cqw] border-[0.35cqw] border-black/30 bg-[#f4ecd2] p-[1.4cqw] shadow-[0.8cqw_0.8cqw_0_rgba(0,0,0,0.35)]">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[0.3cqw] bg-[#2a2438]">
        {p.type === "video" ? (
          <video
            src={p.src}
            poster={p.poster}
            controls
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={p.alt}
            className="h-full w-full object-contain"
          />
        ) : (
          <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-contain" />
        )}
      </div>
      {p.caption && (
        <p className="font-sans leading-snug text-[#2a2438]" style={{ fontSize: "clamp(10px, 1.5cqw, 14px)" }}>
          {p.caption}
        </p>
      )}
    </div>
  );
}
