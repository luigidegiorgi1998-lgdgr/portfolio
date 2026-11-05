import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-ldg-product-designer.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/nolimits", "/mira", "/fenwick", "/mylocalguide", "/play"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
