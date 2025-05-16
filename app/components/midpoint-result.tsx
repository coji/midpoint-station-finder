import { MapPin, Train } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'

interface MidpointResultProps {
  station1: string
  station2: string
  midpoint: string
}

export default function MidpointResult({
  station1,
  station2,
  midpoint,
}: MidpointResultProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2 flex items-center space-x-2">
            <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">
              {station1}
            </div>
            <div className="text-muted-foreground">と</div>
            <div className="bg-muted rounded-full px-3 py-1 text-sm font-medium">
              {station2}
            </div>
          </div>

          <h2 className="mb-1 text-lg font-semibold">の中間地点は</h2>

          <div className="bg-primary/10 mb-4 w-full rounded-lg p-4">
            <div className="flex items-center justify-center">
              <Train className="text-primary mr-2 h-6 w-6" />
              <span className="text-primary text-2xl font-bold">
                {midpoint}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6 text-sm">
            {station1}駅と{station2}駅の中間地点として、{midpoint}駅が最適です。
            この駅は両方からアクセスしやすい位置にあります。
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${midpoint}駅`,
                '_blank',
              )
            }}
          >
            <MapPin className="mr-2 h-4 w-4" />
            地図で見る
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
