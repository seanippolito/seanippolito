import { useRef, useEffect, useState } from "react"

const COUNT = 10
const ORBIT_RADIUS = 40

interface FireflyState {
  x: number
  y: number
}

function initSwarm(): FireflyState[] {
  return Array.from({ length: COUNT }, () => ({ x: -100, y: -100 }))
}

export function CursorFirefly() {
  const swarmRef = useRef<FireflyState[]>(initSwarm())
  const targetRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(0)
  const [swarm, setSwarm] = useState<FireflyState[]>(initSwarm)

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
        const angle = (i / COUNT) * Math.PI * 2 + time * (0.5 + i * 0.05)
        const wobble = Math.sin(time * 2 + i * 1.7) * 8
        const radius = ORBIT_RADIUS + wobble
        const goalX = t.x + Math.cos(angle) * radius
        const goalY = t.y + Math.sin(angle) * radius
        s[i].x += (goalX - s[i].x) * (0.04 + i * 0.005)
        s[i].y += (goalY - s[i].y) * (0.04 + i * 0.005)
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

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
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
