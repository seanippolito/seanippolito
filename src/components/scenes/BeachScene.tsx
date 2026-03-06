import { memo, useEffect } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
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
import { TropicalClouds } from "./TropicalClouds"
import { SunShimmer } from "./SunShimmer"

interface BeachSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const BeachScene = memo(function BeachScene({ onMouseXChange }: BeachSceneProps) {
  const isMobile = useIsMobile()
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  // Forward mouse panning for audio
  useEffect(() => {
    if (!onMouseXChange) return
    onMouseXChange(offset.x / 25)
  }, [offset.x, onMouseXChange])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient — sky → ocean → wet sand → dry sand */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #87ceeb 0%, #60b5d4 18%, #2dd4bf 38%, #1a9e8f 48%, #8b7355 55%, #c2956b 62%, #d4a574 75%, #c9a07a 100%)",
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
              <stop offset="0%" stopColor="rgba(10,80,80,0.35)" />
              <stop offset="40%" stopColor="rgba(20,130,120,0.3)" />
              <stop offset="100%" stopColor="rgba(45,212,191,0.15)" />
            </linearGradient>
            {/* Horizon haze gradient — atmospheric depth */}
            <linearGradient id="horizon-haze" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(200,220,235,0)" />
              <stop offset="70%" stopColor="rgba(180,210,225,0.3)" />
              <stop offset="100%" stopColor="rgba(160,200,215,0.5)" />
            </linearGradient>
            {/* Wet sand gradient for waterline */}
            <linearGradient id="wet-sand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(100,80,55,0.4)" />
              <stop offset="50%" stopColor="rgba(140,110,75,0.35)" />
              <stop offset="100%" stopColor="rgba(180,145,100,0.15)" />
            </linearGradient>
          </defs>

          {/* Sun disc and glow */}
          <ellipse cx="960" cy="180" rx="400" ry="250" fill="url(#sun-glow)" />
          <circle cx="960" cy="200" r="60" fill="rgba(251,191,36,0.85)" />
          <circle cx="960" cy="200" r="45" fill="rgba(255,240,200,0.6)" />

          {/* Atmospheric horizon haze — sky fades into ocean */}
          <rect x="0" y="300" width="1920" height="150" fill="url(#horizon-haze)" />

          {/* Horizon line — subtle bright line where sky meets water */}
          <line x1="0" y1="420" x2="1920" y2="420" stroke="rgba(200,225,240,0.25)" strokeWidth="2" />

          {/* Distant island silhouette with palm trees */}
          <g opacity="0.3">
            <path
              d="M1500 420 Q1530 380 1560 400 Q1600 360 1640 400 Q1670 380 1700 420 L1700 480 L1500 480Z"
              fill="rgba(34,101,34,0.5)"
            />
            {/* Island palm 1 */}
            <rect x="1560" y="360" width="4" height="60" rx="2" fill="rgba(34,85,34,0.4)" transform="rotate(-5 1562 390)" />
            <ellipse cx="1540" cy="350" rx="30" ry="10" fill="rgba(34,101,34,0.4)" transform="rotate(-15 1540 350)" />
            <ellipse cx="1580" cy="345" rx="25" ry="8" fill="rgba(34,101,34,0.35)" transform="rotate(20 1580 345)" />
            {/* Island palm 2 */}
            <rect x="1630" y="370" width="3" height="50" rx="1.5" fill="rgba(34,85,34,0.35)" transform="rotate(5 1631 395)" />
            <ellipse cx="1615" cy="362" rx="25" ry="8" fill="rgba(34,101,34,0.35)" transform="rotate(-20 1615 362)" />
            <ellipse cx="1650" cy="358" rx="22" ry="7" fill="rgba(34,101,34,0.3)" transform="rotate(15 1650 358)" />
            {/* Atmospheric blue haze over distant island */}
            <rect x="1490" y="350" width="220" height="140" fill="rgba(130,190,210,0.15)" />
          </g>

          {/* Distant sailing boats */}
          <g opacity="0.3">
            <path d="M350 380 L370 380 L365 395 L345 395Z" fill="rgba(80,50,30,0.6)" />
            <line x1="358" y1="355" x2="358" y2="380" stroke="rgba(80,50,30,0.5)" strokeWidth="1.5" />
            <path d="M358 355 L358 375 L372 370Z" fill="rgba(255,255,255,0.4)" />
            <path d="M680 400 L700 400 L695 415 L675 415Z" fill="rgba(80,50,30,0.5)" />
            <line x1="688" y1="375" x2="688" y2="400" stroke="rgba(80,50,30,0.4)" strokeWidth="1.5" />
            <path d="M688 375 L688 395 L702 390Z" fill="rgba(255,255,255,0.35)" />
            <path d="M1200 390 L1220 390 L1215 405 L1195 405Z" fill="rgba(80,50,30,0.45)" />
            <line x1="1208" y1="365" x2="1208" y2="390" stroke="rgba(80,50,30,0.4)" strokeWidth="1.5" />
            <path d="M1208 365 L1208 385 L1222 380Z" fill="rgba(255,255,255,0.3)" />
          </g>

          {/* Ocean water body — deeper color further out, lighter near shore */}
          <rect x="0" y="420" width="1920" height="200" fill="url(#ocean-depth)" />

          {/* 3 layered ocean waves */}
          <path
            d="M0 440 Q120 420 240 440 Q360 460 480 440 Q600 420 720 440 Q840 460 960 440
               Q1080 420 1200 440 Q1320 460 1440 440 Q1560 420 1680 440 Q1800 460 1920 440 L1920 480 L0 480Z"
            fill="rgba(20,184,166,0.2)"
          />
          <path
            d="M0 470 Q150 450 300 470 Q450 490 600 470 Q750 450 900 470
               Q1050 490 1200 470 Q1350 450 1500 470 Q1650 490 1800 470 L1920 470 L1920 510 L0 510Z"
            fill="rgba(13,148,136,0.15)"
          />
          <path
            d="M0 500 Q180 485 360 500 Q540 515 720 500 Q900 485 1080 500
               Q1260 515 1440 500 Q1620 485 1800 500 L1920 500 L1920 540 L0 540Z"
            fill="rgba(13,148,136,0.1)"
          />

          {/* Wet sand transition zone — dark band where water meets sand */}
          <path
            d="M0 600 Q300 590 600 600 Q900 610 1200 600 Q1500 590 1920 600 L1920 680 L0 680Z"
            fill="url(#wet-sand)"
          />

          {/* Sand dunes in distance */}
          <path
            d="M0 650 Q300 630 600 645 Q900 660 1200 640 Q1500 625 1920 650 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.5)"
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

          <g opacity="0.25" transform="translate(1100, 545) scale(-0.6, 0.6)">
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
          <path d="M180 576 Q200 572 220 576" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <path d="M520 576 Q540 571 560 576" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          <path d="M880 576 Q900 572 920 576" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          <path d="M1280 576 Q1300 571 1320 576" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" />
          <path d="M1680 576 Q1700 572 1720 576" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />

          {/* Wooden dock/pier — much more visible */}
          <g opacity="0.75">
            {/* Dock planks — wider, thicker */}
            <rect x="1600" y="590" width="320" height="12" rx="2" fill="rgba(120,80,40,0.75)" />
            <rect x="1600" y="607" width="320" height="12" rx="2" fill="rgba(100,65,30,0.7)" />
            <rect x="1600" y="624" width="320" height="12" rx="2" fill="rgba(120,80,40,0.65)" />
            {/* Rail posts */}
            <rect x="1620" y="560" width="5" height="40" fill="rgba(100,65,30,0.6)" />
            <rect x="1720" y="560" width="5" height="40" fill="rgba(100,65,30,0.55)" />
            <rect x="1820" y="560" width="5" height="40" fill="rgba(100,65,30,0.5)" />
            {/* Railing */}
            <line x1="1620" y1="565" x2="1820" y2="565" stroke="rgba(100,65,30,0.5)" strokeWidth="3" />
            {/* Support posts — taller, into water */}
            <rect x="1650" y="590" width="8" height="110" fill="rgba(80,55,20,0.65)" />
            <rect x="1750" y="590" width="8" height="120" fill="rgba(80,55,20,0.6)" />
            <rect x="1850" y="590" width="8" height="100" fill="rgba(80,55,20,0.55)" />
            {/* Waterline reflections below posts */}
            <rect x="1648" y="700" width="12" height="15" fill="rgba(80,55,20,0.1)" rx="2" />
            <rect x="1748" y="710" width="12" height="15" fill="rgba(80,55,20,0.08)" rx="2" />
          </g>

          {/* Mid sand — wet sand transition zone */}
          <path
            d="M0 680 Q200 670 400 680 Q600 690 800 680 Q1000 670 1200 680 Q1400 690 1600 675 Q1800 670 1920 680 L1920 720 L0 720Z"
            fill="rgba(140,110,75,0.3)"
          />
          {/* Mid sand layer */}
          <path
            d="M0 710 Q400 695 800 710 Q1200 725 1600 700 Q1800 695 1920 710 L1920 1080 L0 1080Z"
            fill="rgba(194,149,107,0.5)"
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
          {/* === Wet sand strip at waterline — dark reflective band === */}
          <path
            d="M0 740 Q300 730 600 740 Q900 750 1200 738 Q1500 728 1920 740 L1920 780 L0 780Z"
            fill="rgba(120,95,65,0.35)"
          />
          {/* Water reflection sheen on wet sand */}
          <path
            d="M0 745 Q400 738 800 745 Q1200 752 1600 740 Q1800 735 1920 745 L1920 760 L0 760Z"
            fill="rgba(45,180,170,0.08)"
          />

          {/* Tiki hut — prominent with detail */}
          <g opacity="0.7" transform="translate(850, 700)">
            {/* Pole */}
            <rect x="-5" y="-95" width="10" height="155" fill="rgba(90,58,25,0.85)" />
            {/* Pole texture rings */}
            <line x1="-5" y1="-40" x2="5" y2="-40" stroke="rgba(60,40,15,0.3)" strokeWidth="1" />
            <line x1="-5" y1="-10" x2="5" y2="-10" stroke="rgba(60,40,15,0.3)" strokeWidth="1" />
            <line x1="-5" y1="20" x2="5" y2="20" stroke="rgba(60,40,15,0.3)" strokeWidth="1" />
            {/* Thatch roof — layered with overhang */}
            <path
              d="M-90 -95 Q-50 -135 0 -118 Q50 -135 90 -95 L80 -82 Q40 -112 0 -100 Q-40 -112 -80 -82Z"
              fill="rgba(180,145,80,0.75)"
            />
            <path
              d="M-85 -88 L85 -88 L70 -75 L-70 -75Z"
              fill="rgba(160,125,60,0.65)"
            />
            <path
              d="M-80 -78 L80 -78 L65 -68 L-65 -68Z"
              fill="rgba(145,110,50,0.55)"
            />
            {/* Hanging fringe */}
            <path
              d="M-85 -88 L-82 -82 M-75 -88 L-72 -82 M-65 -88 L-62 -82 M-55 -88 L-52 -82 M-45 -88 L-42 -82 M-35 -88 L-32 -82 M-25 -88 L-22 -82 M-15 -88 L-12 -82 M-5 -88 L-2 -82 M5 -88 L8 -82 M15 -88 L18 -82 M25 -88 L28 -82 M35 -88 L38 -82 M45 -88 L48 -82 M55 -88 L58 -82 M65 -88 L68 -82 M75 -88 L78 -82 M85 -88 L82 -82"
              fill="none" stroke="rgba(160,125,60,0.4)" strokeWidth="1.5"
            />
          </g>

          {/* Beach chair — left of center, larger */}
          <g opacity="0.6" transform="translate(550, 760) scale(1.6)">
            <line x1="-20" y1="0" x2="-15" y2="50" stroke="rgba(90,58,28,0.8)" strokeWidth="2.5" />
            <line x1="30" y1="-10" x2="35" y2="50" stroke="rgba(90,58,28,0.8)" strokeWidth="2.5" />
            <line x1="-20" y1="0" x2="30" y2="-10" stroke="rgba(90,58,28,0.7)" strokeWidth="2" />
            <line x1="30" y1="-10" x2="45" y2="-40" stroke="rgba(90,58,28,0.8)" strokeWidth="2.5" />
            <path d="M-18 2 L32 -8 L47 -38 L42 -38Z" fill="rgba(220,60,50,0.4)" />
            {/* Towel draped */}
            <path d="M-16 4 L34 -6 L36 -2 L-14 8Z" fill="rgba(255,200,50,0.2)" />
          </g>

          {/* Beach chair — right side, larger */}
          <g opacity="0.55" transform="translate(1350, 775) scale(1.4)">
            <line x1="-18" y1="0" x2="-13" y2="45" stroke="rgba(90,58,28,0.7)" strokeWidth="2.5" />
            <line x1="25" y1="-8" x2="30" y2="45" stroke="rgba(90,58,28,0.7)" strokeWidth="2.5" />
            <line x1="-18" y1="0" x2="25" y2="-8" stroke="rgba(90,58,28,0.6)" strokeWidth="2" />
            <line x1="25" y1="-8" x2="38" y2="-35" stroke="rgba(90,58,28,0.7)" strokeWidth="2.5" />
            <path d="M-16 2 L27 -6 L40 -33 L35 -33Z" fill="rgba(50,130,210,0.35)" />
          </g>

          {/* Beach towel with baby — right side of sand */}
          <g transform="translate(1050, 800) rotate(-8)">
            {/* Towel — coral & teal stripes, slightly rumpled */}
            <rect x="-55" y="-30" width="110" height="65" rx="3" fill="#0d9488" opacity="0.8" />
            <rect x="-55" y="-30" width="110" height="8" fill="#f87171" opacity="0.8" />
            <rect x="-55" y="-22" width="110" height="5" fill="#1a1a1a" opacity="0.8" />
            <rect x="-55" y="-17" width="110" height="10" fill="#0d9488" opacity="0.8" />
            <rect x="-55" y="-7" width="110" height="5" fill="#1a1a1a" opacity="0.8" />
            <rect x="-55" y="-2" width="110" height="10" fill="#f87171" opacity="0.8" />
            <rect x="-55" y="8" width="110" height="5" fill="#1a1a1a" opacity="0.8" />
            <rect x="-55" y="13" width="110" height="10" fill="#0d9488" opacity="0.8" />
            <rect x="-55" y="23" width="110" height="5" fill="#f87171" opacity="0.8" />
            <rect x="-55" y="28" width="110" height="7" fill="#1a1a1a" opacity="0.8" />
            {/* Towel fringe */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`tf-${i}`} x1={-50 + i * 11} y1="-30" x2={-50 + i * 11 + (i % 2 ? 1 : -1)} y2="-34" stroke="#0d9488" strokeWidth="1" opacity="0.5" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`tb-${i}`} x1={-50 + i * 11} y1="35" x2={-50 + i * 11 + (i % 2 ? 1 : -1)} y2="39" stroke="#0d9488" strokeWidth="1" opacity="0.5" />
            ))}
            {/* Baby — lying on towel, cute round shape */}
            {/* Body — round onesie */}
            <ellipse cx="5" cy="2" rx="14" ry="11" fill="rgba(255,230,210,0.9)" />
            {/* Onesie — soft yellow */}
            <ellipse cx="5" cy="4" rx="12" ry="9" fill="rgba(255,240,180,0.85)" />
            {/* Head — round with tuft of hair */}
            <circle cx="5" cy="-10" r="9" fill="rgba(255,225,200,0.95)" />
            {/* Hair tuft */}
            <path d="M2 -18 Q5 -22 8 -18" fill="none" stroke="rgba(160,110,60,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M0 -17 Q3 -20 5 -18" fill="none" stroke="rgba(160,110,60,0.5)" strokeWidth="1" strokeLinecap="round" />
            {/* Eyes — closed, sleeping */}
            <path d="M1 -11 Q3 -9 5 -11" fill="none" stroke="rgba(80,50,30,0.5)" strokeWidth="0.8" />
            <path d="M6 -11 Q8 -9 10 -11" fill="none" stroke="rgba(80,50,30,0.5)" strokeWidth="0.8" />
            {/* Rosy cheeks */}
            <circle cx="-1" cy="-8" r="2.5" fill="rgba(255,150,150,0.3)" />
            <circle cx="11" cy="-8" r="2.5" fill="rgba(255,150,150,0.3)" />
            {/* Tiny mouth — content smile */}
            <path d="M4 -7 Q5.5 -5.5 7 -7" fill="none" stroke="rgba(200,120,100,0.4)" strokeWidth="0.6" />
            {/* Little arms */}
            <ellipse cx="-8" cy="0" rx="5" ry="3" fill="rgba(255,225,200,0.85)" transform="rotate(-20 -8 0)" />
            <ellipse cx="18" cy="0" rx="5" ry="3" fill="rgba(255,225,200,0.85)" transform="rotate(20 18 0)" />
            {/* Little feet */}
            <circle cx="-2" cy="13" r="3.5" fill="rgba(255,225,200,0.8)" />
            <circle cx="12" cy="13" r="3.5" fill="rgba(255,225,200,0.8)" />
            {/* Baby bottle nearby */}
            <g transform="translate(28, 8) rotate(25)">
              <rect x="-2" y="-8" width="4" height="12" rx="2" fill="rgba(220,240,255,0.7)" />
              <rect x="-1.5" y="-11" width="3" height="4" rx="1" fill="rgba(255,200,150,0.6)" />
              <rect x="-2" y="-1" width="4" height="3" fill="rgba(200,230,255,0.5)" />
            </g>
            {/* Tiny sun hat next to baby */}
            <g transform="translate(-30, -5)">
              <ellipse cx="0" cy="0" rx="12" ry="4" fill="rgba(255,240,200,0.7)" />
              <ellipse cx="0" cy="-2" rx="7" ry="5" fill="rgba(255,235,180,0.75)" />
              <path d="M-5 -5 Q0 -8 5 -5" fill="none" stroke="rgba(240,180,100,0.4)" strokeWidth="0.8" />
            </g>
          </g>

          {/* Scattered shells and starfish */}
          {/* Starfish 1 — orange */}
          <g transform="translate(480, 830) scale(2.5)" opacity="0.55">
            <path d="M0 -8 L2 -2 L8 -2 L3 2 L5 8 L0 4 L-5 8 L-3 2 L-8 -2 L-2 -2Z" fill="rgba(251,146,60,0.7)" />
          </g>
          {/* Starfish 2 — pink */}
          <g transform="translate(1280, 860) rotate(30) scale(2)" opacity="0.5">
            <path d="M0 -7 L2 -2 L7 -2 L3 1 L4 7 L0 3 L-4 7 L-3 1 L-7 -2 L-2 -2Z" fill="rgba(244,114,182,0.6)" />
          </g>
          {/* Starfish 3 */}
          <g transform="translate(960, 900) rotate(-15) scale(1.8)" opacity="0.4">
            <path d="M0 -7 L2 -2 L7 -2 L3 1 L4 7 L0 3 L-4 7 L-3 1 L-7 -2 L-2 -2Z" fill="rgba(251,146,60,0.5)" />
          </g>
          {/* Shell 1 — conch */}
          <g transform="translate(650, 850)" opacity="0.5">
            <ellipse cx="0" cy="0" rx="12" ry="8" fill="rgba(255,230,200,0.6)" />
            <path d="M-10 0 Q-5 -6 0 -4 Q5 -6 10 0" fill="none" stroke="rgba(200,170,140,0.5)" strokeWidth="1.5" />
            <path d="M-8 2 Q-3 -3 2 -1 Q7 -3 8 2" fill="none" stroke="rgba(200,170,140,0.3)" strokeWidth="1" />
          </g>
          {/* Shell 2 — scallop */}
          <g transform="translate(1100, 840)" opacity="0.45">
            <ellipse cx="0" cy="0" rx="10" ry="7" fill="rgba(255,220,200,0.55)" />
            <line x1="0" y1="-6" x2="-6" y2="4" stroke="rgba(200,170,140,0.3)" strokeWidth="0.8" />
            <line x1="0" y1="-6" x2="0" y2="5" stroke="rgba(200,170,140,0.3)" strokeWidth="0.8" />
            <line x1="0" y1="-6" x2="6" y2="4" stroke="rgba(200,170,140,0.3)" strokeWidth="0.8" />
          </g>
          {/* Shell 3 */}
          <ellipse cx="820" cy="870" rx="8" ry="5" fill="rgba(255,235,215,0.45)" />

          {/* Footprints leading to water */}
          <g opacity="0.18">
            <ellipse cx="700" cy="890" rx="5" ry="8" fill="rgba(140,105,70,0.5)" transform="rotate(-10 700 890)" />
            <ellipse cx="715" cy="880" rx="5" ry="8" fill="rgba(140,105,70,0.5)" transform="rotate(10 715 880)" />
            <ellipse cx="735" cy="905" rx="5" ry="8" fill="rgba(140,105,70,0.45)" transform="rotate(-10 735 905)" />
            <ellipse cx="750" cy="895" rx="5" ry="8" fill="rgba(140,105,70,0.45)" transform="rotate(10 750 895)" />
            <ellipse cx="770" cy="918" rx="5" ry="8" fill="rgba(140,105,70,0.4)" transform="rotate(-5 770 918)" />
            <ellipse cx="785" cy="910" rx="5" ry="8" fill="rgba(140,105,70,0.4)" transform="rotate(5 785 910)" />
          </g>

          {/* Beach grass tufts — bigger, more natural */}
          <g opacity="0.4">
            <path d="M340 810 Q330 770 325 745" fill="none" stroke="rgba(100,145,55,0.55)" strokeWidth="2" />
            <path d="M348 810 Q355 765 362 740" fill="none" stroke="rgba(85,135,45,0.5)" strokeWidth="2" />
            <path d="M335 812 Q320 778 310 758" fill="none" stroke="rgba(90,140,50,0.45)" strokeWidth="1.5" />
            <path d="M352 812 Q365 780 375 762" fill="none" stroke="rgba(80,130,45,0.4)" strokeWidth="1.5" />

            <path d="M1540 820 Q1530 780 1525 760" fill="none" stroke="rgba(100,145,55,0.5)" strokeWidth="2" />
            <path d="M1548 820 Q1555 778 1562 755" fill="none" stroke="rgba(85,135,45,0.45)" strokeWidth="2" />
            <path d="M1535 822 Q1520 790 1512 770" fill="none" stroke="rgba(90,140,50,0.4)" strokeWidth="1.5" />
          </g>

          {/* Tide pools near shore */}
          <ellipse cx="400" cy="780" rx="35" ry="12" fill="rgba(45,212,191,0.15)" />
          <ellipse cx="400" cy="780" rx="25" ry="8" fill="rgba(45,212,191,0.1)" />
          <ellipse cx="1500" cy="790" rx="30" ry="10" fill="rgba(45,212,191,0.12)" />

          {/* === Sand texture bands — tonal variation === */}
          {/* Damp sand band */}
          <path
            d="M0 785 Q250 778 500 785 Q750 792 1000 785 Q1250 778 1500 785 Q1750 792 1920 785 L1920 820 L0 820Z"
            fill="rgba(180,140,95,0.2)"
          />
          {/* Dry sand */}
          <path
            d="M0 810 Q300 800 600 810 Q900 820 1200 810 Q1500 800 1920 810 L1920 1080 L0 1080Z"
            fill="rgba(212,170,120,0.5)"
          />
          {/* Lighter dry sand patches */}
          <ellipse cx="300" cy="880" rx="120" ry="30" fill="rgba(225,190,145,0.15)" />
          <ellipse cx="960" cy="920" rx="150" ry="35" fill="rgba(225,190,145,0.12)" />
          <ellipse cx="1500" cy="870" rx="100" ry="25" fill="rgba(225,190,145,0.1)" />
          {/* Wind-swept sand ripple lines */}
          <path d="M200 850 Q350 846 500 850" fill="none" stroke="rgba(180,145,100,0.1)" strokeWidth="1" />
          <path d="M450 880 Q600 876 750 880" fill="none" stroke="rgba(180,145,100,0.08)" strokeWidth="1" />
          <path d="M800 860 Q950 856 1100 860" fill="none" stroke="rgba(180,145,100,0.1)" strokeWidth="1" />
          <path d="M1150 890 Q1300 886 1450 890" fill="none" stroke="rgba(180,145,100,0.08)" strokeWidth="1" />
          <path d="M1400 850 Q1550 846 1700 850" fill="none" stroke="rgba(180,145,100,0.09)" strokeWidth="1" />
          {/* Deep dry sand at bottom */}
          <path
            d="M0 920 Q400 910 800 920 Q1200 930 1600 915 Q1800 910 1920 920 L1920 1080 L0 1080Z"
            fill="rgba(194,150,107,0.35)"
          />
        </svg>
      </div>

      {/* Animated components — layered from background to foreground */}
      {!isMobile && <TropicalClouds />}
      <SunShimmer />
      {!isMobile && <OceanWaves />}
      <CoralGlow />
      <FloatingJellyfish />
      {!isMobile && <TideFoam />}
      <SwayingPalms />
      <TropicalBirds />
      <SandSparkle />
      <BeachEasterEggs />
      {!isMobile && <SunbeamVignette />}
      <CursorFish />
    </div>
  )
})
