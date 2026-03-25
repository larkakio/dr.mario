import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Providers } from './providers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-mario-teal.vercel.app'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0a0e1a',
}

export const metadata: Metadata = {
  title: 'Dr. Mario - Puzzle Mini App',
  description: 'Match pills, destroy viruses. Classic Dr. Mario puzzle game on Base.',
  openGraph: {
    title: 'Dr. Mario - Puzzle Mini App',
    description: 'Match pills, destroy viruses. Classic puzzle game.',
    images: [{ url: `${APP_URL}/hero-image.png`, width: 1200, height: 630 }],
  },
  other: {
    'base:app_id': '6990a227e0d5d2cf831b5bfb',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#0a0e1a] text-[#e0f2ff]">
      <body className="antialiased min-h-screen overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
