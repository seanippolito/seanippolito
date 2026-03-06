import { useState, useEffect, useRef } from "react"

/**
 * Tracks whether the user is actively touching the screen.
 * - `active`: true while touching or scattering
 * - `scattering`: true for ~600ms after touchend, giving components
 *   time to animate a scatter-and-vanish effect
 */
export function useTouchActive() {
  const [active, setActive] = useState(false)
  const [scattering, setScattering] = useState(false)
  const timerRef = useRef(0)

  useEffect(() => {
    const onTouchStart = () => {
      clearTimeout(timerRef.current)
      setActive(true)
      setScattering(false)
    }

    const onTouchEnd = () => {
      setScattering(true)
      timerRef.current = window.setTimeout(() => {
        setActive(false)
        setScattering(false)
      }, 600)
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd)
    window.addEventListener("touchcancel", onTouchEnd)

    return () => {
      clearTimeout(timerRef.current)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
      window.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [])

  return { active, scattering }
}
