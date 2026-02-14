'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import {
  INITIAL_DROP_MS,
  DROP_SPEED_INTERVAL,
  DROP_SPEED_DECREASE,
  type GameState,
  type Rotation,
} from '@/lib/constants'
import {
  createEmptyBoard,
  randomCapsule,
  placeViruses,
  getCapsuleCells,
  canMoveLeft,
  canMoveRight,
  canMoveDown,
  rotateCapsule,
  lockCapsuleToBoard,
  findMatches,
  clearMatches,
  applyGravity,
  getVirusesRemaining,
  boardIsFull,
  type Board,
  type Virus,
  type GameCapsule,
} from '@/lib/gameLogic'

interface GameContextValue {
  board: Board
  viruses: Virus[]
  currentCapsule: GameCapsule | null
  nextCapsule: GameCapsule | null
  score: number
  level: number
  virusesRemaining: number
  gameState: GameState
  dropSpeed: number
  dropCount: number
  startLevel: number
  startGame: (level: number) => void
  moveLeft: () => void
  moveRight: () => void
  moveDown: () => void
  rotate: () => void
  softDrop: () => void
  tick: () => void
  resetToMenu: () => void
  continueToNextLevel: () => void
}

const initialCapsule = randomCapsule()

function gameReducer(
  state: {
    board: Board
    viruses: Virus[]
    currentCapsule: GameCapsule | null
    nextCapsule: GameCapsule | null
    score: number
    level: number
    dropSpeed: number
    dropCount: number
    gameState: GameState
  },
  action:
    | { type: 'START'; payload: { level: number } }
    | { type: 'MOVE_LEFT' }
    | { type: 'MOVE_RIGHT' }
    | { type: 'MOVE_DOWN' }
    | { type: 'ROTATE'; payload: GameCapsule | null }
    | { type: 'LOCK'; payload: { board: Board; next: GameCapsule; nextNext: GameCapsule } }
    | { type: 'CLEAR_AND_FALL'; payload: Board }
    | { type: 'LEVEL_COMPLETE' }
    | { type: 'GAME_OVER' }
    | { type: 'NEXT_LEVEL'; payload: { level: number } }
    | { type: 'RESET' }
): typeof state {
  switch (action.type) {
    case 'START': {
      const empty = createEmptyBoard()
      const { board, viruses } = placeViruses(empty, action.payload.level)
      const next = randomCapsule()
      const nextNext = randomCapsule()
      return {
        board,
        viruses,
        currentCapsule: next,
        nextCapsule: nextNext,
        score: 0,
        level: action.payload.level,
        dropSpeed: INITIAL_DROP_MS,
        dropCount: 0,
        gameState: 'playing',
      }
    }
    case 'MOVE_LEFT':
      if (state.gameState !== 'playing' || !state.currentCapsule || !canMoveLeft(state.currentCapsule, state.board))
        return state
      return {
        ...state,
        currentCapsule: { ...state.currentCapsule, x: state.currentCapsule.x - 1 },
      }
    case 'MOVE_RIGHT':
      if (state.gameState !== 'playing' || !state.currentCapsule || !canMoveRight(state.currentCapsule, state.board))
        return state
      return {
        ...state,
        currentCapsule: { ...state.currentCapsule, x: state.currentCapsule.x + 1 },
      }
    case 'MOVE_DOWN':
      if (state.gameState !== 'playing' || !state.currentCapsule || !canMoveDown(state.currentCapsule, state.board))
        return state
      return {
        ...state,
        currentCapsule: { ...state.currentCapsule, y: state.currentCapsule.y + 1 },
      }
    case 'ROTATE':
      if (state.gameState !== 'playing' || !action.payload) return state
      return { ...state, currentCapsule: action.payload }
    case 'LOCK': {
      const { board, next, nextNext } = action.payload
      let b = board
      let dropCount = state.dropCount + 1
      let dropSpeed = state.dropSpeed
      if (dropCount > 0 && dropCount % DROP_SPEED_INTERVAL === 0) {
        dropSpeed = Math.max(100, state.dropSpeed - DROP_SPEED_DECREASE)
      }
      let matches = findMatches(b)
      while (matches.length > 0) {
        b = clearMatches(b, matches)
        b = applyGravity(b)
        matches = findMatches(b)
      }
      const virusesRemaining = getVirusesRemaining(b, state.viruses)
      const gameOver = boardIsFull(b)
      const levelComplete = virusesRemaining <= 0
      return {
        ...state,
        board: b,
        currentCapsule: next,
        nextCapsule: nextNext,
        dropCount,
        dropSpeed,
        gameState: gameOver ? 'gameOver' : levelComplete ? 'levelComplete' : 'playing',
      }
    }
    case 'LEVEL_COMPLETE':
      return { ...state, gameState: 'levelComplete' }
    case 'GAME_OVER':
      return { ...state, gameState: 'gameOver' }
    case 'NEXT_LEVEL': {
      const empty = createEmptyBoard()
      const { board, viruses } = placeViruses(empty, action.payload.level)
      const next = randomCapsule()
      const nextNext = randomCapsule()
      return {
        ...state,
        board,
        viruses,
        currentCapsule: next,
        nextCapsule: nextNext,
        level: action.payload.level,
        gameState: 'playing',
      }
    }
    case 'RESET':
      return {
        board: createEmptyBoard(),
        viruses: [],
        currentCapsule: null,
        nextCapsule: null,
        score: 0,
        level: 0,
        dropSpeed: INITIAL_DROP_MS,
        dropCount: 0,
        gameState: 'menu',
      }
    default:
      return state
  }
}

