"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CARD_FIELDS, PROFILE, ROUTE, STATS } from "@/content";
import { useGamepad } from "./controls";
import { CancelButton } from "./ui";

export default function AboutScreen({ onBack }: { onBack: () => void }) {
  const [node, setNode] = useState(0);
  useGamepad({
    onDir: (d) => {
      if (d === "right" || d === "down") setNode((v) => Math.min(ROUTE.length - 1, v + 1));
      if (d === "left" || d === "up") setNode((v) => Math.max(0, v - 1));
    },
    onB: onBack,
  });
  const cur = ROUTE[node];
  const path = ROUTE.map((n, i) => `${i ? "L" : "M"}${n.x} ${n.y}`).join(" ");

  return (
    <div className="absolute inset-0 flex flex-col overflow-y-auto bg-[#3b6fb0] @lg:overflow-hidden font-pixel text-[#f4f2f8]" style={{ background: "repeating-linear-gradient(135deg,#4a7fc4 0 2.4cqw,#3b6fb0 2.4cqw 4.8cqw)" }}>
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-[2cqw] p-[2.5cqw] @lg:grid-cols-[38%_1fr] @lg:grid-rows-[minmax(0,1fr)]">
        {/* Scheda allenatore */}
        <motion.section
          className="rounded-[1.5cqw] border-[0.7cqw] border-[#2a3a6a] bg-[#e8f0fb] p-[2cqw] text-[#2a2438]"
          style={{ fontSize: "clamp(8px, 1.45cqw, 15px)" }}
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          <p className="rounded bg-[#2a3a6a] px-2 py-1 text-center text-[#f4f2f8]">TRAINER CARD</p>
          <div className="mt-[1.5cqw] flex gap-[2cqw] @lg:flex-col">
            <div className="relative aspect-[4/5] w-[32%] shrink-0 overflow-hidden rounded-[1cqw] border-[0.6cqw] border-[#2a3a6a] bg-[#cfe0f5] @lg:mx-auto @lg:w-[26%]">
              <Image src={PROFILE.portrait} alt={`Portrait of ${PROFILE.name}`} fill sizes="25vw" className="object-cover" priority />
            </div>
            <dl className="min-w-0 flex-1 leading-[1.7]">
              <p className="text-[#c0392b]">{PROFILE.name.toUpperCase()}</p>
              {CARD_FIELDS.map((f) => (
                <div key={f.label} className="flex justify-between gap-2">
                  <dt className="text-[#5a5a7a]">{f.label}</dt>
                  <dd className="truncate">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-[1.5cqw]">
            <p className="mb-[0.6cqw] text-[#c0392b]">STATS</p>
            <ul className="space-y-[0.3cqw]">
              {STATS.map((s, i) => (
                <li key={s.label} className="flex items-center gap-2">
                  <span className="w-[52%] shrink-0 truncate">{s.label}</span>
                  <span className="h-[1.3cqw] min-h-[5px] flex-1 rounded-full bg-[#b8c8e4]">
                    <motion.span className="block h-full rounded-full bg-[#2fb457]" initial={{ width: 0 }} animate={{ width: `${s.value}%` }} transition={{ delay: 0.3 + i * 0.08, duration: 0.7 }} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Map */}
        <div className="flex min-h-0 min-w-0 flex-col gap-[2cqw]">
          <motion.section className="flex min-h-0 flex-1 flex-col rounded-[1.5cqw] border-[0.7cqw] border-[#2a3a6a] bg-[#14182a]/90 p-[2cqw]" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="mb-[1cqw] text-[#ffd23f]" style={{ fontSize: "clamp(8px, 1.6cqw, 15px)" }}>REGION · MY JOURNEY</p>
            <svg viewBox="0 0 156 96" className="h-0 min-h-[90px] w-full flex-1 rounded-[1cqw]" preserveAspectRatio="xMidYMid meet" style={{ imageRendering: "pixelated", background: "#5fae5a" }} role="img" aria-label="Map of my journey: Mechanic, Barista, Product Designer">
              <rect width="156" height="96" fill="#5fae5a" />
              <rect y="60" width="70" height="36" fill="#3f87d8" />
              <rect x="100" y="52" width="56" height="44" fill="#4a7ac0" opacity=".0" />
              {[...Array(16)].map((_, i) => (
                <rect key={i} x={(i * 37) % 150} y={(i * 53) % 90} width="4" height="4" fill="#4d9a4a" />
              ))}
              <path d={path} fill="none" stroke="#c8a860" strokeWidth="5" strokeLinecap="square" strokeLinejoin="round" />
              <motion.path d={path} fill="none" stroke="#f4e4a8" strokeWidth="1.5" strokeDasharray="3 3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }} />
              {ROUTE.map((n, i) => (
                <g key={n.year} onClick={() => setNode(i)} style={{ cursor: "pointer" }}>
                  <rect x={n.x - 5} y={n.y - 5} width="10" height="10" fill={i <= node ? "#e0453a" : "#f4f2f8"} stroke="#2a2438" strokeWidth="1.5" />
                  <text x={n.x} y={n.y + 11} textAnchor={i === 0 ? "start" : i === ROUTE.length - 1 ? "end" : "middle"} fontSize="4" fill="#fff" stroke="#2a2438" strokeWidth="1.2" paintOrder="stroke" fontFamily="var(--font-pixel)">{n.place}</text>
                </g>
              ))}
              <motion.g animate={{ x: cur.x, y: cur.y }} initial={false} transition={{ type: "spring", stiffness: 90, damping: 14 }}>
                <rect x="-4" y="-14" width="8" height="4" fill="#e0332a" />
                <rect x="-3" y="-10" width="6" height="4" fill="#f2c9a0" />
                <rect x="-3" y="-6" width="6" height="3" fill="#f0b02a" />
              </motion.g>
            </svg>
            <div className="mt-[1.5cqw] rounded-[1.2cqw] border-[0.6cqw] border-[#3a3a58] bg-[#f8f8fc] p-[1.8cqw] font-sans text-[#2a2438]" style={{ fontSize: "clamp(11px, 1.7cqw, 16px)" }} aria-live="polite">
              <p className="font-pixel text-[0.8em] text-[#c0392b]">{cur.year} · {cur.title}</p>
              <p className="pt-1 leading-snug">{cur.text}</p>
            </div>
          </motion.section>
        </div>
      </div>
      <div className="flex items-center justify-between p-[2.5cqw] pt-0" style={{ fontSize: "clamp(8px, 1.6cqw, 15px)" }}>
        <span>◀ ▶ stops on the route</span>
        <CancelButton onClick={onBack} />
      </div>
    </div>
  );
}
