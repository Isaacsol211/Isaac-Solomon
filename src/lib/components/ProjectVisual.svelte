<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import type { ProjectVisualKind } from '$lib/content';

	let {
		kind,
		label,
		dark = false,
		image = ''
	}: { kind: ProjectVisualKind; label: string; dark?: boolean; image?: string } = $props();

	// The gallery vignette reuses the photography placeholders
	const tiles = [
		'/photos/01-dusk.svg',
		'/photos/02-forest.svg',
		'/photos/04-ocean.svg',
		'/photos/06-neon.svg',
		'/photos/05-sand.svg',
		'/photos/08-ember.svg'
	];
	const bars = [38, 62, 46, 84, 58, 100, 72];

	// Terminal is always dark; on a dark card the frame goes cream; otherwise paper
	const frame = $derived(
		kind === 'terminal'
			? 'border-cream/15 bg-[#1d1b18] text-cream'
			: dark
				? 'border-cream/20 bg-cream text-coal'
				: 'border-line bg-paper text-ink'
	);
	const chromeBorder = $derived(
		kind === 'terminal' ? 'border-cream/10' : dark ? 'border-coal/10' : 'border-line'
	);
	const chip = $derived(
		kind === 'terminal'
			? 'bg-cream/10 text-cream/55'
			: dark
				? 'bg-coal/8 text-coal/60'
				: 'bg-paper-2 text-dim'
	);
</script>

<!--
	Not a screenshot — a tiny, fully-coded UI. Inspect away.
	Decorative only, so it's hidden from assistive tech.
-->
<div
	use:reveal
	aria-hidden="true"
	class="vis pointer-events-none overflow-hidden rounded-xl border select-none {frame} shadow-[0_24px_48px_-24px_rgba(20,19,17,0.4)]"
