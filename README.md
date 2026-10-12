# Luigi De Giorgi — Portfolio

An interactive, Pokémon-style product design portfolio. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion. Everything lives on one page (`/`).

## How it works

A walkable lab (canvas pixel art) opens with a Pokédex message. Three Poké Balls on the table lead to:

- **My work**: party-menu style list of the case studies, with a detail view and a full-screen image viewer.
- **About me**: trainer card with stats and a map of the journey drawn as an island.
- **Contact**: bag menu with email, LinkedIn and the CV download.

Controls: arrows/WASD to walk, Z or Enter = A, X or Esc = B. On touch screens a D-pad appears. A "Skip to" bar jumps straight to any section. Motion respects `prefers-reduced-motion`.

## Editing the content

All copy, projects, stats, the journey and the NPC lines are in **`src/content.ts`**. Project images live in `public/images/mywork/`. To hide a project until it is ready, set `draft: true` on it. Each project is tagged `client` or `concept`, which shows as a label.

The pixel art is drawn in code (`src/components/game/sprites.ts`), with no official sprites.

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on **port 3100** (`http://localhost:3100`), with webpack rather than Turbopack.

| Script          | What it does                        |
| --------------- | ----------------------------------- |
| `npm run dev`   | Dev server on :3100 (webpack)       |
| `npm run build` | Production build                    |
| `npm run start` | Serve the production build on :3100 |
| `npm run lint`  | ESLint                              |

## Environment variables

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the site's real domain. It builds the absolute URLs in `sitemap.xml`, `robots.txt` and the Open Graph tags.

## Deployment

Any Next.js host works (it is deployed on Vercel). Before sending the link around:

1. Set `NEXT_PUBLIC_SITE_URL` in the host's environment variables.
2. Make sure the production branch is the one you want public.
3. Open the live URL in a private window and on a phone.
