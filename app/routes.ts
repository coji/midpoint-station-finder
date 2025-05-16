import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('/:stations', 'routes/stations.tsx'),
  route('/sitemap.xml', 'routes/seo/sitemap.ts'),
] satisfies RouteConfig
