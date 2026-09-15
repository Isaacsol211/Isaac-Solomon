# Performance baseline — 15 Sep 2026

Lab measurements of the production build, reproducible from the repo. This
replaces the earlier version of this document, whose "cold" runs had not
cleared the HTTP cache and whose harness lived outside the repository. Both
of those were findings of the follow-up review and are fixed here.

## Method

`scripts/perf-baseline.mjs` drives headless Chrome over the DevTools Protocol.

| Setting | Value |
|---|---|
| Chrome | 152.0.7977.84, `--headless=new`, fresh profile per invocation |
| CPU | 4× throttle |
| Network | 1.6 Mbps down · 750 Kbps up · 150 ms RTT |
| Viewport | 390 × 844, DPR 2, `mobile: true` |
| First visit | `Network.clearBrowserCache` + `setCacheDisabled(true)` before **every** run |
| Repeat visit | cache enabled, one warm-up load discarded, then measured |
| Runs | 5 per page per mode; medians reported; every sample kept in the JSON |

Raw outputs, with Chrome version, commit, profile and timestamps, are in
`docs/perf/`. Reproduce with:

```
npm run build && npm run preview -- --port 4173
node scripts/perf-baseline.mjs --base http://localhost:4173 --runs 5 --label local
node scripts/perf-baseline.mjs --base https://isaacsolomon.dev --runs 5 --label deployed
```

Use `vite preview`, never `npx serve -s build`: `-s` is SPA mode and serves
the homepage for every route, so `/photography` and `/writing/saut` would be
measuring `/`.

## Results — local build, first visit (cold), medians

Three runs of the same harness against three successive builds. The commit
in each filename is the harness's HEAD when it ran; the build served is
named in the row.

| Build | Page | FCP | LCP | DCL | Load | Req | KB |
|---|---|---|---|---|---|---|---|
| after defect fixes (`cf98f89` content, tagged `b1b3322`) | `/` | 920 | 920 | 1084 | 1253 | 26 | 484 |
| + hero composition (`1250ec6`) | `/` | 944 | 1444 | 939 | 3700 | 29 | 662 |
| + previews on hover (`18d4e01`, **current**) | `/` | 920 | 1424 | 914 | 2393 | 26 | 391 |
| current | `/photography` | 708 | 708 | 698 | 2815 | 26 | 476 |
| current | `/writing/saut` | 748 | 748 | 746 | 4284 | 24 | 498 |

### Reading the homepage row

- **FCP is unchanged** by the hero composition (920 → 920 ms).
- **LCP rose from 920 to 1424 ms.** Before the hero, the largest contentful
  element was the display headline — text. It is now a photograph, the Mivi
  storefront frame. That is the cost of putting real work imagery in the
  first viewport, and it is inside the 2.5 s "good" threshold under 4× CPU
  and a 1.6 Mbps link. It is not a regression to hide; it is the trade the
  brief asked for, measured.
- **Transfer went 484 → 662 → 391 KB.** The hero's three frames add ~198 KB.
  The harness then exposed that the homepage was also fetching ~270 KB of
  images that only exist for the cursor-hover preview on the project rows,
  on every first visit from a mouse device, since the portal carried a `src`
  for every row from mount. Those now load on first hover (`18d4e01`), which
  is why the current homepage transfers *less* than it did before the hero.
- **Load** (the `load` event) is dominated by when the last image finishes
  on a throttled link; it is reported but LCP is the number that matters.

## Results — deployed site, medians

Measured against `https://isaacsolomon.dev` on 15 Sep, when the live build
was `b1b3322` (before the follow-up's fixes and the hero). Same profile.
`docs/perf/2026-09-15-deployed-cf98f89.json`.

| Page | Visit | FCP | LCP | DCL | Load | Req | KB |
|---|---|---|---|---|---|---|---|
| `/` | first | 1328 | 1328 | 1325 | 1816 | 32 | 613 |
| `/` | repeat | 628 | 628 | 847 | 849 | 30 | 14 |
| `/photography` | first | 1132 | 1132 | 1132 | 2981 | 30 | 492 |
| `/photography` | repeat | 348 | 348 | 511 | 512 | 30 | 14 |
| `/writing/saut` | first | 1224 | 1224 | 1243 | 4494 | 27 | 514 |
| `/writing/saut` | repeat | 384 | 384 | 515 | 566 | 27 | 14 |

Deployed adds real edge TTFB and Cloudflare's own beacon (+4–6 requests, the
14 KB on repeat visits is its POSTs). Re-run this after the next deploy to
get the deployed number for the current build.

## Caveats — read before quoting a number

- **Repeat-visit KB on `local` runs is not trustworthy for images.**
  `vite preview` sends no `Cache-Control`, so freshness is heuristic — a
  fraction of the file's age. Files generated the same day (the hero's 800w
  frames) are stale within minutes and re-download in full; older photos are
  served from cache. Production is different: `_headers` gives `/photos/*`,
  `/projects/*` and the case-study image folders `max-age=604800`, so real
  repeat visits cache them for a week. The deployed run's 14 KB repeat is
  the honest figure.
- **The "phone" profile has a mouse.** CDP's `mobile: true` sets touch points
  but does not change the `hover`/`pointer` media features, and
  `setEmulatedMedia` does not accept them, so `(hover: hover) and (pointer:
  fine)` is true in every run. Anything gated on a fine pointer is included.
  This is why the hover previews were caught — and why the site-side fix
  was the right one.
- **Single machine, one day.** Medians of five, not a distribution.
- **Static load numbers say nothing about scroll smoothness.** The brief
  asks for traces during the expressive scenes; none are recorded here.

## Field data

Cloudflare Web Analytics is running on the site through Cloudflare's
automatic setup; the beacon is injected at the edge and appears nowhere in
this repository. `spa: 2` is on, so client-side navigations count as page
views. Dashboard: Cloudflare → Analytics & Logs → Web Analytics. Do not add
a second beacon in source.

## Claims on the site that depend on measurement

About says scroll-driven animation "doesn't cost a Lighthouse score". The
Keus case study renders a hardcoded metrics table with Performance 97 — an
earlier version of this document called it a screenshot, which it is not.
A stated 97 does not demonstrate zero cost. The sentence should be read as
a description of practice; if it is to stand as a claim, attach a dated
audit to the article.
