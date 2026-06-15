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
		"I'm a frontend developer who cares as much about the seams as the surface. I've shipped e-commerce platforms for consumer brands, componentised CMS systems that non-technical teams can actually use, and the odd political website that never saw daylight. My instinct is always to build less but build it right.",
		'When I\'m not pushing commits I\'m usually out with a camera — 35mm mostly, chasing light and interesting strangers.'
	],
	imageAlt: 'Generative glitch artwork — a grid of pixels with bursts of red and blue',
	imageCaption: 'fig. 01 — controlled chaos'
};

export const stats = [
	{ value: 3, suffix: '', label: 'Client products live in the market' },
	{ value: 12, suffix: '+', label: 'Projects designed, built and shipped' },
	{ value: 4, suffix: '', label: 'Years writing code for the web' }
];

/**
 * 'image' shows a real project screenshot in a browser frame.
 * All other kinds render live-coded vignettes (see ProjectVisual.svelte).
 */
export type ProjectVisualKind = 'terminal' | 'gallery' | 'dashboard' | 'typing' | 'image';

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
	/** Path to screenshot — only used when visual === 'image' */
	image?: string;
	/** Internal path to a case study / writing page, e.g. '/writing/novarock' */
	caseStudy?: string;
};

export const projectsIntro =
	'Three client builds and one side project. Each one pushed the work further than the brief required.';

export const projects: Project[] = [
	{
		title: 'Mivi',
		year: '2024',
		category: 'E-Commerce',
		description:
			"India's first audio manufacturing tech brand needed a storefront that moved as fast as their products. I built the entire UI on a custom in-house CMS — componentised from the ground up, with a live cart, transactional mailers and dynamic product pages that the team could manage without touching code.",
		tags: ['Custom CMS', 'E-Commerce', 'UI Engineering', 'Mailers'],
		href: 'https://www.mivi.in',
		theme: 'dark',
		visual: 'image',
		frameLabel: 'mivi.in',
		image: '/projects/mivi.png'
	},
	{
		title: 'Vibrant Living',
		year: '2024',
		category: 'Brand & Commerce',
		description:
			'A Hyderabad health-food brand with a café, store and community all under one roof — and three separate web surfaces to match. Built on the same custom CMS stack: fully dynamic product catalogue, order flows, and a design system that kept the earthy, botanical brand voice consistent across every page.',
		tags: ['Custom CMS', 'Design System', 'Multi-surface', 'UI Engineering'],
		href: 'https://vibrantliving.in',
		theme: 'light',
		visual: 'image',
		frameLabel: 'vibrantliving.in',
		image: '/projects/vibrant-living.png'
	},
	{
		title: 'AAP',
		year: '2023',
		category: 'Political Web',
		description:
			"A static campaign site for the Aam Aadmi Party — editorial, urgent, built to mobilise. Strong typographic hierarchy, video-first news sections and a volunteer sign-up flow. The party loved it; it never went live. Some of the best work I've done for an audience of zero.",
		tags: ['Static Site', 'Editorial', 'HTML / CSS', 'UI Design'],
		href: 'https://github.com/Isaacsol211',
		theme: 'light',
		visual: 'image',
		frameLabel: 'aamaadmiparty.org',
		image: '/projects/aap.png'
	},
	{
		title: 'Nova Rock Tools',
		year: '2025',
		category: 'B2B / Industrial',
		description:
			'A bilingual product site for a Lima-based mining equipment company. DTH hammers, drill bits and tricones presented in a clean, trust-first layout. SvelteKit with i18n, a product catalogue, ISO certification callouts and a WhatsApp inquiry flow.',
		tags: ['SvelteKit', 'i18n', 'B2B', 'Product Catalogue'],
		href: 'https://www.novarocktools.com',
		theme: 'light',
		visual: 'image',
		frameLabel: 'novarocktools.com',
		image: '/projects/novarock.png',
		caseStudy: '/writing/novarock'
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
			'Designing and shipping web products end-to-end for clients — from first Figma frame to production deploy. Recent work spans e-commerce, brand sites and custom CMS builds for Mivi and Vibrant Living.'
	},
	{
		from: '2017',
		to: '2021',
		role: 'Frontend Developer',
		company: 'Studio Nova',
		description:
			'Built and maintained component systems and marketing sites for a small product studio. First time owning a design system end-to-end.'
	},
	{
		from: '2015',
		to: '2017',
		role: 'Developer (Intern)',
		company: 'Able.do',
		description:
			'Learned the craft the honest way — code reviews, broken builds and very patient mentors. Left knowing why things work, not just that they do.'
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
