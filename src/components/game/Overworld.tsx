"use client";

import { useEffect, useRef } from "react";
import { useGamepad } from "./controls";
import { COLS, ROWS, TILE, drawBackdrop, drawBall, drawTrainer, type BallId, type Dir } from "./sprites";

const BALLS: Record<number, BallId> = { 6: "work", 7: "about", 8: "contact" };
const TABLE_ROW = 4;
const STEP_MS = 150;
const DELTA: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

// Tile occupati (muro, mobili, personaggi)
const blocked = new Set<string>();
const block = (c0: number, r0: number, w: number, h: number) => {
  for (let c = c0; c < c0 + w; c++) for (let r = r0; r < r0 + h; r++) blocked.add(`${c},${r}`);
};
block(0, 0, COLS, 2);
block(0, 3, 2, 2); // macchinario
block(6, TABLE_ROW, 3, 1); // tavolo
block(0, 7, 3, 2);
block(9, 7, 6, 2);
block(4, 2, 1, 1); // professore
block(3, 3, 1, 1); // rivale
block(13, 6, 1, 1); // assistente
const NPCS: Record<string, string> = { "4,2": "prof", "3,3": "rival", "13,6": "assistant", "0,3": "machine", "1,3": "machine", "0,4": "machine", "1,4": "machine" };

export type PlayerState = { tx: number; ty: number; dir: Dir };

type Props = {
  active: boolean;
  player: { current: PlayerState };
  onNear: (id: BallId | null) => void;
  onBall: (id: BallId) => void;
  onTalk: (key: string) => void;
};

export default function Overworld({ active, player, onNear, onBall, onTalk }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const cb = useRef({ onNear, onBall, onTalk });
  const actionQueued = useRef(false);

  useEffect(() => {
    activeRef.current = active;
    cb.current = { onNear, onBall, onTalk };
  });

  const pad = useGamepad({
    onA: () => {
      actionQueued.current = true;
    },
  });

  useEffect(() => {
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;

    const bg = document.createElement("canvas");
    bg.width = COLS * TILE;
    bg.height = ROWS * TILE;
    const bctx = bg.getContext("2d")!;
    drawBackdrop(bctx);
    for (const col of [6, 7, 8]) drawBall(bctx, col * TILE + 8, TABLE_ROW * TILE + 7);

    let raf = 0;
    let last = performance.now();
    let move: { fx: number; fy: number; t: number } | null = null;
    let steps = 0;
    let near: BallId | null = null;
    const p = player.current;

    const frame = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      if (activeRef.current) {
        if (!move) {
          const held = pad.held.current;
          const want = held[held.length - 1];
          if (want) {
            p.dir = want;
            const [dx, dy] = DELTA[want];
            const nx = p.tx + dx, ny = p.ty + dy;
            if (nx >= 0 && ny >= 0 && nx < COLS && ny < ROWS && !blocked.has(`${nx},${ny}`)) {
              move = { fx: p.tx, fy: p.ty, t: 0 };
              p.tx = nx;
              p.ty = ny;
              steps++;
            }
          }
          if (actionQueued.current) {
            const [dx, dy] = DELTA[p.dir];
            const tx = p.tx + dx, ty = p.ty + dy;
            if (ty === TABLE_ROW && BALLS[tx]) cb.current.onBall(BALLS[tx]);
            else if (NPCS[`${tx},${ty}`]) cb.current.onTalk(NPCS[`${tx},${ty}`]);
          }
        }
        if (move) {
          move.t += dt;
          if (move.t >= STEP_MS) move = null;
        }
      }
      actionQueued.current = false;

      const nearNow = !move && p.dir === "up" && p.ty === TABLE_ROW + 1 ? (BALLS[p.tx] ?? null) : null;
      if (nearNow !== near && activeRef.current) {
        near = nearNow;
        cb.current.onNear(near);
      }

      const k = move ? move.t / STEP_MS : 1;
      const px = (move ? move.fx + (p.tx - move.fx) * k : p.tx) * TILE;
      const py = (move ? move.fy + (p.ty - move.fy) * k : p.ty) * TILE;
      ctx.drawImage(bg, 0, 0);
      drawTrainer(ctx, Math.round(px), Math.round(py) - 2, p.dir, move ? steps : 0);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [pad, player]);

  return (
    <canvas
      ref={canvas}
      width={COLS * TILE}
      height={ROWS * TILE}
      className="block w-full"
      style={{ imageRendering: "pixelated", aspectRatio: `${COLS} / ${ROWS}` }}
      aria-label="Laboratorio del Professore: muoviti con le frecce"
      role="img"
    />
  );
}
