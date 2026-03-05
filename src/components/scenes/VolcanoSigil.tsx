import { memo, useState, useEffect, useRef } from "react"
import type { ReactElement } from "react"

/**
 * VolcanoSigil — A large arcane sigil etched into the volcano mountain face
 * that slowly breathes with a faint orange-red glow.
 */
export const VolcanoSigil = memo(function VolcanoSigil() {
  const [opacity, setOpacity] = useState(0.08)
  const rafRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches

    if (prefersReducedMotion.current) {
      setOpacity(0.08)
      return
    }

    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000
      // Oscillate between 0.04 and 0.12 over ~8s
      const t = Math.sin((elapsed * 2 * Math.PI) / 8)
      const newOpacity = 0.08 + t * 0.04
      setOpacity(newOpacity)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Scale the drop-shadow intensity with opacity
  const glowIntensity = opacity / 0.12 // 0..1 range roughly
  const filterStyle = `drop-shadow(0 0 8px rgba(234,88,12,${(0.3 * glowIntensity).toFixed(3)}))`

  // Hexagram geometry helpers
  const cx = 100
  const cy = 100
  const outerR = 90
  const hexR = 60
  const innerR = 22
  const tickCount = 36
  const runeR = 68

  // Generate tick marks around outer circle
  const ticks: ReactElement[] = []
  for (let i = 0; i < tickCount; i++) {
    const angle = (i * 2 * Math.PI) / tickCount
    const len = i % 3 === 0 ? 8 : 4
    const x1 = cx + (outerR - len) * Math.cos(angle)
    const y1 = cy + (outerR - len) * Math.sin(angle)
    const x2 = cx + outerR * Math.cos(angle)
    const y2 = cy + outerR * Math.sin(angle)
    ticks.push(
      <line
        key={`tick-${i}`}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#ea580c"
        strokeWidth={i % 3 === 0 ? 1.2 : 0.6}
      />
    )
  }

  // Hexagram: two overlapping equilateral triangles
  const triUp = [0, 1, 2].map((i) => {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / 3
    return `${cx + hexR * Math.cos(angle)},${cy + hexR * Math.sin(angle)}`
  })
  const triDown = [0, 1, 2].map((i) => {
    const angle = Math.PI / 2 + (i * 2 * Math.PI) / 3
    return `${cx + hexR * Math.cos(angle)},${cy + hexR * Math.sin(angle)}`
  })

  // Rune-like symbols at 6 vertices of the hexagram
  const runeAngles = [0, 1, 2, 3, 4, 5].map(
    (i) => -Math.PI / 2 + (i * Math.PI) / 3
  )
  const runeSymbols = ["ᚠ", "ᛟ", "ᚦ", "ᛈ", "ᚱ", "ᛉ"]

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "50vw",
        top: "25vh",
        transform: "translate(-50%, -50%)",
        width: 200,
        height: 200,
        filter: filterStyle,
      }}
    >
      <svg
        viewBox="0 0 200 200"
        width="200"
        height="200"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
      >
        {/* Outer circle */}
        <circle
          cx={cx}
          cy={cy}
          r={outerR}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1.5}
        />

        {/* Second inner ring */}
        <circle
          cx={cx}
          cy={cy}
          r={outerR - 10}
          fill="none"
          stroke="#ea580c"
          strokeWidth={0.5}
        />

        {/* Tick marks */}
        {ticks}

        {/* Hexagram — triangle up */}
        <polygon
          points={triUp.join(" ")}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Hexagram — triangle down */}
        <polygon
          points={triDown.join(" ")}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Inner connecting hexagon */}
        <polygon
          points={[0, 1, 2, 3, 4, 5]
            .map((i) => {
              const angle = -Math.PI / 2 + (i * Math.PI) / 3
              const r = hexR * 0.5
              return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
            })
            .join(" ")}
          fill="none"
          stroke="#ea580c"
          strokeWidth={0.7}
        />

        {/* Central void circle */}
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1.5}
        />

        {/* Central eye — pupil */}
        <circle cx={cx} cy={cy} r={8} fill="#ea580c" opacity={0.15} />
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="none"
          stroke="#ea580c"
          strokeWidth={1}
        />
        {/* Eye — almond shape */}
        <path
          d={`M${cx - innerR} ${cy} Q${cx} ${cy - 14} ${cx + innerR} ${cy} Q${cx} ${cy + 14} ${cx - innerR} ${cy}Z`}
          fill="none"
          stroke="#ea580c"
          strokeWidth={0.8}
        />

        {/* Rune symbols at hexagram vertices */}
        {runeAngles.map((angle, i) => (
          <text
            key={`rune-${i}`}
            x={cx + runeR * Math.cos(angle)}
            y={cy + runeR * Math.sin(angle)}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ea580c"
            fontSize={9}
            fontFamily="serif"
          >
            {runeSymbols[i]}
          </text>
        ))}

        {/* Extra decorative arcs between tick marks */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a1 = (i * Math.PI) / 3 + 0.15
          const a2 = ((i + 1) * Math.PI) / 3 - 0.15
          const r = outerR - 5
          const x1 = cx + r * Math.cos(a1)
          const y1 = cy + r * Math.sin(a1)
          const x2 = cx + r * Math.cos(a2)
          const y2 = cy + r * Math.sin(a2)
          return (
            <path
              key={`arc-${i}`}
              d={`M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke="#ea580c"
              strokeWidth={0.4}
              strokeDasharray="3 2"
            />
          )
        })}
      </svg>
    </div>
  )
})
