<script lang="ts">
	import { site } from '$lib/content';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Photography from '$lib/components/Photography.svelte';
	import Connect from '$lib/components/Connect.svelte';
</script>

<svelte:head>
	<title>{site.title}</title>
	<meta name="description" content={site.description} />
	<link rel="canonical" href={site.url} />

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

<main id="main">
	<Hero />
	<Marquee />
	<About />
	<Projects />
	<Experience />
	<Photography />
	<Connect />
</main>
