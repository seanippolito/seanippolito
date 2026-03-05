import { memo } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"

interface VolcanoSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const VolcanoScene = memo(function VolcanoScene(_props: VolcanoSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Radial lava glow gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 70%, #7f1d1d 0%, #450a0a 50%, #0a0000 100%)",
        }}
      />

      {/* Layer 1: Distant jagged peaks (depth: 0.12) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.12) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Mountain range */}
          <path
            d="M0 600 L200 350 L350 450 L500 280 L650 400 L800 250 L960 180 L1120 300 L1280 220 L1400 350 L1550 280 L1700 380 L1920 300 L1920 1080 L0 1080Z"
            fill="rgba(30,10,10,0.7)"
          />
          {/* Volcano peak with glow */}
          <path
            d="M800 250 L880 120 L960 80 L1040 120 L1120 250"
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            opacity="0.4"
          />
          {/* Lava glow at peak */}
          <ellipse cx="960" cy="100" rx="80" ry="40" fill="rgba(234,88,12,0.15)" />
        </svg>
      </div>

      {/* Layer 2: Closer rock formations + lava rivers (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Foreground rock silhouettes */}
          <path
            d="M0 750 L100 600 L200 680 L350 550 L450 650 L0 750Z"
            fill="rgba(20,5,5,0.8)"
          />
          <path
            d="M1920 700 L1800 550 L1700 620 L1550 500 L1450 600 L1920 700Z"
            fill="rgba(20,5,5,0.7)"
          />
          {/* Lava rivers */}
          <path
            d="M900 1080 Q920 900 940 800 Q960 700 950 600"
            fill="none"
            stroke="#ea580c"
            strokeWidth="4"
            opacity="0.3"
          />
          <path
            d="M1000 1080 Q1020 920 1010 850 Q1000 780 1020 700"
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            opacity="0.2"
          />
          {/* Ground lava glow */}
          <ellipse cx="960" cy="950" rx="400" ry="80" fill="rgba(234,88,12,0.08)" />
        </svg>
      </div>
    </div>
  )
})
