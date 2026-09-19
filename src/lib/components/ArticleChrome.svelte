<script lang="ts">
	import { site } from '$lib/content';
	import ArticleHeader from './ArticleHeader.svelte';
	import ReadingProgress from './ReadingProgress.svelte';

	/*
	 * Everything an article has around its prose: SEO/social tags, the reading
	 * hairline and the back bar. Each case study used to hand-copy all three.
	 */
	let {
		title,
		description,
		path,
		image,
		back = { href: '/', label: site.name }
	}: {
		title: string;
		description: string;
		/** Route path, e.g. '/writing/godrej' — canonical and markdown twin derive from it. */
		path: string;
		/** Social preview image, site-relative. */
		image: string;
		back?: { href: string; label: string };
	} = $props();

	const canonical = $derived(`${site.url}${path}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<!-- markdown twin for agents — see /llms.txt -->
	<link rel="alternate" type="text/markdown" href="{canonical}.md" />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}{image}" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}{image}" />
</svelte:head>

<ReadingProgress />

<ArticleHeader {back} />
