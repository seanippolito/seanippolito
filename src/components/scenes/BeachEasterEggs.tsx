import { useState, useCallback } from "react"

const STORAGE_KEY = "beach-eggs-found"

function loadFound(): boolean[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length === 4) return parsed
    }
    return [false, false, false, false]
  } catch {
    return [false, false, false, false]
  }
}

function saveFound(state: boolean[]) {
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
          filter: hovering
            ? "brightness(1.5) drop-shadow(0 0 8px rgba(45,212,191,0.5))"
            : "none",
          transition: "filter 0.3s ease-out",
        }}
      >
        {children({ animating, found })}
      </div>
    </div>
  )
}

export function BeachEasterEggs() {
  const [found, setFound] = useState<boolean[]>(loadFound)

  const markFound = useCallback((index: number) => {
    setFound((prev) => {
      const next = [...prev]
      next[index] = true
      saveFound(next)
      return next
    })
  }, [])

  return (
    <div className="fixed inset-0 z-30">
      {/* 1. Message in a bottle — bottom-right area */}
      <EasterEgg x={73} y={78} found={found[0]} onFind={() => markFound(0)}>
        {({ animating, found }: { animating: boolean; found: boolean }) => (
          <svg width="28" height="40" viewBox="0 0 28 40" className="overflow-visible">
            {/* Bottle body */}
            <path
              d="M10,14 Q8,16 8,28 Q8,34 14,34 Q20,34 20,28 L20,14 Z"
              fill="rgba(139,90,43,0.2)"
              stroke="rgba(139,90,43,0.15)"
              strokeWidth="0.5"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Bottle neck */}
            <rect x="12" y="6" width="4" height="8" rx="1" fill="rgba(139,90,43,0.2)" opacity={found ? 0.4 : 0.18} />
            {/* Cork */}
            <rect
              x="11.5"
              y="3"
              width="5"
              height="4"
              rx="1.5"
              fill="rgba(180,140,80,0.25)"
              opacity={found ? 0.4 : 0.18}
              style={{
                transition: "transform 0.6s ease-out",
                transform: animating ? "translateY(-12px)" : "translateY(0)",
                transformOrigin: "center center",
              }}
            />
            {/* Glass highlight */}
            <line x1="11" y1="16" x2="11" y2="30" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            {/* Paper unfurling on click */}
            <rect
              x="9"
              y="36"
              width="12"
              height="8"
              rx="1"
              fill="rgba(255,248,220,0.7)"
              stroke="rgba(180,160,120,0.4)"
              strokeWidth="0.5"
              opacity={animating ? 1 : 0}
              style={{
                transition: "opacity 0.8s ease-in 0.4s",
              }}
            />
            {/* Text lines on paper */}
            {animating && (
              <g opacity="0">
                <line x1="11" y1="38.5" x2="19" y2="38.5" stroke="rgba(100,80,50,0.5)" strokeWidth="0.4" />
                <line x1="11" y1="40.5" x2="17" y2="40.5" stroke="rgba(100,80,50,0.5)" strokeWidth="0.4" />
                <line x1="11" y1="42.5" x2="18" y2="42.5" stroke="rgba(100,80,50,0.5)" strokeWidth="0.4" />
                <animate attributeName="opacity" values="0;0;0.6" dur="1.2s" fill="freeze" />
              </g>
            )}
            {/* Found glow */}
            {found && !animating && (
              <ellipse cx="14" cy="22" rx="8" ry="14" fill="none" stroke="rgba(194,149,107,0.15)" strokeWidth="1">
                <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
              </ellipse>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 2. Treasure chest — bottom-left area */}
      <EasterEgg x={18} y={82} found={found[1]} onFind={() => markFound(1)}>
        {({ animating, found }: { animating: boolean; found: boolean }) => (
          <svg width="36" height="32" viewBox="0 0 36 32" className="overflow-visible">
            {/* Chest body */}
            <rect
              x="4"
              y="14"
              width="28"
              height="16"
              rx="2"
              fill="rgba(120,70,30,0.2)"
              stroke="rgba(100,60,20,0.15)"
              strokeWidth="0.5"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Metal bands */}
            <rect x="4" y="20" width="28" height="2" fill="rgba(180,150,50,0.1)" opacity={found ? 0.35 : 0.12} />
            {/* Lock */}
            <circle cx="18" cy="21" r="2" fill="rgba(200,170,50,0.15)" opacity={found ? 0.4 : 0.15} />
            {/* Chest lid */}
            <path
              d="M4,14 Q4,6 18,4 Q32,6 32,14 Z"
              fill="rgba(100,55,20,0.2)"
              stroke="rgba(80,45,15,0.15)"
              strokeWidth="0.5"
              opacity={found ? 0.4 : 0.18}
              style={{
                transition: "transform 0.6s ease-out",
                transform: animating ? "rotate(-35deg)" : "rotate(0deg)",
                transformOrigin: "4px 14px",
              }}
            />
            {/* Gold coins spilling out on activation */}
            {animating && (
              <>
                <circle cx="14" cy="12" r="3" fill="rgba(251,191,36,0.6)" opacity="0">
                  <animate attributeName="cy" from="12" to="-4" dur="1.2s" fill="freeze" />
                  <animate attributeName="cx" from="14" to="8" dur="1.2s" fill="freeze" />
                  <animate attributeName="opacity" values="0;0.7;0.6;0" dur="1.2s" fill="freeze" />
                </circle>
                <circle cx="18" cy="10" r="2.5" fill="rgba(253,224,71,0.6)" opacity="0">
                  <animate attributeName="cy" from="10" to="-6" dur="1s" fill="freeze" />
                  <animate attributeName="cx" from="18" to="22" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" values="0;0.8;0.5;0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="22" cy="11" r="2" fill="rgba(251,191,36,0.5)" opacity="0">
                  <animate attributeName="cy" from="11" to="0" dur="1.1s" fill="freeze" />
                  <animate attributeName="cx" from="22" to="30" dur="1.1s" fill="freeze" />
                  <animate attributeName="opacity" values="0;0.6;0.4;0" dur="1.1s" fill="freeze" />
                </circle>
                <circle cx="16" cy="11" r="2.8" fill="rgba(253,224,71,0.5)" opacity="0">
                  <animate attributeName="cy" from="11" to="-2" dur="1.3s" fill="freeze" />
                  <animate attributeName="cx" from="16" to="14" dur="1.3s" fill="freeze" />
                  <animate attributeName="opacity" values="0;0.7;0.3;0" dur="1.3s" fill="freeze" />
                </circle>
                {/* Sparkle on coins */}
                <circle cx="18" cy="8" r="1" fill="#fde047" opacity="0">
                  <animate attributeName="opacity" values="0;0.8;0" dur="0.5s" repeatCount="3" />
                </circle>
              </>
            )}
            {/* Found glow */}
            {found && !animating && (
              <rect x="2" y="2" width="32" height="30" rx="4" fill="none" stroke="rgba(251,191,36,0.12)" strokeWidth="1">
                <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3s" repeatCount="indefinite" />
              </rect>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 3. Mermaid tail — mid-right water area */}
      <EasterEgg x={83} y={56} found={found[2]} onFind={() => markFound(2)}>
        {({ animating, found }: { animating: boolean; found: boolean }) => (
          <svg width="30" height="40" viewBox="0 0 30 40" className="overflow-visible">
            {/* Tail curve */}
            <path
              d="M15,4 Q8,12 10,22 Q12,30 18,34"
              stroke="rgba(45,212,191,0.2)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity={found ? 0.4 : 0.15}
            />
            {/* Tail fin */}
            <path
              d="M18,34 Q26,30 28,24 Q22,32 18,34 Q14,38 8,36 Q14,36 18,34"
              fill="rgba(45,212,191,0.15)"
              opacity={found ? 0.4 : 0.15}
            />
            {/* Scale texture hints */}
            <circle cx="12" cy="16" r="1.5" fill="rgba(45,212,191,0.08)" />
            <circle cx="11" cy="21" r="1.5" fill="rgba(45,212,191,0.08)" />
            <circle cx="13" cy="26" r="1.5" fill="rgba(45,212,191,0.08)" />
            {/* Activation — splash + iridescent shimmer */}
            {animating && (
              <>
                {/* Scale up then down splash */}
                <path
                  d="M15,4 Q8,12 10,22 Q12,30 18,34"
                  stroke="#2dd4bf"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0"
                  style={{ filter: "drop-shadow(0 0 6px #2dd4bf)" }}
                >
                  <animate attributeName="opacity" values="0;0.7;0.5;0.7;0.3;0" dur="2s" fill="freeze" />
                  <animateTransform
                    attributeName="transform"
                    type="scale"
                    values="1;1.2;0.95;1.1;1"
                    dur="1s"
                  />
                </path>
                {/* Iridescent color cycling on tail */}
                <path
                  d="M15,4 Q8,12 10,22 Q12,30 18,34"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0"
                  stroke="#a78bfa"
                >
                  <animate attributeName="stroke" values="#2dd4bf;#a78bfa;#f472b6;#38bdf8;#2dd4bf" dur="1.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0.5;0.4;0.6;0" dur="2s" fill="freeze" />
                </path>
                <path
                  d="M18,34 Q26,30 28,24 Q22,32 18,34 Q14,38 8,36 Q14,36 18,34"
                  fill="#2dd4bf"
                  opacity="0"
                >
                  <animate attributeName="fill" values="#2dd4bf;#a78bfa;#f472b6;#38bdf8;#2dd4bf" dur="1.5s" repeatCount="1" />
                  <animate attributeName="opacity" values="0;0.4;0.3;0.5;0" dur="2s" fill="freeze" />
                </path>
                {/* Splash droplets */}
                <circle cx="8" cy="10" r="1.5" fill="rgba(255,255,255,0.5)" opacity="0">
                  <animate attributeName="cy" from="10" to="-4" dur="0.8s" fill="freeze" />
                  <animate attributeName="cx" from="8" to="2" dur="0.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.8s" fill="freeze" />
                </circle>
                <circle cx="18" cy="8" r="1" fill="rgba(255,255,255,0.4)" opacity="0">
                  <animate attributeName="cy" from="8" to="-6" dur="1s" fill="freeze" />
                  <animate attributeName="cx" from="18" to="24" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="12" cy="6" r="1.2" fill="rgba(255,255,255,0.5)" opacity="0">
                  <animate attributeName="cy" from="6" to="-8" dur="0.9s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="0.9s" fill="freeze" />
                </circle>
              </>
            )}
            {/* Found glow */}
            {found && !animating && (
              <path
                d="M15,4 Q8,12 10,22 Q12,30 18,34"
                stroke="rgba(45,212,191,0.15)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              >
                <animate attributeName="opacity" values="0.15;0.25;0.15" dur="3s" repeatCount="indefinite" />
              </path>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 4. Trident — mid-left water area */}
      <EasterEgg x={16} y={54} found={found[3]} onFind={() => markFound(3)}>
        {({ animating, found }: { animating: boolean; found: boolean }) => (
          <svg width="24" height="48" viewBox="0 0 24 48" className="overflow-visible">
            {/* Shaft */}
            <line
              x1="12"
              y1="14"
              x2="12"
              y2="46"
              stroke="rgba(120,140,160,0.2)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Center prong */}
            <line
              x1="12"
              y1="0"
              x2="12"
              y2="16"
              stroke="rgba(120,140,160,0.2)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Left prong */}
            <path
              d="M12,16 Q6,14 4,2"
              stroke="rgba(120,140,160,0.2)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Right prong */}
            <path
              d="M12,16 Q18,14 20,2"
              stroke="rgba(120,140,160,0.2)"
              strokeWidth="1.8"
              fill="none"
              strokeLinecap="round"
              opacity={found ? 0.4 : 0.18}
            />
            {/* Prong tips */}
            <polygon points="12,0 10,4 14,4" fill="rgba(120,140,160,0.15)" opacity={found ? 0.4 : 0.18} />
            <polygon points="4,2 2.5,6 5.5,5" fill="rgba(120,140,160,0.15)" opacity={found ? 0.4 : 0.18} />
            <polygon points="20,2 18.5,5 21.5,6" fill="rgba(120,140,160,0.15)" opacity={found ? 0.4 : 0.18} />
            {/* Activation — aqua glow + water ripples */}
            {animating && (
              <>
                {/* Aqua glow on trident */}
                <line x1="12" y1="14" x2="12" y2="46" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0"
                  style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}>
                  <animate attributeName="opacity" values="0;0.7;0.5;0.6;0" dur="2s" fill="freeze" />
                </line>
                <line x1="12" y1="0" x2="12" y2="16" stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" opacity="0"
                  style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}>
                  <animate attributeName="opacity" values="0;0.8;0.5;0.7;0" dur="2s" fill="freeze" />
                </line>
                <path d="M12,16 Q6,14 4,2" stroke="#22d3ee" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0"
                  style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}>
                  <animate attributeName="opacity" values="0;0.7;0.5;0.6;0" dur="2s" fill="freeze" />
                </path>
                <path d="M12,16 Q18,14 20,2" stroke="#22d3ee" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0"
                  style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }}>
                  <animate attributeName="opacity" values="0;0.7;0.5;0.6;0" dur="2s" fill="freeze" />
                </path>
                {/* Prong tips glow */}
                <polygon points="12,0 10,4 14,4" fill="#22d3ee" opacity="0">
                  <animate attributeName="opacity" values="0;0.8;0.4;0.6;0" dur="2s" fill="freeze" />
                </polygon>
                <polygon points="4,2 2.5,6 5.5,5" fill="#22d3ee" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0.4;0.5;0" dur="2s" fill="freeze" />
                </polygon>
                <polygon points="20,2 18.5,5 21.5,6" fill="#22d3ee" opacity="0">
                  <animate attributeName="opacity" values="0;0.7;0.4;0.5;0" dur="2s" fill="freeze" />
                </polygon>
                {/* Water ripple circles expanding from center */}
                <circle cx="12" cy="24" r="5" fill="none" stroke="rgba(34,211,238,0.4)" strokeWidth="1" opacity="0">
                  <animate attributeName="r" from="5" to="30" dur="1.5s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" fill="freeze" />
                </circle>
                <circle cx="12" cy="24" r="5" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="0.8" opacity="0">
                  <animate attributeName="r" from="5" to="24" dur="1.2s" fill="freeze" begin="0.2s" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.2s" fill="freeze" begin="0.2s" />
                </circle>
                <circle cx="12" cy="24" r="5" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="0.6" opacity="0">
                  <animate attributeName="r" from="5" to="20" dur="1s" fill="freeze" begin="0.4s" />
                  <animate attributeName="opacity" from="0.35" to="0" dur="1s" fill="freeze" begin="0.4s" />
                </circle>
              </>
            )}
            {/* Found glow */}
            {found && !animating && (
              <line x1="12" y1="0" x2="12" y2="46" stroke="rgba(34,211,238,0.1)" strokeWidth="6" strokeLinecap="round">
                <animate attributeName="opacity" values="0.1;0.2;0.1" dur="3s" repeatCount="indefinite" />
              </line>
            )}
          </svg>
        )}
      </EasterEgg>
    </div>
  )
}
