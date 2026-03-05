import { memo, useRef, useEffect, useState } from "react"

/**
 * SnowCursor — replaces the default cursor with a snowball SVG
 * and leaves a frost/ice crystal trail as you move.
 *
 * Pattern matches EmberTrail (volcano) and LeafTrail (jungle):
 * object-pooled particles, speed-based spawning, rAF loop.
 */

const POOL_SIZE = 24

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  opacity: number
  size: number
  rotation: number
  rotationSpeed: number
  /** 0 = snowflake, 1 = ice crystal, 2 = frost dot */
  type: number
}

function createParticle(): Particle {
  return {
    x: -100,
    y: -100,
    vx: 0,
    vy: 0,
    opacity: 0,
    size: 1,
    rotation: 0,
    rotationSpeed: 0,
    type: 0,
  }
}

export const SnowCursor = memo(function SnowCursor() {
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100 })
  const poolRef = useRef<Particle[]>(Array.from({ length: POOL_SIZE }, createParticle))
  const spawnIndexRef = useRef(0)
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    // Hide default cursor on the whole page
    document.body.style.cursor = "none"

    const handleMove = (x: number, y: number) => {
      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = x
      mouseRef.current.y = y
    }

    const onMouse = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) handleMove(t.clientX, t.clientY)
    }

    window.addEventListener("mousemove", onMouse)
    window.addEventListener("touchmove", onTouch, { passive: true })

    const animate = () => {
      const m = mouseRef.current
      const dx = m.x - m.prevX
      const dy = m.y - m.prevY
      const speed = Math.sqrt(dx * dx + dy * dy)
      const pool = poolRef.current

      // Spawn particles when moving fast enough
      if (speed > 2.5) {
        const count = Math.min(3, Math.floor(speed / 10) + 1)
        for (let i = 0; i < count; i++) {
          const p = pool[spawnIndexRef.current]
          spawnIndexRef.current = (spawnIndexRef.current + 1) % POOL_SIZE

          p.x = m.x + (Math.random() - 0.5) * 8
          p.y = m.y + (Math.random() - 0.5) * 8
          p.opacity = 0.7 + Math.random() * 0.3

          const typeRoll = Math.random()
          if (typeRoll < 0.4) {
            // Snowflake — floats down slowly
            p.type = 0
            p.size = 6 + Math.random() * 5
            p.vx = (Math.random() - 0.5) * 0.8
            p.vy = 0.5 + Math.random() * 1.5
            p.rotation = Math.random() * 360
            p.rotationSpeed = (Math.random() - 0.5) * 3
          } else if (typeRoll < 0.75) {
            // Ice crystal — drifts with slight upward float
            p.type = 1
            p.size = 4 + Math.random() * 3
            p.vx = (Math.random() - 0.5) * 1.2
            p.vy = -0.3 + Math.random() * 0.8
            p.rotation = Math.random() * 60
            p.rotationSpeed = (Math.random() - 0.5) * 2
          } else {
            // Frost dot — tiny, falls quickly
            p.type = 2
            p.size = 2 + Math.random() * 2
            p.vx = (Math.random() - 0.5) * 0.5
            p.vy = 1 + Math.random() * 2
            p.rotation = 0
            p.rotationSpeed = 0
          }
        }
      }

      // Update particles
      let anyVisible = false
      for (let i = 0; i < POOL_SIZE; i++) {
        const p = pool[i]
        if (p.opacity <= 0.01) continue
        anyVisible = true

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.97
        p.vy *= 0.97
        p.rotation += p.rotationSpeed
        p.opacity -= 0.013
        p.size *= 0.997

        // Slight random wander
        p.vx += (Math.random() - 0.5) * 0.1
      }

      m.prevX = m.x
      m.prevY = m.y

      if (anyVisible || speed > 2.5) {
        forceRender((n) => n + 1)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("mousemove", onMouse)
      window.removeEventListener("touchmove", onTouch)
      document.body.style.cursor = ""
    }
  }, [])

  const m = mouseRef.current
  const pool = poolRef.current

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trail particles */}
      {pool.map((p, i) =>
        p.opacity > 0.01 ? (
          <div
            key={i}
            style={{
              position: "fixed",
              left: p.x,
              top: p.y,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              willChange: "transform, opacity",
            }}
          >
            {p.type === 0 && (
              /* Snowflake — 6-pointed star */
              <svg width={p.size} height={p.size} viewBox="0 0 12 12">
                <g stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none">
                  <line x1="6" y1="0.5" x2="6" y2="11.5" />
                  <line x1="1.2" y1="3.2" x2="10.8" y2="8.8" />
                  <line x1="1.2" y1="8.8" x2="10.8" y2="3.2" />
                  {/* Small branches */}
                  <line x1="6" y1="2.5" x2="4.5" y2="1.5" />
                  <line x1="6" y1="2.5" x2="7.5" y2="1.5" />
                  <line x1="6" y1="9.5" x2="4.5" y2="10.5" />
                  <line x1="6" y1="9.5" x2="7.5" y2="10.5" />
                </g>
              </svg>
            )}
            {p.type === 1 && (
              /* Ice crystal — diamond shape */
              <svg width={p.size} height={p.size} viewBox="0 0 10 10">
                <polygon
                  points="5,0.5 9,5 5,9.5 1,5"
                  fill="rgba(186,230,253,0.5)"
                  stroke="rgba(224,242,254,0.8)"
                  strokeWidth="0.5"
                />
                <line x1="5" y1="0.5" x2="5" y2="9.5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
                <line x1="1" y1="5" x2="9" y2="5" stroke="rgba(255,255,255,0.3)" strokeWidth="0.3" />
              </svg>
            )}
            {p.type === 2 && (
              /* Frost dot — simple glowing circle */
              <div
                style={{
                  width: p.size,
                  height: p.size,
                  borderRadius: "50%",
                  background: "rgba(224, 242, 254, 0.8)",
                  boxShadow: "0 0 3px rgba(186, 230, 253, 0.6)",
                }}
              />
            )}
          </div>
        ) : null
      )}

      {/* Snowball cursor — always at mouse position */}
      {m.x > 0 && m.y > 0 && (
        <div
          style={{
            position: "fixed",
            left: m.x,
            top: m.y,
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22">
            <defs>
              <radialGradient id="snowball-grad" cx="40%" cy="35%" r="55%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </radialGradient>
              <filter id="snowball-shadow">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="rgba(148,163,184,0.4)" />
              </filter>
            </defs>
            {/* Main snowball */}
            <circle cx="11" cy="11" r="8" fill="url(#snowball-grad)" filter="url(#snowball-shadow)" />
            {/* Highlight */}
            <ellipse cx="8.5" cy="8.5" rx="3" ry="2" fill="rgba(255,255,255,0.7)" transform="rotate(-20 8.5 8.5)" />
            {/* Snow texture dots */}
            <circle cx="13" cy="9" r="0.6" fill="rgba(255,255,255,0.5)" />
            <circle cx="10" cy="14" r="0.5" fill="rgba(255,255,255,0.4)" />
            <circle cx="14" cy="13" r="0.4" fill="rgba(255,255,255,0.3)" />
          </svg>
        </div>
      )}
    </div>
  )
})
