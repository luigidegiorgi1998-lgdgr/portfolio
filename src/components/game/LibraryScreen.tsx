"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HOBBIES } from "@/content";
import { useGamepad } from "./controls";
import { CancelButton } from "./ui";

type Hobby = (typeof HOBBIES)[number];

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
  const [cols, setCols] = useState(3);
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = grid.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCols(el.clientWidth >= 520 ? 3 : 2));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const n = HOBBIES.length;
  useGamepad({
    onDir: (d) => {
      if (open) return;
      if (d === "left") setSel((v) => Math.max(0, v - 1));
      if (d === "right") setSel((v) => Math.min(n - 1, v + 1));
      if (d === "up") setSel((v) => (v - cols >= 0 ? v - cols : v));
      if (d === "down") setSel((v) => (v + cols < n ? v + cols : v));
    },
    onA: () => setOpen((o) => !o),
    onB: () => (open ? setOpen(false) : onBack()),
  });

  const cur = HOBBIES[sel];
  return (
    <div className="absolute inset-0 flex flex-col font-pixel text-[#f4f2f8]" style={{ background: "repeating-linear-gradient(90deg,#4a3324 0 2.4cqw,#3f2b1e 2.4cqw 4.8cqw)" }}>
      <p className="px-[3cqw] pt-[2.5cqw]" style={{ fontSize: "clamp(8px, 2cqw, 18px)" }}>LIBRARY · MY PASSIONS</p>

      <ul ref={grid} className="grid flex-1 grid-cols-2 content-center gap-x-[3cqw] gap-y-[4.5cqw] px-[4cqw] pb-[3cqw] pt-[4.5cqw] @lg:grid-cols-3" role="listbox" aria-label="My passions">
        {HOBBIES.map((h, i) => (
          <li key={h.title} role="none" className="relative mx-auto aspect-[3/4] w-[58%] max-w-[170px] @lg:w-[46%]">
            <motion.button
              role="option"
              aria-selected={sel === i}
              aria-label={h.title}
              onClick={() => (sel === i ? setOpen(true) : setSel(i))}
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
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-[2cqw] bg-black/70 pb-[6cqw]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="aspect-[3/4] w-[26cqw] max-w-[260px]"
              initial={{ scale: 0.6, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <Cover h={cur} big />
            </motion.div>
            <p style={{ fontSize: "clamp(8px, 1.8cqw, 16px)" }}>B · PUT IT BACK</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