const GameContext = createContext<GameContextValue | null>(null)

const initialState = {
  board: createEmptyBoard(),
  viruses: [],
  currentCapsule: null as GameCapsule | null,
  nextCapsule: null as GameCapsule | null,
  score: 0,
  level: 0,
  dropSpeed: INITIAL_DROP_MS,
  dropCount: 0,
  gameState: 'menu' as GameState,
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [startLevel, setStartLevel] = useState(0)

  const virusesRemaining =
    state.gameState === 'playing' || state.gameState === 'levelComplete' || state.gameState === 'gameOver'
      ? getVirusesRemaining(state.board, state.viruses)
      : 0

  const startGame = useCallback((level: number) => {
    setStartLevel(level)
    dispatch({ type: 'START', payload: { level } })
  }, [])

  const moveLeft = useCallback(() => dispatch({ type: 'MOVE_LEFT' }), [])
  const moveRight = useCallback(() => dispatch({ type: 'MOVE_RIGHT' }), [])
  const moveDown = useCallback(() => dispatch({ type: 'MOVE_DOWN' }), [])

  const rotate = useCallback(() => {
    if (state.gameState !== 'playing' || !state.currentCapsule) return
    const next = rotateCapsule(state.currentCapsule, state.board)
    if (next) dispatch({ type: 'ROTATE', payload: next })
  }, [state.gameState, state.currentCapsule, state.board])

  const softDrop = useCallback(() => {
    if (state.gameState !== 'playing' || !state.currentCapsule) return
    if (canMoveDown(state.currentCapsule, state.board)) {
      dispatch({ type: 'MOVE_DOWN' })
    }
  }, [state.gameState, state.currentCapsule, state.board])

  const tick = useCallback(() => {
    if (state.gameState !== 'playing' || !state.currentCapsule) return
    if (canMoveDown(state.currentCapsule, state.board)) {
      dispatch({ type: 'MOVE_DOWN' })
      return
    }
    const board = lockCapsuleToBoard(state.board, state.currentCapsule)
    const next = state.nextCapsule ?? randomCapsule()
    const nextNext = randomCapsule()
    dispatch({ type: 'LOCK', payload: { board, next, nextNext } })
  }, [state.gameState, state.currentCapsule, state.board, state.nextCapsule])

  const resetToMenu = useCallback(() => dispatch({ type: 'RESET' }), [])
  const continueToNextLevel = useCallback(() => {
    dispatch({ type: 'NEXT_LEVEL', payload: { level: state.level + 1 } })
  }, [state.level])

  const value: GameContextValue = {
    board: state.board,
    viruses: state.viruses,
    currentCapsule: state.currentCapsule,
    nextCapsule: state.nextCapsule,
    score: state.score,
    level: state.level,
    virusesRemaining,
    gameState: state.gameState,
    dropSpeed: state.dropSpeed,
    dropCount: state.dropCount,
    startLevel,
    startGame,
    moveLeft,
    moveRight,
    moveDown,
    rotate,
    softDrop,
    tick,
    resetToMenu,
    continueToNextLevel,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within GameProvider')
  return ctx
}
