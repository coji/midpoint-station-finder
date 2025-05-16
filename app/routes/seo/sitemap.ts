import type { Route } from './+types/sitemap'

export const loader = ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  const lastModified = new Date().toISOString()

  const locations = [
    {
      loc: baseUrl,
      lastmod: lastModified,
      changefreq: 'daily',
      priority: 1,
    },
  ]

  const popularStationPairs = [
    ['東京', '新宿'],
    ['渋谷', '池袋'],
    ['東京', '横浜'],
    ['新宿', '横浜'],
    ['渋谷', '千葉'],
  ]

  for (const [s1, s2] of popularStationPairs) {
    const sortedStations = [s1, s2].sort()
    const routeId = `${encodeURIComponent(sortedStations[0])}_${encodeURIComponent(sortedStations[1])}`

    locations.push({
      loc: `${baseUrl}/route/${routeId}`,
      lastmod: lastModified,
      changefreq: 'weekly',
      priority: 0.8,
    })
  }

  const headers = new Headers({
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=86400',
  })

  return new Response(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locations
  .map(
    ({ loc, lastmod, changefreq, priority }) => `
<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
</url>
`,
  )
  .join('')}
</urlset>`,
    { headers },
  )
}
