import { memo } from "react";

interface Icicle {
  // x center of the icicle
  tipX: number;
  // y of the rock overhang edge (top of icicle)
  baseY: number;
  // half-width at the base (tapers to 0.5px at the point)
  halfW: number;
  // length hanging down in px
  length: number;
  // base opacity (tip is 35% of this)
  opacity: number;
  // SMIL begin time for the drip animation (seconds)
  dripBegin: number;
  // distance the drip droplet falls in px
  dripDist: number;
}

// Left overhang cluster: x 20-200, hanging from y 25-45
const leftIcicles: Icicle[] = [
  { tipX: 32,  baseY: 28, halfW: 4.0, length: 52, opacity: 0.65, dripBegin: 0.0, dripDist: 52 },
  { tipX: 58,  baseY: 35, halfW: 3.0, length: 34, opacity: 0.55, dripBegin: 5.3, dripDist: 46 },
  { tipX: 85,  baseY: 30, halfW: 3.5, length: 48, opacity: 0.70, dripBegin: 2.1, dripDist: 58 },
  { tipX: 112, baseY: 38, halfW: 2.5, length: 26, opacity: 0.50, dripBegin: 7.8, dripDist: 42 },
  { tipX: 140, baseY: 32, halfW: 4.0, length: 56, opacity: 0.62, dripBegin: 3.5, dripDist: 55 },
  { tipX: 165, baseY: 42, halfW: 2.0, length: 22, opacity: 0.55, dripBegin: 6.2, dripDist: 44 },
  { tipX: 188, baseY: 28, halfW: 3.5, length: 44, opacity: 0.68, dripBegin: 1.4, dripDist: 50 },
];

// Right overhang cluster: x 1720-1900, hanging from y 30-50
const rightIcicles: Icicle[] = [
  { tipX: 1728, baseY: 38, halfW: 3.5, length: 50, opacity: 0.60, dripBegin: 4.2, dripDist: 54 },
  { tipX: 1754, baseY: 32, halfW: 2.5, length: 30, opacity: 0.55, dripBegin: 1.8, dripDist: 43 },
  { tipX: 1782, baseY: 45, halfW: 4.0, length: 58, opacity: 0.70, dripBegin: 6.7, dripDist: 57 },
  { tipX: 1812, baseY: 36, halfW: 3.0, length: 38, opacity: 0.62, dripBegin: 3.0, dripDist: 48 },
  { tipX: 1845, baseY: 30, halfW: 2.0, length: 24, opacity: 0.50, dripBegin: 7.5, dripDist: 41 },
  { tipX: 1872, baseY: 42, halfW: 3.5, length: 46, opacity: 0.65, dripBegin: 0.6, dripDist: 53 },
];

// Tapered quadrilateral: wide at baseY, narrows to ~1px at the pointed tip
function iciclePath(tipX: number, baseY: number, halfW: number, length: number): string {
  const ty = baseY + length;
  return [
    `M ${tipX - halfW} ${baseY}`,
    `L ${tipX + halfW} ${baseY}`,
    `L ${tipX + 0.5}  ${ty}`,
    `L ${tipX - 0.5}  ${ty}`,
    "Z",
  ].join(" ");
}

// Subtle sheen: a thin line inset from the left edge, running 60% of the length
function sheenPath(tipX: number, baseY: number, halfW: number, length: number): string {
  const startX = tipX - halfW * 0.6;
  const startY = baseY + 4;
  const endX   = tipX - 0.5;
  const endY   = baseY + length * 0.6;
  return `M ${startX} ${startY} L ${endX} ${endY}`;
}

function IcicleGroup({ icicles, gradPrefix }: { icicles: Icicle[]; gradPrefix: string }) {
  return (
    <>
      {icicles.map((ic, i) => {
        const pointY = ic.baseY + ic.length;
        const gradId = `${gradPrefix}-ig-${i}`;
        return (
          <g key={i}>
            <defs>
              <linearGradient
                id={gradId}
                x1={ic.tipX}
                y1={ic.baseY}
                x2={ic.tipX}
                y2={pointY}
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor="#e0f2fe" stopOpacity={ic.opacity} />
                <stop offset="100%" stopColor="#e0f2fe" stopOpacity={ic.opacity * 0.35} />
              </linearGradient>
            </defs>

            {/* Icicle body */}
            <path
              d={iciclePath(ic.tipX, ic.baseY, ic.halfW, ic.length)}
              fill={`url(#${gradId})`}
            />

            {/* Sheen highlight along left edge */}
            <path
              d={sheenPath(ic.tipX, ic.baseY, ic.halfW, ic.length)}
              stroke="white"
              strokeWidth="0.8"
              strokeOpacity="0.55"
              fill="none"
              strokeLinecap="round"
            />

            {/* Drip droplet — hidden by CSS under prefers-reduced-motion */}
            <circle
              className="icicle-drip"
              cx={ic.tipX}
              cy={pointY}
              r="2"
              fill="#bae6fd"
              opacity="0"
            >
              {/* Accelerating fall */}
              <animate
                attributeName="cy"
                values={`${pointY};${pointY + ic.dripDist}`}
                dur="1s"
                begin={`${ic.dripBegin}s`}
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.2 0 1 1"
              />
              {/* Fade: appear quickly, dissolve toward the end */}
              <animate
                attributeName="opacity"
                values="0;0.75;0"
                keyTimes="0;0.3;1"
                dur="1s"
                begin={`${ic.dripBegin}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        );
      })}
    </>
  );
}

export const IciclesDrip = memo(function IciclesDrip() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .icicle-drip { display: none; }
        }
      `}</style>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%" }}
      >
        <IcicleGroup icicles={leftIcicles}  gradPrefix="left"  />
        <IcicleGroup icicles={rightIcicles} gradPrefix="right" />
      </svg>
    </div>
  );
});
