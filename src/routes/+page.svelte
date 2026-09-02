<script lang="ts">
	import { site } from '$lib/content';
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Manifesto from '$lib/components/Manifesto.svelte';
	import About from '$lib/components/About.svelte';
	import Services from '$lib/components/Services.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Writing from '$lib/components/Writing.svelte';
	import Testimonials from '$lib/components/Testimonials.svelte';
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
	<Hero />
	<Manifesto />
	<About />
	<Services />
	<Projects />
	<Experience />
	<Writing />
	<Testimonials />
</main>

<Connect />
