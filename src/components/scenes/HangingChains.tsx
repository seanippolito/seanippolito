import { useRef, useEffect, useState, memo } from "react"

interface ChainConfig {
  x: number        // vw position
  topY: number     // vh start
  bottomY: number  // vh end
  hasCage: boolean
  swayAmplitude: number // degrees
  swayPeriod: number    // seconds
  phaseOffset: number   // radians
  linkCount: number
}

const CHAINS: ChainConfig[] = [
  {
    x: 8,
    topY: 45,
    bottomY: 65,
    hasCage: false,
    swayAmplitude: 4,
    swayPeriod: 5.5,
    phaseOffset: 0,
    linkCount: 14,
  },
  {
    x: 25,
    topY: 50,
    bottomY: 68,
    hasCage: true,
    swayAmplitude: 3,
    swayPeriod: 7,
    phaseOffset: 1.2,
    linkCount: 12,
  },
  {
    x: 72,
    topY: 48,
    bottomY: 66,
    hasCage: true,
    swayAmplitude: 5,
    swayPeriod: 4.5,
    phaseOffset: 2.8,
    linkCount: 12,
  },
  {
    x: 90,
    topY: 43,
    bottomY: 63,
    hasCage: false,
    swayAmplitude: 3.5,
    swayPeriod: 6.2,
    phaseOffset: 4.1,
    linkCount: 14,
  },
]

const IRON_BASE = "rgba(50, 30, 25, 0.5)"
const IRON_HIGHLIGHT = "rgba(180, 90, 30, 0.35)"

/** Render a vertical series of chain links as SVG pill/oval shapes */
function renderChainLinks(linkCount: number, chainHeight: number) {
  const linkHeight = chainHeight / linkCount
  const linkWidth = 8
  const linkRx = 3
  const links: React.ReactNode[] = []

  for (let i = 0; i < linkCount; i++) {
    const y = i * linkHeight
    const isEven = i % 2 === 0
    // Alternate slightly narrower/wider for interlocking look
    const w = isEven ? linkWidth : linkWidth - 2
    const xOffset = isEven ? 0 : 1

    links.push(
      <rect
        key={`link-${i}`}
        x={-w / 2 + xOffset}
        y={y}
        width={w}
        height={linkHeight * 0.75}
        rx={linkRx}
        ry={linkRx}
        fill="none"
        stroke={IRON_BASE}
        strokeWidth={2}
      />,
      // Orange highlight on right edge
      <line
        key={`hl-${i}`}
        x1={w / 2 + xOffset - 1}
        y1={y + 2}
        x2={w / 2 + xOffset - 1}
        y2={y + linkHeight * 0.75 - 2}
        stroke={IRON_HIGHLIGHT}
        strokeWidth={0.8}
      />
    )
  }

  return links
}

/** Render a small cage at the bottom of a chain */
function renderCage(yOffset: number) {
  const cageW = 20
  const cageH = 24
  const barCount = 3
  const barSpacing = cageW / (barCount + 1)

  return (
    <g transform={`translate(0, ${yOffset})`}>
      {/* Cage frame */}
      <rect
        x={-cageW / 2}
        y={0}
        width={cageW}
        height={cageH}
        rx={1}
        ry={1}
        fill="none"
        stroke={IRON_BASE}
        strokeWidth={2}
      />
      {/* Top bar (thicker, mounting point) */}
      <line
        x1={-cageW / 2}
        y1={0}
        x2={cageW / 2}
        y2={0}
        stroke={IRON_BASE}
        strokeWidth={3}
      />
      {/* Bottom bar */}
      <line
        x1={-cageW / 2}
        y1={cageH}
        x2={cageW / 2}
        y2={cageH}
        stroke={IRON_BASE}
        strokeWidth={2.5}
      />
      {/* Vertical bars inside */}
      {Array.from({ length: barCount }, (_, i) => {
        const bx = -cageW / 2 + barSpacing * (i + 1)
        return (
          <line
            key={`bar-${i}`}
            x1={bx}
            y1={1}
            x2={bx}
            y2={cageH - 1}
            stroke={IRON_BASE}
            strokeWidth={1.5}
          />
        )
      })}
      {/* Orange highlight on cage right side */}
      <line
        x1={cageW / 2 - 1}
        y1={2}
        x2={cageW / 2 - 1}
        y2={cageH - 2}
        stroke={IRON_HIGHLIGHT}
        strokeWidth={0.8}
      />
    </g>
  )
}

/** Render a hook at the bottom of a chain */
function renderHook(yOffset: number) {
  return (
    <g transform={`translate(0, ${yOffset})`}>
      <path
        d="M 0 0 C 0 6, 6 10, 6 14 C 6 18, 0 18, -2 14"
        fill="none"
        stroke={IRON_BASE}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      {/* Highlight on outer curve */}
      <path
        d="M 1 2 C 1 6, 5 9, 5 13"
        fill="none"
        stroke={IRON_HIGHLIGHT}
        strokeWidth={0.8}
        strokeLinecap="round"
      />
    </g>
  )
}

export const HangingChains = memo(function HangingChains() {
  const anglesRef = useRef<number[]>(CHAINS.map(() => 0))
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const [, forceRender] = useState(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    reducedMotionRef.current = prefersReducedMotion
    if (prefersReducedMotion) return

    startTimeRef.current = performance.now()

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000

      for (let i = 0; i < CHAINS.length; i++) {
        const chain = CHAINS[i]
        anglesRef.current[i] =
          chain.swayAmplitude *
          Math.sin((2 * Math.PI * elapsed) / chain.swayPeriod + chain.phaseOffset)
      }

      forceRender((n) => n + 1)
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-15 overflow-hidden">
      {CHAINS.map((chain, i) => {
        const chainHeightVh = chain.bottomY - chain.topY
        // Use a fixed px estimate for SVG internal coords; the SVG scales via viewBox
        const svgChainHeight = chain.linkCount * 12
        const svgTotalHeight = svgChainHeight + (chain.hasCage ? 28 : 20)
        const svgWidth = 30

        const angle = reducedMotionRef.current ? 0 : anglesRef.current[i]

        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              left: `${chain.x}vw`,
              top: `${chain.topY}vh`,
              width: `${svgWidth}px`,
              height: `${chainHeightVh}vh`,
              overflow: "visible",
              transformOrigin: "top center",
              transform: `translateX(-50%) rotate(${angle}deg)`,
              willChange: "transform",
            }}
            viewBox={`${-svgWidth / 2} 0 ${svgWidth} ${svgTotalHeight}`}
            preserveAspectRatio="xMidYMin meet"
          >
            {renderChainLinks(chain.linkCount, svgChainHeight)}
            {chain.hasCage
              ? renderCage(svgChainHeight)
              : renderHook(svgChainHeight)}
          </svg>
        )
      })}
    </div>
  )
})
