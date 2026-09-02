# isaacsolomon.dev

Personal site — portfolio, case studies and photography. SvelteKit, prerendered to static
files, served from Cloudflare Pages.

```bash
npm install
npm run dev
```

## Stack

| | |
| --- | --- |
| Framework | SvelteKit 2 · Svelte 5 (runes forced on, see `vite.config.ts`) |
| Styling | Tailwind CSS 4, tokens in [`src/app.css`](src/app.css) |
| Motion | GSAP, Lenis, plus a small `reveal` action and view-transition morphs |
| Type | Space Grotesk Variable, Instrument Serif |
| Host | Cloudflare Pages, deployed from `master` via the GitHub integration |

The palette splits deliberately: `paper` / `paper-2` / `ink` / `dim` / `line` are **semantic**
and flip in dark mode, while `cream` / `coal` / `accent` are **absolute** and render identically
in both themes — use those for always-dark surfaces like the contact section.

## Editing content

Almost everything is data. [`src/lib/content.ts`](src/lib/content.ts) is the single edit point
for the profile, services, projects, writing index, testimonials, work history, photos and
contact details — components only render what it exports, and `/llms.txt`, `/sitemap.xml` and
most MCP tools read from it too.

The exception is long-form prose. Each case study is hand-written markup in
`src/routes/writing/<slug>/+page.svelte`; the writing index entry in `content.ts` carries only
its title, summary and metadata.

## Routes

| Path | |
| --- | --- |
| `/` | Home — hero, about, services, projects, experience, writing, contact |
| `/photography` | Photo archive |
| `/writing` | Index of case studies and essays |
| `/writing/<slug>` | 8 articles, including nested ones under `saut/` |
| `/sitemap.xml` | Generated from `content.ts` |
| `/llms.txt` | Site index for agents ([llmstxt.org](https://llmstxt.org)) |
| `/<any-page>.md` | Markdown twin of every page, emitted at build time |
| `/mcp` | MCP server — see [`src/routes/mcp/README.md`](src/routes/mcp/README.md) |

## Scripts

| | |
| --- | --- |
| `npm run dev` | Vite dev server. `/mcp` article tools degrade here — no `ASSETS` binding |
| `npm run build` | `vite build`, then `scripts/generate-markdown.mjs` |
| `npm run preview` | Preview the Vite build |
| `npm run check` | `svelte-check` |
| `npm run deploy` | Build and push to Cloudflare directly (normally unnecessary — pushing to `master` deploys) |

To exercise the Worker locally, use Wrangler rather than `npm run dev`:

```bash
npm run build && npx wrangler pages dev
```

## Build notes

The site is **static except for `/mcp`**. `vite.config.ts` scopes the Worker to that one path:

```js
adapter({ fallback: 'spa', routes: { include: ['/mcp'], exclude: [] } })
```

so every page is prerendered and CDN-served, and only `/mcp` costs a Worker invocation.
`wrangler.toml` needs no changes — the adapter reads `pages_build_output_dir`.

Two things that will bite if you move them:

- **`_headers` must live at the repo root**, not in `static/`. `adapter-cloudflare` hard-errors
  otherwise. It carries caching, security headers, and the RFC 8288 `Link` headers pointing
  agents at `/llms.txt` and `/mcp`.
- **`npm run build` chains the markdown generator explicitly** rather than using a `postbuild`
  hook, because a bare `vite build` would silently skip it and ship a site whose `.md` files
  and MCP article tools 404.

## Agent surface

The site is readable by AI agents without scraping:

- `/llms.txt` indexes the site and links the markdown twins
- every page has a `.md` twin at the same path, advertised via `rel="alternate"` and a `Link` header
- `/mcp` serves 9 read-only tools over MCP
- `robots.txt` declares `search=yes, ai-input=yes, ai-train=no` ([contentsignals.org](https://contentsignals.org))

## Utility

`scripts/gen-art.mjs` regenerates the committed abstract SVG studies in `static/photos/`. Six of
them are still live — `ProjectVisual.svelte` cycles them for the gallery vignette — so don't
delete them with the rest of the placeholder-era art. (It also emits
`src/lib/assets/about-glitch.svg`, which nothing currently references.) Seeded, so re-running is
deterministic. Not part of the build:

```bash
node scripts/gen-art.mjs
```
