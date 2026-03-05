import { memo, useRef, useEffect, useState, useCallback } from "react"

interface CloudData {
  x: number
  y: number
  width: number
  speed: number
  opacity: number
  puffs: { dx: number; dy: number; rx: number; ry: number }[]
}

function randomPuffs(): CloudData["puffs"] {
  const count = 3 + Math.floor(Math.random() * 2) // 3-4 puffs
  return Array.from({ length: count }, (_, i) => ({
    dx: (i - (count - 1) / 2) * (0.25 + Math.random() * 0.1),
    dy: (Math.random() - 0.5) * 0.2,
    rx: 0.3 + Math.random() * 0.2,
    ry: 0.25 + Math.random() * 0.15,
  }))
}

function randomCloud(forceX?: number): CloudData {
  const width = 80 + Math.random() * 120 // 80-200px
  return {
    x: forceX ?? Math.random() * 120 - 10,
    y: 5 + Math.random() * 20, // roughly 5-25vh — maps to sky area
    width,
    speed: 0.5 + Math.random() * 1.5, // 0.5-2 vw per second
    opacity: 0.3 + Math.random() * 0.2, // 0.3-0.5
    puffs: randomPuffs(),
  }
}

function createInitialClouds(): CloudData[] {
  return Array.from({ length: 6 }, () => randomCloud())
}

export const TropicalClouds = memo(function TropicalClouds() {
  const [clouds, setClouds] = useState<CloudData[]>(createInitialClouds)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
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

  const animate = useCallback((time: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = time
    }
    const delta = (time - lastTimeRef.current) / 1000 // seconds
    lastTimeRef.current = time

    if (reducedMotionRef.current) {
      rafRef.current = requestAnimationFrame(animate)
      return
    }

    setClouds((prev) =>
      prev.map((cloud) => {
        let nextX = cloud.x + cloud.speed * delta

        if (nextX > 110) {
          return randomCloud(-15 - Math.random() * 10)
        }

        return { ...cloud, x: nextX }
      })
    )

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${cloud.x}vw`,
            top: `${cloud.y}vh`,
            width: `${cloud.width}px`,
            height: `${cloud.width * 0.5}px`,
            filter: "blur(2px)",
            willChange: "transform",
          }}
        >
          {cloud.puffs.map((puff, j) => (
            <div
              key={j}
              style={{
                position: "absolute",
                left: `${50 + puff.dx * 100}%`,
                top: `${50 + puff.dy * 100}%`,
                width: `${puff.rx * 200}%`,
                height: `${puff.ry * 200}%`,
                transform: "translate(-50%, -50%)",
                borderRadius: "50%",
                background: `rgba(255, 255, 255, ${cloud.opacity})`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
})
