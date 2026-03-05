import { memo } from "react";

export const BreathMist = memo(function BreathMist() {
  return (
    <>
      {/*
        Inject a scoped media-query rule so the wrapper is hidden entirely when
        the user prefers reduced motion. The mist is purely atmospheric and adds
        no information, so hiding it is the right approach rather than showing
        static blobs.
      */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .breath-mist-root {
            display: none !important;
          }
        }
      `}</style>

      <div className="breath-mist-root pointer-events-none fixed inset-0 overflow-hidden">
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="mist-blur-1" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="18" />
            </filter>
            <filter id="mist-blur-2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
            <filter id="mist-blur-3" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="15" />
            </filter>
            <filter id="mist-blur-4" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="25" />
            </filter>
            <filter id="mist-blur-5" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="20" />
            </filter>
            <filter id="mist-blur-6" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="17" />
            </filter>
            <filter id="mist-blur-7" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="23" />
            </filter>
          </defs>

          {/* Cloud 1 — far left, mid-low */}
          <ellipse
            cx="180"
            cy="870"
            rx="140"
            ry="42"
            fill="white"
            opacity="0.06"
            filter="url(#mist-blur-1)"
          >
            <animate
              attributeName="cy"
              values="870;848;870"
              dur="28s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="180;210;180;150;180"
              dur="35s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.06;0.04;0.07;0.05;0.06"
              dur="22s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 2 — left-center, lower */}
          <ellipse
            cx="520"
            cy="920"
            rx="210"
            ry="55"
            fill="#dbeafe"
            opacity="0.05"
            filter="url(#mist-blur-2)"
          >
            <animate
              attributeName="cy"
              values="920;898;920"
              dur="36s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="520;550;520;490;520"
              dur="42s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.05;0.08;0.04;0.06;0.05"
              dur="18s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 3 — center-left, slightly higher */}
          <ellipse
            cx="820"
            cy="780"
            rx="170"
            ry="38"
            fill="white"
            opacity="0.04"
            filter="url(#mist-blur-3)"
          >
            <animate
              attributeName="cy"
              values="780;758;780"
              dur="24s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="820;790;820;850;820"
              dur="31s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.04;0.07;0.03;0.06;0.04"
              dur="27s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 4 — center, large and dense */}
          <ellipse
            cx="1060"
            cy="890"
            rx="250"
            ry="60"
            fill="#eff6ff"
            opacity="0.07"
            filter="url(#mist-blur-4)"
          >
            <animate
              attributeName="cy"
              values="890;862;890"
              dur="40s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="1060;1090;1060;1030;1060"
              dur="48s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.07;0.05;0.08;0.04;0.07"
              dur="30s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 5 — right-center, mid height */}
          <ellipse
            cx="1340"
            cy="820"
            rx="190"
            ry="45"
            fill="white"
            opacity="0.05"
            filter="url(#mist-blur-5)"
          >
            <animate
              attributeName="cy"
              values="820;800;820"
              dur="32s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="1340;1310;1340;1370;1340"
              dur="39s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.05;0.08;0.03;0.06;0.05"
              dur="15s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 6 — right, lower */}
          <ellipse
            cx="1620"
            cy="940"
            rx="230"
            ry="52"
            fill="#dbeafe"
            opacity="0.06"
            filter="url(#mist-blur-6)"
          >
            <animate
              attributeName="cy"
              values="940;916;940"
              dur="26s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="1620;1650;1620;1590;1620"
              dur="33s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.06;0.04;0.08;0.05;0.06"
              dur="20s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>

          {/* Cloud 7 — far right, mid-low */}
          <ellipse
            cx="1840"
            cy="860"
            rx="150"
            ry="36"
            fill="white"
            opacity="0.04"
            filter="url(#mist-blur-7)"
          >
            <animate
              attributeName="cy"
              values="860;838;860"
              dur="38s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="cx"
              values="1840;1870;1840;1810;1840"
              dur="45s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
            <animate
              attributeName="opacity"
              values="0.04;0.07;0.05;0.03;0.04"
              dur="25s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
            />
          </ellipse>
        </svg>
      </div>
    </>
  );
});
