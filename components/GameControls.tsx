'use client'

import { useGame } from '@/context/GameContext'
import { useSwipeGesture } from '@/hooks/useSwipeGesture'

export function GameControls() {
  const { moveLeft, moveRight, rotate, softDrop, gameState } = useGame()

  const onSwipe = (direction: string) => {
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
  }

  const { handleTouchStart, handleTouchEnd, handleKeyDown } = useSwipeGesture(onSwipe)

  return (
    <div
      className="flex-1 min-h-[120px] w-full touch-none focus:outline-none"
      tabIndex={0}
      role="button"
      aria-label="Game controls: swipe or use arrow keys"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      style={{ minHeight: '44px' }}
    />
  )
}
