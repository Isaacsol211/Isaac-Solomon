<script lang="ts">
	/*
	 * A watercolour splash: a disc torn into an irregular edge by turbulence,
	 * pigment pooled darker at the rim like dried paint, a speckled wash, and a
	 * few flicked droplets. Decorative; it sits behind the content (the .story
	 * section isolates its stacking so -z-10 stays above the section's paper).
	 */
	let {
		color,
		seed = 3,
		class: className = ''
	}: {
		color: 'cobalt' | 'grass' | 'mustard' | 'accent';
		seed?: number;
		class?: string;
	} = $props();

	const uid = $props.id();
	const tint = $derived({ cobalt: 'text-cobalt', grass: 'text-grass', mustard: 'text-mustard', accent: 'text-accent' }[color]);
</script>

<svg viewBox="0 0 400 400" class="story-splash pointer-events-none absolute -z-10 {tint} {className}" aria-hidden="true">
	<defs>
		<radialGradient id="pool-{uid}">
			<stop offset="0" stop-color="currentColor" stop-opacity="0.45" />
			<stop offset="0.72" stop-color="currentColor" stop-opacity="0.8" />
			<stop offset="1" stop-color="currentColor" stop-opacity="1" />
		</radialGradient>
		<filter id="tear-{uid}" x="-25%" y="-25%" width="150%" height="150%">
			<feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" {seed} result="n" />
			<feDisplacementMap in="SourceGraphic" in2="n" scale="78" xChannelSelector="R" yChannelSelector="G" result="d" />
			<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" {seed} result="grain" />
			<!-- speckle thins the paint (alpha only), so the colour itself never greys -->
			<feColorMatrix in="grain" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.55 0 0 0 1" result="speckle" />
			<feComposite in="d" in2="speckle" operator="in" />
		</filter>
	</defs>
	<g filter="url(#tear-{uid})">
		<circle cx="200" cy="200" r="118" fill="url(#pool-{uid})" />
		<circle cx="338" cy="118" r="13" fill="currentColor" />
		<circle cx="306" cy="332" r="8" fill="currentColor" />
		<circle cx="74" cy="92" r="6" fill="currentColor" />
		<circle cx="362" cy="210" r="4" fill="currentColor" />
	</g>
</svg>
