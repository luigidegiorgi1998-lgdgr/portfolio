"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { POKEDEX_PAGES, PROFILE } from "@/content";
import { useGamepad } from "./controls";
import { DialogBox, useTypewriter } from "./ui";

export default function PokedexMessage({ onDone }: { onDone: () => void }) {
  const [page, setPage] = useState(0);
  const tw = useTypewriter(POKEDEX_PAGES[page]);
  const advance = () => {
    if (!tw.done) return tw.finish();
    if (page < POKEDEX_PAGES.length - 1) setPage(page + 1);
    else onDone();
  };
  useGamepad({ onA: advance, onB: advance });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-stretch justify-center gap-[2.5cqw] bg-[#b3261e] p-[3cqw] font-pixel"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 140, damping: 20 }}
      onClick={advance}
    >
      <div className="flex items-center gap-[2cqw] text-[#f4f2f8]" style={{ fontSize: "clamp(8px, 2.4cqw, 20px)" }}>
        <motion.span
          className="inline-block h-[5cqw] w-[5cqw] min-h-4 min-w-4 rounded-full border-[0.5cqw] border-[#f4f2f8] bg-[#4fc3f7]"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
        <span>POKéDEX · MESSAGGIO</span>
        <span className="ml-auto opacity-70">{page + 1}/{POKEDEX_PAGES.length}</span>
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-end gap-[2cqw] overflow-hidden rounded-[1.5cqw] border-[0.8cqw] border-[#3a0e0b] bg-[#1c2b2e] p-[2cqw] shadow-[inset_0_0_3cqw_#000]">
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(0deg,#000 0 1px,transparent 1px 3px)" }} />
        <div className="relative min-h-0 flex-1 aspect-[4/5] overflow-hidden rounded-[1cqw] border-[0.5cqw] border-[#4fc3f7]/60">
          <Image src={PROFILE.portrait} alt="" fill sizes="30vw" className="object-cover opacity-80 grayscale sepia-[.6] hue-rotate-[70deg]" />
        </div>
        <DialogBox text={tw.shown} done={tw.done} className="w-full" />
      </div>
    </motion.div>
  );
}
