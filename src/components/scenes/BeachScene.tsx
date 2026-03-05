import { memo, useEffect } from "react"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"
import { OceanWaves } from "./OceanWaves"
import { SwayingPalms } from "./SwayingPalms"
import { TropicalBirds } from "./TropicalBirds"
import { SandSparkle } from "./SandSparkle"
import { TideFoam } from "./TideFoam"
import { FloatingJellyfish } from "./FloatingJellyfish"
import { BeachEasterEggs } from "./BeachEasterEggs"
import { CoralGlow } from "./CoralGlow"
import { CursorFish } from "./CursorFish"
import { SunbeamVignette } from "./SunbeamVignette"

interface BeachSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const BeachScene = memo(function BeachScene({ onMouseXChange }: BeachSceneProps) {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  // Forward mouse panning for audio
  useEffect(() => {
    if (!onMouseXChange) return
    onMouseXChange(offset.x / 25)
  }, [offset.x, onMouseXChange])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient — sky blue to turquoise to warm sand */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #87ceeb 0%, #60b5d4 25%, #2dd4bf 50%, #c2956b 75%, #a0784a 100%)",
        }}
      />

      {/* Layer 1: Distant ocean & sky (depth: 0.08) */}
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
            <radialGradient id="sun-glow" cx="50%" cy="20%" r="30%">
              <stop offset="0%" stopColor="rgba(255,240,180,0.9)" />
              <stop offset="30%" stopColor="rgba(251,191,36,0.6)" />
              <stop offset="60%" stopColor="rgba(245,158,11,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="ocean-depth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(45,212,191,0.4)" />
              <stop offset="100%" stopColor="rgba(13,148,136,0.6)" />
            </linearGradient>
          </defs>

          {/* Sun disc and glow */}
          <ellipse cx="960" cy="180" rx="400" ry="250" fill="url(#sun-glow)" />
          <circle cx="960" cy="200" r="60" fill="rgba(251,191,36,0.85)" />
          <circle cx="960" cy="200" r="45" fill="rgba(255,240,200,0.6)" />

          {/* Distant island silhouette with palm trees */}
          <g opacity="0.35">
            <path
              d="M1500 420 Q1530 380 1560 400 Q1600 360 1640 400 Q1670 380 1700 420 L1700 480 L1500 480Z"
              fill="rgba(34,101,34,0.6)"
            />
            {/* Island palm 1 */}
            <rect x="1560" y="360" width="4" height="60" rx="2" fill="rgba(34,85,34,0.5)" transform="rotate(-5 1562 390)" />
            <ellipse cx="1540" cy="350" rx="30" ry="10" fill="rgba(34,101,34,0.5)" transform="rotate(-15 1540 350)" />
            <ellipse cx="1580" cy="345" rx="25" ry="8" fill="rgba(34,101,34,0.45)" transform="rotate(20 1580 345)" />
            {/* Island palm 2 */}
            <rect x="1630" y="370" width="3" height="50" rx="1.5" fill="rgba(34,85,34,0.45)" transform="rotate(5 1631 395)" />
            <ellipse cx="1615" cy="362" rx="25" ry="8" fill="rgba(34,101,34,0.45)" transform="rotate(-20 1615 362)" />
            <ellipse cx="1650" cy="358" rx="22" ry="7" fill="rgba(34,101,34,0.4)" transform="rotate(15 1650 358)" />
          </g>

          {/* Distant sailing boats */}
          <g opacity="0.3">
            {/* Boat 1 */}
            <path d="M350 380 L370 380 L365 395 L345 395Z" fill="rgba(80,50,30,0.6)" />
            <line x1="358" y1="355" x2="358" y2="380" stroke="rgba(80,50,30,0.5)" strokeWidth="1.5" />
            <path d="M358 355 L358 375 L372 370Z" fill="rgba(255,255,255,0.4)" />
            {/* Boat 2 */}
            <path d="M680 400 L700 400 L695 415 L675 415Z" fill="rgba(80,50,30,0.5)" />
            <line x1="688" y1="375" x2="688" y2="400" stroke="rgba(80,50,30,0.4)" strokeWidth="1.5" />
            <path d="M688 375 L688 395 L702 390Z" fill="rgba(255,255,255,0.35)" />
            {/* Boat 3 */}
            <path d="M1200 390 L1220 390 L1215 405 L1195 405Z" fill="rgba(80,50,30,0.45)" />
            <line x1="1208" y1="365" x2="1208" y2="390" stroke="rgba(80,50,30,0.4)" strokeWidth="1.5" />
            <path d="M1208 365 L1208 385 L1222 380Z" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Ocean water body */}
          <rect x="0" y="420" width="1920" height="200" fill="url(#ocean-depth)" />

          {/* 3 layered ocean waves */}
          <path
            d="M0 440 Q120 420 240 440 Q360 460 480 440 Q600 420 720 440 Q840 460 960 440
               Q1080 420 1200 440 Q1320 460 1440 440 Q1560 420 1680 440 Q1800 460 1920 440 L1920 480 L0 480Z"
            fill="rgba(20,184,166,0.25)"
          />
          <path
            d="M0 470 Q150 450 300 470 Q450 490 600 470 Q750 450 900 470
               Q1050 490 1200 470 Q1350 450 1500 470 Q1650 490 1800 470 L1920 470 L1920 510 L0 510Z"
            fill="rgba(13,148,136,0.2)"
          />
          <path
            d="M0 500 Q180 485 360 500 Q540 515 720 500 Q900 485 1080 500
               Q1260 515 1440 500 Q1620 485 1800 500 L1920 500 L1920 540 L0 540Z"
            fill="rgba(13,148,136,0.15)"
          />

          {/* Sand dunes in distance */}
          <path
            d="M0 620 Q300 590 600 610 Q900 630 1200 600 Q1500 580 1920 620 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.3)"
          />
        </svg>
      </div>

      {/* Layer 2: Mid-ground reef & water (depth: 0.2) */}
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
            <radialGradient id="coral-pink" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(244,114,182,0.5)" />
              <stop offset="100%" stopColor="rgba(244,114,182,0.1)" />
            </radialGradient>
            <radialGradient id="coral-purple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.5)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.1)" />
            </radialGradient>
            <radialGradient id="coral-orange" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251,146,60,0.5)" />
              <stop offset="100%" stopColor="rgba(251,146,60,0.1)" />
            </radialGradient>
          </defs>

          {/* Coral reef formations */}
          <ellipse cx="280" cy="560" rx="45" ry="30" fill="url(#coral-pink)" />
          <ellipse cx="320" cy="555" rx="35" ry="25" fill="url(#coral-purple)" />
          <ellipse cx="260" cy="550" rx="25" ry="20" fill="url(#coral-orange)" />

          <ellipse cx="750" cy="570" rx="40" ry="28" fill="url(#coral-orange)" />
          <ellipse cx="790" cy="565" rx="30" ry="22" fill="url(#coral-pink)" />

          <ellipse cx="1350" cy="555" rx="50" ry="32" fill="url(#coral-purple)" />
          <ellipse cx="1400" cy="560" rx="35" ry="25" fill="url(#coral-pink)" />
          <ellipse cx="1380" cy="550" rx="28" ry="18" fill="url(#coral-orange)" />

          {/* Sea turtle silhouettes */}
          <g opacity="0.3" transform="translate(500, 530) scale(0.8)">
            <ellipse cx="0" cy="0" rx="20" ry="14" fill="rgba(13,148,136,0.6)" />
            <circle cx="-22" cy="-2" r="5" fill="rgba(13,148,136,0.5)" />
            <ellipse cx="-15" cy="12" rx="7" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(30 -15 12)" />
            <ellipse cx="-15" cy="-12" rx="7" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(-30 -15 -12)" />
            <ellipse cx="15" cy="10" rx="6" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(-20 15 10)" />
            <ellipse cx="15" cy="-10" rx="6" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(20 15 -10)" />
          </g>

          <g opacity="0.25" transform="translate(1100, 545) scale(0.6) scaleX(-1)">
            <ellipse cx="0" cy="0" rx="20" ry="14" fill="rgba(13,148,136,0.6)" />
            <circle cx="-22" cy="-2" r="5" fill="rgba(13,148,136,0.5)" />
            <ellipse cx="-15" cy="12" rx="7" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(30 -15 12)" />
            <ellipse cx="-15" cy="-12" rx="7" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(-30 -15 -12)" />
            <ellipse cx="15" cy="10" rx="6" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(-20 15 10)" />
            <ellipse cx="15" cy="-10" rx="6" ry="3" fill="rgba(13,148,136,0.4)" transform="rotate(20 15 -10)" />
          </g>

          {/* Mid-distance waves with white foam caps */}
          <path
            d="M0 580 Q100 565 200 580 Q300 595 400 580 Q500 565 600 580 Q700 595 800 580
               Q900 565 1000 580 Q1100 595 1200 580 Q1300 565 1400 580 Q1500 595 1600 580
               Q1700 565 1800 580 Q1900 595 1920 580 L1920 620 L0 620Z"
            fill="rgba(20,184,166,0.15)"
          />
          {/* Foam caps */}
          <path
            d="M180 576 Q200 572 220 576"
            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"
          />
          <path
            d="M520 576 Q540 571 560 576"
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"
          />
          <path
            d="M880 576 Q900 572 920 576"
            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"
          />
          <path
            d="M1280 576 Q1300 571 1320 576"
            fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round"
          />
          <path
            d="M1680 576 Q1700 572 1720 576"
            fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"
          />

          {/* Wooden dock/pier from right side */}
          <g opacity="0.5">
            {/* Dock planks */}
            <rect x="1650" y="600" width="270" height="8" rx="2" fill="rgba(120,80,40,0.6)" />
            <rect x="1650" y="612" width="270" height="8" rx="2" fill="rgba(100,65,30,0.55)" />
            <rect x="1650" y="624" width="270" height="8" rx="2" fill="rgba(120,80,40,0.5)" />
            {/* Support posts */}
            <rect x="1680" y="600" width="6" height="80" fill="rgba(90,60,25,0.5)" />
            <rect x="1780" y="600" width="6" height="90" fill="rgba(90,60,25,0.45)" />
            <rect x="1880" y="600" width="6" height="70" fill="rgba(90,60,25,0.4)" />
          </g>

          {/* Mid sand layer */}
          <path
            d="M0 700 Q400 680 800 700 Q1200 720 1600 690 Q1800 680 1920 700 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.35)"
          />
        </svg>
      </div>

      {/* Layer 3: Foreground beach (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Large palm tree — left */}
          <g>
            {/* Trunk — curved */}
            <path
              d="M220 850 Q200 700 230 550 Q245 450 260 380"
              fill="none" stroke="rgba(120,80,40,0.7)" strokeWidth="16" strokeLinecap="round"
            />
            <path
              d="M220 850 Q200 700 230 550 Q245 450 260 380"
              fill="none" stroke="rgba(140,95,50,0.4)" strokeWidth="10" strokeLinecap="round"
            />
            {/* Coconuts */}
            <circle cx="255" cy="390" r="8" fill="rgba(120,80,40,0.6)" />
            <circle cx="268" cy="385" r="7" fill="rgba(110,70,35,0.55)" />
            <circle cx="248" cy="380" r="6" fill="rgba(130,85,45,0.5)" />
            {/* Fronds */}
            <ellipse cx="180" cy="350" rx="120" ry="25" fill="rgba(34,139,34,0.45)" transform="rotate(-30 180 350)" />
            <ellipse cx="340" cy="340" rx="110" ry="22" fill="rgba(34,139,34,0.4)" transform="rotate(25 340 340)" />
            <ellipse cx="200" cy="330" rx="100" ry="20" fill="rgba(22,101,52,0.4)" transform="rotate(-50 200 330)" />
            <ellipse cx="310" cy="360" rx="95" ry="18" fill="rgba(22,101,52,0.35)" transform="rotate(40 310 360)" />
            <ellipse cx="260" cy="320" rx="90" ry="18" fill="rgba(34,139,34,0.35)" transform="rotate(-10 260 320)" />
          </g>

          {/* Large palm tree — right */}
          <g>
            <path
              d="M1700 880 Q1720 720 1690 560 Q1675 460 1660 400"
              fill="none" stroke="rgba(120,80,40,0.65)" strokeWidth="14" strokeLinecap="round"
            />
            <path
              d="M1700 880 Q1720 720 1690 560 Q1675 460 1660 400"
              fill="none" stroke="rgba(140,95,50,0.35)" strokeWidth="9" strokeLinecap="round"
            />
            <circle cx="1655" cy="410" r="7" fill="rgba(120,80,40,0.55)" />
            <circle cx="1668" cy="405" r="6" fill="rgba(110,70,35,0.5)" />
            <ellipse cx="1580" cy="370" rx="110" ry="24" fill="rgba(34,139,34,0.4)" transform="rotate(-25 1580 370)" />
            <ellipse cx="1740" cy="360" rx="100" ry="22" fill="rgba(34,139,34,0.35)" transform="rotate(30 1740 360)" />
            <ellipse cx="1610" cy="350" rx="95" ry="20" fill="rgba(22,101,52,0.35)" transform="rotate(-45 1610 350)" />
            <ellipse cx="1720" cy="380" rx="90" ry="18" fill="rgba(22,101,52,0.3)" transform="rotate(45 1720 380)" />
            <ellipse cx="1660" cy="340" rx="85" ry="17" fill="rgba(34,139,34,0.3)" transform="rotate(-5 1660 340)" />
          </g>

          {/* Beach umbrella / tiki hut silhouette */}
          <g opacity="0.4" transform="translate(900, 720)">
            {/* Pole */}
            <rect x="-3" y="-80" width="6" height="120" fill="rgba(120,80,40,0.6)" />
            {/* Thatch roof */}
            <path
              d="M-60 -80 Q-30 -110 0 -95 Q30 -110 60 -80 L50 -70 Q25 -85 0 -75 Q-25 -85 -50 -70Z"
              fill="rgba(160,120,74,0.5)"
            />
            <path
              d="M-55 -75 L55 -75 L45 -65 L-45 -65Z"
              fill="rgba(140,100,55,0.4)"
            />
          </g>

          {/* Scattered shells and starfish */}
          {/* Starfish 1 */}
          <g transform="translate(500, 820)" opacity="0.4">
            <path d="M0 -8 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2Z" fill="rgba(251,146,60,0.6)" />
          </g>
          {/* Starfish 2 */}
          <g transform="translate(1300, 850) rotate(30)" opacity="0.35">
            <path d="M0 -7 L2 -2 L7 -2 L3 1 L4 7 L0 3 L-4 7 L-3 1 L-7 -2 L-2 -2Z" fill="rgba(244,114,182,0.5)" />
          </g>
          {/* Shell 1 */}
          <ellipse cx="650" cy="840" rx="6" ry="4" fill="rgba(255,240,220,0.4)" />
          <path d="M644 840 Q650 835 656 840" fill="none" stroke="rgba(200,180,160,0.3)" strokeWidth="1" />
          {/* Shell 2 */}
          <ellipse cx="1100" cy="830" rx="5" ry="3.5" fill="rgba(255,230,210,0.35)" />
          {/* Shell 3 */}
          <ellipse cx="820" cy="860" rx="4" ry="3" fill="rgba(255,235,215,0.3)" />

          {/* Tide pools near shore */}
          <ellipse cx="400" cy="780" rx="35" ry="12" fill="rgba(45,212,191,0.15)" />
          <ellipse cx="400" cy="780" rx="25" ry="8" fill="rgba(45,212,191,0.1)" />
          <ellipse cx="1500" cy="790" rx="30" ry="10" fill="rgba(45,212,191,0.12)" />

          {/* Foreground sand */}
          <path
            d="M0 800 Q300 780 600 800 Q900 820 1200 800 Q1500 780 1920 800 L1920 1080 L0 1080Z"
            fill="rgba(212,165,116,0.4)"
          />
          <path
            d="M0 860 Q400 845 800 860 Q1200 875 1600 855 Q1800 845 1920 860 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.3)"
          />
        </svg>
      </div>

      {/* Animated components — layered from background to foreground */}
      <OceanWaves />
      <CoralGlow />
      <FloatingJellyfish />
      <TideFoam />
      <SwayingPalms />
      <TropicalBirds />
      <SandSparkle />
      <BeachEasterEggs />
      <SunbeamVignette />
      <CursorFish />
    </div>
  )
})
