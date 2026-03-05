import { memo } from "react";

export const OwlInTree = memo(function OwlInTree() {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Owl anchor: body center ~(1650, 510), branch at y~540
  const OWL_X = 1650;
  const OWL_Y = 510;

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        <g opacity="0.7">
          {/* Branch extending from the right edge */}
          <line
            x1={OWL_X - 80}
            y1={OWL_Y + 40}
            x2={1920}
            y2={OWL_Y + 52}
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Snow on the branch */}
          <ellipse
            cx={OWL_X + 60}
            cy={OWL_Y + 38}
            rx={72}
            ry={6}
            fill="white"
            opacity="0.85"
          />

          {/* Owl group */}
          <g transform={`translate(${OWL_X}, ${OWL_Y})`}>

            {/* Wings (behind body) */}
            <g>
              {/* Left wing */}
              <path
                d="M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z"
                fill="#1e293b"
              >
                {!prefersReducedMotion && (
                  <animate
                    attributeName="d"
                    values="
                      M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z;
                      M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z;
                      M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z;
                      M -28 8 Q -58 -8 -52 20 Q -40 40 -18 30 Z;
                      M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z;
                      M -22 10 Q -44 -2 -38 22 Q -30 38 -16 30 Z
                    "
                    dur="24s"
                    begin="20s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0; 0.3; 0.45; 0.5; 0.55; 1"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
                )}
              </path>

              {/* Right wing */}
              <path
                d="M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z"
                fill="#1e293b"
              >
                {!prefersReducedMotion && (
                  <animate
                    attributeName="d"
                    values="
                      M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z;
                      M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z;
                      M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z;
                      M 28 8 Q 58 -8 52 20 Q 40 40 18 30 Z;
                      M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z;
                      M 22 10 Q 44 -2 38 22 Q 30 38 16 30 Z
                    "
                    dur="24s"
                    begin="20s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0; 0.3; 0.45; 0.5; 0.55; 1"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
                )}
              </path>
            </g>

            {/* Body */}
            <ellipse cx="0" cy="18" rx="22" ry="28" fill="#1e293b" />

            {/* Belly / chest lighter patch */}
            <ellipse cx="0" cy="22" rx="13" ry="18" fill="#263548" />

            {/* Feet / talons gripping branch */}
            <g fill="#1e293b">
              {/* Left foot */}
              <line x1="-10" y1="44" x2="-18" y2="50" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-10" y1="44" x2="-10" y2="52" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="-10" y1="44" x2="-3" y2="50" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              {/* Right foot */}
              <line x1="10" y1="44" x2="3" y2="50" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="44" x2="10" y2="52" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="44" x2="17" y2="50" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* Head group — animated head turn */}
            <g>
              {!prefersReducedMotion ? (
                <g>
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    values="0 0 -6; 0 0 -6; 8 0 -6; 0 0 -6; -8 0 -6; 0 0 -6; 0 0 -6"
                    dur="10s"
                    begin="8s"
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0; 0.1; 0.25; 0.5; 0.75; 0.9; 1"
                    keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />

                  {/* Rounded head */}
                  <ellipse cx="0" cy="-6" rx="20" ry="20" fill="#1e293b" />

                  {/* Ear tufts */}
                  <polygon points="-10,-22 -14,-34 -6,-24" fill="#1e293b" />
                  <polygon points="10,-22 14,-34 6,-24" fill="#1e293b" />

                  {/* Facial disc — subtle lighter ring around eyes */}
                  <ellipse cx="-8" cy="-6" rx="8" ry="8" fill="#263548" />
                  <ellipse cx="8" cy="-6" rx="8" ry="8" fill="#263548" />

                  {/* Eyes — amber glow */}
                  <ellipse cx="-8" cy="-6" rx="5.5" ry="5.5" fill="#fbbf24">
                    {/* Blink animation */}
                    <animate
                      attributeName="ry"
                      values="5.5; 5.5; 0.5; 5.5"
                      dur="5s"
                      begin="4s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.88; 0.94; 1"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </ellipse>
                  <ellipse cx="8" cy="-6" rx="5.5" ry="5.5" fill="#fbbf24">
                    {/* Blink animation — same timing */}
                    <animate
                      attributeName="ry"
                      values="5.5; 5.5; 0.5; 5.5"
                      dur="5s"
                      begin="4s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.88; 0.94; 1"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </ellipse>

                  {/* Pupils */}
                  <ellipse cx="-8" cy="-6" rx="2.5" ry="2.5" fill="#0f172a">
                    <animate
                      attributeName="ry"
                      values="2.5; 2.5; 0.3; 2.5"
                      dur="5s"
                      begin="4s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.88; 0.94; 1"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </ellipse>
                  <ellipse cx="8" cy="-6" rx="2.5" ry="2.5" fill="#0f172a">
                    <animate
                      attributeName="ry"
                      values="2.5; 2.5; 0.3; 2.5"
                      dur="5s"
                      begin="4s"
                      repeatCount="indefinite"
                      calcMode="spline"
                      keyTimes="0; 0.88; 0.94; 1"
                      keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                    />
                  </ellipse>

                  {/* Eye shine specular highlight */}
                  <ellipse cx="-6.5" cy="-8" rx="1.2" ry="1.2" fill="white" opacity="0.6" />
                  <ellipse cx="9.5" cy="-8" rx="1.2" ry="1.2" fill="white" opacity="0.6" />

                  {/* Beak */}
                  <polygon points="0,-4 -3,0 3,0" fill="#78716c" />
                </g>
              ) : (
                /* Static head for reduced-motion */
                <g>
                  {/* Rounded head */}
                  <ellipse cx="0" cy="-6" rx="20" ry="20" fill="#1e293b" />

                  {/* Ear tufts */}
                  <polygon points="-10,-22 -14,-34 -6,-24" fill="#1e293b" />
                  <polygon points="10,-22 14,-34 6,-24" fill="#1e293b" />

                  {/* Facial disc */}
                  <ellipse cx="-8" cy="-6" rx="8" ry="8" fill="#263548" />
                  <ellipse cx="8" cy="-6" rx="8" ry="8" fill="#263548" />

                  {/* Eyes — static amber */}
                  <ellipse cx="-8" cy="-6" rx="5.5" ry="5.5" fill="#fbbf24" />
                  <ellipse cx="8" cy="-6" rx="5.5" ry="5.5" fill="#fbbf24" />

                  {/* Pupils — static */}
                  <ellipse cx="-8" cy="-6" rx="2.5" ry="2.5" fill="#0f172a" />
                  <ellipse cx="8" cy="-6" rx="2.5" ry="2.5" fill="#0f172a" />

                  {/* Eye shine */}
                  <ellipse cx="-6.5" cy="-8" rx="1.2" ry="1.2" fill="white" opacity="0.6" />
                  <ellipse cx="9.5" cy="-8" rx="1.2" ry="1.2" fill="white" opacity="0.6" />

                  {/* Beak */}
                  <polygon points="0,-4 -3,0 3,0" fill="#78716c" />
                </g>
              )}
            </g>

            {/* Soft eye glow (ambient light behind eyes) */}
            <ellipse cx="-8" cy="-6" rx="7" ry="7" fill="#fbbf24" opacity="0.15" />
            <ellipse cx="8" cy="-6" rx="7" ry="7" fill="#fbbf24" opacity="0.15" />

            {/* Snow on top of head */}
            <ellipse cx="0" cy="-25" rx="9" ry="3.5" fill="white" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
});
