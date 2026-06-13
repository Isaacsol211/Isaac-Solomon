/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the site from this file.
 *  Components only render what's defined here.
 *  TODO(Isaac): swap the placeholder copy/projects/photos for real ones.
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
	name: 'Isaac Solomon',
	firstName: 'Isaac',
	role: 'Developer',
	tagline: 'part-time photographer',
	email: 'isaacsolomon211@gmail.com',
	location: 'Remote — worldwide',
	availability: 'Open to new projects',
	heroIntro:
		'I build clean, fast things for the web — and photograph the world in between deploys.',
	// Used for <title>, meta description and social cards
	title: 'Isaac Solomon — Developer & Photographer',
	description:
		'Portfolio of Isaac Solomon — a developer who designs and builds fast, accessible web experiences, and captures the world through a lens on the side.',
	url: 'https://isaacsolomon.dev' // TODO(Isaac): update once the domain is registered
};

export const nav = [
	{ label: 'About', href: '#about' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Photography', href: '#photography' }
];

/** Scrolling strip under the hero */
export const marquee = [
	'Svelte',
	'TypeScript',
	'Tailwind CSS',
	'Node.js',
	'UI Engineering',
	'Photography',
	'Cloudflare'
];

export const about = {
	lead: 'I design and build things for the web —',
	leadAccent: 'fast, accessible and a little bit playful.',
	paragraphs: [
		'Placeholder bio — a couple of sentences about who you are, the kind of problems you love solving and what you are currently focused on. Keep it human; skip the buzzwords.',
		'When I am not pushing commits I am usually out with a camera, chasing light and interesting strangers.'
	],
	imageAlt: 'Generative glitch artwork — a grid of pixels with bursts of red and blue',
	imageCaption: 'fig. 01 — controlled chaos'
};

export const stats = [
	{ value: 320, suffix: '+', label: 'Commits pushed in the last year' },
	{ value: 12, suffix: '+', label: 'Projects designed, built and shipped' },
	{ value: 4, suffix: '', label: 'Years writing code for the web' }
];

/** Which live-coded preview vignette the card renders (see ProjectVisual.svelte) */
export type ProjectVisualKind = 'terminal' | 'gallery' | 'dashboard' | 'typing';

export type Project = {
	title: string;
	year: string;
	category: string;
	description: string;
	tags: string[];
	href: string;
	/** 'dark' renders the inverted card with the big circle, like the mockup */
	theme: 'light' | 'dark';
	visual: ProjectVisualKind;
	/** Text shown in the preview window's title/address bar */
	frameLabel: string;
};

export const projectsIntro =
	'A few things I have designed, broken and rebuilt recently. Each one taught me something I could not have googled.';

export const projects: Project[] = [
	{
		title: 'Novarock',
		year: '2026',
		category: 'Tooling',
		description:
			'Placeholder — one good sentence about what Novarock does and the problem it solves.',
		tags: ['TypeScript', 'CLI'],
		href: 'https://github.com/Isaacsol211',
		theme: 'light',
		visual: 'terminal',
		frameLabel: 'novarock — zsh'
	},
	{
		title: 'Lumen Gallery',
		year: '2025',
		category: 'Web App',
		description:
			'Placeholder — a self-hosted photography portfolio engine with buttery image loading.',
		tags: ['SvelteKit', 'Cloudflare'],
		href: 'https://github.com/Isaacsol211',
		theme: 'dark',
		visual: 'gallery',
		frameLabel: 'lumen.gallery'
	},
	{
		title: 'Pulse Board',
		year: '2025',
		category: 'Dashboard',
		description:
			'Placeholder — a realtime analytics dashboard that turns noisy events into calm signals.',
		tags: ['Svelte', 'WebSockets'],
		href: 'https://github.com/Isaacsol211',
		theme: 'light',
		visual: 'dashboard',
		frameLabel: 'pulse.app/live'
	},
	{
		title: 'Type Trainer',
		year: '2024',
		category: 'Side Quest',
		description:
			'Placeholder — a tiny keyboard speed game built in a weekend, played for far too many.',
		tags: ['Vite', 'Canvas'],
		href: 'https://github.com/Isaacsol211',
		theme: 'light',
		visual: 'typing',
		frameLabel: 'type-trainer.dev'
	}
];

export const experienceHeading = {
	plain: 'A yearly snapshot of',
	accent: 'my creative growth'
};

export const experience = [
	{
		from: '2021',
		to: 'Now',
		role: 'Independent Developer',
		company: 'Freelance',
		description:
			'Placeholder — designing and shipping web apps end-to-end for clients, from first sketch to production.'
	},
	{
		from: '2017',
		to: '2021',
		role: 'Frontend Developer',
		company: 'Studio Nova',
		description:
			'Placeholder — built and maintained component systems and marketing sites for a small product studio.'
	},
	{
		from: '2015',
		to: '2017',
		role: 'Developer (Intern)',
		company: 'Able.do',
		description:
			'Placeholder — learned the craft the honest way: code reviews, broken builds and very patient mentors.'
	}
];

export const photographyIntro = {
	plain: 'Capture',
	accent: 'the moment.',
	note: '35mm & digital — places, people and light. A small selection, updated whenever I remember to.'
};

/**
 * Replace these generated placeholders with real photos:
 * drop files into static/photos/ and update src/alt/captions below.
 * w/h are the intrinsic dimensions (prevents layout shift).
 */
export const photos = [
	{ src: '/photos/01-dusk.svg', alt: 'Warm dusk gradient study', caption: 'Untitled №1 — dusk', w: 1200, h: 1500 },
	{ src: '/photos/02-forest.svg', alt: 'Deep green forest gradient study', caption: 'Untitled №2 — forest', w: 1200, h: 1600 },
	{ src: '/photos/03-street.svg', alt: 'Monochrome street gradient study', caption: 'Untitled №3 — street', w: 1200, h: 800 },
	{ src: '/photos/04-ocean.svg', alt: 'Blue ocean gradient study', caption: 'Untitled №4 — ocean', w: 1200, h: 1200 },
	{ src: '/photos/05-sand.svg', alt: 'Warm sand gradient study', caption: 'Untitled №5 — sand', w: 1200, h: 1500 },
	{ src: '/photos/06-neon.svg', alt: 'Neon city gradient study', caption: 'Untitled №6 — neon', w: 1200, h: 1800 },
	{ src: '/photos/07-fog.svg', alt: 'Soft fog gradient study', caption: 'Untitled №7 — fog', w: 1200, h: 900 },
	{ src: '/photos/08-ember.svg', alt: 'Ember orange gradient study', caption: 'Untitled №8 — ember', w: 1200, h: 1500 }
];

export const socials = [
	{ label: 'GitHub', href: 'https://github.com/Isaacsol211' },
	// TODO(Isaac): drop in your real handles
	{ label: 'Instagram', href: 'https://instagram.com/your-handle' },
	{ label: 'Behance', href: 'https://behance.net/your-handle' },
	{ label: 'Twitter / X', href: 'https://x.com/your-handle' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/your-handle' }
];

export const connect = {
	eyebrow: 'Have an idea? A role? A roll of film?',
	blurb:
		'I am always happy to talk about interesting work, weird side projects or where to get good coffee. The fastest way to reach me:'
};
