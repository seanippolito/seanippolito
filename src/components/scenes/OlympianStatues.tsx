import { memo } from "react"

/**
 * OlympianStatues — Vibrant CSS-art Greek god statues positioned around the Heaven scene.
 * Pure CSS shapes using gradients, clip-paths, box-shadows, and borders.
 */
export const OlympianStatues = memo(function OlympianStatues() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">

      {/* === POSEIDON — left side, standing with trident === */}
      <div
        className="absolute"
        style={{ left: "8%", bottom: "18%", transform: "scale(0.85)" }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 70,
            height: 18,
            background: "linear-gradient(180deg, rgba(200,195,185,0.5) 0%, rgba(160,155,145,0.35) 100%)",
            borderRadius: "4px 4px 2px 2px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        />
        {/* Legs */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 28,
            height: 55,
            background: "linear-gradient(180deg, rgba(210,205,195,0.55) 0%, rgba(190,185,175,0.45) 100%)",
            borderRadius: "3px 3px 6px 6px",
            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 42% 100%, 42% 50%, 58% 50%, 58% 100%, 0% 100%)",
          }}
        />
        {/* Robe / torso */}
        <div
          style={{
            position: "absolute",
            bottom: 65,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 60,
            background: "linear-gradient(170deg, rgba(100,180,220,0.5) 0%, rgba(60,140,190,0.4) 40%, rgba(200,195,185,0.5) 100%)",
            borderRadius: "8px 8px 2px 2px",
            boxShadow: "inset 0 -5px 15px rgba(60,140,190,0.15)",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 122,
            left: "50%",
            transform: "translateX(-50%)",
            width: 20,
            height: 24,
            background: "radial-gradient(ellipse at 50% 40%, rgba(220,215,205,0.6) 0%, rgba(190,185,175,0.5) 100%)",
            borderRadius: "50% 50% 45% 45%",
          }}
        />
        {/* Beard */}
        <div
          style={{
            position: "absolute",
            bottom: 114,
            left: "50%",
            transform: "translateX(-50%)",
            width: 14,
            height: 16,
            background: "linear-gradient(180deg, rgba(180,175,165,0.4) 0%, rgba(160,155,145,0.2) 100%)",
            borderRadius: "0 0 50% 50%",
          }}
        />
        {/* Crown */}
        <div
          style={{
            position: "absolute",
            bottom: 143,
            left: "50%",
            transform: "translateX(-50%)",
            width: 22,
            height: 10,
            background: "linear-gradient(180deg, rgba(251,191,36,0.6) 0%, rgba(217,160,32,0.4) 100%)",
            clipPath: "polygon(10% 100%, 0% 0%, 20% 40%, 35% 0%, 50% 40%, 65% 0%, 80% 40%, 100% 0%, 90% 100%)",
          }}
        />
        {/* Trident — shaft */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "calc(50% + 22px)",
            width: 3,
            height: 140,
            background: "linear-gradient(180deg, rgba(251,191,36,0.7) 0%, rgba(180,140,40,0.5) 100%)",
            borderRadius: 2,
            boxShadow: "0 0 6px rgba(251,191,36,0.3)",
          }}
        />
        {/* Trident — prongs */}
        <div
          style={{
            position: "absolute",
            bottom: 155,
            left: "calc(50% + 12px)",
            width: 24,
            height: 22,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: 3, height: 22, background: "rgba(251,191,36,0.6)", borderRadius: "2px 2px 0 0", transform: "rotate(-8deg)" }} />
          <div style={{ width: 3, height: 26, background: "rgba(251,191,36,0.7)", borderRadius: "2px 2px 0 0" }} />
          <div style={{ width: 3, height: 22, background: "rgba(251,191,36,0.6)", borderRadius: "2px 2px 0 0", transform: "rotate(8deg)" }} />
        </div>
        {/* Arm holding trident */}
        <div
          style={{
            position: "absolute",
            bottom: 95,
            left: "calc(50% + 8px)",
            width: 22,
            height: 5,
            background: "rgba(200,195,185,0.5)",
            borderRadius: 3,
            transform: "rotate(-15deg)",
          }}
        />
      </div>

      {/* === ATHENA — right side, with shield and spear === */}
      <div
        className="absolute"
        style={{ right: "10%", bottom: "20%", transform: "scale(0.8)" }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 65,
            height: 16,
            background: "linear-gradient(180deg, rgba(200,195,185,0.5) 0%, rgba(160,155,145,0.35) 100%)",
            borderRadius: "4px 4px 2px 2px",
          }}
        />
        {/* Long robe */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "50%",
            transform: "translateX(-50%)",
            width: 34,
            height: 95,
            background: "linear-gradient(175deg, rgba(220,215,205,0.55) 0%, rgba(200,195,185,0.5) 50%, rgba(180,175,165,0.4) 100%)",
            borderRadius: "6px 6px 4px 4px",
            clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Chest armor */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: 28,
            height: 30,
            background: "linear-gradient(180deg, rgba(251,191,36,0.45) 0%, rgba(200,160,50,0.35) 100%)",
            borderRadius: "4px 4px 8px 8px",
            boxShadow: "inset 0 2px 6px rgba(251,191,36,0.2)",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 108,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 22,
            background: "radial-gradient(ellipse at 50% 40%, rgba(220,215,205,0.6) 0%, rgba(195,190,180,0.5) 100%)",
            borderRadius: "50% 50% 45% 45%",
          }}
        />
        {/* Helmet with crest */}
        <div
          style={{
            position: "absolute",
            bottom: 125,
            left: "50%",
            transform: "translateX(-50%)",
            width: 22,
            height: 14,
            background: "linear-gradient(180deg, rgba(251,191,36,0.55) 0%, rgba(200,160,50,0.4) 100%)",
            borderRadius: "50% 50% 20% 20%",
          }}
        />
        {/* Helmet crest plume */}
        <div
          style={{
            position: "absolute",
            bottom: 133,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 20,
            background: "linear-gradient(180deg, rgba(220,60,60,0.5) 0%, rgba(200,50,50,0.3) 100%)",
            borderRadius: "3px 3px 0 0",
          }}
        />
        {/* Shield — circular on left side */}
        <div
          style={{
            position: "absolute",
            bottom: 45,
            left: "calc(50% - 32px)",
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, rgba(251,191,36,0.5) 0%, rgba(180,140,40,0.35) 60%, rgba(140,100,30,0.25) 100%)",
            border: "2px solid rgba(251,191,36,0.4)",
            boxShadow: "0 0 10px rgba(251,191,36,0.15)",
          }}
        />
        {/* Shield emblem — owl silhouette (simplified) */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: "calc(50% - 27px)",
            width: 10,
            height: 10,
            clipPath: "polygon(50% 0%, 100% 35%, 85% 100%, 15% 100%, 0% 35%)",
            background: "rgba(120,80,20,0.3)",
          }}
        />
        {/* Spear — shaft */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: "calc(50% + 18px)",
            width: 3,
            height: 145,
            background: "linear-gradient(180deg, rgba(180,140,40,0.5) 0%, rgba(140,100,30,0.4) 100%)",
            borderRadius: 2,
          }}
        />
        {/* Spear — tip */}
        <div
          style={{
            position: "absolute",
            bottom: 154,
            left: "calc(50% + 14px)",
            width: 10,
            height: 16,
            clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            background: "rgba(251,191,36,0.6)",
          }}
        />
      </div>

      {/* === APOLLO — center-left, with lyre and sun crown === */}
      <div
        className="absolute"
        style={{ left: "28%", bottom: "14%", transform: "scale(0.7)" }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 55,
            height: 14,
            background: "linear-gradient(180deg, rgba(200,195,185,0.45) 0%, rgba(170,165,155,0.3) 100%)",
            borderRadius: 3,
          }}
        />
        {/* Legs — more athletic stance */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 24,
            height: 50,
            background: "rgba(210,205,195,0.5)",
            clipPath: "polygon(18% 0%, 82% 0%, 95% 100%, 55% 100%, 55% 45%, 45% 45%, 45% 100%, 5% 100%)",
          }}
        />
        {/* Torso — draped toga */}
        <div
          style={{
            position: "absolute",
            bottom: 58,
            left: "50%",
            transform: "translateX(-50%)",
            width: 30,
            height: 50,
            background: "linear-gradient(160deg, rgba(255,255,240,0.5) 0%, rgba(251,240,200,0.4) 50%, rgba(220,215,205,0.45) 100%)",
            borderRadius: "6px 6px 0 0",
            boxShadow: "inset -4px 0 10px rgba(251,191,36,0.1)",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 105,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 22,
            background: "radial-gradient(ellipse at 50% 40%, rgba(225,220,210,0.6) 0%, rgba(200,195,185,0.5) 100%)",
            borderRadius: "50% 50% 45% 45%",
          }}
        />
        {/* Sun crown — radial golden rays */}
        <div
          style={{
            position: "absolute",
            bottom: 118,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(251,191,36,0.4) 20%, rgba(251,191,36,0.15) 50%, transparent 70%)",
            boxShadow: "0 0 20px rgba(251,191,36,0.25), 0 0 40px rgba(251,191,36,0.1)",
          }}
        />
        {/* Laurel wreath on head */}
        <div
          style={{
            position: "absolute",
            bottom: 122,
            left: "50%",
            transform: "translateX(-50%)",
            width: 22,
            height: 8,
            borderRadius: "50%",
            border: "2px solid rgba(101,163,13,0.4)",
            borderBottom: "none",
            background: "transparent",
          }}
        />
        {/* Lyre — held in left hand */}
        <div
          style={{
            position: "absolute",
            bottom: 65,
            left: "calc(50% - 28px)",
          }}
        >
          {/* Lyre body — U shape */}
          <div
            style={{
              width: 18,
              height: 24,
              border: "2px solid rgba(251,191,36,0.5)",
              borderTop: "none",
              borderRadius: "0 0 50% 50%",
              background: "rgba(251,191,36,0.08)",
            }}
          />
          {/* Lyre crossbar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -2,
              width: 22,
              height: 2,
              background: "rgba(251,191,36,0.5)",
            }}
          />
          {/* Lyre strings */}
          {[4, 8, 12].map((x) => (
            <div
              key={x}
              style={{
                position: "absolute",
                top: 2,
                left: x,
                width: 1,
                height: 18,
                background: "rgba(251,191,36,0.35)",
              }}
            />
          ))}
        </div>
        {/* Left arm reaching to lyre */}
        <div
          style={{
            position: "absolute",
            bottom: 85,
            left: "calc(50% - 18px)",
            width: 18,
            height: 4,
            background: "rgba(210,205,195,0.45)",
            borderRadius: 2,
            transform: "rotate(25deg)",
          }}
        />
      </div>

      {/* === HERMES — right-center, dynamic pose with winged sandals === */}
      <div
        className="absolute"
        style={{ right: "26%", bottom: "16%", transform: "scale(0.65)" }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 50,
            height: 12,
            background: "linear-gradient(180deg, rgba(200,195,185,0.4) 0%, rgba(170,165,155,0.25) 100%)",
            borderRadius: 3,
          }}
        />
        {/* Running legs — dynamic spread */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 48,
            background: "rgba(210,205,195,0.5)",
            clipPath: "polygon(35% 0%, 65% 0%, 90% 50%, 100% 100%, 70% 85%, 50% 40%, 30% 85%, 0% 100%, 10% 50%)",
          }}
        />
        {/* Winged sandal — left */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "calc(50% - 20px)",
            width: 12,
            height: 8,
            clipPath: "polygon(0% 100%, 100% 50%, 80% 0%, 30% 0%)",
            background: "rgba(251,191,36,0.4)",
          }}
        />
        {/* Winged sandal — right */}
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "calc(50% + 10px)",
            width: 12,
            height: 8,
            clipPath: "polygon(0% 50%, 100% 100%, 70% 0%, 20% 0%)",
            background: "rgba(251,191,36,0.4)",
          }}
        />
        {/* Torso */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            left: "50%",
            transform: "translateX(-50%)",
            width: 26,
            height: 45,
            background: "linear-gradient(175deg, rgba(220,215,205,0.5) 0%, rgba(200,195,185,0.45) 100%)",
            borderRadius: "5px 5px 0 0",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 94,
            left: "50%",
            transform: "translateX(-50%)",
            width: 17,
            height: 20,
            background: "radial-gradient(ellipse at 50% 40%, rgba(220,215,205,0.6) 0%, rgba(195,190,180,0.5) 100%)",
            borderRadius: "50% 50% 45% 45%",
          }}
        />
        {/* Winged helmet */}
        <div
          style={{
            position: "absolute",
            bottom: 108,
            left: "50%",
            transform: "translateX(-50%)",
            width: 22,
            height: 12,
            background: "linear-gradient(180deg, rgba(251,191,36,0.5) 0%, rgba(200,160,50,0.35) 100%)",
            borderRadius: "50% 50% 20% 20%",
          }}
        />
        {/* Helmet wings */}
        <div
          style={{
            position: "absolute",
            bottom: 112,
            left: "calc(50% - 18px)",
            width: 12,
            height: 10,
            clipPath: "polygon(100% 80%, 60% 0%, 0% 30%, 40% 100%)",
            background: "rgba(255,255,255,0.4)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 112,
            left: "calc(50% + 6px)",
            width: 12,
            height: 10,
            clipPath: "polygon(0% 80%, 40% 0%, 100% 30%, 60% 100%)",
            background: "rgba(255,255,255,0.4)",
          }}
        />
        {/* Caduceus — shaft */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "calc(50% + 20px)",
            width: 3,
            height: 105,
            background: "linear-gradient(180deg, rgba(251,191,36,0.6) 0%, rgba(180,140,40,0.4) 100%)",
            borderRadius: 2,
          }}
        />
        {/* Caduceus — wings at top */}
        <div
          style={{
            position: "absolute",
            bottom: 120,
            left: "calc(50% + 15px)",
            width: 14,
            height: 8,
            clipPath: "polygon(50% 100%, 0% 0%, 50% 30%, 100% 0%)",
            background: "rgba(251,191,36,0.45)",
          }}
        />
        {/* Outstretched arm to caduceus */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: "calc(50% + 6px)",
            width: 20,
            height: 4,
            background: "rgba(210,205,195,0.45)",
            borderRadius: 2,
            transform: "rotate(-20deg)",
          }}
        />
      </div>

      {/* === ARES — far left background, smaller, with sword and shield === */}
      <div
        className="absolute"
        style={{ left: "18%", bottom: "24%", transform: "scale(0.5)", opacity: 0.7 }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 50,
            height: 12,
            background: "rgba(190,185,175,0.4)",
            borderRadius: 3,
          }}
        />
        {/* Armored body */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 30,
            height: 85,
            background: "linear-gradient(180deg, rgba(180,60,60,0.4) 0%, rgba(140,40,40,0.3) 40%, rgba(200,195,185,0.4) 100%)",
            borderRadius: "5px 5px 3px 3px",
            clipPath: "polygon(25% 0%, 75% 0%, 85% 35%, 80% 100%, 55% 100%, 55% 60%, 45% 60%, 45% 100%, 20% 100%, 15% 35%)",
          }}
        />
        {/* Head with war helmet */}
        <div
          style={{
            position: "absolute",
            bottom: 92,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 22,
            background: "radial-gradient(ellipse, rgba(180,60,60,0.45) 0%, rgba(140,40,40,0.35) 100%)",
            borderRadius: "50% 50% 40% 40%",
          }}
        />
        {/* Helmet crest */}
        <div
          style={{
            position: "absolute",
            bottom: 110,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 16,
            background: "linear-gradient(180deg, rgba(180,60,60,0.5) 0%, rgba(140,40,40,0.3) 100%)",
            borderRadius: "2px 2px 0 0",
          }}
        />
        {/* Sword — right side */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: "calc(50% + 16px)",
            width: 3,
            height: 70,
            background: "linear-gradient(180deg, rgba(200,200,210,0.5) 0%, rgba(180,180,190,0.4) 100%)",
            borderRadius: 1,
          }}
        />
        {/* Sword hilt */}
        <div
          style={{
            position: "absolute",
            bottom: 62,
            left: "calc(50% + 10px)",
            width: 14,
            height: 3,
            background: "rgba(251,191,36,0.45)",
            borderRadius: 1,
          }}
        />
        {/* Round shield — left */}
        <div
          style={{
            position: "absolute",
            bottom: 35,
            left: "calc(50% - 30px)",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, rgba(180,60,60,0.4) 0%, rgba(140,40,40,0.3) 70%)",
            border: "2px solid rgba(180,60,60,0.35)",
          }}
        />
      </div>

      {/* === ARTEMIS — far right background, smaller, with bow === */}
      <div
        className="absolute"
        style={{ right: "16%", bottom: "26%", transform: "scale(0.5)", opacity: 0.65 }}
      >
        {/* Pedestal */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 45,
            height: 10,
            background: "rgba(190,185,175,0.35)",
            borderRadius: 3,
          }}
        />
        {/* Flowing dress */}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 28,
            height: 80,
            background: "linear-gradient(170deg, rgba(120,200,160,0.4) 0%, rgba(80,170,130,0.3) 50%, rgba(200,195,185,0.4) 100%)",
            borderRadius: "5px 5px 0 0",
            clipPath: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
          }}
        />
        {/* Head */}
        <div
          style={{
            position: "absolute",
            bottom: 85,
            left: "50%",
            transform: "translateX(-50%)",
            width: 16,
            height: 20,
            background: "radial-gradient(ellipse, rgba(220,215,205,0.55) 0%, rgba(195,190,180,0.45) 100%)",
            borderRadius: "50% 50% 45% 45%",
          }}
        />
        {/* Crescent moon crown */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
            width: 18,
            height: 10,
            borderRadius: "50% 50% 0 0",
            border: "2px solid rgba(200,210,230,0.5)",
            borderBottom: "none",
            background: "transparent",
          }}
        />
        {/* Bow — arc shape */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "calc(50% - 24px)",
            width: 16,
            height: 55,
            borderRadius: "50%",
            border: "2px solid rgba(140,100,40,0.4)",
            borderRight: "none",
            background: "transparent",
          }}
        />
        {/* Bowstring */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "calc(50% - 18px)",
            width: 1,
            height: 55,
            background: "rgba(200,195,185,0.3)",
          }}
        />
        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            bottom: 55,
            left: "calc(50% - 25px)",
            width: 30,
            height: 2,
            background: "rgba(180,140,40,0.35)",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  )
})
