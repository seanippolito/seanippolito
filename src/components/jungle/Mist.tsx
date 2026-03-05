export function Mist() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="mist-blur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <filter id="mist-blur-light">
          <feGaussianBlur stdDeviation="25" />
        </filter>
        <radialGradient id="mist-1" cx="30%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#1a3a1a" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0a1f0a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mist-2" cx="70%" cy="75%" r="45%">
          <stop offset="0%" stopColor="#1a3a1a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0a1f0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Low-lying ground mist */}
      <ellipse
        cx="400"
        cy="950"
        rx="500"
        ry="100"
        fill="url(#mist-1)"
        filter="url(#mist-blur)"
        className="animate-mist"
        style={{
          "--mist-dx": "40px",
          "--mist-opacity": "0.2",
          "--duration": "25s",
        } as React.CSSProperties}
      />

      <ellipse
        cx="1400"
        cy="920"
        rx="450"
        ry="80"
        fill="url(#mist-2)"
        filter="url(#mist-blur)"
        className="animate-mist"
        style={{
          "--mist-dx": "-35px",
          "--mist-opacity": "0.15",
          "--duration": "30s",
          animationDelay: "5s",
        } as React.CSSProperties}
      />

      {/* Mid-height atmospheric haze */}
      <ellipse
        cx="960"
        cy="600"
        rx="800"
        ry="150"
        fill="#1a3a1a"
        opacity="0.04"
        filter="url(#mist-blur)"
        className="animate-mist"
        style={{
          "--mist-dx": "20px",
          "--mist-opacity": "0.04",
          "--duration": "35s",
          animationDelay: "10s",
        } as React.CSSProperties}
      />

      {/* Thin wisps */}
      <ellipse
        cx="300"
        cy="700"
        rx="250"
        ry="30"
        fill="#2a5a2a"
        opacity="0.06"
        filter="url(#mist-blur-light)"
        className="animate-mist"
        style={{
          "--mist-dx": "50px",
          "--mist-opacity": "0.06",
          "--duration": "18s",
        } as React.CSSProperties}
      />

      <ellipse
        cx="1500"
        cy="750"
        rx="200"
        ry="25"
        fill="#2a5a2a"
        opacity="0.05"
        filter="url(#mist-blur-light)"
        className="animate-mist"
        style={{
          "--mist-dx": "-45px",
          "--mist-opacity": "0.05",
          "--duration": "22s",
          animationDelay: "8s",
        } as React.CSSProperties}
      />
    </svg>
  )
}
