# Heaven Scene (Mount Olympus) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the placeholder HeavenScene into a fully immersive Mount Olympus environment with animated clouds, god-rays, eagles, golden motes, ambient lightning, easter eggs, cursor divine glow, and procedural audio.

**Architecture:** Follows the volcano scene pattern — a main `HeavenScene.tsx` with layered SVG parallax, plus ~10 independent animated sub-components imported into it. Audio via a dedicated `useHeavenAudio.ts` hook wired through `App.tsx`.

**Tech Stack:** React, SVG, Web Audio API, requestAnimationFrame, CSS transitions

---

### Task 1: Rewrite HeavenScene.tsx — SVG Layers

**Files:**
- Modify: `src/components/scenes/HeavenScene.tsx`

**Step 1: Rewrite the scene with 3 rich parallax layers**

Replace the entire file. Keep same export pattern (`memo`, `HeavenSceneProps`).

**Layer 1 (depth: 0.08) — Distant peaks & sky:**
```tsx
// Purple-blue mountain range silhouette
<path d="M0 580 L150 420 L300 480 L450 350 L600 440 L750 300 L900 200 L960 160 L1020 200 L1150 300 L1300 440 L1450 350 L1600 480 L1750 420 L1920 580 L1920 1080 L0 1080Z"
  fill="rgba(67,56,202,0.3)" />

// Higher, lighter peaks behind
<path d="M0 620 L200 500 L400 560 L600 460 L800 380 L960 340 L1120 380 L1320 460 L1520 560 L1720 500 L1920 620 L1920 1080 L0 1080Z"
  fill="rgba(99,102,241,0.2)" />

// God-ray beams (6-8 rotated rects from center-top, golden rgba)
// Central sun disc — radialGradient gold→transparent
<defs>
  <radialGradient id="heaven-sun" cx="50%" cy="15%" r="20%">
    <stop offset="0%" stopColor="rgba(255,251,230,0.9)" />
    <stop offset="40%" stopColor="rgba(251,191,36,0.5)" />
    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
  </radialGradient>
</defs>
<ellipse cx="960" cy="120" rx="400" ry="200" fill="url(#heaven-sun)" />

// 8 god-ray beams fanning from center, varying widths and rotations
<rect x="945" y="0" width="30" height="700" fill="rgba(255,223,100,0.06)" transform="rotate(-25 960 0)" />
// ... 7 more at different angles (-18, -10, -3, 3, 10, 18, 25 degrees)
```

**Layer 2 (depth: 0.2) — Temple complex:**
```tsx
// Central temple: base rectangle + triangular pediment + 6 columns
// Golden gate archway (two pillars + arch path)
// Crumbling ruins left and right (irregular rect stacks)
// Cloud banks behind temple (ellipses, white 0.2-0.4 opacity)
```

**Layer 3 (depth: 0.4) — Foreground framing:**
```tsx
// Left: tall marble column (rect with rounded top, white 0.15 opacity)
// Right: tall marble column
// Olive branch silhouettes curving from column tops (path elements, green-gold)
// Bottom: floating cloud platforms (large ellipses, white 0.3-0.5 opacity)
// Statue silhouette — Zeus with raised arm holding thunderbolt (path element)
```

**Step 2: Verify**
Run: `npx tsc --noEmit`

**Step 3: Commit**
```
feat: rewrite HeavenScene with Mount Olympus parallax layers
```

---

### Task 2: CloudDrift — Drifting Clouds

**Files:**
- Create: `src/components/scenes/CloudDrift.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Similar to SmokePlume but horizontal drift, slower, larger, lighter colors.

**Step 1: Create CloudDrift component**

```tsx
// 8-10 cloud puffs
// Interface: { x, y, size, opacity, speed, wobblePhase, wobbleSpeed }
// Movement: x += speed (0.01-0.03 vw/frame), slight y wobble via sine
// When x > 105, respawn at x = -15 with new random y/size/opacity
// Colors: white rgba(255,255,255, 0.15-0.4)
// Size: 150-400px with blur(8-15px)
// Respects prefers-reduced-motion
// Export: memo
```

**Step 2: Wire into HeavenScene**
Import and place after Layer 1, before Layer 2.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add drifting clouds to Heaven scene
```

---

### Task 3: GodRays — Animated Light Beams

