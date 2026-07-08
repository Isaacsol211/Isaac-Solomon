/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit everything about the site from this file.
 *  Components only render what's defined here.
 * ─────────────────────────────────────────────────────────────────
 */

export const site = {
	name: 'Isaac Solomon',
	firstName: 'Isaac',
	role: 'Developer',
	tagline: 'hobbyist photographer',
	email: 'isaacsolomon211@gmail.com',
	location: 'Remote — worldwide',
	availability: 'Open to new projects',
	heroIntro:
		'I build clean, fast things for the web — and photograph the world in between deploys.',
	// Used for <title>, meta description and social cards
	title: 'Isaac Solomon — Developer & Photographer',
	description:
		'Portfolio of Isaac Solomon — a developer who designs and builds fast, accessible web experiences, and captures the world through a lens on the side.',
	url: 'https://isaacsolomon.dev'
};

export const nav = [
	{ label: 'About', href: '#about' },
	{ label: 'Services', href: '#services' },
	{ label: 'Projects', href: '#projects' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Writing', href: '#writing' },
	{ label: 'Photography', href: '/photography' }
];

/** Service names — expanded with details in `serviceDetails` below */
export const services = [
	'E-commerce storefronts',
	'Custom CMS builds',
	'Scroll-driven animation',
	'Long-term product work'
];

export const servicesIntro = {
	plain: 'what I do,',
	accent: 'end to end.'
};

export type Service = {
	title: string;
	summary: string;
	items: string[];
};

export const serviceDetails: Service[] = [
	{
		title: 'E-commerce storefronts',
		summary:
			'Fast, componentised storefronts built to survive real traffic and relentless launch schedules.',
		items: [
			'Product & category pages',
			'Live carts and checkout flows',
			'Transactional mailers',
			'Performance budgets that hold'
		]
	},
	{
		title: 'Custom CMS builds',
		summary:
			'Component systems flexible enough for non-technical teams to run without touching code.',
		items: [
			'Content modelling',
			'Editor-friendly component systems',
			'Design-system enforcement',
			'Rebrand-proof architecture'
		]
	},
	{
		title: 'Scroll-driven animation',
		summary:
			'Scroll choreography that stays smooth on mid-range phones — GSAP, view transitions, video scrubbing.',
		items: [
			'GSAP & ScrollTrigger',
			'Video pause-and-play pipelines',
			'View-transition morphs',
			'Reduced-motion fallbacks'
		]
	},
	{
		title: 'Long-term product work',
		summary:
			'Years-long partnerships — from first commit to product management, across rewrites and rebrands.',
		items: [
			'Frontend leadership',
			'Framework migrations',
			'i18n / RTL support',
			'Product management'
		]
	}
];

/**
 * Full-viewport statement between the hero and About — words fill in on scroll.
 * DRAFT COPY — Isaac has veto rights on this line.
 */
export const manifesto = {
	label: 'the short version',
	lines: [
		{ plain: 'make it', key: 'fast' },
		{ plain: 'make it', key: 'last' },
		{ plain: 'make it feel', key: 'handmade' }
	]
};

export const about = {
	lead: 'Eight years turning designs into products —',
	leadAccent: 'not prototypes, not demos. Products.',
	paragraphs: [
		"I'm a frontend developer at Able.do, where I've led the build on everything from India's largest audio brand storefront to a national talent platform that screens students across eleven languages. I write the kind of code that ships on Tuesday and still works on Friday — component systems flexible enough for non-technical teams to manage, e-commerce flows that handle real traffic, and scroll-driven animations that don't tank a Lighthouse score.",
		"The work I'm proudest of sits at the intersection of craft and constraint: a CMS rebuilt twice to survive a corporate rebrand, an animation-heavy site pivoted from image sequences to video mid-build, a campaign site the client loved but never launched. Every project teaches you something — usually that the brief was wrong.",
		'When I\'m not shipping code I\'m somewhere in the mountains with a camera, chasing light and trying not to overthink the composition.'
	],
	portrait: '/isaac.webp',
	portraitAlt: 'Isaac Solomon smiling, wearing a dark green shirt, greenery behind him'
};

/** Wordmark strip in About — swap entries for inline SVG logos if you get brand assets */
export const clients = [
	'Mivi',
	'Godrej Foundation',
	'Keus',
	'Vibrant Living',
	'WOW Club',
	'Nova Rock',
	'SAUT',
	'Tomorrow Makers'
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
	/** Path to desktop screenshot — used for the editorial/magazine spread */
	desktopImage?: string;
	/** Highlighted in the magazine spread instead of the mosaic grid */
	featured?: boolean;
};

export const projectsIntro =
	'Client builds and side projects. Each one pushed the work further than the brief required.';

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
		image: '/projects/mivi.webp',
		desktopImage: '/projects/mivi-desktop.webp',
		caseStudy: '/writing/mivi',
		featured: true
	},
	{
		title: 'SAUT',
		year: '2019 – 2023',
		category: 'EdTech · LMS',
		description:
			'Four years building a Learning Management System for special educators teaching children with Down syndrome — from Vue.js to SvelteKit, from solo frontend dev to product manager. Bilingual Arabic/English with a live RTL toggle, offline-first assessments, and a drag-and-drop worksheet builder that prints pixel-perfect A4.',
		tags: ['SvelteKit', 'Vue.js', 'Product Management', 'RTL / LTR'],
		href: 'https://saut-website-demo.able.do',
		theme: 'dark',
		visual: 'image',
		frameLabel: 'saut-lms.com',
		image: '/projects/saut/hero-lms-rtl.webp',
		desktopImage: '/projects/saut/landing-hero-devices-right-to-left.webp',
		caseStudy: '/writing/saut',
		featured: true
	},
	{
		title: 'Keus',
		year: '2024',
		category: 'Smart Home',
		description:
			'Scroll-driven animation site for India\'s fastest-growing premium smart home company. Built with 11ty and GSAP — pivoted from image-sequence scrubbing to a video pause-and-play approach after the initial POC produced 300-500 frames per animation across ten sections.',
		tags: ['11ty', 'GSAP', 'Scroll Animation', 'Performance'],
		href: 'https://www.keus.in',
		theme: 'dark',
		visual: 'image',
		frameLabel: 'keus.in',
		image: '/projects/keus.webp',
		desktopImage: '/projects/keus-desktop.webp',
		caseStudy: '/writing/keus'
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
		image: '/projects/vibrant-living.webp',
		desktopImage: '/projects/vibrant-living-desktop.webp'
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
		image: '/projects/aap.webp',
		desktopImage: '/projects/aap-desktop.webp'
	},
	{
		title: 'WOW Club',
		year: '2018',
		category: 'Travel',
		description:
			"My first client project — built the entire frontend for Women On Wanderlust, an exclusive travel club for women. HTML, SCSS and JS from scratch. Came back years later to build ~65% of the frontend for their 20th anniversary revamp.",
		tags: ['HTML / SCSS', 'JavaScript', 'UI Engineering', 'Revamp'],
		href: 'https://www.wowclub.com',
		theme: 'light',
		visual: 'image',
		frameLabel: 'wowclub.com',
		image: '/projects/wowclub.webp',
		desktopImage: '/projects/wowclub-desktop.webp'
	},
	{
		title: 'Nova Rock Tools',
		year: '2025',
		category: 'B2B / Industrial',
		description:
			'Bilingual product site for a Lima-based DTH drilling equipment company. DTH hammers with Laser Cladding wear protection, tri-cone bits with configurable skirt and circulation options, and DHD/QL-compatible drill bits — all catalogued with technical specs, ISO 9001/14001/45001 certification callouts, and a WhatsApp inquiry flow pre-filled per product. SvelteKit static, Cloudflare Pages.',
		tags: ['SvelteKit', 'i18n', 'B2B', 'Static / Cloudflare'],
		href: 'https://www.novarocktools.com',
		theme: 'light',
		visual: 'image',
		frameLabel: 'novarocktools.com',
		image: '/projects/novarock.webp',
		desktopImage: '/projects/novarock-desktop.webp',
		caseStudy: '/writing/novarock'
	},
	{
		title: 'Godrej Foundation',
		year: '2024',
		category: 'Philanthropy',
		description:
			'Website and custom CMS for India\'s oldest philanthropic trust. SvelteKit + Tailwind, built twice — once before and once after Godrej\'s full corporate rebrand.',
		tags: ['SvelteKit', 'Tailwind', 'Custom CMS', 'Rebrand'],
		href: 'https://www.godrejfoundation.com',
		theme: 'light',
		visual: 'image',
		frameLabel: 'godrejfoundation.com',
		image: '/projects/godrej.webp',
		desktopImage: '/writing/godrej/hero.webp',
		caseStudy: '/writing/godrej',
		featured: true
	},
	{
		title: 'Tomorrow Makers',
		year: '2026',
		category: 'Philanthropy · EdTech',
		description:
			'National talent platform for Godrej Foundation — identifies and supports high-potential students from disadvantaged backgrounds across four pathways. SvelteKit on Cloudflare, with WhatsApp onboarding and 11-language assessment support.',
		tags: ['SvelteKit', 'Tailwind', 'Cloudflare', 'EdTech'],
		href: 'https://www.tomorrow-makers.in',
		theme: 'light',
		visual: 'image',
		frameLabel: 'tomorrow-makers.in',
		image: '/projects/tomorrow-makers.webp',
		desktopImage: '/writing/tomorrow-makers/hero.webp',
		caseStudy: '/writing/tomorrow-makers',
		featured: true
	}
];

