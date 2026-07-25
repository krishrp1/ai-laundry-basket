import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/pricing", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/quote", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
