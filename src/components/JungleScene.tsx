import { useState, useEffect, useRef, useCallback } from "react"
import { useMouseParallax, getLayerTransform } from "../hooks/useMouseParallax"
import { BackgroundSky } from "./jungle/BackgroundSky"
import { FarTrees } from "./jungle/FarTrees"
import { GodRays } from "./jungle/GodRays"
import { MidFoliage } from "./jungle/MidFoliage"
import { Mist } from "./jungle/Mist"
import { Ground } from "./jungle/Ground"
import { ForegroundLeaves } from "./jungle/ForegroundLeaves"
import { Animals } from "./jungle/Animals"
import { Fireflies } from "./jungle/Fireflies"
import { Smoke } from "./jungle/Smoke"
import { Flashlight } from "./jungle/Flashlight"
import { EasterEggs } from "./jungle/EasterEggs"
import { Rain } from "./jungle/Rain"
import { LeafTrail } from "./jungle/LeafTrail"
import { CursorFirefly } from "./jungle/CursorFirefly"

type RainPhase = "drizzle" | "heavy" | "tapering" | "off"

interface JungleSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export function JungleScene({ onRainChange, onMouseXChange }: JungleSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  // Rain state
  const [rainActive, setRainActive] = useState(false)
  const [rainPhase, setRainPhase] = useState<RainPhase>("off")
  const rainTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Report mouse X for audio panning
  const prevMouseXRef = useRef(0)
  useEffect(() => {
    const normalized = offset.x / 25 // back to -1..1
    if (Math.abs(normalized - prevMouseXRef.current) > 0.01) {
      prevMouseXRef.current = normalized
      onMouseXChange?.(normalized)
    }
  }, [offset.x, onMouseXChange])

  // Rain cycle
  const scheduleRain = useCallback(() => {
    const delay = (10 + Math.random() * 20) * 1000 // 10-30s (short for testing)
    rainTimerRef.current = setTimeout(() => {
      setRainActive(true)
      setRainPhase("drizzle")
      onRainChange?.(0.2)

      // Phase 2: heavy at 8s
      setTimeout(() => {
        setRainPhase("heavy")
        onRainChange?.(0.8)
      }, 8000)

      // Phase 3: tapering at 28s
      setTimeout(() => {
        setRainPhase("tapering")
        onRainChange?.(0.3)
      }, 28000)

      // End at 45s
      setTimeout(() => {
        setRainActive(false)
        setRainPhase("off")
        onRainChange?.(0)
        scheduleRain()
      }, 45000)
    }, delay)
  }, [onRainChange])

  useEffect(() => {
    scheduleRain()
    return () => {
      if (rainTimerRef.current) clearTimeout(rainTimerRef.current)
    }
  }, [scheduleRain])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Layer 0: Deep sky — static, no movement */}
      <BackgroundSky />

      {/* Layer 1: God rays — barely moves (depth: 0.05) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.05) }}
      >
        <GodRays />
      </div>

      {/* Layer 2: Far trees — slow (depth: 0.12) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.12) }}
      >
        <FarTrees />
      </div>

      {/* Layer 3: Ground mist — behind everything mid-ground (depth: 0.18) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.18) }}
      >
        <Mist />
      </div>

      {/* Layer 4: Ground floor — earth, ponds, logs (depth: 0.22) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.22) }}
      >
        <Ground />
      </div>

      {/* Layer 4b: Easter eggs — synced with ground (depth: 0.22) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.22) }}
      >
        <EasterEggs />
      </div>

      {/* Layer 5: Animals — behind foliage, peeks out (depth: 0.28) */}
      <div
        className="absolute inset-0"
        style={{
          transform: getLayerTransform(offset, 0.28),
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        <Animals mouseX={offset.x / 25} mouseY={offset.y / 25} />
      </div>

      {/* Layer 6: Mid foliage — in front of animals (depth: 0.38) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.38) }}
      >
        <MidFoliage />
      </div>

      {/* Layer 7: Fireflies — floating through mid-scene (depth: 0.55) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.55) }}
      >
        <Fireflies />
      </div>

      {/* Layer 8: Foreground leaves — close bokeh (depth: 0.8) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.8) }}
      >
        <ForegroundLeaves />
      </div>

      {/* Layer 9: Clouds — closest to camera, float over everything (depth: 1.0) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 1.0) }}
      >
        <Smoke />
      </div>

      {/* Layer 9b: Leaf trail — between clouds and flashlight */}
      <LeafTrail />

      {/* Cursor companion — lightning bug */}
      <CursorFirefly />

      {/* Layer 10: Flashlight — dark vignette with bright circle following cursor */}
      <Flashlight />

      {/* Layer 11: Rain — on top of everything */}
      <div className="absolute inset-0" style={{ zIndex: 100 }}>
        <Rain active={rainActive} phase={rainPhase} />
      </div>
    </div>
  )
}
