'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { COLORS, COLS, ROWS } from '@/lib/constants'
import { useGame } from '@/context/GameContext'
import { Capsule } from './Capsule'

const BOTTLE_PADDING = 8
const GRID_GAP = 2

export function GameBoard() {
  const { board, currentCapsule, gameState } = useGame()

  const { cellSize, boardWidth, boardHeight, offsetX, offsetY } = useMemo(() => {
    const maxW = typeof window !== 'undefined' ? Math.min(window.innerWidth - 32, 320) : 280
    const maxH = typeof window !== 'undefined' ? Math.min(window.innerHeight * 0.5, 520) : 400
    const cellW = (maxW - BOTTLE_PADDING * 2) / COLS
    const cellH = (maxH - BOTTLE_PADDING * 2) / ROWS
    const cellSize = Math.min(cellW, cellH, 28)
    const boardWidth = COLS * cellSize + BOTTLE_PADDING * 2
    const boardHeight = ROWS * cellSize + BOTTLE_PADDING * 2
    const offsetX = BOTTLE_PADDING
    const offsetY = BOTTLE_PADDING
    return { cellSize, boardWidth, boardHeight, offsetX, offsetY }
  }, [])

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden"
      style={{
        width: boardWidth,
        height: boardHeight,
        background: 'linear-gradient(180deg, rgba(15,25,40,0.95) 0%, rgba(10,14,26,0.98) 100%)',
        border: '2px solid rgba(0,220,255,0.4)',
        boxShadow: '0 0 24px rgba(0,220,255,0.15), inset 0 0 60px rgba(0,0,0,0.4)',
      }}
      initial={false}
      animate={{
        scale: gameState === 'gameOver' ? 1.02 : 1,
        boxShadow:
          gameState === 'gameOver'
            ? '0 0 32px rgba(255,50,80,0.3), inset 0 0 60px rgba(0,0,0,0.4)'
            : '0 0 24px rgba(0,220,255,0.15), inset 0 0 60px rgba(0,0,0,0.4)',
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,220,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,220,255,0.12) 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundPosition: `${offsetX}px ${offsetY}px`,
        }}
      />

      {/* Board cells */}
      <div className="absolute" style={{ left: offsetX, top: offsetY, width: COLS * cellSize, height: ROWS * cellSize }}>
        {board.map((row, y) =>
          row.map((cell, x) =>
            cell ? (
              <div
                key={`${x}-${y}`}
                className="absolute rounded-lg"
                style={{
                  left: x * cellSize + GRID_GAP,
                  top: y * cellSize + GRID_GAP,
                  width: cellSize - GRID_GAP * 2,
                  height: cellSize - GRID_GAP * 2,
                  backgroundColor: COLORS[cell].primary,
                  boxShadow: `0 0 8px ${COLORS[cell].glow}`,
                }}
              />
            ) : null
          )
        )}
      </div>

      {/* Current falling capsule */}
      {gameState === 'playing' && currentCapsule && (
        <div
          className="absolute pointer-events-none"
          style={{ left: offsetX, top: offsetY, width: COLS * cellSize, height: ROWS * cellSize }}
        >
          <Capsule capsule={currentCapsule} cellSize={cellSize} animated />
        </div>
      )}
    </motion.div>
  )
}
