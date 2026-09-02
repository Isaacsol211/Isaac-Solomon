# MCP server

`https://isaacsolomon.dev/mcp` — a read-only [Model Context Protocol](https://modelcontextprotocol.io)
server that lets an AI agent query this site as structured data instead of scraping it.

- **Transport:** Streamable HTTP (JSON-RPC 2.0 over `POST`)
- **Protocol version:** `2025-06-18`
- **Auth:** none. Everything it returns is already public on the site.
- **CORS:** open (`*`), so remote clients and the in-page bridge can both reach it.

## Tools

| Tool | Returns |
| --- | --- |
| `get_profile` | Role, availability, location, bio, services, clients, work history |
| `list_projects` | All projects; optional free-text filter on title, category and tags |
| `get_project` | One project in full, with live URL and case-study link |
| `list_writing` | Index of case studies and essays with summaries |
| `describe_article` | One article's heading outline, opening, word count — without the body |
| `get_article` | One article's complete prose as markdown |
| `list_photos` | The photography set with place, location, description, image URL |
| `search_site` | Free-text search across projects, writing, services and experience |
| `get_contact` | Email, socials, availability |

`get_project`, `describe_article` and `get_article` accept either a slug or a title.
Article slugs may be nested — `saut/three-hats`.

## Where the data comes from

Nothing here is written twice.

```
src/lib/content.ts ──────────────► most tools (projects, writing index, photos, profile)
                   └─────────────► /llms.txt

src/routes/writing/**/+page.svelte
        │  (prerender)
        ▼
   build/writing/*.html
        │  (scripts/generate-markdown.mjs, post-build)
        ▼
   build/writing/*.md ───────────► describe_article, get_article  (via ASSETS binding)
                     └───────────► served publicly as the page's markdown twin
```

Structured facts live in [`content.ts`](../../lib/content.ts). Long-form prose stays authored
as markup in the article pages — it was never worth moving ~10k words into a data module — so
the build emits a markdown twin of every page and the article tools read those back through
Cloudflare's `ASSETS` binding. Edit an article and the tools, the `.md` file and `/llms.txt`
all follow on the next deploy.

## Connecting

Claude Code:

```bash
claude mcp add --transport http --scope user isaacsolomon https://isaacsolomon.dev/mcp
```

Claude Desktop / claude.ai: Settings → Connectors → Add custom connector → paste the URL.

Raw:

```bash
curl -sX POST https://isaacsolomon.dev/mcp -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

The site also renders this as a copy-paste panel in the contact section
(`src/lib/components/McpConnect.svelte`).

## Runtime

The site is otherwise fully static. `vite.config.ts` scopes the Worker to this one path:

```js
adapter({ fallback: 'spa', routes: { include: ['/mcp'], exclude: [] } })
```

so every page stays prerendered and CDN-served, and `/mcp` is the only request that costs a
Worker invocation. `wrangler.toml` needs no changes — the adapter reads `pages_build_output_dir`.

**Every failure path returns HTTP 200** with a JSON-RPC error object. This is not just spec
tidiness: Cloudflare Pages replaces the body of any 5xx a Function returns with its own gateway
error page, so a 500 would reach the client as unreadable HTML. Errors inside a tool come back
as `isError` results instead, which is what MCP clients expect anyway.

## Local development

Use Wrangler, not `vite dev`:

```bash
npm run build && npx wrangler pages dev
```

Under plain `vite dev` there is no `ASSETS` binding, so `describe_article` and `get_article`
return `isError` with "Markdown pages are not reachable in this environment." Every other tool
works fine. This is expected, not a bug — but it means article changes can only be verified
through a real build.

## Adding a tool

1. Add the definition to `TOOLS` in [`+server.ts`](./+server.ts) — `name`, `title`,
   `description`, and a JSON Schema `inputSchema`. Write the description for an agent choosing
   between tools, not for a human reading docs.
2. Add a handler to the `handlers` map. It receives `(args, ctx)`; `ctx.platform.env.ASSETS`
   is there if you need to read a built file.
3. Return `result(data)`. Throwing is fine — it is caught and returned as an `isError` result.
4. `npm run check && npm run build`, then exercise it against `wrangler pages dev`.

## Gotchas

- **Clients cache the tool list.** An existing connector or session keeps whatever `tools/list`
  returned when it connected. Adding a tool is invisible to it until it reconnects — usually a
  new session. The endpoint itself updates immediately.
- **The `.md` files are a build artifact.** `npm run build` chains
  `scripts/generate-markdown.mjs` explicitly rather than using a `postbuild` hook, because
  `deploy` and CI can invoke `vite build` directly and would silently skip it, shipping a site
  where the article tools 404.
