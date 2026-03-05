import { useState, useEffect, useRef, useCallback } from "react"

export function Flashlight() {
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 })
  const targetRef = useRef({ x: -1000, y: -1000 })
  const currentRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef(0)

  // Lightning state — all refs to avoid re-renders
  const lightningRef = useRef({
    active: false,
    flashTimes: [] as number[],
    endTime: 0,
    nextStrikeTime: Date.now() + 20000 + Math.random() * 25000,
    whiteFlash: 0,
  })

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

      // Lightning logic
      const l = lightningRef.current
      const now = Date.now()

      if (!l.active && now >= l.nextStrikeTime) {
        l.active = true
        // 2-3 pulses with sustained hold
        const pulseCount = 2 + Math.floor(Math.random() * 2)
        l.flashTimes = []
        let t = now
        for (let i = 0; i < pulseCount; i++) {
          l.flashTimes.push(t)
          t += 80 + Math.random() * 150 // 80-230ms between pulses
        }
        l.endTime = t + 400 // sustained afterglow

        // Dispatch thunder event 0.5-2.5s after flash
        const thunderDelay = 500 + Math.random() * 2000
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("jungle-thunder"))
        }, thunderDelay)
      }

      if (l.active) {
        if (now >= l.endTime) {
          l.active = false
          l.whiteFlash = 0
          l.nextStrikeTime = now + 20000 + Math.random() * 25000 // 20-45s between strikes
        } else {
          // Determine flash intensity
          let intensity = 0
          for (const ft of l.flashTimes) {
            const elapsed = now - ft
            if (elapsed >= 0 && elapsed < 150) {
              // Sustained pulse: fast rise, holds, then falls
              const progress = elapsed / 150
              if (progress < 0.1) {
                intensity = Math.max(intensity, progress / 0.1) // fast rise
              } else if (progress < 0.5) {
                intensity = Math.max(intensity, 1.0) // hold at peak
              } else {
                intensity = Math.max(intensity, 1.0 - ((progress - 0.5) / 0.5)) // gradual fall
              }
            }
          }
          // Afterglow after last pulse
          const lastPulse = l.flashTimes[l.flashTimes.length - 1]
          if (now > lastPulse + 150) {
            const fadeProgress = (now - lastPulse - 150) / 400
            intensity = Math.max(intensity, 0.2 * (1 - fadeProgress))
          }
          l.whiteFlash = intensity
        }
      }

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

  const l = lightningRef.current
  const flashOpacity = l.whiteFlash

  return (
    <>
      {/* Flashlight vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle 280px at ${mouse.x}px ${mouse.y}px,
            transparent 0%,
            transparent 30%,
            rgba(2, 6, 2, 0.25) 60%,
            rgba(2, 6, 2, 0.55) 80%,
            rgba(2, 6, 2, 0.75) 100%
          )`,
          pointerEvents: "none",
          transition: "background 0.05s linear",
        }}
      />
      {/* Lightning flash overlay */}
      {flashOpacity > 0.01 && (
        <div
          className="absolute inset-0"
          style={{
            background: `rgba(200, 210, 255, ${flashOpacity * 0.7})`,
            pointerEvents: "none",
          }}
        />
      )}
    </>
  )
}
