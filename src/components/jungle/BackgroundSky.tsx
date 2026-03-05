export function BackgroundSky() {
  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 1920 1080"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Deep jungle canopy sky */}
          <radialGradient id="sky-core" cx="50%" cy="25%" r="65%">
            <stop offset="0%" stopColor="#0f2b12" />
            <stop offset="40%" stopColor="#0a1f0a" />
            <stop offset="100%" stopColor="#040e04" />
          </radialGradient>

          {/* Warm canopy opening glow */}
          <radialGradient id="canopy-glow" cx="48%" cy="18%" r="35%">
            <stop offset="0%" stopColor="#1a4a20" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#0f3015" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#040e04" stopOpacity="0" />
          </radialGradient>

          {/* Warm sunlight filtering through */}
          <radialGradient id="sun-filter" cx="52%" cy="10%" r="30%">
            <stop offset="0%" stopColor="#3a6b2a" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#2a5a1a" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0a1f0a" stopOpacity="0" />
          </radialGradient>

          {/* Ambient warmth at center where text lives */}
          <radialGradient id="center-warmth" cx="50%" cy="45%" r="40%">
            <stop offset="0%" stopColor="#1a3518" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#040e04" stopOpacity="0" />
          </radialGradient>

          {/* Vignette */}
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#040e04" stopOpacity="0" />
            <stop offset="70%" stopColor="#040e04" stopOpacity="0" />
            <stop offset="100%" stopColor="#020802" stopOpacity="0.7" />
          </radialGradient>

          {/* Noise texture for organic feel */}
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>

        {/* Base gradient */}
        <rect width="1920" height="1080" fill="url(#sky-core)" />

        {/* Canopy opening light */}
        <rect width="1920" height="1080" fill="url(#canopy-glow)" />
        <rect width="1920" height="1080" fill="url(#sun-filter)" />

        {/* Center warmth for content readability */}
        <rect width="1920" height="1080" fill="url(#center-warmth)" />

        {/* Vignette darkening at edges */}
        <rect width="1920" height="1080" fill="url(#vignette)" />

        {/* Subtle grain/noise overlay */}
        <rect
          width="1920"
          height="1080"
          filter="url(#noise)"
          opacity="0.03"
          style={{ mixBlendMode: "overlay" }}
        />

        {/* Dappled light spots on the "floor" */}
        <ellipse cx="400" cy="850" rx="120" ry="30" fill="#1a4a1a" opacity="0.06" />
        <ellipse cx="1500" cy="900" rx="90" ry="25" fill="#1a4a1a" opacity="0.05" />
        <ellipse cx="960" cy="820" rx="150" ry="35" fill="#1a4a1a" opacity="0.04" />
      </svg>
    </div>
  )
}
