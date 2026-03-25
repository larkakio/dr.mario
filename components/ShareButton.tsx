'use client'

import { useCallback } from 'react'

interface ShareButtonProps {
  className?: string
  children?: React.ReactNode
}

export function ShareButton({ className = '', children }: ShareButtonProps) {
  const handleShare = useCallback(() => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({ url, title: 'Dr. Mario Puzzle', text: 'Match pills, destroy viruses!' })
        .catch(() => {
          window.open(url, '_blank', 'noopener,noreferrer')
        })
    } else {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  return (
    <button type="button" onClick={handleShare} className={className}>
      {children ?? 'Share'}
    </button>
  )
}
