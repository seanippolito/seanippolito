interface AnimalsProps {
  mouseX: number
  mouseY: number
}

export function Animals({ mouseX, mouseY }: AnimalsProps) {
  // Toucan on left branch — turns head and shifts body
  const toucanRotation = mouseX * 12
  const toucanBlink = Math.abs(mouseX) > 0.8 ? 0.5 : 2.5

  // Monkey peeking from right — more visible when mouse is near right side
  const monkeyPeek = Math.max(0, (mouseX + 0.3)) * 25
  const monkeyEarWiggle = mouseY * 3

  // Tree frog on left vine — subtle shift
  const frogShift = mouseY * 8

  // Butterfly — gentle drift based on mouse
  const butterflyX = 960 + mouseX * 60
  const butterflyY = 200 + mouseY * 40

  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="eye-shine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* === TOUCAN on left branch === */}
      <g
        transform={`translate(280, 370) rotate(${toucanRotation} 0 0)`}
        style={{ transition: "transform 0.4s ease-out" }}
      >
        {/* Body */}
        <ellipse cx="0" cy="0" rx="18" ry="24" fill="#1a1a1a" />
        <ellipse cx="0" cy="5" rx="14" ry="16" fill="#2a2a2a" />
        {/* Chest patch */}
        <ellipse cx="0" cy="10" rx="10" ry="12" fill="#c8a830" opacity="0.7" />
        {/* Head */}
        <ellipse cx="2" cy="-24" rx="12" ry="13" fill="#1a1a1a" />
        {/* Beak — colorful! */}
        <path d="M12 -28 Q35 -22 40 -18 Q38 -15 12 -20Z" fill="#e87030" />
        <path d="M12 -20 Q35 -18 38 -15 Q35 -12 12 -17Z" fill="#d4a020" />
        <path d="M38 -18 Q42 -17 40 -15Z" fill="#2a2a2a" />
        {/* Eye */}
        <circle cx="8" cy="-26" r={toucanBlink} fill="#1a4a6a" />
        <circle cx="8" cy="-26" r={toucanBlink} fill="url(#eye-shine)" />
        <circle cx="7" cy="-27" r="0.8" fill="#ffffff" opacity="0.6" />
        {/* Tail feathers */}
        <path d="M-8 20 Q-20 45 -15 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
        <path d="M0 22 Q-12 50 -8 68" stroke="#2a2a2a" strokeWidth="3" fill="none" />
        {/* Feet */}
        <path d="M-6 24 L-10 30 L-4 30Z" fill="#4a4a4a" />
        <path d="M6 24 L3 30 L9 30Z" fill="#4a4a4a" />
      </g>

      {/* === MONKEY peeking from right canopy === */}
      <g
        transform={`translate(1700, ${380 - monkeyPeek})`}
        style={{ transition: "transform 0.5s ease-out" }}
        opacity={0.7 + Math.min(monkeyPeek / 25, 0.3)}
      >
        {/* Body hint behind tree */}
        <ellipse cx="0" cy="30" rx="20" ry="25" fill="#5a3a1a" opacity="0.4" />
        {/* Head */}
        <ellipse cx="0" cy="0" rx="20" ry="18" fill="#6a4a2a" />
        {/* Face */}
        <ellipse cx="0" cy="2" rx="14" ry="12" fill="#8a6a4a" />
        {/* Eyes */}
        <ellipse cx="-6" cy="-2" rx="4" ry="3.5" fill="#f0e8d0" />
        <circle cx="-6" cy="-1.5" r="2" fill="#2a1a0a" />
        <circle cx="-5.5" cy="-2" r="0.7" fill="#ffffff" opacity="0.5" />
        <ellipse cx="6" cy="-2" rx="4" ry="3.5" fill="#f0e8d0" />
        <circle cx="6" cy="-1.5" r="2" fill="#2a1a0a" />
        <circle cx="6.5" cy="-2" r="0.7" fill="#ffffff" opacity="0.5" />
        {/* Nose/mouth */}
        <ellipse cx="0" cy="5" rx="5" ry="3" fill="#7a5a3a" />
        <path d="M-2 6 Q0 8 2 6" stroke="#5a3a1a" strokeWidth="0.8" fill="none" />
        {/* Ears */}
        <ellipse
          cx="-18"
          cy="-6"
          rx="6"
          ry="7"
          fill="#6a4a2a"
          transform={`rotate(${monkeyEarWiggle} -18 -6)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="-18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
        <ellipse
          cx="18"
          cy="-6"
          rx="6"
          ry="7"
          fill="#6a4a2a"
          transform={`rotate(${-monkeyEarWiggle} 18 -6)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
        {/* Hand gripping branch */}
        <path d="M-22 15 Q-28 12 -30 18 Q-28 22 -22 20Z" fill="#6a4a2a" />
      </g>

      {/* === TREE FROG on left vine area === */}
      <g
        transform={`translate(172, ${480 + frogShift})`}
        style={{ transition: "transform 0.6s ease-out" }}
        opacity="0.65"
      >
        {/* Body */}
        <ellipse cx="0" cy="0" rx="6" ry="5" fill="#2aaa3a" />
        {/* Head */}
        <ellipse cx="0" cy="-5" rx="5" ry="4" fill="#30b842" />
        {/* Eyes — big bulging frog eyes */}
        <circle cx="-4" cy="-8" r="3" fill="#30b842" />
        <circle cx="-4" cy="-8" r="2" fill="#1a1a1a" />
        <circle cx="-3.5" cy="-8.5" r="0.6" fill="#d4a030" />
        <circle cx="4" cy="-8" r="3" fill="#30b842" />
        <circle cx="4" cy="-8" r="2" fill="#1a1a1a" />
        <circle cx="4.5" cy="-8.5" r="0.6" fill="#d4a030" />
        {/* Front legs */}
        <path d="M-5 2 L-9 6 L-7 7 L-4 4Z" fill="#28a035" />
        <path d="M5 2 L9 6 L7 7 L4 4Z" fill="#28a035" />
        {/* Toe pads */}
        <circle cx="-9" cy="6" r="1.2" fill="#f08030" opacity="0.6" />
        <circle cx="9" cy="6" r="1.2" fill="#f08030" opacity="0.6" />
      </g>

      {/* === BUTTERFLY drifting through center === */}
      <g
        transform={`translate(${butterflyX}, ${butterflyY})`}
        style={{ transition: "transform 1s ease-out" }}
        opacity="0.35"
      >
        {/* Wings */}
        <path d="M0 0 Q-12 -8 -10 -18 Q-6 -22 0 -14Z" fill="#6a8ad0" />
        <path d="M0 0 Q12 -8 10 -18 Q6 -22 0 -14Z" fill="#5a7ac0" />
        <path d="M0 0 Q-8 6 -7 14 Q-4 16 0 10Z" fill="#6a8ad0" opacity="0.8" />
        <path d="M0 0 Q8 6 7 14 Q4 16 0 10Z" fill="#5a7ac0" opacity="0.8" />
        {/* Body */}
        <ellipse cx="0" cy="0" rx="1" ry="6" fill="#2a2a4a" />
        {/* Wing spots */}
        <circle cx="-6" cy="-12" r="2" fill="#ffffff" opacity="0.3" />
        <circle cx="6" cy="-12" r="2" fill="#ffffff" opacity="0.3" />
      </g>

      {/* === SNAKE hint on far right branch (subtle) === */}
      <path
        d="M1860 290 Q1850 295 1845 300 Q1840 310 1848 315 Q1855 320 1852 330 Q1848 340 1855 345"
        stroke="#3a6a20"
        strokeWidth="3"
        fill="none"
        opacity="0.25"
        strokeLinecap="round"
      />
      {/* Snake eye */}
      <circle cx="1857" cy="345" r="1.5" fill="#d4a030" opacity="0.3" />
    </svg>
  )
}
