import { ArrowLeft, Share2 } from 'lucide-react'
import { Suspense } from 'react'
import { href, Link } from 'react-router'
import MidpointResult from '~/components/midpoint-result'
import { Button } from '~/components/ui/button'
import { findMidpointStation } from '~/lib/midpoint'
import type { Route } from './+types/stations'

export const loader = async ({ params }: Route.ComponentProps) => {
  const { stations } = params
  const [station1, station2] = stations.split('_')
  if (!station1 || !station2) {
    throw new Response('station names', { status: 404 })
  }

  const midpoint = await findMidpointStation(station1, station2)

  return {
    station1,
    station2,
    midpoint,
  }
}

export default function StationsPage({
  loaderData: { station1, station2, midpoint },
}: Route.ComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link to={href('/')}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="flex-1 text-center text-xl font-bold">
            中間地点検索結果
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `${station1}駅と${station2}駅の中間地点`,
                  url: window.location.href,
                })
              }
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Suspense fallback={<div className="text-center">検索中...</div>}>
          <MidpointResult
            station1={station1}
            station2={station2}
            midpoint={midpoint}
          />
        </Suspense>

        <div className="mt-8">
          <Button variant="outline" className="w-full" asChild>
            <Link to={href('/')}>新しい検索を始める</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