**Files:**
- Create: `src/components/scenes/GodRays.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Similar to HorizonGlow — rAF with sinusoidal opacity.

**Step 1: Create GodRays component**

```tsx
// 8 rays stored as config array: { angle, width, length, baseOpacity, phaseOffset, speed }
// Each ray: opacity oscillates via sin((elapsed + phaseOffset) * speed)
// Range: baseOpacity * 0.5 to baseOpacity * 1.5
// Render: SVG with rotated rects from center-top (960, 80)
// Colors: rgba(255,223,100, dynamic_opacity)
// Blend mode: screen or normal
// Respects prefers-reduced-motion (static opacity)
// Export: memo
```

**Step 2: Wire into HeavenScene** — place as overlay after Layer 1.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add animated god-rays to Heaven scene
```

---

### Task 4: OlympusEagles — Soaring Eagles

**Files:**
- Create: `src/components/scenes/OlympusEagles.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Direct adaptation of Ravens.tsx — larger silhouettes, slower orbits, wider arcs.

**Step 1: Create OlympusEagles component**

```tsx
// 3 eagles with config: { centerX, centerY (vw/vh), radiusX, radiusY, period (20-30s), flapSpeed, startAngle }
// Orbital math same as Ravens but wider ellipses (radiusX: 15-25vw, radiusY: 5-10vh)
// SVG path: eagle shape ~60px wide, wing morphing via flapPhase
// Direction flip via scaleX based on sine of angle
// Colors: dark gold silhouette rgba(120,80,20,0.5)
// Respects prefers-reduced-motion
// Export: memo
```

**Step 2: Wire into HeavenScene** — place in Layer 2 area.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add soaring eagles to Heaven scene
```

---

### Task 5: GoldenMotes — Rising Golden Particles

**Files:**
- Create: `src/components/scenes/GoldenMotes.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Inverse of VolcanicAsh — particles float upward instead of falling down.

**Step 1: Create GoldenMotes component**

```tsx
// 40-50 particles
// Interface: { x, y, size, opacity, riseSpeed, drift, driftPhase, driftSpeed, twinklePhase }
// Movement: y -= riseSpeed (0.02-0.06), x += drift + sin(driftPhase) wobble
// Respawn at y > 105 → reset to y = 105 + random*15 (bottom)
// Colors: gold hsl(45, 100%, 70%) with twinkle (opacity modulated by sin)
// Size: 1.5-4px, no blur (sharp sparkle)
// borderRadius: 50% for dots
// Respects prefers-reduced-motion
// Export: memo
```

**Step 2: Wire into HeavenScene** — near top of overlay stack.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add rising golden motes to Heaven scene
```

---

### Task 6: LightningAmbient — Distant Sheet Lightning

**Files:**
- Create: `src/components/scenes/LightningAmbient.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Simplified VolcanoLightning — no bolt paths, just cloud-area flashes.

**Step 1: Create LightningAmbient component**

```tsx
// Random flash every 6-15 seconds
// Flash: full-width div at cloud level (top 30-50% of screen)
// Radial gradient from random x position, white-gold center
// Phase: bright (100ms) → dim (80ms) → gone
// Dispatches 'heaven-thunder' custom event for audio
// Much subtler than volcano lightning — max opacity 0.15
// Respects prefers-reduced-motion
// Export: memo
```

**Step 2: Wire into HeavenScene** — behind clouds.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add ambient sheet lightning to Heaven scene
```

---

### Task 7: DivineVignette — Cursor Light Effect

**Files:**
- Create: `src/components/scenes/DivineVignette.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Inverse of TorchVignette — bright center, edges darken to blue.

**Step 1: Create DivineVignette component**

```tsx
// Same mouse tracking as TorchVignette (target/current refs, lerp 0.1)
// Radial gradient: transparent center → soft blue-purple edge shadow
// Radius: ~400px with gentle pulse (sin-based, no random flicker)
// Edge colors: rgba(59,130,246,0.05) → rgba(30,58,138,0.3)
// Much lighter than volcano torch — heavenly scenes are bright
// Export: named function (not memo, has animation state)
```

**Step 2: Wire into HeavenScene** — outermost overlay.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add divine light vignette to Heaven scene
```

---

### Task 8: CursorDivineGlow — Golden Cursor Trail

**Files:**
- Create: `src/components/scenes/CursorDivineGlow.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Adaptation of EmberTrail — golden sparks floating upward instead of ember downward.

**Step 1: Create CursorDivineGlow component**

```tsx
// Pool of 20-25 particles
// Spawn on mousemove when speed > 2
// Velocity: slight upward drift (vy: -0.3 to -1.0), small random horizontal
// Colors: gold hsl(45-55, 100%, 60-80%)
// Size: 2-5px, shrink as they age
// Fade over ~40 frames (life += 0.025)
// No gravity (float upward, dampen slowly)
// Export: named function
```

**Step 2: Wire into HeavenScene** — top z-layer.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add golden cursor trail to Heaven scene
```

