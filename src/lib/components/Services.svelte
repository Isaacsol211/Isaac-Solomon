<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK, REDUCED_MOTION } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails, servicesIntro } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	let sectionEl = $state<HTMLElement>();
	let activeIndex = $state(0);

	/*
	 * No pin. The previous version pinned a screen-height stage and scrubbed the
	 * list through it, but the list is ~1,276px tall and a 1280×720 laptop gives
	 * it 720. Rows 1, 4 and 5 were never fully on screen at any scroll position;
	 * the section clipped them and the snap made it impossible to stop in
	 * between. Now the list is ordinary page flow — every row is reachable by
	 * scrolling, at any viewport height, with text zoom, on a phone — and only
	 * the compact card on the left is sticky. Sticky never clips: if the column
	 * is taller than the viewport it simply scrolls with the page.
	 *
	 * The card mirrors whichever row is crossing the viewport's midline. Under
	 * reduced motion the same observation runs with zero-duration transitions;
	 * observing scroll position is not motion, animating in response to it is.
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
				const cards = sectionEl!.querySelectorAll('[data-service-card]');
				const rows = sectionEl!.querySelectorAll('[data-service-row]');
				const duration = reduced ? 0 : 0.35;

				let current = -1;
				const show = (next: number) => {
					if (next === current) return;
					current = next;
					activeIndex = next;
					gsap.to(cards, {
						opacity: (i) => (i === next ? 1 : 0),
						yPercent: (i) => (i === next ? 0 : 6),
						scale: (i) => (i === next ? 1 : 0.97),
						duration,
						ease: 'power2.out',
						overwrite: true
					});
				};

				gsap.set(cards, { opacity: 0, yPercent: 6, scale: 0.97 });
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
					A decorative mirror of the active row, so aria-hidden: the list on the
					right is the real content and the only copy assistive tech sees. That
					also keeps five duplicate h3s out of heading navigation.
				-->
				<div
					aria-hidden="true"
					class="relative mt-8 hidden h-[clamp(18rem,44vh,25rem)] overflow-hidden rounded-[2rem] border border-line bg-paper md:block"
				>
					{#each serviceDetails as service, i (service.title)}
						<div data-service-card class="absolute inset-0 flex flex-col justify-between p-7">
							<div>
								<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-dim">chapter 0{i + 1}</p>
								<p class="mt-4 text-3xl font-medium tracking-tight lowercase text-ink">
									{service.title}
								</p>
								<p class="mt-3 max-w-sm text-sm leading-relaxed text-dim">{service.summary}</p>
							</div>
							<div class="space-y-2 border-t border-line pt-5">
								{#each service.items as item (item)}
									<div class="flex items-baseline gap-3 text-sm lowercase text-dim">
										<span class="text-dim">✱</span>
										<span>{item}</span>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<ol class="mt-12 border-b border-line md:col-span-7 md:mt-0">
				{#each serviceDetails as service, i (service.title)}
					<li class="group overflow-hidden border-t border-line">
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
