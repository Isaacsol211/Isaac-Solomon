import type { Action } from 'svelte/action';

type RevealOptions = {
	/** Stagger delay in ms */
	delay?: number;
};

/**
 * Scroll-reveal action. The element is fully visible without JS
 * (the .reveal class is only added once the action runs client-side).
 */
export const reveal: Action<HTMLElement, RevealOptions | undefined> = (node, options) => {
	if (options?.delay) node.style.setProperty('--reveal-delay', `${options.delay}ms`);
	node.classList.add('reveal');

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('is-visible');
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
