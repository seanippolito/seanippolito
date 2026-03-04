# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for seanippolito.com. Single-page static site with an immersive jungle theme — layered SVG parallax scene, fireflies, and hidden game easter egg. No backend.

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
  App.tsx                         # Root — wires scene, content, game teaser, game overlay
  main.tsx                        # Vite entry point
  index.css                       # Tailwind directives + keyframe animations
  components/
    JungleScene.tsx               # Parallax jungle scene orchestrator
    CenterContent.tsx             # Name, tagline, social links, resume download
    GameTeaser.tsx                # Subtle game prompt at bottom of page
    Game.tsx                      # Tap game overlay (canvas)
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
    links.ts                      # Social/contact link definitions
public/
  resume.pdf                      # Placeholder (replace with real PDF)
```

## Architecture

Single fullscreen scene. `JungleScene` renders six SVG layers with depth-based mouse parallax via `useMouseParallax`. `CenterContent` sits centered over the scene with name, tagline, social icon links, and a resume download button. `GameTeaser` shows a subtle prompt at the bottom; clicking it opens the `Game` overlay.

## Design System

- **Color palette**: Deep jungle greens (`#0a1f0a` base), emerald highlights, amber/gold accents for fireflies and interactive elements, soft sky gradients
- **Visual layers** (back to front): sky gradient, far trees, mid foliage, animals, center content, fireflies, foreground leaves
- **Typography**: Clean sans-serif, white/light text over dark jungle backdrop
- **Motion**: Mouse parallax on jungle layers, firefly float animations, gentle sway on foliage. Support `prefers-reduced-motion`

## localStorage Keys

- `seanippolito_highScore` — game high score

## Design Reference

See `CHATGPT.md` in the project root for the full design brief and content structure.
