<script lang="ts">
	import { site, writing, writingIntro } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { reveal } from '$lib/actions/reveal';

	const title = 'Writing — Isaac Solomon';
	const description = writingIntro.note;
	const canonical = `${site.url}/writing`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content="{site.url}/og.png" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{site.url}/og.png" />
</svelte:head>

<!-- back nav -->
<header class="border-b border-line px-5 py-4 sm:px-8">
	<div class="mx-auto flex max-w-3xl items-center justify-between">
		<a
			href="/"
			class="group flex items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-dim transition-colors hover:text-ink"
		>
			<span class="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
			Isaac Solomon
		</a>
		<div class="flex items-center gap-3">
			<span class="text-xs font-medium tracking-[0.2em] uppercase text-dim">Writing</span>
			<ThemeToggle />
		</div>
	</div>
</header>

<main id="main" class="px-5 pb-24 sm:px-8">
	<div class="mx-auto max-w-3xl pt-14 md:pt-20">
		<h1 class="text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
			{writingIntro.plain}
			<em class="font-serif font-normal italic text-dim">{writingIntro.accent}</em>
		</h1>
		<p class="mt-6 max-w-xl text-lg leading-relaxed text-dim">
			{writingIntro.note}
		</p>

		<ol class="mt-12 border-b border-line md:mt-16">
			{#each writing as article (article.href)}
				<li use:reveal class="border-t border-line">
					<a
						href={article.href}
						class="group relative block py-8 transition-colors duration-300 before:absolute before:-inset-x-5 before:inset-y-2 before:-z-10 before:rounded-2xl before:bg-paper-2 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-60 md:py-10"
					>
						<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
							<p class="text-xs font-medium tracking-[0.15em] uppercase text-dim">
								{article.tag}
							</p>
							<p class="text-xs text-dim tabular-nums">{article.readingTime} · {article.year}</p>
						</div>
						<h2
							class="mt-3 text-xl font-medium tracking-tight transition-colors duration-300 group-hover:text-accent md:text-2xl"
						>
							{article.title}
						</h2>
						<p class="mt-2 max-w-xl text-sm leading-relaxed text-dim">{article.description}</p>
					</a>
				</li>
			{/each}
		</ol>

		<div class="mt-16 border-t border-line pt-8">
			<a
				href="/"
				class="group flex items-center gap-2 text-sm font-medium text-dim transition-colors hover:text-ink"
			>
				<span class="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
				Back to portfolio
			</a>
		</div>
	</div>
</main>
