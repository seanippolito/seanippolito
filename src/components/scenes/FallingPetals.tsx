import { useRef, useEffect, useState, memo } from "react"

interface Petal {
  x: number
  y: number
  size: number
  opacity: number
  fallSpeed: number
  drift: number
  driftPhase: number
  driftSpeed: number
  rotation: number
  rotationSpeed: number
  color: 0 | 1
}

const PETAL_COUNT = 30

const PETAL_COLORS = [
  (opacity: number) => `rgba(255,200,210,${opacity})`,
  (opacity: number) => `rgba(255,255,250,${opacity})`,
]

function spawnPetal(randomY = false): Petal {
  return {
    x: Math.random() * 100,
    y: randomY ? -5 + Math.random() * 110 : -5 - Math.random() * 15,
    size: 4 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.3,
    fallSpeed: 0.02 + Math.random() * 0.03,
    drift: (Math.random() - 0.5) * 0.04,
    driftPhase: Math.random() * Math.PI * 2,
    driftSpeed: 0.015 + Math.random() * 0.015,
    rotation: Math.random() * 360,
    rotationSpeed: 0.5 + Math.random() * 1.5,
    color: (Math.random() < 0.5 ? 0 : 1) as 0 | 1,
  }
}

function initPetals(): Petal[] {
  const petals: Petal[] = []
  for (let i = 0; i < PETAL_COUNT; i++) {
    petals.push(spawnPetal(true))
  }
  return petals
}

export const FallingPetals = memo(function FallingPetals() {
  const petalsRef = useRef<Petal[]>(initPetals())
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      for (const p of petalsRef.current) {
        p.y += p.fallSpeed
        p.driftPhase += p.driftSpeed
        p.x += p.drift + Math.sin(p.driftPhase) * 0.05
        p.rotation += p.rotationSpeed

        // Respawn at top when below screen
        if (p.y > 105) {
          Object.assign(p, spawnPetal())
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
      {petalsRef.current.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "40% 60% 60% 40%",
            background: PETAL_COLORS[p.color](p.opacity),
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
})
