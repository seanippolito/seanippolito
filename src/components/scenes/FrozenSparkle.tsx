import { memo } from "react";

interface IceSparkle {
  cx: number;
  cy: number;
  size: number;
  dur: number;
  begin: number;
  blur: boolean;
}

// 4-pointed star path centered at 0,0 with given half-length
function starPath(half: number): string {
  const thin = half * 0.12;
  return [
    `M 0 ${-half}`,
    `L ${thin} ${-thin}`,
    `L ${half} 0`,
    `L ${thin} ${thin}`,
    `L 0 ${half}`,
    `L ${-thin} ${thin}`,
    `L ${-half} 0`,
    `L ${-thin} ${-thin}`,
    "Z",
  ].join(" ");
}

const sparkles: IceSparkle[] = [
  // Snow surface area (y: 700–950)
  { cx: 95,   cy: 720, size: 4.0, dur: 3.2, begin: 0.0,  blur: false },
  { cx: 230,  cy: 810, size: 5.5, dur: 2.8, begin: 1.1,  blur: true  },
  { cx: 375,  cy: 760, size: 3.5, dur: 4.5, begin: 0.5,  blur: false },
  { cx: 500,  cy: 900, size: 6.0, dur: 3.8, begin: 2.3,  blur: true  },
  { cx: 620,  cy: 840, size: 4.5, dur: 2.3, begin: 0.8,  blur: false },
  { cx: 780,  cy: 730, size: 3.0, dur: 5.0, begin: 1.7,  blur: false },
  { cx: 870,  cy: 930, size: 5.0, dur: 3.5, begin: 0.2,  blur: true  },
  { cx: 1010, cy: 800, size: 3.5, dur: 2.6, begin: 2.9,  blur: false },
  { cx: 1120, cy: 950, size: 4.0, dur: 4.2, begin: 1.4,  blur: false },
  { cx: 1300, cy: 860, size: 5.5, dur: 3.0, begin: 0.6,  blur: true  },
  { cx: 1420, cy: 710, size: 3.0, dur: 2.1, begin: 3.5,  blur: false },
  { cx: 1550, cy: 880, size: 4.5, dur: 4.8, begin: 1.0,  blur: false },
  { cx: 1680, cy: 940, size: 6.0, dur: 3.3, begin: 0.3,  blur: true  },
  { cx: 1800, cy: 790, size: 3.5, dur: 2.5, begin: 2.0,  blur: false },
  { cx: 155,  cy: 960, size: 4.0, dur: 3.7, begin: 1.5,  blur: false },
  { cx: 1890, cy: 850, size: 5.0, dur: 4.0, begin: 0.9,  blur: true  },

  // Frozen lake area (y: 580–660, x: 640–1280)
  { cx: 680,  cy: 590, size: 5.5, dur: 2.4, begin: 0.4,  blur: true  },
  { cx: 780,  cy: 640, size: 4.0, dur: 3.9, begin: 1.8,  blur: false },
  { cx: 900,  cy: 610, size: 6.0, dur: 2.9, begin: 0.7,  blur: true  },
  { cx: 1010, cy: 655, size: 3.5, dur: 4.4, begin: 2.6,  blur: false },
  { cx: 1100, cy: 585, size: 5.0, dur: 3.1, begin: 1.2,  blur: true  },
  { cx: 1200, cy: 635, size: 4.5, dur: 2.0, begin: 3.8,  blur: false },
  { cx: 1260, cy: 600, size: 3.0, dur: 4.6, begin: 0.1,  blur: true  },
];

export const FrozenSparkle = memo(function FrozenSparkle() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .frozen-sparkle animate {
            display: none;
          }
          .frozen-sparkle path {
            opacity: 0.25;
          }
        }
      `}</style>
      <svg
        className="frozen-sparkle h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="frozen-blur">
            <feGaussianBlur stdDeviation="1" />
          </filter>
        </defs>
        {sparkles.map((s, i) => (
          <path
            key={i}
            d={starPath(s.size)}
            transform={`translate(${s.cx}, ${s.cy})`}
            fill="white"
            opacity={0}
            filter={s.blur ? "url(#frozen-blur)" : undefined}
          >
            <animate
              attributeName="opacity"
              values="0;0.7;0"
              dur={`${s.dur}s`}
              begin={`${s.begin}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    </div>
  );
});
