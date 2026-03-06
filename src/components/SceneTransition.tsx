import { useRef, useEffect, useCallback, memo, lazy, Suspense } from "react"
import type { SceneName, Direction } from "../data/scenes"

// Eagerly start loading the default scene so it doesn't wait for React to render
const jungleImport = import("./JungleScene")
const JungleScene = lazy(() => jungleImport.then(m => ({ default: m.JungleScene })))
const HeavenScene = lazy(() => import("./scenes/HeavenScene").then(m => ({ default: m.HeavenScene })))
const BeachScene = lazy(() => import("./scenes/BeachScene").then(m => ({ default: m.BeachScene })))
const VolcanoScene = lazy(() => import("./scenes/VolcanoScene").then(m => ({ default: m.VolcanoScene })))
const SnowScene = lazy(() => import("./scenes/SnowScene").then(m => ({ default: m.SnowScene })))

interface SceneTransitionProps {
  currentScene: SceneName
  targetScene: SceneName | null
  direction: Direction | null
  onComplete: (scene: SceneName) => void
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

interface SceneComponentProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

function renderScene(name: SceneName, props: SceneComponentProps) {
  switch (name) {
    case "jungle":
      return <JungleScene {...props} />
    case "heaven":
      return <HeavenScene {...props} />
    case "beach":
      return <BeachScene {...props} />
    case "volcano":
      return <VolcanoScene {...props} />
    case "snow":
      return <SnowScene {...props} />
  }
}

// Use consistent transform function lists per direction axis so CSS can interpolate.
// North/South: translate3d only. East/West: rotateY only.
function getTransforms(dir: Direction) {
  switch (dir) {
    case "north":
      return {
        outStart: "translate3d(0, 0, 0)",
        outEnd: "translate3d(0, 100vh, 0)",
        inStart: "translate3d(0, -100vh, 0)",
        inEnd: "translate3d(0, 0, 0)",
        outOrigin: "center center",
        inOrigin: "center center",
      }
    case "south":
      return {
        outStart: "translate3d(0, 0, 0)",
        outEnd: "translate3d(0, -100vh, 0)",
        inStart: "translate3d(0, 100vh, 0)",
        inEnd: "translate3d(0, 0, 0)",
        outOrigin: "center center",
        inOrigin: "center center",
      }
    case "east":
      return {
        outStart: "rotateY(0deg)",
        outEnd: "rotateY(-90deg)",
        inStart: "rotateY(90deg)",
        inEnd: "rotateY(0deg)",
        outOrigin: "right center",
        inOrigin: "left center",
      }
    case "west":
      return {
        outStart: "rotateY(0deg)",
        outEnd: "rotateY(90deg)",
        inStart: "rotateY(-90deg)",
        inEnd: "rotateY(0deg)",
        outOrigin: "left center",
        inOrigin: "right center",
      }
  }
}

const DURATION = "1000ms"
const EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)"

export const SceneTransition = memo(function SceneTransition({
  currentScene,
  targetScene,
  direction,
  onComplete,
  onRainChange,
  onMouseXChange,
}: SceneTransitionProps) {
  const outgoingRef = useRef<HTMLDivElement>(null)
  const incomingRef = useRef<HTMLDivElement>(null)
  const animatingRef = useRef(false)

  const sceneProps = useCallback(
    (scene: SceneName): SceneComponentProps => {
      if (scene === "jungle") {
        return { onRainChange, onMouseXChange }
      }
      if (scene === "volcano" || scene === "heaven" || scene === "beach" || scene === "snow") {
        return { onMouseXChange }
      }
      return {}
    },
    [onRainChange, onMouseXChange]
  )

  // Reset outgoing div to identity when not transitioning.
  // This is critical: after a transition, the outgoing div retains its
  // end-of-animation transform which pushes the new scene off-screen.
  useEffect(() => {
    if (!targetScene && outgoingRef.current) {
      outgoingRef.current.style.transition = "none"
      outgoingRef.current.style.transform = "translate3d(0, 0, 0)"
      outgoingRef.current.style.transformOrigin = "center center"
      animatingRef.current = false
    }
  }, [targetScene])

  // Kick off animation once both refs exist
  useEffect(() => {
    if (!targetScene || !direction) return
    if (animatingRef.current) return

    const outgoing = outgoingRef.current
    const incoming = incomingRef.current
    if (!outgoing || !incoming) return

    animatingRef.current = true
    const t = getTransforms(direction)

    // Set start positions (no transition)
    outgoing.style.transition = "none"
    incoming.style.transition = "none"
    outgoing.style.transform = t.outStart
    outgoing.style.transformOrigin = t.outOrigin
    incoming.style.transform = t.inStart
    incoming.style.transformOrigin = t.inOrigin

    // Double-rAF to ensure start positions are painted before applying end
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!outgoing || !incoming) return

        const transitionValue = `transform ${DURATION} ${EASING}`
        outgoing.style.transition = transitionValue
        incoming.style.transition = transitionValue
        outgoing.style.transform = t.outEnd
        incoming.style.transform = t.inEnd
      })
    })

    const handleEnd = (e: TransitionEvent) => {
      if (e.target !== e.currentTarget || e.propertyName !== "transform") return
      onComplete(targetScene)
    }

    incoming.addEventListener("transitionend", handleEnd)
    return () => {
      incoming.removeEventListener("transitionend", handleEnd)
    }
  }, [targetScene, direction, onComplete])

  const layerStyle = {
    willChange: "transform" as const,
    backfaceVisibility: "hidden" as const,
  }

  return (
    <div
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
        position: "fixed",
        inset: 0,
        overflow: "hidden",
      }}
    >
      {/* Current scene */}
      <div
        ref={outgoingRef}
        style={{
          ...layerStyle,
          position: "absolute",
          inset: 0,
        }}
      >
        <Suspense fallback={<div />}>
          {renderScene(currentScene, sceneProps(currentScene))}
        </Suspense>
      </div>

      {/* Incoming scene — mounted when targetScene is set */}
      {targetScene && (
        <div
          ref={incomingRef}
          style={{
            ...layerStyle,
            position: "absolute",
            inset: 0,
          }}
        >
          <Suspense fallback={<div />}>
            {renderScene(targetScene, sceneProps(targetScene))}
          </Suspense>
        </div>
      )}
    </div>
  )
})
