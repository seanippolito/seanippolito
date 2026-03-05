import { memo, useState, useCallback } from "react"

const STORAGE_KEY = "snow-eggs-found"

function loadFound(): boolean[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length === 4) return parsed
    }
    return [false, false, false, false]
  } catch {
    return [false, false, false, false]
  }
}

function saveFound(state: boolean[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export const SnowEasterEggs = memo(function SnowEasterEggs() {
  const [found, setFound] = useState<boolean[]>(loadFound)

  // Egg 1 — yeti footprints toggle
  const [footprintsVisible, setFootprintsVisible] = useState(false)

  // Egg 2 — cabin window flicker
  const [cabinFlickering, setCabinFlickering] = useState(false)

  // Egg 3 — snowman revealed
  const [snowmanVisible, setSnowmanVisible] = useState(false)

  // Egg 4 — fish jumping
  const [fishJumping, setFishJumping] = useState(false)

  const markFound = useCallback((index: number) => {
    setFound((prev) => {
      if (prev[index]) return prev
      const next = [...prev]
      next[index] = true
      saveFound(next)
      return next
    })
  }, [])

  // Egg 1: Yeti footprints — toggle visibility
  const handleFootprints = useCallback(() => {
    setFootprintsVisible((v) => !v)
    markFound(0)
  }, [markFound])

  // Egg 2: Cabin door — flicker windows for 2s
  const handleCabinDoor = useCallback(() => {
    if (cabinFlickering) return
    setCabinFlickering(true)
    markFound(1)
    setTimeout(() => setCabinFlickering(false), 2000)
  }, [cabinFlickering, markFound])

  // Egg 3: Hidden snowman — fade in toggle
  const handleSnowman = useCallback(() => {
    setSnowmanVisible((v) => !v)
    markFound(2)
  }, [markFound])

  // Egg 4: Ice fishing hole — fish jumps briefly
  const handleFishingHole = useCallback(() => {
    if (fishJumping) return
    setFishJumping(true)
    markFound(3)
    setTimeout(() => setFishJumping(false), 1000)
  }, [fishJumping, markFound])

  const foundCount = found.filter(Boolean).length
  const anyFound = foundCount > 0

  return (
    <div className="fixed inset-0 overflow-hidden z-10">

      {/* ── Egg 1: Yeti footprints (~x:100-300, y:900-950 on 1920x1080) ── */}
      {/* Hotspot: ~10.4% from left, ~85.6% from top */}
      <div
        onClick={handleFootprints}
        style={{
          position: "absolute",
          left: "6%",
          top: "83%",
          width: "16%",
          height: "7%",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        {/* Invisible clickable overlay */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 200 50"
          style={{ overflow: "visible" }}
        >
          {/* Transparent hotspot rect */}
          <rect x="0" y="0" width="200" height="50" fill="transparent" />

          {/* Giant oval footprint depressions — toggled visible */}
          {footprintsVisible && (
            <g>
              {/* Footprint 1 */}
              <ellipse
                cx="20"
                cy="35"
                rx="14"
                ry="9"
                fill="rgba(150,150,170,0.2)"
                style={{ transition: "opacity 0.4s ease-in" }}
              />
              {/* Toe indentations */}
              <ellipse cx="12" cy="27" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="20" cy="26" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="28" cy="28" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />

              {/* Footprint 2 — offset right and lower */}
              <ellipse
                cx="80"
                cy="40"
                rx="14"
                ry="9"
                fill="rgba(150,150,170,0.2)"
                style={{ transition: "opacity 0.4s ease-in" }}
              />
              <ellipse cx="72" cy="32" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="80" cy="31" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="88" cy="33" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />

              {/* Footprint 3 */}
              <ellipse
                cx="140"
                cy="34"
                rx="14"
                ry="9"
                fill="rgba(150,150,170,0.2)"
                style={{ transition: "opacity 0.4s ease-in" }}
              />
              <ellipse cx="132" cy="26" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="140" cy="25" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="148" cy="27" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />

              {/* Footprint 4 */}
              <ellipse
                cx="185"
                cy="42"
                rx="14"
                ry="9"
                fill="rgba(150,150,170,0.2)"
                style={{ transition: "opacity 0.4s ease-in" }}
              />
              <ellipse cx="177" cy="34" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="185" cy="33" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
              <ellipse cx="193" cy="35" rx="4" ry="3" fill="rgba(150,150,170,0.15)" />
            </g>
          )}
        </svg>
      </div>

      {/* ── Egg 2: Cabin door (~x:1382-1398, y:585-610 on 1920x1080) ── */}
      {/* Hotspot: ~72% from left, ~55% from top */}
      <div
        onClick={handleCabinDoor}
        style={{
          position: "absolute",
          left: "71.5%",
          top: "54.2%",
          width: "1%",
          height: "2.3%",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 16 25"
          style={{ overflow: "visible" }}
        >
          {/* Transparent hotspot */}
          <rect x="0" y="0" width="16" height="25" fill="transparent" />

          {/* Cabin windows — flicker during activation */}
          {cabinFlickering && (
            <>
              {/* Left window */}
              <rect x="-28" y="-8" width="10" height="8" rx="1" fill="#fbbf24" opacity="0.9">
                <animate
                  attributeName="opacity"
                  values="0.9;0.1;0.8;0.2;0.95;0.05;0.85;0.3;0.9;0.1;0.7;0.9"
                  dur="2s"
                  fill="freeze"
                />
              </rect>
              {/* Right window */}
              <rect x="34" y="-8" width="10" height="8" rx="1" fill="#fbbf24" opacity="0.9">
                <animate
                  attributeName="opacity"
                  values="0.1;0.9;0.2;0.85;0.05;0.95;0.3;0.8;0.1;0.9;0.9;0.1"
                  dur="2s"
                  fill="freeze"
                />
              </rect>
              {/* Warm glow spilling under door */}
              <rect x="-2" y="20" width="20" height="4" rx="2" fill="rgba(251,191,36,0.3)" opacity="0">
                <animate attributeName="opacity" values="0;0.5;0.1;0.4;0;0.3;0" dur="2s" fill="freeze" />
              </rect>
            </>
          )}
        </svg>
      </div>

      {/* ── Egg 3: Hidden snowman (~x:1100, y:780 on 1920x1080) ── */}
      {/* Hotspot: ~57.3% from left, ~72.2% from top */}
      <div
        onClick={handleSnowman}
        style={{
          position: "absolute",
          left: "56.5%",
          top: "70%",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        <svg
          width="48"
          height="72"
          viewBox="0 0 48 72"
          style={{
            overflow: "visible",
            opacity: snowmanVisible ? 1 : 0,
            transition: "opacity 0.6s ease-in",
          }}
        >
          {/* Transparent hotspot (always clickable) */}
          <rect x="0" y="0" width="48" height="72" fill="transparent" />

          {/* Snowman body — 3 stacked circles */}
          {/* Bottom ball */}
          <circle cx="24" cy="58" r="13" fill="rgba(240,248,255,0.85)" stroke="rgba(180,200,220,0.4)" strokeWidth="0.8" />
          {/* Middle ball */}
          <circle cx="24" cy="38" r="10" fill="rgba(240,248,255,0.85)" stroke="rgba(180,200,220,0.4)" strokeWidth="0.8" />
          {/* Head */}
          <circle cx="24" cy="22" r="8" fill="rgba(240,248,255,0.85)" stroke="rgba(180,200,220,0.4)" strokeWidth="0.8" />

          {/* Carrot nose — triangle pointing right */}
          <polygon points="24,21 33,22.5 24,24" fill="rgba(234,88,12,0.8)" />

          {/* Eyes */}
          <circle cx="21" cy="19" r="1.2" fill="rgba(30,30,50,0.8)" />
          <circle cx="27" cy="19" r="1.2" fill="rgba(30,30,50,0.8)" />

          {/* Smile — small dots */}
          <circle cx="20" cy="25" r="0.8" fill="rgba(30,30,50,0.6)" />
          <circle cx="22" cy="27" r="0.8" fill="rgba(30,30,50,0.6)" />
          <circle cx="24" cy="27.5" r="0.8" fill="rgba(30,30,50,0.6)" />
          <circle cx="26" cy="27" r="0.8" fill="rgba(30,30,50,0.6)" />
          <circle cx="28" cy="25" r="0.8" fill="rgba(30,30,50,0.6)" />

          {/* Button dots on middle ball */}
          <circle cx="24" cy="33" r="1" fill="rgba(30,30,50,0.5)" />
          <circle cx="24" cy="38" r="1" fill="rgba(30,30,50,0.5)" />
          <circle cx="24" cy="43" r="1" fill="rgba(30,30,50,0.5)" />

          {/* Stick arms */}
          <line x1="14" y1="36" x2="2" y2="28" stroke="rgba(80,50,20,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="28" x2="-2" y2="22" stroke="rgba(80,50,20,0.6)" strokeWidth="1" strokeLinecap="round" />
          <line x1="2" y1="28" x2="-6" y2="26" stroke="rgba(80,50,20,0.6)" strokeWidth="1" strokeLinecap="round" />

          <line x1="34" y1="36" x2="46" y2="28" stroke="rgba(80,50,20,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="46" y1="28" x2="50" y2="22" stroke="rgba(80,50,20,0.6)" strokeWidth="1" strokeLinecap="round" />
          <line x1="46" y1="28" x2="54" y2="26" stroke="rgba(80,50,20,0.6)" strokeWidth="1" strokeLinecap="round" />

          {/* Top hat */}
          {/* Hat brim */}
          <rect x="14" y="13" width="20" height="2.5" rx="1" fill="rgba(20,20,30,0.75)" />
          {/* Hat crown */}
          <rect x="17" y="1" width="14" height="13" rx="1.5" fill="rgba(20,20,30,0.75)" />
          {/* Hat band */}
          <rect x="17" y="10" width="14" height="2.5" fill="rgba(80,40,10,0.5)" />
        </svg>

        {/* Invisible hotspot overlay so click works even when snowman is hidden */}
        {!snowmanVisible && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 48,
              height: 72,
            }}
          />
        )}
      </div>

      {/* ── Egg 4: Ice fishing hole (~x:960, y:620 on 1920x1080) ── */}
      {/* Hotspot: ~50% from left, ~57.4% from top */}
      <div
        onClick={handleFishingHole}
        style={{
          position: "absolute",
          left: "49.5%",
          top: "56%",
          pointerEvents: "auto",
          cursor: "pointer",
        }}
      >
        <svg
          width="40"
          height="60"
          viewBox="0 0 40 60"
          style={{ overflow: "visible" }}
        >
          {/* Transparent hotspot */}
          <rect x="0" y="0" width="40" height="60" fill="transparent" />

          {/* Frozen lake ice hole — always faintly visible */}
          <ellipse cx="20" cy="40" rx="14" ry="7" fill="rgba(30,60,100,0.35)" stroke="rgba(148,210,255,0.25)" strokeWidth="1" />
          {/* Ice crack lines around hole */}
          <line x1="6" y1="38" x2="0" y2="33" stroke="rgba(180,220,255,0.2)" strokeWidth="0.6" />
          <line x1="34" y1="38" x2="40" y2="33" stroke="rgba(180,220,255,0.2)" strokeWidth="0.6" />
          <line x1="20" y1="33" x2="20" y2="28" stroke="rgba(180,220,255,0.15)" strokeWidth="0.6" />
          <line x1="8" y1="42" x2="2" y2="46" stroke="rgba(180,220,255,0.15)" strokeWidth="0.5" />
          <line x1="32" y1="42" x2="38" y2="46" stroke="rgba(180,220,255,0.15)" strokeWidth="0.5" />

          {/* Water shimmer inside hole */}
          <ellipse cx="20" cy="40" rx="10" ry="4" fill="rgba(50,100,160,0.3)" />

          {/* Fish — animates up 30px then back down over 1s when fishJumping */}
          <g
            style={{
              transform: fishJumping ? "translateY(-30px)" : "translateY(0px)",
              transition: fishJumping
                ? "transform 0.5s cubic-bezier(0.2,0,0.4,1)"
                : "transform 0.5s cubic-bezier(0.6,0,0.8,1)",
              opacity: fishJumping ? 1 : 0,
            }}
          >
            {/* Fish body */}
            <ellipse cx="20" cy="38" rx="7" ry="3.5" fill="rgba(80,160,200,0.8)" />
            {/* Fish tail */}
            <polygon points="13,38 8,34 8,42" fill="rgba(60,130,170,0.8)" />
            {/* Fish eye */}
            <circle cx="25" cy="37" r="1.2" fill="rgba(255,255,255,0.9)" />
            <circle cx="25.4" cy="37" r="0.6" fill="rgba(20,20,40,0.9)" />
            {/* Fish scales */}
            <path d="M22 36 Q20 34 18 36" stroke="rgba(100,180,220,0.5)" strokeWidth="0.5" fill="none" />
            <path d="M19 37.5 Q17 35.5 15 37.5" stroke="rgba(100,180,220,0.5)" strokeWidth="0.5" fill="none" />
            {/* Water droplet spray */}
            {fishJumping && (
              <>
                <circle cx="14" cy="40" r="1" fill="rgba(180,220,255,0.6)" opacity="0">
                  <animate attributeName="cy" from="40" to="32" dur="0.5s" fill="freeze" />
                  <animate attributeName="cx" from="14" to="8" dur="0.5s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.5s" fill="freeze" />
                </circle>
                <circle cx="26" cy="40" r="0.8" fill="rgba(180,220,255,0.6)" opacity="0">
                  <animate attributeName="cy" from="40" to="31" dur="0.6s" fill="freeze" />
                  <animate attributeName="cx" from="26" to="32" dur="0.6s" fill="freeze" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="0.6s" fill="freeze" />
                </circle>
                <circle cx="20" cy="38" r="0.7" fill="rgba(200,235,255,0.7)" opacity="0">
                  <animate attributeName="cy" from="38" to="28" dur="0.4s" fill="freeze" />
                  <animate attributeName="opacity" from="0.7" to="0" dur="0.4s" fill="freeze" />
                </circle>
              </>
            )}
          </g>
        </svg>
      </div>

      {/* ── Egg counter — bottom-left, subtle, only shown after first find ── */}
      {anyFound && (
        <div
          style={{
            position: "fixed",
            bottom: "1.5rem",
            left: "1.5rem",
            color: "white",
            opacity: 0.3,
            fontSize: "0.8rem",
            fontFamily: "sans-serif",
            letterSpacing: "0.05em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          ❄ {foundCount}/4
        </div>
      )}
    </div>
  )
})
