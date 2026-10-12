"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function useTypewriter(text: string, speed = 28) {
  const [st, setSt] = useState({ text, n: 0 });
  const n = st.text === text ? st.n : 0;
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = setInterval(
      () => setSt((v) => (v.text !== text ? { text, n: reduce ? text.length : 1 } : v.n >= text.length ? v : { text, n: reduce ? text.length : v.n + 1 })),
      reduce ? 1 : speed,
    );
    return () => clearInterval(id);
  }, [text, speed]);
  return { shown: text.slice(0, n), done: n >= text.length, finish: () => setSt({ text, n: text.length }) };
}

/** Riquadro di testo stile GBA, con freccia ▼ lampeggiante a fine pagina. */
export function DialogBox({ text, done, className = "" }: { text: string; done: boolean; className?: string }) {
  return (
    <div
      className={`relative rounded-[1.2cqw] border-[0.7cqw] border-[#3a3a58] bg-[#f8f8fc] px-[3cqw] py-[2cqw] font-pixel leading-[1.7] text-[#2a2438] outline outline-[0.35cqw] outline-[#9b9bb8] ${className}`}
      style={{ fontSize: "clamp(8px, 2.5cqw, 22px)" }}
      role="status"
      aria-live="polite"
    >
      <p className="min-h-[3.4em] whitespace-pre-wrap">{text}</p>
      {done && (
        <motion.span
          className="absolute bottom-[1.2cqw] right-[2cqw] text-[#c0392b]"
          animate={{ y: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          aria-hidden
        >
          ▼
        </motion.span>
      )}
    </div>
  );
}

export function PokeballIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative inline-block shrink-0 rounded-full border-2 border-[#2a2438] ${className}`}
      style={{ width: size, height: size, background: "linear-gradient(#e0453a 0 46%, #2a2438 46% 54%, #f4f2f8 54%)" }}
      aria-hidden
    >
      <span className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#2a2438] bg-[#f4f2f8]" />
    </span>
  );
}

export function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border-[0.6cqw] border-[#f4f2f8] bg-[#14182a] px-[3.5cqw] py-[1.4cqw] font-pixel text-[#f4f2f8] hover:bg-[#2a3050]"
      style={{ fontSize: "clamp(8px, 2.6cqw, 22px)" }}
    >
      INDIETRO
    </button>
  );
}
