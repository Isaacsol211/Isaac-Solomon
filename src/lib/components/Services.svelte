<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK, REDUCED_MOTION } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails, servicesIntro } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';
	import ServicesDiagram from './ServicesDiagram.svelte';

	let sectionEl = $state<HTMLElement>();
	let activeIndex = $state(0);

	/*
	 * No pin. The previous version pinned a screen-height stage and scrubbed the
	 * list through it, but the list is ~1,276px tall and a 1280×720 laptop gives
	 * it 720. Rows 1, 4 and 5 were never fully on screen at any scroll position;
	 * the section clipped them and the snap made it impossible to stop in
	 * between. Now the list is ordinary page flow — every row is reachable by
	 * scrolling, at any viewport height, with text zoom, on a phone — and only
	 * the diagram on the left is sticky. Sticky never clips: if the column is
	 * taller than the viewport it simply scrolls with the page.
	 *
	 * The diagram mirrors whichever row is crossing the viewport's midline, or
	 * whichever row has keyboard focus. Observing scroll position is not motion;
	 * the diagram's own transitions are CSS and switch off under reduced motion.
	 */
	onMount(() => {
		let mm: ReturnType<(typeof import('gsap'))['gsap']['matchMedia']> | undefined;
		let cancelled = false;

		(async () => {
			const { gsap, ScrollTrigger } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia(sectionEl);
			mm.add({ ok: MOTION_OK, reduced: REDUCED_MOTION }, (context) => {
				const reduced = Boolean(context.conditions?.reduced);
				const rows = sectionEl!.querySelectorAll('[data-service-row]');

				/* The diagram on the left mirrors whichever row crosses the midline;
				   its state changes are CSS transitions inside ServicesDiagram. */
				let current = -1;
				const show = (next: number) => {
					if (next === current) return;
					current = next;
					activeIndex = next;
				};
				show(0);

				rows.forEach((row, i) => {
					ScrollTrigger.create({
						trigger: row,
						start: 'top 55%',
						end: 'bottom 55%',
						onToggle: (self) => {
							if (self.isActive) show(i);
						}
					});
				});

				if (reduced) {
					gsap.set(rows, { opacity: 1, yPercent: 0 });
					return;
				}

				// Line-mask entrance: each <li> is overflow-hidden, so 110% slides in from below the rule.
				gsap.set(rows, { opacity: 0, yPercent: 110 });
				ScrollTrigger.batch(rows, {
					onEnter: (batch) => {
						gsap.to(batch, {
							opacity: 1,
							yPercent: 0,
							duration: 0.9,
							ease: 'power3.out',
							stagger: 0.08,
							overwrite: true
						});
					},
					start: 'top 88%',
					once: true
				});
			});
		})();

		return () => {
			cancelled = true;
			mm?.revert();
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="services"
	class="section-transition relative border-t border-line px-5 py-20 sm:px-8 md:py-32"
>
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-12 md:grid-cols-12 md:gap-10">
			<div class="md:sticky md:top-28 md:col-span-5 md:self-start">
				<div use:reveal>
					<Eyebrow title="Services" />
				</div>
				<h2
					use:reveal={{ delay: 100 }}
					class="mt-6 max-w-3xl text-4xl font-medium tracking-tight lowercase md:text-6xl"
				>
					{servicesIntro.plain}
					<em class="font-serif font-normal text-dim italic">{servicesIntro.accent}</em>
				</h2>

				<!--
					A working diagram of the active service — content into a page, an
					option into a cart, blocks driven by scroll, checks across devices, a
					product through versions. Decorative to assistive tech (the list is
					the content), and labelled as an illustration, not a screenshot.
				-->
				<div class="mt-8 hidden md:block">
					<ServicesDiagram index={activeIndex} />
				</div>
			</div>

			<ol class="mt-12 border-b border-line md:col-span-7 md:mt-0">
				{#each serviceDetails as service, i (service.title)}
					<li class="group overflow-hidden border-t border-line">
						<div class="mt-6 md:hidden" aria-hidden="true">
							<ServicesDiagram index={i} compact />
						</div>
						<!-- No tabindex: the rows hold no controls, and keyboard scrolling drives the midline trigger like any other scrolling. -->
						<div data-service-row class="grid gap-2 py-8 md:grid-cols-12 md:gap-6 md:py-9">
							<span class="text-sm tabular-nums text-dim md:col-span-1">0{i + 1}</span>
							<h3
								class="text-2xl font-medium tracking-tight lowercase transition-colors duration-300 group-hover:text-accent md:col-span-4 {activeIndex ===
								i
									? 'text-ink'
									: ''}"
							>
								{service.title}
							</h3>
							<p class="text-sm leading-relaxed text-dim md:col-span-4">
								{service.summary}
							</p>
							<ul class="mt-2 space-y-1.5 md:col-span-3 md:mt-0">
								{#each service.items as item (item)}
									<li class="text-sm lowercase text-dim">
										<span class="text-dim" aria-hidden="true">—</span>
										{item}
									</li>
								{/each}
							</ul>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>
