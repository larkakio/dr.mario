'use client'

import { COLORS, type Color } from '@/lib/constants'

interface VirusProps {
  color: Color
  size?: number
  className?: string
}

export function Virus({ color, size = 1, className = '' }: VirusProps) {
  const { primary, glow } = COLORS[color]
  const s = size * 100
  return (
    <div
      className={`relative rounded-full flex items-center justify-center ${className}`}
      style={{
        width: `${s}%`,
        aspectRatio: '1',
        backgroundColor: primary,
        boxShadow: `0 0 12px ${glow}, inset 0 2px 4px rgba(255,255,255,0.3)`,
      }}
    >
      <div className="flex gap-[15%]">
        <div
          className="w-[20%] aspect-square rounded-full bg-black/80"
          style={{ boxShadow: `0 0 4px ${glow}` }}
        />
        <div
          className="w-[20%] aspect-square rounded-full bg-black/80"
          style={{ boxShadow: `0 0 4px ${glow}` }}
        />
      </div>
    </div>
  )
}
