import { memo, useEffect } from "react"
import { useIsMobile } from "../../hooks/useIsMobile"
import { useMouseParallax, getLayerTransform } from "../../hooks/useMouseParallax"
import { useWindCycle } from "../../hooks/useWindCycle"
import { FallingSnow } from "./FallingSnow"
import { AuroraBorealis } from "./AuroraBorealis"
import { BlizzardGusts } from "./BlizzardGusts"
import { BreathMist } from "./BreathMist"
import { WolfPack } from "./WolfPack"
import { OwlInTree } from "./OwlInTree"
import { CabinSmoke } from "./CabinSmoke"
import { FrozenSparkle } from "./FrozenSparkle"
import { CursorFox } from "./CursorFox"
import { FrostVignette } from "./FrostVignette"
import { SnowEasterEggs } from "./SnowEasterEggs"
import { IciclesDrip } from "./IciclesDrip"
import { SwayingPines } from "./SwayingPines"
import { SnowCursor } from "./SnowCursor"

interface SnowSceneProps {
  onRainChange?: (intensity: number) => void
  onMouseXChange?: (x: number) => void
}

export const SnowScene = memo(function SnowScene(_props: SnowSceneProps) {
  const isMobile = useIsMobile()
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })
  const windIntensity = useWindCycle()

  // Forward mouse X for audio panning
  useEffect(() => {
    if (_props.onMouseXChange) {
      _props.onMouseXChange(offset.x / 25)
    }
  }, [offset.x, _props.onMouseXChange])

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base gradient — twilight sky to snow ground */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #1e293b 0%, #334155 12%, #475569 22%, #94a3b8 35%, #bfdbfe 52%, #e2e8f0 68%, #f1f5f9 82%, #f8fafc 100%)",
        }}
      />

      {/* Layer 1: Distant peaks, moon, aurora zone, stars (depth: 0.08) */}
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
            {/* Moon glow */}
            <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="30%" stopColor="rgba(226,232,240,0.4)" />
              <stop offset="70%" stopColor="rgba(148,163,184,0.1)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            {/* Snow cap highlight */}
            <linearGradient id="snow-cap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="100%" stopColor="rgba(226,232,240,0.3)" />
            </linearGradient>
            {/* Mountain face gradient */}
            <linearGradient id="mountain-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>

          {/* Stars scattered in twilight sky */}
          <g opacity="0.6">
            <circle cx="120" cy="60" r="1.5" fill="white" />
            <circle cx="340" cy="95" r="1" fill="white" />
            <circle cx="520" cy="40" r="1.2" fill="white" />
            <circle cx="680" cy="110" r="0.8" fill="white" />
            <circle cx="850" cy="55" r="1.3" fill="white" />
            <circle cx="1060" cy="80" r="1" fill="white" />
            <circle cx="1240" cy="35" r="1.5" fill="white" />
            <circle cx="1390" cy="100" r="0.8" fill="white" />
            <circle cx="1550" cy="50" r="1.2" fill="white" />
            <circle cx="1720" cy="75" r="1" fill="white" />
            <circle cx="1850" cy="45" r="1.4" fill="white" />
            <circle cx="200" cy="140" r="0.7" fill="white" />
            <circle cx="450" cy="160" r="1" fill="white" />
            <circle cx="750" cy="145" r="0.8" fill="white" />
            <circle cx="1100" cy="130" r="1.1" fill="white" />
            <circle cx="1500" cy="155" r="0.9" fill="white" />
            <circle cx="1800" cy="120" r="1" fill="white" />
            {/* Twinkling stars */}
            <circle cx="280" cy="70" r="1.2" fill="white">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="960" cy="30" r="1.5" fill="white">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="1650" cy="90" r="1.3" fill="white">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Crescent moon with glow */}
          <ellipse cx="1600" cy="120" rx="80" ry="80" fill="url(#moon-glow)" />
          <circle cx="1600" cy="120" r="28" fill="#f1f5f9" />
          <circle cx="1612" cy="115" r="24" fill="#1e293b" /> {/* Crescent cutout */}

          {/* Wispy clouds near horizon */}
          <ellipse cx="400" cy="280" rx="180" ry="12" fill="rgba(148,163,184,0.2)" />
          <ellipse cx="900" cy="260" rx="220" ry="15" fill="rgba(148,163,184,0.15)" />
          <ellipse cx="1500" cy="290" rx="160" ry="10" fill="rgba(148,163,184,0.18)" />

          {/* Distant mountain range — blue-grey with snow caps */}
          <path
            d="M0 520 L80 420 L160 460 L280 340 L380 400 L480 300 L560 360
               L680 240 L780 320 L860 210 L940 160 L1020 210
               L1100 300 L1180 240 L1280 340 L1380 280 L1480 370
               L1560 310 L1660 400 L1760 340 L1860 420 L1920 480
               L1920 1080 L0 1080Z"
            fill="url(#mountain-face)"
            opacity="0.5"
          />

          {/* Snow caps on major peaks */}
          <path d="M640 270 L680 240 L720 280 L700 260 L660 275Z" fill="url(#snow-cap)" />
          <path d="M820 240 L860 210 L900 250 L880 230 L840 245Z" fill="url(#snow-cap)" />
          <path
            d="M900 190 L940 160 L980 195 L960 175 L920 192Z"
            fill="url(#snow-cap)"
            opacity="0.95"
          />
          <path d="M1140 270 L1180 240 L1220 280 L1200 260 L1160 275Z" fill="url(#snow-cap)" />
          <path d="M1340 310 L1380 280 L1420 320 L1400 300 L1360 315Z" fill="url(#snow-cap)" />
          <path d="M1520 340 L1560 310 L1600 345 L1580 325 L1540 342Z" fill="url(#snow-cap)" />

          {/* Snow cloud band along peaks */}
          <ellipse cx="700" cy="290" rx="100" ry="8" fill="rgba(255,255,255,0.12)" />
          <ellipse cx="960" cy="220" rx="120" ry="10" fill="rgba(255,255,255,0.15)" />
          <ellipse cx="1300" cy="310" rx="90" ry="7" fill="rgba(255,255,255,0.1)" />
        </svg>
      </div>

      {/* Layer 2: Mid-ground — closer ridges, frozen lake, cabin, elk, bridge (depth: 0.2) */}
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
            <linearGradient id="frozen-lake" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(186,230,253,0.4)" />
              <stop offset="50%" stopColor="rgba(224,242,254,0.5)" />
              <stop offset="100%" stopColor="rgba(186,230,253,0.3)" />
            </linearGradient>
            <linearGradient id="cabin-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <radialGradient id="window-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.9)" />
              <stop offset="60%" stopColor="rgba(245,158,11,0.4)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
          </defs>

          {/* Closer mountain ridges — darker, more detail */}
          <path
            d="M0 600 L100 500 L200 540 L340 440 L440 500 L560 400
               L680 470 L800 380 L920 440 L1020 360 L1120 430
               L1240 380 L1360 460 L1480 400 L1580 480 L1700 420
               L1800 490 L1920 450 L1920 1080 L0 1080Z"
            fill="#334155"
            opacity="0.7"
          />

          {/* Snow on closer ridges */}
          <path
            d="M300 460 L340 440 L380 465 L360 450 L320 462Z"
            fill="rgba(241,245,249,0.8)"
          />
          <path
            d="M520 420 L560 400 L600 425 L580 410 L540 422Z"
            fill="rgba(241,245,249,0.85)"
          />
          <path
            d="M980 380 L1020 360 L1060 385 L1040 370 L1000 382Z"
            fill="rgba(241,245,249,0.8)"
          />
          <path
            d="M1440 420 L1480 400 L1520 425 L1500 410 L1460 422Z"
            fill="rgba(241,245,249,0.75)"
          />

          {/* Pine treeline along ridge */}
          <g fill="#1e3a2f" opacity="0.6">
            <polygon points="160,540 175,470 190,540" />
            <polygon points="210,535 228,455 246,535" />
            <polygon points="260,542 275,478 290,542" />
            <polygon points="700,470 718,395 736,470" />
            <polygon points="750,475 765,410 780,475" />
            <polygon points="1300,460 1318,385 1336,460" />
            <polygon points="1350,465 1365,400 1380,465" />
            <polygon points="1700,490 1715,430 1730,490" />
            <polygon points="1755,485 1772,418 1789,485" />
          </g>

          {/* Frozen lake between ridges */}
          <ellipse cx="960" cy="620" rx="320" ry="60" fill="url(#frozen-lake)" />
          {/* Ice cracks on lake */}
          <g stroke="rgba(186,230,253,0.3)" strokeWidth="0.8" fill="none">
            <path d="M780 615 L830 625 L880 618" />
            <path d="M920 630 L960 620 L1000 628 L1040 615" />
            <path d="M1060 625 L1110 618 L1140 630" />
          </g>
          {/* Ice reflection shimmer */}
          <ellipse cx="960" cy="620" rx="200" ry="30" fill="rgba(255,255,255,0.08)" />

          {/* Stone bridge over frozen stream */}
          <g opacity="0.65">
            {/* Arch */}
            <path
              d="M580 680 Q620 650 660 680"
              fill="none" stroke="#64748b" strokeWidth="6"
            />
            {/* Stone texture */}
            <rect x="575" y="675" width="90" height="8" rx="2" fill="#64748b" />
            {/* Snow on bridge */}
            <path d="M578 675 Q620 668 662 675" fill="rgba(241,245,249,0.7)" strokeWidth="0" />
            {/* Frozen stream below */}
            <path d="M560 700 Q610 690 660 700 Q720 710 780 695"
              fill="none" stroke="rgba(186,230,253,0.3)" strokeWidth="2" />
          </g>

          {/* Cabin/lodge */}
          <g transform="translate(1350, 540)">
            {/* Cabin body */}
            <rect x="0" y="20" width="80" height="50" fill="url(#cabin-wall)" />
            {/* Log texture lines */}
            <line x1="0" y1="30" x2="80" y2="30" stroke="#3b1a00" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="40" x2="80" y2="40" stroke="#3b1a00" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="50" x2="80" y2="50" stroke="#3b1a00" strokeWidth="0.5" opacity="0.4" />
            <line x1="0" y1="60" x2="80" y2="60" stroke="#3b1a00" strokeWidth="0.5" opacity="0.4" />
            {/* Roof */}
            <polygon points="-8,20 40,-10 88,20" fill="#475569" />
            {/* Snow on roof */}
            <polygon points="-10,18 40,-14 90,18 85,20 40,-8 -5,20" fill="rgba(241,245,249,0.9)" />
            {/* Door */}
            <rect x="32" y="45" width="16" height="25" rx="1" fill="#451a03" />
            {/* Windows with warm glow */}
            <rect x="8" y="32" width="14" height="12" rx="1" fill="#fbbf24" opacity="0.8" />
            <rect x="58" y="32" width="14" height="12" rx="1" fill="#fbbf24" opacity="0.8" />
            {/* Window glow halos */}
            <ellipse cx="15" cy="38" rx="20" ry="18" fill="url(#window-glow)" opacity="0.3" />
            <ellipse cx="65" cy="38" rx="20" ry="18" fill="url(#window-glow)" opacity="0.3" />
            {/* Window panes */}
            <line x1="15" y1="32" x2="15" y2="44" stroke="#451a03" strokeWidth="0.8" />
            <line x1="8" y1="38" x2="22" y2="38" stroke="#451a03" strokeWidth="0.8" />
            <line x1="65" y1="32" x2="65" y2="44" stroke="#451a03" strokeWidth="0.8" />
            <line x1="58" y1="38" x2="72" y2="38" stroke="#451a03" strokeWidth="0.8" />
            {/* Chimney */}
            <rect x="55" y="-4" width="10" height="20" fill="#64748b" />
            <rect x="53" y="-6" width="14" height="4" fill="#475569" />
            {/* Snow on chimney */}
            <ellipse cx="60" cy="-6" rx="9" ry="3" fill="rgba(241,245,249,0.85)" />
            {/* Snow drifts at base */}
            <ellipse cx="40" cy="72" rx="55" ry="8" fill="rgba(241,245,249,0.5)" />
          </g>

          {/* Elk/deer silhouettes near treeline */}
          <g opacity="0.5" fill="#1e293b">
            {/* Elk 1 — standing, looking right */}
            <g transform="translate(820, 560) scale(0.8)">
              <ellipse cx="0" cy="0" rx="18" ry="10" /> {/* Body */}
              <ellipse cx="20" cy="-8" rx="6" ry="5" /> {/* Head */}
              {/* Antlers */}
              <line x1="22" y1="-13" x2="28" y2="-26" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="26" y1="-20" x2="32" y2="-24" stroke="#1e293b" strokeWidth="1" />
              <line x1="19" y1="-13" x2="14" y2="-25" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="16" y1="-20" x2="10" y2="-23" stroke="#1e293b" strokeWidth="1" />
              {/* Legs */}
              <line x1="-10" y1="10" x2="-12" y2="25" stroke="#1e293b" strokeWidth="2" />
              <line x1="-2" y1="10" x2="-3" y2="25" stroke="#1e293b" strokeWidth="2" />
              <line x1="8" y1="10" x2="7" y2="25" stroke="#1e293b" strokeWidth="2" />
              <line x1="14" y1="10" x2="15" y2="25" stroke="#1e293b" strokeWidth="2" />
            </g>
            {/* Elk 2 — grazing, smaller (farther) */}
            <g transform="translate(880, 568) scale(0.6)">
              <ellipse cx="0" cy="0" rx="16" ry="8" />
              <ellipse cx="18" cy="2" rx="5" ry="4" /> {/* Head lowered */}
              <line x1="-8" y1="8" x2="-10" y2="22" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="8" x2="-1" y2="22" stroke="#1e293b" strokeWidth="2" />
              <line x1="8" y1="8" x2="7" y2="22" stroke="#1e293b" strokeWidth="2" />
              <line x1="12" y1="8" x2="13" y2="22" stroke="#1e293b" strokeWidth="2" />
            </g>
            {/* Elk 3 — distant, walking */}
            <g transform="translate(1150, 545) scale(0.5)">
              <ellipse cx="0" cy="0" rx="16" ry="8" />
              <ellipse cx="-18" cy="-6" rx="5" ry="4" /> {/* Facing left */}
              <line x1="-20" y1="-10" x2="-24" y2="-22" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="-18" y1="-10" x2="-14" y2="-20" stroke="#1e293b" strokeWidth="1.5" />
              <line x1="-8" y1="8" x2="-12" y2="20" stroke="#1e293b" strokeWidth="2" />
              <line x1="0" y1="8" x2="3" y2="20" stroke="#1e293b" strokeWidth="2" />
              <line x1="8" y1="8" x2="5" y2="20" stroke="#1e293b" strokeWidth="2" />
              <line x1="12" y1="8" x2="15" y2="20" stroke="#1e293b" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>

      {/* Layer 3: Foreground — large pines, snow ground, rocks, icicles, campfire (depth: 0.4) */}
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
            <radialGradient id="campfire-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.6)" />
              <stop offset="40%" stopColor="rgba(245,158,11,0.2)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <linearGradient id="snow-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(226,232,240,0.7)" />
              <stop offset="40%" stopColor="rgba(241,245,249,0.8)" />
              <stop offset="100%" stopColor="rgba(248,250,252,0.9)" />
            </linearGradient>
          </defs>

          {/* Snow ground plane */}
          <path
            d="M0 750 Q200 730 400 745 Q600 760 800 740 Q1000 725 1200 745
               Q1400 760 1600 735 Q1800 720 1920 740 L1920 1080 L0 1080Z"
            fill="url(#snow-ground)"
          />

          {/* Snow drifts — wind-sculpted shapes */}
          <ellipse cx="300" cy="820" rx="180" ry="25" fill="rgba(248,250,252,0.6)" />
          <ellipse cx="750" cy="850" rx="220" ry="30" fill="rgba(241,245,249,0.5)" />
          <ellipse cx="1200" cy="830" rx="200" ry="28" fill="rgba(248,250,252,0.55)" />
          <ellipse cx="1650" cy="810" rx="170" ry="22" fill="rgba(241,245,249,0.5)" />

          {/* Snow texture — subtle shadow bands */}
          <path
            d="M0 790 Q480 800 960 785 Q1440 775 1920 795"
            fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="1.5"
          />
          <path
            d="M0 840 Q400 850 800 835 Q1200 825 1600 845 Q1800 850 1920 840"
            fill="none" stroke="rgba(148,163,184,0.1)" strokeWidth="1"
          />
          <path
            d="M0 880 Q500 890 1000 875 Q1500 865 1920 885"
            fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="1"
          />

          {/* Wind ripple lines in snow */}
          <g stroke="rgba(203,213,225,0.15)" strokeWidth="0.5" fill="none">
            <path d="M100 860 Q130 858 160 860 Q190 862 220 860" />
            <path d="M300 890 Q340 888 380 890 Q420 892 460 890" />
            <path d="M600 870 Q640 868 680 870 Q720 872 760 870" />
            <path d="M900 900 Q940 898 980 900 Q1020 902 1060 900" />
            <path d="M1150 875 Q1190 873 1230 875 Q1270 877 1310 875" />
            <path d="M1450 895 Q1490 893 1530 895 Q1570 897 1610 895" />
            <path d="M1700 860 Q1740 858 1780 860 Q1820 862 1860 860" />
          </g>

          {/* Snow-covered rocks/boulders */}
          <g>
            {/* Large boulder left */}
            <ellipse cx="180" cy="790" rx="45" ry="30" fill="#475569" opacity="0.6" />
            <ellipse cx="180" cy="775" rx="42" ry="12" fill="rgba(241,245,249,0.7)" />
            {/* Medium boulder right */}
            <ellipse cx="1700" cy="770" rx="35" ry="25" fill="#475569" opacity="0.55" />
            <ellipse cx="1700" cy="758" rx="32" ry="10" fill="rgba(241,245,249,0.65)" />
            {/* Small rocks */}
            <ellipse cx="550" cy="810" rx="20" ry="14" fill="#475569" opacity="0.4" />
            <ellipse cx="550" cy="803" rx="18" ry="6" fill="rgba(241,245,249,0.5)" />
            <ellipse cx="1350" cy="800" rx="22" ry="16" fill="#475569" opacity="0.45" />
            <ellipse cx="1350" cy="792" rx="20" ry="7" fill="rgba(241,245,249,0.55)" />
          </g>

          {/* Rock overhang with icicles at top-left */}
          <g opacity="0.5">
            <path d="M0 0 L220 0 L180 30 Q100 50 0 35Z" fill="#334155" />
            <path d="M0 0 L220 0 L200 8 Q100 15 0 10Z" fill="rgba(241,245,249,0.6)" />
          </g>

          {/* Rock overhang with icicles at top-right */}
          <g opacity="0.45">
            <path d="M1920 0 L1700 0 L1740 35 Q1820 55 1920 40Z" fill="#334155" />
            <path d="M1920 0 L1700 0 L1720 10 Q1820 18 1920 12Z" fill="rgba(241,245,249,0.55)" />
          </g>

          {/* Frozen stream detail */}
          <path
            d="M400 850 Q450 840 500 845 Q560 850 620 840 Q680 835 720 842"
            fill="none" stroke="rgba(186,230,253,0.25)" strokeWidth="8"
          />
          <path
            d="M400 850 Q450 840 500 845 Q560 850 620 840 Q680 835 720 842"
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3"
          />
          {/* Ice cracks in stream */}
          <g stroke="rgba(148,163,184,0.2)" strokeWidth="0.5" fill="none">
            <path d="M440 845 L460 848 L480 843" />
            <path d="M540 847 L570 843 L600 847" />
            <path d="M640 840 L660 838 L685 841" />
          </g>

          {/* Footprints trail in snow */}
          <g fill="rgba(148,163,184,0.15)">
            <ellipse cx="850" cy="860" rx="5" ry="7" transform="rotate(-10 850 860)" />
            <ellipse cx="870" cy="855" rx="5" ry="7" transform="rotate(5 870 855)" />
            <ellipse cx="893" cy="862" rx="5" ry="7" transform="rotate(-8 893 862)" />
            <ellipse cx="915" cy="856" rx="5" ry="7" transform="rotate(3 915 856)" />
            <ellipse cx="938" cy="863" rx="5" ry="7" transform="rotate(-12 938 863)" />
            <ellipse cx="960" cy="857" rx="5" ry="7" transform="rotate(6 960 857)" />
            <ellipse cx="984" cy="864" rx="5" ry="7" transform="rotate(-5 984 864)" />
            <ellipse cx="1005" cy="858" rx="5" ry="7" transform="rotate(8 1005 858)" />
          </g>

          {/* Campfire near center — warm glow spot */}
          <g transform="translate(960, 820)">
            {/* Glow */}
            <ellipse cx="0" cy="0" rx="60" ry="40" fill="url(#campfire-glow)" />
            {/* Log base */}
            <line x1="-12" y1="5" x2="12" y2="5" stroke="#451a03" strokeWidth="3" />
            <line x1="-10" y1="3" x2="10" y2="8" stroke="#451a03" strokeWidth="2.5" />
            {/* Flame shapes */}
            <path d="M0 0 Q-4 -12 0 -20 Q4 -12 0 0" fill="#fbbf24" opacity="0.8">
              <animate attributeName="d"
                values="M0 0 Q-4 -12 0 -20 Q4 -12 0 0;M0 0 Q-3 -14 1 -22 Q5 -10 0 0;M0 0 Q-4 -12 0 -20 Q4 -12 0 0"
                dur="0.8s" repeatCount="indefinite" />
            </path>
            <path d="M-3 2 Q-6 -6 -3 -12 Q0 -6 -3 2" fill="#f59e0b" opacity="0.6">
              <animate attributeName="d"
                values="M-3 2 Q-6 -6 -3 -12 Q0 -6 -3 2;M-3 2 Q-7 -4 -2 -14 Q1 -5 -3 2;M-3 2 Q-6 -6 -3 -12 Q0 -6 -3 2"
                dur="0.6s" repeatCount="indefinite" />
            </path>
            <path d="M3 2 Q6 -5 3 -10 Q0 -5 3 2" fill="#ef4444" opacity="0.5">
              <animate attributeName="d"
                values="M3 2 Q6 -5 3 -10 Q0 -5 3 2;M3 2 Q5 -7 4 -12 Q1 -4 3 2;M3 2 Q6 -5 3 -10 Q0 -5 3 2"
                dur="0.7s" repeatCount="indefinite" />
            </path>
            {/* Sparks */}
            <circle cx="-2" cy="-15" r="1" fill="#fbbf24" opacity="0.7">
              <animate attributeName="cy" values="-15;-30;-15" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0;0.7" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="3" cy="-18" r="0.8" fill="#f59e0b" opacity="0.5">
              <animate attributeName="cy" values="-18;-35;-18" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>
      </div>

      {/* Animated overlay components */}
      <SwayingPines windIntensity={windIntensity} offset={offset} />
      <AuroraBorealis />
      {!isMobile && <FallingSnow windIntensity={windIntensity} />}
      <BlizzardGusts windIntensity={windIntensity} />
      <BreathMist />
      <WolfPack />
      <OwlInTree />
      <CabinSmoke windIntensity={windIntensity} />
      <FrozenSparkle />
      <IciclesDrip />
      <SnowCursor />
      <CursorFox />
      <SnowEasterEggs />
      <FrostVignette />
    </div>
  )
})
