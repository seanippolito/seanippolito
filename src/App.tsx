import { useState, useEffect, useCallback, useRef, lazy, Suspense } from "react"
import { CenterContent } from "./components/CenterContent"
import { NavigationHub } from "./components/NavigationHub"
import { SceneTransition } from "./components/SceneTransition"

const Game = lazy(() => import("./components/Game").then(m => ({ default: m.Game })))
import { useAmbientAudio } from "./hooks/useAmbientAudio"
import { useVolcanoAudio } from "./hooks/useVolcanoAudio"
import { useHeavenAudio } from "./hooks/useHeavenAudio"
import { useBeachAudio } from "./hooks/useBeachAudio"
import { useSnowAudio } from "./hooks/useSnowAudio"
import { useIsMobile } from "./hooks/useIsMobile"
import { SCENES, getTarget } from "./data/scenes"
import type { SceneName, Direction } from "./data/scenes"

function App() {
  const [gameActive, setGameActive] = useState(false)
  const [currentScene, setCurrentScene] = useState<SceneName>("jungle")
  const [targetScene, setTargetScene] = useState<SceneName | null>(null)
  const [transitionDirection, setTransitionDirection] = useState<Direction | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const isMobile = useIsMobile()

  const audio = useAmbientAudio()
  const volcanoAudio = useVolcanoAudio()
  const heavenAudio = useHeavenAudio()
  const beachAudio = useBeachAudio()
  const snowAudio = useSnowAudio()

  const audioMap: Record<SceneName, { started: boolean; start: () => void }> = {
    jungle: audio,
    volcano: volcanoAudio,
    heaven: heavenAudio,
    beach: beachAudio,
    snow: snowAudio,
  }

  // Desktop: Create all AudioContexts on first interaction (any gesture)
  const audioInitRef = useRef(false)
  useEffect(() => {
    if (isMobile) return // Mobile inits audio lazily on unmute
    if (audioInitRef.current) return
    const handler = () => {
      if (audioInitRef.current) return
      audioInitRef.current = true
      audio.start()
      volcanoAudio.start()
      heavenAudio.start()
      beachAudio.start()
      snowAudio.start()
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
  }, [isMobile, audio.start, volcanoAudio.start, heavenAudio.start, beachAudio.start, snowAudio.start])

  // Mobile: start new scene's audio on scene change (if unmuted)
  const prevSceneRef = useRef(currentScene)
  useEffect(() => {
    if (!isMobile) return
    if (currentScene === prevSceneRef.current) return
    prevSceneRef.current = currentScene

    if (!audio.muted) {
      const sceneAudio = audioMap[currentScene]
      if (!sceneAudio.started) sceneAudio.start()
    }
  }, [currentScene, isMobile, audio.muted]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cross-fade audio based on active scene and mute state
  useEffect(() => {
    const vol = audio.muted ? 0 : 0.15
    audio.setMasterVolume(currentScene === "jungle" ? vol : 0)
    volcanoAudio.setMasterVolume(currentScene === "volcano" ? vol : 0)
    heavenAudio.setMasterVolume(currentScene === "heaven" ? vol : 0)
    beachAudio.setMasterVolume(currentScene === "beach" ? vol : 0)
    snowAudio.setMasterVolume(currentScene === "snow" ? vol : 0)
  }, [currentScene, audio.muted]) // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile-aware mute toggle: starts current scene's audio on first unmute (user gesture)
  const handleToggleMute = useCallback(() => {
    if (isMobile && audio.muted) {
      // About to unmute — start current scene's audio if not started (tap IS the gesture)
      const sceneAudio = audioMap[currentScene]
      if (!sceneAudio.started) sceneAudio.start()
    }
    audio.toggleMute()
  }, [isMobile, audio.muted, audio.toggleMute, currentScene]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleRainChange = useCallback(
    (intensity: number) => {
      audio.setRainIntensity(intensity)
    },
    [audio.setRainIntensity]
  )

  const handleMouseXChange = useCallback(
    (x: number) => {
      audio.setPan(x * 0.5)
      volcanoAudio.setPan(x * 0.5)
      heavenAudio.setPan(x * 0.5)
      beachAudio.setPan(x * 0.5)
      snowAudio.setPan(x * 0.5)
    },
    [audio.setPan, volcanoAudio.setPan, heavenAudio.setPan, beachAudio.setPan, snowAudio.setPan]
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

  // Touch swipe navigation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  useEffect(() => {
    if (gameActive) return

    const SWIPE_THRESHOLD = 50

    const handleTouchStart = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) touchStartRef.current = { x: t.clientX, y: t.clientY }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return
      const t = e.changedTouches[0]
      if (!t) return

      const dx = t.clientX - touchStartRef.current.x
      const dy = t.clientY - touchStartRef.current.y
      touchStartRef.current = null

      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)

      if (absDx < SWIPE_THRESHOLD && absDy < SWIPE_THRESHOLD) return

      if (absDx > absDy) {
        handleNavigate(dx > 0 ? "west" : "east")
      } else {
        handleNavigate(dy > 0 ? "south" : "north")
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [gameActive, handleNavigate])

  // Only forward rain callback when jungle is active; mouse panning works for all scenes with audio
  const rainChange = currentScene === "jungle" ? handleRainChange : undefined
  const mouseXChange = (currentScene === "jungle" || currentScene === "volcano" || currentScene === "heaven" || currentScene === "beach" || currentScene === "snow") ? handleMouseXChange : undefined

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
        onToggleAudio={handleToggleMute}
        currentScene={currentScene}
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
        <Suspense fallback={<div />}>
          <Game
            onClose={() => setGameActive(false)}
            currentScene={currentScene}
          />
        </Suspense>
      )}
    </div>
  )
}

export default App
