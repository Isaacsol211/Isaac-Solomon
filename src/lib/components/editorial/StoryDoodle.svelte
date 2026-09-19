<script lang="ts">
	/*
	 * Small hand-drawn spot doodles — a lighter counterpart to the portraits
	 * portraits, for section headers and margins. Line-art with the same wobble
	 * so they read as drawn. Decorative, hidden from assistive tech.
	 */
	let { kind, class: className = '' }: {
		kind: 'camera' | 'pen' | 'book' | 'plane' | 'mountain' | 'arrow';
		class?: string;
	} = $props();

	/* These four have painted spot art; arrow/book stay as inline SVG. */
	const painted = ['camera', 'pen', 'plane', 'mountain'];
</script>

{#if painted.includes(kind)}
	<img src="/story/spot-{kind}.webp" alt="" aria-hidden="true" class="story-art-sm {className}" />
{:else}
<svg
	viewBox="0 0 100 100"
	class={className}
	fill="none"
	stroke="var(--color-ink)"
	stroke-width="3"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<defs>
		<filter id="doodle-{kind}" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="4" result="n" />
			<feDisplacementMap in="SourceGraphic" in2="n" scale="2.4" />
		</filter>
	</defs>
	<g filter="url(#doodle-{kind})">
		{#if kind === 'camera'}
			<rect x="16" y="34" width="68" height="46" rx="8" />
			<path d="M36 34l6-10h16l6 10" />
			<circle cx="50" cy="57" r="14" />
			<circle cx="50" cy="57" r="5" fill="var(--color-accent)" stroke="none" />
			<circle cx="72" cy="44" r="2.5" fill="var(--color-ink)" stroke="none" />
		{:else if kind === 'pen'}
			<path d="M24 78l40-40 12 12-40 40-16 4Z" />
			<path d="M60 42l12 12" />
			<path d="M28 74l6 6" />
			<path d="M70 30l6-6 8 8-6 6" stroke="var(--color-accent)" />
		{:else if kind === 'book'}
			<path d="M50 30c-10-8-24-8-34-4v44c10-4 24-4 34 4" />
			<path d="M50 30c10-8 24-8 34-4v44c-10-4-24-4-34 4" />
			<path d="M50 30v44" />
			<path d="M24 40h16M24 52h16M60 40h16M60 52h16" stroke="var(--color-dim)" stroke-width="2" />
		{:else if kind === 'plane'}
			<path d="M14 50l72-28-24 60-14-24-8 18-4-20Z" />
			<path d="M46 60l16-16" stroke="var(--color-accent)" />
		{:else if kind === 'mountain'}
			<circle cx="72" cy="30" r="9" stroke="var(--color-accent)" />
			<path d="M10 78l24-40 16 24 10-16 30 32Z" />
			<path d="M28 50l6 8 6-8" stroke="var(--color-paper)" stroke-width="2" />
		{:else if kind === 'arrow'}
			<path d="M18 34c26-6 52 6 60 34" stroke="var(--color-accent)" />
			<path d="M62 54l16 14-20 6" stroke="var(--color-accent)" />
		{/if}
	</g>
</svg>
{/if}
