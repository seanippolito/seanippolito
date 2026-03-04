# seanippolito.com — v1 Design Document

## Concept

A single-page personal website with an immersive jungle scene filling the viewport. The user's name, social links, and resume download are centered in the scene — no card, no container, just clean white text with a soft glow that blends into the environment. Interactive parallax and ambient animations give the page life.

## Layout

Full-viewport jungle scene. Content is vertically and horizontally centered. A subtle game teaser sits near the bottom.

```
┌─────────────────────────────────┐
│  foreground leaves (parallax)   │
│                                 │
│        Sean Ippolito            │
│      tagline goes here          │
│                                 │
│   [GH]  [IG]  [LI]  [Web]     │
│          [Email]                │
│      [Download Resume]          │
│                                 │
│                                 │
│    game teaser at bottom        │
│  foliage                        │
└─────────────────────────────────┘
```

## Visual Layers (back to front)

1. **Deep background** — Dark gradient sky, faint canopy light
2. **Far trees** — Silhouette layer, slow parallax on mouse move
3. **Mid foliage** — Detailed leaves/vines, medium parallax
4. **Animals** — Scattered in scene, react to mouse proximity (parrot turns head, monkey peeks out, fireflies drift)
5. **Content** — Name, tagline, links, resume — clean white text with soft ambient glow, no container
6. **Foreground leaves** — Closest layer, fastest parallax, frames viewport edges

## Interactivity

- **Mouse parallax**: Each layer shifts at different speeds based on cursor position, creating depth
- **Animal reactions**: Animals near the cursor respond with subtle CSS transforms
- **Ambient motion**: Leaves sway on CSS keyframe loops, fireflies drift randomly
- **Mobile**: Gyroscope parallax if available, otherwise gentle auto-animation fallback

## Text Style

- Clean white text with soft glow/shadow for readability against foliage
- No card, box, or frosted backdrop — text is part of the scene
- Links use warm gold/amber hover accents (like light filtering through leaves)

## Color Palette

- Deep greens: `#0a1f0a`, `#1a3a1a`
- Warm earth tones for depth
- Soft gold/amber for link hover states
- White for primary text with subtle glow

## Tech Stack

- Vite + React + TypeScript + Tailwind CSS
- Cloudflare Pages deployment (git-push auto-deploy)
- No backend, no analytics, no third-party UI libraries

## Project Structure

```
src/
  components/
    JungleScene.tsx     # Parallax layers, mouse tracking, animal reactions
    CenterContent.tsx   # Name, tagline, links, resume download
    GameTeaser.tsx      # Subtle interactive element at bottom
    Game.tsx            # Placeholder game view
  data/
    links.ts            # Social links (icon, url, label)
  hooks/
    useMouseParallax.ts # Mouse position tracking + parallax calculations
  App.tsx               # Composes scene + content
  index.css             # Tailwind base + custom animations
public/
  resume.pdf            # Placeholder PDF
  assets/               # Jungle layer images (placeholder silhouettes for v1)
```

## localStorage Keys

- `seanippolito_highScore` — game high score
- `seanippolito_theme` — reserved for v2

## Game Section

- Placeholder game for v1 (simple interactive canvas element)
- Triggered by clicking a teaser element at the bottom of the page
- Full game details to be provided later

## Assets

- Placeholder silhouette SVGs for jungle layers in v1
- Real artwork to be sourced from NanoBanana/Kling later

## v2 Roadmap (not built now)

- Rotating environments: jungle, beach, mountain — random per visit
- Scene change tied to game interaction
- Full game implementation (details TBD)
