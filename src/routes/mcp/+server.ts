import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	about,
	clients,
	connect,
	experience,
	photographyIntro,
	photos,
	projects,
	serviceDetails,
	site,
	socials,
	testimonials,
	writing
} from '$lib/content';

// The only route on the site that isn't prerendered — it has to answer POSTs.
export const prerender = false;

/**
 * Cloudflare replaces the body of any 5xx with its own gateway error page, so the
 * client never sees our message. Every failure below is therefore a 200 carrying a
 * JSON-RPC error object, which is also what the JSON-RPC spec wants.
 */
const HEADERS = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, MCP-Protocol-Version',
	'Cache-Control': 'no-store'
};

const rpc = (payload: unknown) => json(payload, { headers: HEADERS });

const ERR = (id: unknown, code: number, message: string) =>
	rpc({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });

/** MCP tool results are always a content array; we hand back JSON as text. */
const result = (data: unknown) => ({
	content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
});

const slug = (title: string) =>
	title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

const abs = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`);

/**
 * Minimal shape of the Workers HTMLRewriter global. Declared locally rather than
 * pulling @cloudflare/workers-types into the DOM lib, which would clash with the
 * ambient Response/fetch types this file already relies on.
 */
type RewriterHandlers = { element?: () => void; text?: (chunk: { text: string }) => void };
declare const HTMLRewriter: {
	new (): {
		on(selector: string, handlers: RewriterHandlers): { transform(res: Response): Response };
		transform(res: Response): Response;
	};
};

type Ctx = { platform?: App.Platform; origin: string };
type Block = { tag: string; text: string };

/** '/writing/saut/three-hats' -> 'saut/three-hats' */
const articleSlug = (href: string) => href.replace(/^\/writing\//, '');

const findArticle = (key: string) => {
	const k = key.toLowerCase().trim();
	return writing.find(
		(a) =>
			articleSlug(a.href).toLowerCase() === k ||
			a.href.toLowerCase() === k ||
			a.title.toLowerCase() === k
	);
};

/**
 * Article prose lives as markup in each +page.svelte, not in content.ts, so the
 * prerendered page is the source of truth. Read it back through the Pages asset
 * binding instead of duplicating thousands of words into a data module.
 */
async function readArticle(href: string, ctx: Ctx): Promise<Block[]> {
	const assets = ctx.platform?.env?.ASSETS;
	if (!assets) throw new Error('Prerendered pages are not reachable in this environment.');

	const res = await assets.fetch(new URL(href, ctx.origin));
	if (!res.ok) throw new Error(`Could not read ${href} — the page returned ${res.status}.`);

	const blocks: Block[] = [];
	let current: Block | undefined;
	const rewriter = new HTMLRewriter();
	// a <br> carries no text, but it is a word break — without this,
	// `Frontend Dev.<br />Product Manager.` collapses to `Dev.Product`
	rewriter.on('main br', {
		element() {
			if (current) current.text += ' ';
		}
	});
	for (const tag of ['h1', 'h2', 'h3', 'p', 'li', 'blockquote']) {
		rewriter.on(`main ${tag}`, {
			element() {
				current = { tag, text: '' };
				blocks.push(current);
			},
			text(chunk) {
				if (current) current.text += chunk.text;
			}
		});
	}
	await rewriter.transform(res).arrayBuffer();

	return blocks
		.map((b) => ({ tag: b.tag, text: b.text.replace(/\s+/g, ' ').trim() }))
		.filter((b) => b.text);
}

const PREFIX: Record<string, string> = {
	h1: '# ',
	h2: '## ',
	h3: '### ',
	li: '- ',
	blockquote: '> ',
	p: ''
};

const renderBlocks = (blocks: Block[]) =>
	blocks.map((b) => `${PREFIX[b.tag] ?? ''}${b.text}`).join('\n\n');

const countWords = (blocks: Block[]) =>
	blocks.reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);

// ── tools ──────────────────────────────────────────────────────────────────

const TOOLS = [
	{
		name: 'get_profile',
		title: 'Get profile',
		description:
			"Who Isaac Solomon is: role, availability, location, background, the services he takes on and the clients he's built for. Start here when asked a general question about him.",
		inputSchema: { type: 'object', properties: {}, additionalProperties: false }
	},
	{
		name: 'list_projects',
		title: 'List projects',
		description:
			'List portfolio projects with year, category, tags and a summary. Optionally filter by a free-text query matched against title, category and tags.',
		inputSchema: {
			type: 'object',
			properties: {
				query: { type: 'string', description: 'Filter by title, category or tag, e.g. "e-commerce".' }
			},
			additionalProperties: false
		}
	},
	{
		name: 'get_project',
		title: 'Get project',
		description:
			'Full detail for one project, including its live URL and case study link. Accepts the project title or its slug (from list_projects).',
		inputSchema: {
			type: 'object',
			properties: {
				project: { type: 'string', description: 'Project title or slug, e.g. "Mivi" or "saut".' }
			},
			required: ['project'],
			additionalProperties: false
		}
	},
	{
		name: 'list_writing',
		title: 'List writing',
		description:
			'List the case studies and essays, with reading time and year. Optionally filter by a free-text query.',
		inputSchema: {
			type: 'object',
			properties: {
				query: { type: 'string', description: 'Filter by title, description or tag.' }
			},
			additionalProperties: false
		}
	},
	{
		name: 'search_site',
		title: 'Search site',
		description:
			'Free-text search across projects, writing, services and work history. Use when you do not know which category an answer lives in.',
		inputSchema: {
			type: 'object',
			properties: {
				query: { type: 'string', description: 'What to look for, e.g. "SvelteKit" or "RTL".' },
				limit: { type: 'integer', minimum: 1, maximum: 25, description: 'Max results (default 10).' }
			},
			required: ['query'],
			additionalProperties: false
		}
	},
	{
		name: 'get_contact',
		title: 'Get contact details',
		description:
			'How to get in touch with Isaac — email, social links and current availability for work.',
		inputSchema: { type: 'object', properties: {}, additionalProperties: false }
	},
	{
		name: 'describe_article',
		title: 'Describe an article',
		description:
			"What one piece of writing actually covers — its section headings in order, opening paragraph, length and reading time — without pulling the full text. Use this to decide whether an article is worth reading in full. Accepts a slug from list_writing (e.g. 'saut' or 'saut/three-hats') or the title.",
		inputSchema: {
			type: 'object',
			properties: {
				article: {
					type: 'string',
					description: "Article slug or title, e.g. 'godrej' or 'saut/three-hats'."
				}
			},
			required: ['article'],
			additionalProperties: false
		}
	},
	{
		name: 'get_article',
		title: 'Read a full article',
		description:
			'The complete text of one case study or essay, as markdown-style prose with its headings. Use when you need to quote it or answer detail questions; prefer describe_article first if you only need to know what it covers.',
		inputSchema: {
			type: 'object',
			properties: {
				article: {
					type: 'string',
					description: "Article slug or title, e.g. 'mivi' or 'saut/worksheet-builder'."
				}
			},
			required: ['article'],
			additionalProperties: false
		}
	},
	{
		name: 'list_photos',
		title: 'List photographs',
		description:
			"Isaac's photography — each frame with its title, location, description and image URL. Optionally filter by a free-text query matched against title, location and description.",
		inputSchema: {
			type: 'object',
			properties: {
				query: {
					type: 'string',
					description: "Filter by place, location or description, e.g. 'Kedarkantha' or 'stars'."
				},
				limit: { type: 'integer', minimum: 1, maximum: 30, description: 'Max results (default 30).' }
			},
			additionalProperties: false
		}
	}
];

// ── handlers ───────────────────────────────────────────────────────────────

type Args = Record<string, unknown>;

const matches = (needle: string, haystack: unknown[]) =>
	haystack.filter(Boolean).join(' ').toLowerCase().includes(needle.toLowerCase().trim());

const projectSummary = (p: (typeof projects)[number]) => ({
	slug: slug(p.title),
	title: p.title,
	year: p.year,
	category: p.category,
	tags: p.tags,
	summary: p.description,
	caseStudy: p.caseStudy ? abs(p.caseStudy) : undefined
});

const handlers = new Map<string, (args: Args, ctx: Ctx) => unknown | Promise<unknown>>([
	[
		'get_profile',
		() =>
			result({
				name: site.name,
				role: site.role,
				title: site.title,
				location: site.location,
				availability: site.availability,
				intro: site.heroIntro,
				bio: [about.lead, about.leadAccent].join(' '),
				background: about.paragraphs,
				services: serviceDetails,
				clients,
				experience,
				url: site.url
			})
	],
	[
		'list_projects',
		(args) => {
			const query = typeof args.query === 'string' ? args.query : '';
			const found = query
				? projects.filter((p) => matches(query, [p.title, p.category, ...p.tags]))
				: projects;
			return result({ count: found.length, projects: found.map(projectSummary) });
		}
	],
	[
		'get_project',
		(args) => {
			const key = String(args.project ?? '')
				.toLowerCase()
				.trim();
			if (!key) throw new Error('A "project" title or slug is required.');

			const found = projects.find((p) => slug(p.title) === key || p.title.toLowerCase() === key);
			if (!found)
				return {
					...result({
						error: `No project named "${args.project}".`,
						available: projects.map((p) => ({ slug: slug(p.title), title: p.title }))
					}),
					isError: true
				};

			return result({
				...projectSummary(found),
				liveUrl: found.href,
				description: found.description,
				featured: Boolean(found.featured)
			});
		}
	],
	[
		'list_writing',
		(args) => {
			const query = typeof args.query === 'string' ? args.query : '';
			const found = query
				? writing.filter((a) => matches(query, [a.title, a.description, a.tag]))
				: writing;
			return result({
				count: found.length,
				articles: found.map((a) => ({
					title: a.title,
					tag: a.tag,
					year: a.year,
					readingTime: a.readingTime,
					summary: a.description,
					url: abs(a.href)
				}))
			});
		}
	],
	[
		'search_site',
		(args) => {
			const query = String(args.query ?? '').trim();
			if (!query) throw new Error('A "query" is required.');
			const limit = Math.min(Math.max(Number(args.limit) || 10, 1), 25);

			const hits = [
				...projects
					.filter((p) => matches(query, [p.title, p.category, p.description, ...p.tags]))
					.map((p) => ({ kind: 'project', title: p.title, summary: p.description, url: p.href })),
				...writing
					.filter((a) => matches(query, [a.title, a.description, a.tag]))
					.map((a) => ({
						kind: 'writing',
						title: a.title,
						summary: a.description,
						url: abs(a.href)
					})),
				...serviceDetails
					.filter((s) => matches(query, Object.values(s)))
					.map((s) => ({ kind: 'service', title: s.title, summary: s.summary, url: site.url })),
				...experience
					.filter((e) => matches(query, [e.role, e.company, e.description]))
					.map((e) => ({
						kind: 'experience',
						title: `${e.role} — ${e.company}`,
						summary: e.description,
						url: site.url
					}))
			];

			return result({ query, count: hits.length, results: hits.slice(0, limit) });
		}
	],
	[
		'describe_article',
		async (args, ctx) => {
			const found = findArticle(String(args.article ?? ''));
			if (!found)
				return {
					...result({
						error: `No article named "${args.article}".`,
						available: writing.map((a) => ({ slug: articleSlug(a.href), title: a.title }))
					}),
					isError: true
				};

			const blocks = await readArticle(found.href, ctx);
			const outline = blocks
				.filter((b) => b.tag === 'h2' || b.tag === 'h3')
				.map((b) => ({ level: Number(b.tag.slice(1)), heading: b.text }));

			return result({
				slug: articleSlug(found.href),
				title: found.title,
				tag: found.tag,
				year: found.year,
				readingTime: found.readingTime,
				summary: found.description,
				url: abs(found.href),
				wordCount: countWords(blocks),
				sections: outline.length,
				outline,
				// the first <p> is the eyebrow ('Case Study · …'); the lead is the first
				// paragraph of real length
				opening:
					blocks.find((b) => b.tag === 'p' && b.text.length > 100)?.text ??
					blocks.find((b) => b.tag === 'p')?.text ??
					''
			});
		}
	],
	[
		'get_article',
		async (args, ctx) => {
			const found = findArticle(String(args.article ?? ''));
			if (!found)
				return {
					...result({
						error: `No article named "${args.article}".`,
						available: writing.map((a) => ({ slug: articleSlug(a.href), title: a.title }))
					}),
					isError: true
				};

			const blocks = await readArticle(found.href, ctx);
			return result({
				slug: articleSlug(found.href),
				title: found.title,
				tag: found.tag,
				year: found.year,
				readingTime: found.readingTime,
				url: abs(found.href),
				wordCount: countWords(blocks),
				text: renderBlocks(blocks)
			});
		}
	],
	[
		'list_photos',
		(args) => {
			const query = typeof args.query === 'string' ? args.query : '';
			const limit = Math.min(Math.max(Number(args.limit) || 30, 1), 30);
			const found = query
				? photos.filter((p) => matches(query, [p.place, p.caption, p.location, p.description]))
				: photos;

			return result({
				note: photographyIntro.note,
				gallery: abs('/photography'),
				count: found.length,
				photos: found.slice(0, limit).map((p) => ({
					title: p.place,
					caption: p.caption,
					location: p.location,
					description: p.description,
					alt: p.alt,
					image: abs(p.src),
					width: p.w,
					height: p.h
				}))
			});
		}
	],
	[
		'get_contact',
		() =>
			result({
				email: site.email,
				availability: site.availability,
				location: site.location,
				note: connect,
				socials,
				testimonials: testimonials.length,
				photography: abs('/photography'),
				photoCount: photos.length
			})
	]
]);

// ── JSON-RPC transport ─────────────────────────────────────────────────────

export const OPTIONS: RequestHandler = async () => new Response(null, { headers: HEADERS });

export const GET: RequestHandler = async () =>
	ERR(null, -32600, 'This MCP endpoint speaks JSON-RPC over POST.');

export const POST: RequestHandler = async ({ request, platform }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return ERR(null, -32700, 'Parse error');
	}

	const { id, method, params } = body ?? {};
	const reply = (data: unknown) => rpc({ jsonrpc: '2.0', id, result: data });

	// notifications carry no id and expect no body
	if (id === undefined) return new Response(null, { status: 202, headers: HEADERS });

	if (method === 'initialize')
		return reply({
			protocolVersion: '2025-06-18',
			capabilities: { tools: {} },
			serverInfo: { name: 'isaacsolomon.dev', version: '1.0.0' }
		});

	if (method === 'ping') return reply({});

	if (method === 'tools/list') return reply({ tools: TOOLS });

	if (method === 'tools/call') {
		const handler = handlers.get(params?.name);
		if (!handler) return ERR(id, -32602, `Unknown tool: ${params?.name}`);
		try {
			const ctx: Ctx = { platform, origin: new URL(request.url).origin };
			return reply(await handler(params.arguments ?? {}, ctx));
		} catch (e) {
			// tool failures belong in the result, not the JSON-RPC error channel
			return reply({
				content: [{ type: 'text', text: e instanceof Error ? e.message : String(e) }],
				isError: true
			});
		}
	}

	return ERR(id, -32601, `Method not found: ${method}`);
};
