'use client'

import { useEffect, useRef } from 'react'
import { useGame } from '@/context/GameContext'

export function useGameLoop() {
  const { gameState, dropSpeed, tick } = useGame()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (gameState !== 'playing') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    intervalRef.current = setInterval(tick, dropSpeed)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [gameState, dropSpeed, tick])
}
