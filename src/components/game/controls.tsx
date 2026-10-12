"use client";

import { createContext, useContext, useEffect, type RefObject } from "react";
import type { Dir } from "./sprites";

export type Handlers = { onDir?: (d: Dir) => void; onA?: () => void; onB?: () => void };
export type Pad = {
  handlers: RefObject<Handlers>;
  held: RefObject<Dir[]>;
};

export const PadContext = createContext<Pad | null>(null);

/** Registra i comandi della scena corrente (frecce, A, B: tastiera e pulsanti touch). */
export function useGamepad(h: Handlers) {
  const pad = useContext(PadContext)!;
  const { handlers } = pad;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability -- ref condivisa, non stato React
    handlers.current = h;
    return () => {
      if (handlers.current === h) handlers.current = {};
    };
  });
  return pad;
}
