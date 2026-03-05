export function ForegroundLeaves() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="fg-blur">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="fg-blur-heavy">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="fg-blur-extreme">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <linearGradient id="fg-leaf-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a6a22" />
          <stop offset="100%" stopColor="#0f4015" />
        </linearGradient>
        <linearGradient id="fg-leaf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e7028" />
          <stop offset="100%" stopColor="#125018" />
        </linearGradient>
        <linearGradient id="fg-leaf-warm" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#3a8a28" />
          <stop offset="100%" stopColor="#2a6a1a" />
        </linearGradient>
        <linearGradient id="fg-leaf-teal" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#1a6a50" />
          <stop offset="100%" stopColor="#0f4a35" />
        </linearGradient>
        <linearGradient id="fg-leaf-yellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6a9a20" />
          <stop offset="100%" stopColor="#4a7a15" />
        </linearGradient>
      </defs>

      {/* === BOTTOM LEFT — Thick palm fronds reaching in === */}
      <g filter="url(#fg-blur)" className="animate-sway" style={{ transformOrigin: "0px 1080px" }}>
        {/* Main frond — rich green */}
        <path
          d="M-100 1080 Q-50 920 30 820 Q80 770 150 740 Q210 720 280 720
             Q210 735 150 765 Q90 800 40 860 Q-10 920 -40 1010 Z"
          fill="url(#fg-leaf-1)"
          opacity="0.8"
        />
        {/* Second frond — warmer green */}
        <path
          d="M-50 1080 Q10 940 80 860 Q130 810 200 785 Q250 770 310 768
             Q250 780 195 810 Q140 845 90 900 Q40 960 15 1040 Z"
          fill="url(#fg-leaf-warm)"
          opacity="0.65"
        />
        {/* Third frond — yellow-green accent */}
        <path
          d="M-20 1080 Q30 970 100 900 Q150 860 210 840 Q260 830 300 830
             Q260 840 210 860 Q160 890 110 940 Q60 990 30 1060 Z"
          fill="url(#fg-leaf-yellow)"
          opacity="0.4"
        />
        {/* Thick midrib on main */}
        <path d="M-80 1060 Q10 910 100 820 Q170 770 260 730" stroke="#0d4a10" strokeWidth="2" fill="none" opacity="0.25" />
      </g>

      {/* === BOTTOM RIGHT — Dense multi-colored cluster === */}
      <g filter="url(#fg-blur)" className="animate-sway-alt" style={{ transformOrigin: "1920px 1080px" }}>
        {/* Dark emerald frond */}
        <path
          d="M2020 1080 Q1970 920 1890 830 Q1840 780 1770 750 Q1720 730 1660 725
             Q1720 745 1775 775 Q1835 810 1885 870 Q1940 940 1965 1030 Z"
          fill="url(#fg-leaf-1)"
          opacity="0.75"
        />
        {/* Teal accent frond */}
        <path
          d="M1980 1080 Q1940 950 1870 870 Q1830 825 1770 800 Q1730 785 1680 780
             Q1730 795 1775 825 Q1830 860 1875 920 Q1920 985 1945 1065 Z"
          fill="url(#fg-leaf-teal)"
          opacity="0.5"
        />
        {/* Bright lime frond */}
        <path
          d="M1960 1080 Q1930 980 1880 910 Q1850 875 1810 855 Q1775 842 1740 840
             Q1775 850 1810 870 Q1850 900 1885 950 Q1920 1000 1940 1065 Z"
          fill="url(#fg-leaf-yellow)"
          opacity="0.35"
        />
      </g>

      {/* === TOP LEFT — Thick overhanging banana leaf === */}
      <g filter="url(#fg-blur-heavy)" className="animate-sway" style={{ transformOrigin: "0px 0px" }}>
        <path
          d="M-40 -30 Q50 40 120 130 Q170 190 195 260 Q210 320 205 380
             Q200 310 175 250 Q150 190 100 120 Q50 60 -20 10 Z"
          fill="url(#fg-leaf-warm)"
          opacity="0.45"
        />
        {/* Midrib */}
        <path d="M-30 -20 Q60 60 130 160 Q175 240 200 340" stroke="#1a5a14" strokeWidth="1.5" fill="none" opacity="0.2" filter="url(#fg-blur-heavy)" />
      </g>

      {/* === TOP RIGHT — Drooping teal frond === */}
      <g filter="url(#fg-blur-heavy)" className="animate-sway-alt" style={{ transformOrigin: "1920px 0px" }}>
        <path
          d="M1960 -30 Q1870 40 1800 130 Q1750 190 1725 260 Q1710 320 1715 380
             Q1720 310 1745 250 Q1770 190 1820 120 Q1870 60 1940 10 Z"
          fill="url(#fg-leaf-teal)"
          opacity="0.4"
        />
      </g>

      {/* === EXTREME CLOSE BOKEH — Large colorful blobs === */}

      {/* Warm green bokeh - left */}
      <ellipse
        cx="-80"
        cy="450"
        rx="140"
        ry="70"
        fill="#2a8a28"
        opacity="0.12"
        transform="rotate(25 -80 450)"
        filter="url(#fg-blur-extreme)"
      />

      {/* Teal bokeh - right */}
      <ellipse
        cx="2000"
        cy="550"
        rx="120"
        ry="60"
        fill="#1a7a5a"
        opacity="0.1"
        transform="rotate(-20 2000 550)"
        filter="url(#fg-blur-extreme)"
      />

      {/* Yellow-green bokeh - top */}
      <ellipse
        cx="300"
        cy="-30"
        rx="100"
        ry="80"
        fill="#5a9a20"
        opacity="0.08"
        filter="url(#fg-blur-extreme)"
      />

      {/* Warm amber bokeh hint - bottom center (from ground) */}
      <ellipse
        cx="960"
        cy="1120"
        rx="300"
        ry="80"
        fill="#8a6a20"
        opacity="0.04"
        filter="url(#fg-blur-extreme)"
      />
    </svg>
  )
}
