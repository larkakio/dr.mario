'use client'

import { useCallback } from 'react'
import { FarcasterReady } from '@/components/FarcasterReady'
import { GameProvider, useGame } from '@/context/GameContext'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'
import { GameBoard } from '@/components/GameBoard'
import { GameUI } from '@/components/GameUI'
import { StartMenu } from '@/components/StartMenu'
import { GameOverModal } from '@/components/GameOverModal'
import { LevelCompleteModal } from '@/components/LevelCompleteModal'

function GameScreen() {
  const { gameState, moveLeft, moveRight, rotate, softDrop } = useGame()
  useGameLoop()

  const onSwipe = useCallback(
    (direction: string) => {
      if (gameState !== 'playing') return
      switch (direction) {
        case 'left':
          moveLeft()
          break
        case 'right':
          moveRight()
          break
        case 'down':
          softDrop()
          break
        case 'up':
        case 'tap':
          rotate()
          break
      }
    },
    [gameState, moveLeft, moveRight, rotate, softDrop]
  )

  const { handleTouchStart, handleTouchEnd, handleKeyDown } = useSwipeGesture(onSwipe)

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#0a0e1a] text-[#e0f2ff] overflow-hidden">
      <FarcasterReady />
      <StartMenu />
      {gameState !== 'menu' && (
        <>
          <GameUI />
          <div
            className="flex-1 flex items-center justify-center py-4 px-2 w-full min-h-0 touch-none focus:outline-none"
            tabIndex={0}
            role="application"
            aria-label="Game board — swipe to move and rotate"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onKeyDown={handleKeyDown}
          >
            <GameBoard />
          </div>
        </>
      )}
      <GameOverModal />
      <LevelCompleteModal />
    </div>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  )
}
