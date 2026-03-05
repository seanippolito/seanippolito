import { memo } from "react";

/**
 * FloatingJellyfish – 3 translucent jellyfish drifting through the
 * water area of the beach scene. Pure SVG with SMIL animations.
 */

interface JellyfishDef {
  /** Center x */
  cx: number;
  /** Center y (top of dome) */
  cy: number;
  /** Dome horizontal radius */
  rx: number;
  /** Dome vertical radius */
  ry: number;
  /** Fill colour (translucent) */
  color: string;
  /** Horizontal drift distance */
  drift: number;
  /** Drift duration in seconds */
  driftDur: number;
  /** Pulse duration in seconds */
  pulseDur: number;
  /** Scale factor for the whole jellyfish */
  scale: number;
}

const JELLYFISH: JellyfishDef[] = [
  {
    cx: 350,
    cy: 480,
    rx: 38,
    ry: 26,
    color: "rgba(244,114,182,0.15)",
    drift: 120,
    driftDur: 26,
    pulseDur: 3.4,
    scale: 1,
  },
  {
    cx: 1050,
    cy: 520,
    rx: 30,
    ry: 20,
    color: "rgba(168,85,247,0.12)",
    drift: -90,
    driftDur: 30,
    pulseDur: 4.0,
    scale: 0.85,
  },
  {
    cx: 1550,
    cy: 560,
    rx: 34,
    ry: 24,
    color: "rgba(96,181,212,0.12)",
    drift: 100,
    driftDur: 22,
    pulseDur: 3.0,
    scale: 0.92,
  },
];

/**
 * Build a wavy tentacle path string.
 * origin: bottom-center of the dome.
 * idx: tentacle index (0-4) used to offset horizontally.
 */
function tentaclePath(
  originX: number,
  originY: number,
  rx: number,
  idx: number,
  totalTentacles: number,
  length: number
): string {
  // Spread tentacles across the dome width
  const spread = (rx * 2) / (totalTentacles + 1);
  const startX = originX - rx + spread * (idx + 1);
  const startY = originY;

  // Two cubic bezier curves to create a subtle S-wave
  const cp1x = startX + 6;
  const cp1y = startY + length * 0.3;
  const cp2x = startX - 6;
  const cp2y = startY + length * 0.6;
  const endX = startX + 2;
  const endY = startY + length;

  return `M${startX} ${startY} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
}

/** Alternate tentacle path for the wiggle animation. */
function tentaclePathAlt(
  originX: number,
  originY: number,
  rx: number,
  idx: number,
  totalTentacles: number,
  length: number
): string {
  const spread = (rx * 2) / (totalTentacles + 1);
  const startX = originX - rx + spread * (idx + 1);
  const startY = originY;

  const cp1x = startX - 5;
  const cp1y = startY + length * 0.3;
  const cp2x = startX + 7;
  const cp2y = startY + length * 0.6;
  const endX = startX - 2;
  const endY = startY + length;

  return `M${startX} ${startY} C${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;
}

const TENTACLE_COUNT = 5;

export const FloatingJellyfish = memo(function FloatingJellyfish() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .jf-drift, .jf-pulse, .jf-wiggle { animation: none !important; }
          .jf-drift animateTransform,
          .jf-pulse animate,
          .jf-wiggle animate { display: none; }
        }
      `}</style>

      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {JELLYFISH.map((jf, ji) => {
          const tentacleLength = jf.ry * 2.8;
          const domeBottomY = jf.cy + jf.ry;

          return (
            <g key={ji} transform={`scale(${jf.scale})`} className="jf-drift">
              {/* Horizontal drift */}
              <animateTransform
                attributeName="transform"
                type="translate"
                values={`0,0; ${jf.drift},0; 0,0`}
                dur={`${jf.driftDur}s`}
                repeatCount="indefinite"
              />

              {/* ---- Dome ---- */}
              <ellipse
                cx={jf.cx}
                cy={jf.cy}
                rx={jf.rx}
                ry={jf.ry}
                fill={jf.color}
                className="jf-pulse"
              >
                {/* Pulse: contract rx/ry to simulate swimming */}
                <animate
                  attributeName="rx"
                  values={`${jf.rx};${jf.rx * 0.82};${jf.rx}`}
                  dur={`${jf.pulseDur}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="ry"
                  values={`${jf.ry};${jf.ry * 1.15};${jf.ry}`}
                  dur={`${jf.pulseDur}s`}
                  repeatCount="indefinite"
                />
              </ellipse>

              {/* Faint inner highlight on dome */}
              <ellipse
                cx={jf.cx}
                cy={jf.cy - jf.ry * 0.15}
                rx={jf.rx * 0.55}
                ry={jf.ry * 0.45}
                fill="rgba(255,255,255,0.06)"
              />

              {/* ---- Tentacles ---- */}
              {Array.from({ length: TENTACLE_COUNT }).map((_, ti) => {
                const basePath = tentaclePath(
                  jf.cx,
                  domeBottomY,
                  jf.rx,
                  ti,
                  TENTACLE_COUNT,
                  tentacleLength
                );
                const altPath = tentaclePathAlt(
                  jf.cx,
                  domeBottomY,
                  jf.rx,
                  ti,
                  TENTACLE_COUNT,
                  tentacleLength
                );
                // Stagger each tentacle slightly
                const wiggleDur = jf.pulseDur + ti * 0.2;

                return (
                  <path
                    key={ti}
                    d={basePath}
                    fill="none"
                    stroke={jf.color}
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    className="jf-wiggle"
                  >
                    <animate
                      attributeName="d"
                      values={`${basePath};${altPath};${basePath}`}
                      dur={`${wiggleDur}s`}
                      repeatCount="indefinite"
                    />
                  </path>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
});

export default FloatingJellyfish;
