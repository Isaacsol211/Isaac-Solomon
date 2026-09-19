<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/content';
	import ThemeToggle from './ThemeToggle.svelte';

	/* The bar above every article and the writing index: a way back, and a way anywhere. */
	let {
		back = { href: '/', label: site.name, short: 'Home' }
	}: {
		/** `short` is the phone label, so the bar stays on one line at 390px. */
		back?: { href: string; label: string; short?: string };
	} = $props();

	const links = [
		{ href: '/#projects', label: 'Work', wide: true },
		{ href: '/writing', label: 'Writing', wide: false },
		{ href: '/photography', label: 'Photography', wide: true },
		{ href: '/#connect', label: 'Contact', wide: false }
	];
</script>

<header class="border-b border-line px-5 py-4 sm:px-8">
	<div class="mx-auto flex max-w-3xl items-center justify-between gap-4">
		<a
			href={back.href}
			class="group flex items-center gap-2 text-xs font-medium tracking-[0.2em] whitespace-nowrap uppercase text-dim transition-colors hover:text-ink"
		>
			<span class="inline-block transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true">←</span>
			<span class="sm:hidden">{back.short ?? back.label}</span>
			<span class="hidden sm:inline">{back.label}</span>
		</a>
		<nav aria-label="Site" class="flex items-center gap-5 text-xs font-medium tracking-[0.2em] uppercase text-dim">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={page.url.pathname === link.href ? 'page' : undefined}
					class="transition-colors hover:text-ink aria-[current]:text-ink {link.wide ? 'hidden sm:inline' : ''}"
				>
					{link.label}
				</a>
			{/each}
			<ThemeToggle />
		</nav>
	</div>
</header>
