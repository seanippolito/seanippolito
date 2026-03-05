export function GodRays() {
  const rays = [
    { x: 750, width: 80, height: 900, rotation: -8, opacity: 0.04, delay: 0, duration: 10 },
    { x: 950, width: 120, height: 1000, rotation: 2, opacity: 0.06, delay: 2, duration: 8 },
    { x: 1100, width: 60, height: 850, rotation: 6, opacity: 0.035, delay: 4, duration: 12 },
    { x: 850, width: 40, height: 750, rotation: -3, opacity: 0.03, delay: 1, duration: 9 },
    { x: 1020, width: 90, height: 950, rotation: 0, opacity: 0.05, delay: 3, duration: 11 },
  ]

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        viewBox="0 0 1920 1080"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ray-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8abf6a" stopOpacity="0.6" />
            <stop offset="30%" stopColor="#5a9a3a" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#3a7a2a" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1a4a1a" stopOpacity="0" />
          </linearGradient>
          <filter id="ray-blur">
            <feGaussianBlur stdDeviation="15" />
          </filter>
        </defs>

        {rays.map((ray, i) => (
          <rect
            key={i}
            x={ray.x - ray.width / 2}
            y={-50}
            width={ray.width}
            height={ray.height}
            fill="url(#ray-fade)"
            filter="url(#ray-blur)"
            opacity={ray.opacity}
            transform={`rotate(${ray.rotation} ${ray.x} 0)`}
            className="animate-ray"
            style={{
              "--ray-min": ray.opacity * 0.5,
              "--ray-max": ray.opacity * 1.5,
              "--duration": `${ray.duration}s`,
              animationDelay: `${ray.delay}s`,
            } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  )
}
