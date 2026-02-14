import { NextResponse } from 'next/server'
import { minikitConfig } from '@/minikit.config'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dr-mario-teal.vercel.app'
  const manifest = {
    accountAssociation: minikitConfig.accountAssociation.header
      ? minikitConfig.accountAssociation
      : { header: '', payload: '', signature: '' },
    miniapp: {
      version: minikitConfig.miniapp.version,
      name: minikitConfig.miniapp.name,
      homeUrl: minikitConfig.miniapp.homeUrl,
      iconUrl: minikitConfig.miniapp.iconUrl,
      imageUrl: minikitConfig.miniapp.heroImageUrl,
      buttonTitle: 'Play Now',
      splashImageUrl: minikitConfig.miniapp.splashImageUrl,
      splashBackgroundColor: minikitConfig.miniapp.splashBackgroundColor,
      webhookUrl: minikitConfig.miniapp.webhookUrl,
      subtitle: minikitConfig.miniapp.subtitle,
      description: minikitConfig.miniapp.description,
      screenshotUrls: minikitConfig.miniapp.screenshotUrls,
      primaryCategory: minikitConfig.miniapp.primaryCategory,
      tags: minikitConfig.miniapp.tags,
      requiredChains: ['eip155:8453'],
    },
  }
  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
