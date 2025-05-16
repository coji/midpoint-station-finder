import { Suspense } from 'react'
import StationSearch from '~/components/station-search'
import type { Route } from './+types/home'

export function loader({ context }: Route.LoaderArgs) {
  return {}
}

export default function Home({ actionData, loaderData }: Route.ComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="mx-auto w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          駅間の中間地点検索
        </h1>
        <p className="text-muted-foreground mb-8 text-center text-sm">
          2つの駅を入力して、その中間地点となる駅を検索できます
        </p>

        <Suspense fallback={<div className="text-center">読み込み中...</div>}>
          <StationSearch />
        </Suspense>
      </div>
    </main>
  )
}
