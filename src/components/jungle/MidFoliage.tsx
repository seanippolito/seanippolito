export function MidFoliage() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="leaf-grad-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a5a20" />
          <stop offset="100%" stopColor="#0f3a12" />
        </linearGradient>
        <linearGradient id="leaf-grad-2" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1e6025" />
          <stop offset="100%" stopColor="#143a14" />
        </linearGradient>
        <linearGradient id="vine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a4a1a" />
          <stop offset="100%" stopColor="#0f3010" />
        </linearGradient>
      </defs>

      {/* === LEFT SIDE FOLIAGE === */}

      {/* Large palm frond - top left */}
      <g className="animate-sway" style={{ transformOrigin: "200px 0px" }}>
        <path
          d="M200 0 Q180 80 160 160 Q140 200 100 230 Q70 250 30 260
             Q70 240 100 210 Q130 180 150 140 Q170 100 180 50 Z"
          fill="url(#leaf-grad-1)"
          opacity="0.7"
        />
        {/* Leaf spine */}
        <path d="M200 0 Q175 90 140 180 Q110 240 60 270" stroke="#0d2a0d" strokeWidth="1.5" fill="none" opacity="0.5" />
        {/* Leaf segments */}
        <path d="M190 40 Q170 35 155 50" stroke="#0d2a0d" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M180 80 Q155 70 140 90" stroke="#0d2a0d" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M170 120 Q145 110 125 130" stroke="#0d2a0d" strokeWidth="0.8" fill="none" opacity="0.3" />
      </g>

      {/* Second palm frond - left */}
      <g className="animate-sway-alt" style={{ transformOrigin: "130px 0px" }}>
        <path
          d="M130 0 Q145 100 170 200 Q190 260 230 310 Q260 340 300 360
             Q255 340 220 300 Q185 250 165 180 Q150 110 140 50 Z"
          fill="url(#leaf-grad-2)"
          opacity="0.55"
        />
        <path d="M130 0 Q148 110 180 220 Q210 300 270 350" stroke="#0d2a0d" strokeWidth="1" fill="none" opacity="0.4" />
      </g>

      {/* Monstera leaf cluster - left mid */}
      <g opacity="0.6" transform="translate(50, 400)">
        <path
          d="M0 0 Q30 -40 60 -20 Q80 0 70 30 Q90 60 70 80 Q50 100 20 90
             Q-10 80 -20 50 Q-30 20 0 0Z"
          fill="#1a5520"
        />
        {/* Monstera holes */}
        <ellipse cx="30" cy="20" rx="8" ry="6" fill="#0a1f0a" opacity="0.6" />
        <ellipse cx="50" cy="50" rx="6" ry="5" fill="#0a1f0a" opacity="0.5" />
        <ellipse cx="15" cy="55" rx="7" ry="5" fill="#0a1f0a" opacity="0.5" />
      </g>

      {/* Hanging vines - left */}
      <g className="animate-vine" style={{ "--duration": "9s" } as React.CSSProperties}>
        <path
          d="M160 0 Q155 60 165 140 Q160 220 170 300 Q165 360 175 420 Q170 470 168 520"
          stroke="url(#vine-grad)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.6"
          strokeLinecap="round"
        />
        {/* Vine leaves */}
        <ellipse cx="170" cy="280" rx="8" ry="5" fill="#1a4a1a" opacity="0.5" transform="rotate(25 170 280)" />
        <ellipse cx="165" cy="400" rx="6" ry="4" fill="#1a4a1a" opacity="0.4" transform="rotate(-15 165 400)" />
      </g>

      <g className="animate-vine" style={{ "--duration": "11s" } as React.CSSProperties}>
        <path
          d="M240 0 Q235 80 245 180 Q240 280 250 380 Q245 440 248 500 Q244 560 250 600"
          stroke="url(#vine-grad)"
          strokeWidth="2"
          fill="none"
          opacity="0.45"
          strokeLinecap="round"
        />
      </g>

      {/* === RIGHT SIDE FOLIAGE === */}

      {/* Large palm frond - top right */}
      <g className="animate-sway-alt" style={{ transformOrigin: "1720px 0px" }}>
        <path
          d="M1720 0 Q1740 80 1760 160 Q1780 200 1820 230 Q1850 250 1890 260
             Q1850 240 1820 210 Q1790 180 1770 140 Q1750 100 1740 50 Z"
          fill="url(#leaf-grad-1)"
          opacity="0.7"
        />
        <path d="M1720 0 Q1745 90 1780 180 Q1810 240 1860 270" stroke="#0d2a0d" strokeWidth="1.5" fill="none" opacity="0.5" />
      </g>

      {/* Fern cluster - right */}
      <g className="animate-sway" style={{ transformOrigin: "1850px 300px" }}>
        {/* Fern fronds radiating from point */}
        <path d="M1850 300 Q1870 260 1900 240 Q1880 265 1860 285Z" fill="#1a5a1e" opacity="0.6" />
        <path d="M1850 300 Q1880 270 1920 260 Q1890 278 1860 290Z" fill="#1e6025" opacity="0.5" />
        <path d="M1850 300 Q1830 260 1810 240 Q1828 265 1845 285Z" fill="#1a5a1e" opacity="0.55" />
        <path d="M1850 300 Q1890 290 1920 300 Q1895 300 1865 305Z" fill="#1e6025" opacity="0.4" />
      </g>

      {/* Hanging vines - right */}
      <g className="animate-vine" style={{ "--duration": "8s" } as React.CSSProperties}>
        <path
          d="M1760 0 Q1765 70 1755 160 Q1760 250 1750 340 Q1755 400 1752 460"
          stroke="url(#vine-grad)"
          strokeWidth="2"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
        <ellipse cx="1752" cy="340" rx="7" ry="4" fill="#1a4a1a" opacity="0.4" transform="rotate(-20 1752 340)" />
      </g>

      {/* === TOP CANOPY LEAVES === */}

      {/* Broad leaf hanging from top center-left */}
      <g className="animate-sway" style={{ transformOrigin: "650px 0px" }}>
        <path
          d="M650 0 Q640 40 620 80 Q600 110 570 130 Q590 105 610 75 Q630 45 640 10Z"
          fill="#1a5520"
          opacity="0.4"
        />
      </g>

      {/* Broad leaf hanging from top center-right */}
      <g className="animate-sway-alt" style={{ transformOrigin: "1300px 0px" }}>
        <path
          d="M1300 0 Q1310 40 1330 80 Q1350 110 1380 130 Q1360 105 1340 75 Q1320 45 1310 10Z"
          fill="#1a5520"
          opacity="0.35"
        />
      </g>

      {/* Small tropical flower hint */}
      <circle cx="90" cy="430" r="4" fill="#c44a4a" opacity="0.3" />
      <circle cx="92" cy="428" r="2" fill="#d46a5a" opacity="0.4" />

      <circle cx="1870" cy="350" r="3" fill="#c44a6a" opacity="0.25" />
      <circle cx="1872" cy="348" r="1.5" fill="#d46a7a" opacity="0.35" />
    </svg>
  )
}
