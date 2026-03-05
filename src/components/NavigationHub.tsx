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
}: {
  direction: Direction
  label: string
  disabled: boolean
  onNavigate: (dir: Direction) => void
}) {
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
          <path
            d="M9 5l7 7-7 7"
            stroke="rgba(212, 160, 48, 0.9)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: hovered ? "drop-shadow(0 0 6px rgba(212, 160, 48, 0.6))" : "none",
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

export function NavigationHub({
  currentScene,
  onNavigate,
  onActivateGame,
  disabled,
}: NavigationHubProps) {
  const [centerHovered, setCenterHovered] = useState(false)
  const labels = getDirectionLabels(currentScene)

  return (
    <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 sm:bottom-10">
      {/* 3x3 grid: arrows in cross pattern, game button in center */}
      <div
        className="grid place-items-center"
        style={{
          gridTemplateColumns: "40px 40px 40px",
          gridTemplateRows: "40px 40px 40px",
          gap: "2px",
        }}
      >
        {/* Row 1: _ N _ */}
        <div />
        <ArrowButton direction="north" label={labels.north} disabled={disabled} onNavigate={onNavigate} />
        <div />

        {/* Row 2: W [game] E */}
        <ArrowButton direction="west" label={labels.west} disabled={disabled} onNavigate={onNavigate} />

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
                ? "rgba(212, 160, 48, 0.9)"
                : "rgba(212, 160, 48, 0.4)",
              boxShadow: centerHovered
                ? "0 0 20px rgba(212, 160, 48, 0.6), 0 0 40px rgba(212, 160, 48, 0.3)"
                : "0 0 10px rgba(212, 160, 48, 0.2)",
              transform: centerHovered ? "scale(1.5)" : "scale(1)",
            }}
          />
        </button>

        <ArrowButton direction="east" label={labels.east} disabled={disabled} onNavigate={onNavigate} />

        {/* Row 3: _ S _ */}
        <div />
        <ArrowButton direction="south" label={labels.south} disabled={disabled} onNavigate={onNavigate} />
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
