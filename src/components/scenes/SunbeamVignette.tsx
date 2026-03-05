import { useState, useEffect, useRef, useCallback } from "react"

export function SunbeamVignette() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    if (touch) {
      targetRef.current = { x: touch.clientX, y: touch.clientY }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    const animate = () => {
      const c = currentRef.current
      const t = targetRef.current
      c.x += (t.x - c.x) * 0.15
      c.y += (t.y - c.y) * 0.15

      setMouse({ x: c.x, y: c.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [handleMouseMove, handleTouchMove])

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle 420px at ${mouse.x}px ${mouse.y}px,
              rgba(251,191,36,0.08) 0%,
              rgba(245,158,11,0.04) 50%,
              transparent 100%
            ),
            radial-gradient(
              circle at 50% 50%,
              transparent 30%,
              rgba(0,80,100,0.15) 100%
            )
          `,
          transition: "background 0.05s linear",
        }}
      />
    </div>
  )
}
