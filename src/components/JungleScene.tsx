import { useMouseParallax, getLayerTransform } from "../hooks/useMouseParallax"
import { BackgroundSky } from "./jungle/BackgroundSky"
import { FarTrees } from "./jungle/FarTrees"
import { MidFoliage } from "./jungle/MidFoliage"
import { ForegroundLeaves } from "./jungle/ForegroundLeaves"
import { Animals } from "./jungle/Animals"
import { Fireflies } from "./jungle/Fireflies"

export function JungleScene() {
  const offset = useMouseParallax({ strength: 30, smoothing: 0.08 })

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <BackgroundSky />

      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.2) }}
      >
        <FarTrees />
      </div>

      <div
        className="absolute inset-0 animate-sway"
        style={{ transform: getLayerTransform(offset, 0.5) }}
      >
        <MidFoliage />
      </div>

      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.4) }}
      >
        <Animals mouseX={offset.x / 30} mouseY={offset.y / 30} />
      </div>

      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.3) }}
      >
        <Fireflies />
      </div>

      <div
        className="absolute inset-0"
        style={{ transform: getLayerTransform(offset, 0.8) }}
      >
        <ForegroundLeaves />
      </div>
    </div>
  )
}
