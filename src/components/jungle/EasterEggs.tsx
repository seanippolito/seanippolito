import { useState, useCallback } from "react"

interface EggState {
  mushroom: boolean
  beetle: boolean
  crystal: boolean
  rune: boolean
}

const STORAGE_KEY = "jungle-eggs-found"

function loadFound(): EggState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : { mushroom: false, beetle: false, crystal: false, rune: false }
  } catch {
    return { mushroom: false, beetle: false, crystal: false, rune: false }
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
        cursor: "none",
        transform: `scale(${animating ? 1.15 : 1})`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <div
        style={{
          filter: hovering ? "brightness(1.3) drop-shadow(0 0 8px rgba(180, 220, 100, 0.4))" : "none",
          transition: "filter 0.3s ease-out",
        }}
      >
        {children({ animating, found })}
      </div>
    </div>
  )
}

export function EasterEggs() {
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
      {/* 1. Glowing Mushroom — near fallen log */}
      <EasterEgg x={40} y={81} found={found.mushroom} onFind={() => markFound("mushroom")}>
        {({ animating }: { animating: boolean; found: boolean }) => (
          <svg width="30" height="35" viewBox="0 0 30 35" className="overflow-visible">
            {/* Stem */}
            <rect x="11" y="18" width="8" height="14" rx="3" fill="#c8b890" opacity="0.4" />
            {/* Cap */}
            <ellipse cx="15" cy="18" rx="12" ry="8" fill="#8a4020" opacity="0.35" />
            <ellipse cx="15" cy="17" rx="10" ry="6" fill="#a05030" opacity="0.3" />
            {/* Bioluminescent spots */}
            <circle cx="10" cy="16" r="2" fill="#60ff80" opacity={animating ? 0.9 : 0.15}>
              {animating && <animate attributeName="opacity" values="0.9;0.4;0.9" dur="0.4s" repeatCount="5" />}
            </circle>
            <circle cx="18" cy="14" r="1.5" fill="#40ff60" opacity={animating ? 0.8 : 0.12}>
              {animating && <animate attributeName="opacity" values="0.8;0.3;0.8" dur="0.3s" repeatCount="6" />}
            </circle>
            <circle cx="14" cy="12" r="1" fill="#80ffa0" opacity={animating ? 0.7 : 0.1}>
              {animating && <animate attributeName="opacity" values="0.7;0.2;0.7" dur="0.35s" repeatCount="5" />}
            </circle>
            {/* Spore particles when clicked */}
            {animating && (
              <>
                <circle cx="8" cy="10" r="1" fill="#60ff80" opacity="0.6">
                  <animate attributeName="cy" from="10" to="-15" dur="1.5s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" fill="freeze" />
                </circle>
                <circle cx="20" cy="8" r="0.8" fill="#40ff60" opacity="0.5">
                  <animate attributeName="cy" from="8" to="-20" dur="1.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" fill="freeze" />
                </circle>
                <circle cx="14" cy="6" r="0.6" fill="#80ffa0" opacity="0.4">
                  <animate attributeName="cy" from="6" to="-18" dur="1.6s" fill="freeze" />
                  <animate attributeName="cx" from="14" to="22" dur="1.6s" fill="freeze" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="1.6s" fill="freeze" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 2. Golden Beetle — on right tree trunk */}
      <EasterEgg x={92} y={48} found={found.beetle} onFind={() => markFound("beetle")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="20" height="20" viewBox="0 0 20 20" className="overflow-visible">
            <g
              style={{
                transform: animating ? "rotate(720deg) scale(0)" : "rotate(0deg) scale(1)",
                transformOrigin: "10px 10px",
                transition: animating ? "transform 1.5s ease-in" : "none",
              }}
            >
              <ellipse cx="10" cy="10" rx="5" ry="7" fill="#c8a020" opacity="0.5" />
              <ellipse cx="10" cy="10" rx="4" ry="6" fill="#d4b030" opacity="0.4" />
              <line x1="10" y1="4" x2="10" y2="16" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <circle cx="8" cy="6" r="1" fill="#ffe060" opacity="0.3" />
              <circle cx="12" cy="6" r="1" fill="#ffe060" opacity="0.3" />
              {/* Legs */}
              <path d="M5 8 L2 6" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <path d="M5 10 L2 10" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <path d="M5 12 L2 14" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <path d="M15 8 L18 6" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <path d="M15 10 L18 10" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
              <path d="M15 12 L18 14" stroke="#a08010" strokeWidth="0.5" opacity="0.3" />
            </g>
            {/* Shimmer trail when flying away */}
            {animating && (
              <>
                <circle cx="10" cy="10" r="2" fill="#ffe060" opacity="0.3">
                  <animate attributeName="opacity" from="0.3" to="0" dur="1s" fill="freeze" />
                </circle>
                <circle cx="10" cy="10" r="4" fill="#ffe060" opacity="0.15">
                  <animate attributeName="opacity" from="0.15" to="0" dur="1.2s" fill="freeze" />
                </circle>
              </>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 3. Crystal — in rock crevice between ponds */}
      <EasterEgg x={56} y={79} found={found.crystal} onFind={() => markFound("crystal")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="25" height="30" viewBox="0 0 25 30" className="overflow-visible">
            {/* Crystal shape */}
            <polygon points="12,2 18,12 15,28 10,28 7,12" fill="#a0c0e0" opacity={animating ? 0.7 : 0.2} />
            <polygon points="12,2 18,12 12,10" fill="#c0e0ff" opacity={animating ? 0.6 : 0.15} />
            <polygon points="12,2 7,12 12,10" fill="#80a0c0" opacity={animating ? 0.5 : 0.15} />
            {/* Prismatic rays on click */}
            {animating && (
              <g>
                <line x1="12" y1="12" x2="-10" y2="0" stroke="#ff6060" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0;0.4;0" dur="1.5s" fill="freeze" />
                </line>
                <line x1="12" y1="12" x2="35" y2="2" stroke="#60ff60" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0;0.4;0" dur="1.5s" fill="freeze" />
                </line>
                <line x1="12" y1="12" x2="0" y2="-10" stroke="#6060ff" strokeWidth="1" opacity="0.4">
                  <animate attributeName="opacity" values="0;0.4;0" dur="1.5s" fill="freeze" />
                </line>
                <line x1="12" y1="12" x2="30" y2="-8" stroke="#ffff60" strokeWidth="1" opacity="0.3">
                  <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" fill="freeze" />
                </line>
                <line x1="12" y1="12" x2="-5" y2="25" stroke="#ff60ff" strokeWidth="1" opacity="0.3">
                  <animate attributeName="opacity" values="0;0.3;0" dur="1.5s" fill="freeze" />
                </line>
              </g>
            )}
          </svg>
        )}
      </EasterEgg>

      {/* 4. Ancient Rune — on mossy rock left of pond */}
      <EasterEgg x={12.5} y={80} found={found.rune} onFind={() => markFound("rune")}>
        {({ animating }: { animating: boolean }) => (
          <svg width="28" height="28" viewBox="0 0 28 28" className="overflow-visible">
            {/* Rock base */}
            <ellipse cx="14" cy="18" rx="12" ry="8" fill="#4a5a4a" opacity="0.25" />
            {/* Rune symbols */}
            <g opacity={animating ? 0.8 : 0.12}>
              <path d="M10 8 L14 4 L18 8 L14 20Z" stroke="#80ffa0" strokeWidth="1" fill="none"
                style={{ filter: animating ? "drop-shadow(0 0 4px #60ff80)" : "none" }} />
              <path d="M8 14 L20 14" stroke="#80ffa0" strokeWidth="0.8" fill="none" />
              <circle cx="14" cy="12" r="2" stroke="#80ffa0" strokeWidth="0.8" fill="none" />
              {animating && (
                <>
                  <animate attributeName="opacity" values="0.8;0.4;0.8;0.3;0.9;0" dur="2s" fill="freeze" />
                </>
              )}
            </g>
            {/* Floating symbols on activation */}
            {animating && (
              <>
                <text x="5" y="5" fontSize="6" fill="#80ffa0" opacity="0.5" fontFamily="serif">
                  <animate attributeName="y" from="5" to="-15" dur="1.8s" fill="freeze" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" fill="freeze" />
                  &#x16A0;
                </text>
                <text x="20" y="8" fontSize="5" fill="#60ff80" opacity="0.4" fontFamily="serif">
                  <animate attributeName="y" from="8" to="-12" dur="2s" fill="freeze" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="2s" fill="freeze" />
                  &#x16B1;
                </text>
              </>
            )}
          </svg>
        )}
      </EasterEgg>
    </div>
  )
}
