import { useState, useEffect, useRef, useCallback } from "react"

interface CloudProps {
  y: string       // CSS top position
  w: string       // width
  h: string       // height
  opacity: number
  blur: number
  duration: string
  delay: string
  color?: string
}

function Cloud({ y, w, h, opacity, blur, duration, delay, color = "rgba(220,218,210,0.6)" }: CloudProps) {
  return (
    <div
      className="animate-cloud-drift"
      style={{
        position: "absolute",
        left: 0,
        top: y,
        width: w,
        height: h,
        borderRadius: "50%",
        background: `radial-gradient(ellipse at center, ${color} 0%, transparent 70%)`,
        opacity,
        filter: `blur(${blur}px)`,
        animationDuration: duration,
        animationDelay: delay,
        willChange: "transform",
      } as React.CSSProperties}
    />
  )
}

export function Smoke() {
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
      c.x += (t.x - c.x) * 0.07
      c.y += (t.y - c.y) * 0.07
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
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage: `radial-gradient(circle 180px at ${mouse.x}px ${mouse.y}px, transparent 40%, black 100%)`,
        WebkitMaskImage: `radial-gradient(circle 180px at ${mouse.x}px ${mouse.y}px, transparent 40%, black 100%)`,
      }}
    >
      {/* All clouds enter from the left and exit off the right */}

      <Cloud y="22%" w="350px" h="140px" opacity={0.35} blur={30}
        duration="55s" delay="0s" />

      <Cloud y="10%" w="250px" h="100px" opacity={0.28} blur={25}
        duration="45s" delay="-8s" />

      <Cloud y="40%" w="400px" h="160px" opacity={0.38} blur={40}
        duration="70s" delay="-20s" />

      <Cloud y="58%" w="300px" h="120px" opacity={0.3} blur={30}
        duration="60s" delay="-35s" />

      <Cloud y="68%" w="280px" h="110px" opacity={0.28} blur={35}
        duration="65s" delay="-48s" />

      <Cloud y="15%" w="220px" h="90px" opacity={0.25} blur={25}
        duration="50s" delay="-12s" />

      <Cloud y="48%" w="360px" h="140px" opacity={0.32} blur={35}
        duration="75s" delay="-42s" />

      <Cloud y="32%" w="200px" h="80px" opacity={0.22} blur={20}
        duration="42s" delay="-28s" />

      <Cloud y="5%" w="280px" h="110px" opacity={0.26} blur={28}
        duration="52s" delay="-16s"
        color="rgba(225,220,210,0.55)" />

      <Cloud y="75%" w="320px" h="130px" opacity={0.24} blur={32}
        duration="68s" delay="-55s"
        color="rgba(215,212,200,0.5)" />
    </div>
  )
}
