# Luigi De Giorgi — Portfolio

Personal product design portfolio. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion.

## Pages

- `/` — Home
- `/my-work` — case studies (MyLocalGuide, NoLimits, Fenwick)
- `/about` — About
- `/contact` — CV / Contact

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on **port 3100** (`http://localhost:3100`), with webpack rather than Turbopack — see "Known issues" below.

## Scripts

| Script          | What it does                                   |
| --------------- | ----------------------------------------------- |
| `npm run dev`   | Dev server on :3100 (webpack)                   |
| `npm run build` | Production build                                |
| `npm run start` | Serve the production build on :3100             |
| `npm run lint`  | ESLint                                          |

## Environment variables

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the site's real domain once deployed — it's used to build absolute URLs in `sitemap.xml`, `robots.txt`, and Open Graph tags.

## Notable implementation details

- **Motion**: shared-element page transitions (View Transitions API) between the Home project cards and their My Work headline, page-entry micro-motion, a custom cursor trail (desktop only, respects `prefers-reduced-motion`), and a Framer Motion carousel with drag/swipe support. See `motion-spec.md`.
- **Responsive**: standard `768px` breakpoint, plus a dedicated `1100px` breakpoint for the Home hero/bento layout. See `responsive-spec.md`.
- **Design tokens**: colors and fonts are defined in `src/app/globals.css` (`@theme inline`) and mapped to Tailwind utilities (`bg-bg`, `text-ink`, `text-muted`, `bg-accent`, `bg-card-dark`, `font-display`, `font-mono`, `font-sans`).

## Known issues

- **Turbopack crashes in this dev sandbox**: `next dev`'s default Turbopack bundler panics here with `spawning node pooled process: No such file or directory`, an environment-specific PATH issue with Turbopack's own child-process spawning — not a bug in this codebase. `npm run dev` / `npm run build` are pinned to `--webpack` to work around it. If Turbopack works fine on your machine, feel free to drop `--webpack` from the scripts in `package.json`.

## Deployment

Any Next.js host (Vercel, Netlify, etc.) works. Remember to:

1. Set `NEXT_PUBLIC_SITE_URL` in the host's environment variables.
2. Point the domain's DNS once you have one.
3. Re-check `npm run build` passes on the host's Node version.
