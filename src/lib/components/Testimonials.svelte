<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { testimonials, testimonialsIntro } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	const proofSignals = [
		{
			label: 'pressure',
			metric: '3-4',
			unit: 'launches / day',
			note: 'builds that keep moving when calendars, catalogues and launch plans change'
		},
		{
			label: 'clarity',
			metric: '11',
			unit: 'languages',
			note: 'interfaces explained clearly enough for real teams and real edge cases'
		},
		{
			label: 'aftercare',
			metric: 'years',
			unit: 'not handoff',
			note: 'systems documented and tuned after the launch-day applause fades'
		}
	];

	let sectionEl = $state<HTMLElement>();
	let activeIndex = $state(0);

	function hasRealName(name: string) {
		return name.trim().toLowerCase() !== 'full name';
	}

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap, ScrollTrigger, reducedMotion } = await initMotion();
			if (!sectionEl) return;

			const ctx = gsap.context(() => {
				if (reducedMotion) return;

				const mm = gsap.matchMedia();
				mm.add('(min-width: 768px)', () => {
					const stage = sectionEl!.querySelector('[data-proof-stage]');
					const quotes = sectionEl!.querySelectorAll('[data-proof-quote]');
					const meter = sectionEl!.querySelector('[data-proof-meter]');
					if (!stage || quotes.length === 0) return;

					let current = 0;
					gsap.set(quotes, { autoAlpha: 0, yPercent: 7, scale: 0.97 });
					gsap.set(quotes[0], { autoAlpha: 1, yPercent: 0, scale: 1 });
					gsap.set(meter, { scaleY: 0, transformOrigin: 'top center' });

					const setIndex = (next: number) => {
						if (next === current) return;
						current = next;
						activeIndex = next;
						gsap.to(quotes, {
							autoAlpha: (i) => (i === next ? 1 : 0),
							yPercent: (i) => (i === next ? 0 : 7),
							scale: (i) => (i === next ? 1 : 0.97),
							duration: 0.42,
							ease: 'power2.out',
							overwrite: true
						});
					};

					const pin = ScrollTrigger.create({
						trigger: sectionEl,
						start: 'top top',
						end: 'bottom bottom',
						pin: stage,
						scrub: 0.7,
						snap: {
							snapTo: 1 / (testimonials.length - 1),
							duration: { min: 0.18, max: 0.36 },
							delay: 0.04,
							ease: 'power1.inOut'
						},
						onUpdate: (self) => {
							const next = Math.min(testimonials.length - 1, Math.round(self.progress * (testimonials.length - 1)));
							setIndex(next);
							gsap.set(meter, { scaleY: self.progress });
						}
					});

					return () => pin.kill();
				});

				return () => mm.revert();
			}, sectionEl);

			return ctx;
		};

		ctxPromise = init();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<section
	bind:this={sectionEl}
	id="testimonials"
	class="section-transition-dark relative overflow-hidden border-t border-cream/10 bg-coal px-5 py-20 text-cream sm:px-8 md:min-h-[260svh] md:py-0"
>
	<div data-proof-stage class="relative mx-auto flex max-w-6xl items-center md:min-h-screen">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute -left-[8vw] top-8 hidden text-[18vw] leading-none font-medium tracking-[-0.08em] text-cream/[0.025] lowercase md:block"
		>
			proof<br />work
		</div>

		<div class="relative z-10 grid w-full gap-12 md:grid-cols-12 md:items-center md:gap-10">
			<div class="md:col-span-5">
				<div use:reveal>
					<Eyebrow index="06" title="Proof of Work" tone="dark" />
				</div>
				<div use:reveal={{ delay: 100 }} class="mt-6">
					<p class="font-serif text-2xl text-cream/55 italic md:text-3xl">{testimonialsIntro.plain} {testimonialsIntro.accent}</p>
					<h2 class="mt-5 max-w-3xl text-[clamp(3rem,6vw,6.8rem)] leading-[0.9] font-medium tracking-[-0.045em] lowercase">
						when the brief moves, the work still holds<span class="text-accent">.</span>
					</h2>
					<p class="mt-6 max-w-md text-sm leading-relaxed text-cream/58">{testimonialsIntro.note}</p>
				</div>

				<div class="mt-12 hidden items-stretch gap-6 md:flex">
					<div class="relative w-px overflow-hidden rounded-full bg-cream/10">
						<div data-proof-meter class="absolute inset-x-0 top-0 h-full origin-top bg-accent"></div>
					</div>
					<ol class="flex-1">
						{#each proofSignals as signal, i (signal.label)}
							<li
								class="flex items-baseline gap-4 border-t border-cream/10 py-4 transition-colors duration-300 first:border-t-0 first:pt-0 last:pb-0 {activeIndex === i
									? 'text-cream'
									: 'text-cream/35'}"
							>
								<span class="text-[10px] font-medium tabular-nums tracking-[0.22em]">0{i + 1}</span>
								<span class="text-sm font-medium lowercase {activeIndex === i ? 'text-accent' : ''}">{signal.label}</span>
								<span class="ml-auto text-[10px] font-medium tracking-[0.16em] lowercase">{signal.unit}</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<div class="md:col-span-7">
				<div class="relative grid gap-5 md:h-[30rem] md:block">
					{#each testimonials as t, i (t.role)}
						<figure
							data-proof-quote
							class="group overflow-hidden rounded-[2rem] border border-cream/10 bg-[#1c1916]/85 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur md:absolute md:inset-0 md:flex md:flex-col md:justify-between md:p-10 {i === 0 ? 'md:opacity-100' : 'md:opacity-0'}"
						>
							<div>
								<span aria-hidden="true" class="block font-serif text-7xl leading-none text-accent/80 md:text-8xl">“</span>
								<blockquote class="mt-6 text-[clamp(1.4rem,2.3vw,2.35rem)] leading-[1.2] tracking-[-0.02em] text-cream">
									{t.quote}
								</blockquote>
							</div>

							<figcaption class="mt-10 grid gap-5 border-t border-cream/10 pt-6 md:grid-cols-12 md:items-end">
								<div class="md:col-span-5">
									{#if hasRealName(t.name)}
										<p class="text-base font-medium text-cream">{t.name}</p>
									{:else}
										<p class="text-base font-medium text-cream/65">Collaborator signal</p>
									{/if}
									<p class="mt-1 text-[11px] font-medium tracking-[0.18em] uppercase text-cream/42">{t.role}</p>
								</div>
								<p class="text-sm leading-relaxed text-cream/52 md:col-span-7">
									{proofSignals[i]?.note}
								</p>
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
