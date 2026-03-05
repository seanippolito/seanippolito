export function FarTrees() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="trunk-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a2e15" />
          <stop offset="100%" stopColor="#0d1a0a" />
        </linearGradient>
        <linearGradient id="canopy-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#132a10" />
          <stop offset="100%" stopColor="#0a1f0a" />
        </linearGradient>
      </defs>

      {/* LEFT SIDE — Dense tree cluster */}
      {/* Large kapok tree trunk */}
      <path
        d="M80 1080 L60 600 Q55 580 50 560 L50 420 Q48 380 55 350 Q60 340 65 350 Q72 380 70 420 L70 560 Q75 580 80 600 L100 1080Z"
        fill="url(#trunk-grad)"
      />
      {/* Buttress roots */}
      <path d="M50 900 Q20 950 -10 1000 L30 1080 L80 1080 L60 900Z" fill="#0d1a0a" opacity="0.8" />
      <path d="M70 920 Q110 960 140 1020 L120 1080 L80 1080 L80 920Z" fill="#0d1a0a" opacity="0.7" />

      {/* Left canopy mass */}
      <path
        d="M-100 300 Q-50 200 30 250 Q80 180 140 230 Q200 160 250 220 Q280 200 300 240
           Q320 280 280 320 Q250 380 200 370 Q150 400 100 380 Q50 420 0 390 Q-50 370 -80 340 Z"
        fill="url(#canopy-grad)"
        opacity="0.9"
      />
      <path
        d="M-60 350 Q-20 300 40 320 Q90 280 150 310 Q200 270 240 300
           Q260 340 220 370 Q180 400 130 390 Q80 420 30 400 Q-20 380 -50 360 Z"
        fill="#0f2510"
        opacity="0.7"
      />

      {/* Secondary left tree */}
      <path d="M220 1080 L210 550 Q208 530 215 510 L225 510 Q232 530 230 550 L240 1080Z" fill="#0d1a0a" opacity="0.6" />
      <path
        d="M140 480 Q180 420 230 450 Q280 400 320 440 Q340 480 300 510 Q260 540 220 520 Q180 550 150 520 Z"
        fill="#0a1f0a"
        opacity="0.5"
      />

      {/* RIGHT SIDE — Tree cluster */}
      {/* Main right trunk */}
      <path
        d="M1820 1080 L1810 580 Q1805 540 1810 500 Q1815 480 1820 500 Q1825 540 1830 580 L1840 1080Z"
        fill="url(#trunk-grad)"
      />
      <path d="M1810 880 Q1770 940 1740 1020 L1780 1080 L1820 1080 L1815 880Z" fill="#0d1a0a" opacity="0.7" />
      <path d="M1830 900 Q1870 960 1920 1020 L1920 1080 L1840 1080 L1835 900Z" fill="#0d1a0a" opacity="0.6" />

      {/* Right canopy */}
      <path
        d="M1620 280 Q1680 200 1750 240 Q1800 180 1860 230 Q1920 190 1980 250
           Q2000 300 1960 340 Q1920 380 1860 360 Q1800 400 1740 370 Q1680 390 1640 350 Z"
        fill="url(#canopy-grad)"
        opacity="0.9"
      />
      <path
        d="M1660 320 Q1720 270 1780 300 Q1830 260 1880 290
           Q1900 330 1860 360 Q1810 390 1760 370 Q1700 400 1670 360 Z"
        fill="#0f2510"
        opacity="0.6"
      />

      {/* Secondary right tree */}
      <path d="M1680 1080 L1675 620 Q1673 600 1678 580 L1688 580 Q1693 600 1690 620 L1700 1080Z" fill="#0d1a0a" opacity="0.5" />

      {/* CENTER DISTANCE — Faded silhouette trees */}
      <path
        d="M600 1080 L610 700 Q615 680 620 700 L630 1080Z"
        fill="#0a1a0a"
        opacity="0.25"
      />
      <path
        d="M560 680 Q590 620 630 660 Q660 630 690 660 Q700 700 670 720 Q630 740 590 720 Z"
        fill="#0a1a0a"
        opacity="0.2"
      />

      <path
        d="M1280 1080 L1290 720 Q1295 700 1300 720 L1310 1080Z"
        fill="#0a1a0a"
        opacity="0.2"
      />
      <path
        d="M1250 700 Q1280 650 1310 680 Q1340 650 1360 680 Q1370 720 1340 740 Q1300 760 1270 740 Z"
        fill="#0a1a0a"
        opacity="0.18"
      />

      {/* Distant palm silhouette */}
      <path d="M480 1080 L485 750 Q487 740 490 750 L495 1080Z" fill="#081508" opacity="0.15" />
      <path d="M488 750 Q450 700 400 720 Q420 710 440 690 Q460 710 488 740Z" fill="#081508" opacity="0.12" />
      <path d="M488 745 Q530 690 570 715 Q550 700 535 685 Q510 710 488 740Z" fill="#081508" opacity="0.12" />

      {/* Ground floor vegetation mass */}
      <path
        d="M0 1080 Q200 1000 400 1040 Q600 1000 800 1050 Q1000 1010 1200 1050
           Q1400 1000 1600 1040 Q1800 1010 1920 1060 L1920 1080Z"
        fill="#0a1a0a"
        opacity="0.4"
      />
    </svg>
  )
}
