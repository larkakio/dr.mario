const ROOT_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-mario-teal.vercel.app'

export const minikitConfig = {
  accountAssociation: {
    header: 'eyJmaWQiOjI3ODkzMzcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHg5MkEwNjlhMzMzNzQ5OThBOEZEMzA3NzNGM0QwQTJFQjVFNDAzMUE0In0',
    payload: 'eyJkb21haW4iOiJkci1tYXJpby10ZWFsLnZlcmNlbC5hcHAifQ',
    signature: '5Hg6MzxZaOIEadEnSzFNDQS/jmupIB7R4Y4X8SSqxF53YfAW0GDhhB+tBrpRNhrD5xkbcziqXrgQ7/S1Cjs3xxs=',
  },
  miniapp: {
    version: '1',
    name: 'Dr. Mario Puzzle',
    subtitle: 'Match pills, destroy viruses',
    description: 'Classic Dr. Mario puzzle game. Match four or more same colors in a row or column to eliminate viruses.',
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
