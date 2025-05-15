import { type NextRequest, NextResponse } from "next/server"
import { findMidpointStation } from "@/lib/midpoint"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const station1 = searchParams.get("station1")
  const station2 = searchParams.get("station2")

  if (!station1 || !station2) {
    return NextResponse.json({ error: "Both station1 and station2 parameters are required" }, { status: 400 })
  }

  try {
    const midpoint = await findMidpointStation(station1, station2)

    return NextResponse.json({
      station1,
      station2,
      midpoint,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error finding midpoint:", error)
    return NextResponse.json({ error: "Failed to find midpoint station" }, { status: 500 })
  }
}
