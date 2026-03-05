import { useState, useEffect, useRef, useCallback } from "react"

export function DivineVignette() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(0)
  const radiusRef = useRef(420)

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
      c.x += (t.x - c.x) * 0.1
      c.y += (t.y - c.y) * 0.1

      // Smooth divine pulse — no random flicker, gentle sine wave
      radiusRef.current = 420 + Math.sin(Date.now() * 0.004) * 20

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

  const radius = radiusRef.current || 420

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(
          circle ${radius}px at ${mouse.x}px ${mouse.y}px,
          transparent 0%,
          transparent 35%,
          rgba(59, 130, 246, 0.02) 55%,
          rgba(30, 64, 175, 0.08) 75%,
          rgba(30, 58, 138, 0.18) 90%,
          rgba(23, 37, 84, 0.25) 100%
        )`,
        pointerEvents: "none",
        transition: "background 0.05s linear",
      }}
    />
  )
}
