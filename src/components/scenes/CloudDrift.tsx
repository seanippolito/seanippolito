import { memo, useRef, useEffect, useState, useCallback } from "react"

interface CloudPuff {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  wobblePhase: number
  wobbleSpeed: number
}

function randomCloud(forceX?: number): CloudPuff {
  return {
    x: forceX ?? Math.random() * 130 - 20,
    y: 15 + Math.random() * 50,
    size: 150 + Math.random() * 250,
    opacity: 0.12 + Math.random() * 0.23,
    speed: 0.008 + Math.random() * 0.017,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.005 + Math.random() * 0.01,
  }
}

function createInitialClouds(): CloudPuff[] {
  return Array.from({ length: 10 }, () => randomCloud())
}

export const CloudDrift = memo(function CloudDrift() {
  const [clouds, setClouds] = useState<CloudPuff[]>(createInitialClouds)
  const rafRef = useRef<number>(0)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mql.matches

    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    mql.addEventListener("change", handler)
    return () => mql.removeEventListener("change", handler)
  }, [])

  const animate = useCallback(() => {
    if (reducedMotionRef.current) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    setClouds((prev) =>
      prev.map((cloud) => {
        let nextX = cloud.x + cloud.speed
        const nextWobblePhase = cloud.wobblePhase + cloud.wobbleSpeed

        if (nextX > 110) {
          return randomCloud(-20)
        }

        return {
          ...cloud,
          x: nextX,
          y: cloud.y + Math.sin(nextWobblePhase) * 0.02,
          wobblePhase: nextWobblePhase,
        }
      })
    )

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${cloud.x}vw`,
            top: `${cloud.y}vh`,
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.55}px`,
            borderRadius: "50%",
            background: `rgba(255, 255, 255, ${cloud.opacity})`,
            filter: `blur(${cloud.size > 250 ? 12 : 8}px)`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  )
})
