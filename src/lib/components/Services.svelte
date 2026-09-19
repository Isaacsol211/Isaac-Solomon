<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK, REDUCED_MOTION } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails, servicesEngagement, servicesIntro } from '$lib/content';
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
				activeIndex = 0;

				rows.forEach((row, i) => {
					ScrollTrigger.create({
						trigger: row,
						start: 'top 55%',
						end: 'bottom 55%',
						onToggle: (self) => {
							if (self.isActive) activeIndex = i;
						}
					});
				});

				if (reduced) return;

				// A small rise keeps the trigger near the visible row, including direct anchor visits.
				gsap.set(rows, { opacity: 0, y: 20 });
				ScrollTrigger.batch(rows, {
					onEnter: (batch) => {
						gsap.to(batch, {
							opacity: 1,
								y: 0,
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
	class="section-transition relative border-t border-line px-5 py-20 sm:px-8 lg:py-32"
>
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-8 lg:grid-cols-12 lg:gap-10">
			<div class="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
				<div use:reveal>
					<Eyebrow title="Services" />
				</div>
				<h2
					use:reveal={{ delay: 100 }}
					class="mt-6 max-w-3xl text-4xl font-medium tracking-tight lowercase lg:text-6xl"
				>
					{servicesIntro.plain}
					<em class="font-serif font-normal text-dim italic">{servicesIntro.accent}</em>
				</h2>

				<!--
					A working diagram of the active service — content into a page, an
					option into a cart, blocks driven by scroll, checks across devices, a
					product through versions. Decorative to assistive tech: the list
					beside it is the content. It carried a caption explaining that it was
					an illustration rather than a screenshot; a drawing that has to say
					so is not drawn clearly enough, so the caption went and the linework
					got the contrast instead.
				-->
				<div class="mt-8 hidden lg:block">
					<ServicesDiagram index={activeIndex} />
				</div>
			</div>

			<ol class="border-b border-line lg:col-span-7">
				{#each serviceDetails as service, i (service.title)}
					<li class="group overflow-hidden border-t border-line">
						<!--
							Two columns, not four. Title, number and deliverables in the left
							column; the summary gets the rest of the row. Split three ways the
							summary measured 202px at 14px — about 29 characters a line, which
							is a column of hyphenation, not prose.

							Proof links, where a row has one, keep it in the keyboard path. Focus selects
							the corresponding desktop illustration as well as scrolling.
						-->
						<!--
							Two explicit tracks, not twelve. A nested grid-cols-12 with a
							gap-x-10 spent 440px of a 655px row on gutters and left the
							summary 366px; a fixed title rail plus the remainder gives it
							about 450.
						-->
						<div
							data-service-row
							onfocusin={() => (activeIndex = i)}
							class="grid gap-3 py-8 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-x-8 lg:py-9"
						>
							<div class="flex items-center justify-between gap-4 lg:block">
								<div class="min-w-0">
									<p class="text-sm tabular-nums text-dim">0{i + 1}</p>
									<h3
										class="mt-2 text-xl leading-tight font-medium tracking-tight lowercase transition-colors duration-300 group-hover:text-accent lg:text-2xl {activeIndex ===
										i
											? 'text-ink'
											: ''}"
									>
										{service.title}
									</h3>
								</div>
								<div class="w-[168px] shrink-0 lg:hidden" aria-hidden="true">
									<ServicesDiagram index={i} compact />
								</div>
							</div>
							<div>
								<p class="text-base leading-relaxed text-dim">{service.summary}</p>
								<!-- The deliverables, beneath the sentence they belong to and wide enough to pair up. -->
								<ul class="mt-4 hidden gap-x-8 gap-y-2.5 lg:grid xl:grid-cols-2">
									{#each service.items as item (item)}
										<li class="text-sm lowercase text-dim">
											<span class="text-dim" aria-hidden="true">—</span>
											{item}
										</li>
									{/each}
								</ul>
								{#if service.proof}
									<a href={service.proof.href} class="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-accent-text underline decoration-accent-text/40 underline-offset-4 transition-colors hover:text-ink focus-visible:text-ink">
										{service.proof.label}<span aria-hidden="true">↗</span>
									</a>
								{/if}
							</div>
						</div>
					</li>
				{/each}
			</ol>

			<!--
				The list says what the work is; this says how it is taken on. Both
				facts are already in the experience section further down — full-time
				at Able.do since 2017, freelance part-time alongside it since 2026 —
				but a client reading the services has no reason to scroll for them.
			-->
			<div use:reveal class="mt-8 lg:col-start-6 lg:col-span-7 lg:mt-10">
				<p class="max-w-lg text-sm leading-relaxed text-dim">{servicesEngagement.note}</p>
				<a
					href={servicesEngagement.href}
					class="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent-text underline-offset-4 transition-colors hover:text-ink focus-visible:text-ink"
				>
					{servicesEngagement.linkLabel}
					<!-- Contact is below this section, so the arrow points down the page. -->
					<span class="transition-transform group-hover:translate-y-0.5 group-focus-visible:translate-y-0.5" aria-hidden="true">↓</span>
				</a>
			</div>
		</div>
	</div>
</section>

<style>
	/* A keyboard user can reach a proof link before its scroll entrance runs. */
	[data-service-row]:focus-within { opacity: 1 !important; transform: none !important; }
</style>
