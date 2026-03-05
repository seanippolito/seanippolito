import { useAnimalReaction } from "../../hooks/useAnimalReaction"

interface AnimalsProps {
  mouseX: number // -1 to 1
  mouseY: number // -1 to 1
}

/** Shared SVG defs used across all animal containers */
function AnimalDefs() {
  return (
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
      <filter id="animal-3d-shadow">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>
  )
}

/** Wrapper that gives each animal a 3D tilt effect based on mouse proximity */
function Animal3D({
  children,
  x,
  y,
  width,
  height,
  mouseX,
  mouseY,
  tiltStrength = 15,
  liftOnHover = 20,
  proximityCenter,
  style,
  onClick,
  animationClass,
}: {
  children: React.ReactNode
  x: number
  y: number
  width: number
  height: number
  mouseX: number
  mouseY: number
  tiltStrength?: number
  liftOnHover?: number
  proximityCenter?: { x: number; y: number }
  style?: React.CSSProperties
  onClick?: () => void
  animationClass?: string
}) {
  const cx = proximityCenter?.x ?? 0
  const cy = proximityCenter?.y ?? 0
  const dx = mouseX - cx
  const dy = mouseY - cy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const proximity = Math.max(0, 1 - dist / 1.5)

  const rotateY = mouseX * tiltStrength * (0.4 + proximity * 0.6)
  const rotateX = -mouseY * tiltStrength * 0.6 * (0.4 + proximity * 0.6)
  const translateZ = proximity * liftOnHover
  const scale = 1 + proximity * 0.06

  return (
    <div
      className={animationClass || undefined}
      onClick={onClick}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width,
        height,
        transformStyle: "preserve-3d",
        transform: `
          rotateY(${rotateY}deg)
          rotateX(${rotateX}deg)
          translateZ(${translateZ}px)
          scale(${scale})
        `,
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
        pointerEvents: onClick ? "auto" : "none",
        cursor: "none",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Animals({ mouseX, mouseY }: AnimalsProps) {
  const jaguar = useAnimalReaction(1200)
  const gorilla = useAnimalReaction(1500)
  const anaconda = useAnimalReaction(1000)
  const toucan = useAnimalReaction(1200)
  const monkey = useAnimalReaction(1200)
  const frog = useAnimalReaction(1000)
  const butterfly = useAnimalReaction(1000)

  // === TOUCAN ===
  const toucanRotation = mouseX * 12
  const toucanBlink = Math.abs(mouseX) > 0.8 ? 0.5 : 2.5

  // === GORILLA ===
  const gorillaProximityX = Math.max(0, mouseX + 0.2)
  const gorillaProximityY = Math.max(0, mouseY + 0.2)
  const gorillaPeek = (gorillaProximityX + gorillaProximityY) * 18
  const gorillaEyeTrack = mouseX * 2.5
  const gorillaBrow = mouseY < -0.3 ? -2 : 0

  // === JAGUAR ===
  const jaguarProximityX = Math.max(0, -mouseX + 0.3)
  const jaguarProximityY = Math.max(0, mouseY + 0.3)
  const jaguarReveal = (jaguarProximityX + jaguarProximityY) * 15
  const jaguarEyeGlow = Math.max(0, jaguarReveal / 30) + (jaguar.reacting ? 0.5 : 0)
  const jaguarEarTwitch = mouseX * 4

  // === ANACONDA ===
  const anacondaShift = mouseX * 8
  const anacondaTongue = Math.abs(mouseX) > 0.6 || anaconda.reacting

  // === MONKEY ===
  const monkeyPeek = Math.max(0, (mouseX + 0.3)) * 22
  const monkeyEarWiggle = mouseY * 3

  // === TREE FROG ===
  const frogShift = mouseY * 8
  const frogThroat = Math.abs(mouseY) > 0.5

  // === BUTTERFLY ===
  const butterflyX = 48 + mouseX * 4
  const butterflyY = 14 + mouseY * 4

  return (
    <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>

      {/* === JAGUAR — crouching in lower-left === */}
      <Animal3D
        x={15}
        y={72}
        width={200}
        height={160}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={18}
        liftOnHover={30}
        proximityCenter={{ x: -0.6, y: 0.6 }}
        onClick={jaguar.trigger}
        animationClass={jaguar.reacting ? "animate-jaguar-lunge" : undefined}
      >
        <svg viewBox="-80 -40 200 120" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`translate(0, ${-jaguarReveal * 0.5})`}
            style={{ transition: "transform 0.7s ease-out" }}
            opacity={0.4 + Math.min(jaguarReveal / 30, 0.55)}
            filter="url(#animal-3d-shadow)"
          >
            <ellipse cx="0" cy="15" rx="45" ry="22" fill="#c89030" opacity="0.7" />
            <circle cx="-15" cy="10" r="3" fill="#8a6020" opacity="0.4" />
            <circle cx="-15" cy="10" r="1.5" fill="#c89030" opacity="0.3" />
            <circle cx="5" cy="8" r="3.5" fill="#8a6020" opacity="0.4" />
            <circle cx="5" cy="8" r="1.8" fill="#c89030" opacity="0.3" />
            <circle cx="20" cy="12" r="3" fill="#8a6020" opacity="0.4" />
            <circle cx="20" cy="12" r="1.5" fill="#c89030" opacity="0.3" />
            <circle cx="-30" cy="15" r="2.5" fill="#8a6020" opacity="0.35" />
            <circle cx="35" cy="18" r="2.5" fill="#8a6020" opacity="0.35" />
            <ellipse cx="-40" cy="0" rx="22" ry="18" fill="#d0a040" />
            <ellipse cx="-52" cy="5" rx="12" ry="9" fill="#dab060" />
            <ellipse cx="-56" cy="3" rx="4" ry="3" fill="#4a3020" />
            <path d="M-56 6 Q-52 10 -48 6" stroke="#6a4a20" strokeWidth="0.8" fill="none" />
            <ellipse cx="-32" cy="-16" rx="6" ry="8" fill="#c89a40"
              transform={`rotate(${-15 + jaguarEarTwitch} -32 -16)`}
              style={{ transition: "transform 0.3s ease-out" }} />
            <ellipse cx="-32" cy="-15" rx="3" ry="4.5" fill="#dab060"
              transform={`rotate(${-15 + jaguarEarTwitch} -32 -15)`} />
            <ellipse cx="-48" cy="-14" rx="5.5" ry="7.5" fill="#c89a40"
              transform={`rotate(${15 + jaguarEarTwitch} -48 -14)`}
              style={{ transition: "transform 0.3s ease-out" }} />
            <ellipse cx="-48" cy="-13" rx="3" ry="4" fill="#dab060"
              transform={`rotate(${15 + jaguarEarTwitch} -48 -13)`} />
            <g>
              <ellipse cx="-45" cy="-3" rx="5" ry="4" fill="#1a1a0a" />
              <ellipse cx="-45" cy="-3" rx="4" ry="3.5" fill={`rgba(212, 160, 48, ${0.5 + jaguarEyeGlow * 0.5})`} />
              <ellipse cx="-45" cy="-3" rx="1.5" ry="3" fill="#1a1a0a" />
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
            <circle cx="-44" cy="5" r="1.5" fill="#6a4a20" opacity="0.3" />
            <circle cx="-36" cy="5" r="1.5" fill="#6a4a20" opacity="0.3" />
            <circle cx="-50" cy="8" r="1" fill="#6a4a20" opacity="0.25" />
            <path d="M-56 5 L-70 2" stroke="#dab060" strokeWidth="0.5" opacity="0.3" />
            <path d="M-56 7 L-72 8" stroke="#dab060" strokeWidth="0.5" opacity="0.3" />
            <path d="M-56 5 L-68 -2" stroke="#dab060" strokeWidth="0.5" opacity="0.25" />
            <ellipse cx="-50" cy="30" rx="8" ry="5" fill="#c89030" />
            <ellipse cx="-35" cy="32" rx="7" ry="4.5" fill="#c89030" />
            <path d="M45 15 Q65 5 75 15 Q85 30 75 40" stroke="#c89030" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="72" cy="22" r="2" fill="#8a6020" opacity="0.3" />
            <circle cx="80" cy="32" r="2" fill="#8a6020" opacity="0.3" />
          </g>
        </svg>
      </Animal3D>

      {/* === GORILLA — behind lower-right foliage === */}
      <Animal3D
        x={76}
        y={74}
        width={200}
        height={180}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={14}
        liftOnHover={25}
        proximityCenter={{ x: 0.6, y: 0.6 }}
        onClick={gorilla.trigger}
        animationClass={gorilla.reacting ? "animate-chest-beat" : undefined}
      >
        <svg viewBox="-60 -45 120 120" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`translate(0, ${-gorillaPeek * 0.5})`}
            style={{ transition: "transform 0.6s ease-out" }}
            opacity={0.35 + Math.min(gorillaPeek / 36, 0.6)}
            filter="url(#animal-3d-shadow)"
          >
            <ellipse cx="0" cy="25" rx="50" ry="35" fill="#2a2a2a" opacity="0.6" />
            <ellipse cx="0" cy="-5" rx="28" ry="25" fill="#3a3a3a" />
            <path d="M-10 -28 Q0 -38 10 -28" fill="#2a2a2a" />
            <ellipse cx="0" cy="2" rx="20" ry="18" fill="#1a1a1a" />
            <path
              d={`M-18 ${-8 + gorillaBrow + (gorilla.reacting ? -3 : 0)} Q-10 ${-14 + gorillaBrow + (gorilla.reacting ? -3 : 0)} 0 ${-10 + gorillaBrow + (gorilla.reacting ? -3 : 0)} Q10 ${-14 + gorillaBrow + (gorilla.reacting ? -3 : 0)} 18 ${-8 + gorillaBrow + (gorilla.reacting ? -3 : 0)}`}
              fill="#2a2a2a"
              style={{ transition: "d 0.4s ease-out" }}
            />
            <ellipse cx={-8 + gorillaEyeTrack} cy="-4" rx="4" ry="3" fill="#4a3020" />
            <circle cx={-7.5 + gorillaEyeTrack} cy="-4.5" r="1" fill="#f0e8d0" opacity="0.4" />
            <ellipse cx={8 + gorillaEyeTrack} cy="-4" rx="4" ry="3" fill="#4a3020" />
            <circle cx={8.5 + gorillaEyeTrack} cy="-4.5" r="1" fill="#f0e8d0" opacity="0.4" />
            <ellipse cx="0" cy="5" rx="10" ry="7" fill="#1a1a1a" />
            <ellipse cx="-4" cy="6" rx="3" ry="2.5" fill="#2a2a2a" />
            <ellipse cx="4" cy="6" rx="3" ry="2.5" fill="#2a2a2a" />
            <path d="M-8 12 Q0 16 8 12" stroke="#3a3a3a" strokeWidth="1" fill="none" />
            <path d="M-20 10 Q-30 25 -25 45" stroke="#6a6a6a" strokeWidth="3" fill="none" opacity="0.2" />
            <path d="M20 10 Q30 25 25 45" stroke="#6a6a6a" strokeWidth="3" fill="none" opacity="0.2" />
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
        </svg>
      </Animal3D>

      {/* === ANACONDA — draped on right branches === */}
      <Animal3D
        x={88}
        y={20}
        width={220}
        height={80}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={12}
        liftOnHover={15}
        proximityCenter={{ x: 0.9, y: -0.4 }}
        onClick={anaconda.trigger}
        animationClass={anaconda.reacting ? "animate-snake-strike" : undefined}
      >
        <svg viewBox="-90 -30 230 60" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`translate(${anacondaShift}, 0)`}
            style={{ transition: "transform 0.5s ease-out" }}
            opacity="0.55"
            filter="url(#animal-3d-shadow)"
          >
            <path
              d="M-60 0 Q-40 -15 -20 5 Q0 20 20 0 Q40 -20 60 -5 Q80 10 100 -10 Q110 -20 115 -15"
              stroke="#4a6a20" strokeWidth="14" fill="none" strokeLinecap="round"
            />
            <path
              d="M-60 0 Q-40 -15 -20 5 Q0 20 20 0 Q40 -20 60 -5 Q80 10 100 -10 Q110 -20 115 -15"
              stroke="#3a5a18" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray="8 12"
            />
            <path d="M-15 8 Q0 22 15 5" stroke="#8aa050" strokeWidth="4" fill="none" opacity="0.3" />
            <g transform="translate(-70, 5)">
              <ellipse cx="0" cy="0" rx="12" ry="8" fill="#4a6a20" />
              <ellipse cx="-5" cy="1" rx="8" ry="5" fill="#5a7a28" />
              <ellipse cx="-3" cy="-2" rx="2.5" ry="2" fill="#d4a030" opacity="0.7" />
              <ellipse cx="-3" cy="-2" rx="0.8" ry="2" fill="#1a1a0a" />
              <ellipse cx="3" cy="-2" rx="2.5" ry="2" fill="#d4a030" opacity="0.7" />
              <ellipse cx="3" cy="-2" rx="0.8" ry="2" fill="#1a1a0a" />
              <circle cx="-8" cy="0" r="1" fill="#3a5a18" />
              <circle cx="-8" cy="2" r="1" fill="#3a5a18" />
              {anacondaTongue && (
                <g opacity="0.6">
                  <path d="M-12 1 L-22 -1 L-25 -3" stroke="#c04040" strokeWidth="0.8" fill="none" />
                  <path d="M-22 -1 L-25 1" stroke="#c04040" strokeWidth="0.8" fill="none" />
                </g>
              )}
            </g>
            <path d="M115 -15 Q125 -10 132 -15 Q138 -20 142 -18"
              stroke="#4a6a20" strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </Animal3D>

      {/* === TOUCAN — on left branch === */}
      <Animal3D
        x={12}
        y={28}
        width={120}
        height={180}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={20}
        liftOnHover={25}
        proximityCenter={{ x: -0.7, y: -0.3 }}
        onClick={toucan.trigger}
        animationClass={toucan.reacting ? "animate-toucan-squawk" : undefined}
      >
        <svg viewBox="-30 -40 80 130" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`rotate(${toucanRotation} 0 0)`}
            style={{ transition: "transform 0.4s ease-out" }}
            filter="url(#animal-3d-shadow)"
          >
            <ellipse cx="0" cy="0" rx="18" ry="24" fill="#1a1a1a" />
            <ellipse cx="0" cy="5" rx="14" ry="16" fill="#2a2a2a" />
            <ellipse cx="0" cy="10" rx="10" ry="12" fill="#c8a830" opacity="0.7" />
            <ellipse cx="2" cy="-24" rx="12" ry="13" fill="#1a1a1a" />
            <path d="M12 -28 Q35 -22 40 -18 Q38 -15 12 -20Z" fill="#e87030" />
            <path d="M12 -20 Q35 -18 38 -15 Q35 -12 12 -17Z" fill="#d4a020" />
            <path d="M38 -18 Q42 -17 40 -15Z" fill="#2a2a2a" />
            <circle cx="8" cy="-26" r={toucanBlink} fill="#1a4a6a" />
            <circle cx="8" cy="-26" r={toucanBlink} fill="url(#eye-shine)" />
            <circle cx="7" cy="-27" r="0.8" fill="#ffffff" opacity="0.6" />
            <path d="M-8 20 Q-20 45 -15 65" stroke="#1a1a1a" strokeWidth="4" fill="none" />
            <path d="M0 22 Q-12 50 -8 68" stroke="#2a2a2a" strokeWidth="3" fill="none" />
            <path d="M-6 24 L-10 30 L-4 30Z" fill="#4a4a4a" />
            <path d="M6 24 L3 30 L9 30Z" fill="#4a4a4a" />
          </g>
        </svg>
      </Animal3D>

      {/* === MONKEY — upper right canopy === */}
      <Animal3D
        x={85}
        y={26}
        width={100}
        height={140}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={22}
        liftOnHover={20}
        proximityCenter={{ x: 0.8, y: -0.3 }}
        onClick={monkey.trigger}
        animationClass={monkey.reacting ? "animate-monkey-swing" : undefined}
      >
        <svg viewBox="-35 -20 70 80" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`translate(0, ${-monkeyPeek * 0.3})`}
            style={{ transition: "transform 0.5s ease-out" }}
            opacity={0.6 + Math.min(monkeyPeek / 22, 0.35)}
            filter="url(#animal-3d-shadow)"
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
            <ellipse cx="-18" cy="-6" rx="6" ry="7" fill="#6a4a2a"
              transform={`rotate(${monkeyEarWiggle} -18 -6)`}
              style={{ transition: "transform 0.3s ease-out" }} />
            <ellipse cx="-18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
            <ellipse cx="18" cy="-6" rx="6" ry="7" fill="#6a4a2a"
              transform={`rotate(${-monkeyEarWiggle} 18 -6)`}
              style={{ transition: "transform 0.3s ease-out" }} />
            <ellipse cx="18" cy="-6" rx="3.5" ry="4" fill="#8a6a4a" />
            <path d="M-22 15 Q-28 12 -30 18 Q-28 22 -22 20Z" fill="#6a4a2a" />
          </g>
        </svg>
      </Animal3D>

      {/* === TREE FROG — on left vine === */}
      <Animal3D
        x={6}
        y={40}
        width={60}
        height={60}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={25}
        liftOnHover={18}
        proximityCenter={{ x: -0.8, y: 0 }}
        onClick={frog.trigger}
        animationClass={frog.reacting ? "animate-frog-leap" : undefined}
      >
        <svg viewBox="-15 -15 30 30" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g
            transform={`translate(0, ${frogShift * 0.4})`}
            style={{ transition: "transform 0.6s ease-out" }}
            opacity="0.7"
            filter="url(#animal-3d-shadow)"
          >
            <ellipse cx="0" cy="0" rx="7" ry="6" fill="#20c040" />
            <ellipse cx="0" cy="5"
              rx={frogThroat ? 6 : 4} ry={frogThroat ? 5 : 3}
              fill="#30d050" opacity="0.6"
              style={{ transition: "all 0.4s ease-out" }} />
            <ellipse cx="0" cy="-5" rx="6" ry="5" fill="#28cc45" />
            <circle cx="-5" cy="-9" r="3.5" fill="#e03020" />
            <circle cx="-5" cy="-9" r="2" fill="#1a1a1a" />
            <ellipse cx="-5" cy="-9" rx="1.2" ry="2" fill="#1a1a1a" />
            <circle cx="-5.5" cy="-9.5" r="0.6" fill="#ffffff" opacity="0.5" />
            <circle cx="5" cy="-9" r="3.5" fill="#e03020" />
            <circle cx="5" cy="-9" r="2" fill="#1a1a1a" />
            <ellipse cx="5" cy="-9" rx="1.2" ry="2" fill="#1a1a1a" />
            <circle cx="5.5" cy="-9.5" r="0.6" fill="#ffffff" opacity="0.5" />
            <path d="M-6 -2 Q-7 2 -5 5" stroke="#1a3a80" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M6 -2 Q7 2 5 5" stroke="#1a3a80" strokeWidth="1" fill="none" opacity="0.5" />
            <path d="M-6 3 L-11 8 L-9 9 L-5 5Z" fill="#1eaa35" />
            <path d="M6 3 L11 8 L9 9 L5 5Z" fill="#1eaa35" />
            <circle cx="-11" cy="8" r="1.5" fill="#f08030" opacity="0.7" />
            <circle cx="11" cy="8" r="1.5" fill="#f08030" opacity="0.7" />
          </g>
        </svg>
      </Animal3D>

      {/* === BUTTERFLY — morpho, electric blue === */}
      <Animal3D
        x={butterflyX}
        y={butterflyY}
        width={60}
        height={60}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={30}
        liftOnHover={35}
        proximityCenter={{ x: 0, y: -0.5 }}
        onClick={butterfly.trigger}
        animationClass={butterfly.reacting ? "animate-burst-flutter" : undefined}
      >
        <svg viewBox="-20 -35 40 55" className="h-full w-full overflow-visible">
          <AnimalDefs />
          <g opacity="0.4">
            <path d="M0 0 Q-15 -10 -14 -24 Q-8 -30 0 -18Z" fill="#2060e0" />
            <path d="M0 0 Q15 -10 14 -24 Q8 -30 0 -18Z" fill="#1850d0" />
            <path d="M0 0 Q-10 8 -9 18 Q-5 22 0 12Z" fill="#2060e0" opacity="0.8" />
            <path d="M0 0 Q10 8 9 18 Q5 22 0 12Z" fill="#1850d0" opacity="0.8" />
            <path d="M-3 -12 Q-8 -18 -5 -22" stroke="#60a0ff" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M3 -12 Q8 -18 5 -22" stroke="#60a0ff" strokeWidth="1" fill="none" opacity="0.3" />
            <ellipse cx="0" cy="0" rx="1.2" ry="8" fill="#1a1a3a" />
            <circle cx="-8" cy="-16" r="2.5" fill="#ffffff" opacity="0.2" />
            <circle cx="8" cy="-16" r="2.5" fill="#ffffff" opacity="0.2" />
            <path d="M-1 -8 Q-4 -14 -6 -16" stroke="#1a1a3a" strokeWidth="0.5" fill="none" />
            <path d="M1 -8 Q4 -14 6 -16" stroke="#1a1a3a" strokeWidth="0.5" fill="none" />
            <circle cx="-6" cy="-16" r="0.8" fill="#1a1a3a" />
            <circle cx="6" cy="-16" r="0.8" fill="#1a1a3a" />
          </g>
        </svg>
      </Animal3D>

      {/* === SMALL HIDDEN DETAILS === */}

      {/* Glowing eyes in left foliage */}
      <Animal3D
        x={4}
        y={62}
        width={30}
        height={20}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={8}
        liftOnHover={5}
        proximityCenter={{ x: -0.9, y: 0.3 }}
      >
        <svg viewBox="-5 -5 20 10" className="h-full w-full overflow-visible">
          <circle cx="0" cy="0" r="1.5" fill="#d4a030" opacity={0.15 + mouseY * 0.1} />
          <circle cx="7" cy="0" r="1.5" fill="#d4a030" opacity={0.15 + mouseY * 0.1} />
        </svg>
      </Animal3D>

      {/* Tiny gecko on right tree */}
      <Animal3D
        x={93}
        y={55}
        width={30}
        height={50}
        mouseX={mouseX}
        mouseY={mouseY}
        tiltStrength={15}
        liftOnHover={10}
        proximityCenter={{ x: 0.9, y: 0.1 }}
      >
        <svg viewBox="-5 -10 15 30" className="h-full w-full overflow-visible">
          <g opacity="0.25">
            <ellipse cx="0" cy="0" rx="3" ry="6" fill="#5a8a40" />
            <circle cx="0" cy="-6" r="2.5" fill="#5a8a40" />
            <circle cx="-1.5" cy="-7" r="0.8" fill="#1a1a0a" />
            <circle cx="1.5" cy="-7" r="0.8" fill="#1a1a0a" />
            <path d="M0 6 Q-2 12 0 18" stroke="#5a8a40" strokeWidth="1" fill="none" />
          </g>
        </svg>
      </Animal3D>
    </div>
  )
}
