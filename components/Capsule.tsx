'use client'

import { motion } from 'framer-motion'
import { COLORS } from '@/lib/constants'
import { getCapsuleCells, type GameCapsule } from '@/lib/gameLogic'

interface CapsuleProps {
  capsule: GameCapsule
  cellSize: number
  offsetX?: number
  offsetY?: number
  animated?: boolean
}

export function Capsule({ capsule, cellSize, offsetX = 0, offsetY = 0, animated = true }: CapsuleProps) {
  const cells = getCapsuleCells(capsule)
  const gap = 2

  return (
    <>
      {cells.map((c, i) => {
        const { primary, glow } = COLORS[c.color]
        const x = offsetX + c.x * cellSize
        const y = offsetY + c.y * cellSize
        const content = (
          <div
            key={i}
            className="absolute rounded-lg flex items-center justify-center"
            style={{
              left: x + gap,
              top: y + gap,
              width: cellSize - gap * 2,
              height: cellSize - gap * 2,
              backgroundColor: primary,
              boxShadow: `0 0 10px ${glow}, inset 0 2px 6px rgba(255,255,255,0.35)`,
            }}
          />
        )
        return animated ? (
          <motion.div
            key={i}
            initial={false}
            animate={{ x: 0, y: 0 }}
            transition={{ type: 'tween', duration: 0.1 }}
            className="absolute"
            style={{ left: 0, top: 0 }}
          >
            {content}
          </motion.div>
        ) : (
          <div key={i} className="absolute" style={{ left: 0, top: 0 }}>
            {content}
          </div>
        )
      })}
    </>
  )
}
