import { useState, useCallback } from "react"

interface GameProps {
  onClose: () => void
}

export function Game({ onClose }: GameProps) {
  const [score, setScore] = useState(0)
  const [highScore] = useState(() => {
    return parseInt(localStorage.getItem("seanippolito_highScore") || "0", 10)
  })

  const handleClick = useCallback(() => {
    setScore((prev) => {
      const newScore = prev + 1
      const stored = parseInt(
        localStorage.getItem("seanippolito_highScore") || "0",
        10
      )
      if (newScore > stored) {
        localStorage.setItem("seanippolito_highScore", String(newScore))
      }
      return newScore
    })
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="text-center">
        <p className="mb-2 text-sm text-white/50">
          placeholder — real game coming soon
        </p>
        <p className="text-glow mb-4 text-3xl font-bold text-white">{score}</p>
        <button
          onClick={handleClick}
          className="mb-6 h-24 w-24 rounded-full border-2 border-amber-300/40 text-amber-300 transition-all hover:scale-110 hover:border-amber-300 hover:shadow-[0_0_30px_rgba(212,160,48,0.3)]"
        >
          tap
        </button>
        <p className="mb-4 text-xs text-white/40">
          high score: {Math.max(score, highScore)}
        </p>
        <button
          onClick={onClose}
          className="text-sm text-white/50 transition-colors hover:text-white"
        >
          back to site
        </button>
      </div>
    </div>
  )
}
