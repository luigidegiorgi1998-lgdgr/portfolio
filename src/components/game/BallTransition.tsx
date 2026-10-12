"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

/** The Poké Ball opens and a white flash covers the screen, then the scene changes. */
export default function BallTransition({ onMid, onDone }: { onMid: () => void; onDone: () => void }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const k = reduce ? 0.3 : 1;
    const a = setTimeout(onMid, 900 * k);
    const b = setTimeout(onDone, 1500 * k);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onMid, onDone]);

  const half = "absolute left-0 h-1/2 w-full border-[0.8cqw] border-[#2a2438]";
  return (
    <motion.div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        className="relative aspect-square w-[34cqw] max-w-[260px] overflow-hidden rounded-full border-[0.8cqw] border-[#2a2438]"
        initial={{ scale: 0.3, rotate: 0 }}
        animate={{ scale: [0.3, 1, 1, 1, 6], rotate: [0, 0, -18, 18, 0] }}
        transition={{ duration: 1.1, times: [0, 0.25, 0.45, 0.65, 1], ease: "easeInOut" }}
      >
        <motion.div className={`${half} top-0 bg-[#e0453a]`} animate={{ y: ["0%", "0%", "-70%"] }} transition={{ delay: 0.55, duration: 0.35 }} />
        <motion.div className={`${half} bottom-0 bg-[#f4f2f8]`} animate={{ y: ["0%", "0%", "70%"] }} transition={{ delay: 0.55, duration: 0.35 }} />
        <span className="absolute left-1/2 top-1/2 h-[26%] w-[26%] -translate-x-1/2 -translate-y-1/2 rounded-full border-[0.8cqw] border-[#2a2438] bg-[#f4f2f8]" />
      </motion.div>
      <motion.div className="absolute inset-0 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ duration: 1.5, times: [0, 0.55, 0.62, 0.8, 1] }} />
    </motion.div>
  );
}
