import {
  COLS,
  ROWS,
  MIN_MATCH,
  type Color,
  type Rotation,
  CAPSULE_TYPES,
  VIRUS_COUNT_FORMULA,
} from './constants'

export type Cell = Color | null

export type Board = Cell[][]

export interface Virus {
  id: string
  x: number
  y: number
  color: Color
}

export interface CapsuleSegment {
  color: Color
}

export interface GameCapsule {
  x: number
  y: number
  segments: [CapsuleSegment, CapsuleSegment]
  rotation: Rotation
}

export function createEmptyBoard(): Board {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null))
}

export function randomCapsule(): GameCapsule {
  const type = CAPSULE_TYPES[Math.floor(Math.random() * CAPSULE_TYPES.length)]
  return {
    x: Math.floor(COLS / 2) - 1,
    y: 0,
    segments: [{ color: type[0] }, { color: type[1] }],
    rotation: 0,
  }
}

export function getCapsuleCells(capsule: GameCapsule): { x: number; y: number; color: Color }[] {
  const [a, b] = capsule.segments
  const cells: { x: number; y: number; color: Color }[] = []
  switch (capsule.rotation) {
    case 0:
      cells.push({ x: capsule.x, y: capsule.y, color: a.color })
      cells.push({ x: capsule.x + 1, y: capsule.y, color: b.color })
      break
    case 1:
      cells.push({ x: capsule.x, y: capsule.y, color: a.color })
      cells.push({ x: capsule.x, y: capsule.y + 1, color: b.color })
      break
    case 2:
      cells.push({ x: capsule.x, y: capsule.y, color: b.color })
      cells.push({ x: capsule.x + 1, y: capsule.y, color: a.color })
      break
    case 3:
      cells.push({ x: capsule.x, y: capsule.y, color: b.color })
      cells.push({ x: capsule.x, y: capsule.y + 1, color: a.color })
      break
  }
  return cells
}

export function placeViruses(board: Board, level: number): { board: Board; viruses: Virus[] } {
  const next = board.map((row) => [...row])
  const count = VIRUS_COUNT_FORMULA(level)
  const colors: Color[] = ['red', 'blue', 'yellow']
  const viruses: Virus[] = []
  let placed = 0
  const used = new Set<string>()
  while (placed < count) {
    const x = Math.floor(Math.random() * COLS)
    const y = Math.floor(Math.random() * ROWS)
    const key = `${x},${y}`
    if (used.has(key)) continue
    used.add(key)
    const color = colors[Math.floor(Math.random() * 3)]
    next[y][x] = color
    viruses.push({ id: `v-${x}-${y}-${placed}`, x, y, color })
    placed++
  }
  return { board: next, viruses }
}

export function canMoveLeft(capsule: GameCapsule, board: Board): boolean {
  const cells = getCapsuleCells(capsule)
  const minX = Math.min(...cells.map((c) => c.x))
  if (minX <= 0) return false
  for (const c of cells) {
    if (board[c.y]?.[c.x - 1] !== null) return false
  }
  return true
}

export function canMoveRight(capsule: GameCapsule, board: Board): boolean {
  const cells = getCapsuleCells(capsule)
  const maxX = Math.max(...cells.map((c) => c.x))
  if (maxX >= COLS - 1) return false
  for (const c of cells) {
    if (board[c.y]?.[c.x + 1] !== null) return false
  }
  return true
}

export function canMoveDown(capsule: GameCapsule, board: Board): boolean {
  const cells = getCapsuleCells(capsule)
  for (const c of cells) {
    const ny = c.y + 1
    if (ny >= ROWS) return false
    const occupied = cells.some((o) => o.x === c.x && o.y === ny)
    if (!occupied && board[ny][c.x] !== null) return false
  }
  return true
}

export function rotateCapsule(capsule: GameCapsule, board: Board): GameCapsule | null {
  const nextRotation = ((capsule.rotation + 1) % 4) as Rotation
  let candidate: GameCapsule = { ...capsule, rotation: nextRotation }
  const cells = getCapsuleCells(candidate)
  const inBounds = cells.every((c) => c.x >= 0 && c.x < COLS && c.y >= 0 && c.y < ROWS)
  const noCollision = cells.every((c) => board[c.y][c.x] === null)
  if (inBounds && noCollision) return candidate
  for (const dx of [-1, 1]) {
    candidate = { ...capsule, rotation: nextRotation, x: capsule.x + dx }
    const shiftedCells = getCapsuleCells(candidate)
    if (
      shiftedCells.every((c) => c.x >= 0 && c.x < COLS && c.y >= 0 && c.y < ROWS) &&
      shiftedCells.every((c) => board[c.y][c.x] === null)
    ) {
      return candidate
    }
  }
  return null
}

export function lockCapsuleToBoard(board: Board, capsule: GameCapsule): Board {
  const next = board.map((row) => [...row])
  for (const c of getCapsuleCells(capsule)) {
    if (c.y >= 0 && c.y < ROWS && c.x >= 0 && c.x < COLS) {
      next[c.y][c.x] = c.color
    }
  }
  return next
}

export function findMatches(board: Board): { x: number; y: number }[] {
  const matched = new Set<string>()
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const color = board[y][x]
      if (!color) continue
      let run = 1
      while (x + run < COLS && board[y][x + run] === color) run++
      if (run >= MIN_MATCH) {
        for (let i = 0; i < run; i++) matched.add(`${x + i},${y}`)
      }
      run = 1
      while (y + run < ROWS && board[y + run][x] === color) run++
      if (run >= MIN_MATCH) {
        for (let i = 0; i < run; i++) matched.add(`${x},${y + i}`)
      }
    }
  }
  return Array.from(matched).map((key) => {
    const [x, y] = key.split(',').map(Number)
    return { x, y }
  })
}

export function clearMatches(board: Board, matches: { x: number; y: number }[]): Board {
  const set = new Set(matches.map((m) => `${m.x},${m.y}`))
  return board.map((row, y) =>
    row.map((cell, x) => (set.has(`${x},${y}`) ? null : cell))
  ) as Board
}

export function applyGravity(board: Board): Board {
  const next = board.map((row) => [...row])
  for (let col = 0; col < COLS; col++) {
    let write = ROWS - 1
    for (let row = ROWS - 1; row >= 0; row--) {
      if (next[row][col] !== null) {
        if (write !== row) {
          next[write][col] = next[row][col]
          next[row][col] = null
        }
        write--
      }
    }
  }
  return next
}

export function getVirusesRemaining(board: Board, viruses: Virus[]): number {
  return viruses.filter((v) => board[v.y]?.[v.x] !== null).length
}

export function boardIsFull(board: Board): boolean {
  return board[0].some((c) => c !== null) || board[1].some((c) => c !== null)
}

export function allVirusesCleared(virusesRemaining: number): boolean {
  return virusesRemaining <= 0
}
