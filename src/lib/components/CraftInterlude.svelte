<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK, MD } from '$lib/motion';
	import { craftInterlude } from '$lib/content';

	let sectionEl = $state<HTMLElement>();

	/*
	 * Compact craft interlude — after the second featured project, before the
	 * third. One statement, three fragments of real work, the guide-line motif
	 * from the old Manifesto scene. The fragments assemble from a loose scatter
	 * to their resting tilt as the section scrolls through the viewport; no pin,
	 * no barrier, done by the time the statement is fully on screen. Resting
	 * positions are the CSS default, so reduced motion and no-JS get the
	 * finished arrangement.
	 */
	const rest = [
		{ x: -8, y: -6, r: -3 },
		{ x: 6, y: 8, r: 2.5 },
		{ x: 10, y: -10, r: -2 }
	];

	onMount(() => {
		let mm: ReturnType<(typeof import('gsap'))['gsap']['matchMedia']> | undefined;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia(sectionEl);
			mm.add(`${MOTION_OK} and ${MD}`, () => {
				const fragments = [...sectionEl!.querySelectorAll<HTMLElement>('[data-fragment]')];
				const statement = sectionEl!.querySelector('[data-statement]');
				const scrub = {
					trigger: sectionEl,
					start: 'top 85%',
					end: 'center 45%',
					scrub: 0.6
				};
				fragments.forEach((el, i) => {
					const r = rest[i] ?? rest[0];
					gsap.fromTo(
						el,
						{ opacity: 0, scale: 0.86, xPercent: r.x * 3, yPercent: r.y * 3, rotate: r.r * 3 },
						{ opacity: 1, scale: 1, xPercent: 0, yPercent: 0, rotate: r.r, ease: 'none', scrollTrigger: { ...scrub } }
					);
				});
				if (statement) {
					gsap.fromTo(statement, { opacity: 0.25 }, { opacity: 1, ease: 'none', scrollTrigger: { ...scrub } });
				}
			});
			// Below md the fragments sit still; only the resting tilt applies.
			mm.add(`${MOTION_OK} and (max-width: 767px)`, () => {
				sectionEl!.querySelectorAll<HTMLElement>('[data-fragment]').forEach((el, i) => {
					gsap.set(el, { rotate: (rest[i] ?? rest[0]).r });
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
	aria-label="A note on the work"
	class="relative overflow-hidden border-t border-line bg-paper px-5 py-10 sm:px-8 md:py-12"
>
	<div class="relative mx-auto max-w-6xl md:min-h-[18rem]">
		<!-- Guide lines — the drafting motif, not decoration: they mark the frame the fragments settle into -->
		<div aria-hidden="true" class="pointer-events-none absolute inset-0 hidden md:block">
			<div class="absolute inset-x-[6%] top-[18%] h-px bg-line/60"></div>
			<div class="absolute inset-x-[14%] bottom-[16%] h-px bg-line/45"></div>
			<div class="absolute top-[10%] bottom-[10%] left-[22%] w-px bg-line/35"></div>
			<div class="absolute top-[10%] bottom-[10%] right-[22%] w-px bg-line/35"></div>
		</div>

		<!--
			Three fragments of real work, each a link. Resting positions in CSS;
			the tilt is set by GSAP in both motion states so one system owns the
			transform. No shadows — a hairline ring is the only edge.
		-->
		<div class="flex items-start justify-between gap-3 md:contents">
		{#each craftInterlude.fragments as fragment, i (fragment.src)}
			<a
				data-fragment
				href={fragment.href}
				target={fragment.href.startsWith('http') ? '_blank' : undefined}
				rel={fragment.href.startsWith('http') ? 'noopener noreferrer' : undefined}
				class="fragment relative block overflow-hidden rounded-md bg-paper-2 ring-1 ring-ink/10 md:absolute fragment-{i}"
				style="--r: {rest[i].r}deg"
			>
				<img
					src={fragment.src}
					alt={fragment.alt}
					width={fragment.width}
					height={fragment.height}
					loading="lazy"
					decoding="async"
					class="block h-auto w-full"
				/>
				<span class="sr-only">{fragment.label}</span>
			</a>
		{/each}
		</div>

		<p
			data-statement
			class="relative z-10 mx-auto mt-6 max-w-[36rem] pt-4 text-center md:mt-0 md:pt-20 text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.05] font-medium tracking-[-0.03em] lowercase md:max-w-[52%]"
		>
			{craftInterlude.statement}
		</p>
	</div>
</section>

<style>
	/* Finished arrangement without JS: position from the classes, resting tilt from --r. */
	.fragment {
		transform: rotate(var(--r));
	}
	/* Phone: a static row, three widths, no offsets. */
	.fragment-0 { width: 34%; }
	.fragment-1 { width: 30%; margin-top: 1.5rem; }
	.fragment-2 { width: 26%; margin-top: 0.5rem; }
	@media (min-width: 768px) {
		/* Left edge: two fragments stacked top and bottom. Right edge: one.
		   The middle 52% is the statement's and nothing enters it. */
		.fragment-0 {
			left: 0;
			top: 0;
			width: 21%;
		}
		.fragment-1 {
			right: 0;
			top: 16%;
			width: 19%;
		}
		.fragment-2 {
			left: 2%;
			bottom: 0;
			width: 13%;
		}
	}
</style>
