<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { nav as navLinks, site, socials } from '$lib/content';

	let scrollY = $state(0);
	let open = $state(false);
	let dark = $state(false);
	const scrolled = $derived(scrollY > 24);

	// Lock page scroll while the mobile menu is open
	$effect(() => {
		document.documentElement.classList.toggle('overflow-hidden', open);
		return () => document.documentElement.classList.remove('overflow-hidden');
	});

	onMount(() => {
		// The inline script in app.html already applied the theme pre-paint
		dark = document.documentElement.classList.contains('dark');

		// Follow live OS changes while the user hasn't picked a theme themselves
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (event: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) applyTheme(event.matches);
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	});

	function applyTheme(value: boolean) {
		dark = value;
		document.documentElement.classList.toggle('dark', value);
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', value ? '#161412' : '#f1efea');
	}

	function toggleTheme() {
		applyTheme(!dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}

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
			<!-- Theme toggle -->
			<button
				type="button"
				onclick={toggleTheme}
				aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
				class="grid size-10 place-items-center rounded-full border transition-colors duration-300 {open
					? 'border-cream/25 hover:border-cream/60'
					: 'border-line hover:border-dim'}"
			>
				{#if dark}
					<!-- sun -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-4"
						aria-hidden="true"
					>
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
						/>
					</svg>
				{:else}
					<!-- moon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="size-4"
						aria-hidden="true"
					>
						<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
					</svg>
				{/if}
			</button>

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
