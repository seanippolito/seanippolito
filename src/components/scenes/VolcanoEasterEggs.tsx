import { useState, useCallback } from "react"

interface EggState {
  skull: boolean
  rune: boolean
  sword: boolean
  eye: boolean
}

const STORAGE_KEY = "volcano-eggs-found"

function loadFound(): EggState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { skull: false, rune: false, sword: false, eye: false }
  } catch {
    return { skull: false, rune: false, sword: false, eye: false }
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
          filter: hovering ? "brightness(1.5) drop-shadow(0 0 8px rgba(234,88,12,0.5))" : "none",
          transition: "filter 0.3s ease-out",
        }}
      >
        {children({ animating, found })}
      </div>
    </div>
  )
}

export function VolcanoEasterEggs() {
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
      {/* 1. Demon skull embedded in left rock formation */}
      <EasterEgg x={8} y={72} found={found.skull} onFind={() => markFound("skull")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="32" height="36" viewBox="0 0 32 36" className="overflow-visible">
            {/* Skull shape */}
            <ellipse cx="16" cy="14" rx="11" ry="12" fill="rgba(40,15,10,0.6)" />
            <ellipse cx="16" cy="14" rx="9" ry="10" fill="rgba(50,20,12,0.5)" />
            {/* Eye sockets */}
            <ellipse cx="11" cy="12" rx="3.5" ry="4" fill="rgba(10,2,2,0.9)" />
            <ellipse cx="21" cy="12" rx="3.5" ry="4" fill="rgba(10,2,2,0.9)" />
            {/* Glowing eyes */}
            <circle cx="11" cy="12" r="1.5" fill="#ea580c" opacity={animating ? 0.9 : 0.15}>
              {animating && <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.5s" repeatCount="4" />}
            </circle>
            <circle cx="21" cy="12" r="1.5" fill="#ea580c" opacity={animating ? 0.9 : 0.15}>
              {animating && <animate attributeName="opacity" values="0.9;0.3;0.9" dur="0.5s" repeatCount="4" />}
            </circle>
            {/* Nose cavity */}
            <polygon points="16,15 14,19 18,19" fill="rgba(10,2,2,0.7)" />
            {/* Horns */}
            <path d="M7 6 Q4 -2 2 -4" stroke="rgba(50,20,12,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M25 6 Q28 -2 30 -4" stroke="rgba(50,20,12,0.5)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Teeth */}
            <path d="M10 22 L11 25 L13 22 L15 25 L17 22 L19 25 L21 22" stroke="rgba(60,30,15,0.4)" strokeWidth="1" fill="none" />
            {/* Fire burst on click */}
            {animating && (
              <>
                <circle cx="11" cy="12" r="6" fill="rgba(234,88,12,0.3)">
                  <animate attributeName="r" from="2" to="12" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="21" cy="12" r="6" fill="rgba(234,88,12,0.3)">
                  <animate attributeName="r" from="2" to="12" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1s" fill="freeze" />
                </circle>
                {/* Flames rising */}
                <path d="M16 5 Q14 -5 16 -10 Q18 -5 16 5" fill="rgba(255,150,50,0.4)">
                  <animate attributeName="d" values="M16 5 Q14 -5 16 -10 Q18 -5 16 5;M16 5 Q12 -8 16 -15 Q20 -8 16 5;M16 5 Q14 -5 16 -10 Q18 -5 16 5" dur="0.6s" repeatCount="3" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" fill="freeze" />
                </path>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 2. Ancient hellish rune — carved into right rock face */}
      <EasterEgg x={88} y={68} found={found.rune} onFind={() => markFound("rune")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="28" height="32" viewBox="0 0 28 32" className="overflow-visible">
            {/* Rock surface */}
            <rect x="2" y="2" width="24" height="28" rx="3" fill="rgba(30,10,8,0.4)" />
            {/* Pentagram-like rune */}
            <g opacity={animating ? 0.9 : 0.1}>
              <circle cx="14" cy="16" r="10" stroke="#ea580c" strokeWidth="1" fill="none"
                style={{ filter: animating ? "drop-shadow(0 0 6px #ea580c)" : "none" }} />
              <polygon points="14,6 18,22 7,12 21,12 10,22" stroke="#ef4444" strokeWidth="0.8" fill="none"
                style={{ filter: animating ? "drop-shadow(0 0 4px #ef4444)" : "none" }} />
              <circle cx="14" cy="16" r="3" stroke="#f59e0b" strokeWidth="0.5" fill="none" />
              {animating && (
                <animate attributeName="opacity" values="0.9;0.5;0.9;0.3;0.8;0" dur="2s" fill="freeze" />
              )}
            </g>
            {/* Sparks on activation */}
            {animating && (
              <>
                <circle cx="14" cy="6" r="1.5" fill="#f59e0b" opacity="0.7">
                  <animate attributeName="cy" from="6" to="-8" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="7" cy="22" r="1" fill="#ea580c" opacity="0.6">
                  <animate attributeName="cy" from="22" to="10" dur="1.2s" fill="freeze" />
                  <animate attributeName="cx" from="7" to="-3" dur="1.2s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.2s" fill="freeze" />
                </circle>
                <circle cx="21" cy="12" r="1.2" fill="#ef4444" opacity="0.5">
                  <animate attributeName="cx" from="21" to="32" dur="1s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1s" fill="freeze" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 3. Ancient cursed sword — stuck in ground near lava pool */}
      <EasterEgg x={48} y={83} found={found.sword} onFind={() => markFound("sword")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="16" height="40" viewBox="0 0 16 40" className="overflow-visible">
            {/* Blade */}
            <polygon points="8,0 10,24 8,26 6,24" fill="rgba(120,120,130,0.3)" />
            <polygon points="8,0 10,24 8,20" fill="rgba(180,180,190,0.2)" />
            {/* Guard */}
            <rect x="2" y="24" width="12" height="2" rx="1" fill="rgba(80,40,20,0.4)" />
            {/* Handle */}
            <rect x="6" y="26" width="4" height="8" rx="1" fill="rgba(60,30,15,0.4)" />
            {/* Pommel */}
            <circle cx="8" cy="35" r="2.5" fill="rgba(80,40,20,0.4)" />
            {/* Gem in pommel */}
            <circle cx="8" cy="35" r="1" fill="#ea580c" opacity={animating ? 0.9 : 0.15} />
            {/* Lava glow on blade when activated */}
            {animating && (
              <>
                <polygon points="8,2 9.5,22 8,24 6.5,22" fill="rgba(234,88,12,0.4)">
                  <animate attributeName="opacity" values="0;0.5;0.3;0.6;0" dur="2s" fill="freeze" />
                </polygon>
                {/* Rune marks appear on blade */}
                <path d="M7.5 6 L8.5 10 M7.5 12 L8.5 16 M7.5 18 L8.5 22" stroke="#f59e0b" strokeWidth="0.5" opacity="0">
                  <animate attributeName="opacity" values="0;0.6;0" dur="2s" fill="freeze" />
                </path>
                {/* Energy pulse */}
                <circle cx="8" cy="12" r="3" fill="none" stroke="#ea580c" strokeWidth="0.5" opacity="0">
                  <animate attributeName="r" from="2" to="20" dur="1.5s" fill="freeze" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.5s" fill="freeze" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 4. All-seeing eye — hidden in smoke/rock near volcano peak */}
      <EasterEgg x={55} y={38} found={found.eye} onFind={() => markFound("eye")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="30" height="20" viewBox="0 0 30 20" className="overflow-visible">
            {/* Eye shape */}
            <path d="M2 10 Q15 0 28 10 Q15 20 2 10Z" fill="rgba(20,5,5,0.5)" stroke="rgba(234,88,12,0.15)" strokeWidth="0.5" />
            {/* Iris */}
            <circle cx="15" cy="10" r="5" fill="rgba(200,60,20,0.3)" />
            <circle cx="15" cy="10" r="3" fill="rgba(234,88,12,0.4)" />
            {/* Pupil */}
            <ellipse cx="15" cy="10" rx="1.5" ry="3" fill="rgba(10,2,2,0.8)" />
            {/* Slit glow */}
            <ellipse cx="15" cy="10" rx="0.5" ry="2" fill="#ea580c" opacity={animating ? 0.8 : 0.1} />
            {/* Activation — eye opens wide and pulses */}
            {animating && (
              <>
                <circle cx="15" cy="10" r="8" fill="none" stroke="#ea580c" strokeWidth="1" opacity="0">
                  <animate attributeName="r" from="5" to="25" dur="1.2s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.2s" fill="freeze" />
                </circle>
                <circle cx="15" cy="10" r="5" fill="rgba(234,88,12,0.3)">
                  <animate attributeName="opacity" values="0.3;0.6;0.3;0.5;0" dur="2s" fill="freeze" />
                </circle>
                {/* Rays emanating */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="15"
                    y1="10"
                    x2={15 + Math.cos((deg * Math.PI) / 180) * 20}
                    y2={10 + Math.sin((deg * Math.PI) / 180) * 12}
                    stroke="#ea580c"
                    strokeWidth="0.5"
                    opacity="0"
                  >
                    <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" fill="freeze" />
                  </line>
                ))}
              </>
            )}
          </svg>
        )}
      </EasterEgg>
    </div>
  )
}
