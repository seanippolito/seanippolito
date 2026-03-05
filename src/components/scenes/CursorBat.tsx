import { useRef, useEffect, useState } from "react"

const COUNT = 10
const ORBIT_RADIUS = 50

interface BatState {
  x: number
  y: number
  wingPhase: number
}

function initSwarm(): BatState[] {
  return Array.from({ length: COUNT }, () => ({ x: -100, y: -100, wingPhase: 0 }))
}

export function CursorBat() {
  const swarmRef = useRef<BatState[]>(initSwarm())
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [swarm, setSwarm] = useState<BatState[]>(initSwarm)

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
        const angle = (i / COUNT) * Math.PI * 2 + time * (0.4 + i * 0.04)
        const wobble = Math.sin(time * 1.5 + i * 2.1) * 12
        const radius = ORBIT_RADIUS + wobble
        const goalX = t.x + Math.cos(angle) * radius
        const goalY = t.y + Math.sin(angle) * radius * 0.6 // flatter orbit
        s[i].x += (goalX - s[i].x) * (0.035 + i * 0.004)
        s[i].y += (goalY - s[i].y) * (0.035 + i * 0.004)
        s[i].wingPhase = time * (7 + i * 0.5)
      }

      setSwarm(s.map(b => ({ ...b })))
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Track actual cursor for the gem
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
  // Smooth the gem position slightly
  const cs = cursorSmoothRef.current
  cs.x += (cursor.x - cs.x) * 0.3
  cs.y += (cursor.y - cs.y) * 0.3

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Red gem at cursor */}
      <div
        style={{
          position: "absolute",
          left: cs.x - 10,
          top: cs.y - 12,
          width: 20,
          height: 24,
          willChange: "transform",
        }}
      >
        <svg width="20" height="24" viewBox="0 0 20 24">
          <defs>
            <linearGradient id="gem-face-l" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <linearGradient id="gem-face-r" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#b91c1c" />
            </linearGradient>
            <filter id="gem-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#gem-glow)">
            {/* Outer glow */}
            <polygon points="10,0 18,8 10,24 2,8" fill="rgba(239,68,68,0.3)" />
            {/* Left facet */}
            <polygon points="10,0 2,8 10,24" fill="url(#gem-face-l)" />
            {/* Right facet */}
            <polygon points="10,0 18,8 10,24" fill="url(#gem-face-r)" />
            {/* Top highlight */}
            <polygon points="10,1 5,7 10,10 15,7" fill="rgba(255,200,200,0.4)" />
            {/* Center sparkle */}
            <polygon points="10,5 8,8 10,11 12,8" fill="rgba(255,255,255,0.5)">
              <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
            </polygon>
          </g>
        </svg>
      </div>
      {swarm.map((b, i) => {
        const scale = 0.7 + (i % 3) * 0.15
        const ws = 4 + Math.sin(b.wingPhase) * 4
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: b.x - 14 * scale,
              top: b.y - 8 * scale,
              width: 28 * scale,
              height: 16 * scale,
              willChange: "transform",
            }}
          >
            <svg width={28 * scale} height={16 * scale} viewBox="0 0 28 16">
              {/* Left wing */}
              <path
                d={`M14 8 Q${8 - ws * 0.5} ${4 - ws * 0.3}, ${2 - ws * 0.3} ${6 - ws * 0.5} Q${6} ${8}, 14 8`}
                fill="rgba(30,8,8,0.8)"
              />
              {/* Right wing */}
              <path
                d={`M14 8 Q${20 + ws * 0.5} ${4 - ws * 0.3}, ${26 + ws * 0.3} ${6 - ws * 0.5} Q${22} ${8}, 14 8`}
                fill="rgba(30,8,8,0.8)"
              />
              {/* Body */}
              <ellipse cx="14" cy="8" rx="1.8" ry="3" fill="rgba(20,5,5,0.9)" />
              {/* Head */}
              <circle cx="14" cy="5" r="1.8" fill="rgba(20,5,5,0.9)" />
              {/* Ears */}
              <path d="M12.8 3.8 L11.8 1.5 L13.2 3.3" fill="rgba(20,5,5,0.85)" />
              <path d="M15.2 3.8 L16.2 1.5 L14.8 3.3" fill="rgba(20,5,5,0.85)" />
              {/* Eyes */}
              <circle cx="13.3" cy="4.5" r="0.5" fill="#ea580c" opacity="0.9" />
              <circle cx="14.7" cy="4.5" r="0.5" fill="#ea580c" opacity="0.9" />
            </svg>
          </div>
        )
      })}
    </div>
  )
}
