<script lang="ts">
	import { site } from '$lib/content';
	import Nav from '$lib/components/Nav.svelte';
	import StoryHero from '$lib/components/editorial/StoryHero.svelte';
	import StoryChapter from '$lib/components/editorial/StoryChapter.svelte';
	import Services from '$lib/components/Services.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Writing from '$lib/components/Writing.svelte';
	import PhotoTeaser from '$lib/components/PhotoTeaser.svelte';
	import Connect from '$lib/components/Connect.svelte';
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />
	<!-- markdown twin for agents — see /llms.txt -->
	<link rel="alternate" type="text/markdown" href="{site.url}/index.md" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:url" content={site.url} />
	<meta property="og:image" content="{site.url}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={site.title} />
	<meta name="twitter:description" content={site.description} />
	<meta name="twitter:image" content="{site.url}/og.png" />
</svelte:head>

<Nav />

<main id="main" class="relative z-10 bg-paper">
	<StoryHero />
	<StoryChapter
		n="01"
		label="chapter one"
		title="Selected work"
		body="Client builds and side projects — each one pushed the work further than the brief required. Storefronts, content systems and a national talent platform."
		href="#projects"
		linkLabel="see the work"
		accent="grass"
		art="deskcat"
	/>
	<Projects />
	<StoryChapter
		n="02"
		label="chapter two"
		title="About me"
		body="A frontend developer at Able.do since 2017. What a team is left with matters more to me than the launch — content models that survive a rebrand, systems a non-technical team runs without me."
		href="/writing"
		linkLabel="more about the work"
		accent="mustard"
		art="bust"
		reverse
	/>
	<!-- experiment: About replaced the merged Experience section; keep the nav anchor valid -->
	<span id="experience" class="sr-only" aria-hidden="true"></span>
	<Services />
	<Writing />
	<PhotoTeaser />
</main>

<Connect />
