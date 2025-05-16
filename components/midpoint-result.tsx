'use client';

import { useEffect, useState } from 'react';
import { MapPin, Train } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { findMidpointStation } from '@/lib/midpoint';

interface MidpointResultProps {
  station1: string;
  station2: string;
}

export default function MidpointResult({
  station1,
  station2,
}: MidpointResultProps) {
  const [midpoint, setMidpoint] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMidpoint = async () => {
      try {
        setLoading(true);
        // In a real app, this would call an API endpoint that uses LLM
        const result = await findMidpointStation(station1, station2);
        setMidpoint(result);
      } catch (error) {
        console.error('Error fetching midpoint:', error);
        setMidpoint('中間地点の検索に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMidpoint();
  }, [station1, station2]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center p-8">
            <div className="animate-pulse flex flex-col items-center space-y-4">
              <div className="h-12 w-12 rounded-full bg-muted" />
              <div className="h-4 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-2 mb-2">
            <div className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
              {station1}
            </div>
            <div className="text-muted-foreground">と</div>
            <div className="px-3 py-1 rounded-full bg-muted text-sm font-medium">
              {station2}
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-1">の中間地点は</h2>

          <div className="bg-primary/10 rounded-lg p-4 mb-4 w-full">
            <div className="flex items-center justify-center">
              <Train className="h-6 w-6 mr-2 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {midpoint}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            {station1}駅と{station2}駅の中間地点として、{midpoint}駅が最適です。
            この駅は両方からアクセスしやすい位置にあります。
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${midpoint}駅`,
                '_blank'
              );
            }}
          >
            <MapPin className="mr-2 h-4 w-4" />
            地図で見る
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
