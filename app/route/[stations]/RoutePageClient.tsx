'use client';

import { Suspense, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MidpointResult from '@/components/midpoint-result';

type Props = {
  params: { stations: string };
};

export default function RoutePageClient({ params }: Props) {
  const { stations } = params;
  const stationNames = stations.split('_');
  const station1 = decodeURIComponent(stationNames[0] || '');
  const station2 = decodeURIComponent(stationNames[1] || '');

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">
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
                });
              }
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>

        <Suspense fallback={<div className="text-center">検索中...</div>}>
          <MidpointResult station1={station1} station2={station2} />
        </Suspense>

        <div className="mt-8">
          <Link href="/">
            <Button variant="outline" className="w-full">
              新しい検索を始める
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
