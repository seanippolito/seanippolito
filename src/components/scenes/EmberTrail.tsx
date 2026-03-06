import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useTouchActive } from "../../hooks/useTouchActive"

interface Ember {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number // 0–40 range for orange-to-yellow
  life: number // 0..1 progress toward death
}

const POOL_SIZE = 25

function initEmbers(): Ember[] {
  const embers: Ember[] = []
  for (let i = 0; i < POOL_SIZE; i++) {
    embers.push({
      x: -100, y: -100,
      vx: 0, vy: 0,
      size: 2,
      opacity: 0,
      hue: 20,
      life: 1,
    })
  }
  return embers
}

export function EmberTrail() {
  const isMobile = useIsMobile()
  const { active, scattering } = useTouchActive()
  const embersRef = useRef<Ember[]>(initEmbers())
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })
  const rafRef = useRef(0)
  const spawnIndexRef = useRef(0)
  const [, forceRender] = useState(0)
  const canSpawnRef = useRef(true)

  // On mobile, only spawn while actively touching (not scattering)
  useEffect(() => {
    canSpawnRef.current = !isMobile || (active && !scattering)
  }, [isMobile, active, scattering])

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

      // Spawn embers when mouse moves (and spawning is allowed)
      if (speed > 2 && canSpawnRef.current) {
        const count = Math.min(3, Math.floor(speed / 8) + 1)
        for (let c = 0; c < count; c++) {
          const e = embersRef.current[spawnIndexRef.current]
          e.x = m.x + (Math.random() - 0.5) * 10
          e.y = m.y + (Math.random() - 0.5) * 10
          e.vx = (Math.random() - 0.5) * 2
          e.vy = -(1 + Math.random() * 3) // float upward
          e.size = 1.5 + Math.random() * 3
          e.opacity = 0.8 + Math.random() * 0.2
          e.hue = Math.random() * 40 // 0=red, 20=orange, 40=yellow
          e.life = 0
          spawnIndexRef.current = (spawnIndexRef.current + 1) % POOL_SIZE
        }
      }

      let anyVisible = false
      for (const e of embersRef.current) {
        if (e.opacity <= 0) continue
        anyVisible = true
        e.x += e.vx
        e.y += e.vy
        e.vx *= 0.98
        e.vy *= 0.97
        e.vx += (Math.random() - 0.5) * 0.3 // slight wander
        e.life += 0.015
        e.opacity = Math.max(0, 1 - e.life) * 0.9
        e.size *= 0.997 // slowly shrink
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

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      {embersRef.current.map((e, i) =>
        e.opacity > 0.01 ? (
          <div
            key={i}
            style={{
              position: "absolute",
              width: e.size,
              height: e.size,
              borderRadius: "50%",
              background: `hsl(${e.hue}, 100%, ${55 + e.life * 20}%)`,
              boxShadow: `0 0 ${e.size * 2}px hsl(${e.hue}, 100%, 50%)`,
              transform: `translate(${e.x - e.size / 2}px, ${e.y - e.size / 2}px)`,
              opacity: e.opacity,
              willChange: "transform, opacity",
            }}
          />
        ) : null
      )}
    </div>
  )
}
