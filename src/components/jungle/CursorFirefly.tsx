import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useTouchActive } from "../../hooks/useTouchActive"

const COUNT = 10
const ORBIT_RADIUS = 40

interface FireflyState {
  x: number
  y: number
  scatterVx: number
  scatterVy: number
}

function initSwarm(): FireflyState[] {
  return Array.from({ length: COUNT }, () => ({ x: -100, y: -100, scatterVx: 0, scatterVy: 0 }))
}

export function CursorFirefly() {
  const isMobile = useIsMobile()
  const { active, scattering } = useTouchActive()
  const swarmRef = useRef<FireflyState[]>(initSwarm())
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [swarm, setSwarm] = useState<FireflyState[]>(initSwarm)
  const scatterStartedRef = useRef(false)

  // Track cursor for gem
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const cursorSmoothRef = useRef({ x: -100, y: -100 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY })
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) setCursor({ x: t.clientX, y: t.clientY })
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onTouch)
    }
  }, [])

  const cs = cursorSmoothRef.current
  cs.x += (cursor.x - cs.x) * 0.3
  cs.y += (cursor.y - cs.y) * 0.3

  // Assign random scatter velocities when scattering begins
  useEffect(() => {
    if (scattering && !scatterStartedRef.current) {
      scatterStartedRef.current = true
      const s = swarmRef.current
      for (let i = 0; i < COUNT; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 4 + Math.random() * 6
        s[i].scatterVx = Math.cos(angle) * speed
        s[i].scatterVy = Math.sin(angle) * speed
      }
    }
    if (!scattering) {
      scatterStartedRef.current = false
    }
  }, [scattering])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) targetRef.current = { x: t.clientX, y: t.clientY }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    const animate = () => {
      const t = targetRef.current
      const time = Date.now() * 0.001
      const s = swarmRef.current

      for (let i = 0; i < COUNT; i++) {
        if (s[i].scatterVx !== 0 || s[i].scatterVy !== 0) {
          // Scattering: fly outward
          s[i].x += s[i].scatterVx
          s[i].y += s[i].scatterVy
          s[i].scatterVx *= 0.95
          s[i].scatterVy *= 0.95
        } else {
          const angle = (i / COUNT) * Math.PI * 2 + time * (0.5 + i * 0.05)
          const wobble = Math.sin(time * 2 + i * 1.7) * 8
          const radius = ORBIT_RADIUS + wobble
          const goalX = t.x + Math.cos(angle) * radius
          const goalY = t.y + Math.sin(angle) * radius
          s[i].x += (goalX - s[i].x) * (0.04 + i * 0.005)
          s[i].y += (goalY - s[i].y) * (0.04 + i * 0.005)
        }
      }

      setSwarm(s.map(f => ({ ...f })))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Reset scatter velocities and positions when touch ends completely
  useEffect(() => {
    if (!active && !scattering) {
      const s = swarmRef.current
      for (let i = 0; i < COUNT; i++) {
        s[i].scatterVx = 0
        s[i].scatterVy = 0
        s[i].x = -100
        s[i].y = -100
      }
      targetRef.current = { x: -100, y: -100 }
    }
  }, [active, scattering])

  // On mobile, only render while touching or scattering
  if (isMobile && !active && !scattering) return null

  // Compute scatter opacity for fade-out during scatter phase
  const scatterOpacity = scattering ? 0.3 : 1

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Green gem at cursor */}
      <div
        style={{
          position: "absolute",
          left: cs.x - 10,
          top: cs.y - 12,
          width: 20,
          height: 24,
          willChange: "transform",
          opacity: scattering ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <svg width="20" height="24" viewBox="0 0 20 24">
          <defs>
            <linearGradient id="gem-jungle-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="gem-jungle-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <filter id="gem-jungle-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#gem-jungle-glow)">
            <polygon points="10,0 18,8 10,24 2,8" fill="rgba(34,197,94,0.3)" />
            <polygon points="10,0 2,8 10,24" fill="url(#gem-jungle-l)" />
            <polygon points="10,0 18,8 10,24" fill="url(#gem-jungle-r)" />
            <polygon points="10,1 5,7 10,10 15,7" fill="rgba(200,255,200,0.4)" />
            <polygon points="10,5 8,8 10,11 12,8" fill="rgba(255,255,255,0.5)">
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
            </polygon>
          </g>
        </svg>
      </div>
      {swarm.map((f, i) => {
        const size = 8 + (i % 3) * 2
        const pulseOffset = i * 0.4
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: f.x - size / 2,
              top: f.y - size / 2,
              width: size,
              height: size,
              willChange: "transform",
              opacity: scattering ? scatterOpacity : 1,
              transition: scattering ? "opacity 0.5s" : undefined,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 12 12">
              {/* Glow */}
              <circle cx="6" cy="6" r="6" fill="rgba(200,255,100,0.12)" />
              <circle cx="6" cy="6" r="3" fill="rgba(200,255,100,0.3)" />
              {/* Body */}
              <ellipse cx="6" cy="6" rx="1.5" ry="2" fill="rgba(40,30,10,0.85)" />
              {/* Light abdomen */}
              <ellipse cx="6" cy="7.5" rx="1.2" ry="1.3" fill="rgba(200,255,80,0.9)">
                <animate
                  attributeName="opacity"
                  values="0.9;0.3;0.9"
                  dur={`${1.2 + pulseOffset * 0.3}s`}
                  begin={`${pulseOffset * 0.2}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
              {/* Wings */}
              <ellipse cx="4.2" cy="4.5" rx="1.6" ry="0.8" fill="rgba(180,220,180,0.25)" transform="rotate(-20 4.2 4.5)" />
              <ellipse cx="7.8" cy="4.5" rx="1.6" ry="0.8" fill="rgba(180,220,180,0.25)" transform="rotate(20 7.8 4.5)" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
