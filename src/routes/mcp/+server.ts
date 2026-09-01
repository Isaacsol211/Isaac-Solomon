import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	about,
	clients,
	connect,
	experience,
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

const handlers = new Map<string, (args: Args) => unknown>([
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

export const POST: RequestHandler = async ({ request }) => {
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
			return reply(await handler(params.arguments ?? {}));
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
