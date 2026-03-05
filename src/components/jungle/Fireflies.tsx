export function Fireflies() {
  // Fireflies — more of them, varied sizes and behaviors
  const fireflies = [
    { x: 25, y: 35, delay: 0, duration: 5, size: 2 },
    { x: 72, y: 55, delay: 1.2, duration: 6, size: 2.5 },
    { x: 18, y: 65, delay: 3, duration: 5.5, size: 1.5 },
    { x: 82, y: 28, delay: 0.5, duration: 7, size: 2 },
    { x: 45, y: 75, delay: 2, duration: 5, size: 3 },
    { x: 12, y: 48, delay: 4, duration: 6.5, size: 1.5 },
    { x: 88, y: 42, delay: 1, duration: 5.5, size: 2 },
    { x: 38, y: 22, delay: 3.5, duration: 6, size: 2.5 },
    { x: 55, y: 60, delay: 0.8, duration: 7, size: 2 },
    { x: 65, y: 38, delay: 2.5, duration: 5, size: 1.5 },
    { x: 30, y: 85, delay: 1.8, duration: 6, size: 2 },
    { x: 78, y: 70, delay: 4.5, duration: 5.5, size: 3 },
    { x: 48, y: 45, delay: 0.3, duration: 7.5, size: 2 },
    { x: 92, y: 58, delay: 3.2, duration: 6, size: 1.5 },
    { x: 8, y: 30, delay: 2.2, duration: 5.5, size: 2.5 },
    { x: 60, y: 82, delay: 1.5, duration: 6.5, size: 2 },
  ]

  // Floating pollen/spores — very subtle upward drift
  const spores = [
    { x: 35, y: 90, delay: 0, duration: 14, driftX: 20, driftX2: -15 },
    { x: 60, y: 85, delay: 3, duration: 16, driftX: -15, driftX2: 10 },
    { x: 20, y: 95, delay: 6, duration: 12, driftX: 25, driftX2: -20 },
    { x: 75, y: 88, delay: 1, duration: 15, driftX: -20, driftX2: 15 },
    { x: 45, y: 92, delay: 8, duration: 13, driftX: 10, driftX2: -25 },
    { x: 85, y: 87, delay: 4, duration: 14, driftX: -10, driftX2: 20 },
    { x: 50, y: 95, delay: 10, duration: 16, driftX: 15, driftX2: -10 },
    { x: 15, y: 90, delay: 5, duration: 12, driftX: 30, driftX2: -5 },
    { x: 70, y: 93, delay: 7, duration: 15, driftX: -25, driftX2: 12 },
    { x: 40, y: 88, delay: 2, duration: 13, driftX: 12, driftX2: -18 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Fireflies */}
      {fireflies.map((fly, i) => (
        <div
          key={`fly-${i}`}
          className="absolute rounded-full animate-firefly"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: `${fly.size}px`,
            height: `${fly.size}px`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
            background: `radial-gradient(circle, rgba(220, 200, 80, 0.9) 0%, rgba(180, 160, 40, 0.4) 50%, transparent 100%)`,
            boxShadow: `0 0 ${fly.size * 3}px ${fly.size}px rgba(200, 180, 60, 0.3)`,
          }}
        />
      ))}

      {/* Floating spores/pollen */}
      {spores.map((spore, i) => (
        <div
          key={`spore-${i}`}
          className="absolute h-1 w-1 rounded-full animate-float"
          style={{
            left: `${spore.x}%`,
            top: `${spore.y}%`,
            background: "rgba(200, 220, 180, 0.4)",
            animationDelay: `${spore.delay}s`,
            "--duration": `${spore.duration}s`,
            "--drift-x": `${spore.driftX}px`,
            "--drift-x2": `${spore.driftX2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
