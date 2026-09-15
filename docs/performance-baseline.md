# Performance baseline — 15 Sep 2026

The review's Pass 4 asks for measured lab baselines before any speed claim goes
on the site. This is that baseline. It is a lab measurement, not field data —
see *What this does not cover*.

## Method

Chrome headless via the DevTools Protocol against the production build served by
`vite preview`, throttled to approximate a mid-range phone on a poor connection:

| Setting | Value |
|---|---|
| CPU throttle | 4× slowdown |
| Network | 1.6 Mbps down, 750 Kbps up, 150 ms RTT |
| Viewport | 390 × 844, DPR 2, mobile |
| Cache | cold — `about:blank` between runs |

Reproduce with `scripts/../` — the harness lives in the session scratchpad, not
the repo; the numbers matter more than the script. Re-measure the same way after
any change that touches images, fonts, or the motion bundle.

## Results

| Page | FCP | LCP | DOMContentLoaded | Load | Requests | Transferred | DOM nodes |
|---|---|---|---|---|---|---|---|
| `/` | 876 ms | 876 ms | 873 ms | 3,087 ms | 26 | 483 KB | 597 |
| `/photography` | 252 ms | 412 ms | 411 ms | 1,931 ms | 26 | 314 KB | 294 |
| `/writing/saut` | 516 ms | 516 ms | 551 ms | 3,427 ms | 24 | 343 KB | 231 |

LCP is inside the 2.5 s "good" threshold on all three pages under throttling.

### Where the bytes go

| Page | Images | CSS | JS | Other |
|---|---|---|---|---|
| `/` | 293 KB | 65 KB | 51 KB | 75 KB |
| `/photography` | 309 KB | — | — | 5 KB |
| `/writing/saut` | 333 KB | 1 KB | — | 10 KB |

Images dominate every page, which is expected for this site and is where any
future work should go. The 800w variants added for the featured project
previews took those four images from 555 KB to 151 KB on a phone.

## What this does not cover

- **This is lab data, not field data.** It says what a throttled headless
  Chrome experiences, not what real visitors on real networks and devices do.

  Field data does exist: **Cloudflare Web Analytics is already running** on
  isaacsolomon.dev. It is enabled through Cloudflare's automatic setup, so the
  beacon is injected at the edge and appears nowhere in this repository —
  which is exactly why an earlier pass of this document wrongly recorded the
  site as having no monitoring. `grep` over the source finds nothing, and so
  does `curl` with a default user agent, because the injection only happens
  for browser-like requests. Confirmed by fetching the live page with a
  browser user agent:

  ```
  data-cf-beacon='{"version":"2024.11.0","token":"f83b...b41d","r":1,"spa":2}'
  ```

  `spa: 2` means SPA mode is on, so SvelteKit's client-side navigations are
  counted as page views rather than only the first hard load. The dashboard is
  under Cloudflare → Analytics & Logs → Web Analytics.

  **Do not add a second beacon to the source.** Two beacons on one page double
  every page view and corrupt the Core Web Vitals sample. If repo-controlled
  analytics is ever wanted instead, turn the automatic injection off first.
- **Localhost serving.** Network conditions are emulated but the server responds
  instantly. Real TTFB from Cloudflare's edge is not represented.
- **One run per page.** These are single cold-load samples, not medians over
  repeated runs. Treat them as an order-of-magnitude baseline.

## Claims on the site that depend on measurement

The About copy says scroll-driven animation "doesn't cost a Lighthouse score".
That is backed by the Keus case study, which publishes a real Lighthouse desktop
audit — Performance 97 — with the screenshot, and says plainly that a
scroll-driven video site will not score 100. The claim is sourced; leave it
alone unless that audit is re-run and changes.

Everything else in the copy describes a practice ("performance budgets that
hold", "motion with a performance budget") rather than asserting a number, and
needs no measurement to stand.
