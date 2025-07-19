import { type MetadataRoute } from "next"
import { homePage, host } from "@/lib/config"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://${host}${homePage}`,
      lastModified: new Date(),
      priority: 1,
    },
  ]
}
