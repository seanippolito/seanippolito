import { useState } from "react"
import type { SceneName, Direction } from "../data/scenes"
import { getDirectionLabels } from "../data/scenes"

interface NavigationHubProps {
  currentScene: SceneName
  onNavigate: (direction: Direction) => void
  onActivateGame: () => void
  disabled: boolean
}

const ARROW_ROTATION: Record<Direction, number> = {
  north: -90,
  east: 0,
  south: 90,
  west: 180,
}

function ArrowButton({
  direction,
  label,
  disabled,
  onNavigate,
  scene,
}: {
  direction: Direction
  label: string
  disabled: boolean
  onNavigate: (dir: Direction) => void
  scene?: SceneName
}) {
  const isBeach = scene === "beach"
  const isSnow = scene === "snow"
  const isHeaven = scene === "heaven"
  const hasOutline = isBeach || isSnow || isHeaven
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={() => onNavigate(direction)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={disabled}
      className="flex cursor-pointer items-center justify-center border-none bg-transparent transition-all duration-300"
      style={{
        opacity: disabled ? 0.2 : hovered ? 1 : undefined,
        transform: hovered && !disabled ? "scale(1.2)" : "scale(1)",
        pointerEvents: disabled ? "none" : "auto",
        animation: !hovered && !disabled ? "nav-pulse 3s ease-in-out infinite" : "none",
      }}
      aria-label={`Navigate to ${label}`}
    >
      <div className="relative flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{ transform: `rotate(${ARROW_ROTATION[direction]}deg)` }}
        >
          {/* Dark outline for themed backdrops */}
          {hasOutline && (
            <path
              d="M9 5l7 7-7 7"
              stroke="rgba(0, 0, 0, 0.6)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <path
            d="M9 5l7 7-7 7"
            stroke={isBeach ? "#ffffff" : isSnow ? "#fbbf24" : isHeaven ? "#b8860b" : "rgba(212, 160, 48, 0.9)"}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: hovered
                ? isBeach
                  ? "drop-shadow(0 0 6px rgba(255, 255, 255, 0.8))"
                  : isSnow
                    ? "drop-shadow(0 0 8px rgba(255,180,40,0.8))"
                    : isHeaven
                      ? "drop-shadow(0 0 8px rgba(184,134,11,0.7))"
                      : "drop-shadow(0 0 6px rgba(212, 160, 48, 0.6))"
                : "none",
            }}
          />
        </svg>
        <span
          className="absolute whitespace-nowrap text-xs transition-opacity duration-300"
          style={{
            color: "rgba(212, 160, 48, 0.7)",
            opacity: hovered ? 1 : 0,
            // Position label on the outside of each arrow
            ...(direction === "north" ? { bottom: "100%", marginBottom: 2 } :
                direction === "south" ? { top: "100%", marginTop: 2 } :
                direction === "east" ? { left: "100%", marginLeft: 4 } :
                { right: "100%", marginRight: 4 }),
          }}
        >
          {label}
        </span>
      </div>
    </button>
  )
}

const FROST_SCENES: SceneName[] = []

