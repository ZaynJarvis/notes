# Zayn Notes

Standalone static notes site for notes.zaynjarvis.com.

## Development

```bash
npm ci
npm run dev
```

## Build

```bash
npm run build
```

The build writes a fully static site to `dist/`, including prerendered post HTML,
`sitemap.xml`, `robots.txt`, and `llms.txt`.

## Deployment

Vercel can deploy this repository directly:

- Framework preset: Vite
- Install command: `npm ci`
- Build command: `npm run build`
- Output directory: `dist`

Set `VITE_SITE_URL` to the production origin, for example:

```bash
VITE_SITE_URL=https://notes.zaynjarvis.com
```

If `VITE_SITE_URL` is omitted, the build uses the canonical notes origin:
`https://notes.zaynjarvis.com`.

## Visit Counter

On each full browser page load, the site increments the Cloud counter once and keeps the returned value in React state. Client-side route changes do not make additional counter requests.

Defaults:

- `VITE_COUNTER_API_URL=https://cloud.zaynjarvis.com/counter/api`
- `VITE_COUNTER_KEY=zayn_key`
- `VITE_COUNTER_ENABLED=true`

The Cloud service must allow the notes origin with `COUNTER_ALLOWED_ORIGINS=https://notes.zaynjarvis.com`.

## Zouk Embed

The reader chat widget defaults to:

- `VITE_ZOUK_SERVER_URL=https://zouk.zaynjarvis.com`
- `VITE_ZOUK_WORKSPACE_ID=zayn`
- `VITE_ZOUK_CHANNEL=notes`
- `VITE_ZOUK_GUEST_NAME=reader`

Override those variables only when deploying a different Zouk workspace/channel.
