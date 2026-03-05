import { memo, useEffect, useRef } from "react"

// Chimney world position in SVG viewBox (0 0 1920 1080):
// Cabin group: translate(1350, 540)
// Chimney rect: x:55 y:-4, width:10 — top of chimney at y: 540 + (-6) = 534, center x: 1350 + 60 = 1410
const CHIMNEY_SVG_X = 1410
const CHIMNEY_SVG_Y = 530

interface Particle {
  x: number        // canvas px
  y: number        // canvas px
  radius: number   // current radius in canvas px
  opacity: number  // 0..1
  age: number      // 0..1 lifecycle progress
  speedY: number   // px/frame upward
  speedX: number   // px/frame horizontal drift
  birthX: number   // spawn x in canvas px
  birthY: number   // spawn y in canvas px
  maxAge: number   // total lifetime in frames
  baseRadius: number
}

function makeParticle(
  canvasW: number,
  canvasH: number,
  windIntensity: number,
  initialAge = 0
): Particle {
  const spawnX = (CHIMNEY_SVG_X / 1920) * canvasW + (Math.random() - 0.5) * 4
  const spawnY = (CHIMNEY_SVG_Y / 1080) * canvasH

  // Wind bends smoke to the left: negative x drift proportional to windIntensity
  const baseLeft = -0.3 - windIntensity * 1.4
  const jitter = (Math.random() - 0.5) * 0.4
  const speedX = baseLeft + jitter

  const speedY = -(2 + Math.random() * 2) // rise 2-4px/frame

  const baseRadius = 3 + Math.random() * 2
  const maxAge = 80 + Math.random() * 80 // frames before reset

  const p: Particle = {
    x: spawnX,
    y: spawnY,
    radius: baseRadius,
    opacity: 0,
    age: initialAge,
    speedY,
    speedX,
    birthX: spawnX,
    birthY: spawnY,
    maxAge,
    baseRadius,
  }

  // If seeded with an initial age, advance position to match
  if (initialAge > 0) {
    const frames = initialAge * maxAge
    p.x = spawnX + speedX * frames
    p.y = spawnY + speedY * frames
  }

  return p
}

const PARTICLE_COUNT = 25

export const CabinSmoke = memo(function CabinSmoke({
  windIntensity,
}: {
  windIntensity: number
}) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const windRef = useRef(windIntensity)

  // Keep windRef in sync without recreating the animation loop
  useEffect(() => {
    windRef.current = windIntensity
  }, [windIntensity])

  useEffect(() => {
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Re-seed particles on resize so they map to new dimensions
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, (_, i) =>
        makeParticle(
          canvas.width,
          canvas.height,
          windRef.current,
          i / PARTICLE_COUNT // stagger initial ages
        )
      )
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      for (const p of particlesRef.current) {
        // Advance particle
        p.age += 1 / p.maxAge

        // Drift with current wind each frame (slight per-frame wind influence)
        const wind = windRef.current
        const baseLeft = -0.3 - wind * 1.4
        p.x += p.speedX * 0.5 + baseLeft * 0.5
        p.y += p.speedY

        // Grow radius: starts at baseRadius, grows to 3x over lifetime
        p.radius = p.baseRadius + (p.baseRadius * 2) * Math.min(p.age * 1.5, 1)

        // Opacity: fade in for first 10% of life, hold low, fade out after 60%
        if (p.age < 0.1) {
          p.opacity = (p.age / 0.1) * 0.12
        } else if (p.age > 0.6) {
          p.opacity = ((1 - p.age) / 0.4) * 0.12
        } else {
          p.opacity = 0.08 + Math.random() * 0.04
        }

        // Clamp opacity
        p.opacity = Math.max(0, Math.min(0.15, p.opacity))

        // Draw smoke puff as radial gradient circle
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius)
        const age01 = Math.min(p.age, 1)
        // Younger smoke is slightly warmer grey, older is cooler white
        const bright = Math.round(200 + 55 * age01) // 200 -> 255
        grad.addColorStop(0, `rgba(${bright},${bright},${bright},${p.opacity})`)
        grad.addColorStop(
          0.6,
          `rgba(${bright},${bright},${bright},${p.opacity * 0.5})`
        )
        grad.addColorStop(1, `rgba(${bright},${bright},${bright},0)`)

        ctx.save()
        ctx.filter = `blur(${2 + p.radius * 0.3}px)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()

        // Reset particle when lifecycle ends or floats off screen
        if (p.age >= 1 || p.y < -50) {
          const spawnX =
            (CHIMNEY_SVG_X / 1920) * w + (Math.random() - 0.5) * 4
          const spawnY = (CHIMNEY_SVG_Y / 1080) * h
          const currentWind = windRef.current
          const left = -0.3 - currentWind * 1.4
          const jitter = (Math.random() - 0.5) * 0.4

          p.x = spawnX
          p.y = spawnY
          p.age = 0
          p.birthX = spawnX
          p.birthY = spawnY
          p.speedX = left + jitter
          p.speedY = -(2 + Math.random() * 2)
          p.baseRadius = 3 + Math.random() * 2
          p.radius = p.baseRadius
          p.opacity = 0
          p.maxAge = 80 + Math.random() * 80
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  )
})
