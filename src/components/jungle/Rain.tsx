import { useRef, useEffect, useState } from "react"

interface RainProps {
  active: boolean
  phase: "drizzle" | "heavy" | "tapering" | "off"
}

interface Drop {
  x: number
  y: number
  speed: number
  length: number
  opacity: number
  dying: boolean
}

interface Splash {
  x: number
  y: number
  age: number     // 0-1 lifecycle
  maxRadius: number
  opacity: number
}

const TARGET_COUNTS = { drizzle: 30, heavy: 150, tapering: 50, off: 0 }
const TARGET_OPACITY = { drizzle: 0.4, heavy: 0.6, tapering: 0.3, off: 0 }

// Ground zone: splashes appear in the bottom 20% of viewport
const GROUND_ZONE_START = 0.78

function makeDrop(w: number, fromTop = false): Drop {
  return {
    x: Math.random() * w,
    y: fromTop ? -Math.random() * 100 : Math.random() * window.innerHeight,
    speed: 8 + Math.random() * 12,
    length: 10 + Math.random() * 20,
    opacity: 0,
    dying: false,
  }
}

export function Rain({ active, phase }: RainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<Drop[]>([])
  const splashesRef = useRef<Splash[]>([])
  const rafRef = useRef(0)
  const lastDrawTimeRef = useRef(0)
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const phaseRef = useRef(phase)
  phaseRef.current = phase

  useEffect(() => {
    if (active) {
      setVisible(true)
      setFading(false)
    } else if (visible) {
      setFading(true)
      const timer = setTimeout(() => {
        setVisible(false)
        setFading(false)
        dropsRef.current = []
        splashesRef.current = []
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [active, visible])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !visible) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const angle = Math.tan(8 * Math.PI / 180)
    const mobile = window.matchMedia("(pointer: coarse)").matches
    const scale = mobile ? 0.3 : 1

    const animate = (timestamp: number) => {
      // Throttle to ~30fps on mobile
      if (mobile && timestamp - lastDrawTimeRef.current < 33) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }
      lastDrawTimeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentPhase = phaseRef.current
      const targetCount = Math.floor(TARGET_COUNTS[currentPhase] * scale)
      const targetOpacity = TARGET_OPACITY[currentPhase]
      const drops = dropsRef.current
      const splashes = splashesRef.current
      const groundY = canvas.height * GROUND_ZONE_START

      // Gradually add drops
      const aliveCount = drops.filter(d => !d.dying).length
      if (aliveCount < targetCount) {
        const toAdd = Math.min(3, targetCount - aliveCount)
        for (let i = 0; i < toAdd; i++) {
          drops.push(makeDrop(canvas.width, true))
        }
      }

      // Mark excess drops as dying
      if (aliveCount > targetCount) {
        let toKill = aliveCount - targetCount
        for (let i = drops.length - 1; i >= 0 && toKill > 0; i--) {
          if (!drops[i].dying) {
            drops[i].dying = true
            toKill--
            if (toKill <= Math.max(2, (aliveCount - targetCount) * 0.05)) break
          }
        }
      }

      // Draw rain drops
      ctx.lineWidth = 1.5
      for (let i = drops.length - 1; i >= 0; i--) {
        const drop = drops[i]

        const goal = drop.dying ? 0 : targetOpacity
        drop.opacity += (goal - drop.opacity) * 0.03

        if (drop.dying && drop.opacity < 0.01) {
          drops.splice(i, 1)
          continue
        }

        ctx.strokeStyle = `rgba(200, 215, 235, ${drop.opacity})`
        ctx.beginPath()
        ctx.moveTo(drop.x, drop.y)
        ctx.lineTo(drop.x + angle * drop.length, drop.y + drop.length)
        ctx.stroke()

        drop.y += drop.speed
        drop.x += angle * drop.speed * 0.3

        // Hit ground zone — spawn splash and reset
        if (drop.y > groundY + Math.random() * (canvas.height - groundY)) {
          if (!mobile && !drop.dying && drop.opacity > 0.1) {
            splashes.push({
              x: drop.x,
              y: drop.y,
              age: 0,
              maxRadius: 3 + Math.random() * 5,
              opacity: drop.opacity * 0.8,
            })
          }

          if (drop.dying) {
            drops.splice(i, 1)
          } else {
            drop.y = -drop.length
            drop.x = Math.random() * canvas.width
            drop.speed = 8 + Math.random() * 12
            drop.length = 10 + Math.random() * 20
          }
        }
      }

      // Draw splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i]
        s.age += 0.06

        if (s.age >= 1) {
          splashes.splice(i, 1)
          continue
        }

        const radius = s.maxRadius * s.age
        const fadeOut = 1 - s.age
        const alpha = s.opacity * fadeOut

        // Expanding ring
        ctx.strokeStyle = `rgba(200, 215, 235, ${alpha * 0.6})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.ellipse(s.x, s.y, radius, radius * 0.3, 0, 0, Math.PI * 2)
        ctx.stroke()

        // Tiny upward splash droplets (2-3 small arcs)
        if (s.age < 0.4) {
          const splashAlpha = alpha * (1 - s.age / 0.4)
          ctx.fillStyle = `rgba(200, 215, 235, ${splashAlpha * 0.5})`
          const splashH = s.maxRadius * 1.5 * s.age
          // Left droplet
          ctx.beginPath()
          ctx.arc(s.x - radius * 0.5, s.y - splashH, 1, 0, Math.PI * 2)
          ctx.fill()
          // Right droplet
          ctx.beginPath()
          ctx.arc(s.x + radius * 0.4, s.y - splashH * 0.8, 0.8, 0, Math.PI * 2)
          ctx.fill()
          // Center droplet (taller)
          ctx.beginPath()
          ctx.arc(s.x + radius * 0.1, s.y - splashH * 1.3, 0.6, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [visible])

  if (!visible) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{
        pointerEvents: "none",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 3s ease-out" : "opacity 2s ease-in",
      }}
    />
  )
}
