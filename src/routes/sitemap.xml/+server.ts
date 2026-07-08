import { site, writing } from '$lib/content';

export const prerender = true;

export function GET() {
	const pages = ['/', '/writing', ...writing.map((a) => a.href)];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((path) => `\t<url><loc>${site.url}${path === '/' ? '' : path}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
