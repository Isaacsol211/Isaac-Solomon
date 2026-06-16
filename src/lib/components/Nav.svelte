<script lang="ts">
	import { fade } from 'svelte/transition';
	import { nav as navLinks, site, socials } from '$lib/content';
	import ThemeToggle from './ThemeToggle.svelte';

	let scrollY = $state(0);
	let open = $state(false);
	const scrolled = $derived(scrollY > 24);

	// Lock page scroll while the mobile menu is open
	$effect(() => {
		document.documentElement.classList.toggle('overflow-hidden', open);
		return () => document.documentElement.classList.remove('overflow-hidden');
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}
</script>

<svelte:window bind:scrollY onkeydown={onKeydown} />

<header
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 {open
		? 'text-cream'
		: scrolled
			? 'border-b border-line bg-paper/85 backdrop-blur-md'
			: ''}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
		<a href="#top" class="flex items-center gap-2 text-base font-medium tracking-tight" onclick={() => (open = false)}>
			<span class="text-accent" aria-hidden="true">✱</span>
			{site.name}
		</a>

		<nav class="hidden items-center gap-8 md:flex" aria-label="Primary">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					class="relative text-sm text-dim transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:text-ink hover:after:scale-x-100"
				>
					{link.label}
				</a>
			{/each}
		</nav>

		<div class="flex items-center gap-3">
			<ThemeToggle tone={open ? 'dark' : 'light'} />

			<a
				href="#connect"
				class="hidden rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-accent md:inline-block"
			>
				Let's Talk
			</a>

			<!-- Mobile menu toggle -->
			<button
				type="button"
				class="relative z-50 -mr-2 grid size-11 place-items-center md:hidden"
				aria-expanded={open}
				aria-controls="mobile-menu"
				onclick={() => (open = !open)}
			>
				<span class="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
				<span class="relative block h-4 w-6">
					<span
						class="absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 {open
							? 'top-1/2 -translate-y-1/2 rotate-45'
							: 'top-0.5'}"
					></span>
					<span
						class="absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 {open
							? 'top-1/2 -translate-y-1/2 -rotate-45'
							: 'bottom-0.5'}"
					></span>
				</span>
			</button>
		</div>
	</div>
</header>

{#if open}
	<div
		id="mobile-menu"
		transition:fade={{ duration: 180 }}
		class="fixed inset-0 z-40 flex flex-col justify-between bg-coal px-5 pt-28 pb-10 text-cream md:hidden"
	>
		<nav aria-label="Mobile">
			<ul class="space-y-2">
				{#each navLinks as link, i (link.href)}
					<li>
						<a
							href={link.href}
							class="group flex items-baseline gap-4 text-5xl font-medium tracking-tight"
							onclick={() => (open = false)}
						>
							<span class="text-sm text-cream/40 tabular-nums">0{i + 1}</span>
							{link.label}
						</a>
					</li>
				{/each}
				<li>
					<a
						href="#connect"
						class="group flex items-baseline gap-4 text-5xl font-medium tracking-tight text-accent"
						onclick={() => (open = false)}
					>
						<span class="text-sm text-cream/40 tabular-nums">0{navLinks.length + 1}</span>
						Let's Talk
					</a>
				</li>
			</ul>
		</nav>

		<div class="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cream/60">
			{#each socials as social (social.label)}
				<a href={social.href} target="_blank" rel="noopener noreferrer" class="hover:text-cream">
					{social.label}
				</a>
			{/each}
		</div>
	</div>
{/if}
