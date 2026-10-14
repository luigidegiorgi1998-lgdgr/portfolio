// Pixel-art disegnata a codice (nessuno sprite ufficiale): tutto in canvas 240x160.

export const TILE = 16;
export const COLS = 15;
export const ROWS = 10;
export type Dir = "up" | "down" | "left" | "right";
export type BallId = "work" | "about" | "contact";
export type Spot = BallId | "library";

const r = (c: CanvasRenderingContext2D, col: string, x: number, y: number, w: number, h: number) => {
  c.fillStyle = col;
  c.fillRect(x, y, w, h);
};

export function drawFloor(c: CanvasRenderingContext2D) {
  r(c, "#e9e7f3", 0, 0, COLS * TILE, ROWS * TILE);
  c.fillStyle = "#d2cfe3";
  for (let y = 0; y < ROWS * TILE; y++)
    for (let x = 0; x < COLS * TILE; x++) if ((x + y) % 8 === 0 || (x + y) % 8 === 1) c.fillRect(x, y, 1, 1);
}

export function drawWall(c: CanvasRenderingContext2D) {
  r(c, "#ead99b", 0, 0, COLS * TILE, 2 * TILE);
  r(c, "#c9b46a", 0, 24, COLS * TILE, 8);
  r(c, "#a89a58", 0, 28, COLS * TILE, 2);
  r(c, "#c4c1d6", 0, 32, COLS * TILE, 6); // ombra
}

export function drawShelf(c: CanvasRenderingContext2D, x: number, y: number, tw: number, th: number) {
  const w = tw * TILE, h = th * TILE;
  r(c, "#6a6990", x, y, w, h);
  r(c, "#f6f6fb", x + 2, y + 1, w - 4, 11);
  r(c, "#bdb9d4", x + 2, y + h - 6, w - 4, 5);
  const cols = ["#e0453a", "#3f87d8", "#43b05c", "#f0a62a", "#8b5bd0"];
  for (let row = 0; row < th; row++) {
    const by = y + 14 + row * 16;
    r(c, "#8c8aa8", x + 2, by - 1, w - 4, 1);
    for (let i = 0; i < Math.floor((w - 8) / 5); i++) r(c, cols[(i + row) % 5], x + 4 + i * 5, by, 3, 6);
    r(c, "#8c8aa8", x + 2, by + 7, w - 4, 1);
  }
  for (let i = 1; i < tw; i++) r(c, "#6a6990", x + i * TILE - 1, y, 2, h);
}

export function drawDesk(c: CanvasRenderingContext2D, x: number, y: number, w: number) {
  r(c, "#e7d07a", x, y + 10, w, 8);
  r(c, "#b49a3e", x, y + 18, w, 3);
  r(c, "#8a742c", x + 2, y + 21, 3, 6);
  r(c, "#8a742c", x + w - 5, y + 21, 3, 6);
}

export function drawComputer(c: CanvasRenderingContext2D, x: number, y: number) {
  r(c, "#c8c8d8", x, y, 16, 12);
  r(c, "#46465a", x + 2, y + 2, 12, 7);
  r(c, "#7ec8f0", x + 3, y + 3, 4, 2);
  r(c, "#c8c8d8", x + 6, y + 12, 4, 2);
  r(c, "#d8d8e4", x + 18, y - 4, 7, 16);
  r(c, "#9b9bb0", x + 19, y + 5, 5, 1);
}

export function drawBag(c: CanvasRenderingContext2D, x: number, y: number) {
  r(c, "#7a2d18", x, y + 1, 15, 10);
  r(c, "#e8562a", x + 1, y, 13, 10);
  r(c, "#f28a4a", x + 2, y + 1, 11, 3);
  r(c, "#3a3a58", x + 6, y + 5, 3, 4);
}

export function drawBoard(c: CanvasRenderingContext2D, x: number, y: number) {
  r(c, "#8a742c", x, y, 24, 28);
  r(c, "#f5ecc4", x + 2, y + 2, 20, 24);
  c.fillStyle = "#8a8668";
  for (let i = 0; i < 6; i++) c.fillRect(x + 5, y + 6 + i * 3, 14, 1);
}

export function drawWindow(c: CanvasRenderingContext2D, x: number, y: number) {
  r(c, "#8a742c", x, y, 24, 24);
  r(c, "#7ec8f0", x + 2, y + 2, 20, 20);
  r(c, "#a7dcf8", x + 4, y + 4, 6, 3);
  r(c, "#8a742c", x + 11, y + 2, 2, 20);
  r(c, "#8a742c", x + 2, y + 11, 20, 2);
}

export function drawMachine(c: CanvasRenderingContext2D, x: number, y: number) {
  r(c, "#c8d4e8", x + 2, y + 14, 28, 18);
  r(c, "#98a8c8", x + 2, y + 28, 28, 4);
  r(c, "#e0453a", x + 4, y + 2, 24, 14);
  r(c, "#f2796a", x + 8, y + 4, 10, 4);
  r(c, "#fff", x + 20, y + 8, 6, 3);
  r(c, "#3f87d8", x + 6, y + 18, 20, 6);
  r(c, "#e8f0ff", x + 24, y + 22, 8, 6);
}

