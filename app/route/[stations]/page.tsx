import type { Metadata } from 'next';
import RoutePageClient from './RoutePageClient';

type Props = {
  params: Promise<{ stations: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stations } = await params;
  const stationNames = stations.split('_');
  const station1 = decodeURIComponent(stationNames[0] || '');
  const station2 = decodeURIComponent(stationNames[1] || '');

  return {
    title: `${station1}駅と${station2}駅の中間地点 | 駅間の中間地点検索`,
    description: `${station1}駅と${station2}駅の中間地点となる駅を検索。友人との待ち合わせや不動産探しに最適な中間駅を見つけましょう。`,
    keywords: `${station1} ${station2}, 中間駅, 中間地点, 待ち合わせ場所, 不動産探し`,
  };
}

export default async function RoutePage({ params }: Props) {
  const { stations } = await params;
  return <RoutePageClient params={{ stations }} />;
}
