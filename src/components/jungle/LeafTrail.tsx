import { useRef, useEffect, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  opacity: number
  variant: number
  scale: number
}

const POOL_SIZE = 20

function LeafSvg({ variant }: { variant: number }) {
  if (variant === 0) {
    return (
      <svg viewBox="0 0 12 12" width="12" height="12">
        <path d="M6 0 Q10 3 10 6 Q10 10 6 12 Q2 10 2 6 Q2 3 6 0Z" fill="#3a7a30" opacity="0.7" />
        <line x1="6" y1="0" x2="6" y2="12" stroke="#2a5a20" strokeWidth="0.5" opacity="0.5" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 12 12" width="12" height="12">
      <ellipse cx="6" cy="6" rx="5" ry="3" fill="#4a8a40" opacity="0.6" />
      <line x1="2" y1="6" x2="10" y2="6" stroke="#3a6a30" strokeWidth="0.5" opacity="0.4" />
    </svg>
  )
}

function initParticles(): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < POOL_SIZE; i++) {
    particles.push({
      x: -100, y: -100,
      vx: 0, vy: 0,
      rotation: 0,
      rotationSpeed: 0,
      opacity: 0,
      variant: i % 2,
      scale: 0.5 + Math.random() * 0.5,
    })
  }
  return particles
}

export function LeafTrail() {
  const particlesRef = useRef<Particle[]>(initParticles())
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

      if (speed > 3) {
        const p = particlesRef.current[spawnIndexRef.current]
        p.x = m.x
        p.y = m.y
        p.vx = (Math.random() - 0.5) * 1
        p.vy = 1 + Math.random() * 2
        p.rotation = Math.random() * 360
        p.rotationSpeed = (Math.random() - 0.5) * 4
        p.opacity = 0.7
        spawnIndexRef.current = (spawnIndexRef.current + 1) % POOL_SIZE
      }

      let anyVisible = false
      for (const p of particlesRef.current) {
        if (p.opacity <= 0) continue
        anyVisible = true
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed
        p.opacity -= 0.012
        if (p.opacity < 0) p.opacity = 0
      }

      if (anyVisible || speed > 3) {
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
    <div className="absolute inset-0" style={{ pointerEvents: "none" }}>
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            transform: `translate(${p.x - 6}px, ${p.y - 6}px) rotate(${p.rotation}deg) scale(${p.scale})`,
            opacity: p.opacity,
            willChange: "transform, opacity",
            pointerEvents: "none",
          }}
        >
          <LeafSvg variant={p.variant} />
        </div>
      ))}
    </div>
  )
}
