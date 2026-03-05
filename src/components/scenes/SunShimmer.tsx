import { memo } from "react";

const sparkles = [
  { cx: 920, cy: 270, rx: 5, ry: 2, dur: "1.8s", begin: "0s", maxOpacity: 0.45 },
  { cx: 975, cy: 290, rx: 4, ry: 1.5, dur: "1.2s", begin: "0.3s", maxOpacity: 0.5 },
  { cx: 940, cy: 310, rx: 6, ry: 2.5, dur: "2.1s", begin: "0.7s", maxOpacity: 0.4 },
  { cx: 1000, cy: 330, rx: 3, ry: 1, dur: "0.9s", begin: "0.1s", maxOpacity: 0.55 },
  { cx: 955, cy: 355, rx: 7, ry: 3, dur: "1.5s", begin: "1.2s", maxOpacity: 0.35 },
  { cx: 910, cy: 370, rx: 4, ry: 1.5, dur: "2.3s", begin: "0.5s", maxOpacity: 0.5 },
  { cx: 985, cy: 390, rx: 5, ry: 2, dur: "1.1s", begin: "0.9s", maxOpacity: 0.6 },
  { cx: 935, cy: 415, rx: 8, ry: 3, dur: "2.0s", begin: "0.2s", maxOpacity: 0.3 },
  { cx: 1020, cy: 430, rx: 3, ry: 1, dur: "0.8s", begin: "1.5s", maxOpacity: 0.55 },
  { cx: 960, cy: 450, rx: 6, ry: 2, dur: "1.7s", begin: "0.6s", maxOpacity: 0.45 },
  { cx: 895, cy: 465, rx: 4, ry: 1.5, dur: "2.5s", begin: "1.0s", maxOpacity: 0.4 },
  { cx: 1010, cy: 480, rx: 5, ry: 2, dur: "1.3s", begin: "0.4s", maxOpacity: 0.5 },
  { cx: 945, cy: 500, rx: 7, ry: 2.5, dur: "1.9s", begin: "1.8s", maxOpacity: 0.35 },
  { cx: 980, cy: 515, rx: 3, ry: 1, dur: "1.0s", begin: "0.8s", maxOpacity: 0.6 },
  { cx: 925, cy: 530, rx: 6, ry: 2, dur: "2.2s", begin: "1.3s", maxOpacity: 0.45 },
  { cx: 1030, cy: 540, rx: 4, ry: 1.5, dur: "1.4s", begin: "0.2s", maxOpacity: 0.5 },
  { cx: 960, cy: 345, rx: 5, ry: 2, dur: "1.6s", begin: "2.0s", maxOpacity: 0.4 },
  { cx: 890, cy: 305, rx: 4, ry: 1, dur: "2.0s", begin: "1.1s", maxOpacity: 0.55 },
];

export const SunShimmer = memo(function SunShimmer() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sun-shimmer-sparkle {
            animation: none !important;
            opacity: 0.15 !important;
          }
          .sun-shimmer-sparkle animate {
            display: none;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <filter id="shimmer-glow">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Soft central glow */}
        <ellipse
          cx={960}
          cy={400}
          rx={80}
          ry={200}
          fill="rgba(251,191,36,0.07)"
        />

        {/* Sparkling reflections */}
        {sparkles.map((s, i) => {
          const isGold = i % 3 === 0;
          const fill = isGold
            ? "rgba(251,191,36,0.8)"
            : "rgba(255,255,255,0.9)";

          return (
            <ellipse
              key={i}
              className="sun-shimmer-sparkle"
              cx={s.cx}
              cy={s.cy}
              rx={s.rx}
              ry={s.ry}
              fill={fill}
              opacity={0}
              filter="url(#shimmer-glow)"
            >
              <animate
                attributeName="opacity"
                values={`0;${s.maxOpacity};0`}
                dur={s.dur}
                begin={s.begin}
                repeatCount="indefinite"
              />
            </ellipse>
          );
        })}
      </svg>
    </div>
  );
});