export function drawTable(c: CanvasRenderingContext2D, x: number, y: number, tw: number) {
  const w = tw * TILE;
  r(c, "#6a6990", x, y - 2, w, 24);
  r(c, "#a9d7a0", x + 2, y, w - 4, 16);
  r(c, "#8cc283", x + 2, y + 12, w - 4, 4);
  r(c, "#bdb9d4", x + 2, y + 16, w - 4, 4);
  r(c, "#8c8aa8", x + 3, y + 20, 4, 4);
  r(c, "#8c8aa8", x + w - 7, y + 20, 4, 4);
}

export function drawBall(c: CanvasRenderingContext2D, cx: number, cy: number, opened = false) {
  for (let y = -6; y <= 6; y++)
    for (let x = -6; x <= 6; x++) {
      const d = x * x + y * y;
      if (d > 38) continue;
      const rim = d > 28;
      c.fillStyle = rim ? "#2a2438" : y < 0 ? (opened ? "#a8a4b8" : "#d63a2e") : "#f4f2f8";
      if (!rim && y === -1) c.fillStyle = "#2a2438";
      if (!rim && y < -2 && x < -1 && x > -4 && !opened) c.fillStyle = "#f2796a";
      c.fillRect(cx + x, cy + y, 1, 1);
    }
  r(c, "#2a2438", cx - 1, cy - 2, 3, 4);
  r(c, "#f4f2f8", cx, cy - 1, 1, 2);
}

export function drawPerson(c: CanvasRenderingContext2D, x: number, y: number, hair: string, coat: string, glasses = false) {
  r(c, "#3a3a58", x + 4, y + 13, 3, 3);
  r(c, "#3a3a58", x + 9, y + 13, 3, 3);
  r(c, coat, x + 3, y + 8, 10, 6);
  r(c, "#fff", x + 6, y + 8, 4, 3);
  r(c, "#f2c9a0", x + 4, y + 3, 8, 6);
  r(c, hair, x + 3, y, 10, 4);
  r(c, "#2a2438", x + 6, y + 5, 1, 2);
  r(c, "#2a2438", x + 9, y + 5, 1, 2);
  if (glasses) r(c, "#7ec8f0", x + 5, y + 5, 6, 1);
}

export function drawTrainer(c: CanvasRenderingContext2D, x: number, y: number, dir: Dir, step: number) {
  const red = "#e0332a", dark = "#a8201c", skin = "#f2c9a0", hair = "#3a2a22", jacket = "#f0b02a", pants = "#3a4a9a", ink = "#2a2438";
  const lift = step % 2; // 0 / 1 per alternare le gambe
  const legL = lift ? 2 : 3, legR = lift ? 3 : 2;
  r(c, ink, x + 4, y + 16 - legL, 3, legL);
  r(c, ink, x + 9, y + 16 - legR, 3, legR);
  r(c, pants, x + 4, y + 13 - legL + 1, 3, 2);
  r(c, pants, x + 9, y + 13 - legR + 1, 3, 2);
  // corpo
  r(c, jacket, x + 4, y + 8, 8, 5);
  r(c, "#c88a18", x + 4, y + 12, 8, 1);
  if (dir === "up") {
    r(c, jacket, x + 3, y + 9, 1, 3);
    r(c, jacket, x + 12, y + 9, 1, 3);
    r(c, hair, x + 4, y + 4, 8, 5);
    r(c, red, x + 3, y, 10, 5);
    r(c, dark, x + 3, y + 4, 10, 1);
  } else if (dir === "down") {
    r(c, skin, x + 3, y + 9, 1, 3);
    r(c, skin, x + 12, y + 9, 1, 3);
    r(c, skin, x + 4, y + 4, 8, 5);
    r(c, ink, x + 6, y + 6, 1, 2);
    r(c, ink, x + 9, y + 6, 1, 2);
    r(c, red, x + 3, y, 10, 4);
    r(c, dark, x + 2, y + 3, 12, 1);
  } else {
    const f = dir === "left" ? -1 : 1;
    const px = (o: number, w = 1) => (f === 1 ? x + o : x + 16 - o - w);
    r(c, skin, px(7), y + 9, 2, 3);
    r(c, skin, px(4), y + 4, 8, 5);
    r(c, ink, px(9), y + 6, 1, 2);
    r(c, hair, px(3), y + 4, 4, 5);
    r(c, red, px(3), y, 9, 4);
    r(c, dark, px(8, 6), y + 3, 6, 1);
  }
}

export function drawBackdrop(ctx: CanvasRenderingContext2D) {
  drawFloor(ctx);
  drawWall(ctx);
  drawDesk(ctx, 0, 0, 40);
  drawComputer(ctx, 3, 2);
  drawDesk(ctx, 44, 0, 40);
  drawBag(ctx, 46, 3);
  drawBag(ctx, 62, 3);
  drawBoard(ctx, 98, 2);
  drawBoard(ctx, 126, 2);
  drawWindow(ctx, 160, 2);
  drawShelf(ctx, 192, 2, 3, 2);
  drawMachine(ctx, 0, 48);
  drawTable(ctx, 6 * TILE, 4 * TILE, 3);
  drawShelf(ctx, 0, 7 * TILE, 3, 2);
  drawShelf(ctx, 9 * TILE, 7 * TILE, 6, 2);
  drawPerson(ctx, 4 * TILE, 2 * TILE, "#d8b878", "#f4f4fa");
  drawPerson(ctx, 3 * TILE, 3 * TILE + 0, "#a88a30", "#3a3a3a");
  drawPerson(ctx, 13 * TILE, 6 * TILE, "#c8a060", "#f4f4fa", true);
}
