import { useState, useCallback } from "react"

interface EggState {
  thunderbolt: boolean
  medusa: boolean
  apple: boolean
  lyre: boolean
}

const STORAGE_KEY = "heaven-eggs-found"

function loadFound(): EggState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { thunderbolt: false, medusa: false, apple: false, lyre: false }
  } catch {
    return { thunderbolt: false, medusa: false, apple: false, lyre: false }
  }
}

function saveFound(state: EggState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function EasterEgg({
  x,
  y,
  found,
  onFind,
  children,
}: {
  x: number
  y: number
  found: boolean
  onFind: () => void
  children: (props: { animating: boolean; found: boolean }) => React.ReactNode
}) {
  const [hovering, setHovering] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleClick = useCallback(() => {
    if (animating) return
    setAnimating(true)
    if (!found) onFind()
    setTimeout(() => setAnimating(false), 2000)
  }, [found, onFind, animating])

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        pointerEvents: "auto",
        cursor: "pointer",
        transform: `scale(${animating ? 1.15 : 1})`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <div
        style={{
          filter: hovering ? "brightness(1.5) drop-shadow(0 0 8px rgba(251,191,36,0.5))" : "none",
          transition: "filter 0.3s ease-out",
        }}
      >
        {children({ animating, found })}
      </div>
    </div>
  )
}

