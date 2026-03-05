interface AnimalsProps {
  mouseX: number // -1 to 1
  mouseY: number // -1 to 1
}

export function Animals({ mouseX, mouseY }: AnimalsProps) {
  // === TOUCAN — turns head, blinks at edges ===
  const toucanRotation = mouseX * 12
  const toucanBlink = Math.abs(mouseX) > 0.8 ? 0.5 : 2.5

  // === GORILLA — peeks up from behind lower-right foliage ===
  // More visible when mouse is near lower-right
  const gorillaProximityX = Math.max(0, mouseX + 0.2)
  const gorillaProximityY = Math.max(0, mouseY + 0.2)
  const gorillaPeek = (gorillaProximityX + gorillaProximityY) * 18
  const gorillaEyeTrack = mouseX * 2.5
  const gorillaBrow = mouseY < -0.3 ? -2 : 0 // furrows brow when mouse goes up

  // === JAGUAR — crouches behind left ground foliage, eyes glow when mouse is near ===
  const jaguarProximityX = Math.max(0, -mouseX + 0.3)
  const jaguarProximityY = Math.max(0, mouseY + 0.3)
  const jaguarReveal = (jaguarProximityX + jaguarProximityY) * 15
  const jaguarEyeGlow = Math.max(0, jaguarReveal / 30)
  const jaguarEarTwitch = mouseX * 4

  // === ANACONDA — thick body draped on right-side branches ===
  const anacondaShift = mouseX * 8
  const anacondaTongue = Math.abs(mouseX) > 0.6

  // === MONKEY — peeks from upper-right canopy ===
  const monkeyPeek = Math.max(0, (mouseX + 0.3)) * 22
  const monkeyEarWiggle = mouseY * 3

  // === TREE FROG — on left vine ===
  const frogShift = mouseY * 8
  const frogThroat = Math.abs(mouseY) > 0.5 // puffs throat when mouse is at extremes

  // === BUTTERFLY — drifts through center ===
  const butterflyX = 960 + mouseX * 80
  const butterflyY = 180 + mouseY * 50
  const butterflyWing = Math.sin(Date.now() * 0.003) > 0 // won't animate in SVG but sets initial

  return (
    <svg
      viewBox="0 0 1920 1080"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="eye-shine" cx="30%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="jaguar-eye-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d4a030" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a07020" stopOpacity="0" />
        </radialGradient>
        <filter id="animal-shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ============================================ */}
      {/* === JAGUAR — crouching in lower-left === */}
      {/* ============================================ */}
      <g
        transform={`translate(350, ${850 - jaguarReveal})`}
        style={{ transition: "transform 0.7s ease-out" }}
        opacity={0.4 + Math.min(jaguarReveal / 30, 0.55)}
      >
        {/* Body — muscular, low crouch */}
        <ellipse cx="0" cy="15" rx="45" ry="22" fill="#c89030" opacity="0.7" />
        {/* Rosette spots on body */}
        <circle cx="-15" cy="10" r="3" fill="#8a6020" opacity="0.4" />
        <circle cx="-15" cy="10" r="1.5" fill="#c89030" opacity="0.3" />
        <circle cx="5" cy="8" r="3.5" fill="#8a6020" opacity="0.4" />
        <circle cx="5" cy="8" r="1.8" fill="#c89030" opacity="0.3" />
        <circle cx="20" cy="12" r="3" fill="#8a6020" opacity="0.4" />
        <circle cx="20" cy="12" r="1.5" fill="#c89030" opacity="0.3" />
        <circle cx="-30" cy="15" r="2.5" fill="#8a6020" opacity="0.35" />
        <circle cx="35" cy="18" r="2.5" fill="#8a6020" opacity="0.35" />
        {/* Head */}
        <ellipse cx="-40" cy="0" rx="22" ry="18" fill="#d0a040" />
        {/* Muzzle */}
        <ellipse cx="-52" cy="5" rx="12" ry="9" fill="#dab060" />
        {/* Nose */}
        <ellipse cx="-56" cy="3" rx="4" ry="3" fill="#4a3020" />
        {/* Mouth line */}
        <path d="M-56 6 Q-52 10 -48 6" stroke="#6a4a20" strokeWidth="0.8" fill="none" />
        {/* Ears */}
        <ellipse
          cx="-32"
          cy="-16"
          rx="6"
          ry="8"
          fill="#c89a40"
          transform={`rotate(${-15 + jaguarEarTwitch} -32 -16)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="-32" cy="-15" rx="3" ry="4.5" fill="#dab060" transform={`rotate(${-15 + jaguarEarTwitch} -32 -15)`} />
        <ellipse
          cx="-48"
          cy="-14"
          rx="5.5"
          ry="7.5"
          fill="#c89a40"
          transform={`rotate(${15 + jaguarEarTwitch} -48 -14)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="-48" cy="-13" rx="3" ry="4" fill="#dab060" transform={`rotate(${15 + jaguarEarTwitch} -48 -13)`} />
        {/* EYES — glowing amber, the signature */}
        <g>
          <ellipse cx="-45" cy="-3" rx="5" ry="4" fill="#1a1a0a" />
          <ellipse cx="-45" cy="-3" rx="4" ry="3.5" fill={`rgba(212, 160, 48, ${0.5 + jaguarEyeGlow * 0.5})`} />
          <ellipse cx="-45" cy="-3" rx="1.5" ry="3" fill="#1a1a0a" />
          {/* Eye glow halo */}
          <ellipse cx="-45" cy="-3" rx="8" ry="6" fill="url(#jaguar-eye-glow)" opacity={jaguarEyeGlow * 0.4} />
          <circle cx="-46" cy="-4" r="1" fill="#ffffff" opacity={0.3 + jaguarEyeGlow * 0.3} />
        </g>
        <g>
          <ellipse cx="-35" cy="-3" rx="5" ry="4" fill="#1a1a0a" />
          <ellipse cx="-35" cy="-3" rx="4" ry="3.5" fill={`rgba(212, 160, 48, ${0.5 + jaguarEyeGlow * 0.5})`} />
          <ellipse cx="-35" cy="-3" rx="1.5" ry="3" fill="#1a1a0a" />
          <ellipse cx="-35" cy="-3" rx="8" ry="6" fill="url(#jaguar-eye-glow)" opacity={jaguarEyeGlow * 0.4} />
          <circle cx="-36" cy="-4" r="1" fill="#ffffff" opacity={0.3 + jaguarEyeGlow * 0.3} />
        </g>
        {/* Face spots */}
        <circle cx="-44" cy="5" r="1.5" fill="#6a4a20" opacity="0.3" />
        <circle cx="-36" cy="5" r="1.5" fill="#6a4a20" opacity="0.3" />
        <circle cx="-50" cy="8" r="1" fill="#6a4a20" opacity="0.25" />
        {/* Whiskers */}
        <path d="M-56 5 L-70 2" stroke="#dab060" strokeWidth="0.5" opacity="0.3" />
        <path d="M-56 7 L-72 8" stroke="#dab060" strokeWidth="0.5" opacity="0.3" />
        <path d="M-56 5 L-68 -2" stroke="#dab060" strokeWidth="0.5" opacity="0.25" />
        {/* Front paws visible */}
        <ellipse cx="-50" cy="30" rx="8" ry="5" fill="#c89030" />
        <ellipse cx="-35" cy="32" rx="7" ry="4.5" fill="#c89030" />
        {/* Tail curving behind */}
        <path d="M45 15 Q65 5 75 15 Q85 30 75 40" stroke="#c89030" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="72" cy="22" r="2" fill="#8a6020" opacity="0.3" />
        <circle cx="80" cy="32" r="2" fill="#8a6020" opacity="0.3" />
      </g>

      {/* ============================================ */}
      {/* === GORILLA — behind lower-right foliage === */}
      {/* ============================================ */}
      <g
        transform={`translate(1550, ${880 - gorillaPeek})`}
        style={{ transition: "transform 0.6s ease-out" }}
        opacity={0.35 + Math.min(gorillaPeek / 36, 0.6)}
      >
        {/* Massive shoulders */}
        <ellipse cx="0" cy="25" rx="50" ry="35" fill="#2a2a2a" opacity="0.6" />
        {/* Head */}
        <ellipse cx="0" cy="-5" rx="28" ry="25" fill="#3a3a3a" />
        {/* Sagittal crest */}
        <path d="M-10 -28 Q0 -38 10 -28" fill="#2a2a2a" />
        {/* Face */}
        <ellipse cx="0" cy="2" rx="20" ry="18" fill="#1a1a1a" />
        {/* Brow ridge — heavy, expressive */}
        <path
          d={`M-18 ${-8 + gorillaBrow} Q-10 ${-14 + gorillaBrow} 0 ${-10 + gorillaBrow} Q10 ${-14 + gorillaBrow} 18 ${-8 + gorillaBrow}`}
          fill="#2a2a2a"
          style={{ transition: "d 0.4s ease-out" }}
        />
        {/* Eyes — deep-set, intelligent */}
        <ellipse cx={-8 + gorillaEyeTrack} cy="-4" rx="4" ry="3" fill="#4a3020" />
        <circle cx={-7.5 + gorillaEyeTrack} cy="-4.5" r="1" fill="#f0e8d0" opacity="0.4" />
        <ellipse cx={8 + gorillaEyeTrack} cy="-4" rx="4" ry="3" fill="#4a3020" />
        <circle cx={8.5 + gorillaEyeTrack} cy="-4.5" r="1" fill="#f0e8d0" opacity="0.4" />
        {/* Nose — broad, flat */}
        <ellipse cx="0" cy="5" rx="10" ry="7" fill="#1a1a1a" />
        <ellipse cx="-4" cy="6" rx="3" ry="2.5" fill="#2a2a2a" />
        <ellipse cx="4" cy="6" rx="3" ry="2.5" fill="#2a2a2a" />
        {/* Mouth */}
        <path d="M-8 12 Q0 16 8 12" stroke="#3a3a3a" strokeWidth="1" fill="none" />
        {/* Silver back streak */}
        <path d="M-20 10 Q-30 25 -25 45" stroke="#6a6a6a" strokeWidth="3" fill="none" opacity="0.2" />
        <path d="M20 10 Q30 25 25 45" stroke="#6a6a6a" strokeWidth="3" fill="none" opacity="0.2" />
        {/* Hands gripping ground */}
        <g transform="translate(-35, 40)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#2a2a2a" />
          <path d="M-8 -3 Q-6 -8 -3 -3" fill="#1a1a1a" opacity="0.5" />
          <path d="M-3 -4 Q-1 -9 2 -4" fill="#1a1a1a" opacity="0.5" />
          <path d="M2 -3 Q4 -8 7 -3" fill="#1a1a1a" opacity="0.5" />
        </g>
        <g transform="translate(35, 42)">
          <ellipse cx="0" cy="0" rx="11" ry="7" fill="#2a2a2a" />
        </g>
      </g>

      {/* ============================================ */}
      {/* === ANACONDA — draped on right branches === */}
      {/* ============================================ */}
      <g
        transform={`translate(${1780 + anacondaShift}, 280)`}
        style={{ transition: "transform 0.5s ease-out" }}
        opacity="0.55"
      >
        {/* Thick body draped across branches */}
        <path
          d="M-60 0 Q-40 -15 -20 5 Q0 20 20 0 Q40 -20 60 -5 Q80 10 100 -10 Q110 -20 115 -15"
          stroke="#4a6a20"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* Pattern overlay — darker diamond pattern */}
        <path
          d="M-60 0 Q-40 -15 -20 5 Q0 20 20 0 Q40 -20 60 -5 Q80 10 100 -10 Q110 -20 115 -15"
          stroke="#3a5a18"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="8 12"
        />
        {/* Belly — lighter underside visible at curves */}
        <path
          d="M-15 8 Q0 22 15 5"
          stroke="#8aa050"
          strokeWidth="4"
          fill="none"
          opacity="0.3"
        />
        {/* Head */}
        <g transform="translate(-70, 5)">
          <ellipse cx="0" cy="0" rx="12" ry="8" fill="#4a6a20" />
          <ellipse cx="-5" cy="1" rx="8" ry="5" fill="#5a7a28" />
          {/* Eyes — vertical slits */}
          <ellipse cx="-3" cy="-2" rx="2.5" ry="2" fill="#d4a030" opacity="0.7" />
          <ellipse cx="-3" cy="-2" rx="0.8" ry="2" fill="#1a1a0a" />
          <ellipse cx="3" cy="-2" rx="2.5" ry="2" fill="#d4a030" opacity="0.7" />
          <ellipse cx="3" cy="-2" rx="0.8" ry="2" fill="#1a1a0a" />
          {/* Nostril pits */}
          <circle cx="-8" cy="0" r="1" fill="#3a5a18" />
          <circle cx="-8" cy="2" r="1" fill="#3a5a18" />
          {/* Forked tongue — flicks out when mouse is at edges */}
          {anacondaTongue && (
            <g opacity="0.6">
              <path d="M-12 1 L-22 -1 L-25 -3" stroke="#c04040" strokeWidth="0.8" fill="none" />
              <path d="M-22 -1 L-25 1" stroke="#c04040" strokeWidth="0.8" fill="none" />
            </g>
          )}
        </g>
        {/* Tail tapering off */}
        <path
          d="M115 -15 Q125 -10 132 -15 Q138 -20 142 -18"
          stroke="#4a6a20"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* ============================================ */}
      {/* === TOUCAN — on left branch === */}
      {/* ============================================ */}
      <g
        transform={`translate(280, 370) rotate(${toucanRotation} 0 0)`}
        style={{ transition: "transform 0.4s ease-out" }}
      >
        <ellipse cx="0" cy="0" rx="18" ry="24" fill="#1a1a1a" />
        <ellipse cx="0" cy="5" rx="14" ry="16" fill="#2a2a2a" />
        <ellipse cx="0" cy="10" rx="10" ry="12" fill="#c8a830" opacity="0.7" />
        <ellipse cx="2" cy="-24" rx="12" ry="13" fill="#1a1a1a" />
        {/* Beak */}
        <path d="M12 -28 Q35 -22 40 -18 Q38 -15 12 -20Z" fill="#e87030" />
        <path d="M12 -20 Q35 -18 38 -15 Q35 -12 12 -17Z" fill="#d4a020" />
        <path d="M38 -18 Q42 -17 40 -15Z" fill="#2a2a2a" />
        {/* Eye */}
        <circle cx="8" cy="-26" r={toucanBlink} fill="#1a4a6a" />
        <circle cx="8" cy="-26" r={toucanBlink} fill="url(#eye-shine)" />
        <circle cx="7" cy="-27" r="0.8" fill="#ffffff" opacity="0.6" />
        {/* Tail */}
        <path d="M-8 20 Q-20 45 -15 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
        <path d="M0 22 Q-12 50 -8 68" stroke="#2a2a2a" strokeWidth="3" fill="none" />
        <path d="M-6 24 L-10 30 L-4 30Z" fill="#4a4a4a" />
        <path d="M6 24 L3 30 L9 30Z" fill="#4a4a4a" />
      </g>

      {/* ============================================ */}
      {/* === MONKEY — upper right canopy === */}
      {/* ============================================ */}
      <g
        transform={`translate(1700, ${350 - monkeyPeek})`}
        style={{ transition: "transform 0.5s ease-out" }}
        opacity={0.6 + Math.min(monkeyPeek / 22, 0.35)}
      >
        <ellipse cx="0" cy="30" rx="18" ry="22" fill="#5a3a1a" opacity="0.4" />
        <ellipse cx="0" cy="0" rx="20" ry="18" fill="#6a4a2a" />
        <ellipse cx="0" cy="2" rx="14" ry="12" fill="#8a6a4a" />
        <ellipse cx="-6" cy="-2" rx="4" ry="3.5" fill="#f0e8d0" />
        <circle cx="-6" cy="-1.5" r="2" fill="#2a1a0a" />
        <circle cx="-5.5" cy="-2" r="0.7" fill="#ffffff" opacity="0.5" />
        <ellipse cx="6" cy="-2" rx="4" ry="3.5" fill="#f0e8d0" />
        <circle cx="6" cy="-1.5" r="2" fill="#2a1a0a" />
        <circle cx="6.5" cy="-2" r="0.7" fill="#ffffff" opacity="0.5" />
        <ellipse cx="0" cy="5" rx="5" ry="3" fill="#7a5a3a" />
        <path d="M-2 6 Q0 8 2 6" stroke="#5a3a1a" strokeWidth="0.8" fill="none" />
        <ellipse
          cx="-18" cy="-6" rx="6" ry="7" fill="#6a4a2a"
          transform={`rotate(${monkeyEarWiggle} -18 -6)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="-18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
        <ellipse
          cx="18" cy="-6" rx="6" ry="7" fill="#6a4a2a"
          transform={`rotate(${-monkeyEarWiggle} 18 -6)`}
          style={{ transition: "transform 0.3s ease-out" }}
        />
        <ellipse cx="18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
        <path d="M-22 15 Q-28 12 -30 18 Q-28 22 -22 20Z" fill="#6a4a2a" />
      </g>

      {/* ============================================ */}
      {/* === TREE FROG — on left vine === */}
      {/* ============================================ */}
      <g
        transform={`translate(172, ${480 + frogShift})`}
        style={{ transition: "transform 0.6s ease-out" }}
        opacity="0.7"
      >
        <ellipse cx="0" cy="0" rx="7" ry="6" fill="#20c040" />
        {/* Throat pouch — puffs when mouse at extremes */}
        <ellipse
          cx="0"
          cy="5"
          rx={frogThroat ? 6 : 4}
          ry={frogThroat ? 5 : 3}
          fill="#30d050"
          opacity="0.6"
          style={{ transition: "all 0.4s ease-out" }}
        />
        <ellipse cx="0" cy="-5" rx="6" ry="5" fill="#28cc45" />
        {/* Red eyes — iconic */}
        <circle cx="-5" cy="-9" r="3.5" fill="#e03020" />
        <circle cx="-5" cy="-9" r="2" fill="#1a1a1a" />
        <ellipse cx="-5" cy="-9" rx="1.2" ry="2" fill="#1a1a1a" />
        <circle cx="-5.5" cy="-9.5" r="0.6" fill="#ffffff" opacity="0.5" />
        <circle cx="5" cy="-9" r="3.5" fill="#e03020" />
        <circle cx="5" cy="-9" r="2" fill="#1a1a1a" />
        <ellipse cx="5" cy="-9" rx="1.2" ry="2" fill="#1a1a1a" />
        <circle cx="5.5" cy="-9.5" r="0.6" fill="#ffffff" opacity="0.5" />
        {/* Blue/black stripe detail */}
        <path d="M-6 -2 Q-7 2 -5 5" stroke="#1a3a80" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M6 -2 Q7 2 5 5" stroke="#1a3a80" strokeWidth="1" fill="none" opacity="0.5" />
        {/* Legs */}
        <path d="M-6 3 L-11 8 L-9 9 L-5 5Z" fill="#1eaa35" />
        <path d="M6 3 L11 8 L9 9 L5 5Z" fill="#1eaa35" />
        {/* Orange toe pads */}
        <circle cx="-11" cy="8" r="1.5" fill="#f08030" opacity="0.7" />
        <circle cx="11" cy="8" r="1.5" fill="#f08030" opacity="0.7" />
      </g>

      {/* ============================================ */}
      {/* === BUTTERFLY — morpho, electric blue === */}
      {/* ============================================ */}
      <g
        transform={`translate(${butterflyX}, ${butterflyY}) scale(${butterflyWing ? 1 : 0.95})`}
        style={{ transition: "transform 1.2s ease-out" }}
        opacity="0.4"
      >
        <path d="M0 0 Q-15 -10 -14 -24 Q-8 -30 0 -18Z" fill="#2060e0" />
        <path d="M0 0 Q15 -10 14 -24 Q8 -30 0 -18Z" fill="#1850d0" />
        <path d="M0 0 Q-10 8 -9 18 Q-5 22 0 12Z" fill="#2060e0" opacity="0.8" />
        <path d="M0 0 Q10 8 9 18 Q5 22 0 12Z" fill="#1850d0" opacity="0.8" />
        {/* Iridescent shimmer */}
        <path d="M-3 -12 Q-8 -18 -5 -22" stroke="#60a0ff" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M3 -12 Q8 -18 5 -22" stroke="#60a0ff" strokeWidth="1" fill="none" opacity="0.3" />
        <ellipse cx="0" cy="0" rx="1.2" ry="8" fill="#1a1a3a" />
        <circle cx="-8" cy="-16" r="2.5" fill="#ffffff" opacity="0.2" />
        <circle cx="8" cy="-16" r="2.5" fill="#ffffff" opacity="0.2" />
        {/* Antennae */}
        <path d="M-1 -8 Q-4 -14 -6 -16" stroke="#1a1a3a" strokeWidth="0.5" fill="none" />
        <path d="M1 -8 Q4 -14 6 -16" stroke="#1a1a3a" strokeWidth="0.5" fill="none" />
        <circle cx="-6" cy="-16" r="0.8" fill="#1a1a3a" />
        <circle cx="6" cy="-16" r="0.8" fill="#1a1a3a" />
      </g>

      {/* ============================================ */}
      {/* === SMALL HIDDEN DETAILS === */}
      {/* ============================================ */}

      {/* Pair of glowing eyes deep in left foliage (unknown creature) */}
      <circle cx="120" cy="720" r="1.5" fill="#d4a030" opacity={0.15 + mouseY * 0.1} />
      <circle cx="127" cy="720" r="1.5" fill="#d4a030" opacity={0.15 + mouseY * 0.1} />

      {/* Tiny gecko on right tree trunk */}
      <g transform="translate(1825, 650)" opacity="0.25">
        <ellipse cx="0" cy="0" rx="3" ry="6" fill="#5a8a40" />
        <circle cx="0" cy="-6" r="2.5" fill="#5a8a40" />
        <circle cx="-1.5" cy="-7" r="0.8" fill="#1a1a0a" />
        <circle cx="1.5" cy="-7" r="0.8" fill="#1a1a0a" />
        <path d="M0 6 Q-2 12 0 18" stroke="#5a8a40" strokeWidth="1" fill="none" />
      </g>
    </svg>
  )
}
