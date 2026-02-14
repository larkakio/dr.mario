'use client'

import { useCallback } from 'react'

interface ShareButtonProps {
  className?: string
  children?: React.ReactNode
}

export function ShareButton({ className = '', children }: ShareButtonProps) {
  const handleShare = useCallback(() => {
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => {
        const url = typeof window !== 'undefined' ? window.location.href : ''
        sdk.actions.openUrl(url).catch(() => {
          if (typeof navigator !== 'undefined' && navigator.share) {
            navigator.share({ url, title: 'Dr. Mario Puzzle', text: 'Match pills, destroy viruses!' })
          } else {
            navigator.clipboard?.writeText(url)
          }
        })
      })
      .catch(() => {
        const url = typeof window !== 'undefined' ? window.location.href : ''
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({ url, title: 'Dr. Mario Puzzle', text: 'Match pills, destroy viruses!' })
        } else {
          navigator.clipboard?.writeText(url)
        }
      })
  }, [])

  return (
    <button type="button" onClick={handleShare} className={className}>
      {children ?? 'Share'}
    </button>
  )
}
