'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/context/GameContext'
import { ShareButton } from './ShareButton'

export function GameOverModal() {
  const { gameState, level, score, resetToMenu } = useGame()

  if (gameState !== 'gameOver') return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.target === e.currentTarget && resetToMenu()}
      >
        <motion.div
          className="rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl border border-[#ff3250]/40"
          style={{
            background: 'linear-gradient(180deg, #1a0f14 0%, #0f0a0e 100%)',
            boxShadow: '0 0 40px rgba(255,50,80,0.2)',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-[#ff6680] mb-2">Game Over</h2>
          <p className="text-[#b4d4e8] text-sm mb-4">The bottle is full. Clear viruses before they stack up!</p>
          <p className="text-[#e0f2ff] text-lg font-semibold mb-1">Level {level + 1}</p>
          <p className="text-[#8bacc8] text-sm mb-6">Score: {score}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={resetToMenu}
              className="w-full py-3 px-4 rounded-xl font-semibold text-[#0a0e1a] bg-[#00c896] hover:bg-[#00ffb4] transition-colors min-h-[44px]"
            >
              Play Again
            </button>
            <ShareButton className="w-full py-3 px-4 rounded-xl font-semibold text-[#e0f2ff] border border-[#00dcff]/50 hover:bg-[#00dcff]/10 transition-colors min-h-[44px]" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
