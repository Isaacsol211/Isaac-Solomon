/**
 * Central motion module — one lazy GSAP/ScrollTrigger instance for the site.
 * Sections call initMotion() instead of importing gsap themselves, so the
 * plugin registers once and Lenis (see +layout.svelte) can drive
 * ScrollTrigger's ticker for every trigger on the page.
 *
 * What is cached here is the library, and only the library. The previous
 * version also cached a `reducedMotion` boolean read once at first import, so
 * a visitor who switched the OS preference mid-session kept whichever answer
 * the first component happened to see — some sections (already on
 * gsap.matchMedia) reverted, others did not. Preferences are live state:
 * consumers subscribe to the queries below through gsap.matchMedia(), which
 * builds on match and reverts on change, and one policy covers reduced
 * motion, pointer capability and breakpoint alike.
 */

export type Motion = {
	gsap: typeof import('gsap').gsap;
	ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger;
};

/** The three capability questions the site asks. Use these, not ad-hoc strings. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
/** Hover/cursor effects. Touch and coarse pointers get none. */
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';
/** The md breakpoint, for scenes that only make sense in two columns. */
export const MD = '(min-width: 768px)';

let motionPromise: Promise<Motion> | null = null;

/**
 * True once app.html's fail-open timer has added `opened` to <html> — the
 * pre-paint hidden states have expired and the page is showing its final
 * state. Any opening animation that initialises after this must not run:
 * it would hide what the visitor is already looking at and play it back in.
 * Hero and Projects both ask this before choreographing the load.
 */
export function openingAlreadyRevealed(): boolean {
	return document.documentElement.classList.contains('opened');
}

/** Live read — never cache the result across a session. */
export function prefersReducedMotion(): boolean {
	return window.matchMedia(REDUCED_MOTION).matches;
}

/**
 * Subscribe to the reduced-motion preference. Fires on every change, not on
 * subscribe; read prefersReducedMotion() for the initial value. Returns the
 * unsubscribe function. For anything that lives inside a gsap.context, prefer
 * gsap.matchMedia() instead — it handles revert. This is for the few things
 * outside GSAP, such as Lenis and the cursor-preview rAF.
 */
export function onReducedMotionChange(callback: (reduced: boolean) => void): () => void {
	const query = window.matchMedia(REDUCED_MOTION);
	const handler = (event: MediaQueryListEvent) => callback(event.matches);
	query.addEventListener('change', handler);
	return () => query.removeEventListener('change', handler);
}

export function initMotion(): Promise<Motion> {
	motionPromise ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
		([{ gsap }, { ScrollTrigger }]) => {
			gsap.registerPlugin(ScrollTrigger);
			return { gsap, ScrollTrigger };
		}
	);
	return motionPromise;
}
