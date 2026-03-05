import { memo, useRef, useEffect, useState, useCallback } from "react"

interface FlashState {
  id: number
  x: number
  y: number
  phase: "bright" | "dim" | "gone"
}

/** Random value in [min, max] */
function rand(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export const LightningAmbient = memo(function LightningAmbient() {
  const [flash, setFlash] = useState<FlashState | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const idRef = useRef(0)
  const reducedMotionRef = useRef(false)

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const triggerFlash = useCallback(() => {
    if (reducedMotionRef.current) {
      // Skip animation, just schedule next
      timerRef.current = setTimeout(triggerFlash, rand(6000, 15000))
      return
    }

    const currentId = ++idRef.current

    // Random position: 20-80% x, 25-45% y (cloud level)
    const x = rand(20, 80)
    const y = rand(25, 45)

    // Phase 1: bright (100ms)
    setFlash({ id: currentId, x, y, phase: "bright" })

    // Dispatch heaven-thunder 300-800ms after flash
    const thunderDelay = rand(300, 800)
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("heaven-thunder"))
    }, thunderDelay)

    // Phase 2: dim (80ms after bright)
    setTimeout(() => {
      setFlash((prev) =>
        prev && prev.id === currentId
          ? { ...prev, phase: "dim" }
          : prev
      )
    }, 100)

    // Phase 3: gone (80ms after dim)
    setTimeout(() => {
      setFlash((prev) =>
        prev && prev.id === currentId ? null : prev
      )
    }, 180)

    // Schedule next flash in 6-15 seconds
    timerRef.current = setTimeout(triggerFlash, rand(6000, 15000))
  }, [])

  useEffect(() => {
    // Initial delay before first flash
    timerRef.current = setTimeout(triggerFlash, rand(3000, 8000))
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [triggerFlash])

  if (!flash) return null

  const opacity = flash.phase === "bright" ? 0.12 : flash.phase === "dim" ? 0.05 : 0

  return (
    <div
      className="pointer-events-none absolute inset-0 z-5"
      style={{
        background: `radial-gradient(ellipse 40% 30% at ${flash.x}% ${flash.y}%, rgba(255,251,230,${opacity}), transparent)`,
        transition: "opacity 80ms ease-out",
      }}
    />
  )
})
