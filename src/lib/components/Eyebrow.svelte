<script lang="ts">
	let {
		title,
		tone = 'light',
		as = 'p'
	}: {
		title: string;
		tone?: 'light' | 'dark';
		/**
		 * Render as the section's h2 where the eyebrow is the only heading.
		 * About and Writing carry no display headline, so without this they are
		 * invisible to heading navigation. Sections that already own an h2
		 * (Projects, Services, Experience, Connect) keep the default `p`.
		 */
		as?: 'p' | 'h2';
	} = $props();
</script>

<svelte:element
	this={as}
	class="flex items-center gap-3 text-xs font-medium tracking-[0.2em] lowercase {tone === 'dark'
		? 'text-cream/50'
		: 'text-dim'}"
>
	<span class="text-accent" aria-hidden="true">✱</span>
	<!--
		The brackets are ornament, so they sit in aria-hidden spans. As an h2 this
		makes the heading read "Writing" rather than "( Writing )" — nothing about
		what is drawn changes.
	-->
	<span
		><span aria-hidden="true">(&nbsp;</span>{title}<span
			aria-hidden="true">&nbsp;)</span
		></span
	>
</svelte:element>
