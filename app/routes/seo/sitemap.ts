export const loader = () => {
  const locations = [
    {
      loc: 'https://midpoint-station-finder.vercel.app',
      lastmod: new Date().toISOString(),
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
      loc: `https://midpoint-station-finder.vercel.app/route/${routeId}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    })
  }

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
    { headers: { 'Content-Type': 'application/xml' } },
  )
}
