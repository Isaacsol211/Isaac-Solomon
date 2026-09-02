import {
	about,
	clients,
	experience,
	mcp,
	photographyIntro,
	photos,
	projects,
	serviceDetails,
	site,
	writing
} from '$lib/content';

// Static file, built once — same as sitemap.xml.
export const prerender = true;

/** llms.txt notes should be a line, not a paragraph — keep the first sentence. */
const firstSentence = (text: string) => {
	const end = text.search(/\.\s/);
	return end === -1 ? text : text.slice(0, end + 1);
};

const abs = (path: string) => (path.startsWith('http') ? path : `${site.url}${path}`);

export function GET() {
	const body = `# ${site.name}

> ${site.heroIntro} ${site.location}, ${site.availability.toLowerCase()}.

${about.paragraphs[0]}

Clients include ${clients.join(', ')}.

This site runs an MCP server at ${mcp.url} (Streamable HTTP JSON-RPC, no auth required). It exposes read-only tools for this content — including \`get_article\`, which returns the full text of any case study below.

Every page also has a markdown twin at the same path with \`.md\` appended — the links below point to those. Prefer either over scraping the HTML.

## Writing

${writing
	.map(
		(a) =>
			`- [${a.title}](${abs(a.href)}.md): ${a.tag}, ${a.year}, ${a.readingTime} read. ${a.description}`
	)
	.join('\n')}

## Projects

${projects
	.map((a) => {
		const study = a.caseStudy ? ` Case study: ${abs(a.caseStudy)}.md` : '';
		return `- [${a.title}](${a.href}): ${a.category}, ${a.year}. ${firstSentence(a.description)}${study}`;
	})
	.join('\n')}

## Services

${serviceDetails.map((s) => `- ${s.title}: ${s.summary}`).join('\n')}

## Experience

${experience.map((e) => `- ${e.from}–${e.to} — ${e.role}, ${e.company}. ${firstSentence(e.description)}`).join('\n')}

## Optional

- [Photography](${abs('/photography')}.md): ${photographyIntro.note} ${photos.length} frames, mostly the Indian Himalaya.
- [Contact](${site.url}#connect): ${site.email}
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
}
