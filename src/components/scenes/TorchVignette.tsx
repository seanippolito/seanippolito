import { useState, useEffect, useRef, useCallback } from "react"

export function TorchVignette() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(0)
  const flickerRef = useRef(0)

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

      // Flickering torch effect — small random radius variation
      flickerRef.current = 380 + Math.sin(Date.now() * 0.008) * 20 + Math.random() * 12

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

  const radius = flickerRef.current || 380

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(
          circle ${radius}px at ${mouse.x}px ${mouse.y}px,
          transparent 0%,
          transparent 30%,
          rgba(20, 5, 0, 0.08) 50%,
          rgba(10, 3, 0, 0.2) 65%,
          rgba(5, 1, 0, 0.35) 80%,
          rgba(3, 1, 0, 0.5) 100%
        )`,
        pointerEvents: "none",
        transition: "background 0.05s linear",
      }}
    />
  )
}
