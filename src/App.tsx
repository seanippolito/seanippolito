import { useState } from "react"
import { JungleScene } from "./components/JungleScene"
import { CenterContent } from "./components/CenterContent"
import { GameTeaser } from "./components/GameTeaser"
import { Game } from "./components/Game"

function App() {
  const [gameActive, setGameActive] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#0a1f0a]">
      <JungleScene />
      <CenterContent />
      {!gameActive && (
        <GameTeaser onActivate={() => setGameActive(true)} />
      )}
      {gameActive && <Game onClose={() => setGameActive(false)} />}
    </div>
  )
}

export default App
