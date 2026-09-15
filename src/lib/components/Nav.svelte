<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import { nav as navLinks, site, socials } from '$lib/content';
	import ThemeToggle from './ThemeToggle.svelte';
	import { modal } from '$lib/actions/modal';

	let {
		/**
		 * Set on pages whose hero is a full-bleed photograph. Until the header
		 * picks up its own background on scroll it sits directly on the image,
		 * where the light-theme ink tokens are dark text on a dark photo. This
		 * flips the header to its cream tones for that stretch only.
		 */
		onDark = false
	}: { onDark?: boolean } = $props();

	let scrollY = $state(0);
	let open = $state(false);
	/* One marker slides between links instead of each link drawing its own. */
	let navEl = $state<HTMLElement>();
	let marker = $state({ x: 0, w: 0, visible: false });
	/* The wordmark ✱ turns a quarter-step on selected deliberate actions. */
	let turns = $state(0);
	let activeSection = $state('');
	let menuEl = $state<HTMLElement>();
	let headerEl = $state<HTMLElement>();
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
	/** Inverted only while the header is transparent over the hero image. */
	const invert = $derived(onDark && !scrolled && !open);

	/*
	 * The menu only exists below md. If it is open when the viewport crosses the
	 * breakpoint — a phone rotating, a tablet window resizing — the overlay goes
	 * display:none via its md:hidden class but the state stays true, which used
	 * to leave the page inert and scroll-locked behind an invisible dialog.
	 * Close it on the media query instead, so the modal action tears down.
	 */
	$effect(() => {
		const desktop = window.matchMedia('(min-width: 768px)');
		const closeOnDesktop = (e: MediaQueryListEvent | MediaQueryList) => {
			if (e.matches) open = false;
		};
		closeOnDesktop(desktop);
		desktop.addEventListener('change', closeOnDesktop);
		return () => desktop.removeEventListener('change', closeOnDesktop);
	});

	// Marker: measure the active link and slide there (CSS transition, 200ms).
	$effect(() => {
		void activeSection;
		void pathname;
		if (!navEl) return;
		const active = navEl.querySelector<HTMLElement>('a[aria-current="true"]');
		if (!active) {
			/* Written, never read, inside this effect — reading `marker` here would
			   make the effect depend on its own output and loop. */
			marker = { x: 0, w: 0, visible: false };
			return;
		}
		const nr = navEl.getBoundingClientRect();
		const ar = active.getBoundingClientRect();
		marker = { x: ar.left - nr.left, w: ar.width, visible: true };
	});

	// The wordmark ✱ answers deliberate actions elsewhere (theme switch, copy).
	$effect(() => {
		const onTurn = () => (turns += 1);
		window.addEventListener('site:turn', onTurn);
		return () => window.removeEventListener('site:turn', onTurn);
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
		// Escape and the Tab trap are owned by the modal action while the menu is open.
		void event;
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
	bind:this={headerEl}
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 {open
		? 'text-cream'
		: scrolled
			? 'border-b border-line bg-paper/85 backdrop-blur-md'
			: invert
				? 'text-cream'
				: ''}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
		<a href="/" class="flex items-center gap-2 text-base font-medium tracking-tight" onclick={() => (open = false)}>
			<span class="asterisk-turn text-accent" aria-hidden="true" style="transform: rotate({turns * 90}deg)">✱</span>
			{site.name}
		</a>

		<div class="hidden items-center gap-4 md:flex">
			<p
				class="min-w-[7rem] text-[10px] font-medium tracking-[0.22em] lowercase {invert
					? 'text-cream/55'
					: 'text-dim'}"
			>
				chapter / <span class={invert ? 'text-cream' : 'text-ink'}>{activeLabel}</span>
			</p>
		<nav bind:this={navEl} class="relative items-center gap-2.5 md:flex" aria-label="Primary">
			<span
				aria-hidden="true"
				class="pointer-events-none absolute -bottom-1 left-0 h-px bg-accent transition-[transform,width,opacity] duration-200 ease-out"
				style="transform: translateX({marker.x}px); width: {marker.w}px; opacity: {marker.visible ? 1 : 0};"
			></span>
			{#each navLinks as link, i (link.href)}
				{#if i > 0}<span aria-hidden="true" class="select-none {invert ? 'text-cream/45' : 'text-dim'}">,</span>{/if}
				<a
					href={resolvedHref(link.href)}
					aria-current={isActiveLink(link.href) ? 'true' : undefined}
					class="relative text-sm lowercase transition-colors duration-200 {invert
						? 'hover:text-cream'
						: 'hover:text-ink'} {isActiveLink(link.href)
						? invert
							? 'text-cream'
							: 'text-ink'
						: invert
							? 'text-cream/60'
							: 'text-dim'}"
				>
					{link.label}
				</a>
			{/each}
		</nav>
		</div>

		<div class="flex items-center gap-3">
			<ThemeToggle tone={open || invert ? 'dark' : 'light'} />

			<a
				href="#connect"
				class="group hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-accent hover:text-paper focus-visible:bg-accent focus-visible:text-paper md:inline-flex {invert
					? 'bg-cream text-coal'
					: 'bg-ink text-paper'}"
			>
				let's talk
				<span class="inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1" aria-hidden="true">→</span>
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
		role="dialog"
		aria-modal="true"
		aria-label="Site menu"
		use:modal={{ onclose: () => (open = false), restoreFocusTo: toggleBtn, initialFocus: 'nav a' }}
		transition:fade={{ duration: 180 }}
		class="fixed inset-0 z-60 flex flex-col justify-between bg-coal px-5 pt-24 pb-10 text-cream md:hidden"
	>
		<!--
			Dialog chrome lives inside the dialog. The header's hamburger and toggle
			are underneath the overlay and inert while this is open; these are the
			reachable ones. The close button mirrors the hamburger's position so the
			gesture is the same either way.
		-->
		<div class="absolute inset-x-5 top-4 flex items-center justify-end gap-3">
			<ThemeToggle tone="dark" />
			<button
				type="button"
				onclick={() => (open = false)}
				class="relative -mr-2 grid size-11 place-items-center"
			>
				<span class="sr-only">Close menu</span>
				<span class="relative block h-4 w-6" aria-hidden="true">
					<span class="absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 rotate-45 bg-current"></span>
					<span class="absolute top-1/2 left-0 block h-0.5 w-6 -translate-y-1/2 -rotate-45 bg-current"></span>
				</span>
			</button>
		</div>

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
