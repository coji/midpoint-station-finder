import type { Metadata } from "next"
import RoutePageClient from "./RoutePageClient"

type Props = {
  params: { stations: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stationNames = params.stations.split("_")
  const station1 = decodeURIComponent(stationNames[0] || "")
  const station2 = decodeURIComponent(stationNames[1] || "")

  return {
    title: `${station1}駅と${station2}駅の中間地点 | 駅間の中間地点検索`,
    description: `${station1}駅と${station2}駅の中間地点となる駅を検索。友人との待ち合わせや不動産探しに最適な中間駅を見つけましょう。`,
    keywords: `${station1} ${station2}, 中間駅, 中間地点, 待ち合わせ場所, 不動産探し`,
  }
}

export default function RoutePage({ params }: Props) {
  return <RoutePageClient params={params} />
}
