import { useRef, useEffect, useState } from "react"

/**
 * Shared wind-intensity cycle for the snow scene.
 *
 * Returns a value 0 → 1 that smoothly oscillates:
 *   - Calm (0–0.2) for ~12s
 *   - Building to peak (1.0) over ~6s
 *   - Peak gust holds ~4s
 *   - Subsiding back to calm over ~6s
 *
 * All components importing this hook stay in sync because the
 * cycle is driven by wall-clock time (performance.now).
 */
export function useWindCycle() {
  const [intensity, setIntensity] = useState(0)
  const rafRef = useRef(0)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const CYCLE_DURATION = 28 // seconds for full calm→gust→calm

    const animate = () => {
      const t = (performance.now() / 1000) % CYCLE_DURATION
      const phase = t / CYCLE_DURATION

      let value: number
      if (phase < 0.43) {
        // Calm phase (0–12s): gentle baseline with slight variation
        value = 0.08 + 0.12 * Math.sin(phase * Math.PI * 2 * 3)
      } else if (phase < 0.64) {
        // Building (12–18s): ramp up
        const ramp = (phase - 0.43) / 0.21
        value = 0.2 + 0.8 * ramp * ramp
      } else if (phase < 0.78) {
        // Peak gust (18–22s): high with turbulence
        value = 0.85 + 0.15 * Math.sin(phase * Math.PI * 12)
      } else {
        // Subsiding (22–28s): ease back down
        const decay = (phase - 0.78) / 0.22
        value = 1.0 - decay * decay * 0.8
      }

      setIntensity(Math.max(0, Math.min(1, value)))
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return intensity
}
