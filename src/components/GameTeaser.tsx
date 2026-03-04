import { useState } from "react"

interface GameTeaserProps {
  onActivate: () => void
}

export function GameTeaser({ onActivate }: GameTeaserProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onActivate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer border-none bg-transparent"
      aria-label="Play a game"
    >
      <div className="flex flex-col items-center gap-2">
        <div
          className="h-3 w-3 rounded-full transition-all duration-500"
          style={{
            backgroundColor: hovered
              ? "rgba(212, 160, 48, 0.9)"
              : "rgba(212, 160, 48, 0.4)",
            boxShadow: hovered
              ? "0 0 20px rgba(212, 160, 48, 0.6), 0 0 40px rgba(212, 160, 48, 0.3)"
              : "0 0 10px rgba(212, 160, 48, 0.2)",
            transform: hovered ? "scale(1.5)" : "scale(1)",
          }}
        />
        <span
          className="text-xs transition-opacity duration-500"
          style={{
            color: "rgba(212, 160, 48, 0.6)",
            opacity: hovered ? 1 : 0,
          }}
        >
          curious?
        </span>
      </div>
    </button>
  )
}
