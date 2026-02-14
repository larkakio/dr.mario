# Dr. Mario – Mini App for Base & Farcaster

Classic Dr. Mario–style puzzle game as a mobile-first mini app for [Base](https://base.org) and [Farcaster](https://farcaster.xyz).

## Features

- **Gameplay**: 8×16 grid, viruses (red/blue/yellow), two-segment capsules. Match 4+ same color in a row or column to clear. Win by clearing all viruses; lose if the bottle fills.
- **Controls**: Swipe left/right to move, swipe down for soft drop, tap or swipe up to rotate. Keyboard arrows work on desktop.
- **Levels**: Choose starting level 0–20 (virus count = level×4 + 4, max 84).
- **Design**: Dark neon style (#0a0e1a background, cyan/red/yellow/blue accents).
- **Base/Farcaster**: Embed metadata (fc:miniapp = fc:frame, version `"1"`, `launch_frame`), `sdk.actions.ready()`, webhook, manifest at `/.well-known/farcaster.json`.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local: NEXT_PUBLIC_APP_URL=https://dr-mario-teal.vercel.app (or http://localhost:3000 for local)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com).
2. Set **Environment Variable**: `NEXT_PUBLIC_APP_URL` = `https://dr-mario-teal.vercel.app`.
3. Deploy. Turn off **Deployment Protection** (Vercel Auth) if you use the Base account association tool.
4. **Account association** (Base): Go to [Base Build – Account association](https://www.base.dev/preview?tab=account), enter your app URL, verify, then copy the `accountAssociation` object into `minikit.config.ts` and redeploy.
5. **Verify**: [Base Preview](https://base.dev/preview) and Farcaster embed/preview tools.

## Assets

- **Icon**: `public/icon.png` – solid dark background (#0a0e1a), no white corners. Base recommends 1024×1024 PNG, no transparency.
- **Hero**: `public/hero-image.png` – 1200×630 (1.91:1) for Farcaster embed. Same dark background to the edges.

## Project structure

- `app/` – layout (metadata, viewport), page, globals.css, api/webhook, .well-known/farcaster.json route
- `components/` – FarcasterReady, GameBoard, Capsule, Virus, GameUI, GameControls, StartMenu, GameOverModal, LevelCompleteModal, ShareButton
- `context/` – GameContext (state + actions)
- `hooks/` – useSwipeGesture, useGameLoop
- `lib/` – constants, gameLogic
- `minikit.config.ts` – Base mini app manifest config (accountAssociation + miniapp fields)

## Links

- [Base Mini Apps Quickstart](https://docs.base.org/mini-apps/quickstart/create-new-miniapp)
- [Base Featured Guidelines](https://docs.base.org/mini-apps/featured-guidelines/overview)
- Farcaster: [Embed](https://warpcast.com/~/developers/embeds) / [Mini Apps](https://docs.farcaster.xyz/developers/mini-apps)
