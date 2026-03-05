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
        <linearGradient id="fg-leaf-1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a6a22" />
          <stop offset="100%" stopColor="#0f4015" />
        </linearGradient>
        <linearGradient id="fg-leaf-2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e7028" />
          <stop offset="100%" stopColor="#125018" />
        </linearGradient>
      </defs>

      {/* === BOTTOM LEFT — Large palm frond reaching in === */}
      <g filter="url(#fg-blur)" className="animate-sway" style={{ transformOrigin: "0px 1080px" }}>
        <path
          d="M-80 1080 Q-40 950 20 850 Q60 800 120 770 Q170 750 230 750
             Q170 760 120 790 Q70 820 30 880 Q-10 940 -30 1020 Z"
          fill="url(#fg-leaf-1)"
          opacity="0.75"
        />
        <path
          d="M-40 1080 Q0 960 60 880 Q100 840 160 810 Q200 795 250 790
             Q200 805 155 835 Q110 865 70 920 Q30 975 10 1050 Z"
          fill="url(#fg-leaf-2)"
          opacity="0.6"
        />
        {/* Frond veins */}
        <path d="M-60 1050 Q0 930 80 840 Q140 790 220 760" stroke="#0d3a10" strokeWidth="1.5" fill="none" opacity="0.3" filter="url(#fg-blur)" />
      </g>

      {/* === BOTTOM RIGHT — Large leaf cluster === */}
      <g filter="url(#fg-blur)" className="animate-sway-alt" style={{ transformOrigin: "1920px 1080px" }}>
        <path
          d="M2000 1080 Q1960 950 1900 860 Q1860 810 1800 780 Q1750 760 1690 755
             Q1750 770 1800 800 Q1850 830 1890 890 Q1930 950 1950 1030 Z"
          fill="url(#fg-leaf-1)"
          opacity="0.7"
        />
        <path
          d="M1960 1080 Q1930 970 1870 890 Q1830 845 1780 820 Q1740 805 1690 800
             Q1740 815 1785 845 Q1830 875 1870 930 Q1910 985 1930 1060 Z"
          fill="url(#fg-leaf-2)"
          opacity="0.55"
        />
      </g>

      {/* === TOP LEFT — Overhanging large leaf === */}
      <g filter="url(#fg-blur-heavy)" className="animate-sway" style={{ transformOrigin: "0px 0px" }}>
        <path
          d="M-30 -20 Q40 30 100 100 Q140 150 160 210 Q170 260 165 310
             Q160 250 140 200 Q120 150 80 100 Q40 55 -10 20 Z"
          fill="#1a6a22"
          opacity="0.5"
        />
      </g>

      {/* === TOP RIGHT — Drooping frond === */}
      <g filter="url(#fg-blur-heavy)" className="animate-sway-alt" style={{ transformOrigin: "1920px 0px" }}>
        <path
          d="M1950 -20 Q1880 30 1820 100 Q1780 150 1760 210 Q1750 260 1755 310
             Q1760 250 1780 200 Q1800 150 1840 100 Q1880 55 1930 20 Z"
          fill="#1a6a22"
          opacity="0.45"
        />
      </g>

      {/* === EXTREME CLOSE BOKEH LEAVES (very blurred) === */}
      <ellipse
        cx="-60"
        cy="500"
        rx="120"
        ry="60"
        fill="#1a7a22"
        opacity="0.15"
        transform="rotate(30 -60 500)"
        filter="url(#fg-blur-heavy)"
      />
      <ellipse
        cx="1980"
        cy="600"
        rx="100"
        ry="50"
        fill="#1a7a22"
        opacity="0.12"
        transform="rotate(-25 1980 600)"
        filter="url(#fg-blur-heavy)"
      />
    </svg>
  )
}
