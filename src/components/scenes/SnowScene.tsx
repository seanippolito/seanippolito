import { memo } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"

interface SnowSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const SnowScene = memo(function SnowScene(_props: SnowSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Steel grey to white gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #94a3b8 0%, #bfdbfe 50%, #f8fafc 100%)",
        }}
      />

      {/* Layer 1: Distant mountain ridges (depth: 0.12) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.12) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Far mountain range */}
          <path
            d="M0 500 L150 350 L350 420 L550 250 L750 380 L960 200 L1170 350 L1350 270 L1550 400 L1750 300 L1920 380 L1920 1080 L0 1080Z"
            fill="#64748b"
            opacity="0.4"
          />
          {/* Snow caps */}
          <path
            d="M500 280 L550 250 L600 290"
            fill="white"
            opacity="0.6"
          />
          <path
            d="M910 230 L960 200 L1010 240"
            fill="white"
            opacity="0.7"
          />
          <path
            d="M1300 300 L1350 270 L1400 310"
            fill="white"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Layer 2: Pine tree silhouettes + snow ground (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Pine trees */}
          <g fill="#64748b" opacity="0.5">
            {/* Left cluster */}
            <polygon points="120,750 150,500 180,750" />
            <polygon points="200,730 240,450 280,730" />
            <polygon points="300,760 330,520 360,760" />
            {/* Right cluster */}
            <polygon points="1550,740 1580,480 1610,740" />
            <polygon points="1650,760 1690,440 1730,760" />
            <polygon points="1770,750 1800,510 1830,750" />
          </g>
          {/* Snow ground */}
          <path
            d="M0 800 Q300 780 600 800 Q960 820 1300 790 Q1600 780 1920 810 L1920 1080 L0 1080Z"
            fill="rgba(248,250,252,0.6)"
          />
          {/* Snow drifts */}
          <ellipse cx="500" cy="850" rx="200" ry="30" fill="rgba(255,255,255,0.4)" />
          <ellipse cx="1400" cy="830" rx="250" ry="35" fill="rgba(255,255,255,0.3)" />
        </svg>
      </div>
    </div>
  )
})
