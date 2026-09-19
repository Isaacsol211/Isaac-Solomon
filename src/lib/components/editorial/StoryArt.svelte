<script lang="ts">
	/*
	 * Hand-built storybook illustrations for the experimental editorial homepage.
	 * Flat fills from the paper/ink palette plus one accent each, drawn with a
	 * gentle turbulence displacement so the linework wobbles like a pen line
	 * rather than a geometric path. Decorative — hidden from assistive tech.
	 */
	let { kind, class: className = '' }: { kind: 'lookup' | 'deskcat' | 'bust'; class?: string } =
		$props();
</script>

<svg
	viewBox="0 0 320 340"
	class={className}
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<defs>
		<filter id="story-rough-{kind}" x="-10%" y="-10%" width="120%" height="120%">
			<feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="2" seed="7" result="n" />
			<feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" />
		</filter>
	</defs>

	<g filter="url(#story-rough-{kind})">
		{#if kind === 'lookup'}
			<!-- A face tilted up, in a soft cobalt beret -->
			<g transform="rotate(-4 160 190)">
				<!-- neck + collar -->
				<path d="M138 262c0 20 4 34 22 34s24-14 24-34" fill="var(--color-story-paper)" stroke="var(--color-ink)" stroke-width="3" />
				<path d="M126 300c10-14 24-20 34-20s26 6 36 20" stroke="var(--color-ink)" stroke-width="3" />
				<!-- hair behind -->
				<path d="M86 150c-14 60 6 118 74 118s86-58 74-118c-10-46-40-70-74-70s-64 24-74 70Z" fill="var(--color-ink)" />
				<!-- face -->
				<path d="M96 170c-6 58 22 96 64 96s70-38 64-96c-5-44-30-70-64-70s-59 26-64 70Z" fill="#f0d1a4" stroke="var(--color-ink)" stroke-width="3" />
				<!-- ears -->
				<path d="M96 188c-10-4-16 4-14 14s12 14 18 10" fill="#f0d1a4" stroke="var(--color-ink)" stroke-width="3" />
				<path d="M224 188c10-4 16 4 14 14s-12 14-18 10" fill="#f0d1a4" stroke="var(--color-ink)" stroke-width="3" />
				<!-- cheeks -->
				<ellipse cx="118" cy="212" rx="15" ry="11" fill="var(--color-accent)" opacity="0.32" />
				<ellipse cx="202" cy="212" rx="15" ry="11" fill="var(--color-accent)" opacity="0.32" />
				<!-- brows -->
				<path d="M112 172c10-6 22-6 30-1" stroke="var(--color-ink)" stroke-width="3" />
				<path d="M178 171c10-5 22-5 30 2" stroke="var(--color-ink)" stroke-width="3" />
				<!-- eyes, looking up -->
				<ellipse cx="128" cy="188" rx="7" ry="8" fill="var(--color-ink)" />
				<ellipse cx="192" cy="188" rx="7" ry="8" fill="var(--color-ink)" />
				<circle cx="130" cy="185" r="2.4" fill="var(--color-story-paper)" />
				<circle cx="194" cy="185" r="2.4" fill="var(--color-story-paper)" />
				<!-- nose + mouth -->
				<path d="M158 196c-3 10-8 16-2 20" stroke="var(--color-ink)" stroke-width="3" />
				<path d="M142 232c8 8 26 8 34 0" stroke="var(--color-ink)" stroke-width="3" />
				<!-- beret -->
				<path d="M78 128c-2-30 34-52 82-52s84 20 84 46c0 12-16 16-42 16-8 10-30 12-46 12-40 0-76-4-78-22Z" fill="var(--color-cobalt)" stroke="var(--color-ink)" stroke-width="3" />
				<circle cx="176" cy="70" r="8" fill="var(--color-cobalt)" stroke="var(--color-ink)" stroke-width="3" />
			</g>
		{:else if kind === 'deskcat'}
			<!-- A cat perched on a little monitor showing code -->
			<!-- monitor -->
			<rect x="52" y="150" width="216" height="128" rx="14" fill="var(--color-paper-2)" stroke="var(--color-ink)" stroke-width="3" />
			<rect x="70" y="166" width="180" height="82" rx="6" fill="var(--color-story-paper)" stroke="var(--color-ink)" stroke-width="2.5" />
			<path d="M84 186h60" stroke="var(--color-grass)" stroke-width="6" />
			<path d="M84 204h96" stroke="var(--color-ink)" stroke-width="6" opacity="0.5" />
			<path d="M84 222h40" stroke="var(--color-accent)" stroke-width="6" />
			<path d="M132 222h54" stroke="var(--color-ink)" stroke-width="6" opacity="0.25" />
			<!-- stand -->
			<path d="M146 278l-6 22h40l-6-22" fill="var(--color-paper-2)" stroke="var(--color-ink)" stroke-width="3" />
			<path d="M116 302h88" stroke="var(--color-ink)" stroke-width="3" />
			<!-- cat sitting on top -->
			<path d="M120 150c-4-40 10-70 40-70s44 30 40 70Z" fill="var(--color-ink)" />
			<path d="M126 96l-8-26 26 14Z" fill="var(--color-ink)" />
			<path d="M194 96l8-26-26 14Z" fill="var(--color-ink)" />
			<!-- tail curling along the monitor top -->
			<path d="M198 150c26 2 44-6 40-24s-24-16-26-2" stroke="var(--color-ink)" stroke-width="7" />
			<!-- face -->
			<circle cx="146" cy="120" r="4" fill="var(--color-story-paper)" />
			<circle cx="174" cy="120" r="4" fill="var(--color-story-paper)" />
			<path d="M156 132l4 4 4-4" stroke="var(--color-mustard)" stroke-width="3" />
			<path d="M150 130c-16 4-24 2-30-2M170 130c16 4 24 2 30-2" stroke="var(--color-ink)" stroke-width="2" opacity="0.5" />
		{:else if kind === 'bust'}
			<!-- A calm portrait bust in a green shirt, a small cup in hand -->
			<!-- shoulders / shirt -->
			<path d="M64 322c0-46 38-74 96-74s96 28 96 74Z" fill="var(--color-grass)" stroke="var(--color-ink)" stroke-width="3" />
			<path d="M132 252c8 16 48 16 56 0" stroke="var(--color-ink)" stroke-width="3" />
			<!-- hair back -->
			<path d="M92 150c-12 54 8 108 68 108s80-54 68-108c-10-42-36-64-68-64s-58 22-68 64Z" fill="var(--color-ink)" />
			<!-- face -->
			<path d="M100 166c-6 52 22 88 60 88s66-36 60-88c-5-40-28-64-60-64s-55 24-60 64Z" fill="#f0d1a4" stroke="var(--color-ink)" stroke-width="3" />
			<!-- side-parted fringe -->
			<path d="M104 150c14-22 40-34 66-30 20 3 34 14 42 30-18-8-34-12-56-12s-38 4-52 12Z" fill="var(--color-ink)" />
			<!-- cheeks -->
			<ellipse cx="126" cy="196" rx="14" ry="10" fill="var(--color-accent)" opacity="0.28" />
			<ellipse cx="194" cy="196" rx="14" ry="10" fill="var(--color-accent)" opacity="0.28" />
			<!-- eyes -->
			<path d="M120 178c8-6 20-6 26 0" stroke="var(--color-ink)" stroke-width="3.5" />
			<path d="M174 178c8-6 20-6 26 0" stroke="var(--color-ink)" stroke-width="3.5" />
			<!-- nose + smile -->
			<path d="M158 184c-3 10-8 16-2 20" stroke="var(--color-ink)" stroke-width="3" />
			<path d="M138 214c10 10 34 10 44 0" stroke="var(--color-ink)" stroke-width="3" />
			<!-- little cup with steam -->
			<rect x="196" y="278" width="40" height="30" rx="6" fill="var(--color-story-paper)" stroke="var(--color-ink)" stroke-width="3" />
			<path d="M236 286c12-2 12 16 0 14" stroke="var(--color-ink)" stroke-width="3" />
			<path d="M210 268c-4-8 4-12 0-20M224 268c-4-8 4-12 0-20" stroke="var(--color-ink)" stroke-width="2.5" opacity="0.5" />
		{/if}
	</g>
</svg>
