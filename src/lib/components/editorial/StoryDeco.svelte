<script lang="ts">
	/*
	 * Small editorial print motifs — registration crosses, dot patches, a hand
	 * squiggle, a scattered star. Purely decorative, hidden from assistive tech.
	 * Positioned by the caller via `class`.
	 */
	let { kind, class: className = '' }: { kind: 'dots' | 'cross' | 'squiggle' | 'star'; class?: string } =
		$props();
</script>

{#if kind === 'dots'}
	<svg class={className} viewBox="0 0 56 44" fill="var(--color-ink)" aria-hidden="true" opacity="0.28">
		{#each [0, 1, 2, 3] as r (r)}
			{#each [0, 1, 2, 3, 4, 5, 6] as c (c)}
				<circle cx={4 + c * 8} cy={4 + r * 12} r="1.6" />
			{/each}
		{/each}
	</svg>
{:else if kind === 'cross'}
	<svg class={className} viewBox="0 0 24 24" stroke="var(--color-dim)" stroke-width="1.5" aria-hidden="true">
		<path d="M12 3v18M3 12h18" />
	</svg>
{:else if kind === 'squiggle'}
	<svg class={className} viewBox="0 0 120 12" fill="none" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
		<path d="M2 7c8-7 16 5 24 0s16-7 24 0 16 5 24 0 16-7 24 0" />
	</svg>
{:else if kind === 'star'}
	<span class={className} aria-hidden="true">✱</span>
{/if}
