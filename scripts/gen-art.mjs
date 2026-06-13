/**
 * Generates the placeholder artwork committed in static/:
 *  - src/lib/assets/about-glitch.svg  (pixel-glitch banner for the About section)
 *  - static/photos/*.svg              (abstract gradient studies for the photo grid)
 *
 * Deterministic (seeded), so re-running produces identical files.
 * Run: node scripts/gen-art.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Small seeded PRNG (mulberry32)
function rng(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/* ── About glitch banner ─────────────────────────────────────── */
function glitchBanner() {
	const W = 1600;
	const H = 700;
	const cell = 20;
	const cols = W / cell;
	const rows = H / cell;
	const rand = rng(211); // seed nod to Isaacsol211
	const grays = ['#26241f', '#33302a', '#4a463e', '#5c574d'];
	let rects = '';

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			// density waves across x for a "signal band" look
			const wave = 0.5 + 0.5 * Math.sin(x / 6 + Math.sin(y / 9) * 2);
			const r = rand();
			if (r > 0.32 + wave * 0.45) continue; // leave background showing
			let fill;
			const c = rand();
			if (c > 0.965) fill = '#e8490f';
			else if (c > 0.94) fill = '#2438ff';
			else if (c > 0.915) fill = '#d9d4c7';
			else fill = grays[Math.floor(rand() * grays.length)];
			rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="${fill}"/>`;
		}
	}

	// horizontal scanline streaks
	for (let i = 0; i < 26; i++) {
		const y = Math.floor(rand() * rows) * cell;
		const x = Math.floor(rand() * cols * 0.8) * cell;
		const w = (2 + Math.floor(rand() * 14)) * cell;
		const fill = rand() > 0.75 ? '#e8490f' : rand() > 0.5 ? '#d9d4c7' : '#2438ff';
		rects += `<rect x="${x}" y="${y}" width="${w}" height="${cell / 2}" fill="${fill}" opacity="${(0.5 + rand() * 0.5).toFixed(2)}"/>`;
	}

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="#16140f"/>${rects}</svg>`;
}

/* ── Photo placeholders ──────────────────────────────────────── */
function photo({ w, h, stops, glow, seed }) {
	const id = `g${seed}`;
	const stopEls = stops
		.map((c, i) => `<stop offset="${Math.round((i / (stops.length - 1)) * 100)}%" stop-color="${c}"/>`)
		.join('');
	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">`,
		`<defs>`,
		`<linearGradient id="${id}" x1="0" y1="0" x2="0.35" y2="1">${stopEls}</linearGradient>`,
		`<radialGradient id="${id}r" cx="0.72" cy="0.28" r="0.9"><stop offset="0%" stop-color="${glow}" stop-opacity="0.55"/><stop offset="55%" stop-color="${glow}" stop-opacity="0"/></radialGradient>`,
		`<filter id="${id}n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed}"/><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0.6 0.6 0 0"/></filter>`,
		`</defs>`,
		`<rect width="${w}" height="${h}" fill="url(#${id})"/>`,
		`<rect width="${w}" height="${h}" fill="url(#${id}r)"/>`,
		`<rect width="${w}" height="${h}" filter="url(#${id}n)" opacity="0.16"/>`,
		`</svg>`
	].join('');
}

const photos = [
	{ file: '01-dusk.svg', w: 1200, h: 1500, stops: ['#1b1a2e', '#7c3a24', '#e8b54a'], glow: '#ffd9a0', seed: 11 },
	{ file: '02-forest.svg', w: 1200, h: 1600, stops: ['#0c1f14', '#2f5d3a', '#9db98a'], glow: '#d9f0c0', seed: 22 },
	{ file: '03-street.svg', w: 1200, h: 800, stops: ['#0f0f0f', '#5d5d5d', '#d9d9d9'], glow: '#ffffff', seed: 33 },
	{ file: '04-ocean.svg', w: 1200, h: 1200, stops: ['#0a1430', '#20488f', '#7fb3d8'], glow: '#bfe3ff', seed: 44 },
	{ file: '05-sand.svg', w: 1200, h: 1500, stops: ['#5c4332', '#a9876a', '#e3cda8'], glow: '#fff0d0', seed: 55 },
	{ file: '06-neon.svg', w: 1200, h: 1800, stops: ['#14001f', '#5b1f63', '#e84393'], glow: '#ff9ad5', seed: 66 },
	{ file: '07-fog.svg', w: 1200, h: 900, stops: ['#4c5258', '#8d949b', '#cdd2d6'], glow: '#f4f7f9', seed: 77 },
	{ file: '08-ember.svg', w: 1200, h: 1500, stops: ['#1a0c08', '#7a2d12', '#e8490f'], glow: '#ffb27d', seed: 88 }
];

mkdirSync(join(root, 'src/lib/assets'), { recursive: true });
mkdirSync(join(root, 'static/photos'), { recursive: true });

writeFileSync(join(root, 'src/lib/assets/about-glitch.svg'), glitchBanner());
for (const p of photos) writeFileSync(join(root, 'static/photos', p.file), photo(p));

console.log('art generated: 1 banner + %d photos', photos.length);
