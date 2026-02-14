'use client'

import { motion } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { useState } from 'react'

const MAX_LEVEL = 20

export function StartMenu() {
  const { startGame, gameState } = useGame()
  const [level, setLevel] = useState(0)

  if (gameState !== 'menu') return null

  const virusCount = Math.min(84, level * 4 + 4)

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-[#0a0e1a]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff3250] via-[#00dcff] to-[#ffdc32] mb-2"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Dr. Mario
      </motion.h1>
      <motion.p
        className="text-[#8bacc8] text-sm mb-8 text-center max-w-[280px]"
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Match 4+ same colors in a row or column to eliminate viruses. Swipe to move and rotate.
      </motion.p>

      <motion.div
        className="w-full max-w-[280px] mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-[#8bacc8] text-xs uppercase tracking-wider mb-2">Starting Level (0–20)</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={0}
            max={MAX_LEVEL}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="flex-1 h-3 rounded-full appearance-none bg-[#1a1e2e] accent-[#00c896]"
          />
          <span className="text-[#e0f2ff] font-bold w-8 tabular-nums">{level}</span>
        </div>
        <p className="text-[#8bacc8] text-xs mt-1">Viruses: {virusCount}</p>
      </motion.div>

      <motion.button
        onClick={() => startGame(level)}
        className="w-full max-w-[280px] py-4 px-6 rounded-xl font-bold text-lg text-[#0a0e1a] bg-[#00c896] hover:bg-[#00ffb4] transition-colors shadow-lg shadow-[#00c896]/20 min-h-[48px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.98 }}
      >
        Play
      </motion.button>
    </motion.div>
  )
}
