# MeetingBuddyAI Marketing Page

Privacy-first marketing website for **MeetingBuddyAI** — local AI meeting intelligence that runs on your infrastructure.

Built by **Apex Cognition LLP** (Founders: Sujay & Shreyas Aditya).

## Live site sections

- Hero with beta availability messaging
- Problem statement & complete 7-step workflow
- Who it's for, use cases, why local AI
- Expected outcomes & platform features
- Privacy comparison table & product screenshots
- Demo video with bot voiceover and captions
- Interactive Try Demo workflow simulator
- Roadmap, FAQ, beta requirements
- Beta access form with waitlist count
- Founder story & final CTA

## Admin (beta signups)

Protected dashboard at `/admin/beta` to view registrations, counts, OS breakdown, and export CSV.

## Getting started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `BETA_ADMIN_SECRET` | Yes (for admin) | Password for `/admin/beta` |
| `BETA_NOTIFY_WEBHOOK` | No | Webhook URL for signup alerts (Discord, Slack, etc.) |

### Development

```bash
npm run dev
```

`npm run dev` automatically clears the `.next` cache and stops stuck processes on ports 3000–3003 before starting.

Open [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm start
```

## Demo video assets

The demo video and voiceover are stored in `public/`:

- `final-review-video.mp4` — main demo video (with bot narration)
- `demo-captions.vtt` — English captions
- `screenshots/` — product UI screenshots

To regenerate voiceover and captions:

```bash
pip install edge-tts
python scripts/generate-demo-voiceover.py
```

Requires `ffmpeg` and `public/final-review-video.original.mp4` as the source.

## Beta registrations

Signups are stored in `data/beta-registrations.json` (gitignored — contains PII). Back up this file on your server.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Reset cache + start dev server |
| `npm run dev:clean` | Same as `dev` |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run clean` | Delete `.next` cache only |

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- TypeScript

## Repository

https://github.com/CSUJAY/marketing-page
