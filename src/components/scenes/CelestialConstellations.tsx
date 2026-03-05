import { useRef, useEffect, useState, memo } from "react"

interface Star {
  cx: number
  cy: number
  r: number
  phaseOffset: number
}

interface Constellation {
  name: string
  stars: Star[]
  lines: [number, number][]
}

const STAR_COLOR = "rgba(255,251,230,"
const LINE_COLOR = "rgba(255,251,230,0.08)"
const MIN_OPACITY = 0.15
const MAX_OPACITY = 0.5
const TWINKLE_SPEED = 1.8 // radians per second
const ROTATION_SPEED = 0.5 // degrees per second
const ROTATION_CENTER_X = 960
const ROTATION_CENTER_Y = 200

function randomPhase(): number {
  return Math.random() * Math.PI * 2
}

function buildConstellations(): Constellation[] {
  return [
    // Pegasus — rough square body with head and legs (~300, 150)
    {
      name: "pegasus",
      stars: [
        { cx: 270, cy: 130, r: 2.5, phaseOffset: randomPhase() }, // head
        { cx: 300, cy: 160, r: 2, phaseOffset: randomPhase() },   // top-left body
        { cx: 360, cy: 155, r: 2.5, phaseOffset: randomPhase() }, // top-right body
        { cx: 355, cy: 210, r: 2, phaseOffset: randomPhase() },   // bottom-right body
        { cx: 295, cy: 215, r: 2.2, phaseOffset: randomPhase() }, // bottom-left body
        { cx: 280, cy: 260, r: 1.5, phaseOffset: randomPhase() }, // left leg
        { cx: 370, cy: 255, r: 1.5, phaseOffset: randomPhase() }, // right leg
      ],
      lines: [
        [0, 1], // head to top-left
        [1, 2], // top edge
        [2, 3], // right edge
        [3, 4], // bottom edge
        [4, 1], // left edge
        [4, 5], // left leg
        [3, 6], // right leg
      ],
    },
    // Lyra — small diamond/parallelogram (~800, 100)
    {
      name: "lyra",
      stars: [
        { cx: 800, cy: 80, r: 3, phaseOffset: randomPhase() },    // top (Vega)
        { cx: 780, cy: 110, r: 2, phaseOffset: randomPhase() },   // left
        { cx: 820, cy: 115, r: 2, phaseOffset: randomPhase() },   // right
        { cx: 790, cy: 145, r: 1.8, phaseOffset: randomPhase() }, // bottom-left
        { cx: 815, cy: 148, r: 1.8, phaseOffset: randomPhase() }, // bottom-right
      ],
      lines: [
        [0, 1], // top to left
        [0, 2], // top to right
        [1, 3], // left to bottom-left
        [2, 4], // right to bottom-right
        [3, 4], // bottom edge
      ],
    },
    // Orion — belt of 3 + shoulders + legs (~1400, 200)
    {
      name: "orion",
      stars: [
        { cx: 1370, cy: 150, r: 2.5, phaseOffset: randomPhase() }, // left shoulder
        { cx: 1430, cy: 145, r: 2.8, phaseOffset: randomPhase() }, // right shoulder (Betelgeuse)
        { cx: 1385, cy: 210, r: 2, phaseOffset: randomPhase() },   // belt left
        { cx: 1400, cy: 213, r: 2.2, phaseOffset: randomPhase() }, // belt center
        { cx: 1415, cy: 216, r: 2, phaseOffset: randomPhase() },   // belt right
        { cx: 1360, cy: 280, r: 2.5, phaseOffset: randomPhase() }, // left foot (Rigel)
        { cx: 1440, cy: 275, r: 2.2, phaseOffset: randomPhase() }, // right foot
      ],
      lines: [
        [0, 1], // shoulders
        [0, 2], // left shoulder to belt
        [1, 4], // right shoulder to belt
        [2, 3], // belt
        [3, 4], // belt
        [2, 5], // belt to left foot
        [4, 6], // belt to right foot
      ],
    },
    // Corona — semicircle arc (~1700, 120)
    {
      name: "corona",
      stars: [
        { cx: 1660, cy: 140, r: 1.8, phaseOffset: randomPhase() },
        { cx: 1680, cy: 115, r: 2, phaseOffset: randomPhase() },
        { cx: 1705, cy: 105, r: 2.5, phaseOffset: randomPhase() },
        { cx: 1730, cy: 110, r: 2, phaseOffset: randomPhase() },
        { cx: 1750, cy: 128, r: 1.8, phaseOffset: randomPhase() },
        { cx: 1762, cy: 150, r: 1.5, phaseOffset: randomPhase() },
      ],
      lines: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
      ],
    },
  ]
}

export const CelestialConstellations = memo(function CelestialConstellations() {
  const constellationsRef = useRef<Constellation[]>(buildConstellations())
  const timeRef = useRef(0)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const [, forceRender] = useState(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    reducedMotionRef.current = prefersReducedMotion
    if (prefersReducedMotion) {
      // trigger one render with static values
      forceRender(1)
      return
    }

    lastFrameRef.current = performance.now()

    const animate = (now: number) => {
      const delta = (now - lastFrameRef.current) / 1000
      lastFrameRef.current = now
      timeRef.current += delta

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const time = timeRef.current
  const reduced = reducedMotionRef.current
  const rotationAngle = reduced ? 0 : time * ROTATION_SPEED
  const constellations = constellationsRef.current

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          transform={`rotate(${rotationAngle} ${ROTATION_CENTER_X} ${ROTATION_CENTER_Y})`}
        >
          {constellations.map((constellation) => (
            <g key={constellation.name}>
              {/* Constellation lines */}
              {constellation.lines.map(([from, to], li) => {
                const s1 = constellation.stars[from]
                const s2 = constellation.stars[to]
                return (
                  <line
                    key={`line-${li}`}
                    x1={s1.cx}
                    y1={s1.cy}
                    x2={s2.cx}
                    y2={s2.cy}
                    stroke={LINE_COLOR}
                    strokeWidth={0.5}
                  />
                )
              })}
              {/* Stars */}
              {constellation.stars.map((star, si) => {
                const opacity = reduced
                  ? (MIN_OPACITY + MAX_OPACITY) / 2
                  : MIN_OPACITY +
                    ((MAX_OPACITY - MIN_OPACITY) *
                      (0.5 + 0.5 * Math.sin(time * TWINKLE_SPEED + star.phaseOffset)))
                return (
                  <circle
                    key={`star-${si}`}
                    cx={star.cx}
                    cy={star.cy}
                    r={star.r}
                    fill={`${STAR_COLOR}${opacity})`}
                  />
                )
              })}
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
})
