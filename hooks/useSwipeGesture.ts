'use client'

import { useCallback, useRef } from 'react'

const MIN_SWIPE_DIST = 50
const MAX_TAP_DIST = 15
const MAX_TAP_MS = 200

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | 'tap'

export interface SwipeHandlers {
  onSwipe: (direction: SwipeDirection) => void
}

export function useSwipeGesture(onSwipe: (direction: SwipeDirection) => void) {
  const start = useRef<{ x: number; y: number; t: number } | null>(null)

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      start.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        t: Date.now(),
      }
    },
    []
  )

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!start.current) return
      const end = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
        t: Date.now(),
      }
      const dx = end.x - start.current.x
      const dy = end.y - start.current.y
      const dt = end.t - start.current.t

      if (Math.abs(dx) < MAX_TAP_DIST && Math.abs(dy) < MAX_TAP_DIST && dt < MAX_TAP_MS) {
        onSwipe('tap')
        start.current = null
        return
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        if (Math.abs(dx) > MIN_SWIPE_DIST) {
          onSwipe(dx > 0 ? 'right' : 'left')
        }
      } else {
        if (Math.abs(dy) > MIN_SWIPE_DIST) {
          onSwipe(dy > 0 ? 'down' : 'up')
        }
      }
      start.current = null
    },
    [onSwipe]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          onSwipe('left')
          break
        case 'ArrowRight':
          e.preventDefault()
          onSwipe('right')
          break
        case 'ArrowDown':
          e.preventDefault()
          onSwipe('down')
          break
        case 'ArrowUp':
        case ' ':
          e.preventDefault()
          onSwipe('up')
          break
      }
    },
    [onSwipe]
  )

  return { handleTouchStart, handleTouchEnd, handleKeyDown }
}
