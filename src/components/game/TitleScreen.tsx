"use client";

import { motion } from "framer-motion";
import { PROFILE } from "@/content";
import { useGamepad } from "./controls";
import { PokeballIcon } from "./ui";

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  useGamepad({ onA: onStart });
  return (
    <button
      onClick={onStart}
      className="absolute inset-0 flex flex-col items-center justify-center gap-[3cqw] overflow-hidden bg-[#0e1430] text-center font-pixel text-[#f4f2f8]"
      aria-label="Press to start"
    >
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "repeating-linear-gradient(135deg,#1b2455 0 12px,#0e1430 12px 24px)" }} />
      <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 120, damping: 12 }}>
        <PokeballIcon size={64} />
      </motion.div>
      <motion.h1
        className="relative px-4 leading-[1.5] text-[#ffd23f]"
        style={{ fontSize: "clamp(14px, 6cqw, 52px)", textShadow: "0.5cqw 0.5cqw 0 #2a3a9a" }}
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        PORTFOLIO
        <br />
        VERSION
      </motion.h1>
      <p className="relative" style={{ fontSize: "clamp(8px, 2.6cqw, 22px)" }}>
        {PROFILE.name} · {PROFILE.role}
      </p>
      <motion.p
        className="relative"
        style={{ fontSize: "clamp(9px, 2.8cqw, 24px)" }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        ▶ PRESS START / A
      </motion.p>
    </button>
  );
}
