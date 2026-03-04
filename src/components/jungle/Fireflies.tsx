export function Fireflies() {
  const flies = [
    { x: 30, y: 40, delay: 0, duration: 4 },
    { x: 70, y: 60, delay: 1.5, duration: 5 },
    { x: 20, y: 70, delay: 3, duration: 4.5 },
    { x: 80, y: 30, delay: 0.5, duration: 5.5 },
    { x: 50, y: 80, delay: 2, duration: 4 },
    { x: 15, y: 50, delay: 4, duration: 5 },
    { x: 85, y: 45, delay: 1, duration: 4.5 },
    { x: 45, y: 25, delay: 3.5, duration: 5 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      {flies.map((fly, i) => (
        <div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-amber-300/60 animate-firefly"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
