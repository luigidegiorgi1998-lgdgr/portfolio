"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/content";
import { useGamepad } from "./controls";
import { CancelButton, PokeballIcon } from "./ui";

export default function WorkScreen({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [img, setImg] = useState(0);

  const openProject = (i: number) => {
    setSel(i);
    setImg(0);
    setOpen(i);
  };

  useGamepad({
    onDir: (d) => {
      if (open !== null) {
        if (d === "left" || d === "right") setImg((v) => (v + (d === "right" ? 1 : PROJECTS[open].images.length - 1)) % PROJECTS[open].images.length);
        return;
      }
      if (d === "down" || d === "right") setSel((v) => Math.min(PROJECTS.length - 1, v + 1));
      if (d === "up" || d === "left") setSel((v) => Math.max(0, v - 1));
    },
    onA: () => (open === null ? openProject(sel) : undefined),
    onB: () => (open !== null ? setOpen(null) : onBack()),
  });

  return (
    <div className="absolute inset-0 flex flex-col bg-[#101a2e] font-pixel text-[#f4f2f8]" style={{ background: "repeating-linear-gradient(135deg,#16213a 0 2.4cqw,#101a2e 2.4cqw 4.8cqw)" }}>
      <div className="grid flex-1 grid-cols-1 content-center gap-[2cqw] p-[2.5cqw] @lg:grid-cols-2 @lg:grid-rows-2">
        {PROJECTS.map((p, i) => {
          const active = sel === i;
          return (
            <motion.button
              key={p.id}
              onClick={() => (active ? openProject(i) : setSel(i))}
              initial={{ x: i === 0 ? -60 : 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 160, damping: 18 }}
              className={`flex items-center gap-[2cqw] rounded-[1.5cqw] border-[0.6cqw] p-[1.6cqw] text-left ${i === 0 ? "@lg:row-span-2" : ""} ${active ? "border-[#ffd23f] bg-[#2d4a8a]" : "border-[#5a6a9a] bg-[#2a3552]"}`}
              style={{ fontSize: "clamp(8px, 1.8cqw, 18px)" }}
            >
              <div className="relative aspect-[4/3] h-full max-h-[26cqw] min-h-[44px] shrink-0 overflow-hidden rounded-[1cqw] border-[0.5cqw] border-[#f4f2f8] bg-[#14182a] @lg:max-h-none @lg:h-auto @lg:w-[40%]">
                <Image src={p.thumb} alt="" fill sizes="30vw" className="object-cover" />
                <PokeballIcon size={18} className="absolute left-1 top-1" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate leading-[1.6]">{p.title}</p>
                <p className="leading-[1.6] text-[#ffd23f]">Lv.{p.year}</p>
                <div className="my-[0.8cqw] h-[1.6cqw] min-h-[6px] w-full rounded-full border-[0.4cqw] border-[#14182a] bg-[#14182a]">
                  <motion.div className="h-full rounded-full bg-[#43d36a]" initial={{ width: 0 }} animate={{ width: `${[100, 80, 95][i]}%` }} transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }} />
                </div>
                <p className="leading-[1.6] text-[#c9d4f5]">{p.type}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center gap-[2cqw] p-[2.5cqw] pt-0">
        <div className="flex-1 rounded-[1.2cqw] border-[0.7cqw] border-[#3a3a58] bg-[#f8f8fc] px-[3cqw] py-[1.8cqw] text-[#2a2438]" style={{ fontSize: "clamp(8px, 1.9cqw, 18px)" }}>
          Scegli un progetto.
        </div>
        <CancelButton onClick={onBack} />
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="detail"
            className="absolute inset-0 z-10 flex flex-col overflow-hidden bg-[#f4f2f8] font-sans text-[#2a2438]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.2 }}
          >
            <Detail i={open} img={img} setImg={setImg} onClose={() => setOpen(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Detail({ i, img, setImg, onClose }: { i: number; img: number; setImg: (n: number) => void; onClose: () => void }) {
  const p = PROJECTS[i];
  return (
    <>
      <div className="flex items-center gap-3 border-b-4 border-[#2d4a8a] bg-[#2d4a8a] px-4 py-2 font-pixel text-[#f4f2f8]" style={{ fontSize: "clamp(9px, 2.6cqw, 22px)" }}>
        <PokeballIcon size={18} />
        <span className="truncate">{p.title}</span>
        <span className="ml-auto text-[#ffd23f]">Lv.{p.year}</span>
      </div>
      <div className="grid flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 @lg:grid-cols-[38%_1fr]">
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-4 border-[#2d4a8a] bg-[#14182a]">
            <AnimatePresence mode="wait">
              <motion.div key={img} className="absolute inset-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.15 }}>
                <Image src={p.images[img].src} alt={p.images[img].alt} fill sizes="40vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-2 flex justify-center gap-2" role="tablist">
            {p.images.map((im, n) => (
              <button key={im.src} onClick={() => setImg(n)} aria-label={im.alt} className={`h-3 w-3 rounded-full border-2 border-[#2d4a8a] ${n === img ? "bg-[#2d4a8a]" : "bg-transparent"}`} />
            ))}
          </div>
        </div>
        <div className="space-y-3 text-[clamp(12px,2.2cqw,17px)] leading-relaxed">
          <p className="font-semibold">{p.role} · {p.type}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span key={t} className="rounded bg-[#2d4a8a] px-2 py-0.5 text-[12px] font-semibold text-[#f4f2f8]">{t}</span>
            ))}
          </div>
          <p>{p.summary}</p>
          <p><b>Problema.</b> {p.problem}</p>
          <p><b>Risultato.</b> {p.outcome}</p>
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full bg-[#e0453a] px-4 py-2 font-pixel text-[10px] text-white hover:bg-[#c0392b]">
              ▶ PROTOTIPO LIVE
            </a>
          )}
        </div>
      </div>
      <div className="flex justify-between border-t-4 border-[#2d4a8a] bg-[#e4e1ee] px-4 py-2 font-pixel text-[10px]">
        <span>◀ ▶ cambia immagine</span>
        <button onClick={onClose} className="text-[#c0392b]">B · CHIUDI</button>
      </div>
    </>
  );
}
