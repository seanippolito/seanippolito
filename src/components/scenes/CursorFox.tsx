import { memo, useRef, useEffect, useState } from "react"

interface FoxState {
  x: number
  y: number
  facingRight: boolean
  isRunning: boolean
  trail: { x: number; y: number; opacity: number }[]
}

interface FoxConfig {
  smoothing: number
  offsetX: number
  lag: number
}

const FOX_CONFIGS: FoxConfig[] = [
  { smoothing: 0.08, offsetX: 0, lag: 40 },
  { smoothing: 0.05, offsetX: -30, lag: 80 },
  { smoothing: 0.03, offsetX: 30, lag: 120 },
]

function initFoxes(): FoxState[] {
  return FOX_CONFIGS.map(() => ({
    x: -200,
    y: -200,
    facingRight: true,
    isRunning: false,
    trail: [],
  }))
}

// Running fox SVG path (simplified arctic fox silhouette, facing right)
function FoxRunning({ size, facingRight, legPhase }: { size: number; facingRight: boolean; legPhase: number }) {
  const legSwing = Math.sin(legPhase) * 3

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 20"
      style={{ transform: facingRight ? "none" : "scaleX(-1)" }}
    >
      {/* Body */}
      <ellipse cx="13" cy="11" rx="7" ry="4.5" fill="#e2e8f0" />

      {/* Head */}
      <ellipse cx="20" cy="9" rx="4.5" ry="3.5" fill="#e2e8f0" />

      {/* Pointed ears */}
      <polygon points="18,6 17,2 20,5.5" fill="#e2e8f0" />
      <polygon points="22,6 23,2 20,5.5" fill="#e2e8f0" />
      {/* Inner ear tint */}
      <polygon points="18.3,5.8 17.6,3 19.6,5.5" fill="#bfdbfe" opacity="0.5" />
      <polygon points="21.7,5.8 22.4,3 20.4,5.5" fill="#bfdbfe" opacity="0.5" />

      {/* Eye */}
      <circle cx="21.5" cy="8.5" r="1" fill="#1e293b" />
      <circle cx="21.8" cy="8.2" r="0.4" fill="rgba(255,255,255,0.8)" />

      {/* Nose */}
      <ellipse cx="24" cy="9.5" rx="0.7" ry="0.5" fill="#94a3b8" />

      {/* Bushy tail — long, curled upward */}
      <path
        d="M6 11 Q2 9 1 6 Q0 3 3 3.5 Q5 4 5.5 7 Q6 9 8 10.5"
        fill="#f1f5f9"
        stroke="#e2e8f0"
        strokeWidth="0.3"
      />
      {/* Tail tip (white fluff) */}
      <ellipse cx="2.5" cy="4" rx="2" ry="1.5" fill="white" opacity="0.9" />

      {/* Legs — animated */}
      {/* Front legs */}
      <line
        x1="18" y1="14.5"
        x2={17 + legSwing} y2="19"
        stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round"
      />
      <line
        x1="20" y1="14.5"
        x2={21 - legSwing} y2="19"
        stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round"
      />
      {/* Hind legs */}
      <line
        x1="10" y1="14.5"
        x2={9 - legSwing} y2="19"
        stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round"
      />
      <line
        x1="12" y1="14.5"
        x2={13 + legSwing} y2="19"
        stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round"
      />

      {/* Belly lighter patch */}
      <ellipse cx="14" cy="12" rx="4.5" ry="2" fill="white" opacity="0.4" />
    </svg>
  )
}

// Sitting fox SVG path — tail wrapped around
function FoxSitting({ size, facingRight }: { size: number; facingRight: boolean }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 22 26"
      style={{ transform: facingRight ? "none" : "scaleX(-1)" }}
    >
      {/* Body — more upright/compact */}
      <ellipse cx="11" cy="16" rx="5.5" ry="6" fill="#e2e8f0" />

      {/* Head */}
      <ellipse cx="11" cy="9" rx="4.5" ry="3.8" fill="#e2e8f0" />

      {/* Pointed ears */}
      <polygon points="8,6 7,1.5 10,5.5" fill="#e2e8f0" />
      <polygon points="14,6 15,1.5 12,5.5" fill="#e2e8f0" />
      {/* Inner ear tint */}
      <polygon points="8.4,5.8 7.8,2.8 10,5.5" fill="#bfdbfe" opacity="0.5" />
      <polygon points="13.6,5.8 14.2,2.8 12,5.5" fill="#bfdbfe" opacity="0.5" />

      {/* Eye */}
      <circle cx="12.5" cy="8.5" r="1" fill="#1e293b" />
      <circle cx="12.8" cy="8.2" r="0.4" fill="rgba(255,255,255,0.8)" />

      {/* Nose */}
      <ellipse cx="14" cy="10" rx="0.7" ry="0.5" fill="#94a3b8" />

      {/* Tail wrapped around — curling along the base */}
      <path
        d="M6 18 Q3 20 3 23 Q4 25 7 24 Q10 23 11 21"
        fill="#f1f5f9"
        stroke="#e2e8f0"
        strokeWidth="0.3"
      />
      {/* Tail tip */}
      <ellipse cx="4" cy="24" rx="2" ry="1.2" fill="white" opacity="0.9" />

      {/* Front paws — tucked */}
      <ellipse cx="9" cy="22" rx="2" ry="1" fill="#e2e8f0" />
      <ellipse cx="13" cy="22" rx="2" ry="1" fill="#e2e8f0" />

      {/* Belly lighter patch */}
      <ellipse cx="11" cy="17" rx="3.5" ry="4" fill="white" opacity="0.35" />
    </svg>
  )
}

