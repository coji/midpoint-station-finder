import { Suspense } from "react"
import StationSearch from "@/components/station-search"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">駅間の中間地点検索</h1>
        <p className="text-sm text-muted-foreground text-center mb-8">
          2つの駅を入力して、その中間地点となる駅を検索できます
        </p>

        <Suspense fallback={<div className="text-center">読み込み中...</div>}>
          <StationSearch />
        </Suspense>
      </div>
      <Toaster />
    </main>
  )
}
