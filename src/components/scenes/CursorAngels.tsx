import { useRef, useEffect, useState } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useTouchActive } from "../../hooks/useTouchActive"

const COUNT = 10
const ORBIT_RADIUS = 45

interface AngelState {
  x: number
  y: number
  scatterVx: number
  scatterVy: number
}

function initSwarm(): AngelState[] {
  return Array.from({ length: COUNT }, () => ({ x: -100, y: -100, scatterVx: 0, scatterVy: 0 }))
}

export function CursorAngels() {
  const isMobile = useIsMobile()
  const { active, scattering } = useTouchActive()
  const swarmRef = useRef<AngelState[]>(initSwarm())
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [swarm, setSwarm] = useState<AngelState[]>(initSwarm)
  const scatterStartedRef = useRef(false)

  // Smooth cursor for gem
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

  // Assign scatter velocities when scattering begins
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
    if (!scattering) scatterStartedRef.current = false
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
          s[i].x += s[i].scatterVx
          s[i].y += s[i].scatterVy
          s[i].scatterVx *= 0.95
          s[i].scatterVy *= 0.95
        } else {
          const angle = (i / COUNT) * Math.PI * 2 + time * (0.4 + i * 0.03)
          const wobble = Math.sin(time * 1.5 + i * 1.3) * 10
          const radius = ORBIT_RADIUS + wobble
          const goalX = t.x + Math.cos(angle) * radius
          const goalY = t.y + Math.sin(angle) * radius - 5
          s[i].x += (goalX - s[i].x) * (0.035 + i * 0.004)
          s[i].y += (goalY - s[i].y) * (0.035 + i * 0.004)
        }
      }

      setSwarm(s.map((a) => ({ ...a })))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Reset when touch fully ends
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

  if (isMobile && !active && !scattering) return null

  const scatterOpacity = scattering ? 0.3 : 1

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Gold nugget at cursor */}
      <div
        style={{
          position: "absolute",
          left: cs.x - 11,
          top: cs.y - 11,
          width: 22,
          height: 22,
          willChange: "transform",
          opacity: scattering ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <defs>
            <radialGradient id="nugget-gold" cx="40%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="30%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </radialGradient>
            <radialGradient id="nugget-shine" cx="30%" cy="25%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id="nugget-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#nugget-glow)">
            <ellipse cx="11" cy="11" rx="11" ry="10" fill="rgba(251,191,36,0.15)" />
            <path
              d="M7 4 Q11 2 15 4 Q19 7 18 12 Q17 17 13 18 Q9 19 6 16 Q3 12 4 8 Q5 5 7 4Z"
              fill="url(#nugget-gold)"
            />
            <path
              d="M8 5 Q11 3 14 5 Q16 7 15 10 Q13 8 10 7 Q8 7 8 5Z"
              fill="url(#nugget-shine)"
            />
            <circle cx="9" cy="7" r="1.2" fill="rgba(255,255,255,0.6)">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="14" cy="13" r="0.8" fill="rgba(255,255,255,0.4)">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Angel / fairy swarm */}
      {swarm.map((a, i) => {
        const size = 14 + (i % 3) * 3
        const pulseOffset = i * 0.35
        const wingFlap = `${0.4 + (i % 4) * 0.1}s`
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: a.x - size / 2,
              top: a.y - size / 2,
              width: size,
              height: size,
              willChange: "transform",
              opacity: scattering ? scatterOpacity : 1,
              transition: scattering ? "opacity 0.5s" : undefined,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="10" fill="rgba(251,191,36,0.08)" />
              <circle cx="10" cy="10" r="5" fill="rgba(255,251,230,0.15)" />
              <ellipse cx="6" cy="9" rx="4" ry="2.5" fill="rgba(255,255,255,0.35)" transform="rotate(-25 6 9)">
                <animate
                  attributeName="ry"
                  values="2.5;1.2;2.5"
                  dur={wingFlap}
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="14" cy="9" rx="4" ry="2.5" fill="rgba(255,255,255,0.35)" transform="rotate(25 14 9)">
                <animate
                  attributeName="ry"
                  values="2.5;1.2;2.5"
                  dur={wingFlap}
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse cx="10" cy="12" rx="1.8" ry="3" fill="rgba(255,255,240,0.7)" />
              <circle cx="10" cy="8" r="1.8" fill="rgba(255,245,230,0.8)" />
              <ellipse
                cx="10" cy="6" rx="2.5" ry="0.8"
                fill="none"
                stroke="rgba(251,191,36,0.6)"
                strokeWidth="0.5"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;0.3;0.6"
                  dur={`${1.5 + pulseOffset * 0.3}s`}
                  begin={`${pulseOffset * 0.2}s`}
                  repeatCount="indefinite"
                />
              </ellipse>
              <circle cx={7 + (i % 3)} cy={15 + (i % 2)} r="0.6" fill="rgba(251,191,36,0.5)">
                <animate
                  attributeName="opacity"
                  values="0.5;0;0.5"
                  dur={`${0.8 + pulseOffset * 0.15}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        )
      })}
    </div>
  )
}