---

### Task 9: HeavenEasterEggs — Hidden Mythological Items

**Files:**
- Create: `src/components/scenes/HeavenEasterEggs.tsx`
- Modify: `src/components/scenes/HeavenScene.tsx` (add import + render)

**Pattern:** Same as VolcanoEasterEggs — reusable EasterEgg wrapper, localStorage, click animations.

**Step 1: Create HeavenEasterEggs component**

```tsx
// 4 hidden items:
// 1. Zeus's thunderbolt (~15%, 55%) — SVG zigzag bolt, crackles yellow on click
// 2. Medusa's head (~82%, 62%) — circle with snake-hair paths, eyes glow green on click
// 3. Golden apple (~45%, 78%) — circle with leaf, shimmers and floats up on click
// 4. Lyre of Apollo (~70%, 35%) — U-shape + strings, strings vibrate on click
//
// localStorage key: 'heaven-eggs-found'
// Same EasterEgg wrapper pattern as volcano (click guard, hover, scale animation)
// Base opacity: 0.06-0.1 (subtle, hidden in architecture)
// Export: named function
```

**Step 2: Wire into HeavenScene** — in Layer 3 area.

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add mythological easter eggs to Heaven scene
```

---

### Task 10: useHeavenAudio — Procedural Celestial Audio

**Files:**
- Create: `src/hooks/useHeavenAudio.ts`
- Modify: `src/App.tsx` (import hook, wire cross-fade, forward panning)

**Pattern:** Same structure as useVolcanoAudio — AudioContext, shared noise buffer, master gain, panner, intervals.

**Step 1: Create useHeavenAudio hook**

```tsx
// Returns: { started, start, stop, setMasterVolume, setPan }
//
// Sound layers:
// 1. Ethereal pad — two detuned sine oscillators (C4=261Hz, E4=329Hz) at low volume (0.02)
//    with slow vibrato LFO (0.1Hz, depth 3Hz)
// 2. Harp arpeggios — pentatonic scale [261, 294, 330, 392, 440] Hz
//    Random note every 2-5s, sine osc with quick attack (0.01s) and long decay (1.5s)
//    Occasionally play 3-note ascending sequence
// 3. Gentle wind — bandpass filtered noise (300-600Hz sweep, Q=1.5, gain 0.05)
//    Slow LFO on frequency (0.06Hz) and volume (0.08Hz)
// 4. Distant thunder — listens for 'heaven-thunder' event
//    Softer than volcano thunder: lowpass noise burst, max gain 0.8, 1.5s decay
// 5. Eagle cry — every 15-30s
//    Bandpass noise (1500-3000Hz) with fast downward frequency sweep (0.3s)
//    Low volume (0.06)
//
// Same lifecycle: start/stop/setMasterVolume/setPan callbacks
// Same cleanup: intervals array, sources array, event listener removal
```

**Step 2: Wire into App.tsx**

```tsx
// Import useHeavenAudio
// Add to cross-fade useEffect:
//   heavenAudio.setMasterVolume(currentScene === "heaven" ? vol : 0)
// Start heavenAudio alongside other audio hooks
// Forward panning when currentScene === "heaven"
```

**Step 3: Verify** — `npx tsc --noEmit`

**Step 4: Commit**
```
feat: add procedural celestial audio for Heaven scene
```

---

### Task 11: Final Integration & Polish

**Files:**
- Modify: `src/components/scenes/HeavenScene.tsx` (verify all imports and layer order)

**Step 1: Verify complete component order in HeavenScene**

From deepest to topmost:
1. Base gradient div
2. Layer 1 SVG (mountains, sun disc)
3. GodRays
4. LightningAmbient
5. CloudDrift
6. Layer 2 SVG (temple complex)
7. OlympusEagles
8. Layer 3 SVG (columns, statue, cloud platforms)
9. HeavenEasterEggs
10. GoldenMotes
11. CursorDivineGlow
12. DivineVignette

**Step 2: Build** — `npm run build`

**Step 3: Visual check** — navigate to heaven scene in browser

**Step 4: Commit**
```
feat: finalize Heaven scene integration and layer ordering
```