function HeavenCloud() {
  // Fluffy white cloud platform for the nav arrows
  const w = 280
  const h = 220
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ filter: "drop-shadow(0 6px 20px rgba(180,160,120,0.3))" }}
    >
      <defs>
        <radialGradient id="cloud-inner" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="60%" stopColor="rgba(245,240,235,0.9)" />
          <stop offset="100%" stopColor="rgba(220,215,210,0.7)" />
        </radialGradient>
        <radialGradient id="cloud-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="rgba(255,250,220,0.4)" />
          <stop offset="100%" stopColor="rgba(255,250,220,0)" />
        </radialGradient>
        <filter id="cloud-soft">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* Divine golden glow behind */}
      <ellipse cx={w/2} cy={h/2 - 10} rx="120" ry="90" fill="url(#cloud-glow)" />

      {/* Main cloud body — overlapping ellipses for fluffy shape */}
      <g opacity="0.92">
        {/* Bottom base — wide and flat */}
        <ellipse cx={w/2} cy={h/2 + 30} rx="120" ry="40" fill="rgba(235,230,225,0.85)" />
        <ellipse cx={w/2 - 30} cy={h/2 + 25} rx="80" ry="35" fill="rgba(240,237,232,0.9)" />
        <ellipse cx={w/2 + 35} cy={h/2 + 25} rx="75" ry="32" fill="rgba(238,235,230,0.88)" />

        {/* Middle puffs */}
        <ellipse cx={w/2 - 50} cy={h/2} rx="60" ry="45" fill="rgba(248,245,240,0.92)" />
        <ellipse cx={w/2 + 50} cy={h/2 - 5} rx="55" ry="42" fill="rgba(245,242,238,0.9)" />
        <ellipse cx={w/2} cy={h/2 - 5} rx="70" ry="50" fill="url(#cloud-inner)" />

        {/* Top puffs — smaller, rounder */}
        <ellipse cx={w/2 - 30} cy={h/2 - 35} rx="45" ry="35" fill="rgba(252,250,248,0.93)" />
        <ellipse cx={w/2 + 25} cy={h/2 - 30} rx="50" ry="38" fill="rgba(250,248,245,0.92)" />
        <ellipse cx={w/2} cy={h/2 - 25} rx="55" ry="40" fill="rgba(255,253,250,0.95)" />

        {/* Crown puff */}
        <ellipse cx={w/2 - 5} cy={h/2 - 50} rx="35" ry="25" fill="rgba(255,255,252,0.9)" />
      </g>

      {/* Highlight — top-lit by golden light */}
      <g filter="url(#cloud-soft)" opacity="0.5">
        <ellipse cx={w/2 - 15} cy={h/2 - 40} rx="30" ry="18" fill="rgba(255,250,230,0.6)" />
        <ellipse cx={w/2 + 20} cy={h/2 - 30} rx="25" ry="15" fill="rgba(255,248,225,0.5)" />
      </g>

      {/* Subtle shadow on underside */}
      <ellipse cx={w/2} cy={h/2 + 40} rx="100" ry="20" fill="rgba(180,175,170,0.15)" />
    </svg>
  )
}

