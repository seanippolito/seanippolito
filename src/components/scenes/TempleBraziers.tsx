import { memo } from "react"

const BRAZIER_POSITIONS = [
  { left: "42%", bottom: "42%" },
  { left: "54%", bottom: "42%" },
]

function Brazier({ left, bottom }: { left: string; bottom: string }) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        bottom,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Glow behind flame */}
      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 50,
          height: 50,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Flame container */}
      <div
        style={{
          position: "relative",
          width: 18,
          height: 28,
          marginBottom: -4,
          boxShadow: "0 0 20px rgba(251,191,36,0.2)",
        }}
      >
        {/* Outer flame */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 28,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            backgroundColor: "rgba(251,191,36,0.5)",
            animation: "brazier-flame-1 0.8s alternate infinite ease-in-out",
          }}
        />
        {/* Mid flame */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 12,
            height: 22,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            backgroundColor: "rgba(255,160,50,0.6)",
            animation: "brazier-flame-2 0.6s alternate infinite ease-in-out",
          }}
        />
        {/* Inner flame */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 8,
            height: 16,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
            backgroundColor: "rgba(255,255,220,0.7)",
            animation: "brazier-flame-3 0.5s alternate infinite ease-in-out",
          }}
        />
      </div>

      {/* Bowl */}
      <div
        style={{
          width: 24,
          height: 14,
          clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)",
          background:
            "linear-gradient(180deg, rgba(200,180,130,0.5) 0%, rgba(180,160,120,0.4) 100%)",
        }}
      />

      {/* Stand / pole */}
      <div
        style={{
          width: 4,
          height: 30,
          backgroundColor: "rgba(180,160,120,0.4)",
        }}
      />
    </div>
  )
}

export const TempleBraziers = memo(function TempleBraziers() {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <style>{`
        @keyframes brazier-flame-1 {
          0% {
            transform: translateX(-50%) translateX(-2px) scaleY(0.9);
          }
          100% {
            transform: translateX(-50%) translateX(2px) scaleY(1.1);
          }
        }
        @keyframes brazier-flame-2 {
          0% {
            transform: translateX(-50%) translateX(3px) scaleY(1.1);
          }
          100% {
            transform: translateX(-50%) translateX(-3px) scaleY(0.9);
          }
        }
        @keyframes brazier-flame-3 {
          0% {
            transform: translateX(-50%) translateX(-2px) scaleY(0.95);
          }
          100% {
            transform: translateX(-50%) translateX(2px) scaleY(1.05);
          }
        }
      `}</style>

      {BRAZIER_POSITIONS.map((pos, i) => (
        <Brazier key={i} left={pos.left} bottom={pos.bottom} />
      ))}
    </div>
  )
})
