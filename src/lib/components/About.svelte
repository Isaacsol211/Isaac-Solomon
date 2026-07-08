<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { about, clients } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	let sectionEl = $state<HTMLElement>();

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap, reducedMotion } = await initMotion();
			if (!sectionEl) return;

			const ctx = gsap.context(() => {
				const portrait = sectionEl!.querySelector('[data-about-portrait]');
				const lead = sectionEl!.querySelector('[data-about-lead]');
				if (reducedMotion) return;

				if (portrait) {
					gsap.fromTo(
						portrait,
						{ yPercent: 18, scale: 0.92, rotate: -4 },
						{
							yPercent: -8,
							scale: 1,
							rotate: 0,
							ease: 'none',
							scrollTrigger: {
								trigger: sectionEl,
								start: 'top bottom',
								end: 'center center',
								scrub: true
							}
						}
					);
				}
				if (lead) {
					gsap.fromTo(
						lead,
						{ opacity: 0.2, y: 90 },
						{
							opacity: 1,
							y: 0,
							ease: 'none',
							scrollTrigger: {
								trigger: sectionEl,
								start: 'top 78%',
								end: 'top 28%',
								scrub: true
							}
						}
					);
				}
			}, sectionEl);

			return ctx;
		};

		ctxPromise = init();

		return () => {
			ctxPromise?.then((ctx) => ctx?.revert());
		};
	});
</script>

<section bind:this={sectionEl} id="about" class="section-transition relative py-20 md:py-32">
	<div class="mx-auto max-w-6xl px-5 sm:px-8">
		<div class="grid gap-12 md:grid-cols-12 md:gap-16">
			<div class="md:col-span-4">
				<div use:reveal class="md:sticky md:top-28">
					<Eyebrow index="01" title="About Me" />
					<img
						data-about-portrait
						src={about.portrait}
						alt={about.portraitAlt}
						width="1200"
						height="1199"
						loading="lazy"
						class="mt-8 w-full max-w-[14rem] rounded-2xl sm:max-w-xs"
					/>
				</div>
			</div>

			<div class="md:col-span-8">
				<p data-about-lead use:reveal class="text-2xl leading-snug font-medium tracking-tight md:text-4xl">
					{about.lead}
					<em class="font-serif font-normal text-dim italic">{about.leadAccent}</em>
				</p>

				{#each about.paragraphs as paragraph, i (i)}
					<p
						use:reveal={{ delay: 80 * (i + 1) }}
						class="{i === 0 ? 'mt-10 md:mt-14' : 'mt-8'} max-w-2xl text-base leading-[1.9] text-dim md:text-lg"
					>
						{paragraph}
					</p>
				{/each}
			</div>
		</div>
	</div>

	<!-- Client wordmarks — full-bleed serif marquee (static wrapped row when reduced-motion) -->
	<div use:reveal class="mt-16 border-t border-line pt-10 md:mt-32">
		<p class="mx-auto max-w-6xl px-5 text-xs font-medium tracking-[0.25em] uppercase text-dim sm:px-8">
			Brands I've shipped for
		</p>
		<div class="marquee mt-6">
			<div class="marquee-track">
				{#each [false, true] as duplicate (duplicate)}
					<ul class="flex shrink-0 items-baseline" aria-hidden={duplicate}>
						{#each clients as client (client)}
							<li
								class="flex items-baseline font-serif text-2xl italic text-dim/80 transition-colors duration-300 hover:text-ink md:text-3xl"
							>
								{client}
								<span aria-hidden="true" class="mx-6 not-italic text-accent md:mx-8">·</span>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	</div>
</section>
