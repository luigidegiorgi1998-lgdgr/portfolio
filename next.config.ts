import type { NextConfig } from "next";

// Portfolio v2: the home and the four case studies are static pages in /public.
// The interactive game moved to /play.
const pages = ["nolimits", "mira", "fenwick", "mylocalguide"];

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/home.html" },
        ...pages.map((p) => ({ source: `/${p}`, destination: `/${p}.html` })),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return pages.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true }));
  },
};

export default nextConfig;
