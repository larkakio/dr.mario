const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'

export const minikitConfig = {
  accountAssociation: {
    header: '',
    payload: '',
    signature: '',
  },
  miniapp: {
    version: '1',
    name: 'Dr. Mario Puzzle',
    subtitle: 'Match pills, destroy viruses',
    description: 'Classic Dr. Mario puzzle game. Match 4+ same colors in a row or column to eliminate viruses.',
    screenshotUrls: [`${ROOT_URL}/hero-image.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/hero-image.png`,
    splashBackgroundColor: '#0a0e1a',
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: 'games',
    tags: ['puzzle', 'retro', 'arcade', 'miniapp'],
    heroImageUrl: `${ROOT_URL}/hero-image.png`,
    tagline: 'Match pills, destroy viruses',
    ogTitle: 'Dr. Mario - Puzzle Mini App',
    ogDescription: 'Classic Dr. Mario puzzle game on Base.',
    ogImageUrl: `${ROOT_URL}/hero-image.png`,
  },
} as const
