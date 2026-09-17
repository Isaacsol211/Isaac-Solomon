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
	/** Display headline. Says the role, not just "developer". */
	heroHeadline: 'frontend developer',
	/** The positioning line under the headline — scope, not adjectives. */
	heroLead:
		'Nine years building commerce storefronts, custom CMS platforms and multilingual products — for the teams who have to run them after launch.',
	// Used for <title>, meta description and social cards
	title: 'Isaac Solomon — Frontend Developer',
	description:
		'Frontend developer at Able.do building commerce sites, content systems and multilingual products. Selected projects, technical writing and photography.',
	url: 'https://isaacsolomon.dev'
};

export const nav = [
	{ label: 'Work', href: '#projects' },
	{ label: 'About', href: '#about' },
	{ label: 'Experience', href: '#experience' },
	{ label: 'Services', href: '#services' },
	{ label: 'Writing', href: '#writing' },
	{ label: 'Photography', href: '/photography' }
];

/** Service names — expanded with details in `serviceDetails` below */
export const services = [
	'E-commerce storefronts',
	'Custom CMS builds',
	'Scroll-driven animation',
	'QA automation',
	'Long-term product work'
];

export const servicesIntro = {
	plain: 'what I do,',
	accent: 'end to end.'
};

/**
 * How the work is actually taken on, next to the list of what it is. Every fact
 * here is already published in `experience` below — full-time at Able.do since
 * 2017, freelance part-time alongside it since 2026 — and nothing is added
 * about availability beyond the status the hero already shows.
 */
export const servicesEngagement = {
	note: 'Most of this was built at Able.do, where I have been a frontend developer since 2017. Since 2026 I also take freelance work part-time, alongside that role — so a project starts with a conversation about scope and timing.',
	linkLabel: 'Send a scope',
	href: '#connect'
};

export type Service = {
	title: string;
	summary: string;
	items: string[];
	proof: { label: string; href: string };
};

export const serviceDetails: Service[] = [
	{
		title: 'E-commerce storefronts',
		summary:
			'Storefronts where product pages, carts and mailers come from one component system, so launch days do not need a rebuild.',
		items: [
			'Product & category pages',
			'Live carts and checkout flows',
			'Transactional mailers'
		],
		proof: { label: 'Mivi — built for daily product launches', href: '/writing/mivi' }
	},
	{
		title: 'Custom CMS builds',
		summary:
			'Content models and editor workflows built around the team that maintains them, so a rebrand changes presentation without moving data.',
		items: [
			'Content modelling',
			'Editor-friendly component systems',
			'Design-system enforcement'
		],
		proof: { label: 'Godrej — a rebrand without content migration', href: '/writing/godrej' }
	},
	{
		title: 'Scroll-driven animation',
		summary:
			'Scroll choreography that stays smooth on mid-range phones — GSAP, view transitions, video scrubbing.',
		items: [
			'GSAP & ScrollTrigger',
			'Video pause-and-play pipelines',
			'Reduced-motion fallbacks'
		],
		proof: { label: 'Keus — adapting scroll stories to real screens', href: '/writing/keus' }
	},
	{
		title: 'QA automation',
		summary:
			'Automated checks across web, iOS and Android that run on request and leave a report someone can act on.',
		items: [
			'Web, iOS and Android checks',
			'Flake isolation and retry policy',
			'Regression reports with evidence'
		],
		proof: { label: 'Current QA work at Able.do', href: '#experience' }
	},
	{
		title: 'Long-term product work',
		summary:
			'Years-long partnerships — from first commit to product management, across rewrites and rebrands.',
		items: [
			'Framework migrations',
			'i18n / RTL support',
			'Roadmap and release planning'
		],
		proof: { label: 'SAUT — four years, six releases', href: '/writing/saut' }
	}
];

