export type SceneName = 'jungle' | 'heaven' | 'beach' | 'volcano' | 'snow'
export type Direction = 'north' | 'east' | 'south' | 'west'

export interface SceneConfig {
  label: string
  bgColor: string
}

export const SCENES: Record<SceneName, SceneConfig> = {
  jungle: { label: 'Jungle', bgColor: '#0a1f0a' },
  heaven: { label: 'Heaven', bgColor: '#c4d7f2' },
  beach: { label: 'Beach', bgColor: '#87ceeb' },
  volcano: { label: 'Volcano', bgColor: '#450a0a' },
  snow: { label: 'Snow', bgColor: '#94a3b8' },
}

// Two independent 3-scene cycles:
//   Vertical (north/south): jungle → heaven → volcano → jungle → ...
//   Horizontal (east/west): jungle → beach → snow → jungle → ...
const VERTICAL_CYCLE: SceneName[] = ['jungle', 'heaven', 'volcano']
const HORIZONTAL_CYCLE: SceneName[] = ['jungle', 'beach', 'snow']

function nextInCycle(cycle: SceneName[], current: SceneName): SceneName {
  let idx = cycle.indexOf(current)
  if (idx === -1) idx = 0 // not in this cycle → treat as jungle (idx 0)
  return cycle[(idx + 1) % cycle.length]
}

function prevInCycle(cycle: SceneName[], current: SceneName): SceneName {
  let idx = cycle.indexOf(current)
  if (idx === -1) idx = 0 // not in this cycle → treat as jungle (idx 0)
  return cycle[(idx - 1 + cycle.length) % cycle.length]
}

/** Get the target scene when navigating in a direction from a given scene. */
export function getTarget(from: SceneName, direction: Direction): SceneName {
  switch (direction) {
    case 'north':
      return nextInCycle(VERTICAL_CYCLE, from)
    case 'south':
      return prevInCycle(VERTICAL_CYCLE, from)
    case 'east':
      return nextInCycle(HORIZONTAL_CYCLE, from)
    case 'west':
      return prevInCycle(HORIZONTAL_CYCLE, from)
  }
}

/** Get the label for each direction arrow from a given scene. */
export function getDirectionLabels(from: SceneName): Record<Direction, string> {
  return {
    north: SCENES[getTarget(from, 'north')].label,
    east: SCENES[getTarget(from, 'east')].label,
    south: SCENES[getTarget(from, 'south')].label,
    west: SCENES[getTarget(from, 'west')].label,
  }
}