export const CursorFox = memo(function CursorFox() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const foxesRef = useRef<FoxState[]>(initFoxes())
  const targetRef = useRef({ x: -200, y: -200 })
  const prevTargetRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef(0)
  const legPhaseRef = useRef(0)
  const movingTimerRef = useRef(0)
  const isMovingRef = useRef(false)

  const [foxes, setFoxes] = useState<FoxState[]>(initFoxes)

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      prevTargetRef.current = { ...targetRef.current }
      targetRef.current = { x: e.clientX, y: e.clientY }
      isMovingRef.current = true
      clearTimeout(movingTimerRef.current)
      movingTimerRef.current = window.setTimeout(() => {
        isMovingRef.current = false
      }, 150)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      prevTargetRef.current = { ...targetRef.current }
      targetRef.current = { x: t.clientX, y: t.clientY }
      isMovingRef.current = true
      clearTimeout(movingTimerRef.current)
      movingTimerRef.current = window.setTimeout(() => {
        isMovingRef.current = false
      }, 150)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    const animate = () => {
      const t = targetRef.current
      const moving = isMovingRef.current
      const f = foxesRef.current

      // Advance leg phase when running
      if (moving) {
        legPhaseRef.current += 0.35
      }

      // Determine cursor movement direction
      const dx = t.x - prevTargetRef.current.x
      const facingRight = dx >= 0

      for (let i = 0; i < FOX_CONFIGS.length; i++) {
        const cfg = FOX_CONFIGS[i]
        const fox = f[i]

        // Goal is behind the cursor by lag amount, offset sideways
        const lagDir = facingRight ? -1 : 1
        const goalX = t.x + lagDir * cfg.lag + cfg.offsetX
        const goalY = t.y

        const prevX = fox.x
        fox.x += (goalX - fox.x) * cfg.smoothing
        fox.y += (goalY - fox.y) * cfg.smoothing

        // Determine individual fox facing direction by its own movement
        const foxDx = fox.x - prevX
        if (Math.abs(foxDx) > 0.1) {
          fox.facingRight = foxDx > 0
        }

        fox.isRunning = moving

        // Update frost trail
        const trailEntry = { x: fox.x, y: fox.y, opacity: 0.6 }
        fox.trail = [
          trailEntry,
          ...fox.trail.slice(0, 2).map((pt) => ({ ...pt, opacity: pt.opacity * 0.5 })),
        ]
      }

      setFoxes(f.map((fox) => ({
        x: fox.x,
        y: fox.y,
        facingRight: fox.facingRight,
        isRunning: fox.isRunning,
        trail: fox.trail.map((pt) => ({ ...pt })),
      })))

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(movingTimerRef.current)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  const FOX_SIZE = 28
  const legPhase = legPhaseRef.current

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-50">
      {foxes.map((fox, i) => (
        <div key={i}>
          {/* Frost trail dots */}
          {fox.trail.map((pt, j) => (
            <div
              key={`trail-${i}-${j}`}
              style={{
                position: "fixed",
                left: pt.x - 2,
                top: pt.y + FOX_SIZE * 0.3,
                width: Math.max(1, 4 - j),
                height: Math.max(1, 4 - j),
                borderRadius: "50%",
                background: `rgba(191,219,254,${pt.opacity * 0.7})`,
                willChange: "transform",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Fox silhouette */}
          <div
            style={{
              position: "fixed",
              left: fox.x - FOX_SIZE / 2,
              top: fox.y - FOX_SIZE / 2,
              width: FOX_SIZE,
              height: FOX_SIZE * (fox.isRunning ? 1 : 1.2),
              willChange: "transform",
              filter: "drop-shadow(0 0 4px rgba(191,219,254,0.5))",
            }}
          >
            {fox.isRunning ? (
              <FoxRunning
                size={FOX_SIZE}
                facingRight={fox.facingRight}
                legPhase={legPhase - i * 1.05}
              />
            ) : (
              <FoxSitting size={FOX_SIZE} facingRight={fox.facingRight} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
})
