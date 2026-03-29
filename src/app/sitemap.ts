export const dynamic = "force-dynamic";

import { db } from "@/db";
import { tours } from "@/db/schema";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://saiahat.netlify.app";

  let tourEntries: MetadataRoute.Sitemap = [];
  try {
    const allTours = await db.select({ id: tours.id, updatedAt: tours.updatedAt }).from(tours);
    tourEntries = allTours.map((tour) => ({
      url: `${baseUrl}/tours/${tour.id}`,
      lastModified: tour.updatedAt,
    }));
  } catch {
    // DB not connected
  }

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/tours`, lastModified: new Date() },
    ...tourEntries,
  ];
}
