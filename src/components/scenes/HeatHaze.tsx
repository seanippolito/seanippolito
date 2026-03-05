import { useRef, useEffect, useState, memo } from "react"

interface Wisp {
  x: number
  y: number
  width: number
  height: number
  opacity: number
  drift: number
  speed: number
  life: number
}

const WISP_COUNT = 8

function initWisps(): Wisp[] {
  const wisps: Wisp[] = []
  for (let i = 0; i < WISP_COUNT; i++) {
    wisps.push(spawnWisp())
  }
  return wisps
}

function spawnWisp(): Wisp {
  return {
    x: Math.random() * 100, // vw %
    y: 70 + Math.random() * 25, // bottom portion of screen (vh %)
    width: 60 + Math.random() * 120,
    height: 20 + Math.random() * 40,
    opacity: 0,
    drift: (Math.random() - 0.5) * 0.02,
    speed: 0.08 + Math.random() * 0.12,
    life: Math.random(), // start at random point in lifecycle
  }
}

export const HeatHaze = memo(function HeatHaze() {
  const wispsRef = useRef<Wisp[]>(initWisps())
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      for (const w of wispsRef.current) {
        w.life += 0.002 + w.speed * 0.005
        w.x += w.drift
        w.y -= w.speed * 0.15 // rise slowly

        // Fade in then out over lifecycle
        if (w.life < 0.2) {
          w.opacity = (w.life / 0.2) * 0.12
        } else if (w.life > 0.7) {
          w.opacity = ((1 - w.life) / 0.3) * 0.12
        } else {
          w.opacity = 0.12
        }

        // Respawn when done
        if (w.life >= 1) {
          Object.assign(w, spawnWisp())
          w.life = 0
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
      {wispsRef.current.map((w, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${w.x}%`,
            top: `${w.y}%`,
            width: w.width,
            height: w.height,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(180,120,80,0.3) 0%, rgba(120,60,30,0.1) 40%, transparent 70%)",
            filter: `blur(${12 + w.height * 0.3}px)`,
            opacity: w.opacity,
            transform: `translate(-50%, -50%)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
})
