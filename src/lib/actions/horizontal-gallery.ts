import type { Action } from 'svelte/action';

/**
 * GSAP-powered pinned horizontal scroll gallery.
 * On desktop: pins the section and drives horizontal movement via vertical scroll.
 * Per-image effects:
 *   - Scale: images grow as they approach viewport center, shrink as they exit
 *   - Rotation: slight tilt that straightens at center (spreading cards feel)
 * Uses gsap.matchMedia, so resizing across the breakpoint (or toggling
 * reduced-motion) sets up / tears down the pin automatically. On mobile /
 * reduced-motion the section falls back to native overflow scroll.
 */
export const horizontalGallery: Action<HTMLElement> = (node) => {
	let mm: any;

	const init = async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const track = node.querySelector('[data-gallery-track]') as HTMLElement;
		const items = node.querySelectorAll('[data-gallery-item]');
		if (!track || items.length === 0) return;

		mm = gsap.matchMedia();
		mm.add(
			'(min-width: 768px) and (prefers-reduced-motion: no-preference)',
			() => {
				// Functional so invalidateOnRefresh re-measures after resizes
				const totalScroll = () => track.scrollWidth - node.offsetWidth;

				// Main horizontal scroll timeline
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: node,
						start: 'top top',
						end: () => `+=${totalScroll()}`,
						pin: true,
						scrub: 1,
						invalidateOnRefresh: true
					}
				});

				tl.to(track, {
					x: () => -totalScroll(),
					ease: 'none'
				});

				// Per-image effects: scale + rotation
				items.forEach((item, i) => {
					const img = item.querySelector('img');
					if (!img) return;

					// Alternate rotation direction for visual variety
					const rotateStart = i % 2 === 0 ? 3 : -3;

					// Entrance: scale up + rotate to 0
					gsap.fromTo(
						img,
						{ scale: 0.88, rotate: rotateStart },
						{
							scale: 1,
							rotate: 0,
							ease: 'none',
							scrollTrigger: {
								trigger: item,
								containerAnimation: tl,
								start: 'left right',
								end: 'center center',
								scrub: true
							}
						}
					);

					// Exit: scale down + rotate opposite direction
					gsap.to(img, {
						scale: 0.88,
						rotate: -rotateStart,
						ease: 'none',
						scrollTrigger: {
							trigger: item,
							containerAnimation: tl,
							start: 'center center',
							end: 'right left',
							scrub: true
						}
					});
				});
			}
		);
	};

	init();

	return {
		destroy() {
			mm?.revert();
		}
	};
};
