<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { serviceDetails, servicesIntro } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	let sectionEl = $state<HTMLElement>();
	let activeIndex = $state(0);

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap, ScrollTrigger, reducedMotion } = await initMotion();
			if (!sectionEl) return;

			const ctx = gsap.context(() => {
				const stage = sectionEl!.querySelector('[data-services-stage]');
				const cards = sectionEl!.querySelectorAll('[data-service-card]');
				const rows = sectionEl!.querySelectorAll('[data-service-row]');
				if (reducedMotion) {
					gsap.set(rows, { opacity: 1, yPercent: 0 });
					gsap.set(cards, { opacity: 1 });
					return;
				}

				let current = 0;
				const setIndex = (next: number) => {
					if (next === current) return;
					current = next;
					activeIndex = next;
					gsap.to(cards, {
						opacity: (_index) => (_index === next ? 1 : 0),
						yPercent: (_index) => (_index === next ? 0 : 8),
						scale: (_index) => (_index === next ? 1 : 0.96),
						duration: 0.45,
						ease: 'power2.out',
						overwrite: true
					});
				};

				if (stage) {
					ScrollTrigger.create({
						trigger: sectionEl,
						start: 'top top',
						end: 'bottom bottom',
						pin: stage,
						snap: {
							snapTo: 1 / (serviceDetails.length - 1),
							duration: { min: 0.16, max: 0.34 },
							delay: 0.04,
							ease: 'power1.inOut'
						},
						onUpdate: (self) => {
							setIndex(
								Math.min(
									serviceDetails.length - 1,
									Math.round(self.progress * (serviceDetails.length - 1))
								)
							);
						}
					});
				}

				gsap.set(cards, { opacity: 0, yPercent: 8, scale: 0.96 });
				gsap.set(cards[0], { opacity: 1, yPercent: 0, scale: 1 });
				gsap.set(rows, { opacity: 0, yPercent: 110 });
				ScrollTrigger.batch(rows, {
					onEnter: (batch) => {
						gsap.to(batch, {
							opacity: 1,
							yPercent: 0,
							duration: 1,
							ease: 'power3.out',
							stagger: 0.1,
							overwrite: true
						});
					},
					start: 'top 88%',
					once: true
				});


			}, sectionEl);

			return ctx;
		};

		ctxPromise = init();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<section bind:this={sectionEl} id="services" class="section-transition relative overflow-hidden border-t border-line px-5 py-20 sm:px-8 md:min-h-[220svh] md:py-0">
	<div data-services-stage class="mx-auto flex max-w-6xl items-center md:h-screen">
		<div class="grid w-full gap-12 md:grid-cols-12 md:gap-10">
			<div class="md:col-span-5 md:sticky md:top-28 md:self-start">
		<div use:reveal>
			<Eyebrow index="02" title="Services" />
		</div>
		<h2
			use:reveal={{ delay: 100 }}
			class="mt-6 max-w-3xl text-4xl font-medium tracking-tight lowercase md:text-6xl"
		>
			{servicesIntro.plain}
			<em class="font-serif font-normal text-dim italic">{servicesIntro.accent}</em>
		</h2>

				<div class="relative mt-8 hidden h-[clamp(18rem,44vh,25rem)] overflow-hidden rounded-[2rem] border border-line bg-paper md:block">
					{#each serviceDetails as service, i (service.title)}
						<div
							data-service-card
							class="absolute inset-0 flex flex-col justify-between p-7"
						>
							<div>
								<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-dim">chapter 0{i + 1}</p>
								<h3 class="mt-4 text-3xl font-medium tracking-tight lowercase text-ink">
									{service.title}
								</h3>
								<p class="mt-3 max-w-sm text-sm leading-relaxed text-dim">{service.summary}</p>
							</div>
							<div class="space-y-2 border-t border-line pt-5">
								{#each service.items as item (item)}
									<div class="flex items-baseline gap-3 text-sm lowercase text-dim">
										<span class="text-dim" aria-hidden="true">✱</span>
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
							class="text-2xl font-medium tracking-tight lowercase transition-colors duration-300 group-hover:text-accent md:col-span-4 {activeIndex === i ? 'text-ink' : ''}"
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
