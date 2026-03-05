import { memo, useEffect, useRef, useState } from "react"
import { getLayerTransform } from "../../hooks/useMouseParallax"

interface SwayingPinesProps {
  windIntensity: number
  offset: { x: number; y: number }
}

// Per-tree sway multiplier: trees further from center lean more
interface TreeConfig {
  x: number
  baseY: number
  tipY: number
  multiplier: number
  opacity: number
  side: "left" | "right"
}

const LEFT_TREES: TreeConfig[] = [
  { x: 60,  baseY: 940, tipY: 500, multiplier: 1.4, opacity: 0.80, side: "left" },
  { x: 160, baseY: 950, tipY: 540, multiplier: 1.2, opacity: 0.88, side: "left" },
  { x: 280, baseY: 930, tipY: 580, multiplier: 1.0, opacity: 0.92, side: "left" },
]

const RIGHT_TREES: TreeConfig[] = [
  { x: 1860, baseY: 940, tipY: 510, multiplier: 1.4, opacity: 0.80, side: "right" },
  { x: 1740, baseY: 950, tipY: 550, multiplier: 1.2, opacity: 0.88, side: "right" },
  { x: 1640, baseY: 930, tipY: 590, multiplier: 1.0, opacity: 0.92, side: "right" },
]

const ALL_TREES = [...LEFT_TREES, ...RIGHT_TREES]

// Render a single layered pine tree with snow caps
function PineTree({ tree, skewDeg }: { tree: TreeConfig; skewDeg: number }) {
  const { x, baseY, tipY, opacity } = tree
  const height = baseY - tipY
  const trunkH = 40
  const trunkW = 14
  const tierCount = 4

  // Trunk
  const trunkX = x - trunkW / 2
  const trunkY = baseY - trunkH

  // Build tiers from top (narrowest) to bottom (widest)
  const tiers: Array<{ pts: string; snowPts: string; yTop: number; yBot: number }> = []
  for (let i = 0; i < tierCount; i++) {
    const t = i / (tierCount - 1) // 0 = top tier, 1 = bottom tier
    const yTop = tipY + t * height * 0.7
    const yBot = tipY + (i + 1) * (height * 0.85) / tierCount
    const halfW = 20 + t * 80 // narrow at top, wide at bottom
    const snowH = (yBot - yTop) * 0.45

    const pts = `${x},${yTop} ${x + halfW},${yBot} ${x - halfW},${yBot}`
    // Snow patch: top third of each tier
    const snowPts = `${x},${yTop} ${x + halfW * 0.55},${yTop + snowH} ${x - halfW * 0.55},${yTop + snowH}`

    tiers.push({ pts, snowPts, yTop, yBot })
  }

  // Pivot point for skew is at base of trunk
  const pivotX = x
  const pivotY = baseY

  return (
    <g
      style={{
        transform: `skewX(${skewDeg}deg)`,
        transformOrigin: `${pivotX}px ${pivotY}px`,
        transition: "transform 0.5s ease-out",
        opacity,
      }}
    >
      {/* Trunk */}
      <rect
        x={trunkX}
        y={trunkY}
        width={trunkW}
        height={trunkH}
        fill="#3b1a00"
        rx={2}
      />

      {/* Foliage tiers */}
      {tiers.map((tier, i) => (
        <g key={i}>
          <polygon points={tier.pts} fill="#1e3a2f" />
          <polygon
            points={tier.snowPts}
            fill="white"
            opacity={0.6 + i * 0.05}
          />
        </g>
      ))}
    </g>
  )
}

export const SwayingPines = memo(function SwayingPines({
  windIntensity,
  offset,
}: SwayingPinesProps) {
  // Animated sway angles per tree
  const [swayAngles, setSwayAngles] = useState<number[]>(ALL_TREES.map(() => 0))
  const rafRef = useRef<number>(0)
  const windRef = useRef(windIntensity)

  useEffect(() => {
    windRef.current = windIntensity
  }, [windIntensity])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      const now = Date.now() / 1000
      const w = windRef.current
      const angles = ALL_TREES.map((tree) => {
        const oscillation = Math.sin(now + tree.x * 0.002) * 0.5
        const base = w * -4 * tree.multiplier + oscillation
        return base
      })
      setSwayAngles(angles)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ transform: getLayerTransform(offset, 0.45) }}
    >
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {ALL_TREES.map((tree, i) => (
          <PineTree key={i} tree={tree} skewDeg={swayAngles[i] ?? 0} />
        ))}
      </svg>
    </div>
  )
})
