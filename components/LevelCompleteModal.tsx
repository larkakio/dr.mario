'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/context/GameContext'

export function LevelCompleteModal() {
  const { gameState, level, continueToNextLevel } = useGame()

  if (gameState !== 'levelComplete') return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-[#00c896]/40"
          style={{
            background: 'linear-gradient(180deg, #0f1a14 0%, #0a0f0e 100%)',
            boxShadow: '0 0 40px rgba(0,200,150,0.2)',
          }}
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <h2 className="text-2xl font-bold text-[#00ffb4] mb-2">Level Complete!</h2>
          <p className="text-[#b4d4e8] text-sm mb-6">All viruses eliminated. Ready for the next level?</p>
          <button
            onClick={continueToNextLevel}
            className="w-full py-3 px-4 rounded-xl font-semibold text-[#0a0e1a] bg-[#00c896] hover:bg-[#00ffb4] transition-colors min-h-[44px]"
          >
            Level {level + 2} →
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
