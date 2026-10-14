"use client";

import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NPC_LINES } from "@/content";
import { PadContext, useGamepad, type Handlers } from "./controls";
import Overworld, { type PlayerState } from "./Overworld";
import TitleScreen from "./TitleScreen";
import PokedexMessage from "./PokedexMessage";
import BallTransition from "./BallTransition";
import WorkScreen from "./WorkScreen";
import AboutScreen from "./AboutScreen";
import ContactScreen from "./ContactScreen";
import { DialogBox, useTypewriter } from "./ui";
import LibraryScreen from "./LibraryScreen";
import type { BallId, Dir, Spot } from "./sprites";

type Scene = "title" | "pokedex" | "lab" | Spot;

const LABELS: Record<Spot, string> = { work: "MY WORK", about: "ABOUT ME", contact: "CONTACT", library: "LIBRARY" };
const KEYS: Record<string, Dir> = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right" };

export default function Game() {
  const [scene, setScene] = useState<Scene>("title");
  const [pending, setPending] = useState<BallId | null>(null);
  const [near, setNear] = useState<Spot | null>(null);
  const [talk, setTalk] = useState<string[] | null>(null);
  const [talkIdx, setTalkIdx] = useState(0);

  const handlers = useRef<Handlers>({});
  const held = useRef<Dir[]>([]);
  const player = useRef<PlayerState>({ tx: 7, ty: 7, dir: "up" });
  const [pad] = useState(() => ({ handlers, held }));

  const press = useCallback((d: Dir) => {
    held.current = [...held.current.filter((x) => x !== d), d];
    handlers.current.onDir?.(d);
  }, []);
  const release = useCallback((d: Dir) => {
    held.current = held.current.filter((x) => x !== d);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const d = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (d) {
        e.preventDefault();
        if (!held.current.includes(d) || !e.repeat) press(d);
        else handlers.current.onDir?.(d);
      } else if (!e.repeat && (e.key === "Enter" || e.key === " " || e.key === "z" || e.key === "Z")) {
        if ((e.target as HTMLElement)?.closest("nav") && e.key !== "z") return; // la navigazione rapida usa i pulsanti nativi
        e.preventDefault();
        handlers.current.onA?.();
      } else if (!e.repeat && (e.key === "Escape" || e.key === "x" || e.key === "X" || e.key === "Backspace")) {
        handlers.current.onB?.();
      }
    };
    const up = (e: KeyboardEvent) => {
      const d = KEYS[e.key.length === 1 ? e.key.toLowerCase() : e.key];
      if (d) release(d);
    };
    const blur = () => (held.current = []);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, [press, release]);

  // dialoghi NPC nel laboratorio
  const line = talk ? talk[talkIdx] : "";
  const tw = useTypewriter(line);
  const advanceTalk = () => {
    if (!talk) return;
    if (!tw.done) return tw.finish();
    if (talkIdx < talk.length - 1) setTalkIdx(talkIdx + 1);
    else setTalk(null);
  };

  const lab = scene === "lab" && !pending;
  const walking = lab && !talk;
  const back = () => {
    held.current = [];
    setScene("lab");
  };

  return (
    <PadContext.Provider value={pad}>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="@container w-full max-w-[960px]">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border-[10px] border-[#26304a] bg-black shadow-[0_0_0_3px_#0b0f1c,0_20px_60px_rgba(0,0,0,.5)] sm:aspect-[3/2]">
            {/* il laboratorio resta montato sotto le schermate: la posizione si conserva */}
            <div className="absolute inset-0 flex items-center bg-[#1a1830]">
              <div className="relative w-full">
              <Overworld
                active={walking}
                player={player}
                onNear={setNear}
                onBall={(id) => {
                  held.current = [];
                  setNear(null);
                  setPending(id);
                }}
                onLibrary={() => {
                  held.current = [];
                  setNear(null);
                  setScene("library");
                }}
                onTalk={(k) => {
                  held.current = [];
                  setTalkIdx(0);
                  setTalk(NPC_LINES[k as keyof typeof NPC_LINES]);
                }}
              />
              {lab && !talk && <LabHud near={near} />}
              </div>
            </div>

            {lab && talk && <TalkLayer onA={advanceTalk} text={tw.shown} done={tw.done} />}

            <AnimatePresence>
              {scene === "title" && (
                <motion.div key="title" className="absolute inset-0" exit={{ opacity: 0 }}>
                  <TitleScreen onStart={() => setScene("pokedex")} />
                </motion.div>
              )}
              {scene === "pokedex" && (
                <motion.div key="dex" className="absolute inset-0" exit={{ opacity: 0 }}>
                  <PokedexMessage onDone={() => setScene("lab")} />
                </motion.div>
              )}
              {(scene === "work" || scene === "about" || scene === "contact" || scene === "library") && (
                <motion.div key={scene} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {scene === "work" && <WorkScreen onBack={back} />}
                  {scene === "about" && <AboutScreen onBack={back} />}
                  {scene === "contact" && <ContactScreen onBack={back} />}
                  {scene === "library" && <LibraryScreen onBack={back} />}
                </motion.div>
              )}
            </AnimatePresence>

            {pending && (
              <BallTransition
                onMid={() => setScene(pending)}
                onDone={() => setPending(null)}
              />
            )}
          </div>
        </div>

        <TouchPad press={press} release={release} />

        <nav aria-label="Quick navigation" className="flex flex-wrap items-center justify-center gap-2 font-pixel text-[10px] text-[#c9d4f5]">
          <span className="hidden sm:inline">Arrows/WASD · Z or Enter = A · X or Esc = B</span>
          <span className="opacity-60">· Skip to:</span>
          {(Object.keys(LABELS) as Spot[]).map((id) => (
            <button key={id} onClick={(e) => { e.currentTarget.blur(); held.current = []; setTalk(null); setScene(id); }} className="rounded border border-[#5a6a9a] px-2 py-1 hover:bg-[#2a3552]">
              {LABELS[id]}
            </button>
          ))}
        </nav>
      </div>
    </PadContext.Provider>
  );
}

function LabHud({ near }: { near: Spot | null }) {
  const col = near ? { work: 6, about: 7, contact: 8, library: 11 }[near] : 7;
  const top = near === "library" ? "58%" : "35%";
  return (
    <>
      <AnimatePresence>
        {near && (
          <motion.div
            key={near}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded border-2 border-[#3a3a58] bg-[#f8f8fc] px-2 py-1 font-pixel text-[#2a2438]"
            style={{ left: `${((col * 16 + 8) / 240) * 100}%`, top, fontSize: "clamp(8px, 2.2cqw, 18px)" }}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ▼ {LABELS[near]} · A
          </motion.div>
        )}
      </AnimatePresence>
      <p className="pointer-events-none absolute inset-x-0 bottom-[1.5cqw] text-center font-pixel text-[#3a3a58]" style={{ fontSize: "clamp(7px, 1.9cqw, 16px)" }}>
        Table: Poké Balls · Bookshelf: my passions
      </p>
    </>
  );
}

function TalkLayer({ text, done, onA }: { text: string; done: boolean; onA: () => void }) {
  useGamepad({ onA, onB: onA });
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 p-[2cqw]" onClick={onA}>
      <DialogBox text={text} done={done} />
    </div>
  );
}

function TouchPad({ press, release }: { press: (d: Dir) => void; release: (d: Dir) => void }) {
  const pad = useContext(PadContext)!;
  const btn = "touch-none select-none rounded-full border-2 border-[#5a6a9a] bg-[#26304a] font-pixel text-[#f4f2f8] active:bg-[#3d4d7a]";
  const dir = (d: Dir, label: string, pos: string) => (
    <button
      key={d}
      aria-label={d}
      className={`${btn} absolute h-14 w-14 text-lg ${pos}`}
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); press(d); }}
      onPointerUp={() => release(d)}
      onPointerCancel={() => release(d)}
    >
      {label}
    </button>
  );
  return (
    <div className="flex w-full max-w-[420px] items-center justify-between px-6 py-2 [@media(hover:hover)_and_(pointer:fine)]:hidden">
      <div className="relative h-44 w-44">
        {dir("up", "▲", "left-14 top-0")}
        {dir("left", "◀", "left-0 top-14")}
        {dir("right", "▶", "right-0 top-14")}
        {dir("down", "▼", "left-14 bottom-0")}
      </div>
      <div className="flex items-end gap-4">
        <button className={`${btn} mb-2 h-16 w-16`} onClick={() => pad.handlers.current.onB?.()}>B</button>
        <button className={`${btn} mb-10 h-16 w-16`} onClick={() => pad.handlers.current.onA?.()}>A</button>
      </div>
    </div>
  );
}

