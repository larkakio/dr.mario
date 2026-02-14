import type { Metadata, Viewport } from 'next'
import './globals.css'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-mario-teal.vercel.app'

const FC_EMBED = {
  version: '1',
  imageUrl: `${APP_URL}/hero-image.png`,
  button: {
    title: 'Play Dr. Mario',
    action: {
      type: 'launch_frame',
      name: 'Dr. Mario Puzzle',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/hero-image.png`,
      splashBackgroundColor: '#0a0e1a',
    },
  },
}

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
    'fc:miniapp': JSON.stringify(FC_EMBED),
    'fc:frame': JSON.stringify(FC_EMBED),
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
        {children}
      </body>
    </html>
  )
}
