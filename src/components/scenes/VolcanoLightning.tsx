import { memo, useRef, useEffect, useState, useCallback } from "react"

interface LightningBolt {
  id: number
  path: string
  phase: "bright" | "dim" | "gone"
  originX: number
  originY: number
}

/** Generate a jagged SVG path string with 3-5 zigzag segments */
function generateBoltPath(startX: number, startY: number): string {
  const segments = 3 + Math.floor(Math.random() * 3) // 3-5 segments
  let x = startX
  let y = startY
  let d = `M ${x} ${y}`

  for (let i = 0; i < segments; i++) {
    // Each segment zigzags horizontally and moves downward
    const dx = (Math.random() - 0.5) * 60 // horizontal jag +-30px in viewBox units
    const dy = 15 + Math.random() * 25 // downward 15-40px
    x += dx
    y += dy
    d += ` L ${x} ${y}`
  }

  return d
}

/** Random value in [min, max] */
function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export const VolcanoLightning = memo(function VolcanoLightning() {
  const [bolt, setBolt] = useState<LightningBolt | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idRef = useRef(0)
  const reducedMotionRef = useRef(false)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const triggerStrike = useCallback(() => {
    if (reducedMotionRef.current) {
      // Skip animation, just schedule next check
      timerRef.current = setTimeout(triggerStrike, rand(4000, 10000))
      return
    }

    const currentId = ++idRef.current

    // Origin point in SVG viewBox coordinates (roughly 40-60% x, 5-15% y)
    const originX = rand(380, 580) // out of 960 viewBox width
    const originY = rand(25, 80) // out of 540 viewBox height

    const path = generateBoltPath(originX, originY)

    // Phase 1: bright (~150ms)
    setBolt({ id: currentId, path, phase: "bright", originX, originY })

    // Thunder crack + screen shake 0.2-0.8s after flash
    const thunderDelay = 200 + Math.random() * 600
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("volcano-thunder"))
      window.dispatchEvent(new CustomEvent("volcano-tremor"))
    }, thunderDelay)

    // Phase 2: dim afterimage (~100ms)
    setTimeout(() => {
      setBolt((prev) =>
        prev && prev.id === currentId
          ? { ...prev, phase: "dim" }
          : prev
      )
    }, 150)

    // Phase 3: gone
    setTimeout(() => {
      setBolt((prev) =>
        prev && prev.id === currentId ? null : prev
      )
    }, 250)

    // Schedule next strike in 4-10 seconds
    timerRef.current = setTimeout(triggerStrike, rand(4000, 10000))
  }, [])

  useEffect(() => {
    // Initial delay before first strike
    timerRef.current = setTimeout(triggerStrike, rand(2000, 5000))
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [triggerStrike])

  return (
    <div className="pointer-events-none absolute inset-0 z-15">
      <svg
        viewBox="0 0 960 540"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {bolt && (
          <>
            <defs>
              <radialGradient
                id={`lightning-flash-${bolt.id}`}
                cx={`${(bolt.originX / 960) * 100}%`}
                cy={`${(bolt.originY / 540) * 100}%`}
                r="15%"
              >
                <stop
                  offset="0%"
                  stopColor={
                    bolt.phase === "bright"
                      ? "rgba(255,255,220,0.35)"
                      : "rgba(255,200,100,0.1)"
                  }
                />
                <stop offset="100%" stopColor="rgba(255,255,220,0)" />
              </radialGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="960"
              height="540"
              fill={`url(#lightning-flash-${bolt.id})`}
              style={{
                transition: "opacity 80ms ease-out",
                opacity: bolt.phase === "gone" ? 0 : 1,
              }}
            />

            {/* Orange outer glow */}
            <path
              d={bolt.path}
              fill="none"
              stroke="rgba(255,160,50,0.6)"
              strokeWidth={bolt.phase === "bright" ? 8 : 4}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#lightning-blur)"
              style={{
                opacity: bolt.phase === "bright" ? 0.8 : 0.3,
                transition: "opacity 80ms ease-out",
              }}
            />

            {/* White-yellow core */}
            <path
              d={bolt.path}
              fill="none"
              stroke={
                bolt.phase === "bright"
                  ? "rgba(255,255,220,0.9)"
                  : "rgba(255,220,150,0.4)"
              }
              strokeWidth={bolt.phase === "bright" ? 3 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "opacity 80ms ease-out",
                opacity: bolt.phase === "gone" ? 0 : 1,
              }}
            />
          </>
        )}

        {/* Reusable blur filter for the glow layer */}
        <defs>
          <filter id="lightning-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
      </svg>
    </div>
  )
})
