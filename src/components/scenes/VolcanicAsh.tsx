import { useRef, useEffect, useState, memo } from "react"

interface AshParticle {
  x: number
  y: number
  size: number
  opacity: number
  drift: number
  driftPhase: number
  driftSpeed: number
  fallSpeed: number
}

const ASH_COUNT = 60

function spawnAsh(randomY = false): AshParticle {
  const size = 2 + Math.random() * 5
  // Lighter, more visible ash — smoky haze feel
  const baseOpacity = size > 4 ? 0.2 + Math.random() * 0.15 : 0.25 + Math.random() * 0.25
  return {
    x: Math.random() * 100,
    y: randomY ? -5 + Math.random() * 110 : -5 - Math.random() * 15,
    size,
    opacity: baseOpacity,
    drift: (Math.random() - 0.5) * 0.04,
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.01 + Math.random() * 0.02,
    fallSpeed: 0.03 + Math.random() * 0.07,
  }
}

function initAsh(): AshParticle[] {
  const particles: AshParticle[] = []
  for (let i = 0; i < ASH_COUNT; i++) {
    particles.push(spawnAsh(true))
  }
  return particles
}

export const VolcanicAsh = memo(function VolcanicAsh() {
  const particlesRef = useRef<AshParticle[]>(initAsh())
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      for (const p of particlesRef.current) {
        p.y += p.fallSpeed
        p.driftPhase += p.driftSpeed
        p.x += p.drift + Math.sin(p.driftPhase) * 0.03

        // Respawn at top when below screen
        if (p.y > 105) {
          Object.assign(p, spawnAsh())
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
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `rgba(140,120,110,${p.opacity})`,
            filter: `blur(${p.size > 4 ? 2 : 1}px)`,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
})
