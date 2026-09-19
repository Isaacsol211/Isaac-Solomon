<script lang="ts">
	import { site } from '$lib/content';
	import Nav from '$lib/components/Nav.svelte';
	import StoryHero from '$lib/components/editorial/StoryHero.svelte';
	import StoryChapter from '$lib/components/editorial/StoryChapter.svelte';
	import StoryProjects from '$lib/components/editorial/StoryProjects.svelte';
	import StoryAbout from '$lib/components/editorial/StoryAbout.svelte';
	import StoryServices from '$lib/components/editorial/StoryServices.svelte';
	import StoryWriting from '$lib/components/editorial/StoryWriting.svelte';
	import StoryPhotos from '$lib/components/editorial/StoryPhotos.svelte';
	import StoryContact from '$lib/components/editorial/StoryContact.svelte';
	import StoryDivider from '$lib/components/editorial/StoryDivider.svelte';
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

<main id="main" class="relative z-10 bg-story-paper">
	<StoryHero />
	<StoryChapter
		n="01"
		label="chapter one"
		title="Selected work"
		body="Client builds and side projects — each one pushed the work further than the brief required. Storefronts, content systems and a national talent platform."
		accent="grass"
		art="deskcat"
	/>
	<StoryProjects />
	<StoryDivider />
	<StoryAbout />
	<StoryServices />
	<StoryWriting />
	<StoryDivider mark="✦" />
	<StoryPhotos />
</main>

<StoryContact />
