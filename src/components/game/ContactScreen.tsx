"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BAG_ITEMS, PROFILE } from "@/content";
import { useGamepad } from "./controls";
import { CancelButton } from "./ui";

function Bag() {
  return (
    <svg viewBox="0 0 32 32" className="w-full" style={{ imageRendering: "pixelated" }} aria-hidden>
      <rect x="9" y="3" width="14" height="4" fill="#c9a22a" />
      <rect x="6" y="7" width="20" height="21" fill="#f0c93a" />
      <rect x="6" y="7" width="20" height="3" fill="#fbe27a" />
      <rect x="9" y="14" width="14" height="8" fill="#d9a920" />
      <rect x="11" y="16" width="10" height="2" fill="#7a5a10" />
      <rect x="4" y="12" width="3" height="10" fill="#e08a30" />
      <rect x="25" y="12" width="3" height="10" fill="#e08a30" />
      <rect x="8" y="28" width="16" height="2" fill="#3a3a58" />
    </svg>
  );
}

function openItem(id: string) {
  if (id === "email") window.location.href = `mailto:${PROFILE.email}`;
  if (id === "linkedin") window.open(PROFILE.linkedin, "_blank", "noopener,noreferrer");
  if (id === "cv") {
    const a = document.createElement("a");
    a.href = PROFILE.cv;
    a.download = "luigi-de-giorgi-cv.pdf";
    a.click();
  }
}

export default function ContactScreen({ onBack }: { onBack: () => void }) {
  const [sel, setSel] = useState(0);
  const total = BAG_ITEMS.length + 1; // + CANCEL
  const act = (i: number) => (i < BAG_ITEMS.length ? openItem(BAG_ITEMS[i].id) : onBack());

  useGamepad({
    onDir: (d) => {
      if (d === "down") setSel((v) => (v + 1) % total);
      if (d === "up") setSel((v) => (v + total - 1) % total);
    },
    onA: () => act(sel),
    onB: onBack,
  });

  const desc = sel < BAG_ITEMS.length ? BAG_ITEMS[sel].desc : "Back to the lab.";
  return (
    <div className="absolute inset-0 flex flex-col bg-[#1d6f78] font-pixel" style={{ background: "repeating-linear-gradient(0deg,#2a8a94 0 1.2cqw,#1d6f78 1.2cqw 2.4cqw)" }}>
      <div className="grid flex-1 grid-cols-[34%_1fr] gap-[2cqw] p-[2.5cqw]">
        <motion.div className="flex flex-col items-center rounded-[1.5cqw] border-[0.7cqw] border-[#c9701c] bg-[#f0a45a] p-[1.5cqw] text-[#2a2438]" style={{ fontSize: "clamp(8px, 2.4cqw, 20px)" }} initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <p className="rounded bg-[#c9701c] px-2 py-1 text-[#fff4e0]">◀ CONTACT ▶</p>
          <motion.div className="mt-[2cqw] w-[70%]" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
            <Bag />
          </motion.div>
        </motion.div>
        <motion.ul className="flex flex-col justify-center gap-[1cqw] rounded-[1.5cqw] border-[0.7cqw] border-[#c9a22a] bg-[#fdf1c8] p-[2cqw] text-[#2a2438]" style={{ fontSize: "clamp(8px, 2.2cqw, 20px)" }} initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} role="menu">
          {[...BAG_ITEMS.map((b) => b.label), "CANCEL"].map((label, i) => (
            <li key={label} role="none">
              <button role="menuitem" onClick={() => (sel === i ? act(i) : setSel(i))} onMouseEnter={() => setSel(i)} className="flex w-full items-center gap-[1.5cqw] py-[1cqw] text-left">
                <span className={`w-[1.5em] text-[#c0392b] ${sel === i ? "" : "invisible"}`}>▶</span>
                <span className="flex-1">{label}</span>
                {i < BAG_ITEMS.length && <span className="text-[#7a7a98]">×1</span>}
              </button>
            </li>
          ))}
        </motion.ul>
      </div>
      <div className="flex items-center gap-[2cqw] bg-[#2a6fc4] p-[2.5cqw]">
        <div className="flex-1 rounded-[1.2cqw] border-[0.7cqw] border-[#f4f2f8] bg-[#2a6fc4] leading-[1.8] text-[#f4f2f8]" style={{ fontSize: "clamp(8px, 1.9cqw, 18px)", minHeight: "9cqw", padding: "1.6cqw 2.2cqw" }} aria-live="polite">
          {desc}
        </div>
        <CancelButton onClick={onBack} />
      </div>
    </div>
  );
}
