import { memo } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"

interface HeavenSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const HeavenScene = memo(function HeavenScene(_props: HeavenSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Sky gradient — radial gold center to pale blue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #fffbe6 0%, #c4d7f2 50%, #7ba7cc 100%)",
        }}
      />

      {/* Layer 1: Distant cloud banks (depth: 0.12) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.12) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="heaven-cloud-glow" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c4d7f2" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Soft cloud silhouettes */}
          <ellipse cx="300" cy="350" rx="280" ry="80" fill="rgba(255,255,255,0.25)" />
          <ellipse cx="800" cy="280" rx="350" ry="100" fill="rgba(255,255,255,0.3)" />
          <ellipse cx="1400" cy="320" rx="300" ry="90" fill="rgba(255,255,255,0.2)" />
          <ellipse cx="1700" cy="400" rx="200" ry="60" fill="rgba(255,255,255,0.15)" />
          {/* Golden rays from center */}
          <rect x="940" y="0" width="40" height="600" fill="rgba(255,223,100,0.06)" transform="rotate(-8 960 300)" />
          <rect x="900" y="0" width="30" height="500" fill="rgba(255,223,100,0.04)" transform="rotate(5 915 250)" />
          <rect x="980" y="0" width="35" height="550" fill="rgba(255,223,100,0.05)" transform="rotate(-15 997 275)" />
        </svg>
      </div>

      {/* Layer 2: Closer cloud formations (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <ellipse cx="200" cy="700" rx="350" ry="120" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="600" cy="750" rx="250" ry="80" fill="rgba(255,255,255,0.25)" />
          <ellipse cx="1100" cy="680" rx="400" ry="130" fill="rgba(255,255,255,0.3)" />
          <ellipse cx="1600" cy="730" rx="300" ry="100" fill="rgba(255,255,255,0.2)" />
          {/* Floating pillars / spires */}
          <rect x="450" y="500" width="60" height="250" rx="30" fill="rgba(255,255,255,0.12)" />
          <rect x="1350" y="450" width="50" height="300" rx="25" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>
    </div>
  )
})
