'use client'

import { useGame } from '@/context/GameContext'
import { Capsule } from './Capsule'

export function GameUI() {
  const { score, level, virusesRemaining, nextCapsule, gameState } = useGame()

  return (
    <header className="flex items-center justify-between w-full max-w-[320px] px-2 py-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-[#8bacc8] text-xs uppercase tracking-wider">Score</span>
        <span className="text-[#e0f2ff] font-bold text-lg tabular-nums">{score}</span>
      </div>
      <div className="flex flex-col gap-0.5 items-center">
        <span className="text-[#8bacc8] text-xs uppercase tracking-wider">Level</span>
        <span className="text-[#00c896] font-bold text-lg">{level + 1}</span>
      </div>
      <div className="flex flex-col gap-0.5 items-end">
        <span className="text-[#8bacc8] text-xs uppercase tracking-wider">Viruses</span>
        <span className="text-[#ff6680] font-bold text-lg tabular-nums">{virusesRemaining}</span>
      </div>
      {gameState === 'playing' && nextCapsule && (
        <div className="absolute right-4 top-16 flex flex-col items-center gap-1">
          <span className="text-[#8bacc8] text-[10px] uppercase">Next</span>
          <div className="relative w-12 h-12 rounded-lg bg-[#0f1928]/80 border border-[#00dcff]/30 p-1">
            <Capsule capsule={nextCapsule} cellSize={20} offsetX={4} offsetY={4} animated={false} />
          </div>
        </div>
      )}
    </header>
  )
}
