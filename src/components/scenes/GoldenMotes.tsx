import { useRef, useEffect, useState, memo } from "react"

interface MoteParticle {
  x: number
  y: number
  size: number
  opacity: number
  riseSpeed: number
  drift: number
  driftPhase: number
  driftSpeed: number
  twinklePhase: number
  twinkleSpeed: number
}

const MOTE_COUNT = 45

function spawnMote(randomY = false): MoteParticle {
  const size = 1.5 + Math.random() * 2.5
  const baseOpacity = 0.3 + Math.random() * 0.4
  return {
    x: Math.random() * 100,
    y: randomY ? Math.random() * 110 : 105 + Math.random() * 10,
    size,
    opacity: baseOpacity,
    riseSpeed: 0.02 + Math.random() * 0.04,
    drift: (Math.random() - 0.5) * 0.04,
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.01 + Math.random() * 0.02,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.03 + Math.random() * 0.05,
  }
}

function initMotes(): MoteParticle[] {
  const particles: MoteParticle[] = []
  for (let i = 0; i < MOTE_COUNT; i++) {
    particles.push(spawnMote(true))
  }
  return particles
}

export const GoldenMotes = memo(function GoldenMotes() {
  const particlesRef = useRef<MoteParticle[]>(initMotes())
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      for (const p of particlesRef.current) {
        p.y -= p.riseSpeed
        p.driftPhase += p.driftSpeed
        p.x += p.drift + Math.sin(p.driftPhase) * 0.03
        p.twinklePhase += p.twinkleSpeed

        // Respawn at bottom when above screen
        if (p.y < -5) {
          Object.assign(p, spawnMote())
        }

        // Wrap horizontal
        if (p.x < -2) p.x = 102
        if (p.x > 102) p.x = -2
      }

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
      {particlesRef.current.map((p, i) => {
        const twinkleOpacity = p.opacity * (0.5 + 0.5 * Math.sin(p.twinklePhase))
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `hsl(45, 100%, 70%)`,
              opacity: twinkleOpacity,
              transform: "translate(-50%, -50%)",
              willChange: "transform, opacity",
            }}
          />
        )
      })}
    </div>
  )
})