export type Article = {
	title: string;
	description: string;
	href: string;
	/** e.g. 'Case Study · Mivi' */
	tag: string;
	readingTime: string;
	year: string;
};

export const writingIntro = {
	plain: 'Notes from',
	accent: 'the build.',
	note: 'Case studies and essays — what actually happened on each project, including the parts that went sideways.'
};

/** Ordered for the homepage & /writing index — strongest pieces first */
export const writing: Article[] = [
	{
		title: 'Four Years, Two Frameworks, One Mission',
		description:
			'An LMS for special educators teaching children with Down syndrome — Vue to SvelteKit, bilingual RTL/LTR, and a 5-month rewrite of a live product.',
		href: '/writing/saut',
		tag: 'Case Study · SAUT',
		readingTime: '7 min',
		year: '2019–23'
	},
	{
		title: 'Wearing Three Hats — Frontend Dev, PM, Designer',
		description:
			'How four years on one product turned a frontend developer into a product manager and emergency UI designer — and why each hat made the others better.',
		href: '/writing/saut/three-hats',
		tag: 'Essay · SAUT',
		readingTime: '7 min',
		year: '2023'
	},
	{
		title: 'Shipping at Launch Speed',
		description:
			"India's biggest audio brand, 3–4 product launches a day, a platform migration mid-flight — and the design system that emerged from the pressure.",
		href: '/writing/mivi',
		tag: 'Case Study · Mivi',
		readingTime: '6 min',
		year: '2018–'
	},
	{
		title: 'The Scroll Problem',
		description:
			'Scroll-driven animation for a premium smart home brand — why image-sequence scrubbing failed at 300–500 frames a section, and the video pivot that saved it.',
		href: '/writing/keus',
		tag: 'Case Study · Keus',
		readingTime: '7 min',
		year: '2024'
	},
	{
		title: 'The Worksheet Builder — A Design Tool Inside an LMS',
		description:
			'A drag-and-drop canvas for special educators to build pixel-perfect printable A4 worksheets — flashcards, shapes and multiple artboards, in a browser.',
		href: '/writing/saut/worksheet-builder',
		tag: 'Deep Dive · SAUT',
		readingTime: '6 min',
		year: '2022'
	},
	{
		title: 'Building Without a Brief',
		description:
			'A four-word brief turned into a static, bilingual, WhatsApp-first site for a Lima mining tools company — no designer, no mockups, no brand guide.',
		href: '/writing/novarock',
		tag: 'Case Study · Nova Rock',
		readingTime: '8 min',
		year: '2025'
	},
	{
		title: 'Every Child Carries a Spark',
		description:
			'The national talent platform helping Godrej Foundation find and support high-potential students — WhatsApp onboarding, 11 languages, four pathways.',
		href: '/writing/tomorrow-makers',
		tag: 'Case Study · Tomorrow Makers',
		readingTime: '6 min',
		year: '2026'
	},
	{
		title: 'Building (and Rebuilding) for Godrej Foundation',
		description:
			"A website and CMS for India's oldest philanthropic trust — built once, then rebuilt from scratch when the entire Godrej identity changed mid-project.",
		href: '/writing/godrej',
		tag: 'Case Study · Godrej',
		readingTime: '5 min',
		year: '2024'
	}
];

