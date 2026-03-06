import { memo, useEffect, useRef } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"
import { EmberTrail } from "./EmberTrail"
import { HeatHaze } from "./HeatHaze"
import { CursorBat } from "./CursorBat"
import { VolcanoBoulders } from "./VolcanoBoulders"
import { VolcanicAsh } from "./VolcanicAsh"
import { VolcanoLightning } from "./VolcanoLightning"
import { SmokePlume } from "./SmokePlume"
import { ScreenTremor } from "./ScreenTremor"
import { VolcanoEasterEggs } from "./VolcanoEasterEggs"
import { TorchVignette } from "./TorchVignette"
import { CinderFountains } from "./CinderFountains"
import { HorizonGlow } from "./HorizonGlow"
import { Ravens } from "./Ravens"
import { HangingChains } from "./HangingChains"
import { VolcanoSigil } from "./VolcanoSigil"

interface VolcanoSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const VolcanoScene = memo(function VolcanoScene({ onMouseXChange }: VolcanoSceneProps) {
  const isMobile = useIsMobile()
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  // Report mouse X for audio panning
  const prevMouseXRef = useRef(0)
  useEffect(() => {
    const normalized = offset.x / 25
    if (Math.abs(normalized - prevMouseXRef.current) > 0.01) {
      prevMouseXRef.current = normalized
      onMouseXChange?.(normalized)
    }
  }, [offset.x, onMouseXChange])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient — dark crimson to black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #7f1d1d 0%, #450a0a 40%, #1a0505 70%, #0a0000 100%)",
        }}
      />

      {/* Distant red horizon glow — pulsing lava beyond the visible area */}
      <HorizonGlow />

      {/* Layer 1: Distant mountain range + eruption glow (depth: 0.08) */}
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
            <radialGradient id="eruption-glow" cx="50%" cy="15%" r="25%">
              <stop offset="0%" stopColor="rgba(255,200,100,0.9)" />
              <stop offset="25%" stopColor="rgba(255,150,50,0.7)" />
              <stop offset="50%" stopColor="rgba(255,100,0,0.5)" />
              <stop offset="75%" stopColor="rgba(128,50,0,0.25)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <radialGradient id="lava-haze" cx="50%" cy="85%" r="40%">
              <stop offset="0%" stopColor="rgba(255,100,0,0.15)" />
              <stop offset="60%" stopColor="rgba(234,88,12,0.05)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Eruption glow sphere */}
          <ellipse cx="960" cy="120" rx="500" ry="250" fill="url(#eruption-glow)" />

          {/* Distant mountain silhouettes */}
          <path
            d="M0 550 L120 380 L240 440 L360 320 L480 400 L600 280 L720 350
               L840 220 L900 140 L960 80 L1020 140 L1080 220
               L1200 350 L1320 280 L1440 400 L1560 320 L1680 440 L1800 380 L1920 550
               L1920 1080 L0 1080Z"
            fill="rgba(25,8,8,0.85)"
          />

          {/* Volcano peak outline glow */}
          <path
            d="M840 220 L900 140 L960 80 L1020 140 L1080 220"
            fill="none"
            stroke="#ea580c"
            strokeWidth="3"
            opacity="0.5"
          />
          <path
            d="M870 190 L920 120 L960 90 L1000 120 L1050 190"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            opacity="0.3"
          />

          {/* Lava rivers flowing down mountain — thick glowing streams */}
          {/* Main central flow */}
          <path
            d="M960 95 Q955 200 940 350 Q930 450 960 550 Q970 620 965 700"
            fill="none" stroke="#ea580c" strokeWidth="8" opacity="0.4"
          />
          <path
            d="M960 95 Q955 200 940 350 Q930 450 960 550 Q970 620 965 700"
            fill="none" stroke="#fbbf24" strokeWidth="3" opacity="0.25"
          />
          {/* Right flow */}
          <path
            d="M960 95 Q970 180 990 300 Q1010 420 1000 520 Q995 600 1010 700"
            fill="none" stroke="#ea580c" strokeWidth="7" opacity="0.35"
          />
          <path
            d="M960 95 Q970 180 990 300 Q1010 420 1000 520 Q995 600 1010 700"
            fill="none" stroke="#fbbf24" strokeWidth="2.5" opacity="0.2"
          />
          {/* Left branch */}
          <path
            d="M950 130 Q920 280 880 420 Q860 500 850 600"
            fill="none" stroke="#ea580c" strokeWidth="6" opacity="0.3"
          />
          <path
            d="M950 130 Q920 280 880 420 Q860 500 850 600"
            fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.15"
          />
          {/* Right branch */}
          <path
            d="M970 130 Q1010 260 1060 400 Q1080 480 1090 580"
            fill="none" stroke="#ea580c" strokeWidth="6" opacity="0.3"
          />
          <path
            d="M970 130 Q1010 260 1060 400 Q1080 480 1090 580"
            fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.15"
          />
          {/* Extra thin tributaries */}
          <path
            d="M940 350 Q910 400 890 480"
            fill="none" stroke="#ea580c" strokeWidth="4" opacity="0.2"
          />
          <path
            d="M990 300 Q1030 360 1050 440"
            fill="none" stroke="#ea580c" strokeWidth="4" opacity="0.2"
          />


          {/* Lava haze at bottom */}
          <rect x="0" y="500" width="1920" height="580" fill="url(#lava-haze)" />

          {/* Distant bats flying near the peak */}
          <g opacity="0.4">
            {/* Bat 1 — circling near peak */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 40,-15; 80,0; 40,15; 0,0" dur="8s" repeatCount="indefinite" />
              <path d="M860 180 l-8,-4 l4,4 l-4,4 z" fill="rgba(20,5,5,0.9)">
                <animate attributeName="d"
                  values="M860 180 l-8,-4 l4,4 l-4,4 z;M860 180 l-6,-2 l3,2 l-3,2 z;M860 180 l-8,-4 l4,4 l-4,4 z"
                  dur="0.4s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat 2 */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; -30,-10; -60,5; -30,15; 0,0" dur="10s" repeatCount="indefinite" />
              <path d="M1070 160 l-7,-3 l3,3 l-3,3 z" fill="rgba(20,5,5,0.8)">
                <animate attributeName="d"
                  values="M1070 160 l-7,-3 l3,3 l-3,3 z;M1070 160 l-5,-1 l2,1 l-2,1 z;M1070 160 l-7,-3 l3,3 l-3,3 z"
                  dur="0.35s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat 3 */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 50,10; 100,-5; 50,-15; 0,0" dur="12s" repeatCount="indefinite" />
              <path d="M780 220 l-9,-4 l4,4 l-4,4 z" fill="rgba(20,5,5,0.7)">
                <animate attributeName="d"
                  values="M780 220 l-9,-4 l4,4 l-4,4 z;M780 220 l-6,-2 l3,2 l-3,2 z;M780 220 l-9,-4 l4,4 l-4,4 z"
                  dur="0.45s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
      </div>

      {/* Layer 2: Mid-ground — rock formations, lava cracks, flying bats (depth: 0.2) */}
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
            <filter id="ember-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Mid-ground rock shelves */}
          <path
            d="M0 650 L80 520 L160 580 L280 480 L380 540 L0 650Z"
            fill="rgba(20,5,5,0.9)"
          />
          <path
            d="M1920 620 L1840 490 L1750 550 L1640 450 L1540 520 L1920 620Z"
            fill="rgba(20,5,5,0.85)"
          />

          {/* Lava cracks in the ground */}
          <path d="M200 750 Q300 740 400 760 Q500 780 550 770" fill="none" stroke="#ea580c" strokeWidth="4" opacity="0.3" />
          <path d="M200 750 Q300 740 400 760 Q500 780 550 770" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.15" />
          <path d="M700 800 Q780 790 850 810 Q900 820 950 800" fill="none" stroke="#ea580c" strokeWidth="3.5" opacity="0.25" />
          <path d="M1100 780 Q1200 770 1300 790 Q1380 800 1450 785" fill="none" stroke="#ea580c" strokeWidth="4" opacity="0.28" />
          <path d="M1100 780 Q1200 770 1300 790 Q1380 800 1450 785" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.12" />
          <path d="M1550 760 Q1650 750 1750 770" fill="none" stroke="#ea580c" strokeWidth="3" opacity="0.22" />

          {/* Mid-level bats — larger, closer */}
          <g opacity="0.55">
            {/* Bat 4 — sweeping left to right */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 120,-30; 240,0; 120,30; 0,0" dur="15s" repeatCount="indefinite" />
              <path d="M300 400 l-12,-5 l6,5 l-6,5 z" fill="rgba(15,3,3,0.9)">
                <animate attributeName="d"
                  values="M300 400 l-12,-5 l6,5 l-6,5 z;M300 400 l-8,-2 l4,2 l-4,2 z;M300 400 l-12,-5 l6,5 l-6,5 z"
                  dur="0.35s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat 5 — circling mid-right */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; -80,20; -160,0; -80,-20; 0,0" dur="13s" repeatCount="indefinite" />
              <path d="M1500 350 l-14,-6 l7,6 l-7,6 z" fill="rgba(15,3,3,0.85)">
                <animate attributeName="d"
                  values="M1500 350 l-14,-6 l7,6 l-7,6 z;M1500 350 l-9,-2 l5,2 l-5,2 z;M1500 350 l-14,-6 l7,6 l-7,6 z"
                  dur="0.3s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat 6 — drifting across center */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 60,-25; 130,-10; 60,15; 0,0" dur="11s" repeatCount="indefinite" />
              <path d="M750 480 l-11,-5 l5,5 l-5,5 z" fill="rgba(15,3,3,0.8)">
                <animate attributeName="d"
                  values="M750 480 l-11,-5 l5,5 l-5,5 z;M750 480 l-7,-2 l4,2 l-4,2 z;M750 480 l-11,-5 l5,5 l-5,5 z"
                  dur="0.38s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat 7 — upper right */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; -50,-20; -100,5; -50,20; 0,0" dur="9s" repeatCount="indefinite" />
              <path d="M1650 300 l-10,-4 l5,4 l-5,4 z" fill="rgba(15,3,3,0.75)">
                <animate attributeName="d"
                  values="M1650 300 l-10,-4 l5,4 l-5,4 z;M1650 300 l-7,-2 l3,2 l-3,2 z;M1650 300 l-10,-4 l5,4 l-5,4 z"
                  dur="0.42s" repeatCount="indefinite" />
              </path>
            </g>
          </g>

          {/* === Embers / floating particles === */}
          <g filter="url(#ember-glow)">
            <circle cx="250" cy="350" r="3" fill="#ea580c" opacity="0.7">
              <animate attributeName="cy" values="350;330;350" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cx" values="250;260;250" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="580" cy="480" r="2.5" fill="#ef4444" opacity="0.6">
              <animate attributeName="cy" values="480;455;480" dur="5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="580;570;580" dur="7s" repeatCount="indefinite" />
            </circle>
            <circle cx="870" cy="300" r="3.5" fill="#f59e0b" opacity="0.8">
              <animate attributeName="cy" values="300;275;300" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="870;885;870" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="1100" cy="420" r="2" fill="#ea580c" opacity="0.5">
              <animate attributeName="cy" values="420;400;420" dur="6s" repeatCount="indefinite" />
            </circle>
            <circle cx="1350" cy="350" r="3" fill="#ef4444" opacity="0.65">
              <animate attributeName="cy" values="350;325;350" dur="4.5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="1350;1340;1350" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="1650" cy="450" r="2.5" fill="#f59e0b" opacity="0.55">
              <animate attributeName="cy" values="450;430;450" dur="5.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="1800" cy="280" r="2" fill="#ea580c" opacity="0.5">
              <animate attributeName="cy" values="280;265;280" dur="4s" repeatCount="indefinite" />
              <animate attributeName="cx" values="1800;1810;1800" dur="6s" repeatCount="indefinite" />
            </circle>
            {/* Small static embers */}
            <circle cx="150" cy="500" r="1.5" fill="#ef4444" opacity="0.4" />
            <circle cx="420" cy="620" r="1" fill="#ea580c" opacity="0.3" />
            <circle cx="650" cy="250" r="1.5" fill="#ef4444" opacity="0.35" />
            <circle cx="1020" cy="550" r="1" fill="#ea580c" opacity="0.3" />
            <circle cx="1250" cy="500" r="1.5" fill="#ef4444" opacity="0.4" />
            <circle cx="1480" cy="280" r="1" fill="#ea580c" opacity="0.3" />
            <circle cx="1720" cy="600" r="1.5" fill="#ef4444" opacity="0.35" />
          </g>
        </svg>
      </div>

      {/* Layer 3: Foreground — lava pools, demon figures, ground (depth: 0.4) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <svg
          viewBox="0 0 1920 1080"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="lava-pool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,200,100,0.8)" />
              <stop offset="40%" stopColor="rgba(255,100,0,0.6)" />
              <stop offset="70%" stopColor="rgba(234,88,12,0.3)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <filter id="pool-glow">
              <feGaussianBlur stdDeviation="20" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Foreground rock silhouettes */}
          <path
            d="M0 820 L60 720 L130 760 L220 680 L300 740 L0 820Z"
            fill="rgba(15,3,3,0.95)"
          />
          <path
            d="M1920 790 L1860 700 L1780 740 L1700 660 L1620 720 L1920 790Z"
            fill="rgba(15,3,3,0.9)"
          />

          {/* === Lava pools === */}
          <g filter="url(#pool-glow)">
            <ellipse cx="500" cy="920" rx="120" ry="35" fill="url(#lava-pool)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
              <animate attributeName="rx" values="120;125;120" dur="3s" repeatCount="indefinite" />
              <animate attributeName="ry" values="35;37;35" dur="3s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="960" cy="950" rx="150" ry="40" fill="url(#lava-pool)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="rx" values="150;155;150" dur="4s" begin="1.2s" repeatCount="indefinite" />
              <animate attributeName="ry" values="40;42;40" dur="4s" begin="1.2s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="1400" cy="910" rx="110" ry="30" fill="url(#lava-pool)">
              <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" begin="2.5s" repeatCount="indefinite" />
              <animate attributeName="rx" values="110;115;110" dur="5s" begin="2.5s" repeatCount="indefinite" />
              <animate attributeName="ry" values="30;32;30" dur="5s" begin="2.5s" repeatCount="indefinite" />
            </ellipse>
          </g>

          {/* Ground plane */}
          <rect x="0" y="900" width="1920" height="180" fill="rgba(10,2,2,0.6)" />

          {/* Ground lava veins */}
          <path d="M400 1080 Q450 980 500 920" fill="none" stroke="#ea580c" strokeWidth="5" opacity="0.3" />
          <path d="M400 1080 Q450 980 500 920" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.15" />
          <path d="M960 1080 Q970 1000 960 950" fill="none" stroke="#ea580c" strokeWidth="6" opacity="0.35" />
          <path d="M960 1080 Q970 1000 960 950" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.18" />
          <path d="M1500 1080 Q1480 990 1400 920" fill="none" stroke="#ea580c" strokeWidth="5" opacity="0.3" />
          <path d="M1500 1080 Q1480 990 1400 920" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.15" />


          {/* === Demon silhouettes — walking/patrolling === */}

          {/* Demon 1 — walking left, near left lava pool */}
          <g opacity="0.7">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; -60,0; -120,0; -60,0; 0,0" dur="20s" repeatCount="indefinite" />
            <g transform="translate(380, 850) scale(1.2)">
              {/* Head with horns */}
              <circle cx="6" cy="-8" r="5" fill="rgba(10,2,2,0.95)" />
              <line x1="2" y1="-12" x2="-2" y2="-18" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              <line x1="10" y1="-12" x2="14" y2="-18" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              {/* Body */}
              <rect x="2" y="-3" width="8" height="22" rx="3" fill="rgba(10,2,2,0.95)" />
              {/* Arms */}
              <line x1="2" y1="2" x2="-6" y2="10" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="10;8;10;12;10" dur="1.2s" repeatCount="indefinite" />
              </line>
              <line x1="10" y1="2" x2="18" y2="10" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="10;12;10;8;10" dur="1.2s" repeatCount="indefinite" />
              </line>
              {/* Legs — walking animation */}
              <line x1="4" y1="19" x2="0" y2="30" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="0;-3;0;3;0" dur="0.8s" repeatCount="indefinite" />
              </line>
              <line x1="8" y1="19" x2="12" y2="30" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="12;15;12;9;12" dur="0.8s" repeatCount="indefinite" />
              </line>
              {/* Glowing eyes */}
              <circle cx="4" cy="-9" r="1" fill="#ea580c" opacity="0.8" />
              <circle cx="8" cy="-9" r="1" fill="#ea580c" opacity="0.8" />
            </g>
          </g>

          {/* Demon 2 — patrolling right side */}
          <g opacity="0.6">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 50,0; 100,0; 50,0; 0,0" dur="18s" repeatCount="indefinite" />
            <g transform="translate(1520, 840) scale(1.1)">
              <circle cx="6" cy="-8" r="5" fill="rgba(10,2,2,0.95)" />
              <line x1="2" y1="-12" x2="-1" y2="-17" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              <line x1="10" y1="-12" x2="13" y2="-17" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              <rect x="2" y="-3" width="8" height="22" rx="3" fill="rgba(10,2,2,0.95)" />
              <line x1="2" y1="2" x2="-5" y2="10" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="10;12;10;8;10" dur="1.1s" repeatCount="indefinite" />
              </line>
              <line x1="10" y1="2" x2="17" y2="10" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="10;8;10;12;10" dur="1.1s" repeatCount="indefinite" />
              </line>
              <line x1="4" y1="19" x2="1" y2="30" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="1;-2;1;4;1" dur="0.9s" repeatCount="indefinite" />
              </line>
              <line x1="8" y1="19" x2="11" y2="30" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="11;14;11;8;11" dur="0.9s" repeatCount="indefinite" />
              </line>
              <circle cx="4" cy="-9" r="1" fill="#ea580c" opacity="0.8" />
              <circle cx="8" cy="-9" r="1" fill="#ea580c" opacity="0.8" />
            </g>
          </g>

          {/* Demon 3 — standing still, watching, center-left */}
          <g opacity="0.5" transform="translate(720, 860) scale(0.9)">
            <circle cx="6" cy="-8" r="4.5" fill="rgba(10,2,2,0.95)" />
            <line x1="2" y1="-11" x2="-1" y2="-16" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
            <line x1="10" y1="-11" x2="13" y2="-16" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
            <rect x="2" y="-3" width="8" height="20" rx="3" fill="rgba(10,2,2,0.95)" />
            <line x1="2" y1="1" x2="-4" y2="9" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <line x1="10" y1="1" x2="16" y2="9" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <line x1="4" y1="17" x2="2" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <line x1="8" y1="17" x2="10" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <circle cx="4" cy="-9" r="1" fill="#ea580c" opacity="0.7" />
            <circle cx="8" cy="-9" r="1" fill="#ea580c" opacity="0.7" />
          </g>

          {/* Demon 4 — smaller, distant, center-right */}
          <g opacity="0.4" transform="translate(1180, 870) scale(0.7)">
            <circle cx="6" cy="-8" r="4.5" fill="rgba(10,2,2,0.95)" />
            <line x1="2" y1="-11" x2="0" y2="-16" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
            <line x1="10" y1="-11" x2="12" y2="-16" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
            <rect x="2" y="-3" width="8" height="20" rx="3" fill="rgba(10,2,2,0.95)" />
            <line x1="4" y1="17" x2="2" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <line x1="8" y1="17" x2="10" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2" />
            <circle cx="4" cy="-9" r="1" fill="#ea580c" opacity="0.6" />
            <circle cx="8" cy="-9" r="1" fill="#ea580c" opacity="0.6" />
          </g>

          {/* Demon 5 — wandering near center pool */}
          <g opacity="0.55">
            <animateTransform attributeName="transform" type="translate"
              values="0,0; 30,0; 60,0; 30,0; 0,0" dur="25s" repeatCount="indefinite" />
            <g transform="translate(900, 880) scale(0.85)">
              <circle cx="6" cy="-8" r="4.5" fill="rgba(10,2,2,0.95)" />
              <line x1="2" y1="-11" x2="-2" y2="-17" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              <line x1="10" y1="-11" x2="14" y2="-17" stroke="rgba(10,2,2,0.95)" strokeWidth="1.5" />
              <rect x="2" y="-3" width="8" height="20" rx="3" fill="rgba(10,2,2,0.95)" />
              <line x1="2" y1="1" x2="-5" y2="8" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="8;6;8;10;8" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="10" y1="1" x2="17" y2="8" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="y2" values="8;10;8;6;8" dur="1.5s" repeatCount="indefinite" />
              </line>
              <line x1="4" y1="17" x2="1" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="1;-1;1;3;1" dur="1s" repeatCount="indefinite" />
              </line>
              <line x1="8" y1="17" x2="11" y2="28" stroke="rgba(10,2,2,0.95)" strokeWidth="2">
                <animate attributeName="x2" values="11;13;11;9;11" dur="1s" repeatCount="indefinite" />
              </line>
              <circle cx="4" cy="-9" r="1" fill="#ea580c" opacity="0.7" />
              <circle cx="8" cy="-9" r="1" fill="#ea580c" opacity="0.7" />
            </g>
          </g>

          {/* Foreground bats — large, close to camera */}
          <g opacity="0.3">
            {/* Bat swooping low-left */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; 80,-40; 180,-20; 80,20; 0,0" dur="18s" repeatCount="indefinite" />
              <path d="M100 650 l-18,-8 l9,8 l-9,8 z" fill="rgba(10,2,2,0.9)">
                <animate attributeName="d"
                  values="M100 650 l-18,-8 l9,8 l-9,8 z;M100 650 l-12,-3 l6,3 l-6,3 z;M100 650 l-18,-8 l9,8 l-9,8 z"
                  dur="0.3s" repeatCount="indefinite" />
              </path>
            </g>
            {/* Bat swooping low-right */}
            <g>
              <animateTransform attributeName="transform" type="translate"
                values="0,0; -70,-30; -160,0; -70,25; 0,0" dur="16s" repeatCount="indefinite" />
              <path d="M1800 680 l-16,-7 l8,7 l-8,7 z" fill="rgba(10,2,2,0.85)">
                <animate attributeName="d"
                  values="M1800 680 l-16,-7 l8,7 l-8,7 z;M1800 680 l-10,-3 l5,3 l-5,3 z;M1800 680 l-16,-7 l8,7 l-8,7 z"
                  dur="0.33s" repeatCount="indefinite" />
              </path>
            </g>
          </g>
        </svg>
      </div>

      {/* Glowing arcane sigil on the mountain face */}
      {!isMobile && <VolcanoSigil />}

      {/* Ravens circling high in the sky */}
      {!isMobile && <Ravens />}

      {/* Hanging chains and cages from rock overhangs */}
      {!isMobile && <HangingChains />}

      {/* Easter eggs hidden in the rocks */}
      <VolcanoEasterEggs />

      {/* Smoke plume billowing from peak */}
      {!isMobile && <SmokePlume />}

      {/* Boulders erupting from volcano peak (desktop only) */}
      {!isMobile && <VolcanoBoulders />}

      {/* Volcanic lightning near eruption plume */}
      <VolcanoLightning />

      {/* Volcanic ash falling across the scene */}
      <VolcanicAsh />

      {/* Cinder spark fountains from lava pools */}
      {!isMobile && <CinderFountains />}

      {/* Heat haze / smoke wisps rising from lava */}
      {!isMobile && <HeatHaze />}

      {/* Ember trail following mouse cursor */}
      <EmberTrail />

      {/* Cursor companion — flying bat */}
      <CursorBat />

      {/* Torch vignette — dark edges with warm firelight following cursor */}
      {!isMobile && <TorchVignette />}

      {/* Screen shake on eruption booms (renderless) */}
      {!isMobile && <ScreenTremor />}
    </div>
  )
})
