import { memo, useEffect } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"
import { CloudDrift } from "./CloudDrift"
import { GodRays } from "./GodRays"
import { OlympusEagles } from "./OlympusEagles"
import { GoldenMotes } from "./GoldenMotes"
import { LightningAmbient } from "./LightningAmbient"
import { DivineVignette } from "./DivineVignette"
import { CursorDivineGlow } from "./CursorDivineGlow"
import { HeavenEasterEggs } from "./HeavenEasterEggs"
import { OlympianStatues } from "./OlympianStatues"
import { CelestialConstellations } from "./CelestialConstellations"
import { TempleBraziers } from "./TempleBraziers"
import { FallingPetals } from "./FallingPetals"
import { DoveFlock } from "./DoveFlock"
import { RainbowBridge } from "./RainbowBridge"
import { FloatingIslands } from "./FloatingIslands"
import { CursorAngels } from "./CursorAngels"

interface HeavenSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const HeavenScene = memo(function HeavenScene(props: HeavenSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  // Forward mouse X for audio panning
  useEffect(() => {
    if (props.onMouseXChange) {
      const normalized = offset.x / 25
      props.onMouseXChange(normalized)
    }
  }, [offset.x, props.onMouseXChange])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Sky gradient — radial gold center to pale blue */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 25%, #fffbe6 0%, #f0e6c0 20%, #c4d7f2 55%, #7ba7cc 100%)",
        }}
      />

      {/* Layer 1: Distant peaks, sun disc & god-rays (depth: 0.08) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.08) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="heaven-sun" cx="50%" cy="12%" r="22%">
              <stop offset="0%" stopColor="rgba(255,251,230,0.95)" />
              <stop offset="30%" stopColor="rgba(251,191,36,0.6)" />
              <stop offset="60%" stopColor="rgba(251,191,36,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="mountain-far" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.25)" />
              <stop offset="100%" stopColor="rgba(67,56,202,0.15)" />
            </linearGradient>
            <linearGradient id="mountain-near" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(67,56,202,0.35)" />
              <stop offset="100%" stopColor="rgba(49,46,129,0.2)" />
            </linearGradient>
          </defs>

          {/* Sun disc */}
          <ellipse cx="960" cy="100" rx="450" ry="220" fill="url(#heaven-sun)" />

          {/* God-rays fanning from sun */}
          <g opacity="0.7">
            <rect x="948" y="-20" width="24" height="750" fill="rgba(255,223,100,0.06)" transform="rotate(-28 960 0)" />
            <rect x="950" y="-20" width="18" height="680" fill="rgba(255,223,100,0.05)" transform="rotate(-18 960 0)" />
            <rect x="952" y="-20" width="28" height="720" fill="rgba(255,223,100,0.07)" transform="rotate(-9 960 0)" />
            <rect x="954" y="-20" width="20" height="650" fill="rgba(255,223,100,0.04)" transform="rotate(-2 960 0)" />
            <rect x="954" y="-20" width="22" height="700" fill="rgba(255,223,100,0.06)" transform="rotate(5 960 0)" />
            <rect x="950" y="-20" width="30" height="730" fill="rgba(255,223,100,0.05)" transform="rotate(12 960 0)" />
            <rect x="948" y="-20" width="16" height="660" fill="rgba(255,223,100,0.04)" transform="rotate(20 960 0)" />
            <rect x="946" y="-20" width="26" height="710" fill="rgba(255,223,100,0.06)" transform="rotate(28 960 0)" />
          </g>

          {/* Far mountain range — faint purple-blue */}
          <path
            d="M0 620 L200 500 L400 560 L600 460 L800 380 L960 340 L1120 380 L1320 460 L1520 560 L1720 500 L1920 620 L1920 1080 L0 1080Z"
            fill="url(#mountain-far)"
          />

          {/* Nearer peaks — slightly darker */}
          <path
            d="M0 680 L120 560 L280 620 L420 520 L560 580 L700 480 L840 420 L960 380 L1080 420 L1220 480 L1360 580 L1500 520 L1640 620 L1800 560 L1920 680 L1920 1080 L0 1080Z"
            fill="url(#mountain-near)"
          />

          {/* Snow caps on highest peaks */}
          <path
            d="M800 380 L840 420 L830 400 L870 430 L840 410Z"
            fill="rgba(255,255,255,0.3)"
          />
          <path
            d="M960 340 L1000 370 L990 355 L1020 380 L960 360Z"
            fill="rgba(255,255,255,0.35)"
          />
          <path
            d="M1120 380 L1080 420 L1090 400 L1060 430 L1100 410Z"
            fill="rgba(255,255,255,0.3)"
          />

          {/* Distant cloud banks */}
          <ellipse cx="250" cy="380" rx="300" ry="70" fill="rgba(255,255,255,0.2)" />
          <ellipse cx="750" cy="320" rx="250" ry="55" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="1300" cy="360" rx="280" ry="65" fill="rgba(255,255,255,0.18)" />
          <ellipse cx="1700" cy="400" rx="220" ry="50" fill="rgba(255,255,255,0.12)" />
        </svg>
      </div>

      {/* Layer 2: Temple complex & architecture (depth: 0.2) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.2) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="marble" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="100%" stopColor="rgba(200,200,220,0.3)" />
            </linearGradient>
            <linearGradient id="gold-accent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(251,191,36,0.5)" />
              <stop offset="100%" stopColor="rgba(217,160,32,0.3)" />
            </linearGradient>
          </defs>

          {/* Cloud platform under temple */}
          <ellipse cx="960" cy="680" rx="500" ry="100" fill="rgba(255,255,255,0.25)" />
          <ellipse cx="960" cy="670" rx="400" ry="70" fill="rgba(255,255,255,0.15)" />

          {/* Temple base / steps */}
          <rect x="720" y="580" width="480" height="25" rx="3" fill="url(#marble)" />
          <rect x="740" y="560" width="440" height="22" rx="3" fill="url(#marble)" />
          <rect x="760" y="540" width="400" height="22" rx="3" fill="url(#marble)" />

          {/* Temple columns — 6 columns */}
          <rect x="790" y="380" width="18" height="160" rx="4" fill="url(#marble)" />
          <rect x="850" y="380" width="18" height="160" rx="4" fill="url(#marble)" />
          <rect x="920" y="380" width="18" height="160" rx="4" fill="url(#marble)" />
          <rect x="980" y="380" width="18" height="160" rx="4" fill="url(#marble)" />
          <rect x="1040" y="380" width="18" height="160" rx="4" fill="url(#marble)" />
          <rect x="1100" y="380" width="18" height="160" rx="4" fill="url(#marble)" />

          {/* Column capitals (simple rectangles atop columns) */}
          <rect x="785" y="375" width="28" height="8" rx="2" fill="url(#marble)" />
          <rect x="845" y="375" width="28" height="8" rx="2" fill="url(#marble)" />
          <rect x="915" y="375" width="28" height="8" rx="2" fill="url(#marble)" />
          <rect x="975" y="375" width="28" height="8" rx="2" fill="url(#marble)" />
          <rect x="1035" y="375" width="28" height="8" rx="2" fill="url(#marble)" />
          <rect x="1095" y="375" width="28" height="8" rx="2" fill="url(#marble)" />

          {/* Entablature (beam across columns) */}
          <rect x="770" y="365" width="380" height="12" rx="2" fill="url(#marble)" />

          {/* Triangular pediment */}
          <path
            d="M775 365 L960 290 L1145 365Z"
            fill="url(#marble)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />

          {/* Pediment inner triangle decoration */}
          <path
            d="M830 358 L960 305 L1090 358Z"
            fill="none"
            stroke="rgba(251,191,36,0.2)"
            strokeWidth="1.5"
          />

          {/* Golden gate archway */}
          <path
            d="M910 540 L910 440 Q910 400 960 400 Q1010 400 1010 440 L1010 540"
            fill="none"
            stroke="url(#gold-accent)"
            strokeWidth="6"
          />
          {/* Gate inner glow */}
          <ellipse cx="960" cy="480" rx="40" ry="55" fill="rgba(255,251,230,0.15)" />

          {/* Left ruins */}
          <rect x="180" y="560" width="15" height="80" rx="3" fill="rgba(200,200,220,0.2)" />
          <rect x="210" y="540" width="12" height="100" rx="3" fill="rgba(200,200,220,0.15)" transform="rotate(5 216 590)" />
          <rect x="240" y="570" width="14" height="70" rx="3" fill="rgba(200,200,220,0.18)" />
          <rect x="160" y="590" width="120" height="10" rx="2" fill="rgba(200,200,220,0.12)" transform="rotate(-3 220 595)" />

          {/* Right ruins */}
          <rect x="1680" y="550" width="14" height="90" rx="3" fill="rgba(200,200,220,0.18)" />
          <rect x="1710" y="560" width="12" height="80" rx="3" fill="rgba(200,200,220,0.15)" transform="rotate(-4 1716 600)" />
          <rect x="1740" y="575" width="15" height="65" rx="3" fill="rgba(200,200,220,0.2)" />
          <rect x="1660" y="600" width="120" height="10" rx="2" fill="rgba(200,200,220,0.12)" transform="rotate(2 1720 605)" />

          {/* Mid-level cloud wisps */}
          <ellipse cx="400" cy="520" rx="180" ry="40" fill="rgba(255,255,255,0.12)" />
          <ellipse cx="1500" cy="500" rx="200" ry="45" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      {/* Layer 3: Foreground — columns, statue, cloud floor (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Left foreground column */}
          <rect x="80" y="200" width="30" height="600" rx="6" fill="rgba(220,220,235,0.2)" />
          <rect x="72" y="195" width="46" height="14" rx="3" fill="rgba(220,220,235,0.22)" />
          <rect x="72" y="790" width="46" height="14" rx="3" fill="rgba(220,220,235,0.22)" />

          {/* Right foreground column */}
          <rect x="1810" y="180" width="30" height="620" rx="6" fill="rgba(220,220,235,0.18)" />
          <rect x="1802" y="175" width="46" height="14" rx="3" fill="rgba(220,220,235,0.2)" />
          <rect x="1802" y="790" width="46" height="14" rx="3" fill="rgba(220,220,235,0.2)" />

          {/* Olive branches from left column */}
          <path
            d="M110 300 Q180 280 220 310 Q260 340 240 290 Q280 320 310 300"
            fill="none"
            stroke="rgba(101,163,13,0.15)"
            strokeWidth="2"
          />
          <ellipse cx="180" cy="295" rx="12" ry="6" fill="rgba(101,163,13,0.1)" transform="rotate(-15 180 295)" />
          <ellipse cx="220" cy="305" rx="10" ry="5" fill="rgba(101,163,13,0.12)" transform="rotate(10 220 305)" />
          <ellipse cx="260" cy="295" rx="11" ry="5" fill="rgba(101,163,13,0.1)" transform="rotate(-5 260 295)" />

          {/* Olive branches from right column */}
          <path
            d="M1810 320 Q1740 300 1700 330 Q1660 360 1680 310 Q1640 340 1610 320"
            fill="none"
            stroke="rgba(101,163,13,0.15)"
            strokeWidth="2"
          />
          <ellipse cx="1740" cy="315" rx="12" ry="6" fill="rgba(101,163,13,0.1)" transform="rotate(15 1740 315)" />
          <ellipse cx="1700" cy="325" rx="10" ry="5" fill="rgba(101,163,13,0.12)" transform="rotate(-10 1700 325)" />
          <ellipse cx="1660" cy="315" rx="11" ry="5" fill="rgba(101,163,13,0.1)" transform="rotate(5 1660 315)" />

          {/* Floating cloud floor */}
          <ellipse cx="200" cy="850" rx="350" ry="100" fill="rgba(255,255,255,0.3)" />
          <ellipse cx="600" cy="880" rx="280" ry="80" fill="rgba(255,255,255,0.25)" />
          <ellipse cx="960" cy="860" rx="400" ry="120" fill="rgba(255,255,255,0.35)" />
          <ellipse cx="1350" cy="870" rx="300" ry="90" fill="rgba(255,255,255,0.28)" />
          <ellipse cx="1720" cy="850" rx="320" ry="95" fill="rgba(255,255,255,0.3)" />

          {/* Lower cloud layer — denser */}
          <ellipse cx="400" cy="950" rx="500" ry="130" fill="rgba(255,255,255,0.4)" />
          <ellipse cx="960" cy="970" rx="600" ry="150" fill="rgba(255,255,255,0.45)" />
          <ellipse cx="1500" cy="940" rx="480" ry="120" fill="rgba(255,255,255,0.38)" />
        </svg>
      </div>

      {/* Celestial constellations in the upper sky */}
      <CelestialConstellations />

      {/* Faint rainbow arc between cloud banks */}
      <RainbowBridge />

      {/* Animated god-rays overlay */}
      <GodRays />

      {/* Distant sheet lightning in clouds */}
      <LightningAmbient />

      {/* Drifting clouds across the scene */}
      <CloudDrift />

      {/* Floating cloud islands with miniature structures */}
      <FloatingIslands />

      {/* Soaring eagles */}
      <OlympusEagles />

      {/* Occasional dove flocks in V-formation */}
      <DoveFlock />

      {/* Vibrant CSS god statues */}
      <OlympianStatues />

      {/* Flickering golden braziers flanking the temple */}
      <TempleBraziers />

      {/* Hidden mythological easter eggs */}
      <HeavenEasterEggs />

      {/* Falling flower petals */}
      <FallingPetals />

      {/* Rising golden sparkle particles */}
      <GoldenMotes />

      {/* Gold nugget cursor + angel swarm */}
      <CursorAngels />

      {/* Golden cursor trail */}
      <CursorDivineGlow />

      {/* Subtle divine light vignette */}
      <DivineVignette />
    </div>
  )
})
