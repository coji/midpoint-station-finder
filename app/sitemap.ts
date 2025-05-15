import type { MetadataRoute } from "next"
import { getStations } from "@/lib/stations"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://midpoint-station-finder.vercel.app"
  const stations = getStations()

  // Generate sitemap entries for the homepage and some popular routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ]

  // Add some popular routes for SEO
  // In a real app, you would use analytics data to determine popular routes
  const popularStationPairs = [
    ["東京", "新宿"],
    ["渋谷", "池袋"],
    ["東京", "横浜"],
    ["新宿", "横浜"],
    ["渋谷", "千葉"],
  ]

  for (const [s1, s2] of popularStationPairs) {
    const sortedStations = [s1, s2].sort()
    const routeId = `${encodeURIComponent(sortedStations[0])}_${encodeURIComponent(sortedStations[1])}`

    routes.push({
      url: `${baseUrl}/route/${routeId}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  }

  return routes as MetadataRoute.Sitemap
}
