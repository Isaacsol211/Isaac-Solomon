<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';

	let {
		value,
		suffix = '',
		label,
		delay = 0
	}: { value: number; suffix?: string; label: string; delay?: number } = $props();

	let el: HTMLDivElement | undefined = $state();
	// Prerendered HTML shows the final value (works without JS);
	// with JS the number counts up once it scrolls into view.
	// svelte-ignore state_referenced_locally
	let display = $state(value);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();

				const duration = 1500;
				const start = performance.now();
				const tick = (now: number) => {
					const progress = Math.min(1, (now - start) / duration);
					const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
					display = Math.round(value * eased);
					if (progress < 1) requestAnimationFrame(tick);
				};
				display = 0;
				requestAnimationFrame(tick);
			},
			{ threshold: 0.5 }
		);
		if (el) observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div bind:this={el} use:reveal={{ delay }}>
	<p class="text-5xl font-medium tracking-tight tabular-nums md:text-6xl">
		{display.toLocaleString('en')}<span class="text-accent">{suffix}</span>
	</p>
	<p class="mt-3 max-w-[16rem] text-sm leading-relaxed text-dim">{label}</p>
</div>
