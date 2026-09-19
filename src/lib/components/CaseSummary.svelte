<script lang="ts">
	import { writing } from '$lib/content';

	/*
	 * The at-a-glance block under a case study's dek: what Isaac did, with whom,
	 * on what, and what came of it — the same fields on every article, from the
	 * same record the homepage card reads.
	 */
	let { href }: { href: string } = $props();

	const s = writing.find((a) => a.href === href)?.summary;
	const cells = s
		? [
				{ label: 'Role', value: s.role },
				{ label: 'Team', value: s.team },
				{ label: 'Employer', value: s.employer },
				{ label: 'Stack', value: s.stack },
				{ label: 'Timeline', value: s.timeline }
			].filter((c): c is { label: string; value: string } => Boolean(c.value))
		: [];
</script>

{#if s}
	<dl class="mt-8 grid gap-x-8 gap-y-5 border-y border-line py-6 sm:grid-cols-2 md:grid-cols-3">
		{#each cells as cell (cell.label)}
			<div>
				<dt class="text-[11px] font-medium tracking-[0.2em] uppercase text-dim">{cell.label}</dt>
				<dd class="mt-1.5 text-sm leading-relaxed text-ink">{cell.value}</dd>
			</div>
		{/each}
		{#if s.live}
			<div>
				<dt class="text-[11px] font-medium tracking-[0.2em] uppercase text-dim">Live</dt>
				<dd class="mt-1.5 text-sm">
					<a href={s.live.href} target="_blank" rel="noopener noreferrer" class="text-accent-text underline underline-offset-4 hover:text-ink">
						{s.live.label} <span aria-hidden="true">↗</span>
					</a>
				</dd>
			</div>
		{/if}
		<div class="sm:col-span-2 md:col-span-3">
			<dt class="sr-only">Outcome</dt>
			<dd class="font-serif text-xl leading-snug text-ink/90 italic md:text-2xl">{s.outcome}</dd>
		</div>
	</dl>
{/if}
