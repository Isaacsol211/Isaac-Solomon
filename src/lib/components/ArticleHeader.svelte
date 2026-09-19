<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';
	import ThemeToggle from './ThemeToggle.svelte';

	/*
	 * The bar above every article and the writing index, in the storybook
	 * voice: the folio wordmark home, a way back up a series, and the site.
	 */
	let {
		back = { href: '/', label: site.name }
	}: {
		back?: { href: string; label: string };
	} = $props();

	const links = [
		{ href: '/#projects', label: 'work', wide: true },
		{ href: '/writing', label: 'writing', wide: false },
		{ href: '/photography', label: 'photography', wide: true }
	];
	const nested = $derived(back.href !== '/');
</script>

<header class="border-b border-line px-5 py-4 sm:px-8">
	<div class="mx-auto flex max-w-5xl items-center justify-between gap-4">
		<div class="flex min-w-0 items-baseline gap-3">
			<a href="/" class="flex shrink-0 items-baseline gap-2 text-base font-medium tracking-tight">
				<span class="text-accent" aria-hidden="true">✱</span>
				{site.name}
				<span class="hidden font-serif text-sm text-dim italic md:inline">— a folio</span>
			</a>
			{#if nested}
				<a
					href={back.href}
					class="group hidden items-baseline gap-1.5 truncate font-serif text-sm text-dim italic transition-colors hover:text-ink sm:inline-flex"
				>
					<span class="inline-block transition-transform group-hover:-translate-x-0.5" aria-hidden="true">←</span>
					{back.label.toLowerCase()}
				</a>
			{/if}
		</div>
		<nav aria-label="Site" class="flex items-center gap-4 text-sm sm:gap-5">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
					class="text-dim transition-colors hover:text-ink aria-[current]:text-ink {link.wide ? 'hidden md:inline' : ''}"
				>
					{link.label}
				</a>
			{/each}
			<ThemeToggle />
			<a
				href="/#connect"
				class="hidden items-center gap-2 rounded-full border-2 border-ink px-4 py-1.5 text-sm text-ink transition-colors hover:bg-ink hover:text-story-paper sm:inline-flex"
			>
				let's talk <span aria-hidden="true">→</span>
			</a>
		</nav>
	</div>
</header>
