export function BackgroundSky() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 1920 1080" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="sky-glow" cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#1a3a1a" />
            <stop offset="100%" stopColor="#0a1f0a" />
          </radialGradient>
          <radialGradient id="light-beam" cx="50%" cy="0%" r="50%">
            <stop offset="0%" stopColor="#2a5a2a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0a1f0a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1920" height="1080" fill="url(#sky-glow)" />
        <ellipse cx="960" cy="200" rx="600" ry="400" fill="url(#light-beam)" />
      </svg>
    </div>
  )
}
