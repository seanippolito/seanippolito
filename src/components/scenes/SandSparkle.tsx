import { memo } from "react";

interface Sparkle {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  opacityMax: number;
  dur: number;
  begin: number;
}

const sparkles: Sparkle[] = [
  { cx: 120, cy: 740, r: 1.2, fill: "rgba(255,255,255,0.6)", opacityMax: 0.7, dur: 2.5, begin: 0 },
  { cx: 310, cy: 820, r: 1.8, fill: "rgba(255,255,240,0.5)", opacityMax: 0.6, dur: 3.2, begin: 0.4 },
  { cx: 480, cy: 780, r: 1.0, fill: "rgba(255,255,255,0.6)", opacityMax: 0.5, dur: 1.8, begin: 1.1 },
  { cx: 670, cy: 900, r: 2.2, fill: "rgba(255,255,240,0.5)", opacityMax: 0.8, dur: 3.8, begin: 0.7 },
  { cx: 820, cy: 850, r: 1.5, fill: "rgba(255,255,255,0.6)", opacityMax: 0.6, dur: 2.1, begin: 1.5 },
  { cx: 950, cy: 720, r: 1.3, fill: "rgba(255,255,255,0.6)", opacityMax: 0.7, dur: 2.8, begin: 0.2 },
  { cx: 1100, cy: 940, r: 2.5, fill: "rgba(255,255,240,0.5)", opacityMax: 0.75, dur: 4.0, begin: 0.9 },
  { cx: 1250, cy: 770, r: 1.1, fill: "rgba(255,255,255,0.6)", opacityMax: 0.55, dur: 1.6, begin: 2.0 },
  { cx: 1400, cy: 830, r: 1.4, fill: "rgba(255,255,255,0.6)", opacityMax: 0.65, dur: 2.3, begin: 0.6 },
  { cx: 1560, cy: 910, r: 2.0, fill: "rgba(255,255,240,0.5)", opacityMax: 0.7, dur: 3.5, begin: 1.3 },
  { cx: 1720, cy: 750, r: 1.0, fill: "rgba(255,255,255,0.6)", opacityMax: 0.5, dur: 1.9, begin: 0.3 },
  { cx: 1850, cy: 870, r: 1.6, fill: "rgba(255,255,255,0.6)", opacityMax: 0.6, dur: 2.6, begin: 1.8 },
  { cx: 200, cy: 920, r: 2.3, fill: "rgba(255,255,240,0.5)", opacityMax: 0.8, dur: 3.6, begin: 0.5 },
  { cx: 560, cy: 860, r: 1.2, fill: "rgba(255,255,255,0.6)", opacityMax: 0.55, dur: 2.0, begin: 2.2 },
  { cx: 750, cy: 730, r: 1.0, fill: "rgba(255,255,255,0.6)", opacityMax: 0.5, dur: 1.5, begin: 1.0 },
  { cx: 1020, cy: 810, r: 2.1, fill: "rgba(255,255,240,0.5)", opacityMax: 0.7, dur: 3.1, begin: 0.8 },
  { cx: 1330, cy: 930, r: 1.3, fill: "rgba(255,255,255,0.6)", opacityMax: 0.6, dur: 2.4, begin: 1.6 },
  { cx: 1650, cy: 800, r: 1.7, fill: "rgba(255,255,240,0.5)", opacityMax: 0.65, dur: 2.9, begin: 0.1 },
];

export const SandSparkle = memo(function SandSparkle() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sand-sparkle animate {
            display: none;
          }
          .sand-sparkle circle {
            opacity: 0.3;
          }
        }
      `}</style>
      <svg
        className="sand-sparkle h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sand-glow-sm">
            <feGaussianBlur stdDeviation="1" />
          </filter>
          <filter id="sand-glow-lg">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {sparkles.map((s, i) => (
          <circle
            key={i}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill={s.fill}
            opacity={0}
            filter={s.r >= 2 ? "url(#sand-glow-lg)" : "url(#sand-glow-sm)"}
          >
            <animate
              attributeName="opacity"
              values={`0;${s.opacityMax};0`}
              dur={`${s.dur}s`}
              begin={`${s.begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
    </div>
  );
});
