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
		title: 'QA automation',
		summary:
			'Automated checks across web, iOS and Android that run on request and leave a report someone can act on.',
		items: [
			'Web, iOS simulator and Android emulator lanes',
			'Flake isolation and retry policy',
			'Deduplicated findings and regression tracking',
			'Reports with triage-ready evidence'
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
	lead: 'Nine years turning designs into products',
	leadAccent: 'that teams keep running long after launch.',
	paragraphs: [
		"I'm a frontend developer at Able.do, where I've led the build on everything from India's largest audio brand storefront to a national talent platform that screens students across eleven languages. I build interfaces teams can maintain and extend after launch — component systems non-technical teams manage themselves, commerce flows that hold up under real traffic, and scroll-driven animation that doesn't cost a Lighthouse score.",
		"The work I'm proudest of sits at the intersection of craft and constraint: a CMS whose content model carried straight through a corporate rebrand while the frontend was rebuilt around it, an animation-heavy site pivoted from image sequences to video mid-build, a campaign site that was approved and never released. The strongest solutions came from testing the brief against real users and real technical limits.",
		'Lately the work has widened. A subscription-meals admin platform taken fully mobile-responsive, then a sideways move into QA — automated checks across web, iOS and Android for a community platform, the programme that schedules them, and the TypeScript engine underneath. I write too: the draft of a technical white paper on human–agent work, and this site, which is an MCP server as much as a portfolio.',
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
			"Built the full storefront UI for India's first audio manufacturing brand, on a custom in-house CMS. Componentised from the ground up, with a live cart, transactional mailers, and product pages the marketing team updates without a developer.",
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
		outcome: '100,000+ customers and 10,000+ orders managed natively after the migration.',
		featured: true
	},
	{
		title: 'SAUT',
		year: '2019 – 2023',
		category: 'EdTech · LMS',
		description:
			'Four years on a learning platform for special educators teaching children with Down syndrome — Vue to SvelteKit, solo developer to product manager. Bilingual Arabic/English with a live RTL toggle, offline-first assessments, and a worksheet builder that prints pixel-perfect A4.',
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
		outcome: 'A 65-feature roadmap shipped across six releases, through a full framework rewrite.',
		credits: 'Design by Tropics (Zubin). Built with Surajith on the functional side.',
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
			'Website and custom CMS for India\'s oldest philanthropic trust, in SvelteKit and Tailwind. Built twice — the corporate rebrand landed mid-project — and the content model carried across so the foundation team never re-entered a thing.',
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
		outcome: 'A full corporate rebrand absorbed as a frontend rebuild, with zero content migration.',
		credits: 'Design system by 3 Sided Coin.',
		featured: true
	},
	{
		title: 'Tomorrow Makers',
		year: '2026',
		category: 'Philanthropy · EdTech',
		description:
			'National talent platform for Godrej Foundation, identifying and supporting high-potential students from disadvantaged backgrounds across four pathways. SvelteKit on Cloudflare, with WhatsApp onboarding and assessments in eleven languages.',
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
		outcome: 'Four student pathways, with the assessment for the youngest cohort (Classes 6–7) available in 11 languages.',
		credits: 'Design by 3 Sided Coin.',
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
			'How four years on one product turned a frontend developer into a product manager, and into the person extending the design system when no designer was on it — and why each role made the others better.',
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
		year: '2018–22'
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

export const photos = [
	{ src: '/photos/01-silk-route.jpg', alt: 'Snow-capped Kanchenjunga range rising above clouds and blue ridges', caption: 'Above the Clouds — Sikkim', w: 1600, h: 1200, location: 'Sikkim', place: 'Above the Clouds', description: 'Peaks breaking through the cloud line. Sikkim gives you these views where the mountains feel like they belong to a different planet.', series: 'Mountains' },
	{ src: '/photos/02-sunrise-peaks.jpg', alt: 'Golden sunrise over snow-capped Kedarkantha peak', caption: 'First Light — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'First Light', description: 'That narrow window when the sun hits the snow and everything goes gold. Five minutes later it\'s gone.', series: 'Mountains' },
	{ src: '/photos/03-himalayan-peaks.jpg', alt: 'Mountain ridges glowing warm orange at sunset from Kedarkantha base camp', caption: 'Evening Light — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'Evening Light', description: 'The view from base camp as the sun drops. Layered ridges catching the last light — every minute the colour shifts.', series: 'Mountains' },
	{ src: '/photos/04-kanchenjunga.jpg', alt: 'Sunrise over snow-covered summit with mountains stretching to the horizon', caption: 'Summit Sunrise — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Summit Sunrise', description: 'The sun cresting over the ridge at twelve thousand feet. You stand there in the cold and nothing else matters.', series: 'Mountains' },
	{ src: '/photos/05-mountain-ridges.jpg', alt: 'Layered mountain ridges receding into mist at golden hour', caption: 'Ridgelines — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Ridgelines', description: 'Layer after layer of ridges dissolving into haze. The depth never gets old.', series: 'Mountains' },
	{ src: '/photos/06-misty-layers.jpg', alt: 'Misty mountain layers with a bird silhouette against soft light', caption: 'Misty Layers — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Misty Layers', description: 'A single bird cutting through the mist between mountain layers. Painterly, almost unreal.', series: 'Mountains' },
	{ src: '/photos/07-mountain-village.jpg', alt: 'Small village at the base of a massive cloud-shrouded mountain peak', caption: 'Lahaul Valley — Himachal', w: 1600, h: 1200, location: 'Himachal Pradesh', place: 'Lahaul Valley', description: 'A village dwarfed by rock and cloud. The scale of these places doesn\'t come through in photos — but this one gets close.', series: 'Mountains' },
	{ src: '/photos/08-qutub-arch.jpg', alt: 'Ornate concentric stone dome ceiling inside Qutub Minar complex, Delhi', caption: 'Qutub Minar — Delhi', w: 1600, h: 1200, location: 'Delhi', place: 'Qutub Minar', description: 'Looking straight up inside the Qutub complex. Concentric rings of carved stone spiralling into shadow.', series: 'Places' },
	{ src: '/photos/09-qutub-moon.jpg', alt: 'Starry night sky over snow-capped mountain silhouettes from Sankri village', caption: 'Starlight — Sankri', w: 1600, h: 738, location: 'Uttarakhand', place: 'Starlight', description: 'Mountains and stars from Sankri village. No light pollution, no noise — just the sky doing its thing.', series: 'After Dark' },
	{ src: '/photos/10-tents-stars.jpg', alt: 'Orange camping tents glowing in snow under a starry night sky', caption: 'Base Camp — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Base Camp', description: 'Tents glowing orange in the snow, stars overhead. Minus ten outside but the light makes it feel warm.', series: 'After Dark' },
	{ src: '/photos/11-streetlight.jpg', alt: 'Empty Cavalry Barracks railway station platform at night with glowing streetlights', caption: 'After Hours — Alwal', w: 1600, h: 1200, location: 'Alwal', place: 'After Hours', description: 'Cavalry Barracks station after the last train. Metal, light, and silence — the city pauses here.', series: 'After Dark' },
	{ src: '/photos/12-balloon-fog.jpg', alt: 'Tree silhouettes against a warm golden sunset sky over mountain ridges', caption: 'Golden Hour — Kedarkantha', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Golden Hour', description: 'Trees turned to silhouettes as the sun drops behind the ridge. The warmest five minutes of the day.', series: 'Mountains' },
	{ src: '/photos/13-trees-fog.jpg', alt: 'Tall pine trees disappearing into thick fog enroute to Darjeeling', caption: 'Into the Fog — Darjeeling', w: 1600, h: 1200, location: 'Darjeeling', place: 'Into the Fog', description: 'Somewhere between Bagdogra and Darjeeling. Trees dissolving into nothing — the deeper you go, the quieter it gets.', series: 'Mountains' },
	{ src: '/photos/14-misty-valley.jpg', alt: 'A winding road through dense deodar forest near Naggar, Himachal Pradesh', caption: 'Forest Road — Naggar', w: 1600, h: 1200, location: 'Naggar', place: 'Forest Road', description: 'A road disappearing into deodar forest near Naggar. Green on green, the kind of drive where you forget where you\'re going.', series: 'Mountains' },
	{ src: '/photos/15-fisherman-ooty.jpg', alt: 'Misty valley with terraced fields and a village lit by morning sun', caption: 'Morning Light — Uttarakhand', w: 1600, h: 1200, location: 'Uttarakhand', place: 'Morning Light', description: 'Sun cutting through the haze into the valley. The village waking up below, fields glowing green.', series: 'Places' },
	{ src: '/photos/16-ship-ocean.jpg', alt: 'A lone ship on a vast deep-blue ocean', caption: 'Disconnect — Vizag', w: 1600, h: 1200, location: 'Vizag', place: 'Deep Blue', description: 'Miles from the shoreline, miles from the noise. Just a ship and the horizon.', series: 'Places' },
	{ src: '/photos/17-cavalry-stairs.jpg', alt: 'Cavalry Barracks railway platform at night with red digital clock and blue-lit tracks', caption: 'Platform 2 — Cavalry Barracks', w: 1600, h: 1200, location: 'Alwal', place: 'Platform 2', description: 'Cavalry Barracks at midnight. The red clock, the empty platform, the blue glow off the tracks.', series: 'Places' },
	{ src: '/photos/18-taj-mahal.jpg', alt: 'Taj Mahal from the gardens with trees framing the dome', caption: 'Taj Mahal — Agra', w: 1600, h: 1200, location: 'Agra', place: 'Taj Mahal', description: 'Everyone photographs it, but standing in front of it still hits you. The symmetry, the scale, the quiet.', series: 'Places' },
	{ src: '/photos/19-summit-golden.jpg', alt: 'Group of trekkers at a mountain summit during golden hour', caption: 'Summit — Kedarkantha', w: 1600, h: 1201, location: 'Uttarakhand', place: 'The Summit', description: 'Golden hour at the top. Twelve thousand feet, frozen fingers, and the best light of the trip.', series: 'Mountains' },
	{ src: '/photos/20-tea-plantations.jpg', alt: 'Lush green tea plantation rows stretching across rolling hills in Munnar', caption: 'Tea Country — Munnar', w: 1600, h: 1200, location: 'Munnar', place: 'Tea Country', description: 'Rows of green running over every hill. Munnar\'s tea estates are a different shade of India.', series: 'Places' }
];

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
	blurb:
		'Happy to talk about interesting work, side projects, or where to get good coffee. If it is a project or a role, send the scope, the team and the timing — that is usually enough to start.'
};
