/**
 * Generates the small half of each responsive image pair.
 *
 * Run by hand after adding or replacing an image in static/ — the variants are
 * committed alongside the originals, the same way static/photos ships its
 * `-800.jpg` files. This is deliberately not part of `npm run build`: the
 * outputs are content, and regenerating them on every deploy would churn the
 * repo and slow Cloudflare's build for no gain.
 *
 *   node scripts/generate-image-variants.mjs
 *
 * Sources are listed explicitly rather than globbed so that adding an image
 * to static/ is a conscious decision to ship a second copy of it.
 *
 * sharp is deliberately NOT a declared dependency. It is a large native package
 * with per-platform binaries, and declaring it would put it in the install path
 * of every Cloudflare deploy for a script that runs by hand a few times a year.
 * It is currently available via wrangler -> miniflare. If that ever stops being
 * true, `npm i -D sharp`, run this, and drop it again.
 */
import { statSync } from 'node:fs';
import { resolve, dirname, basename, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

let sharp;
try {
	sharp = (await import('sharp')).default;
} catch {
	console.error(
		'sharp is not installed. It normally comes in via wrangler -> miniflare.\n' +
			'Run `npm i -D sharp`, re-run this script, then `npm un sharp` to keep it\n' +
			'out of the deploy install path.'
	);
	process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Featured project previews. They render at ~730px on desktop, ~335px on a phone. */
const SOURCES = [
	'static/projects/mivi-desktop.webp',
	'static/projects/saut/landing-hero-devices-right-to-left.webp',
	'static/writing/godrej/hero.webp',
	'static/writing/tomorrow-makers/hero.webp'
];

const WIDTH = 800;

for (const rel of SOURCES) {
	const src = join(root, rel);
	const ext = extname(src);
	const out = join(dirname(src), `${basename(src, ext)}-${WIDTH}${ext}`);

	const input = sharp(src);
	const { width } = await input.metadata();

	if (width <= WIDTH) {
		console.log(`skip  ${rel} — already ${width}px`);
		continue;
	}

	await input.resize({ width: WIDTH }).webp({ quality: 82 }).toFile(out);

	const before = (statSync(src).size / 1024).toFixed(0);
	const after = (statSync(out).size / 1024).toFixed(0);
	console.log(`write ${out.replace(root + '/', '')} — ${before}K -> ${after}K`);
}
