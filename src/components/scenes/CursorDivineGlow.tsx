import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  startSize: number
  opacity: number
  hue: number // 42–55 gold range
  lightness: number // 60–80%
  life: number // 0..1 progress toward death
}

const POOL_SIZE = 22

function initSparks(): Spark[] {
  const sparks: Spark[] = []
  for (let i = 0; i < POOL_SIZE; i++) {
    sparks.push({
      x: -100, y: -100,
      vx: 0, vy: 0,
      size: 2,
      startSize: 2,
      opacity: 0,
      hue: 48,
      lightness: 70,
      life: 1,
    })
  }
  return sparks
}

export function CursorDivineGlow() {
  const isMobile = useIsMobile()
  const sparksRef = useRef<Spark[]>(initSparks())
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const rafRef = useRef(0)
  const spawnIndexRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const m = mouseRef.current
      m.prevX = m.x
      m.prevY = m.y
      m.x = e.clientX
      m.y = e.clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (!touch) return
      const m = mouseRef.current
      m.prevX = m.x
      m.prevY = m.y
      m.x = touch.clientX
      m.y = touch.clientY
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    const animate = () => {
      const m = mouseRef.current
      const dx = m.x - m.prevX
      const dy = m.y - m.prevY
      const speed = Math.sqrt(dx * dx + dy * dy)

      // Spawn sparks when mouse moves
      if (speed > 2) {
        const count = Math.min(3, Math.floor(speed / 8) + 1)
        for (let c = 0; c < count; c++) {
          const s = sparksRef.current[spawnIndexRef.current]
          s.x = m.x + (Math.random() - 0.5) * 10
          s.y = m.y + (Math.random() - 0.5) * 10
          s.vx = (Math.random() - 0.5) * 0.6 // slight horizontal drift: -0.3 to 0.3
          s.vy = -(0.3 + Math.random() * 0.7) // float upward: -0.3 to -1.0
          s.startSize = 2 + Math.random() * 3 // 2–5px
          s.size = s.startSize
          s.opacity = 0.8 + Math.random() * 0.2
          s.hue = 42 + Math.random() * 13 // 42–55 gold range
          s.lightness = 60 + Math.random() * 20 // 60–80%
          s.life = 0
          spawnIndexRef.current = (spawnIndexRef.current + 1) % POOL_SIZE
        }
      }

      let anyVisible = false
      for (const s of sparksRef.current) {
        if (s.opacity <= 0) continue
        anyVisible = true
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.97 // horizontal damping
        s.vy *= 0.985 // vertical damping (slow fade upward)
        s.life += 0.022
        s.opacity = Math.max(0, 1 - s.life) * 0.9
        s.size = s.startSize * (1 - s.life) // shrink as they age
      }

      if (anyVisible || speed > 2) {
        forceRender((n) => n + 1)
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (isMobile) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {sparksRef.current.map((s, i) =>
        s.opacity > 0.01 ? (
          <div
            key={i}
            style={{
              position: "absolute",
              width: s.size,
              height: s.size,
              borderRadius: "50%",
              background: `hsl(${s.hue}, 100%, ${s.lightness}%)`,
              transform: `translate(${s.x - s.size / 2}px, ${s.y - s.size / 2}px)`,
              opacity: s.opacity,
              willChange: "transform, opacity",
            }}
          />
        ) : null
      )}
    </div>
  )
}
