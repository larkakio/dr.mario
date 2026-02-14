export const COLS = 8
export const ROWS = 16

export type Color = 'red' | 'blue' | 'yellow'

export const COLORS: Record<Color, { primary: string; glow: string }> = {
  red: { primary: '#ff3250', glow: '#ff6680' },
  blue: { primary: '#5096ff', glow: '#80b4ff' },
  yellow: { primary: '#ffdc32', glow: '#ffe066' },
}

export const CAPSULE_TYPES: [Color, Color][] = [
  ['red', 'red'],
  ['blue', 'blue'],
  ['yellow', 'yellow'],
  ['red', 'blue'],
  ['red', 'yellow'],
  ['blue', 'yellow'],
]

export const MIN_MATCH = 4

export const VIRUS_COUNT_FORMULA = (level: number) => Math.min(84, level * 4 + 4)

export const INITIAL_DROP_MS = 1000
export const DROP_SPEED_INTERVAL = 10 // every N capsules, speed up
export const DROP_SPEED_DECREASE = 50 // ms faster per interval

export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'

export type Rotation = 0 | 1 | 2 | 3 // 0=horizontal left-right, 1=top-bottom, 2=horizontal right-left, 3=bottom-top
