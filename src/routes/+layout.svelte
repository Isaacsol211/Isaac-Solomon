<script lang="ts">
	import '../app.css';
	import 'lenis/dist/lenis.css';
	import favicon from '$lib/assets/favicon.svg';
	import { afterNavigate, onNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { initMotion, onReducedMotionChange, prefersReducedMotion } from '$lib/motion';

	let { children } = $props();

	let lenisInstance: { scrollTo: (target: number, opts?: object) => void } | undefined;

	/*
	 * Smooth scroll — Lenis smooths native scroll (IO scroll-spy, scroll
	 * restoration and view transitions keep working) and drives ScrollTrigger.
	 * Reduced-motion users keep plain native scrolling; touch scrolling stays
	 * native by Lenis default.
	 */
	onMount(() => {
		let destroyed = false;
		let stop: (() => void) | undefined;

		/*
		 * Lenis follows the live preference, not the value at mount. Previously
		 * a visitor who turned reduced motion on mid-session kept smooth scrolling
		 * until reload, and one who turned it off never got it. Now the smoother
		 * is torn down when the preference switches on and rebuilt when it
		 * switches off — the same policy the GSAP scenes get from matchMedia.
		 */
		const start = async () => {
			const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([
				import('lenis'),
				initMotion()
			]);
			// The preference may have flipped while the imports were in flight.
			if (destroyed || stop || prefersReducedMotion()) return;

			// Lenis already reads CSS scroll-margin-top. An additional offset would
			// count the fixed header twice and leave a large gap above every anchor.
			const lenis = new Lenis({ anchors: true, autoRaf: false });
			lenisInstance = lenis;
			lenis.on('scroll', ScrollTrigger.update);
			const raf = (time: number) => lenis.raf(time * 1000);
			gsap.ticker.add(raf);
			gsap.ticker.lagSmoothing(0);

			stop = () => {
				gsap.ticker.remove(raf);
				lenis.destroy();
				lenisInstance = undefined;
				stop = undefined;
			};
		};

		const apply = (reduced: boolean) => {
			if (reduced) stop?.();
			else if (!stop) void start();
		};

		apply(prefersReducedMotion());
		const unsubscribe = onReducedMotionChange(apply);

		return () => {
			destroyed = true;
			unsubscribe();
			stop?.();
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
