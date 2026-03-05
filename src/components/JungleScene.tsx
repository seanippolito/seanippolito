import { useMouseParallax, getLayerTransform } from "../hooks/useMouseParallax"
import { BackgroundSky } from "./jungle/BackgroundSky"
import { FarTrees } from "./jungle/FarTrees"
import { GodRays } from "./jungle/GodRays"
import { MidFoliage } from "./jungle/MidFoliage"
import { Mist } from "./jungle/Mist"
import { ForegroundLeaves } from "./jungle/ForegroundLeaves"
import { Animals } from "./jungle/Animals"
import { Fireflies } from "./jungle/Fireflies"

export function JungleScene() {
  const offset = useMouseParallax({ strength: 25, smoothing: 0.06 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Layer 0: Deep sky (static) */}
      <BackgroundSky />

      {/* Layer 1: God rays from canopy opening (very slow parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.05) }}
      >
        <GodRays />
      </div>

      {/* Layer 2: Far trees (slow parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.15) }}
      >
        <FarTrees />
      </div>

      {/* Layer 3: Ground mist (slow, behind mid foliage) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.2) }}
      >
        <Mist />
      </div>

      {/* Layer 4: Mid foliage — palm fronds, vines, monstera (medium parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <MidFoliage />
      </div>

      {/* Layer 5: Animals (medium parallax, own reactions) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.35) }}
      >
        <Animals mouseX={offset.x / 25} mouseY={offset.y / 25} />
      </div>

      {/* Layer 6: Fireflies + floating spores (medium-close) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.5) }}
      >
        <Fireflies />
      </div>

      {/* Layer 7: Foreground leaves — bokeh depth of field (closest, strongest parallax) */}
      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.9) }}
      >
        <ForegroundLeaves />
      </div>
    </div>
  )
}
