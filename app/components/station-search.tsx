import { Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { href, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import { Label } from '~/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { getStations } from '~/lib/stations'

export default function StationSearch() {
  const navigate = useNavigate()
  const [station1, setStation1] = useState('')
  const [station2, setStation2] = useState('')
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const stations = getStations()

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse recent searches', e)
      }
    }
  }, [])

  const handleSearch = () => {
    if (!station1 || !station2) {
      toast.error('入力エラー', {
        description: '2つの駅名を入力してください',
      })
      return
    }

    if (station1 === station2) {
      toast.error('入力エラー', {
        description: '異なる駅を選択してください',
      })
      return
    }

    // Sort station names alphabetically to create a consistent route ID
    const sortedStations = [station1, station2].sort()
    const routeId = `${encodeURIComponent(
      sortedStations[0],
    )}_${encodeURIComponent(sortedStations[1])}`

    // Save to recent searches
    const newSearches = [
      routeId,
      ...recentSearches.filter((s) => s !== routeId),
    ].slice(0, 5)
    setRecentSearches(newSearches)
    localStorage.setItem('recentSearches', JSON.stringify(newSearches))

    // Navigate to result page
    navigate(href('/:stations', { stations: routeId }))
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="station1">出発駅</Label>
            <Popover open={open1} onOpenChange={setOpen1}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  aria-expanded={open1}
                  className="w-full justify-between"
                >
                  {station1 || '駅名を入力'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="駅名を検索..." />
                  <CommandEmpty>駅が見つかりません</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {stations.map((station) => (
                        <CommandItem
                          key={station}
                          value={station}
                          onSelect={(currentValue) => {
                            setStation1(currentValue)
                            setOpen1(false)
                          }}
                        >
                          {station}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="station2">到着駅</Label>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  aria-expanded={open2}
                  className="w-full justify-between"
                >
                  {station2 || '駅名を入力'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="駅名を検索..." />
                  <CommandEmpty>駅が見つかりません</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {stations.map((station) => (
                        <CommandItem
                          key={station}
                          value={station}
                          onSelect={(currentValue) => {
                            setStation2(currentValue)
                            setOpen2(false)
                          }}
                        >
                          {station}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="w-full"
            onClick={handleSearch}
            disabled={!station1 || !station2}
          >
            <Search className="mr-2 h-4 w-4" /> 中間地点を検索
          </Button>

          {recentSearches.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium">最近の検索</h3>
              <div className="space-y-2">
                {recentSearches.map((routeId) => {
                  const [s1, s2] = routeId.split('_').map(decodeURIComponent)
                  return (
                    <Button
                      key={routeId}
                      variant="outline"
                      className="w-full justify-start text-sm"
                      onClick={() =>
                        navigate(href('/:stations', { stations: routeId }))
                      }
                    >
                      {s1} ⇔ {s2}
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
