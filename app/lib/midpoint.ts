// This is a mock implementation of the midpoint finding logic
// In a real application, this would call an LLM API or use a more sophisticated algorithm

interface CachedMidpoint {
  station1: string
  station2: string
  midpoint: string
}

// Simple in-memory cache for demo purposes
// In a real app, this would be stored in a database
const midpointCache: CachedMidpoint[] = []

export async function findMidpointStation(
  station1: string,
  station2: string,
): Promise<string> {
  // Sort station names to ensure consistent caching
  const [s1, s2] = [station1, station2].sort()

  // Check cache first
  const cachedResult = midpointCache.find(
    (item) => item.station1 === s1 && item.station2 === s2,
  )

  if (cachedResult) {
    return cachedResult.midpoint
  }

  // Mock midpoint calculation logic
  let midpoint: string

  // Some hardcoded examples
  if ((s1 === '東京' && s2 === '新宿') || (s1 === '新宿' && s2 === '東京')) {
    midpoint = '四ツ谷'
  } else if (
    (s1 === '渋谷' && s2 === '池袋') ||
    (s1 === '池袋' && s2 === '渋谷')
  ) {
    midpoint = '新宿'
  } else if (
    (s1 === '東京' && s2 === '横浜') ||
    (s1 === '横浜' && s2 === '東京')
  ) {
    midpoint = '品川'
  } else {
    // For other combinations, generate a plausible midpoint
    const stations = [
      '新宿',
      '渋谷',
      '池袋',
      '品川',
      '秋葉原',
      '新橋',
      '銀座',
      '御茶ノ水',
      '飯田橋',
      '高田馬場',
    ]
    const randomIndex = Math.floor(Math.random() * stations.length)
    midpoint = stations[randomIndex]
  }

  // Cache the result
  midpointCache.push({ station1: s1, station2: s2, midpoint })

  return midpoint
}
