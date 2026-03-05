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
        <linearGradient id="leaf-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a7a20" />
          <stop offset="100%" stopColor="#2a5a18" />
        </linearGradient>
        <linearGradient id="leaf-lime" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a9a30" />
          <stop offset="100%" stopColor="#3a7a20" />
        </linearGradient>
        <linearGradient id="leaf-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1a5a4a" />
          <stop offset="100%" stopColor="#0f3a30" />
        </linearGradient>
        <linearGradient id="vine-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a4a1a" />
          <stop offset="100%" stopColor="#0f3010" />
        </linearGradient>
        <linearGradient id="orchid-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d46a9a" />
          <stop offset="100%" stopColor="#a04070" />
        </linearGradient>
        <linearGradient id="heliconia-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e84030" />
          <stop offset="100%" stopColor="#c03020" />
        </linearGradient>
      </defs>

      {/* === LEFT SIDE — DENSE THICK FOLIAGE === */}

      {/* Large banana leaf - thick, broad, warm green */}
      <g className="animate-sway" style={{ transformOrigin: "180px 0px" }}>
        <path
          d="M180 0 Q160 60 130 140 Q100 200 60 260 Q30 300 -10 330
             Q0 320 20 290 Q50 250 80 190 Q110 130 140 70 Q160 30 170 0Z"
          fill="url(#leaf-warm)"
          opacity="0.8"
        />
        {/* Thick midrib */}
        <path d="M180 0 Q150 80 110 170 Q70 260 20 320" stroke="#2a5a14" strokeWidth="2.5" fill="none" opacity="0.6" />
        {/* Lateral veins */}
        <path d="M170 30 Q145 25 125 45" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M155 80 Q125 70 100 95" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M135 140 Q105 130 80 155" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M110 200 Q80 190 55 220" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
        {/* Slight tear in leaf — realistic detail */}
        <path d="M120 160 L115 175" stroke="#0a1f0a" strokeWidth="0.5" fill="none" opacity="0.4" />
      </g>

      {/* Second palm frond - lighter lime green */}
      <g className="animate-sway-alt" style={{ transformOrigin: "120px 0px" }}>
        <path
          d="M120 0 Q140 90 165 190 Q185 260 220 320 Q250 360 290 390
             Q245 360 215 310 Q185 255 165 180 Q150 110 130 40Z"
          fill="url(#leaf-lime)"
          opacity="0.5"
        />
        <path d="M120 0 Q143 100 175 210 Q205 300 260 370" stroke="#3a6a18" strokeWidth="1.5" fill="none" opacity="0.35" />
      </g>

      {/* Thick teal-green heliconia leaves */}
      <g className="animate-sway" style={{ transformOrigin: "70px 500px" }}>
        <path
          d="M70 500 Q90 440 130 400 Q150 380 170 380
             Q150 390 130 410 Q100 450 80 510Z"
          fill="url(#leaf-teal)"
          opacity="0.7"
        />
        <path
          d="M60 510 Q40 450 50 390 Q55 370 65 370
             Q60 390 55 420 Q50 460 55 510Z"
          fill="#1a5a4a"
          opacity="0.6"
        />
        {/* Heliconia flower — bright red/orange hanging blooms */}
        <path d="M80 500 Q75 490 85 485 Q90 488 87 495Z" fill="url(#heliconia-grad)" opacity="0.7" />
        <path d="M82 495 Q77 485 88 480 Q93 483 89 490Z" fill="#e85040" opacity="0.65" />
        <path d="M84 490 Q79 480 90 476 Q94 479 91 486Z" fill="#d04030" opacity="0.6" />
        {/* Yellow stamens */}
        <path d="M85 485 L88 478" stroke="#e8c030" strokeWidth="0.8" fill="none" opacity="0.5" />
      </g>

      {/* Large monstera leaf - left mid (bigger, more detailed) */}
      <g opacity="0.65" transform="translate(40, 380)">
        <path
          d="M0 0 Q35 -50 75 -25 Q100 -5 90 35 Q115 70 90 100 Q65 130 25 115
             Q-15 105 -30 65 Q-40 25 0 0Z"
          fill="#1a5520"
        />
        {/* Characteristic monstera splits and holes */}
        <ellipse cx="40" cy="20" rx="12" ry="8" fill="#0a1f0a" opacity="0.5" />
        <ellipse cx="65" cy="55" rx="9" ry="7" fill="#0a1f0a" opacity="0.45" />
        <ellipse cx="20" cy="65" rx="10" ry="7" fill="#0a1f0a" opacity="0.45" />
        <ellipse cx="50" cy="85" rx="8" ry="6" fill="#0a1f0a" opacity="0.4" />
        {/* Split edges */}
        <path d="M90 35 L105 30" stroke="#0a1f0a" strokeWidth="2" fill="none" opacity="0.3" />
        <path d="M90 65 L108 62" stroke="#0a1f0a" strokeWidth="2" fill="none" opacity="0.3" />
        {/* Yellow-green new growth highlight */}
        <path d="M5 -5 Q20 -30 40 -25" stroke="#5aaa30" strokeWidth="1" fill="none" opacity="0.25" />
      </g>

      {/* === ORCHID CLUSTER on left vine === */}
      <g className="animate-vine" style={{ "--duration": "9s" } as React.CSSProperties}>
        <path
          d="M160 0 Q155 60 165 140 Q160 220 170 300 Q165 360 175 420 Q170 470 168 520"
          stroke="url(#vine-grad)"
          strokeWidth="3"
          fill="none"
          opacity="0.65"
          strokeLinecap="round"
        />
        {/* Orchid blooms on vine — purple/pink */}
        <g transform="translate(172, 270)">
          <ellipse cx="0" cy="0" rx="7" ry="5" fill="#c070b0" opacity="0.6" />
          <ellipse cx="0" cy="-3" rx="5" ry="4" fill="#d080c0" opacity="0.65" />
          <ellipse cx="-4" cy="2" rx="4" ry="3" fill="#b060a0" opacity="0.5" />
          <ellipse cx="4" cy="2" rx="4" ry="3" fill="#b060a0" opacity="0.5" />
          <circle cx="0" cy="0" r="2" fill="#e0a0d0" opacity="0.7" />
          {/* Spotted pattern */}
          <circle cx="-2" cy="-2" r="0.6" fill="#8a3080" opacity="0.4" />
          <circle cx="2" cy="-1" r="0.5" fill="#8a3080" opacity="0.4" />
        </g>
        {/* Second orchid lower */}
        <g transform="translate(168, 380)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="#c070b0" opacity="0.5" />
          <ellipse cx="0" cy="-2" rx="4" ry="3" fill="#d080c0" opacity="0.55" />
          <circle cx="0" cy="0" r="1.5" fill="#e0a0d0" opacity="0.6" />
        </g>
        {/* Vine leaves */}
        <ellipse cx="170" cy="200" rx="10" ry="6" fill="#2a6a1a" opacity="0.5" transform="rotate(25 170 200)" />
        <ellipse cx="165" cy="450" rx="8" ry="5" fill="#2a6a1a" opacity="0.4" transform="rotate(-15 165 450)" />
      </g>

      {/* Second vine */}
      <g className="animate-vine" style={{ "--duration": "11s" } as React.CSSProperties}>
        <path
          d="M250 0 Q245 80 255 180 Q250 280 260 380 Q255 440 258 500 Q254 560 260 620"
          stroke="url(#vine-grad)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.5"
          strokeLinecap="round"
        />
        {/* Bromeliads growing on vine — orange/red rosette */}
        <g transform="translate(258, 350)">
          <ellipse cx="0" cy="0" rx="10" ry="6" fill="#3a7a20" opacity="0.5" transform="rotate(-10)" />
          <ellipse cx="3" cy="-2" rx="8" ry="5" fill="#4a8a28" opacity="0.5" transform="rotate(15)" />
          <ellipse cx="-3" cy="-1" rx="8" ry="5" fill="#3a7a20" opacity="0.5" transform="rotate(-25)" />
          {/* Center flower spike — bright red */}
          <path d="M0 -3 L2 -12 L0 -10 L-2 -12Z" fill="#e84030" opacity="0.6" />
          <circle cx="0" cy="-12" r="2" fill="#f05040" opacity="0.5" />
        </g>
      </g>

      {/* === RIGHT SIDE — EQUALLY DENSE === */}

      {/* Large banana leaf - right side */}
      <g className="animate-sway-alt" style={{ transformOrigin: "1740px 0px" }}>
        <path
          d="M1740 0 Q1760 60 1790 140 Q1820 200 1860 260 Q1890 300 1930 330
             Q1920 320 1900 290 Q1870 250 1840 190 Q1810 130 1780 70 Q1760 30 1750 0Z"
          fill="url(#leaf-warm)"
          opacity="0.75"
        />
        <path d="M1740 0 Q1770 80 1810 170 Q1850 260 1900 320" stroke="#2a5a14" strokeWidth="2.5" fill="none" opacity="0.5" />
        <path d="M1760 50 Q1785 40 1800 65" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M1785 120 Q1810 110 1825 135" stroke="#2a5a14" strokeWidth="1" fill="none" opacity="0.3" />
      </g>

      {/* Fern cluster — lime to emerald */}
      <g className="animate-sway" style={{ transformOrigin: "1850px 280px" }}>
        <path d="M1850 280 Q1880 230 1920 210 Q1895 240 1865 270Z" fill="#4a9a28" opacity="0.55" />
        <path d="M1850 280 Q1890 250 1930 245 Q1905 262 1870 275Z" fill="#3a8a20" opacity="0.5" />
        <path d="M1850 280 Q1825 230 1800 210 Q1820 240 1840 270Z" fill="#4a9a28" opacity="0.5" />
        <path d="M1850 280 Q1815 250 1790 245 Q1810 262 1838 275Z" fill="#3a8a20" opacity="0.45" />
        {/* Individual frond leaflets */}
        <path d="M1870 260 Q1878 252 1885 256 Q1880 260 1875 262Z" fill="#5aaa30" opacity="0.3" />
        <path d="M1830 260 Q1822 252 1815 256 Q1820 260 1825 262Z" fill="#5aaa30" opacity="0.3" />
      </g>

      {/* Right monstera */}
      <g opacity="0.55" transform="translate(1810, 420)">
        <path
          d="M0 0 Q-30 -40 -65 -20 Q-85 0 -75 30 Q-95 60 -75 85 Q-55 110 -20 100
             Q10 90 20 55 Q30 20 0 0Z"
          fill="#1e6025"
        />
        <ellipse cx="-35" cy="20" rx="10" ry="7" fill="#0a1f0a" opacity="0.45" />
        <ellipse cx="-55" cy="55" rx="8" ry="6" fill="#0a1f0a" opacity="0.4" />
        <ellipse cx="-20" cy="60" rx="9" ry="6" fill="#0a1f0a" opacity="0.4" />
      </g>

      {/* Right vine with passion flower */}
      <g className="animate-vine" style={{ "--duration": "8s" } as React.CSSProperties}>
        <path
          d="M1760 0 Q1765 70 1755 160 Q1760 250 1750 340 Q1755 400 1752 460"
          stroke="url(#vine-grad)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.55"
          strokeLinecap="round"
        />
        {/* Passion flower — intricate purple/white */}
        <g transform="translate(1752, 320)">
          {/* Outer petals */}
          <ellipse cx="0" cy="-6" rx="3" ry="6" fill="#8a6ac0" opacity="0.5" />
          <ellipse cx="5" cy="-3" rx="3" ry="6" fill="#7a5ab0" opacity="0.5" transform="rotate(72 5 -3)" />
          <ellipse cx="4" cy="4" rx="3" ry="6" fill="#8a6ac0" opacity="0.5" transform="rotate(144 4 4)" />
          <ellipse cx="-4" cy="4" rx="3" ry="6" fill="#7a5ab0" opacity="0.5" transform="rotate(216 -4 4)" />
          <ellipse cx="-5" cy="-3" rx="3" ry="6" fill="#8a6ac0" opacity="0.5" transform="rotate(288 -5 -3)" />
          {/* Corona filaments */}
          <circle cx="0" cy="0" r="5" fill="none" stroke="#c0a0e0" strokeWidth="0.5" opacity="0.4" strokeDasharray="1 1.5" />
          {/* Center */}
          <circle cx="0" cy="0" r="2" fill="#4a8a30" opacity="0.6" />
        </g>
        <ellipse cx="1752" cy="240" rx="9" ry="5" fill="#2a6a1a" opacity="0.45" transform="rotate(-20 1752 240)" />
      </g>

      {/* === TOP CANOPY — THICKER LEAVES === */}

      {/* Broad leaf hanging center-left — bigger, warmer green */}
      <g className="animate-sway" style={{ transformOrigin: "600px 0px" }}>
        <path
          d="M600 0 Q580 50 550 110 Q520 160 480 200 Q460 220 440 230
             Q460 210 480 180 Q510 140 540 90 Q570 45 590 10Z"
          fill="url(#leaf-warm)"
          opacity="0.45"
        />
        <path d="M600 0 Q575 60 540 130 Q505 190 460 230" stroke="#2a5a14" strokeWidth="1.5" fill="none" opacity="0.3" />
      </g>

      {/* Broad leaf center-right — teal accent */}
      <g className="animate-sway-alt" style={{ transformOrigin: "1320px 0px" }}>
        <path
          d="M1320 0 Q1340 50 1370 110 Q1400 160 1440 200 Q1460 220 1480 230
             Q1460 210 1440 180 Q1410 140 1380 90 Q1350 45 1330 10Z"
          fill="url(#leaf-teal)"
          opacity="0.4"
        />
      </g>

      {/* Small bright leaf peeking from top */}
      <g className="animate-sway" style={{ transformOrigin: "960px 0px" }}>
        <path
          d="M960 0 Q955 25 945 50 Q935 65 920 72 Q935 60 945 42 Q955 22 958 5Z"
          fill="#5aaa30"
          opacity="0.3"
        />
      </g>

      {/* === COLORFUL FLOWERS & DETAILS === */}

      {/* Bird of paradise flower — left bottom area */}
      <g transform="translate(100, 650)" opacity="0.5">
        {/* Orange/blue petals */}
        <path d="M0 0 L-8 -20 L5 -18Z" fill="#e88030" />
        <path d="M0 0 L8 -22 L15 -15Z" fill="#e88030" />
        <path d="M2 -18 L0 -30 L8 -25Z" fill="#4080d0" opacity="0.7" />
        <path d="M4 -16 L10 -28 L12 -20Z" fill="#3070c0" opacity="0.6" />
        {/* Green bract */}
        <path d="M-5 0 L15 -5 L12 2Z" fill="#2a6a20" />
        {/* Stem */}
        <path d="M0 0 L-5 30" stroke="#2a5a18" strokeWidth="2" fill="none" />
      </g>

      {/* Yellow bromeliad flowers — scattered */}
      <circle cx="1880" cy="420" r="3.5" fill="#e8c030" opacity="0.35" />
      <circle cx="1878" cy="417" r="2" fill="#f0d040" opacity="0.45" />
      <circle cx="1883" cy="419" r="1.5" fill="#f0d040" opacity="0.4" />

      {/* Red hibiscus hint */}
      <g transform="translate(320, 560)" opacity="0.35">
        <ellipse cx="0" cy="0" rx="8" ry="7" fill="#c03040" />
        <ellipse cx="0" cy="-2" rx="6" ry="5" fill="#d04050" />
        <circle cx="0" cy="0" r="3" fill="#e06070" opacity="0.7" />
        <path d="M0 -3 L0 -10" stroke="#e8c030" strokeWidth="0.8" fill="none" />
        <circle cx="0" cy="-10" r="1" fill="#e8c030" opacity="0.8" />
      </g>

      {/* Bright mushrooms on far left tree base */}
      <g transform="translate(85, 870)" opacity="0.3">
        <ellipse cx="0" cy="0" rx="5" ry="3" fill="#e0a040" />
        <rect x="-1" y="0" width="2" height="5" fill="#c8c0a0" />
        <ellipse cx="8" cy="3" rx="3.5" ry="2" fill="#d09030" />
        <rect x="7" y="3" width="1.5" height="4" fill="#c8c0a0" />
        <ellipse cx="-5" cy="4" rx="2.5" ry="1.5" fill="#d09030" />
      </g>
    </svg>
  )
}
