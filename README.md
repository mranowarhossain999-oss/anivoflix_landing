# AnivoFlix Landing Page

Static landing page, ready for Cloudflare (Pages or Workers Static Assets).

## Structure
- `public/` — the actual website (this is what gets deployed)
- `wrangler.jsonc` — Cloudflare Workers config (only needed for the Workers method)

## Deploy on Cloudflare Pages (recommended)
Workers & Pages → Create → Pages → Connect to Git → select this repo.
- Framework preset: None
- Build command: (leave empty)
- Build output directory: `public`

## Deploy on Cloudflare Workers (Git integration)
Workers & Pages → Create → Import a repository → select this repo.
- Build command: (leave empty)
- Deploy command: `npx wrangler deploy`

## Notes
- Unknown URLs show `404.html`, which redirects to `/`.
- `/admin` and `/login` are the admin pages (noindex).
