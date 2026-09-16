<script lang="ts">
	import { site, writing, writingIntro } from '$lib/content';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';

	const title = 'Writing — Isaac Solomon';
	const description = writingIntro.note;
	const canonical = `${site.url}/writing`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<!-- markdown twin for agents — see /llms.txt -->
	<link rel="alternate" type="text/markdown" href="{canonical}.md" />
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

		<!--
			A selection, not a feed: the first piece is set as the lead, the rest as
			compact rows. Hover and focus reveal a 240ms underline under the title;
			nothing else moves.
		-->
		{#if writing.length}
			{@const lead = writing[0]}
			<a
				href={lead.href}
				class="group mt-12 block border-t border-line pt-8 md:mt-16 md:pt-10"
			>
				<div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
					<p class="text-xs font-medium tracking-[0.15em] text-dim uppercase">{lead.tag}</p>
					<p class="text-xs text-dim tabular-nums">{lead.readingTime} · {lead.year}</p>
				</div>
				<h2 class="mt-4 font-serif text-4xl leading-[1.05] italic md:text-6xl">
					<span class="underline-reveal">{lead.title}</span>
				</h2>
				<!--
					The subject under the title, not inside it. Several of these titles are
					literary, and a reader scanning the index cannot tell which piece is
					about performance and which is about eleven languages.
				-->
				<p class="mt-3 text-sm text-dim">{lead.subject}</p>
				<p class="mt-4 max-w-xl text-base leading-relaxed text-dim md:text-lg">{lead.description}</p>
				<p class="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-text">
					Read it
					<span class="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true">→</span>
				</p>
			</a>
		{/if}

		<ol class="mt-10 border-b border-line md:mt-14">
			{#each writing.slice(1) as article (article.href)}
				<li class="border-t border-line">
					<a href={article.href} class="group grid gap-x-6 gap-y-1 py-5 md:grid-cols-12 md:items-baseline md:py-6">
						<p class="text-xs font-medium tracking-[0.15em] text-dim uppercase md:col-span-3">{article.tag}</p>
						<div class="md:col-span-7">
							<h2 class="text-lg font-medium tracking-tight md:text-xl">
								<span class="underline-reveal">{article.title}</span>
							</h2>
							<p class="mt-1 text-xs text-dim">{article.subject}</p>
						</div>
						<p class="text-xs text-dim tabular-nums md:col-span-2 md:text-right">{article.readingTime} · {article.year}</p>
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
