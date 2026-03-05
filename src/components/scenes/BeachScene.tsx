import { memo } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"

interface BeachSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const BeachScene = memo(function BeachScene(_props: BeachSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Sky-to-sand gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #87ceeb 0%, #2dd4bf 50%, #c2956b 100%)",
        }}
      />

      {/* Layer 1: Distant horizon — waves + dunes (depth: 0.12) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.12) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Ocean waves */}
          <path
            d="M0 550 Q240 520 480 550 Q720 580 960 550 Q1200 520 1440 550 Q1680 580 1920 550 L1920 650 L0 650Z"
            fill="rgba(45,212,191,0.3)"
          />
          <path
            d="M0 580 Q300 560 600 580 Q900 600 1200 580 Q1500 560 1920 580 L1920 680 L0 680Z"
            fill="rgba(45,212,191,0.2)"
          />
          {/* Sand dunes */}
          <path
            d="M0 700 Q300 660 600 690 Q960 720 1300 680 Q1600 660 1920 700 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.4)"
          />
        </svg>
      </div>

      {/* Layer 2: Palm tree silhouettes + closer beach (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Palm tree left */}
          <g fill="rgba(34,85,34,0.5)">
            <rect x="180" y="400" width="12" height="400" rx="6" transform="rotate(-5 186 600)" />
            <ellipse cx="140" cy="380" rx="100" ry="30" transform="rotate(-20 140 380)" />
            <ellipse cx="230" cy="370" rx="90" ry="25" transform="rotate(15 230 370)" />
            <ellipse cx="170" cy="360" rx="80" ry="22" transform="rotate(-40 170 360)" />
          </g>
          {/* Palm tree right */}
          <g fill="rgba(34,85,34,0.4)">
            <rect x="1650" y="350" width="14" height="450" rx="7" transform="rotate(3 1657 575)" />
            <ellipse cx="1610" cy="330" rx="110" ry="32" transform="rotate(-15 1610 330)" />
            <ellipse cx="1710" cy="320" rx="95" ry="28" transform="rotate(20 1710 320)" />
            <ellipse cx="1660" cy="310" rx="85" ry="24" transform="rotate(-35 1660 310)" />
          </g>
          {/* Closer sand */}
          <path
            d="M0 800 Q480 770 960 800 Q1440 830 1920 800 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.5)"
          />
        </svg>
      </div>
    </div>
  )
})