export function HeavenEasterEggs() {
  const [found, setFound] = useState<EggState>(loadFound)

  const markFound = useCallback((key: keyof EggState) => {
    setFound((prev) => {
      const next = { ...prev, [key]: true }
      saveFound(next)
      return next
    })
  }, [])

  return (
    <div className="absolute inset-0">
      {/* 1. Zeus's Thunderbolt — crackling zigzag bolt */}
      <EasterEgg x={12} y={52} found={found.thunderbolt} onFind={() => markFound("thunderbolt")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="34" height="40" viewBox="-12 -24 24 40" className="overflow-visible">
            {/* Zigzag bolt shape */}
            <path
              d="M0,-20 L-5,-8 L3,-10 L-3,2 L5,0 L-2,12 L8,-2"
              stroke="rgba(251,191,36,0.3)"
              strokeWidth="2.5"
              fill="rgba(251,191,36,0.08)"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Inner glow line */}
            <path
              d="M0,-20 L-5,-8 L3,-10 L-3,2 L5,0 L-2,12 L8,-2"
              stroke="rgba(255,255,200,0.1)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Activation — yellow glow pulse + electric sparks */}
            {animating && (
              <>
                {/* Glowing bolt */}
                <path
                  d="M0,-20 L-5,-8 L3,-10 L-3,2 L5,0 L-2,12 L8,-2"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="rgba(253,224,71,0.3)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 8px #fbbf24)" }}
                >
                  <animate attributeName="opacity" values="0.9;0.4;1;0.5;0.8;0" dur="2s" fill="freeze" />
                </path>
                {/* Scale pulse on bolt */}
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  values="1;1.1;0.95;1.05;1"
                  dur="0.6s"
                  repeatCount="3"
                />
                {/* Electric sparks */}
                <circle cx="-6" cy="-12" r="1.5" fill="#fde047" opacity="0">
                  <animate attributeName="cx" from="-6" to="-16" dur="0.8s" fill="freeze" />
                  <animate attributeName="cy" from="-12" to="-20" dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.8" to="0" dur="0.8s" fill="freeze" />
                </circle>
                <circle cx="5" cy="-4" r="1" fill="#fbbf24" opacity="0">
                  <animate attributeName="cx" from="5" to="18" dur="1s" fill="freeze" />
                  <animate attributeName="cy" from="-4" to="-10" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="-3" cy="6" r="1.2" fill="#fde047" opacity="0">
                  <animate attributeName="cx" from="-3" to="-14" dur="0.9s" fill="freeze" />
                  <animate attributeName="cy" from="6" to="14" dur="0.9s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.9s" fill="freeze" />
                </circle>
                <circle cx="8" cy="2" r="0.8" fill="#fbbf24" opacity="0">
                  <animate attributeName="cx" from="8" to="20" dur="1.1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1.1s" fill="freeze" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 2. Medusa's Head — circle with snake-hair paths */}
      <EasterEgg x={84} y={58} found={found.medusa} onFind={() => markFound("medusa")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="36" height="36" viewBox="0 0 36 36" className="overflow-visible">
            {/* Head */}
            <circle cx="18" cy="18" r="8" fill="rgba(100,90,80,0.08)" stroke="rgba(120,110,100,0.1)" strokeWidth="0.5" />
            {/* Snake hair — 6 wavy paths radiating outward */}
            <g opacity={0.08}>
              <path d="M18,10 Q14,4 12,0" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M22,11 Q26,6 28,2" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M24,15 Q30,13 34,10" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M12,15 Q6,13 2,10" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M14,11 Q10,5 8,1" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              <path d="M18,10 Q20,3 22,0" stroke="rgba(80,120,80,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </g>
            {/* Eyes */}
            <circle cx="15" cy="17" r="1.2" fill="rgba(34,197,94,0.1)" />
            <circle cx="21" cy="17" r="1.2" fill="rgba(34,197,94,0.1)" />
            {/* Activation — eyes glow green + stone ripple */}
            {animating && (
              <>
                {/* Glowing green eyes */}
                <circle cx="15" cy="17" r="1.5" fill="#22c55e" opacity="0.9"
                  style={{ filter: "drop-shadow(0 0 6px #22c55e)" }}>
                  <animate attributeName="opacity" values="0.9;0.5;0.9;0.4;0.8;0" dur="2s" fill="freeze" />
                </circle>
                <circle cx="21" cy="17" r="1.5" fill="#22c55e" opacity="0.9"
                  style={{ filter: "drop-shadow(0 0 6px #22c55e)" }}>
                  <animate attributeName="opacity" values="0.9;0.5;0.9;0.4;0.8;0" dur="2s" fill="freeze" />
                </circle>
                {/* Snake hair becomes visible */}
                <g opacity="0">
                  <path d="M18,10 Q14,4 12,0" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M22,11 Q26,6 28,2" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M24,15 Q30,13 34,10" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M12,15 Q6,13 2,10" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M14,11 Q10,5 8,1" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <path d="M18,10 Q20,3 22,0" stroke="#22c55e" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  <animate attributeName="opacity" values="0;0.6;0.4;0.7;0" dur="2s" fill="freeze" />
                </g>
                {/* Stone ripple effect — expanding circle */}
                <circle cx="18" cy="18" r="8" fill="none" stroke="rgba(120,120,120,0.4)" strokeWidth="1.5" opacity="0">
                  <animate attributeName="r" from="8" to="30" dur="1.2s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" fill="freeze" />
                </circle>
                <circle cx="18" cy="18" r="8" fill="none" stroke="rgba(120,120,120,0.3)" strokeWidth="1" opacity="0">
                  <animate attributeName="r" from="8" to="24" dur="1s" fill="freeze" begin="0.2s" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1s" fill="freeze" begin="0.2s" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 3. Golden Apple — circle with leaf, shimmers and floats up */}
      <EasterEgg x={42} y={76} found={found.apple} onFind={() => markFound("apple")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="30" height="36" viewBox="0 0 30 36" className="overflow-visible">
            {/* Apple body */}
            <circle cx="15" cy="20" r="9" fill="rgba(251,191,36,0.07)" stroke="rgba(251,191,36,0.1)" strokeWidth="0.5" />
            {/* Inner highlight */}
            <circle cx="13" cy="17" r="4" fill="rgba(253,224,71,0.04)" />
            {/* Stem */}
            <path d="M15,11 Q15,8 14,6" stroke="rgba(120,80,40,0.15)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
            {/* Leaf */}
            <path d="M14,7 Q18,4 22,6 Q18,8 14,7Z" fill="rgba(34,197,94,0.08)" />
            {/* Activation — shimmer + float upward */}
            {animating && (
              <>
                {/* Golden apple revealed */}
                <circle cx="15" cy="20" r="9" fill="#fbbf24" opacity="0"
                  style={{ filter: "drop-shadow(0 0 10px rgba(251,191,36,0.6))" }}>
                  <animate attributeName="opacity" values="0;0.5;0.3;0.6;0.2;0.5;0" dur="2s" fill="freeze" />
                </circle>
                {/* Shimmer highlight */}
                <ellipse cx="12" cy="16" rx="3" ry="4" fill="rgba(255,255,220,0.4)" opacity="0">
                  <animate attributeName="opacity" values="0;0.4;0;0.3;0;0.5;0" dur="1.5s" fill="freeze" />
                </ellipse>
                {/* Float upward effect */}
                <g opacity="0">
                  <circle cx="15" cy="20" r="9" fill="rgba(251,191,36,0.3)" stroke="#fbbf24" strokeWidth="0.5" />
                  <path d="M15,11 Q15,8 14,6" stroke="rgba(120,80,40,0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                  <path d="M14,7 Q18,4 22,6 Q18,8 14,7Z" fill="rgba(34,197,94,0.3)" />
                  <animate attributeName="opacity" values="0;0.4;0.3;0" dur="2s" fill="freeze" />
                  <animateTransform attributeName="transform" type="translate" from="0 0" to="0 -18" dur="2s" fill="freeze" />
                </g>
                {/* Sparkle particles */}
                <circle cx="8" cy="18" r="1" fill="#fde047" opacity="0">
                  <animate attributeName="opacity" values="0;0.6;0" dur="0.8s" repeatCount="2" />
                </circle>
                <circle cx="22" cy="22" r="0.8" fill="#fbbf24" opacity="0">
                  <animate attributeName="opacity" values="0;0.5;0" dur="0.7s" repeatCount="2" begin="0.3s" />
                </circle>
                <circle cx="15" cy="12" r="0.6" fill="#fde047" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0" dur="0.6s" repeatCount="3" begin="0.2s" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 4. Lyre of Apollo — U-shape body + 4 vibrating strings */}
      <EasterEgg x={72} y={32} found={found.lyre} onFind={() => markFound("lyre")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="32" height="38" viewBox="0 0 32 38" className="overflow-visible">
            {/* U-shape lyre body */}
            <path
              d="M6,4 Q6,30 16,34 Q26,30 26,4"
              stroke="rgba(180,150,80,0.1)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            {/* Crossbar at top */}
            <line x1="6" y1="4" x2="26" y2="4" stroke="rgba(180,150,80,0.1)" strokeWidth="2" strokeLinecap="round" />
            {/* 4 strings */}
            <line x1="10" y1="4" x2="10" y2="28" stroke="rgba(251,191,36,0.06)" strokeWidth="0.7" />
            <line x1="14" y1="4" x2="14" y2="31" stroke="rgba(251,191,36,0.06)" strokeWidth="0.7" />
            <line x1="18" y1="4" x2="18" y2="31" stroke="rgba(251,191,36,0.06)" strokeWidth="0.7" />
            <line x1="22" y1="4" x2="22" y2="28" stroke="rgba(251,191,36,0.06)" strokeWidth="0.7" />
            {/* Activation — strings vibrate + golden glow */}
            {animating && (
              <>
                {/* Golden glow on body */}
                <path
                  d="M6,4 Q6,30 16,34 Q26,30 26,4"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0"
                  style={{ filter: "drop-shadow(0 0 6px rgba(251,191,36,0.5))" }}
                >
                  <animate attributeName="opacity" values="0;0.6;0.4;0.5;0" dur="2s" fill="freeze" />
                </path>
                <line x1="6" y1="4" x2="26" y2="4" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" opacity="0">
                  <animate attributeName="opacity" values="0;0.6;0.4;0.5;0" dur="2s" fill="freeze" />
                </line>
                {/* Vibrating strings — horizontal oscillation */}
                <line x1="10" y1="4" x2="10" y2="28" stroke="#fbbf24" strokeWidth="0.8" opacity="0.7">
                  <animate attributeName="x1" values="10;9;11;9.5;10.5;10" dur="0.3s" repeatCount="6" />
                  <animate attributeName="x2" values="10;11;9;10.5;9.5;10" dur="0.3s" repeatCount="6" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" fill="freeze" />
                </line>
                <line x1="14" y1="4" x2="14" y2="31" stroke="#fde047" strokeWidth="0.8" opacity="0.7">
                  <animate attributeName="x1" values="14;13;15;13.5;14.5;14" dur="0.25s" repeatCount="7" />
                  <animate attributeName="x2" values="14;15;13;14.5;13.5;14" dur="0.25s" repeatCount="7" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" fill="freeze" />
                </line>
                <line x1="18" y1="4" x2="18" y2="31" stroke="#fde047" strokeWidth="0.8" opacity="0.7">
                  <animate attributeName="x1" values="18;17;19;17.5;18.5;18" dur="0.28s" repeatCount="6" />
                  <animate attributeName="x2" values="18;19;17;18.5;17.5;18" dur="0.28s" repeatCount="6" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" fill="freeze" />
                </line>
                <line x1="22" y1="4" x2="22" y2="28" stroke="#fbbf24" strokeWidth="0.8" opacity="0.7">
                  <animate attributeName="x1" values="22;21;23;21.5;22.5;22" dur="0.32s" repeatCount="5" />
                  <animate attributeName="x2" values="22;23;21;22.5;21.5;22" dur="0.32s" repeatCount="5" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="2s" fill="freeze" />
                </line>
                {/* Sound wave circles */}
                <circle cx="16" cy="18" r="5" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="0.5" opacity="0">
                  <animate attributeName="r" from="5" to="22" dur="1.5s" fill="freeze" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" fill="freeze" />
                </circle>
                <circle cx="16" cy="18" r="5" fill="none" stroke="rgba(253,224,71,0.2)" strokeWidth="0.5" opacity="0">
                  <animate attributeName="r" from="5" to="18" dur="1.2s" fill="freeze" begin="0.3s" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="1.2s" fill="freeze" begin="0.3s" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>
    </div>
  )
}
