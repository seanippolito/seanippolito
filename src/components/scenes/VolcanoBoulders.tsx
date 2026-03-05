import { useRef, useEffect, useState, memo } from "react"

interface Boulder {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  glow: number // brightness 0-1
  landed: boolean
  impactTime: number // timestamp of impact
  rotation: number
  rotSpeed: number
}

const MAX_BOULDERS = 12
const GRAVITY = 0.06
const GROUND_Y = 82 // vh% where ground is
const LAUNCH_X = 50 // vw% — volcano peak center
const LAUNCH_Y = 8 // vh% — near top of volcano

function spawnBoulder(): Boulder {
  const angle = -60 - Math.random() * 60 // -60 to -120 degrees (upward arc, spread left/right)
  const rad = (angle * Math.PI) / 180
  const power = 2.5 + Math.random() * 2
  return {
    x: LAUNCH_X + (Math.random() - 0.5) * 3,
    y: LAUNCH_Y + Math.random() * 2,
    vx: Math.cos(rad) * power,
    vy: Math.sin(rad) * power,
    size: 12 + Math.random() * 14, // 12-26px
    glow: 0.8 + Math.random() * 0.2,
    landed: false,
    impactTime: 0,
    rotation: Math.random() * 360,
    rotSpeed: 3 + Math.random() * 6,
  }
}

export const VolcanoBoulders = memo(function VolcanoBoulders() {
  const bouldersRef = useRef<Boulder[]>([])
  const rafRef = useRef(0)
  const lastSpawnRef = useRef(0)
  const [, forceRender] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    if (prefersReducedMotion) return

    const animate = () => {
      const now = Date.now()
      const boulders = bouldersRef.current

      // Spawn new boulder every 2-5 seconds
      if (now - lastSpawnRef.current > 700 + Math.random() * 1300 && boulders.length < MAX_BOULDERS) {
        boulders.push(spawnBoulder())
        // 40% chance of a second boulder in quick succession
        if (Math.random() > 0.6 && boulders.length < MAX_BOULDERS) {
          boulders.push(spawnBoulder())
        }
        lastSpawnRef.current = now
      }

      for (let i = boulders.length - 1; i >= 0; i--) {
        const b = boulders[i]

        if (!b.landed) {
          b.vy += GRAVITY
          b.x += b.vx
          b.y += b.vy
          b.rotation += b.rotSpeed
          // Dim glow slightly as it travels
          b.glow = Math.max(0.4, b.glow - 0.001)

          // Impact with ground
          if (b.y >= GROUND_Y) {
            b.y = GROUND_Y
            b.landed = true
            b.impactTime = now
            b.vx = 0
            b.vy = 0
          }
        } else {
          // Remove 1.5s after impact (after flash fades)
          if (now - b.impactTime > 1500) {
            boulders.splice(i, 1)
          }
        }
      }

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    // Spawn first boulder quickly
    lastSpawnRef.current = Date.now() - 1500
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {bouldersRef.current.map((b, i) => {
        const impactAge = b.landed ? (Date.now() - b.impactTime) / 1000 : 0
        // Impact flash: expand and fade
        const flashOpacity = b.landed ? Math.max(0, 1 - impactAge / 0.6) : 0
        const flashScale = b.landed ? 1 + impactAge * 4 : 0
        // Boulder fades after landing
        const boulderOpacity = b.landed ? Math.max(0, 1 - impactAge / 1.2) : 1

        return (
          <div key={i}>
            {/* The boulder */}
            <div
              style={{
                position: "absolute",
                left: `${b.x}vw`,
                top: `${b.y}vh`,
                width: b.size,
                height: b.size,
                transform: `translate(-50%, -50%) rotate(${b.rotation}deg)`,
                opacity: boulderOpacity,
                willChange: "transform, opacity",
              }}
            >
              <svg width={b.size} height={b.size} viewBox="0 0 30 30">
                <defs>
                  <radialGradient id={`bg-${i}`} cx="40%" cy="35%" r="55%">
                    <stop
                      offset="0%"
                      stopColor={`rgba(255,${140 + b.glow * 60},${50 + b.glow * 30},${b.glow})`}
                    />
                    <stop offset="50%" stopColor={`rgba(200,70,20,${b.glow * 0.8})`} />
                    <stop offset="100%" stopColor="rgba(60,15,5,0.9)" />
                  </radialGradient>
                  <filter id={`bgl-${i}`}>
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Outer glow */}
                <circle
                  cx="15"
                  cy="15"
                  r="14"
                  fill={`rgba(234,88,12,${b.glow * 0.25})`}
                  filter={`url(#bgl-${i})`}
                />
                {/* Rocky irregular shape */}
                <polygon
                  points="15,2 24,7 28,16 23,26 14,28 5,24 2,14 6,6"
                  fill={`url(#bg-${i})`}
                />
                {/* Bright lava cracks on surface */}
                <path
                  d="M10 8 L15 14 L20 10 M12 18 L17 15 L14 22"
                  fill="none"
                  stroke={`rgba(255,200,100,${b.glow * 0.6})`}
                  strokeWidth="1"
                />
                {/* Hot spot highlight */}
                <circle cx="13" cy="12" r="3" fill={`rgba(255,220,150,${b.glow * 0.3})`} />
              </svg>
            </div>

            {/* Smoke trail while flying */}
            {!b.landed && (
              <div
                style={{
                  position: "absolute",
                  left: `${b.x}vw`,
                  top: `${b.y}vh`,
                  width: b.size * 0.6,
                  height: b.size * 0.6,
                  borderRadius: "50%",
                  background: "rgba(80,40,20,0.3)",
                  filter: "blur(6px)",
                  transform: `translate(-50%, -50%) translate(${-b.vx * 3}px, ${-b.vy * 2}px)`,
                  opacity: 0.5,
                }}
              />
            )}

            {/* Impact flash + debris */}
            {b.landed && flashOpacity > 0 && (
              <>
                {/* Orange flash ring */}
                <div
                  style={{
                    position: "absolute",
                    left: `${b.x}vw`,
                    top: `${b.y}vh`,
                    width: b.size * flashScale,
                    height: b.size * flashScale * 0.4,
                    borderRadius: "50%",
                    background: `radial-gradient(ellipse, rgba(255,150,50,${flashOpacity * 0.6}) 0%, rgba(234,88,12,${flashOpacity * 0.3}) 40%, transparent 70%)`,
                    transform: "translate(-50%, -50%)",
                    filter: "blur(4px)",
                  }}
                />
                {/* Debris particles */}
                {[...Array(4)].map((_, d) => {
                  const debrisAngle = (d / 4) * Math.PI + Math.random() * 0.5
                  const debrisDist = impactAge * 60 * (0.8 + d * 0.15)
                  const debrisX = Math.cos(debrisAngle) * debrisDist
                  const debrisY = -Math.abs(Math.sin(debrisAngle)) * debrisDist * 0.6
                  return (
                    <div
                      key={d}
                      style={{
                        position: "absolute",
                        left: `${b.x}vw`,
                        top: `${b.y}vh`,
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: `rgba(234,88,12,${flashOpacity * 0.8})`,
                        boxShadow: `0 0 4px rgba(255,150,50,${flashOpacity * 0.5})`,
                        transform: `translate(calc(-50% + ${debrisX}px), calc(-50% + ${debrisY}px))`,
                      }}
                    />
                  )
                })}
              </>
            )}
          </div>
        )
      })}
    </div>
  )
})