export const about = {
	lead: 'Nine years turning designs into products',
	leadAccent: 'that teams keep running long after launch.',
	paragraphs: [
		"I'm a frontend developer at Able.do. Most of what I build is commerce storefronts, content systems and multilingual products — including India's largest audio brand's storefront and a national talent platform that assesses students in eleven languages.",
		'What I am good at is the part after launch: content models that survive a rebrand, component systems a non-technical team runs without me, and scroll-driven work that is budgeted and measured like any other asset rather than bolted on at the end.',
		'To work with, I am straightforward about constraints. I would rather test a brief against a real device and a real content editor early than discover the limit late, and I write down what I find — several of those investigations are in the writing below.',
		'Away from the screen I am usually in the mountains with a camera.'
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
	/** Live URL. Omit when there is nothing public to link to. */
	href?: string;
	/** Shown instead of a link when the work never shipped, e.g. 'Unreleased'. */
	status?: string;
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
	/**
	 * 800px-wide copy of the image the featured spread renders, for srcset.
	 * Generated by scripts/generate-image-variants.mjs and committed. Optional
	 * on purpose: a project without one falls back to a plain src rather than
	 * pointing srcset at a file that does not exist.
	 */
	previewSmall?: string;
	/**
	 * True intrinsic width of `desktopImage`, paired with previewSmall for the
	 * srcset `w` descriptors. These files are not a uniform size (1440-2880),
	 * and a descriptor that misstates the width makes the browser pick badly.
	 */
	previewWidth?: number;
	/**
	 * What I did on it, in one factual line. Scope and ownership, taken from the
	 * case study's own account — never widened. Where the article says a team
	 * made a call, the line says the team made it.
	 */
	role?: string;
	/**
	 * The call the project turned on, paired with `outcome` as its consequence.
	 * Clients read this for scope and handover, hiring managers for judgment;
	 * both were previously having to find it inside a paragraph.
	 */
	decision?: string;
	/**
	 * One verifiable result, shown on the featured card. Every value here is
	 * lifted from that project's own case study rather than written fresh —
	 * a card is the wrong place to introduce a number the article cannot back.
	 */
	outcome?: string;
	/**
	 * Team credit shown with the outcome. Only names already published in that
	 * project's case study — nothing is inferred. Mivi has none because the
	 * article credits no one beyond Able.do.
	 */
	credits?: string;
	/**
	 * Composition for the featured spread, each distinct within the same system:
	 *  - 'stage'     the hero's second act: broad dark image, name set large (Mivi)
	 *  - 'bilingual' quiet and precise: text beside two tall interface frames (SAUT)
	 *  - 'pair'      editorial before/after: two frames side by side, text beneath (Godrej)
	 *  - 'portrait'  asymmetric editorial: near-square image beside text, wide image under it (TM)
	 * Unset falls back to the split image/text layout.
	 */
	featuredLayout?: 'stage' | 'bilingual' | 'pair' | 'portrait';
	/**
	 * Frames for the composition, in order. Alt text and captions are lifted
	 * from that project's case study; `small` is the 800w variant produced by
	 * scripts/generate-image-variants.mjs, and width/height are the originals'.
	 */
	gallery?: {
		src: string;
		small: string;
		width: number;
		height: number;
		alt: string;
		caption: string;
		/**
		 * Show a region of the image instead of the whole: the image is drawn at
		 * `width` of its frame and shifted by x/y (percent of the image). A way to
		 * point at one feature in an asset that already exists.
		 */
		crop?: { width: string; x: string; y: string };
	}[];
	/** Highlighted in the magazine spread instead of the mosaic grid */
	featured?: boolean;
};

export const projectsIntro =
	'Client builds and side projects. Each one pushed the work further than the brief required.';

export const projects: Project[] = [
	{
		title: 'Mivi',
		year: '2018 – 2022',
		category: 'E-Commerce',
		description:
			"Custom storefront for India's first audio manufacturing brand.",
		tags: ['Custom CMS', 'E-Commerce', 'UI Engineering', 'Mailers'],
		href: 'https://www.mivi.in',
		theme: 'dark',
		visual: 'image',
		frameLabel: 'mivi.in',
		image: '/projects/mivi.webp',
		desktopImage: '/projects/mivi-desktop.webp',
		previewSmall: '/projects/mivi-desktop-800.webp',
		previewWidth: 1600,
		caseStudy: '/writing/mivi',
		role: 'Frontend developer from the first build to the platform migration — storefront UI, live cart and transactional mailers.',
		decision: 'Built componentised from the start under three to four product launches a day, so the design system came out of the launch cadence instead of a later redesign.',
		outcome: '100,000+ customers and 10,000+ orders managed natively after the migration.',
		featuredLayout: 'stage',
		featured: true
	},
	{
		title: 'Tomorrow Makers',
		year: '2026',
		category: 'Philanthropy · EdTech',
		description:
			'National talent platform for Godrej Foundation.',
		tags: ['SvelteKit', 'Tailwind', 'Cloudflare', 'EdTech'],
		href: 'https://www.tomorrow-makers.in',
		theme: 'light',
		visual: 'image',
		frameLabel: 'tomorrow-makers.in',
		image: '/projects/tomorrow-makers.webp',
		desktopImage: '/writing/tomorrow-makers/hero.webp',
		previewSmall: '/writing/tomorrow-makers/hero-800.webp',
		previewWidth: 2880,
		caseStudy: '/writing/tomorrow-makers',
		role: 'Frontend developer — assessments, onboarding integrations and partner routing, on SvelteKit and Cloudflare.',
		decision: 'Onboarding runs through WhatsApp as well as the website, meeting students in a channel they already use.',
		outcome: 'Four student pathways. Assessment in 11 languages for Classes 6–7.',
		credits: 'Design by 3 Sided Coin.',
		featuredLayout: 'portrait',
		gallery: [
			{
				src: '/writing/tomorrow-makers/mission.webp',
				small: '/writing/tomorrow-makers/mission-800.webp',
				width: 1440,
				height: 1350,
				alt: "We're trying to change that — mission statement with editorial photography of classrooms",
				caption: 'Mission page'
			},
			{
				src: '/writing/tomorrow-makers/stats.webp',
				small: '/writing/tomorrow-makers/stats-800.webp',
				width: 1440,
				height: 800,
				alt: 'India has never lacked talent — what we have lacked is equal access to opportunity',
				caption: 'Opening statement'
			}
		],
		featured: true
	},
	{
		title: 'SAUT',
		year: '2019 – 2023',
		category: 'EdTech · LMS',
		description:
			'Learning platform for special educators teaching children with Down syndrome.',
		tags: ['SvelteKit', 'Vue.js', 'Product Management', 'RTL / LTR'],
		href: 'https://saut-website-demo.able.do',
		theme: 'dark',
		visual: 'image',
		frameLabel: 'saut-lms.com',
		image: '/projects/saut/hero-lms-rtl.webp',
		desktopImage: '/projects/saut/landing-hero-devices-right-to-left.webp',
		previewSmall: '/projects/saut/landing-hero-devices-right-to-left-800.webp',
		previewWidth: 1605,
		caseStudy: '/writing/saut',
		role: 'Day one to handoff across four years — frontend on V1, then product manager and the person extending the design system on V2.',
		decision: 'V1 copied curriculum into every student record, so V2 was rebuilt on one central database of linked references — a five-month rewrite rather than an incremental migration.',
		outcome: 'A 65-feature roadmap shipped across six releases, through a full framework rewrite.',
		credits: 'Design by Tropics (Zubin). Built with Surajith on the functional side.',
		featuredLayout: 'bilingual',
		gallery: [
			{
				src: '/projects/saut/hero-lms-rtl.webp',
				small: '/projects/saut/hero-lms-rtl-800.webp',
				width: 1544,
				height: 1808,
				alt: 'SAUT learning management system in Arabic, right-to-left layout: skills grid, assessment goals, student progress and a session timeline',
				caption: 'LMS — Arabic, right-to-left'
			},
			{
				/* The same asset, cropped to the assessment goal card and its
				   achieved / not-achieved controls — the feature, not the presentation. */
				src: '/projects/saut/hero-lms-rtl.webp',
				small: '/projects/saut/hero-lms-rtl-800.webp',
				width: 1544,
				height: 1808,
				alt: 'Detail of the SAUT assessment: a skill goal in Arabic marked achieved on 24 October 2022',
				caption: 'Assessment — a goal marked achieved',
				crop: { width: '238%', x: '-58%', y: '-12%' }
			}
		],
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
			'A static campaign site for the Aam Aadmi Party — editorial, urgent, built to mobilise. Strong typographic hierarchy, video-first news sections and a volunteer sign-up flow. Approved by the party, never released.',
		tags: ['Static Site', 'Editorial', 'HTML / CSS', 'UI Design'],
		status: 'Unreleased',
		theme: 'light',
		visual: 'image',
		frameLabel: 'AAP — campaign concept',
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
			'Website and custom CMS for India\'s oldest philanthropic trust, built in SvelteKit and Tailwind.',
		tags: ['SvelteKit', 'Tailwind', 'Custom CMS', 'Rebrand'],
		href: 'https://www.godrejfoundation.com',
		theme: 'light',
		visual: 'image',
		frameLabel: 'godrejfoundation.com',
		image: '/projects/godrej.webp',
		desktopImage: '/writing/godrej/hero.webp',
		previewSmall: '/writing/godrej/hero-800.webp',
		previewWidth: 1440,
		caseStudy: '/writing/godrej',
		role: 'Frontend developer — the whole frontend from their designs, wired to a custom CMS built for their editors.',
		decision: 'Modelled the CMS around the foundation’s content, with presentation kept separate from the records its editors maintain.',
		outcome: 'A full corporate rebrand, with zero content migration.',
		credits: 'Design system by 3 Sided Coin.',
		featuredLayout: 'pair',
		gallery: [
			{
				src: '/writing/godrej/v1-desktop.webp',
				small: '/writing/godrej/v1-desktop-800.webp',
				width: 1440,
				height: 900,
				alt: 'Godrej Foundation v1 — old Godrej branding with banyan tree hero',
				caption: 'v1 — before the rebrand'
			},
			{
				src: '/writing/godrej/v2-desktop.webp',
				small: '/writing/godrej/v2-desktop-800.webp',
				width: 1440,
				height: 900,
				alt: 'Godrej Foundation v2 — new Godrej branding with Crafting a Prosperous Tomorrow hero',
				caption: 'v2 — after, on the same content model'
			}
		],
		featured: true
	}
];

export type Article = {
	title: string;
	description: string;
	href: string;
	/** e.g. 'Case Study · Mivi' */
	tag: string;
	/**
	 * What the piece is about, in the words someone would search for. Several of
	 * these titles are literary — "The Scroll Problem", "Every Child Carries a
	 * Spark" — and a reader scanning the index cannot tell which one is about
	 * performance and which is about eleven languages. Taken from what the
	 * article actually covers, not invented to widen its reach.
	 */
	subject: string;
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
		subject: 'Framework migration',
		readingTime: '7 min',
		year: '2019–23'
	},
	{
		title: 'Wearing Three Hats — Frontend Dev, PM, Designer',
		description:
			'How four years on one product turned a frontend developer into a product manager, and into the person extending the design system when no designer was on it — and why each role made the others better.',
		href: '/writing/saut/three-hats',
		tag: 'Essay · SAUT',
		subject: 'Product ownership',
		readingTime: '7 min',
		year: '2023'
	},
	{
		title: 'Shipping at Launch Speed',
		description:
			"India's biggest audio brand, 3–4 product launches a day, a platform migration mid-flight — and the design system that emerged from the pressure.",
		href: '/writing/mivi',
		tag: 'Case Study · Mivi',
		subject: 'Design systems',
		readingTime: '6 min',
		year: '2018–22'
	},
	{
		title: 'The Scroll Problem',
		description:
			'Scroll-driven animation for a premium smart home brand — why image-sequence scrubbing failed at 300–500 frames a section, and the video pivot that saved it.',
		href: '/writing/keus',
		tag: 'Case Study · Keus',
		subject: 'Scroll performance',
		readingTime: '7 min',
		year: '2024'
	},
	{
		title: 'The Worksheet Builder — A Design Tool Inside an LMS',
		description:
			'A drag-and-drop canvas for special educators to build pixel-perfect printable A4 worksheets — flashcards, shapes and multiple artboards, in a browser.',
		href: '/writing/saut/worksheet-builder',
		tag: 'Deep Dive · SAUT',
		subject: 'Editor tooling',
		readingTime: '6 min',
		year: '2022'
	},
	{
		title: 'Building Without a Brief',
		description:
			'A four-word brief turned into a static, bilingual, WhatsApp-first site for a Lima mining tools company — no designer, no mockups, no brand guide.',
		href: '/writing/novarock',
		tag: 'Case Study · Nova Rock',
		subject: 'Product definition',
		readingTime: '8 min',
		year: '2025'
	},
	{
		title: 'Every Child Carries a Spark',
		description:
			'The national talent platform helping Godrej Foundation find and support high-potential students — WhatsApp onboarding, 11 languages, four pathways.',
		href: '/writing/tomorrow-makers',
		tag: 'Case Study · Tomorrow Makers',
		subject: 'Multilingual interfaces',
		readingTime: '6 min',
		year: '2026'
	},
	{
		title: 'Building (and Rebuilding) for Godrej Foundation',
		description:
			"A website and CMS for India's oldest philanthropic trust — built once, then rebuilt from scratch when the entire Godrej identity changed mid-project.",
		href: '/writing/godrej',
		tag: 'Case Study · Godrej',
		subject: 'Content architecture',
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
 * Compact craft interlude between the second and third featured projects.
 * The fragments are projects that otherwise only appear in the list, so the
 * interlude gives them a face without repeating imagery from the blocks
 * around it. Each links to its work.
 */
export const craftInterlude = {
	statement: 'Built to launch. Built to keep running.',
	fragments: [
		{
			src: '/projects/keus-desktop-800.webp',
			width: 1440,
			height: 900,
			alt: 'Keus smart home site',
			label: 'Keus',
			year: '2024',
			href: '/writing/keus'
		},
		{
			src: '/projects/novarock-desktop-800.webp',
			width: 1440,
			height: 900,
			alt: 'Nova Rock Tools bilingual product site',
			label: 'Nova Rock Tools',
			year: '2025',
			href: '/writing/novarock'
		},
		{
			src: '/projects/vibrant-living-desktop-800.webp',
			width: 1600,
			height: 1000,
			alt: 'Vibrant Living brand and commerce site',
			label: 'Vibrant Living',
			year: '2024',
			href: 'https://vibrantliving.in'
		}
	]
};

export const testimonialsIntro = {
	plain: 'Proof from',
	accent: 'the work.',
	note: 'Not a wall of polished review cards. The recurring signal from messy builds: pace, clarity and care after launch.'
};

/**
 * Real, approved quotes only. The section is hidden while this is empty —
 * see src/routes/+page.svelte. Previous entries were unverified placeholders
 * attributed to named businesses and were removed on 2026-09-15.
 */
export const testimonials: { quote: string; name: string; role: string }[] = [];

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
		from: '2017',
		to: 'Now',
		role: 'Frontend Developer',
		company: 'Able.do',
		description:
			'Nine years building and shipping client products — e-commerce platforms, custom CMS systems, component libraries and design systems. Led the frontend for Mivi, Vibrant Living and a dozen other builds from first commit to production. Since mid-2026 the work has widened into QA automation, the processes that keep delivery accountable, and technical writing.'
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

/**
 * Series are curated by subject, not by file order. The page groups on this
 * field, so a frame moves between sections by changing one word here. The
 * mountain strip used to be photos 0-9, which swept Delhi architecture into a
 * section titled "mountain weather".
 */
export type PhotoSeries = 'Mountains' | 'After Dark' | 'Places';

/*
 * `w`/`h` are the dimensions the BROWSER decodes, which is not always what the
 * file stores: 16-ship-ocean.jpg is stored 1600x1200 with an EXIF orientation
 * flag, so it arrives 1200x1600 and is the one portrait frame in the archive.
 * These two numbers reserve the box before the image lands — get them wrong and
 * the layout jumps when it does.
 */
export const photos = [
	{ src: '/photos/01-silk-route.jpg', alt: 'Snow-capped Kanchenjunga range rising above clouds and blue ridges', caption: 'Above the Clouds — Sikkim', w: 1600, h: 1200, location: 'Sikkim', place: 'Above the Clouds', description: 'The Kanchenjunga range above the cloud line, with blue ridges running out below it.', series: 'Mountains' },
	{ src: '/photos/02-sunrise-peaks.jpg', alt: 'Golden sunrise over snow-capped Kedarkantha peak', caption: 'First Light — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'First Light', description: 'First sun on the snowfields under the Kedarkantha summit.', series: 'Mountains' },
	{ src: '/photos/03-himalayan-peaks.jpg', alt: 'Mountain ridges glowing warm orange at sunset from Kedarkantha base camp', caption: 'Evening Light — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'Evening Light', description: 'Layered ridges from the Kedarkantha base camp, holding the last of the sunset.', series: 'Mountains' },
	{ src: '/photos/04-kanchenjunga.jpg', alt: 'Sunrise over snow-covered summit with mountains stretching to the horizon', caption: 'Summit Sunrise — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Summit Sunrise', description: 'Sunrise from the Kedarkantha summit, ridges running out to the horizon.', series: 'Mountains' },
	{ src: '/photos/05-mountain-ridges.jpg', alt: 'Layered mountain ridges receding into mist at golden hour', caption: 'Ridgelines — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Ridgelines', description: 'Ridge behind ridge at golden hour, each one paler than the one in front.', series: 'Mountains' },
	{ src: '/photos/06-misty-layers.jpg', alt: 'Misty mountain layers with a bird silhouette against soft light', caption: 'Misty Layers — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Misty Layers', description: 'A bird crossing the gap between two mist-covered ridges.', series: 'Mountains' },
	{ src: '/photos/07-mountain-village.jpg', alt: 'Small village at the base of a massive cloud-shrouded mountain peak', caption: 'Lahaul Valley — Himachal', w: 1600, h: 1200, location: 'Himachal Pradesh', place: 'Lahaul Valley', description: 'A village at the foot of a peak in the Lahaul valley, the summit inside the cloud.', series: 'Mountains' },
	{ src: '/photos/08-qutub-arch.jpg', alt: 'Ornate concentric stone dome ceiling inside Qutub Minar complex, Delhi', caption: 'Qutub Minar — Delhi', w: 1600, h: 1200, location: 'Delhi', place: 'Qutub Minar', description: 'Looking straight up inside the Qutub complex — concentric rings of carved stone turning into shadow.', series: 'Places' },
	{ src: '/photos/09-qutub-moon.jpg', alt: 'Starry night sky over snow-capped mountain silhouettes from Sankri village', caption: 'Starlight — Sankri', w: 1600, h: 738, location: 'Uttarakhand', place: 'Starlight', description: 'Snow-capped ridges in silhouette under a full field of stars, from Sankri.', series: 'After Dark' },
	{ src: '/photos/10-tents-stars.jpg', alt: 'Orange camping tents glowing in snow under a starry night sky', caption: 'Base Camp — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Base Camp', description: 'Tents lit from the inside, on snow, under the stars at the Kedarkantha camp.', series: 'After Dark' },
	{ src: '/photos/11-streetlight.jpg', alt: 'Empty Cavalry Barracks railway station platform at night with glowing streetlights', caption: 'After Hours — Alwal', w: 1600, h: 1200, location: 'Alwal', place: 'After Hours', description: 'The empty platform at Cavalry Barracks, lit by the station lamps.', series: 'After Dark' },
	{ src: '/photos/12-balloon-fog.jpg', alt: 'Tree silhouettes against a warm golden sunset sky over mountain ridges', caption: 'Golden Hour — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Golden Hour', description: 'Trees in silhouette against the sky above the ridgeline at Kedarkantha.', series: 'Mountains' },
	{ src: '/photos/13-trees-fog.jpg', alt: 'Tall pine trees disappearing into thick fog enroute to Darjeeling', caption: 'Into the Fog — Darjeeling', w: 1600, h: 1200, location: 'Darjeeling', place: 'Into the Fog', description: 'Pine trees losing their outlines in fog, on the road up to Darjeeling.', series: 'Mountains' },
	{ src: '/photos/14-misty-valley.jpg', alt: 'A winding road through dense deodar forest near Naggar, Himachal Pradesh', caption: 'Forest Road — Naggar', w: 1600, h: 1200, location: 'Naggar', place: 'Forest Road', description: 'A road bending out of sight through deodar forest near Naggar.', series: 'Mountains' },
	{ src: '/photos/15-fisherman-ooty.jpg', alt: 'Misty valley with terraced fields and a village lit by morning sun', caption: 'Morning Light — Uttarakhand', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Morning Light', description: 'Morning sun reaching a terraced valley through the haze.', series: 'Places' },
	{ src: '/photos/16-ship-ocean.jpg', alt: 'A lone ship on a vast deep-blue ocean', caption: 'Disconnect — Vizag', w: 1200, h: 1600, location: 'Vizag', place: 'Deep Blue', description: 'A single ship on open water off Vizag, and nothing else in the frame.', series: 'Places' },
	{ src: '/photos/17-cavalry-stairs.jpg', alt: 'Cavalry Barracks railway platform at night with red digital clock and blue-lit tracks', caption: 'Platform 2 — Cavalry Barracks', w: 1600, h: 1200, location: 'Alwal', place: 'Platform 2', description: 'The red platform clock at Cavalry Barracks, and the blue light along the tracks.', series: 'After Dark' },
	{ src: '/photos/18-taj-mahal.jpg', alt: 'Taj Mahal from the gardens with trees framing the dome', caption: 'Taj Mahal — Agra', w: 1600, h: 1200, location: 'Agra', place: 'Taj Mahal', description: 'The Taj Mahal from the gardens, framed by the trees on the approach.', series: 'Places' },
	{ src: '/photos/19-summit-golden.jpg', alt: 'Group of trekkers at a mountain summit during golden hour', caption: 'Summit — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'The Summit', description: 'Trekkers on the Kedarkantha summit in the last of the golden hour.', series: 'Mountains' },
	{ src: '/photos/20-tea-plantations.jpg', alt: 'Lush green tea plantation rows stretching across rolling hills in Munnar', caption: 'Tea Country — Munnar', w: 1600, h: 1200, location: 'Munnar', place: 'Tea Country', description: 'Tea rows following the contours of the hills at Munnar.', series: 'Places' }
];

/** Copy for the photography page — one opening line, then the frames. */
export const photographyPage = {
	lead: 'Away from the screen. Photographs from the mountains, the road, and the hours in between.'
};

export const socials = [
	{ label: 'GitHub', href: 'https://github.com/Isaacsol211' },
	{ label: 'Instagram', href: 'https://instagram.com/isaac_sol_211' }
];

/**
 * The MCP server at /mcp — see src/routes/mcp/+server.ts.
 * Claude has no connector-install deep link, so the UI can only hand over
 * the command and the URL; `name` is what the server is called once added.
 */
export const mcp = {
	name: 'isaacsolomon',
	url: `${site.url}/mcp`,
	blurb:
		'This site runs a small MCP server. Point an AI agent at it and it can read my projects, my writing in full, my photography and my contact details directly — no scraping.'
};

export const connect = {
	eyebrow: 'Have an idea? A role? A roll of film?',
	blurb: 'Happy to talk about interesting work, side projects, or where to get good coffee.',
	/**
	 * One address, two routes. Both reach the same inbox — what differs is what
	 * is useful to send and where the supporting material already sits. Neither
	 * line claims anything about availability: the status in the hero says
	 * "open to new projects" and that is the only claim the site makes.
	 */
	routes: [
		{
			label: 'About a project',
			body: 'Send the scope, the team and the timing — that is usually enough to start.',
			linkLabel: 'What I take on',
			href: '#services'
		},
		{
			label: 'About a role',
			body: 'Send the team and the stack. What I did on each build is on every project above.',
			linkLabel: 'Experience',
			href: '#experience'
		}
	]
};
