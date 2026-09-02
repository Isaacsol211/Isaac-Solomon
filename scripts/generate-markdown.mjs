/**
 * Emit a markdown twin for every prerendered page: /writing/godrej -> /writing/godrej.md
 *
 * llmstxt.org asks for "a clean markdown version of those pages at the same URL
 * as the original ... with the extension replaced by `.md`". Running after the
 * build means the prose stays authored in the +page.svelte files — there is no
 * second copy to keep in sync — and the output is a static asset, so it costs
 * nothing at runtime.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { parse } from 'node-html-parser';

const BUILD = 'build';
const ORIGIN = 'https://isaacsolomon.dev';
const SKIP = new Set(['404.html']);

const BLOCK = new Set(['h1', 'h2', 'h3', 'h4', 'p', 'li', 'blockquote', 'figcaption']);
const PREFIX = { h1: '# ', h2: '## ', h3: '### ', h4: '#### ', li: '- ', blockquote: '> ' };

/** Collect inline text, preserving links and emphasis, treating <br> as a word break. */
function inline(node) {
	let out = '';
	for (const child of node.childNodes) {
		if (child.nodeType === 3) {
			out += child.rawText;
			continue;
		}
		if (child.nodeType !== 1) continue;

		const tag = child.rawTagName?.toLowerCase();
		if (tag === 'br') {
			out += ' ';
		} else if (tag === 'a') {
			const href = child.getAttribute('href') ?? '';
			const text = inline(child).trim();
			// bare anchors and empty links would render as noise
			out += href && text ? `[${text}](${href.startsWith('/') ? ORIGIN + href : href})` : text;
		} else if (tag === 'strong' || tag === 'b') {
			const text = inline(child).trim();
			out += text ? `**${text}**` : '';
		} else if (tag === 'em' || tag === 'i') {
			const text = inline(child).trim();
			out += text ? `*${text}*` : '';
		} else if (tag === 'code') {
			const text = inline(child).trim();
			out += text ? `\`${text}\`` : '';
		} else {
			out += inline(child);
		}
	}
	return out;
}

const clean = (s) => s.replace(/\s+/g, ' ').trim();

/** Walk in document order, emitting one markdown block per block-level element. */
function walk(node, blocks) {
	for (const child of node.childNodes) {
		if (child.nodeType !== 1) continue;
		const tag = child.rawTagName?.toLowerCase();

		if (tag === 'img') {
			const alt = clean(child.getAttribute('alt') ?? '');
			const src = child.getAttribute('src') ?? '';
			if (src && alt) blocks.push(`![${alt}](${src.startsWith('/') ? ORIGIN + src : src})`);
			continue;
		}

		if (BLOCK.has(tag)) {
			// a block element never contains another; take its text and move on
			const text = clean(inline(child));
			if (text) blocks.push(`${PREFIX[tag] ?? ''}${text}`);
			continue;
		}

		walk(child, blocks);
	}
}

async function* htmlFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name === '_app') continue;
			yield* htmlFiles(full);
		} else if (entry.name.endsWith('.html') && !SKIP.has(entry.name)) {
			yield full;
		}
	}
}

let count = 0;
for await (const file of htmlFiles(BUILD)) {
	const html = await readFile(file, 'utf8');
	const root = parse(html);

	const main = root.querySelector('main');
	if (!main) {
		console.warn(`  skipped ${relative(BUILD, file)} — no <main>`);
		continue;
	}

	const blocks = [];
	walk(main, blocks);
	if (!blocks.length) {
		console.warn(`  skipped ${relative(BUILD, file)} — no text content`);
		continue;
	}

	const slug = relative(BUILD, file).replace(/\.html$/, '');
	const url = slug === 'index' ? `${ORIGIN}/` : `${ORIGIN}/${slug}`;
	const title = clean(root.querySelector('title')?.text ?? slug);

	const body = `---\ntitle: ${title}\nsource: ${url}\n---\n\n${blocks.join('\n\n')}\n`;
	await writeFile(join(BUILD, `${slug}.md`), body, 'utf8');
	count++;
}

console.log(`  markdown: wrote ${count} .md files`);