/**
 * Homepage-only note for the Writing strip. The case studies are reachable from
 * the project cards, so the homepage highlights the essays & deep dives instead.
 */
export const writingHomeNote =
	'The case studies live with each project above. These are the essays and deep dives that came out of them.';

/**
 * PLACEHOLDER QUOTES — replace with real ones as they come in.
 * Swap quote / name / role; the layout handles any length.
 */
export const testimonialsIntro = {
	plain: 'Proof from',
	accent: 'the work.',
	note: 'Not a wall of polished review cards. The recurring signal from messy builds: pace, clarity and care after launch.'
};

export const testimonials = [
	{
		quote:
			'Isaac is the developer you hand the impossible deadline to. He asks the right questions on day one, pushes back where it matters, and then quietly ships something better than the brief.',
		name: 'Full Name',
		role: 'Project Manager, Able.do'
	},
	{
		quote:
			'We came with four words and no designs. Isaac turned that into a bilingual site our customers actually use — and explained every decision along the way in language we could follow.',
		name: 'Full Name',
		role: 'Founder, Nova Rock'
	},
	{
		quote:
			'What stands out is the care after launch. Nothing was thrown over the wall — he stayed with the product, tuned the details, and left us with a system our own team can run.',
		name: 'Full Name',
		role: 'Client, 3 Sided Coin'
	}
];

