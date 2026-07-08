<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { nav as navLinks, site, socials } from '$lib/content';
	import ThemeToggle from './ThemeToggle.svelte';

	let scrollY = $state(0);
	let open = $state(false);
	let activeSection = $state('');
	let menuEl = $state<HTMLElement>();
	let toggleBtn = $state<HTMLButtonElement>();
	let viewportHeight = $state(0);
	const scrolled = $derived(scrollY > 24);
	const pathname = $derived(page.url.pathname);
	const activeLabel = $derived(
		navLinks.find((link) => link.href === activeSection || link.href === pathname)?.label?.toLowerCase() ?? 'intro'
	);
	const maxScroll = $derived(
		typeof document === 'undefined'
			? 1
			: Math.max(1, document.documentElement.scrollHeight - viewportHeight)
	);
	const scrollProgress = $derived(Math.min(1, scrollY / maxScroll));

	// Lock page scroll while the mobile menu is open
	$effect(() => {
		document.documentElement.classList.toggle('overflow-hidden', open);
		return () => document.documentElement.classList.remove('overflow-hidden');
	});

	// Move focus into the menu when it opens
	$effect(() => {
		if (open) menuEl?.querySelector('a')?.focus();
	});

	// Scroll-spy — highlight the nav link for the section under the viewport's midline
	onMount(() => {
		const sections = navLinks
			.filter((link) => link.href.startsWith('#'))
			.map((link) => document.getElementById(link.href.slice(1)))
			.filter((el): el is HTMLElement => el !== null);

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					const href = `#${entry.target.id}`;
					if (entry.isIntersecting) activeSection = href;
					else if (activeSection === href) activeSection = '';
				}
			},
			// A thin band around 40% viewport height decides the "current" section
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		sections.forEach((section) => observer.observe(section));
		return () => observer.disconnect();
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			open = false;
			toggleBtn?.focus();
			return;
		}

		// Trap Tab inside the mobile menu (toggle button + menu links)
		if (event.key === 'Tab' && open && menuEl && toggleBtn) {
			const focusables: HTMLElement[] = [toggleBtn, ...menuEl.querySelectorAll<HTMLElement>('a')];
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const current = document.activeElement as HTMLElement | null;

			if (event.shiftKey && current === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && current === last) {
				event.preventDefault();
				first.focus();
			} else if (!current || !focusables.includes(current)) {
				event.preventDefault();
				first.focus();
			}
		}
	}

	function isActiveLink(href: string) {
		return href.startsWith('#') ? activeSection === href : pathname === href;
	}

	function resolvedHref(href: string) {
		if (!href.startsWith('#')) return href;
		return pathname === '/' ? href : `/${href}`;
	}
</script>

<svelte:window bind:scrollY bind:innerHeight={viewportHeight} onkeydown={onKeydown} />

<div aria-hidden="true" class="fixed inset-x-0 top-0 z-60 h-px origin-left bg-accent" style="transform: scaleX({scrollProgress});"></div>

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

		<div class="hidden items-center gap-4 md:flex">
			<p class="min-w-[7rem] text-[10px] font-medium tracking-[0.22em] lowercase text-dim">
				chapter / <span class="text-ink">{activeLabel}</span>
			</p>
		<nav class="items-center gap-2.5 md:flex" aria-label="Primary">
			{#each navLinks as link, i (link.href)}
				{#if i > 0}<span aria-hidden="true" class="select-none text-dim">,</span>{/if}
				<a
					href={resolvedHref(link.href)}
					aria-current={isActiveLink(link.href) ? 'true' : undefined}
					class="relative text-sm lowercase transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 after:ease-out hover:text-ink hover:after:scale-x-100 {isActiveLink(
					link.href
				)
						? 'text-ink after:scale-x-100'
						: 'text-dim after:scale-x-0'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
		</div>

		<div class="flex items-center gap-3">
			<ThemeToggle tone={open ? 'dark' : 'light'} />

			<a
				href="#connect"
				class="hidden rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-colors duration-300 hover:bg-accent md:inline-block"
			>
				let's talk
			</a>

			<!-- Mobile menu toggle -->
			<button
				bind:this={toggleBtn}
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
		bind:this={menuEl}
		id="mobile-menu"
		transition:fade={{ duration: 180 }}
		class="fixed inset-0 z-40 flex flex-col justify-between bg-coal px-5 pt-28 pb-10 text-cream md:hidden"
	>
		<nav aria-label="Mobile">
			<ul class="space-y-2">
				{#each navLinks as link, i (link.href)}
					<li>
						<a
							href={resolvedHref(link.href)}
							class="group flex items-baseline gap-4 text-5xl font-medium tracking-tight lowercase"
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
						class="group flex items-baseline gap-4 text-5xl font-medium tracking-tight lowercase text-accent"
						onclick={() => (open = false)}
					>
						<span class="text-sm text-cream/40 tabular-nums">0{navLinks.length + 1}</span>
						let's talk
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
