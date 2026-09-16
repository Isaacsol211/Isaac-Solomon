<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { reveal } from '$lib/actions/reveal';
	import { connect, nav as navLinks, site, socials } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';
	import McpConnect from './McpConnect.svelte';

	let {
		/**
		 * The archive's closing. The full section is 1,175px — more than a
		 * viewport — which is a long sales close to put after someone has just
		 * looked at twenty photographs. The compact form keeps the branding, the
		 * address and a route back to the work, and drops the display headline,
		 * the MCP panel and the sitemap.
		 */
		compact = false
	}: { compact?: boolean } = $props();

	const year = new Date().getFullYear();
	const pathname = $derived(page.url.pathname);
	let time = $state('');
	let copied = $state(false);
	let copyTimer: ReturnType<typeof setTimeout>;

	async function copyEmail() {
		try {
			await navigator.clipboard.writeText(site.email);
			copied = true;
			window.dispatchEvent(new CustomEvent('site:turn'));
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard unavailable (permissions/insecure context) — the mailto pill still works
		}
	}

	function resolvedHref(href: string) {
		if (!href.startsWith('#')) return href;
		return pathname === '/' ? href : `/${href}`;
	}

	onMount(() => {
		// My local time (IST), not the visitor's — that's the point of the label
		const format = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Kolkata'
		});
		const tick = () => (time = format.format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});
</script>

<section
	id="connect"
	class="relative overflow-hidden border-t border-cream/10 bg-coal text-cream"
>
	<div
		class="relative mx-auto max-w-6xl px-5 sm:px-8 {compact
			? 'py-12 md:py-14'
			: 'pt-20 pb-8 md:pt-32 md:pb-10'}"
	>
		{#if !compact}
		<div use:reveal>
			<Eyebrow title="Contact" tone="dark" />
		</div>

		<p use:reveal={{ delay: 80 }} class="mt-10 font-serif text-2xl text-cream/70 italic md:text-3xl">
			{connect.eyebrow}
		</p>
		<h2
			use:reveal={{ delay: 140 }}
			class="mt-3 text-[clamp(3.2rem,10vw,9rem)] leading-[0.95] font-medium tracking-[-0.03em]"
		>
			let's <em class="font-serif font-normal text-accent italic">talk.</em>
		</h2>

		<p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl leading-relaxed text-cream/60">
			{connect.blurb}
		</p>
		<a
			use:reveal={{ delay: 260 }}
			href="mailto:{site.email}"
			class="group relative mt-8 inline-flex items-center gap-4 overflow-hidden rounded-full border border-cream/25 px-6 py-4 text-base transition-colors duration-500 before:absolute before:inset-0 before:translate-y-[101%] before:bg-cream before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:text-coal hover:before:translate-y-0 sm:px-8 sm:text-lg md:text-xl"
		>
			<span class="relative">{site.email}</span>
			<ArrowUpRight
				class="relative size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
			/>
		</a>
		<button
			use:reveal={{ delay: 320 }}
			type="button"
			onclick={copyEmail}
			class="mt-4 inline-flex items-center gap-2 text-sm text-cream/50 transition-colors hover:text-cream"
		>
			<!-- The icon changes state at once; the label says what happened. -->
			<svg viewBox="0 0 16 16" class="size-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				{#if copied}
					<path d="M3 8.5l3 3 7-7" class="text-accent" />
				{:else}
					<rect x="5" y="5" width="8" height="9" rx="1.5" /><path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-5A1.5 1.5 0 0 0 3 3.5v7A1.5 1.5 0 0 0 4.5 12H5" />
				{/if}
			</svg>
			{#if copied}
				<span class="text-accent">Copied</span>
			{:else}
				<span>or copy the address</span>
			{/if}
			<span class="sr-only" aria-live="polite">{copied ? 'Email copied to clipboard' : ''}</span>
		</button>

		<div use:reveal={{ delay: 360 }}>
			<McpConnect />
		</div>
		{/if}

		<footer
			class="relative {compact ? '' : 'mt-20 border-t border-cream/15 pt-12 md:mt-28 md:pb-2'}"
		>
			{#if compact}
				<!--
					The archive's close: the same wordmark, the address, and the two
					places to go next. Everything the full section says about scope,
					services and the MCP server is one link away on the work page.
				-->
				<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
					<div>
						<p class="text-2xl font-medium tracking-tight">
							{site.name}<span class="text-accent">.</span>
						</p>
						<p class="mt-2 text-sm leading-relaxed text-cream/50">
							{site.role} &amp; {site.tagline}. {site.location}.
						</p>
					</div>
					<ul class="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
						<li>
							<a
								href="/#projects"
								class="group inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
							>
								Work
								<span class="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
							</a>
						</li>
						<li>
							<a
								href="mailto:{site.email}"
								class="border-b border-cream/30 pb-0.5 text-cream/70 transition-colors hover:border-cream hover:text-cream"
							>
								{site.email}
							</a>
						</li>
						{#each socials.filter((s) => s.label === 'Instagram') as social (social.label)}
							<li>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="group inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
								>
									{social.label}
									<ArrowUpRight class="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
			<div class="grid gap-12 md:grid-cols-12">
				<div class="md:col-span-6">
					<p class="text-2xl font-medium tracking-tight">
						{site.name}<span class="text-accent">.</span>
					</p>
					<p class="mt-3 max-w-sm text-sm leading-relaxed text-cream/50">
						{site.role} & {site.tagline}. {site.location}.
					</p>
					<p class="mt-6 text-xs font-medium tracking-[0.25em] uppercase text-cream/40">
						Local time — <span class="text-cream/70 tabular-nums">{time || '··:··'}</span>
					</p>
				</div>

				<nav class="md:col-span-3" aria-label="Footer">
					<h3 class="text-xs font-medium tracking-[0.25em] uppercase text-cream/40">Sitemap</h3>
					<ul class="mt-4 space-y-2.5">
						{#each navLinks as link (link.href)}
							<li>
							<a href={resolvedHref(link.href)} class="text-cream/70 transition-colors hover:text-cream">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<div class="md:col-span-3">
					<h3 class="text-xs font-medium tracking-[0.25em] uppercase text-cream/40">Elsewhere</h3>
					<ul class="mt-4 space-y-2.5">
						{#each socials as social (social.label)}
							<li>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="group inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
								>
									{social.label}
									<ArrowUpRight class="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			{/if}

			<div
				class="flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 text-xs text-cream/40 {compact
					? 'mt-8 pt-5'
					: 'mt-16 py-6'}"
			>
				<p>© {year} {site.name}. All rights reserved.</p>
				{#if !compact}
					<p class="hidden sm:block">
						Set in Space Grotesk &amp; Instrument Serif. Built with SvelteKit, deployed on Cloudflare.
					</p>
				{/if}
				<a href="#top" class="inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-cream">
					Back to top <span aria-hidden="true">↑</span>
				</a>
			</div>
		</footer>
	</div>
</section>
