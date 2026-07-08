<script lang="ts">
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initMotion, prefersReducedMotion } from '$lib/motion';

	let { children } = $props();

	let lenisInstance: { scrollTo: (target: number, opts?: object) => void } | undefined;

	/*
	 * Smooth scroll — Lenis smooths native scroll (IO scroll-spy, scroll
	 * restoration and view transitions keep working) and drives ScrollTrigger.
	 * Reduced-motion users keep plain native scrolling; touch scrolling stays
	 * native by Lenis default.
	 */
	onMount(() => {
		if (prefersReducedMotion()) return;

		let destroyed = false;
		let cleanup: (() => void) | undefined;

		(async () => {
			const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
				import('lenis'),
				initMotion()
			]);
			if (destroyed) return;

			// anchor offset matches the sections' scroll-margin-top (5.5rem fixed nav)
			const lenis = new Lenis({ anchors: { offset: -88 }, autoRaf: false });
			lenisInstance = lenis;
			lenis.on('scroll', ScrollTrigger.update);
			const raf = (time: number) => lenis.raf(time * 1000);
			gsap.ticker.add(raf);
			gsap.ticker.lagSmoothing(0);

			cleanup = () => {
				gsap.ticker.remove(raf);
				lenis.destroy();
				lenisInstance = undefined;
			};
		})();

		return () => {
			destroyed = true;
			cleanup?.();
		};
	});

	// Lenis keeps its own scroll target, so SvelteKit's scroll reset gets
	// smoothed back to the old position on route changes — force it to 0.
	// Skipped for popstate (browser restores scroll) and hash targets.
	afterNavigate(({ type, to }) => {
		if (type === 'popstate' || to?.url.hash) return;
		lenisInstance?.scrollTo(0, { immediate: true, force: true });
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
>
	Skip to content
</a>

{@render children()}
