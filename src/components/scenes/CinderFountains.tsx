import { useRef, useEffect, useState, memo } from "react"

interface Spark {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  life: number
}

interface Pool {
  x: number // vw
  y: number // vh
  cooldown: number // frames until next burst
}

const GRAVITY = 0.15
const SPARK_LIFESPAN = 60 // ~1s at 60fps

const SPARK_COLORS = ["#ea580c", "#f97316", "#fb923c", "#fbbf24"]

function randomCooldown(): number {
  // 2-5 seconds at ~60fps => 120-300 frames
  return 120 + Math.random() * 180
}

function spawnBurst(poolX: number, poolY: number): Spark[] {
  const count = 6 + Math.floor(Math.random() * 5) // 6-10 sparks
  const sparks: Spark[] = []
  for (let i = 0; i < count; i++) {
    sparks.push({
      x: poolX + (Math.random() - 0.5) * 1.5, // slight horizontal offset at source
      y: poolY,
      vx: (Math.random() - 0.5) * 0.3, // slight spread
      vy: -(1.2 + Math.random() * 0.8), // launch upward
      size: 2 + Math.random() * 2,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      opacity: 1,
      life: 0,
    })
  }
  return sparks
}

function initPools(): Pool[] {
  return [
    { x: 26, y: 85, cooldown: Math.random() * 120 },
    { x: 50, y: 88, cooldown: 60 + Math.random() * 120 },
    { x: 73, y: 84, cooldown: 30 + Math.random() * 120 },
  ]
}

export const CinderFountains = memo(function CinderFountains() {
  const poolsRef = useRef<Pool[]>(initPools())
  const sparksRef = useRef<Spark[]>([])
  const rafRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      // Check pools for new bursts
      for (const pool of poolsRef.current) {
        pool.cooldown--
        if (pool.cooldown <= 0) {
          sparksRef.current.push(...spawnBurst(pool.x, pool.y))
          pool.cooldown = randomCooldown()
        }
      }

      // Update sparks
      const alive: Spark[] = []
      for (const s of sparksRef.current) {
        s.life++
        s.vy += GRAVITY * (1 / 60) * 10 // gravity pulls down
        s.x += s.vx * 0.3
        s.y += s.vy * 0.3

        // Fade out in second half of life
        const progress = s.life / SPARK_LIFESPAN
        if (progress > 0.5) {
          s.opacity = 1 - (progress - 0.5) * 2
        }

        if (s.life < SPARK_LIFESPAN && s.opacity > 0) {
          alive.push(s)
        }
      }
      sparksRef.current = alive

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {sparksRef.current.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}vw`,
            top: `${s.y}vh`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            backgroundColor: s.color,
            opacity: s.opacity,
            boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${s.color}`,
            transform: "translate(-50%, -50%)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
})
