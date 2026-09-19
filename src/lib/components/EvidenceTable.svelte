<script lang="ts">
	/*
	 * Before/after evidence inside an article, in the site's own palette: the
	 * old value struck through in dim, the new one in ink behind an orange dot.
	 * `before` is optional, so the same component carries plain label/value lists.
	 */
	let {
		eyebrow,
		title,
		rows
	}: {
		eyebrow: string;
		title: string;
		rows: { label: string; before?: string; after: string; note?: string }[];
	} = $props();

	const compare = $derived(rows.some((row) => row.before));
</script>

<div class="not-prose my-10 overflow-hidden rounded-3xl border-2 border-ink">
	<div class="border-b border-line px-6 py-4">
		<p class="font-serif text-lg italic lowercase text-accent-text">{eyebrow}</p>
		<p class="mt-1 font-medium tracking-tight text-ink">{title}</p>
	</div>
	<div class="divide-y divide-line">
		{#each rows as row (row.label)}
			<div
				class="grid gap-x-6 gap-y-1 px-6 py-3.5 text-sm {compare
					? 'sm:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1fr)]'
					: 'sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]'}"
			>
				<span class="text-xs font-medium text-dim">{row.label}</span>
				{#if compare}
					{#if row.before}
						<span class="text-dim line-through decoration-line">{row.before}</span>
					{:else}
						<span class="hidden sm:block"></span>
					{/if}
				{/if}
				<span class="flex items-start gap-2 font-medium text-ink">
					<span aria-hidden="true" class="mt-[7px] size-1.5 shrink-0 rounded-full bg-accent"></span>
					{row.after}
				</span>
				{#if row.note}
					<p class="text-xs leading-relaxed text-dim {compare ? 'sm:col-span-3' : 'sm:col-span-2'}">{row.note}</p>
				{/if}
			</div>
		{/each}
	</div>
</div>