>
	<!-- window chrome -->
	<div class="flex items-center gap-1.5 border-b px-4 py-2.5 {chromeBorder}">
		<span class="size-2 rounded-full bg-[#ff5f57]"></span>
		<span class="size-2 rounded-full bg-[#febc2e]"></span>
		<span class="size-2 rounded-full bg-[#28c840]"></span>
		<span class="ml-3 truncate rounded-md px-2.5 py-0.5 font-mono text-[10px] tracking-wider {chip}">
			{label}
		</span>
	</div>

	{#if kind === 'terminal'}
		<div class="grid aspect-[16/10] content-start gap-1.5 p-4 font-mono text-[11px] leading-relaxed sm:p-5 sm:text-xs">
			<p class="text-cream/85">
				<span class="text-accent">➜</span>
				<span class="text-cream/45">~/dev</span>
				<span class="cmd">npx novarock build</span>
			</p>
			<p class="out text-cream/40" style="--o: 1.6s">resolving workspace · 14 packages</p>
			<p class="out text-cream/40" style="--o: 2s">tree-shake · minify · emit esm + cjs</p>
			<p class="out text-cream/40" style="--o: 2.4s">
				<span class="inline-block w-28 overflow-hidden rounded-sm bg-cream/10 align-middle">
					<span class="prog block h-1.5 bg-accent"></span>
				</span>
			</p>
			<p class="out text-[#86d993]" style="--o: 3s">✓ built in 1.2s — 0 errors, 0 warnings</p>
			<p class="out text-cream/85" style="--o: 3.4s">
				<span class="text-accent">➜</span>
				<span class="text-cream/45">~/dev</span>
				<span class="caret -mb-0.5 inline-block h-3.5 w-2 bg-cream/80"></span>
			</p>
		</div>
	{:else if kind === 'gallery'}
		<div class="aspect-[16/10] p-3 sm:p-4">
			<div class="mb-2 flex items-center justify-between px-1 font-mono text-[9px] tracking-[0.2em] text-coal/45 uppercase">
				<span>Albums / Iceland '25</span>
				<span class="text-accent">36 frames</span>
			</div>
			<div class="grid h-[calc(100%-1.4rem)] grid-cols-3 gap-1.5 sm:gap-2">
				{#each tiles as tile, i (tile)}
					<span
						class="tile overflow-hidden rounded-md {i === 3 ? 'ring-2 ring-accent ring-offset-1 ring-offset-cream' : ''}"
						style="--o: {0.2 + i * 0.12}s"
					>
						<img src={tile} alt="" loading="lazy" class="h-full w-full object-cover" />
					</span>
				{/each}
			</div>
		</div>
	{:else if kind === 'dashboard'}
		<div class="grid aspect-[16/10] content-start gap-3 p-4 sm:gap-4 sm:p-5">
			<div class="flex items-center justify-between">
				<span class="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] uppercase opacity-60">
					<span class="relative flex size-1.5">
						<span class="pulse absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
						<span class="relative inline-flex size-1.5 rounded-full bg-accent"></span>
					</span>
					Live — events/min
				</span>
				<span class="rounded-full border border-current/15 px-2 py-0.5 font-mono text-[9px] opacity-60">+18.4%</span>
			</div>
			<p class="text-2xl font-medium tracking-tight sm:text-3xl">
				2,418<span class="text-accent">.</span>
			</p>
			<svg viewBox="0 0 200 36" class="h-8 w-full overflow-visible sm:h-9" preserveAspectRatio="none">
				<path
					class="spark"
					pathLength="100"
					d="M0 30 L18 26 L36 28 L54 18 L72 22 L90 12 L108 16 L126 8 L144 14 L162 6 L180 10 L200 2"
					fill="none"
					stroke="var(--color-accent)"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
			<div class="flex h-12 items-end gap-1.5 sm:h-14 sm:gap-2">
				{#each bars as h, i (i)}
					<span
						class="bar w-full rounded-t-sm {i === 5 ? 'bg-accent' : 'bg-current opacity-15'}"
						style="height: {h}%; --o: {0.3 + i * 0.09}s"
					></span>
				{/each}
			</div>
		</div>
	{:else if kind === 'typing'}
		<div class="grid aspect-[16/10] content-center gap-4 p-5 sm:gap-5 sm:p-7">
			<div class="flex gap-2 font-mono text-[9px] tracking-[0.2em] uppercase opacity-60">
				<span class="rounded-full border border-current/15 px-2 py-0.5">84 wpm</span>
				<span class="rounded-full border border-current/15 px-2 py-0.5">98% acc</span>
				<span class="rounded-full border border-accent/40 px-2 py-0.5 text-accent">round 12</span>
			</div>
			<p class="font-mono text-sm leading-relaxed sm:text-base">
				<span class="type">the quick brown fox jumps over the lazy dog</span><span
					class="caret -mb-0.5 ml-0.5 inline-block h-4 w-[2px] bg-accent"
				></span>
			</p>
			<div class="h-1 w-full overflow-hidden rounded-full bg-current/10">
				<span class="type-prog block h-full bg-accent"></span>
			</div>
		</div>
	{:else}
		<!-- Real project screenshot -->
		<div class="aspect-[16/10] overflow-hidden">
			<img
				src={image}
				alt="Screenshot of {label}"
				loading="lazy"
				class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
			/>
		</div>
	{/if}
</div>

<style>
	/*
	 * Motion rules:
	 *  - base styles below are the FINISHED state (no-JS / reduced-motion safe)
	 *  - animations only attach under prefers-reduced-motion: no-preference
	 *  - when JS runs, the reveal action adds .reveal; animations stay paused
	 *    until .is-visible lands, so vignettes play as they enter the viewport
	 */
	@media (prefers-reduced-motion: no-preference) {
		.vis:global(.reveal):not(:global(.is-visible)) :is(.cmd, .out, .prog, .tile, .spark, .bar, .type, .type-prog) {
			animation-play-state: paused;
		}

		/* terminal */
		.cmd {
			display: inline-block;
			overflow: hidden;
			white-space: nowrap;
			vertical-align: bottom;
			width: 18ch;
			animation: type-in 1.2s steps(18) 0.3s both;
		}
		.out {
			animation: appear 0.35s ease-out both;
			animation-delay: var(--o, 0s);
		}
		.prog {
			transform-origin: left;
			animation: grow-x 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: calc(var(--o, 0s) + 0.1s);
		}

		/* gallery */
		.tile {
			animation: pop 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: var(--o, 0s);
		}

		/* dashboard */
		.spark {
			stroke-dasharray: 100;
			animation: draw 1.6s cubic-bezier(0.45, 0, 0.2, 1) 0.4s both;
		}
		.bar {
			transform-origin: bottom;
			animation: grow-y 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
			animation-delay: var(--o, 0s);
		}

		/* type trainer — loops forever, like someone is mid-run */
		.type {
			/* not currentColor — that would resolve against our own transparent color */
			background-image: linear-gradient(
				to right,
				var(--color-ink) 50%,
				color-mix(in srgb, var(--color-ink) 32%, transparent) 50%
			);
			background-size: 200% 100%;
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			animation: sweep 6s steps(43) infinite;
		}
		.type-prog {
			transform-origin: left;
			animation: sweep-x 6s steps(43) infinite;
		}
	}

	.caret {
		animation: blink 1.1s steps(1) infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.caret {
			animation: none;
		}
	}
	.pulse {
		animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
	}
	@media (prefers-reduced-motion: reduce) {
		.pulse {
			animation: none;
			opacity: 0;
		}
	}

	@keyframes type-in {
		from {
			width: 0;
		}
	}
	@keyframes appear {
		from {
			opacity: 0;
			transform: translateY(3px);
		}
	}
	@keyframes grow-x {
		from {
			transform: scaleX(0);
		}
	}
	@keyframes grow-y {
		from {
			transform: scaleY(0);
		}
	}
	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.9);
		}
	}
	@keyframes draw {
		from {
			stroke-dashoffset: 100;
		}
	}
	@keyframes blink {
		50% {
			opacity: 0;
		}
	}
	@keyframes ping {
		75%,
		100% {
			transform: scale(2.4);
			opacity: 0;
		}
	}
	@keyframes sweep {
		0%,
		12% {
			background-position: 100% 0;
		}
		75%,
		100% {
			background-position: 0% 0;
		}
	}
	@keyframes sweep-x {
		0%,
		12% {
			transform: scaleX(0);
		}
		75%,
		100% {
			transform: scaleX(1);
		}
	}
</style>
