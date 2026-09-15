<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { photos, about, clients } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	let sectionEl = $state<HTMLElement>();

	/** One frame from the archive beside the portrait — the personal detail. */
	const aside = photos.find((p) => p.place === 'Base Camp') ?? photos[0];

	onMount(() => {
		let ctxPromise: Promise<any> | undefined;

		const init = async () => {
			const { gsap } = await initMotion();
			if (!sectionEl) return;

			// matchMedia, not a cached boolean: reverts if the preference changes mid-session.
			const ctx = gsap.matchMedia(sectionEl);
			ctx.add(MOTION_OK, () => {
				const portrait = sectionEl!.querySelector('[data-about-portrait]');
				const lead = sectionEl!.querySelector('[data-about-lead]');

				/* One clip reveal each, then nothing — the photographs stay put. */
				sectionEl!.querySelectorAll('[data-about-frame]').forEach((frame, i) => {
					gsap.fromTo(
						frame,
						{ clipPath: 'inset(0 0 100% 0)' },
						{
							clipPath: 'inset(0 0 0% 0)',
							duration: 0.7,
							delay: i * 0.12,
							ease: 'expo.out',
							scrollTrigger: { trigger: frame, start: 'top 85%', once: true }
						}
					);
				});
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
			});

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
		<!--
			The column gap is capped in vw, not left as a plain rem. gap-16 is 4rem, so
			at a 200% root font size the eleven gaps wanted 1408px inside a 1312px grid
			and the columns were squeezed past the viewport — 32px of horizontal scroll
			for anyone using text zoom. min() keeps 64px at normal size and lets the gap
			stop growing once the grid cannot afford it.
		-->
		<div class="grid gap-12 md:grid-cols-12 md:gap-[min(4rem,4.5vw)]">
			<div class="md:col-span-4">
				<div use:reveal class="md:sticky md:top-28">
					<Eyebrow title="About Me" />
					<!--
						The portrait, and one frame from the archive set against its corner.
						Restrained: a hairline ring, no shadow, no overlay, a plain caption.
					-->
					<div class="relative mt-8 max-w-[15rem] sm:max-w-xs">
						<div data-about-frame class="overflow-hidden rounded-2xl">
							<img
								data-about-portrait
								src={about.portrait}
								alt={about.portraitAlt}
								width="1200"
								height="1199"
								loading="lazy"
								class="block w-full"
							/>
						</div>
						<figure class="absolute -right-6 -bottom-8 w-[46%] sm:-right-10">
							<div data-about-frame class="overflow-hidden rounded-lg bg-paper-2 ring-1 ring-ink/10">
								<img
									src={aside.src.replace('.jpg', '-800.jpg')}
									alt={aside.alt}
									width={aside.w}
									height={aside.h}
									loading="lazy"
									decoding="async"
									class="block h-auto w-full"
								/>
							</div>
							<figcaption class="mt-2 text-[10px] font-medium tracking-[0.18em] lowercase text-dim">
								{aside.place} — {aside.location}
							</figcaption>
						</figure>
					</div>
				</div>
			</div>

			<div class="md:col-span-8">
				<!--
					h2, not p: this is the section's statement and is already set as one.
					The eyebrow above it stays a p, so About contributes a single heading.
				-->
				<h2
					data-about-lead
					use:reveal
					class="text-2xl leading-snug font-medium tracking-tight md:text-4xl"
				>
					{about.lead}
					<em class="font-serif font-normal text-dim italic">{about.leadAccent}</em>
				</h2>

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
