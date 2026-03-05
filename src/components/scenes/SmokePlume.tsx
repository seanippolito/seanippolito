import { useRef, useEffect, useState, memo } from "react"

interface Puff {
  x: number       // vw %
  y: number       // vh %
  size: number    // current diameter in px
  maxSize: number // target diameter in px
  opacity: number
  drift: number   // rightward wind drift per frame
  speed: number   // rise speed
  life: number    // 0..1 lifecycle progress
}

const PUFF_COUNT = 12
const PEAK_X = 50 // vw %
const PEAK_Y = 8  // vh %

function spawnPuff(): Puff {
  return {
    x: PEAK_X + (Math.random() - 0.5) * 3,
    y: PEAK_Y + Math.random() * 2,
    size: 40 + Math.random() * 20,
    maxSize: 200 + Math.random() * 150,
    opacity: 0,
    drift: 0.02 + Math.random() * 0.03,   // rightward prevailing wind
    speed: 0.06 + Math.random() * 0.08,
    life: 0,
  }
}

function createInitialPuffs(): Puff[] {
  return Array.from({ length: PUFF_COUNT }, () => {
    const p = spawnPuff()
    p.life = Math.random()
    return p
  })
}

export const SmokePlume = memo(function SmokePlume() {
  const puffsRef = useRef<Puff[]>(createInitialPuffs())
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      for (const p of puffsRef.current) {
        p.life += 0.001 + p.speed * 0.004

        // Rise upward
        p.y -= p.speed * 0.12

        // Drift right (prevailing wind)
        p.x += p.drift

        // Grow from initial size toward maxSize
        const growProgress = Math.min(p.life * 1.5, 1)
        p.size = 40 + (p.maxSize - 40) * growProgress

        // Opacity: fade in quickly, hold, then fade out
        if (p.life < 0.1) {
          p.opacity = (p.life / 0.1) * 0.15
        } else if (p.life > 0.6) {
          p.opacity = ((1 - p.life) / 0.4) * 0.15
        } else {
          p.opacity = 0.15
        }

        // Respawn when lifecycle ends
        if (p.life >= 1) {
          Object.assign(p, spawnPuff())
          p.life = 0
        }
      }

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {puffsRef.current.map((p, i) => {
        // Interpolate color from dark smoky to lighter as puff ages
        const ageFactor = Math.min(p.life, 1)
        const r = Math.round(40 - 10 * ageFactor)
        const g = Math.round(20 - 5 * ageFactor)
        const b = Math.round(15 - 5 * ageFactor)
        const colorAlpha = 0.2 - 0.12 * ageFactor // 0.2 → 0.08

        const blurAmount = 20 + p.size * 0.3

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}vw`,
              top: `${p.y}vh`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, rgba(${r},${g},${b},${colorAlpha}) 0%, rgba(${r},${g},${b},${colorAlpha * 0.4}) 50%, transparent 70%)`,
              filter: `blur(${blurAmount}px)`,
              opacity: p.opacity,
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
            }}
          />
        )
      })}
    </div>
  )
})
