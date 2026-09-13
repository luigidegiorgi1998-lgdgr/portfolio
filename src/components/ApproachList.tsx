"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function ApproachList({ items }: { items: string[] }) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const visible = isMobile && !expanded ? items.slice(0, 2) : items;
  const hiddenCount = items.length - 2;

  return (
    <div className="flex flex-col gap-2.5 pt-3">
      <AnimatePresence initial={false}>
        {visible.map((text, i) => (
          <motion.div
            key={i}
            initial={i >= 2 ? { opacity: 0, height: 0 } : false}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.22 }}
            className="flex gap-2.5"
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <p className="text-[16px] leading-[26px] text-muted">{text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      {isMobile && !expanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="pt-1 text-left font-mono text-[11px] uppercase tracking-[0.88px] text-accent"
        >
          Read more ({hiddenCount} more) ↓
        </button>
      )}
    </div>
  );
}
