import { useRef, useEffect, useState } from "react"

const COUNT = 10
const ORBIT_RADIUS = 45

const FISH_COLORS = ["#fb923c", "#fbbf24", "#60b5d4", "#f472b6", "#34d399"]

interface FishState {
  x: number
  y: number
}

function initSwarm(): FishState[] {
  return Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }))
}

export function CursorFish() {
  const swarmRef = useRef<FishState[]>(initSwarm())
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [swarm, setSwarm] = useState<FishState[]>(initSwarm)

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
        const angle = (i / COUNT) * Math.PI * 2 + time * (0.4 + i * 0.03)
        const wobble = Math.sin(time * 1.5 + i * 1.3) * 10
        const radius = ORBIT_RADIUS + wobble
        const goalX = t.x + Math.cos(angle) * radius
        const goalY = t.y + Math.sin(angle) * radius
        s[i].x += (goalX - s[i].x) * (0.035 + i * 0.004)
        s[i].y += (goalY - s[i].y) * (0.035 + i * 0.004)
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

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Seashell gem at cursor */}
      <div
        style={{
          position: "absolute",
          left: cs.x - 11,
          top: cs.y - 11,
          width: 22,
          height: 22,
          willChange: "transform",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <defs>
            <radialGradient id="shell-gem" cx="40%" cy="35%" r="55%">
              <stop offset="0%" stopColor="#e0f7fa" />
              <stop offset="30%" stopColor="#2dd4bf" />
              <stop offset="70%" stopColor="#0d9488" />
              <stop offset="100%" stopColor="#065f46" />
            </radialGradient>
            <radialGradient id="shell-shine" cx="30%" cy="25%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id="shell-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#shell-glow)">
            {/* Outer glow */}
            <ellipse cx="11" cy="11" rx="11" ry="10" fill="rgba(45,212,191,0.15)" />
            {/* Shell body — fan/spiral shape */}
            <path
              d="M11 3 Q15 4 17 7 Q19 10 18 14 Q16 17 13 18 Q10 19 7 17 Q5 15 4 12 Q3 9 5 6 Q7 4 11 3Z"
              fill="url(#shell-gem)"
            />
            {/* Shell ridges */}
            <path
              d="M11 4 Q11 10 7 16"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
            <path
              d="M11 4 Q12 10 10 17"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="0.5"
            />
            <path
              d="M11 4 Q14 9 14 17"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="0.5"
            />
            <path
              d="M11 4 Q16 8 17 14"
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="0.5"
            />
            {/* Spiral hint at apex */}
            <path
              d="M11 5 Q9 6 9 8 Q9 9 10 9 Q11 9 11 8"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.4"
            />
            {/* Highlight */}
            <path
              d="M9 5 Q11 3 14 5 Q15 7 14 9 Q12 7 10 6 Q9 6 9 5Z"
              fill="url(#shell-shine)"
            />
            {/* Sparkle */}
            <circle cx="9" cy="7" r="1.2" fill="rgba(255,255,255,0.6)">
              <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.8s" repeatCount="indefinite" />
            </circle>
            {/* Small secondary glint */}
            <circle cx="14" cy="13" r="0.8" fill="rgba(255,255,255,0.4)">
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2.3s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Tropical fish swarm */}
      {swarm.map((a, i) => {
        const size = 12 + (i % 4) * 2
        const color = FISH_COLORS[i % FISH_COLORS.length]
        const tailWiggle = `${0.3 + (i % 3) * 0.1}s`
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
            }}
          >
            <svg width={size} height={size} viewBox="0 0 20 20">
              {/* Body — oval */}
              <ellipse cx="10" cy="10" rx="5.5" ry="3.5" fill={color} opacity="0.85" />

              {/* Stripe accent */}
              <ellipse cx="10" cy="10" rx="3.5" ry="2" fill="rgba(255,255,255,0.15)" />

              {/* Tail — triangle that wiggles */}
              <polygon points="3,10 0,7 0,13" fill={color} opacity="0.75">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-15 3 10;15 3 10;-15 3 10"
                  dur={tailWiggle}
                  repeatCount="indefinite"
                />
              </polygon>

              {/* Dorsal fin on top */}
              <polygon points="10,6.5 8,3 12,5" fill={color} opacity="0.7">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="-5 10 6.5;5 10 6.5;-5 10 6.5"
                  dur={`${0.5 + (i % 3) * 0.15}s`}
                  repeatCount="indefinite"
                />
              </polygon>

              {/* Eye */}
              <circle cx="13" cy="9.2" r="1" fill="rgba(0,0,0,0.7)" />
              <circle cx="13.3" cy="8.9" r="0.4" fill="rgba(255,255,255,0.8)" />

              {/* Bubble trail */}
              <circle cx={2 - (i % 2)} cy={10 + (i % 3) - 1} r="0.5" fill="rgba(255,255,255,0.3)">
                <animate
                  attributeName="opacity"
                  values="0.3;0;0.3"
                  dur={`${0.8 + i * 0.12}s`}
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
