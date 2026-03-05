import { useRef, useEffect, memo } from "react"

const SHAKE_DURATION = 500
const MAX_OFFSET_X = 3
const MAX_OFFSET_Y = 2

/** Listens for `volcano-tremor` events and shakes the document body. Renders nothing. */
export const ScreenTremor = memo(function ScreenTremor() {
  const rafRef = useRef(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches

    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
      if (e.matches) {
        cancelAnimationFrame(rafRef.current)
        document.body.style.transform = ""
      }
    }
    mq.addEventListener("change", onMotionChange)

    const shake = () => {
      if (reducedMotionRef.current) return

      const start = performance.now()
      cancelAnimationFrame(rafRef.current)

      const step = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / SHAKE_DURATION, 1)

        if (progress >= 1) {
          document.body.style.transform = ""
          return
        }

        const decay = 1 - progress
        const x = (Math.random() * 2 - 1) * MAX_OFFSET_X * decay
        const y = (Math.random() * 2 - 1) * MAX_OFFSET_Y * decay
        document.body.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`

        rafRef.current = requestAnimationFrame(step)
      }

      rafRef.current = requestAnimationFrame(step)
    }

    window.addEventListener("volcano-tremor", shake)

    return () => {
      mq.removeEventListener("change", onMotionChange)
      window.removeEventListener("volcano-tremor", shake)
      cancelAnimationFrame(rafRef.current)
      document.body.style.transform = ""
    }
  }, [])

  return null
})
