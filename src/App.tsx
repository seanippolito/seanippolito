import { useState, useEffect, useCallback, useRef } from "react"
import { JungleScene } from "./components/JungleScene"
import { CenterContent } from "./components/CenterContent"
import { GameTeaser } from "./components/GameTeaser"
import { Game } from "./components/Game"
import { useAmbientAudio } from "./hooks/useAmbientAudio"

function App() {
  const [gameActive, setGameActive] = useState(false)
  const audio = useAmbientAudio()

  // Create AudioContext on first interaction (any gesture)
  const audioInitRef = useRef(false)
  useEffect(() => {
    if (audioInitRef.current) return
    const handler = () => {
      if (audioInitRef.current) return
      audioInitRef.current = true
      audio.start()
      window.removeEventListener("click", handler)
      window.removeEventListener("mousemove", handler)
      window.removeEventListener("keydown", handler)
      window.removeEventListener("touchstart", handler)
    }
    window.addEventListener("click", handler)
    window.addEventListener("mousemove", handler)
    window.addEventListener("keydown", handler)
    window.addEventListener("touchstart", handler)
    return () => {
      window.removeEventListener("click", handler)
      window.removeEventListener("mousemove", handler)
      window.removeEventListener("keydown", handler)
      window.removeEventListener("touchstart", handler)
    }
  }, [audio.start])

  const handleRainChange = useCallback(
    (intensity: number) => {
      audio.setRainIntensity(intensity)
    },
    [audio.setRainIntensity]
  )

  const handleMouseXChange = useCallback(
    (x: number) => {
      audio.setPan(x * 0.5)
    },
    [audio.setPan]
  )

  return (
    <div className="relative min-h-screen bg-[#0a1f0a]">
      <JungleScene onRainChange={handleRainChange} onMouseXChange={handleMouseXChange} />
      <CenterContent
        audioMuted={audio.muted}
        onToggleAudio={audio.toggleMute}
      />
      {!gameActive && (
        <GameTeaser onActivate={() => setGameActive(true)} />
      )}
      {gameActive && <Game onClose={() => setGameActive(false)} />}
    </div>
  )
}

export default App