export const experienceHeading = {
	plain: 'A yearly snapshot of',
	accent: 'my creative growth'
};

export const experience = [
	{
		from: '2026',
		to: 'Now',
		role: 'Independent Developer',
		company: 'Freelance (Part-time)',
		description:
			'Side projects and freelance work alongside the day job — bilingual B2B sites, static builds on Cloudflare, and the odd experiment that never ships.'
	},
	{
		from: '2018',
		to: 'Now',
		role: 'Frontend Developer',
		company: 'Able.do',
		description:
			'Eight years building and shipping client products — e-commerce platforms, custom CMS systems, component libraries and design systems. Led the frontend for Mivi, Vibrant Living and a dozen other builds from first commit to production.'
	},
	{
		from: '2016',
		to: '2017',
		role: 'Developer (Intern)',
		company: 'Uncommon',
		description:
			'Learned the craft the honest way — code reviews, broken builds and very patient mentors. Left the internship knowing why things work, not just that they do.'
	}
];

export const photographyIntro = {
	plain: 'Capture',
	accent: 'the moment.',
	note: '35mm & digital — places, people and light. A small selection, updated whenever I remember to.'
};

export const photos = [
	{ src: '/photos/01-silk-route.jpg', alt: 'Snow-capped Kanchenjunga range rising above clouds and blue ridges', caption: 'Above the Clouds — Sikkim', w: 1600, h: 1200, location: 'Sikkim', place: 'Above the Clouds', description: 'Peaks breaking through the cloud line. Sikkim gives you these views where the mountains feel like they belong to a different planet.' },
	{ src: '/photos/02-sunrise-peaks.jpg', alt: 'Golden sunrise over snow-capped Kedarkantha peak', caption: 'First Light — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'First Light', description: 'That narrow window when the sun hits the snow and everything goes gold. Five minutes later it\'s gone.' },
	{ src: '/photos/03-himalayan-peaks.jpg', alt: 'Mountain ridges glowing warm orange at sunset from Kedarkantha base camp', caption: 'Evening Light — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'Evening Light', description: 'The view from base camp as the sun drops. Layered ridges catching the last light — every minute the colour shifts.' },
	{ src: '/photos/04-kanchenjunga.jpg', alt: 'Sunrise over snow-covered summit with mountains stretching to the horizon', caption: 'Summit Sunrise — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Summit Sunrise', description: 'The sun cresting over the ridge at twelve thousand feet. You stand there in the cold and nothing else matters.' },
	{ src: '/photos/05-mountain-ridges.jpg', alt: 'Layered mountain ridges receding into mist at golden hour', caption: 'Ridgelines — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Ridgelines', description: 'Layer after layer of ridges dissolving into haze. The depth never gets old.' },
	{ src: '/photos/06-misty-layers.jpg', alt: 'Misty mountain layers with a bird silhouette against soft light', caption: 'Misty Layers — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Misty Layers', description: 'A single bird cutting through the mist between mountain layers. Painterly, almost unreal.' },
	{ src: '/photos/07-mountain-village.jpg', alt: 'Small village at the base of a massive cloud-shrouded mountain peak', caption: 'Lahaul Valley — Himachal', w: 1600, h: 1200, location: 'Himachal Pradesh', place: 'Lahaul Valley', description: 'A village dwarfed by rock and cloud. The scale of these places doesn\'t come through in photos — but this one gets close.' },
	{ src: '/photos/08-qutub-arch.jpg', alt: 'Ornate concentric stone dome ceiling inside Qutub Minar complex, Delhi', caption: 'Qutub Minar — Delhi', w: 1600, h: 1200, location: 'Delhi', place: 'Qutub Minar', description: 'Looking straight up inside the Qutub complex. Concentric rings of carved stone spiralling into shadow.' },
	{ src: '/photos/09-qutub-moon.jpg', alt: 'Starry night sky over snow-capped mountain silhouettes from Sankri village', caption: 'Starlight — Sankri', w: 1600, h: 738, location: 'Uttarakhand', place: 'Starlight', description: 'Mountains and stars from Sankri village. No light pollution, no noise — just the sky doing its thing.' },
	{ src: '/photos/10-tents-stars.jpg', alt: 'Orange camping tents glowing in snow under a starry night sky', caption: 'Base Camp — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Base Camp', description: 'Tents glowing orange in the snow, stars overhead. Minus ten outside but the light makes it feel warm.' },
	{ src: '/photos/11-streetlight.jpg', alt: 'Empty Cavalry Barracks railway station platform at night with glowing streetlights', caption: 'After Hours — Alwal', w: 1600, h: 1200, location: 'Alwal', place: 'After Hours', description: 'Cavalry Barracks station after the last train. Metal, light, and silence — the city pauses here.' },
	{ src: '/photos/12-balloon-fog.jpg', alt: 'Tree silhouettes against a warm golden sunset sky over mountain ridges', caption: 'Golden Hour — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Golden Hour', description: 'Trees turned to silhouettes as the sun drops behind the ridge. The warmest five minutes of the day.' },
	{ src: '/photos/13-trees-fog.jpg', alt: 'Tall pine trees disappearing into thick fog enroute to Darjeeling', caption: 'Into the Fog — Darjeeling', w: 1600, h: 1200, location: 'Darjeeling', place: 'Into the Fog', description: 'Somewhere between Bagdogra and Darjeeling. Trees dissolving into nothing — the deeper you go, the quieter it gets.' },
	{ src: '/photos/14-misty-valley.jpg', alt: 'A winding road through dense deodar forest near Naggar, Himachal Pradesh', caption: 'Forest Road — Naggar', w: 1600, h: 1200, location: 'Naggar', place: 'Forest Road', description: 'A road disappearing into deodar forest near Naggar. Green on green, the kind of drive where you forget where you\'re going.' },
	{ src: '/photos/15-fisherman-ooty.jpg', alt: 'Misty valley with terraced fields and a village lit by morning sun', caption: 'Morning Light — Uttarakhand', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Morning Light', description: 'Sun cutting through the haze into the valley. The village waking up below, fields glowing green.' },
	{ src: '/photos/16-ship-ocean.jpg', alt: 'A lone ship on a vast deep-blue ocean', caption: 'Disconnect — Vizag', w: 1600, h: 1200, location: 'Vizag', place: 'Deep Blue', description: 'Miles from the shoreline, miles from the noise. Just a ship and the horizon.' },
	{ src: '/photos/17-cavalry-stairs.jpg', alt: 'Cavalry Barracks railway platform at night with red digital clock and blue-lit tracks', caption: 'Platform 2 — Cavalry Barracks', w: 1600, h: 1200, location: 'Alwal', place: 'Platform 2', description: 'Cavalry Barracks at midnight. The red clock, the empty platform, the blue glow off the tracks.' },
	{ src: '/photos/18-taj-mahal.jpg', alt: 'Taj Mahal from the gardens with trees framing the dome', caption: 'Taj Mahal — Agra', w: 1600, h: 1200, location: 'Agra', place: 'Taj Mahal', description: 'Everyone photographs it, but standing in front of it still hits you. The symmetry, the scale, the quiet.' },
	{ src: '/photos/19-summit-golden.jpg', alt: 'Group of trekkers at a mountain summit during golden hour', caption: 'Summit — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'The Summit', description: 'Golden hour at the top. Twelve thousand feet, frozen fingers, and the best light of the trip.' },
	{ src: '/photos/20-tea-plantations.jpg', alt: 'Lush green tea plantation rows stretching across rolling hills in Munnar', caption: 'Tea Country — Munnar', w: 1600, h: 1200, location: 'Munnar', place: 'Tea Country', description: 'Rows of green running over every hill. Munnar\'s tea estates are a different shade of India.' }
];

export const socials = [
	{ label: 'GitHub', href: 'https://github.com/Isaacsol211' },
	{ label: 'Instagram', href: 'https://instagram.com/isaac_sol_211' }
];

export const connect = {
	eyebrow: 'Have an idea? A role? A roll of film?',
	blurb:
		'I am always happy to talk about interesting work, weird side projects or where to get good coffee. The fastest way to reach me:'
};
