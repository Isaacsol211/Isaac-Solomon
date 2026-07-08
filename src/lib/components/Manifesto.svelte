<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion } from '$lib/motion';
	import { manifesto } from '$lib/content';

	let sectionEl = $state<HTMLElement>();

	// Desktop gets a pinned editorial scene: modular cards, guide lines, eyebrow
	// drift and a word-by-word fill that scrubs through the pinned window.
	onMount(() => {
		let mm: any;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia();
			mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
				const stage = sectionEl!.querySelector('[data-manifesto-stage]');
				const eyebrow = sectionEl!.querySelector('[data-manifesto-eyebrow]');
				const wordsEl = sectionEl!.querySelectorAll('[data-word]');
				const cards = sectionEl!.querySelectorAll('[data-panel]');
				if (!stage) return;

				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionEl,
						start: 'top top',
						end: 'bottom bottom',
						scrub: true,
						pin: stage
					}
				});

				tl.fromTo(eyebrow, { yPercent: 0, opacity: 1 }, { yPercent: -40, opacity: 0.35, ease: 'none' }, 0);
				tl.fromTo(wordsEl, { opacity: 0.12, yPercent: 16 }, { opacity: 1, yPercent: 0, stagger: 0.05, ease: 'none' }, 0.08);
				cards.forEach((card, i) => {
					const driftX = i % 2 === 0 ? -18 : 18;
					const driftY = i < 2 ? -14 : 14;
					tl.fromTo(
						card,
						{ opacity: 0, scale: 0.84, xPercent: driftX * -1.2, yPercent: driftY * -1.2, rotate: i % 2 === 0 ? -8 : 8 },
						{ opacity: 1, scale: 1, xPercent: driftX, yPercent: driftY, rotate: i % 2 === 0 ? -3 : 3, ease: 'none' },
						0.02 + i * 0.03
					);
				});
				return () => tl.kill();
			});

			mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
				gsap.fromTo(
					sectionEl!.querySelectorAll('[data-word]'),
					{ opacity: 0.16 },
					{
						opacity: 1,
						stagger: 0.06,
						ease: 'none',
						scrollTrigger: {
							trigger: sectionEl,
							start: 'top 80%',
							end: 'center 45%',
							scrub: true
						}
					}
				);
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
	aria-label="Manifesto"
	class="relative overflow-hidden border-t border-line px-5 py-28 sm:px-8 md:min-h-[220svh] md:py-0"
>
	<div data-manifesto-stage class="mx-auto flex max-w-6xl items-center md:min-h-screen">
		<div class="relative w-full py-10 md:py-0">
			<div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden md:block">
				<div class="absolute inset-x-[10%] top-[21%] h-px bg-line/60"></div>
				<div class="absolute inset-x-[18%] bottom-[23%] h-px bg-line/45"></div>
				<div class="absolute top-[20%] bottom-[20%] left-[18%] w-px bg-line/35"></div>
				<div class="absolute top-[20%] bottom-[20%] right-[18%] w-px bg-line/35"></div>
			</div>
			<p
				data-manifesto-eyebrow
				class="flex items-center gap-3 text-xs font-medium tracking-[0.2em] lowercase text-dim"
			>
				<span class="text-accent" aria-hidden="true">✱</span>
				<span>( {manifesto.label} )</span>
			</p>
			<div class="relative z-10 mt-8 grid gap-4 md:mt-10 md:grid-cols-12 md:items-center md:gap-6">
				<div data-panel class="hidden rounded-[2rem] border border-line/70 bg-paper-2/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm md:col-span-3 md:flex md:min-h-[15rem] md:flex-col md:justify-between">
					<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-dim">module 01</p>
					<p class="text-outline text-4xl font-medium lowercase lg:text-5xl">fast.</p>
					<p class="text-sm leading-relaxed text-dim">Performance is part of the design, not the cleanup after.</p>
				</div>
				<div class="md:col-span-6 md:px-2 lg:px-4">
					<div
						class="max-w-4xl text-[clamp(2.4rem,6vw,5.2rem)] leading-[0.98] font-medium tracking-tight lowercase"
					>
						{#each manifesto.lines as line (line.key)}
							<p>
								{#each line.plain.split(' ') as word}<span data-word class="inline-block">{word}</span>{' '}{/each}<em
									data-word
									class="inline-block font-serif font-normal text-dim italic"
									>{line.key}<span class="not-italic text-accent">.</span></em
								>
							</p>
						{/each}
					</div>
				</div>
				<div class="space-y-3 md:col-span-3">
					<div data-panel class="rounded-[2rem] border border-line/70 bg-paper/75 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm">
						<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-dim">module 02</p>
						<p class="mt-3 font-serif text-3xl italic text-ink/75 lg:text-4xl">lasting</p>
					</div>
					<div data-panel class="rounded-[2rem] border border-line/70 bg-paper-2/85 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-sm">
						<p class="text-[10px] font-medium tracking-[0.24em] lowercase text-dim">module 03</p>
						<p class="mt-3 text-sm font-medium tracking-[0.18em] lowercase text-ink">made with intent</p>
						<p class="mt-5 text-2xl font-medium lowercase text-ink/80 lg:text-3xl">handmade.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
