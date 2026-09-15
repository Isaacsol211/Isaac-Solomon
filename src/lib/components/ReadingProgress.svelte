<script lang="ts">
	/*
	 * A hairline at the top of an article that fills with the reading position.
	 * The one piece of continuous feedback inside an article; the paragraphs
	 * themselves never move. Pure measurement — no library, no reduced-motion
	 * branch needed because it only ever mirrors where the reader already is.
	 */
	let scrollY = $state(0);
	let innerHeight = $state(1);
	let scrollHeight = $state(1);

	const progress = $derived(Math.min(1, Math.max(0, scrollY / Math.max(1, scrollHeight - innerHeight))));

	$effect(() => {
		const measure = () => (scrollHeight = document.documentElement.scrollHeight);
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(document.documentElement);
		return () => ro.disconnect();
	});
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div aria-hidden="true" class="fixed inset-x-0 top-0 z-60 h-px origin-left bg-accent" style="transform: scaleX({progress});"></div>
