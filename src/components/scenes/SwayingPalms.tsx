import { memo } from "react";

const SwayingPalms = memo(function SwayingPalms() {
  const frondColor1 = "rgba(34,139,34,0.5)";
  const frondColor2 = "rgba(22,101,52,0.4)";
  const trunkColor = "rgba(120,80,40,0.7)";
  const coconutColor = "rgba(101,67,33,0.85)";

  function renderFrond(
    cx: number,
    cy: number,
    rx: number,
    ry: number,
    baseAngle: number,
    swayFrom: number,
    swayTo: number,
    dur: string,
    fill: string,
    key: string
  ) {
    return (
      <ellipse
        key={key}
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={fill}
        transform={`rotate(${baseAngle} ${cx} ${cy})`}
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`${baseAngle + swayFrom} ${cx} ${cy}; ${baseAngle + swayTo} ${cx} ${cy}; ${baseAngle + swayFrom} ${cx} ${cy}`}
          dur={dur}
          repeatCount="indefinite"
          className="sway-anim"
        />
      </ellipse>
    );
  }

  function renderPalmTree(
    trunkPath: string,
    crownX: number,
    crownY: number,
    prefix: string
  ) {
    const fronds = [
      { rx: 90, ry: 14, angle: -30, swayFrom: -5, swayTo: 5, dur: "3.2s", fill: frondColor1 },
      { rx: 85, ry: 12, angle: 15, swayFrom: -4, swayTo: 4, dur: "3.8s", fill: frondColor2 },
      { rx: 95, ry: 13, angle: -60, swayFrom: -3, swayTo: 5, dur: "4.1s", fill: frondColor1 },
      { rx: 80, ry: 11, angle: 50, swayFrom: -5, swayTo: 3, dur: "3.5s", fill: frondColor2 },
      { rx: 88, ry: 12, angle: -5, swayFrom: -4, swayTo: 4, dur: "4.6s", fill: frondColor1 },
    ];

    return (
      <g key={prefix}>
        {/* Trunk */}
        <path
          d={trunkPath}
          stroke={trunkColor}
          strokeWidth="18"
          strokeLinecap="round"
          fill="none"
        />

        {/* Fronds */}
        {fronds.map((f, i) =>
          renderFrond(
            crownX,
            crownY,
            f.rx,
            f.ry,
            f.angle,
            f.swayFrom,
            f.swayTo,
            f.dur,
            f.fill,
            `${prefix}-frond-${i}`
          )
        )}

        {/* Coconuts */}
        <circle cx={crownX - 10} cy={crownY + 8} r={7} fill={coconutColor} />
        <circle cx={crownX + 8} cy={crownY + 12} r={6} fill={coconutColor} />
        <circle cx={crownX + 2} cy={crownY + 5} r={6.5} fill={coconutColor} />
      </g>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .sway-anim {
            display: none;
          }
          animateTransform.sway-anim {
            display: none;
          }
        }
      `}</style>
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        {/* Left palm tree */}
        {renderPalmTree(
          "M 200 1080 Q 180 800 160 600 Q 140 400 190 250",
          190,
          250,
          "left-palm"
        )}

        {/* Right palm tree */}
        {renderPalmTree(
          "M 1700 1080 Q 1720 820 1740 620 Q 1760 420 1710 280",
          1710,
          280,
          "right-palm"
        )}
      </svg>
    </div>
  );
});

export { SwayingPalms };