function CampfireRing() {
  // Stone ring campfire viewed from above — warm glow, crackling logs
  const w = 340
  const h = 350
  // Internal coords stay at 170x175, rendered at 2x via width/height
  const vw = 170
  const vh = 175
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${vw} ${vh}`}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ filter: "drop-shadow(0 2px 15px rgba(255,150,30,0.4))" }}
    >
      <defs>
        <radialGradient id="fire-glow" cx="50%" cy="45%" r="40%">
          <stop offset="0%" stopColor="rgba(255,200,80,0.5)" />
          <stop offset="40%" stopColor="rgba(255,120,20,0.3)" />
          <stop offset="70%" stopColor="rgba(200,60,0,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="ember-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,220,120,0.9)" />
          <stop offset="50%" stopColor="rgba(255,140,40,0.6)" />
          <stop offset="100%" stopColor="rgba(180,60,0,0.2)" />
        </radialGradient>
      </defs>

      {/* Warm ground glow */}
      <ellipse cx={vw/2} cy={vh/2} rx="80" ry="80" fill="url(#fire-glow)" />

      {/* Stone ring — irregular stones in a circle */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const r = 58 + (i % 3 - 1) * 3
        const cx = vw/2 + Math.cos((angle * Math.PI) / 180) * r
        const cy = vh/2 + Math.sin((angle * Math.PI) / 180) * r
        const rx = 10 + (i % 3) * 2
        const ry = 7 + (i % 2) * 2
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill={i % 3 === 0 ? "rgba(80,75,70,0.85)" : i % 3 === 1 ? "rgba(100,90,80,0.8)" : "rgba(70,65,60,0.9)"}
            transform={`rotate(${angle + 15} ${cx} ${cy})`}
          />
        )
      })}
      {/* Stone highlights */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const r = 58
        const cx = vw/2 + Math.cos((angle * Math.PI) / 180) * r
        const cy = vh/2 + Math.sin((angle * Math.PI) / 180) * r
        return (
          <ellipse
            key={`h-${i}`}
            cx={cx - 2}
            cy={cy - 2}
            rx={4}
            ry={2.5}
            fill="rgba(160,150,140,0.2)"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        )
      })}

      {/* Ash bed */}
      <ellipse cx={vw/2} cy={vh/2 + 2} rx="38" ry="35" fill="rgba(50,45,40,0.7)" />
      <ellipse cx={vw/2} cy={vh/2 + 2} rx="32" ry="28" fill="rgba(60,50,42,0.6)" />

      {/* Ember glow center */}
      <ellipse cx={vw/2} cy={vh/2} rx="25" ry="22" fill="url(#ember-center)" />

      {/* Logs — crossed in the fire */}
      <rect x={vw/2 - 35} y={vh/2 - 4} width="70" height="8" rx="4" fill="rgba(90,55,25,0.85)" transform={`rotate(-25 ${vw/2} ${vh/2})`} />
      <rect x={vw/2 - 30} y={vh/2 - 4} width="60" height="7" rx="3.5" fill="rgba(75,45,20,0.8)" transform={`rotate(30 ${vw/2} ${vh/2})`} />
      <rect x={vw/2 - 25} y={vh/2 - 3} width="50" height="6" rx="3" fill="rgba(100,60,28,0.75)" transform={`rotate(-5 ${vw/2} ${vh/2})`} />
      {/* Charred bark texture on logs */}
      <rect x={vw/2 - 20} y={vh/2 - 2} width="12" height="3" rx="1.5" fill="rgba(30,20,10,0.4)" transform={`rotate(-25 ${vw/2} ${vh/2})`} />
      <rect x={vw/2 + 5} y={vh/2 - 2} width="10" height="3" rx="1.5" fill="rgba(30,20,10,0.35)" transform={`rotate(30 ${vw/2} ${vh/2})`} />

      {/* Animated flames */}
      <g opacity="0.85">
        {/* Main flame */}
        <path d={`M${vw/2} ${vh/2 - 8} Q${vw/2 - 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 42} Q${vw/2 + 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 8}`} fill="rgba(255,180,40,0.8)">
          <animate attributeName="d"
            values={`M${vw/2} ${vh/2 - 8} Q${vw/2 - 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 42} Q${vw/2 + 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 8};M${vw/2} ${vh/2 - 8} Q${vw/2 - 10} ${vh/2 - 28} ${vw/2 - 3} ${vh/2 - 46} Q${vw/2 + 6} ${vh/2 - 32} ${vw/2} ${vh/2 - 8};M${vw/2} ${vh/2 - 8} Q${vw/2 - 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 42} Q${vw/2 + 8} ${vh/2 - 30} ${vw/2} ${vh/2 - 8}`}
            dur="0.8s" repeatCount="indefinite" />
        </path>
        {/* Inner bright core */}
        <path d={`M${vw/2} ${vh/2 - 6} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 30} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 6}`} fill="rgba(255,240,150,0.9)">
          <animate attributeName="d"
            values={`M${vw/2} ${vh/2 - 6} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 30} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 6};M${vw/2} ${vh/2 - 6} Q${vw/2 - 5} ${vh/2 - 18} ${vw/2 - 2} ${vh/2 - 33} Q${vw/2 + 3} ${vh/2 - 22} ${vw/2} ${vh/2 - 6};M${vw/2} ${vh/2 - 6} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 30} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2} ${vh/2 - 6}`}
            dur="0.6s" repeatCount="indefinite" />
        </path>
        {/* Left flame tongue */}
        <path d={`M${vw/2 - 10} ${vh/2 - 5} Q${vw/2 - 16} ${vh/2 - 22} ${vw/2 - 8} ${vh/2 - 32} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2 - 10} ${vh/2 - 5}`} fill="rgba(255,140,20,0.65)">
          <animate attributeName="d"
            values={`M${vw/2 - 10} ${vh/2 - 5} Q${vw/2 - 16} ${vh/2 - 22} ${vw/2 - 8} ${vh/2 - 32} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2 - 10} ${vh/2 - 5};M${vw/2 - 10} ${vh/2 - 5} Q${vw/2 - 18} ${vh/2 - 20} ${vw/2 - 12} ${vh/2 - 28} Q${vw/2 - 6} ${vh/2 - 18} ${vw/2 - 10} ${vh/2 - 5};M${vw/2 - 10} ${vh/2 - 5} Q${vw/2 - 16} ${vh/2 - 22} ${vw/2 - 8} ${vh/2 - 32} Q${vw/2 - 4} ${vh/2 - 20} ${vw/2 - 10} ${vh/2 - 5}`}
            dur="0.7s" repeatCount="indefinite" />
        </path>
        {/* Right flame tongue */}
        <path d={`M${vw/2 + 10} ${vh/2 - 5} Q${vw/2 + 16} ${vh/2 - 22} ${vw/2 + 8} ${vh/2 - 32} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2 + 10} ${vh/2 - 5}`} fill="rgba(255,140,20,0.6)">
          <animate attributeName="d"
            values={`M${vw/2 + 10} ${vh/2 - 5} Q${vw/2 + 16} ${vh/2 - 22} ${vw/2 + 8} ${vh/2 - 32} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2 + 10} ${vh/2 - 5};M${vw/2 + 10} ${vh/2 - 5} Q${vw/2 + 14} ${vh/2 - 19} ${vw/2 + 11} ${vh/2 - 27} Q${vw/2 + 6} ${vh/2 - 17} ${vw/2 + 10} ${vh/2 - 5};M${vw/2 + 10} ${vh/2 - 5} Q${vw/2 + 16} ${vh/2 - 22} ${vw/2 + 8} ${vh/2 - 32} Q${vw/2 + 4} ${vh/2 - 20} ${vw/2 + 10} ${vh/2 - 5}`}
            dur="0.9s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Sparks / floating embers */}
      <circle cx={vw/2 - 5} cy={vh/2 - 45} r="1.5" fill="#fbbf24" opacity="0.7">
        <animate attributeName="cy" values={`${vh/2 - 45};${vh/2 - 60};${vh/2 - 45}`} dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx={vw/2 + 8} cy={vh/2 - 40} r="1" fill="#f59e0b" opacity="0.6">
        <animate attributeName="cy" values={`${vh/2 - 40};${vh/2 - 55};${vh/2 - 40}`} dur="2.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={vw/2 - 12} cy={vh/2 - 38} r="1" fill="#fbbf24" opacity="0.5">
        <animate attributeName="cy" values={`${vh/2 - 38};${vh/2 - 52};${vh/2 - 38}`} dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  )
}

function BeachTowel() {
  // Colorful striped beach towel sized to match the 3x3 nav grid (~130x150)
  const w = 150
  const h = 160
  const stripeH = 12
  const colors = ["#0d9488", "#1a1a1a", "#f87171", "#1a1a1a", "#0d9488", "#f87171", "#1a1a1a", "#0d9488", "#1a1a1a", "#f87171", "#0d9488", "#1a1a1a"]
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}
    >
      <defs>
        <clipPath id="towel-clip">
          <rect x="4" y="4" width={w - 8} height={h - 8} rx="5" />
        </clipPath>
      </defs>
      {/* Towel body */}
      <rect x="4" y="4" width={w - 8} height={h - 8} rx="5" fill="#0d9488" opacity="0.9" />
      {/* Stripes */}
      <g clipPath="url(#towel-clip)">
        {colors.map((c, i) => {
          const sy = 4 + i * stripeH
          return <rect key={i} x="4" y={sy} width={w - 8} height={stripeH} fill={c} opacity="0.9" />
        })}
      </g>
      {/* Fringe top */}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`ft-${i}`} x1={10 + i * 8.5} y1="4" x2={10 + i * 8.5 + (i % 2 ? 1 : -1)} y2="0" stroke="#0d9488" strokeWidth="1.2" opacity="0.5" />
      ))}
      {/* Fringe bottom */}
      {Array.from({ length: 16 }, (_, i) => (
        <line key={`fb-${i}`} x1={10 + i * 8.5} y1={h - 4} x2={10 + i * 8.5 + (i % 2 ? 1 : -1)} y2={h} stroke="#0d9488" strokeWidth="1.2" opacity="0.5" />
      ))}
    </svg>
  )
}

export function NavigationHub({
  currentScene,
  onNavigate,
  onActivateGame,
  disabled,
}: NavigationHubProps) {
  const [centerHovered, setCenterHovered] = useState(false)
  const labels = getDirectionLabels(currentScene)
  const isBeach = currentScene === "beach"
  const isSnow = currentScene === "snow"
  const isHeaven = currentScene === "heaven"
  const isFrost = FROST_SCENES.includes(currentScene)

  return (
    <div
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 sm:bottom-10 transition-all duration-1000"
      style={isFrost ? {
        backdropFilter: "blur(0px) saturate(9)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.06)",
        borderRadius: "20px",
        padding: "8px",
      } : undefined}
    >
      {/* Scene-specific nav backdrops */}
      {isBeach && <BeachTowel />}
      {isSnow && <CampfireRing />}
      {isHeaven && <HeavenCloud />}

      {/* 3x3 grid: arrows in cross pattern, game button in center */}
      <div
        className="relative z-10 grid place-items-center"
        style={{
          gridTemplateColumns: "40px 40px 40px",
          gridTemplateRows: "40px 40px 40px",
          gap: "2px",
        }}
      >
        {/* Row 1: _ N _ */}
        <div />
        <ArrowButton direction="north" label={labels.north} disabled={disabled} onNavigate={onNavigate} scene={currentScene} />
        <div />

        {/* Row 2: W [game] E */}
        <ArrowButton direction="west" label={labels.west} disabled={disabled} onNavigate={onNavigate} scene={currentScene} />

        <button
          onClick={onActivateGame}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          className="flex cursor-pointer items-center justify-center border-none bg-transparent"
          aria-label="Play a game"
        >
          <div
            className="h-3 w-3 rounded-full transition-all duration-500"
            style={{
              backgroundColor: centerHovered
                ? isBeach ? "rgba(255, 255, 255, 0.95)" : isSnow ? "rgba(255,190,50,0.95)" : isHeaven ? "rgba(184,134,11,0.95)" : "rgba(212, 160, 48, 0.9)"
                : isBeach ? "rgba(255, 255, 255, 0.5)" : isSnow ? "rgba(255,190,50,0.5)" : isHeaven ? "rgba(184,134,11,0.5)" : "rgba(212, 160, 48, 0.4)",
              boxShadow: centerHovered
                ? isBeach ? "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3)" : isSnow ? "0 0 20px rgba(255,160,30,0.7), 0 0 40px rgba(255,120,0,0.3)" : isHeaven ? "0 0 20px rgba(184,134,11,0.6), 0 0 40px rgba(184,134,11,0.3)" : "0 0 20px rgba(212, 160, 48, 0.6), 0 0 40px rgba(212, 160, 48, 0.3)"
                : isBeach ? "0 0 10px rgba(255,255,255,0.3)" : isSnow ? "0 0 10px rgba(255,160,30,0.3)" : isHeaven ? "0 0 10px rgba(184,134,11,0.2)" : "0 0 10px rgba(212, 160, 48, 0.2)",
              transform: centerHovered ? "scale(1.5)" : "scale(1)",
            }}
          />
        </button>

        <ArrowButton direction="east" label={labels.east} disabled={disabled} onNavigate={onNavigate} scene={currentScene} />

        {/* Row 3: _ S _ */}
        <div />
        <ArrowButton direction="south" label={labels.south} disabled={disabled} onNavigate={onNavigate} scene={currentScene} />
        <div />
      </div>

      {/* "curious?" label below grid */}
      <span
        className="mt-1 block text-center text-xs transition-opacity duration-500"
        style={{
          color: "rgba(212, 160, 48, 0.6)",
          opacity: centerHovered ? 1 : 0,
        }}
      >
        curious?
      </span>
    </div>
  )
}
