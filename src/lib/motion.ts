/**
 * Central motion module — one lazy GSAP/ScrollTrigger instance for the site.
 * Sections call initMotion() instead of importing gsap themselves, so the
 * plugin registers once and Lenis (see +layout.svelte) can drive
 * ScrollTrigger's ticker for every trigger on the page.
 */

export type Motion = {
	gsap: typeof import('gsap').gsap;
	ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
	/** Skip scrubs, pins and parallax entirely when true */
	reducedMotion: boolean;
	/** Skip cursor-following / hover-only effects when true */
	isTouch: boolean;
};

let motionPromise: Promise<Motion> | null = null;

export function prefersReducedMotion(): boolean {
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function initMotion(): Promise<Motion> {
	motionPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
		([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			return {
				gsap,
				ScrollTrigger,
				reducedMotion: prefersReducedMotion(),
				isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
			};
		}
	);
	return motionPromise;
}
