# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for seanippolito.com. Multi-scene immersive site with 5 themed environments (jungle, heaven, beach, volcano, snow) connected by cinematic directional transitions. Each scene has layered SVG parallax, and a hidden game easter egg is accessible from any scene. No backend.

## Tech Stack

- Vite + React + TypeScript
- Tailwind CSS v4
- Deployment: Cloudflare Pages or Netlify
- Game: HTML Canvas in a React component (no external game engine)
- No analytics, no third-party UI libraries, no heavy animation libraries

## Build & Dev Commands

```bash
npm install        # install dependencies
npm run dev        # local dev server
npm run build      # production build
npm run preview    # preview production build
```

## File Structure

```
src/
  App.tsx                         # Root — wires scenes, transitions, navigation, game overlay
  main.tsx                        # Vite entry point
  index.css                       # Tailwind directives + keyframe animations
  components/
    SceneTransition.tsx           # Cinematic transition engine (slide N/S, 3D rotate E/W)
    NavigationHub.tsx             # Compass nav: 4 directional arrows + "curious?" game button
    CenterContent.tsx             # Name, tagline, social links, resume download (shared overlay)
    Game.tsx                      # Tap game overlay (receives currentScene for future theming)
    JungleScene.tsx               # Parallax jungle scene orchestrator
    scenes/
      HeavenScene.tsx             # Heaven scene (clouds, golden rays)
      BeachScene.tsx              # Beach scene (waves, palm silhouettes)
      VolcanoScene.tsx            # Volcano scene (jagged peaks, lava glow)
      SnowScene.tsx               # Snow scene (mountains, pine trees)
    jungle/
      BackgroundSky.tsx           # Gradient sky + moon/stars
      FarTrees.tsx                # Distant tree silhouettes (deepest parallax)
      MidFoliage.tsx              # Mid-ground foliage
      Animals.tsx                 # Hidden jungle animals
      Fireflies.tsx               # Animated floating fireflies
      ForegroundLeaves.tsx        # Closest leaf framing (strongest parallax)
  hooks/
    useMouseParallax.ts           # Mouse-tracking hook for parallax offsets
  data/
    scenes.ts                     # Scene types, config, navigation cycle logic
    links.ts                      # Social/contact link definitions
public/
  resume.pdf                      # Placeholder (replace with real PDF)
```

## Architecture

### Scene System
Five fullscreen scenes connected by two independent 3-scene navigation cycles:
- **Vertical (north/south):** jungle → heaven → volcano → jungle → ...
- **Horizontal (east/west):** jungle → beach → snow → jungle → ...

Scenes not in a given cycle (e.g., volcano pressing east) default to the jungle position and advance from there. `SceneTransition` handles all animations: slide up/down for north/south, 3D rotateY for east/west. Duration: 1000ms, easing: cubic-bezier(0.4, 0.0, 0.2, 1).

### Layout Stack
- `SceneTransition` — renders active scene (+ incoming scene during transitions)
- `CenterContent` — shared overlay with name, tagline, links (identical across all scenes)
- `NavigationHub` — compass layout at bottom: 4 directional arrows + center "curious?" game button
- `Game` — fullscreen overlay when activated (receives `currentScene` for future themed variants)

### Navigation Hub
Compass layout centered at `bottom-14`. All 4 arrows always visible with dynamic labels based on current scene and navigation cycles. Arrows disable during transitions. Center dot launches game overlay.

## Design System

- **Color palette per scene:**
  - Jungle: Deep greens (`#0a1f0a`), emerald, amber/gold accents
  - Heaven: Gold center (`#fffbe6`), pale blue (`#c4d7f2`), deeper blue (`#7ba7cc`)
  - Beach: Sky blue (`#87ceeb`), turquoise (`#2dd4bf`), sand (`#c2956b`)
  - Volcano: Orange glow (`#7f1d1d`), dark red (`#450a0a`), lava (`#ea580c`)
  - Snow: Steel grey (`#94a3b8`), pale blue (`#bfdbfe`), white (`#f8fafc`)
- **Navigation:** Amber/gold arrows `rgba(212, 160, 48, ...)` with pulse animation
- **Typography**: Clean sans-serif, white/light text over scene backdrops
- **Motion**: Mouse parallax on scene layers, firefly animations, CSS transitions for scene changes. Support `prefers-reduced-motion`

## localStorage Keys

- `seanippolito_highScore` — game high score

## Design Reference

See `CHATGPT.md` in the project root for the full design brief and content structure.
