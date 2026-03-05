export function Ground() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Ground earth gradient */}
        <linearGradient id="ground-earth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2e10" />
          <stop offset="40%" stopColor="#14260c" />
          <stop offset="100%" stopColor="#0a1506" />
        </linearGradient>

        {/* Mossy rock gradients */}
        <linearGradient id="rock-moss" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#2a4a1a" />
          <stop offset="100%" stopColor="#3a3a2a" />
        </linearGradient>
        <linearGradient id="rock-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3a3a30" />
          <stop offset="100%" stopColor="#2a2a20" />
        </linearGradient>

        {/* Pond water gradients */}
        <radialGradient id="pond-water" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#1a4a4a" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#0f3a3a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0a2a2a" stopOpacity="0.5" />
        </radialGradient>
        <radialGradient id="pond-water-2" cx="45%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#1a4050" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#103540" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a2530" stopOpacity="0.45" />
        </radialGradient>

        {/* Pond reflection shimmer */}
        <radialGradient id="pond-reflect" cx="50%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#4a8a6a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#2a6a4a" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pond-reflect-2" cx="55%" cy="25%" r="45%">
          <stop offset="0%" stopColor="#5a9a70" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3a7a50" stopOpacity="0" />
        </radialGradient>

        {/* Fallen log */}
        <linearGradient id="log-bark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3a20" />
          <stop offset="50%" stopColor="#3a2a18" />
          <stop offset="100%" stopColor="#2a1a10" />
        </linearGradient>
        <linearGradient id="log-moss-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a5a1a" />
          <stop offset="100%" stopColor="#3a4a20" />
        </linearGradient>

        {/* Leaf litter */}
        <linearGradient id="leaf-litter-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5a4a20" />
          <stop offset="100%" stopColor="#3a2a10" />
        </linearGradient>

        {/* Water ripple filter */}
        <filter id="pond-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.04" numOctaves="3" seed="5" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id="pond-ripple-2">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.05" numOctaves="2" seed="12" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Soft blur for reflections */}
        <filter id="reflect-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>

      {/* ============================================ */}
      {/* === MAIN GROUND FLOOR — earthy terrain === */}
      {/* ============================================ */}

      {/* Base ground shape — undulating terrain across bottom */}
      <path
        d="M0 780 Q120 760 240 770 Q400 755 520 765 Q650 750 780 758
           Q900 745 960 750 Q1060 740 1160 748 Q1300 735 1440 745
           Q1560 738 1680 750 Q1800 742 1920 755 L1920 1080 L0 1080 Z"
        fill="url(#ground-earth)"
      />

      {/* Secondary terrain layer — slightly raised, mossy ridge */}
      <path
        d="M0 800 Q150 785 300 792 Q480 778 600 788
           Q750 775 900 782 Q1020 770 1100 778
           Q1250 768 1400 775 Q1550 770 1680 778 Q1820 772 1920 780
           L1920 1080 L0 1080 Z"
        fill="#16280e"
        opacity="0.6"
      />

      {/* Leaf litter patches scattered across forest floor */}
      <ellipse cx="180" cy="830" rx="80" ry="15" fill="url(#leaf-litter-warm)" opacity="0.25" transform="rotate(-5 180 830)" />
      <ellipse cx="600" cy="810" rx="60" ry="12" fill="#4a3a18" opacity="0.2" transform="rotate(8 600 810)" />
      <ellipse cx="1100" cy="820" rx="90" ry="14" fill="url(#leaf-litter-warm)" opacity="0.22" transform="rotate(-3 1100 820)" />
      <ellipse cx="1500" cy="808" rx="70" ry="13" fill="#3a2a10" opacity="0.18" transform="rotate(6 1500 808)" />
      <ellipse cx="400" cy="850" rx="55" ry="10" fill="#5a4020" opacity="0.15" />
      <ellipse cx="1750" cy="830" rx="65" ry="11" fill="#4a3818" opacity="0.2" />

      {/* ============================================ */}
      {/* === POND 1 — larger, left-center area === */}
      {/* ============================================ */}
      <g>
        {/* Muddy bank around the pond */}
        <ellipse cx="480" cy="870" rx="180" ry="55" fill="#1a2a10" opacity="0.5" />
        <ellipse cx="480" cy="865" rx="170" ry="48" fill="#142008" opacity="0.4" />

        {/* Water surface */}
        <ellipse
          cx="480"
          cy="860"
          rx="155"
          ry="42"
          fill="url(#pond-water)"
          filter="url(#pond-ripple)"
        />

        {/* Canopy reflection — soft green shimmer */}
        <ellipse
          cx="470"
          cy="852"
          rx="100"
          ry="25"
          fill="url(#pond-reflect)"
          filter="url(#reflect-blur)"
        />

        {/* Sky light reflection — bright spot */}
        <ellipse cx="450" cy="848" rx="35" ry="10" fill="#3a7a5a" opacity="0.12" filter="url(#reflect-blur)" />

        {/* Lily pads */}
        <g opacity="0.5">
          {/* Pad 1 */}
          <ellipse cx="430" cy="855" rx="14" ry="8" fill="#2a6a20" transform="rotate(-10 430 855)" />
          <path d="M430 847 L430 855" stroke="#1a4a10" strokeWidth="0.5" opacity="0.3" />
          {/* Pad 2 */}
          <ellipse cx="510" cy="862" rx="12" ry="7" fill="#286018" transform="rotate(15 510 862)" />
          <path d="M510 855 L510 862" stroke="#1a4a10" strokeWidth="0.5" opacity="0.3" />
          {/* Pad 3 — with a tiny flower */}
          <ellipse cx="465" cy="868" rx="11" ry="6.5" fill="#2a6a20" transform="rotate(-5 465 868)" />
          <circle cx="465" cy="866" r="3" fill="#e0a0c0" opacity="0.4" />
          <circle cx="465" cy="866" r="1.5" fill="#f0c0d0" opacity="0.3" />
          {/* Pad 4 */}
          <ellipse cx="385" cy="860" rx="10" ry="6" fill="#286818" opacity="0.4" transform="rotate(20 385 860)" />
        </g>

        {/* Ripple rings */}
        <ellipse cx="500" cy="858" rx="20" ry="6" fill="none" stroke="#4a8a6a" strokeWidth="0.5" opacity="0.15" />
        <ellipse cx="500" cy="858" rx="35" ry="10" fill="none" stroke="#4a8a6a" strokeWidth="0.3" opacity="0.08" />
        <ellipse cx="420" cy="870" rx="15" ry="4.5" fill="none" stroke="#3a7a5a" strokeWidth="0.4" opacity="0.1" />

        {/* Reeds at pond edge */}
        <g opacity="0.35">
          <path d="M340 870 Q335 830 338 800" stroke="#3a5a20" strokeWidth="1.5" fill="none" />
          <path d="M348 868 Q344 835 346 808" stroke="#2a4a18" strokeWidth="1.2" fill="none" />
          <path d="M620 865 Q625 828 622 798" stroke="#3a5a20" strokeWidth="1.5" fill="none" />
          <path d="M628 867 Q630 832 629 805" stroke="#2a4a18" strokeWidth="1" fill="none" />
          {/* Reed tops — cattail shapes */}
          <ellipse cx="338" cy="798" rx="2" ry="6" fill="#5a4a20" />
          <ellipse cx="346" cy="806" rx="1.8" ry="5" fill="#4a3a18" />
          <ellipse cx="622" cy="796" rx="2" ry="6" fill="#5a4a20" />
        </g>
      </g>

      {/* ============================================ */}
      {/* === POND 2 — smaller, right side === */}
      {/* ============================================ */}
      <g>
        {/* Muddy bank */}
        <ellipse cx="1380" cy="845" rx="120" ry="38" fill="#1a2a10" opacity="0.45" />
        <ellipse cx="1380" cy="842" rx="110" ry="32" fill="#142008" opacity="0.35" />

        {/* Water surface */}
        <ellipse
          cx="1380"
          cy="838"
          rx="100"
          ry="28"
          fill="url(#pond-water-2)"
          filter="url(#pond-ripple-2)"
        />

        {/* Canopy reflection */}
        <ellipse
          cx="1370"
          cy="832"
          rx="60"
          ry="16"
          fill="url(#pond-reflect-2)"
          filter="url(#reflect-blur)"
        />

        {/* Sky light reflection */}
        <ellipse cx="1360" cy="830" rx="22" ry="7" fill="#4a8a6a" opacity="0.1" filter="url(#reflect-blur)" />

        {/* Lily pad */}
        <ellipse cx="1400" cy="838" rx="10" ry="6" fill="#2a6a20" opacity="0.4" transform="rotate(12 1400 838)" />
        <ellipse cx="1355" cy="842" rx="8" ry="5" fill="#286018" opacity="0.35" transform="rotate(-8 1355 842)" />

        {/* Ripple ring */}
        <ellipse cx="1390" cy="836" rx="16" ry="5" fill="none" stroke="#4a8a6a" strokeWidth="0.4" opacity="0.12" />

        {/* Reeds */}
        <g opacity="0.3">
          <path d="M1290 840 Q1288 808 1290 785" stroke="#3a5a20" strokeWidth="1.2" fill="none" />
          <ellipse cx="1290" cy="783" rx="1.8" ry="5" fill="#5a4a20" />
          <path d="M1470 838 Q1472 810 1470 790" stroke="#2a4a18" strokeWidth="1" fill="none" />
          <ellipse cx="1470" cy="788" rx="1.5" ry="4.5" fill="#4a3a18" />
        </g>
      </g>

      {/* ============================================ */}
      {/* === FALLEN LOG — across mid-ground === */}
      {/* ============================================ */}
      <g opacity="0.45">
        {/* Main log body */}
        <path
          d="M720 890 Q800 878 880 882 Q960 876 1020 880"
          stroke="url(#log-bark)"
          strokeWidth="18"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bark texture lines */}
        <path d="M740 885 Q760 880 780 883" stroke="#2a1a08" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M820 880 Q840 877 860 879" stroke="#2a1a08" strokeWidth="0.8" fill="none" opacity="0.3" />
        <path d="M920 878 Q940 875 960 877" stroke="#2a1a08" strokeWidth="0.8" fill="none" opacity="0.25" />

        {/* Moss growing on top */}
        <path
          d="M730 882 Q770 874 810 877 Q860 872 900 875 Q950 870 1000 874"
          stroke="url(#log-moss-top)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Broken branch stump on log */}
        <path d="M850 876 Q848 860 852 850" stroke="#3a2a18" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="851" cy="848" rx="4" ry="3" fill="#2a1a10" />

        {/* Small mushrooms on log */}
        <g transform="translate(780, 878)">
          <path d="M0 0 L0 -6" stroke="#d8c8a0" strokeWidth="1" />
          <ellipse cx="0" cy="-7" rx="4" ry="2.5" fill="#c0a060" opacity="0.5" />
          <ellipse cx="0" cy="-7" rx="3" ry="1.5" fill="#d4b878" opacity="0.3" />
        </g>
        <g transform="translate(790, 879)">
          <path d="M0 0 L0 -4" stroke="#d8c8a0" strokeWidth="0.8" />
          <ellipse cx="0" cy="-5" rx="3" ry="2" fill="#b89858" opacity="0.4" />
        </g>
        <g transform="translate(940, 874)">
          <path d="M0 0 L0 -5" stroke="#d8c8a0" strokeWidth="0.8" />
          <ellipse cx="0" cy="-6" rx="3.5" ry="2" fill="#c0a060" opacity="0.45" />
        </g>
      </g>

      {/* ============================================ */}
      {/* === MOSSY ROCKS scattered across ground === */}
      {/* ============================================ */}

      {/* Large rock — left of pond 1 */}
      <g opacity="0.4">
        <path d="M200 870 Q210 840 240 835 Q270 832 290 845 Q300 860 290 878 Q260 888 230 885 Q205 882 200 870Z"
          fill="url(#rock-dark)" />
        <path d="M210 855 Q230 840 260 838 Q280 840 285 850"
          fill="url(#rock-moss)" opacity="0.5" />
      </g>

      {/* Medium rock — between ponds */}
      <g opacity="0.35">
        <path d="M1050 860 Q1060 842 1080 838 Q1100 836 1110 848 Q1115 860 1105 868 Q1085 874 1065 870 Q1052 866 1050 860Z"
          fill="url(#rock-dark)" />
        <path d="M1058 850 Q1072 840 1090 839 Q1102 842 1106 850"
          fill="url(#rock-moss)" opacity="0.45" />
      </g>

      {/* Small rock cluster — right side */}
      <g opacity="0.3">
        <ellipse cx="1600" cy="852" rx="20" ry="12" fill="#3a3a28" />
        <ellipse cx="1600" cy="848" rx="16" ry="7" fill="#2a4a1a" opacity="0.4" />
        <ellipse cx="1620" cy="858" rx="12" ry="8" fill="#3a3828" />
        <ellipse cx="1620" cy="855" rx="9" ry="5" fill="#2a4a1a" opacity="0.35" />
      </g>

      {/* Tiny pebbles near ponds */}
      <circle cx="350" cy="885" r="3" fill="#3a3a28" opacity="0.2" />
      <circle cx="360" cy="888" r="2" fill="#4a4a30" opacity="0.15" />
      <circle cx="635" cy="878" r="2.5" fill="#3a3a28" opacity="0.18" />
      <circle cx="1280" cy="858" r="2" fill="#3a3a28" opacity="0.15" />
      <circle cx="1480" cy="852" r="2.5" fill="#4a4a30" opacity="0.12" />

      {/* ============================================ */}
      {/* === EXPOSED ROOTS snaking across ground === */}
      {/* ============================================ */}
      <g opacity="0.25">
        {/* Root system from left */}
        <path d="M0 820 Q60 830 120 825 Q180 818 220 835 Q240 845 260 840"
          stroke="#3a2a14" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M0 835 Q40 840 80 832 Q130 825 160 838"
          stroke="#2a1a0c" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Root system from right */}
        <path d="M1920 815 Q1860 822 1800 818 Q1740 812 1700 828 Q1670 838 1650 835"
          stroke="#3a2a14" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M1920 830 Q1870 836 1820 828 Q1780 822 1750 835"
          stroke="#2a1a0c" strokeWidth="2.5" fill="none" strokeLinecap="round" />

        {/* Mid roots */}
        <path d="M680 860 Q720 855 760 862 Q790 870 820 865"
          stroke="#3a2a14" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* ============================================ */}
      {/* === GROUND COVER — ferns & small plants === */}
      {/* ============================================ */}
      <g opacity="0.3">
        {/* Small fern clump — left */}
        <path d="M130 810 Q135 790 140 780" stroke="#2a5a1a" strokeWidth="1" fill="none" />
        <path d="M133 800 L125 795" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />
        <path d="M136 793 L130 787" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />
        <path d="M137 798 L144 793" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />
        <path d="M139 790 L145 784" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />

        {/* Small fern — right of log */}
        <path d="M1050 870 Q1053 855 1055 845" stroke="#2a5a1a" strokeWidth="1" fill="none" />
        <path d="M1052 860 L1045 856" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />
        <path d="M1053 853 L1047 848" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />
        <path d="M1054 858 L1060 854" stroke="#2a5a1a" strokeWidth="0.8" fill="none" />

        {/* Ground moss patches */}
        <ellipse cx="500" cy="898" rx="40" ry="6" fill="#1a4a12" opacity="0.3" />
        <ellipse cx="1200" cy="870" rx="35" ry="5" fill="#1a4a12" opacity="0.25" />
        <ellipse cx="850" cy="905" rx="50" ry="7" fill="#1a4a12" opacity="0.2" />
      </g>
    </svg>
  )
}
