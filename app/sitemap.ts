import type { MetadataRoute } from "next";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

const SITE_URL = "https://karfxcustoms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.map(
    (cat) => ({
      url: `${SITE_URL}/services/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_CATEGORIES.flatMap(
    (cat) =>
      cat.services.map((service) => ({
        url: `${SITE_URL}/services/${cat.slug}/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.85,
      }))
  );

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes];
}
