import { memo } from "react";

const CoralGlow = memo(function CoralGlow() {
  const clusters: {
    cx: number;
    cy: number;
    ellipses: {
      rx: number;
      ry: number;
      dx: number;
      dy: number;
      fill: string;
      dur: string;
      begin: string;
    }[];
  }[] = [
    {
      cx: 280,
      cy: 560,
      ellipses: [
        { rx: 60, ry: 35, dx: 0, dy: 0, fill: "rgba(244,114,182,0.2)", dur: "4s", begin: "0s" },
        { rx: 45, ry: 28, dx: 15, dy: -10, fill: "rgba(168,85,247,0.15)", dur: "5s", begin: "0.8s" },
        { rx: 50, ry: 30, dx: -12, dy: 8, fill: "rgba(45,212,191,0.15)", dur: "3.5s", begin: "1.5s" },
      ],
    },
    {
      cx: 750,
      cy: 570,
      ellipses: [
        { rx: 55, ry: 32, dx: 0, dy: 0, fill: "rgba(168,85,247,0.15)", dur: "5.5s", begin: "0.3s" },
        { rx: 48, ry: 26, dx: -10, dy: 5, fill: "rgba(244,114,182,0.2)", dur: "4.2s", begin: "1.2s" },
      ],
    },
    {
      cx: 1375,
      cy: 555,
      ellipses: [
        { rx: 58, ry: 34, dx: 0, dy: 0, fill: "rgba(45,212,191,0.15)", dur: "4.8s", begin: "0.5s" },
        { rx: 42, ry: 25, dx: 12, dy: -8, fill: "rgba(244,114,182,0.2)", dur: "5.2s", begin: "1.8s" },
        { rx: 52, ry: 30, dx: -8, dy: 10, fill: "rgba(168,85,247,0.15)", dur: "6s", begin: "0.6s" },
      ],
    },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .coral-glow-ellipse animate {
            animation: none !important;
          }
          .coral-glow-ellipse {
            opacity: 0.5 !important;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <filter id="coral-soft-glow">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {clusters.map((cluster, ci) =>
          cluster.ellipses.map((e, ei) => (
            <ellipse
              key={`${ci}-${ei}`}
              className="coral-glow-ellipse"
              cx={cluster.cx + e.dx}
              cy={cluster.cy + e.dy}
              rx={e.rx}
              ry={e.ry}
              fill={e.fill}
              opacity={0}
              filter="url(#coral-soft-glow)"
            >
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={e.dur}
                begin={e.begin}
                repeatCount="indefinite"
              />
            </ellipse>
          ))
        )}
      </svg>
    </div>
  );
});

export { CoralGlow };
