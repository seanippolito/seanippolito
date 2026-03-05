import { useState, useEffect, useCallback, useRef } from "react"
import { CenterContent } from "./components/CenterContent"
import { NavigationHub } from "./components/NavigationHub"
import { SceneTransition } from "./components/SceneTransition"
import { Game } from "./components/Game"
import { useAmbientAudio } from "./hooks/useAmbientAudio"
import { SCENES, getTarget } from "./data/scenes"
import type { SceneName, Direction } from "./data/scenes"

function App() {
  const [gameActive, setGameActive] = useState(false)
  const [currentScene, setCurrentScene] = useState<SceneName>("jungle")
  const [targetScene, setTargetScene] = useState<SceneName | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<Direction | null>(null)
  const [transitioning, setTransitioning] = useState(false)

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

  const handleNavigate = useCallback(
    (direction: Direction) => {
      if (transitioning) return

      const target = getTarget(currentScene, direction)
      setTargetScene(target)
      setTransitionDirection(direction)
      setTransitioning(true)
    },
    [currentScene, transitioning]
  )

  const handleTransitionComplete = useCallback((scene: SceneName) => {
    setCurrentScene(scene)
    setTargetScene(null)
    setTransitionDirection(null)
    setTransitioning(false)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameActive) return

      const keyMap: Record<string, Direction> = {
        ArrowUp: "north",
        ArrowDown: "south",
        ArrowLeft: "west",
        ArrowRight: "east",
      }

      const direction = keyMap[e.key]
      if (direction) {
        e.preventDefault()
        handleNavigate(direction)
      } else if (e.key === " ") {
        e.preventDefault()
        setGameActive(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [gameActive, handleNavigate])

  // Only forward rain/audio callbacks when jungle is active
  const rainChange = currentScene === "jungle" ? handleRainChange : undefined
  const mouseXChange = currentScene === "jungle" ? handleMouseXChange : undefined

  return (
    <div
      className="relative min-h-screen transition-colors duration-1000"
      style={{ backgroundColor: SCENES[currentScene].bgColor }}
    >
      <SceneTransition
        currentScene={currentScene}
        targetScene={targetScene}
        direction={transitionDirection}
        onComplete={handleTransitionComplete}
        onRainChange={rainChange}
        onMouseXChange={mouseXChange}
      />
      <CenterContent
        audioMuted={audio.muted}
        onToggleAudio={audio.toggleMute}
      />
      {!gameActive && (
        <NavigationHub
          currentScene={currentScene}
          onNavigate={handleNavigate}
          onActivateGame={() => setGameActive(true)}
          disabled={transitioning}
        />
      )}
      {gameActive && (
        <Game
          onClose={() => setGameActive(false)}
          currentScene={currentScene}
        />
      )}
    </div>
  )
}

export default App
