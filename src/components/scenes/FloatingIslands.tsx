import { memo, useRef, useEffect, useState, useCallback } from "react"

type StructureType = "temple" | "tree" | "obelisk"

interface Island {
  x: number
  y: number
  baseY: number
  size: number
  speed: number
  bobPhase: number
  bobSpeed: number
  structureType: StructureType
}

const STRUCTURE_TYPES: StructureType[] = ["temple", "tree", "obelisk"]

function randomIsland(forceX?: number): Island {
  const baseY = 30 + Math.random() * 25
  return {
    x: forceX ?? Math.random() * 110 - 10,
    y: baseY,
    baseY,
    size: 80 + Math.random() * 60,
    speed: (0.003 + Math.random() * 0.005) * (Math.random() > 0.5 ? 1 : -1),
    bobPhase: Math.random() * Math.PI * 2,
    bobSpeed: (Math.PI * 2) / ((6 + Math.random() * 4) * 60),
    structureType:
      STRUCTURE_TYPES[Math.floor(Math.random() * STRUCTURE_TYPES.length)],
  }
}

function createInitialIslands(): Island[] {
  return Array.from({ length: 4 }, () => randomIsland())
}

function TinyTemple({ size }: { size: number }) {
  const scale = size / 120
  const w = 20 * scale
  const h = 16 * scale
  const colW = 3 * scale
  const colH = 10 * scale
  const triH = 6 * scale

  return (
    <div
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: `${w}px`,
        height: `${h}px`,
      }}
    >
      {/* Pediment triangle */}
      <div
        style={{
          position: "absolute",
          bottom: `${colH}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: 0,
          height: 0,
          borderLeft: `${w / 2}px solid transparent`,
          borderRight: `${w / 2}px solid transparent`,
          borderBottom: `${triH}px solid rgba(255, 255, 255, 0.3)`,
        }}
      />
      {/* Columns */}
      {[0.15, 0.5, 0.85].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: 0,
            left: `${pos * w - colW / 2}px`,
            width: `${colW}px`,
            height: `${colH}px`,
            background: "rgba(255, 255, 255, 0.3)",
            borderRadius: `${scale}px`,
          }}
        />
      ))}
    </div>
  )
}

function TinyTree({ size }: { size: number }) {
  const scale = size / 120
  const trunkW = 3 * scale
  const trunkH = 8 * scale
  const canopyR = 7 * scale

  return (
    <div
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: `${canopyR * 2}px`,
        height: `${trunkH + canopyR * 2}px`,
      }}
    >
      {/* Canopy */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${canopyR * 2}px`,
          height: `${canopyR * 2}px`,
          borderRadius: "50%",
          background: "rgba(100, 160, 80, 0.25)",
        }}
      />
      {/* Trunk */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${trunkW}px`,
          height: `${trunkH}px`,
          background: "rgba(120, 90, 60, 0.25)",
          borderRadius: `${scale * 0.5}px`,
        }}
      />
    </div>
  )
}

function TinyObelisk({ size }: { size: number }) {
  const scale = size / 120
  const w = 6 * scale
  const h = 16 * scale

  return (
    <div
      style={{
        position: "absolute",
        bottom: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: `${w / 2}px solid transparent`,
        borderRight: `${w / 2}px solid transparent`,
        borderBottom: `${h}px solid rgba(251, 191, 36, 0.25)`,
      }}
    />
  )
}

const structureMap: Record<
  StructureType,
  React.ComponentType<{ size: number }>
> = {
  temple: TinyTemple,
  tree: TinyTree,
  obelisk: TinyObelisk,
}

export const FloatingIslands = memo(function FloatingIslands() {
  const [islands, setIslands] = useState<Island[]>(createInitialIslands)
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

    setIslands((prev) =>
      prev.map((island) => {
        let nextX = island.x + island.speed
        const nextBobPhase = island.bobPhase + island.bobSpeed
        const bobAmplitude = 3 + (island.size - 80) / 60 * 2
        const nextY = island.baseY + Math.sin(nextBobPhase) * bobAmplitude

        if (nextX > 110 || nextX < -15) {
          const spawnX = island.speed > 0 ? -14 : 109
          return randomIsland(spawnX)
        }

        return {
          ...island,
          x: nextX,
          y: nextY,
          bobPhase: nextBobPhase,
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
      {islands.map((island, i) => {
        const cloudH = 30 + ((island.size - 80) / 60) * 20
        const Structure = structureMap[island.structureType]

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${island.x}vw`,
              top: `${island.y}vh`,
              willChange: "transform",
            }}
          >
            {/* Land mass */}
            <div
              style={{
                position: "absolute",
                bottom: `${cloudH * 0.5}px`,
                left: "50%",
                transform: "translateX(-50%)",
                width: `${island.size * 0.45}px`,
                height: `${cloudH * 0.4}px`,
                background: "rgba(140, 160, 120, 0.2)",
                borderRadius: `${island.size * 0.04}px ${island.size * 0.04}px 0 0`,
              }}
            >
              {/* Miniature structure sits on top of the land mass */}
              <Structure size={island.size} />
            </div>

            {/* Cloud base */}
            <div
              style={{
                width: `${island.size}px`,
                height: `${cloudH}px`,
                borderRadius: "50%",
                background: `rgba(255, 255, 255, ${0.25 + (i % 3) * 0.05})`,
                filter: "blur(4px)",
              }}
            />
          </div>
        )
      })}
    </div>
  )
})
