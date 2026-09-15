<script lang="ts">
	import { onMount } from 'svelte';
	import { initMotion, MOTION_OK, REDUCED_MOTION, FINE_POINTER, MD } from '$lib/motion';
	import { reveal } from '$lib/actions/reveal';
	import { site, projects, photos } from '$lib/content';

	const year = new Date().getFullYear();

	let sectionEl = $state<HTMLElement>();

	/*
	 * The opening composition: two project frames beside the display title and
	 * one photograph as the personal detail. Nothing here is a mockup — these are
	 * the 800w variants the featured cards already ship, and each frame is a link
	 * to the work it shows. Ratios are the files' own; they are not cropped.
	 *
	 * Positions are the *finished* arrangement, written in CSS custom properties
	 * so the page renders composed with no JS at all and under reduced motion.
	 * GSAP only animates *from* a stacked state to this one when motion is allowed.
	 */
	const mivi = projects.find((p) => p.title === 'Mivi')!;
	const saut = projects.find((p) => p.title === 'SAUT')!;
	const fog = photos.find((p) => p.place === 'Into the Fog')!;

	const frames = [
		{
			src: mivi.previewSmall ?? mivi.desktopImage!,
			alt: `${mivi.title} — storefront`,
			href: mivi.caseStudy!,
			label: mivi.title,
			ratio: '800 / 334',
			/* x, y are percentages of the art box; w its width; r the resting tilt */
			style: '--x: 0%; --y: 10%; --w: 64%; --r: -2.5deg; --depth: 1',
			/* stacked start for the entrance */
			from: { x: 90, y: 60, rotate: 0 }
		},
		{
			src: saut.previewSmall ?? saut.desktopImage!,
			alt: `${saut.title} — learning platform`,
			href: saut.caseStudy!,
			label: saut.title,
			ratio: '800 / 878',
			style: '--x: 58%; --y: 22%; --w: 38%; --r: 3deg; --depth: 0.6',
			from: { x: -60, y: 40, rotate: 0 }
		},
		{
			src: fog.src.replace('.jpg', '-800.jpg'),
			alt: fog.alt,
			href: '/photography',
			label: 'photography',
			ratio: '800 / 600',
			style: '--x: 14%; --y: 62%; --w: 30%; --r: -1.5deg; --depth: 1.4',
			from: { x: 40, y: -40, rotate: 0 }
		}
	];

	onMount(() => {
		let mm: ReturnType<(typeof import('gsap'))['gsap']['matchMedia']> | undefined;
		let cancelled = false;

		(async () => {
			const { gsap } = await initMotion();
			if (cancelled || !sectionEl) return;

			mm = gsap.matchMedia(sectionEl);

			const frameEls = () => sectionEl!.querySelectorAll<HTMLElement>('[data-hero-frame]');
			const restRotate = (el: HTMLElement) => parseFloat(getComputedStyle(el).getPropertyValue('--r')) || 0;

			/*
			 * GSAP owns every frame's transform in both branches, so the CSS rotate
			 * is only the no-JS default. Setting the same value here means no jump.
			 */
			mm.add(REDUCED_MOTION, () => {
				frameEls().forEach((el) => gsap.set(el, { rotate: restRotate(el), x: 0, y: 0 }));
			});

			mm.add(MOTION_OK, () => {
				const signature = sectionEl!.querySelector('[data-hero-signature]');
				const els = [...frameEls()];

				/* ── The one authored moment: title rises, frames assemble, ✱ settles ── */
				const entrance = gsap.timeline({
					defaults: { ease: 'expo.out' },
					delay: 0.12
				});
				entrance.addLabel('rise');
				els.forEach((el, i) => {
					entrance.fromTo(
						el,
						{ ...frames[i].from, scale: 0.92, opacity: 0 },
						{ x: 0, y: 0, rotate: restRotate(el), scale: 1, opacity: 1, duration: 0.85 },
						`rise+=${0.18 + i * 0.06}`
					);
				});
				if (signature) {
					/* one quarter-step, as the last frame lands — the site's motion signature */
					entrance.fromTo(
						signature,
						{ rotate: -90, scale: 0.9 },
						{ rotate: 0, scale: 1, duration: 0.7, ease: 'power3.out' },
						'rise+=0.5'
					);
				}

				/* ── Scroll-out: headline, tagline row and meta leave at different speeds ── */
				const scrub = { trigger: sectionEl, start: 'top top', end: 'bottom top', scrub: true };
				const headline = sectionEl!.querySelector('[data-hero-headline]');
				const tagline = sectionEl!.querySelector('[data-hero-tagline]');
				const meta = sectionEl!.querySelector('[data-hero-meta]');
				const art = sectionEl!.querySelector('[data-hero-art]');
				if (headline) gsap.to(headline, { yPercent: 18, opacity: 0.3, ease: 'none', scrollTrigger: { ...scrub } });
				if (tagline) gsap.to(tagline, { yPercent: 32, opacity: 0.2, ease: 'none', scrollTrigger: { ...scrub } });
				if (meta) gsap.to(meta, { yPercent: -20, opacity: 0.35, ease: 'none', scrollTrigger: { ...scrub } });
				if (art) gsap.to(art, { yPercent: 10, opacity: 0.4, ease: 'none', scrollTrigger: { ...scrub } });
			});

			/*
			 * Pointer response: the artwork drifts by at most 8px, text and buttons
			 * stay still. quickTo keeps one tween per axis per frame; updates stop
			 * on pointer leave and are never scheduled while the section is offscreen.
			 */
			mm.add(`${MOTION_OK} and ${FINE_POINTER} and ${MD}`, () => {
				const els = [...frameEls()];
				const movers = els.map((el) => ({
					depth: parseFloat(getComputedStyle(el).getPropertyValue('--depth')) || 1,
					x: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' }),
					y: gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })
				}));
				let visible = true;
				let rafId = 0;
				let pending: PointerEvent | null = null;

				const apply = () => {
					rafId = 0;
					if (!pending || !visible) return;
					const r = sectionEl!.getBoundingClientRect();
					const nx = ((pending.clientX - r.left) / r.width - 0.5) * 2;
					const ny = ((pending.clientY - r.top) / r.height - 0.5) * 2;
					movers.forEach((m) => {
						m.x(nx * 8 * m.depth);
						m.y(ny * 6 * m.depth);
					});
				};
				const onMove = (e: PointerEvent) => {
					pending = e;
					if (!rafId) rafId = requestAnimationFrame(apply);
				};
				const onLeave = () => {
					pending = null;
					movers.forEach((m) => {
						m.x(0);
						m.y(0);
					});
				};
				const io = new IntersectionObserver(([entry]) => {
					visible = entry.isIntersecting;
					if (!visible) onLeave();
				});
				io.observe(sectionEl!);
				sectionEl!.addEventListener('pointermove', onMove);
				sectionEl!.addEventListener('pointerleave', onLeave);

				return () => {
					io.disconnect();
					sectionEl!.removeEventListener('pointermove', onMove);
					sectionEl!.removeEventListener('pointerleave', onLeave);
					if (rafId) cancelAnimationFrame(rafId);
				};
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
	id="top"
	class="relative overflow-hidden px-5 pt-32 pb-8 sm:px-8 md:pt-36 md:pb-12"
>
	<!--
		Signature ✱. Two spans because two systems want its transform: the outer
		keeps the CSS scroll-driven rotation, the inner takes the GSAP entrance.
		Before this split the CSS animation silently overrode every GSAP tween.
	-->
	<span
		aria-hidden="true"
		class="spin-on-scroll pointer-events-none absolute -top-10 -right-14 select-none md:-top-4 md:right-8"
	>
		<span data-hero-signature class="text-outline block font-medium text-[14rem] leading-none md:text-[22rem]">✱</span>
	</span>

	<div class="relative mx-auto flex max-w-6xl flex-col md:min-h-[34rem]">
		<div
			data-hero-meta
			use:reveal
			class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5 text-xs font-medium tracking-[0.25em] lowercase text-dim"
		>
			<span class="flex items-center gap-3">
				<span class="text-accent" aria-hidden="true">✱</span>
				Folio — {year}
			</span>
			<span class="flex items-center gap-2.5">
				<span class="relative flex size-2" aria-hidden="true">
					<span
						class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden"
					></span>
					<span class="relative inline-flex size-2 rounded-full bg-accent"></span>
				</span>
				{site.availability}
			</span>
		</div>

		<!--
			Title and artwork share the middle band. The title keeps a protected
			column (md:max-w-[62%]) and sits above the art; the frames start at 54%
			so only the trailing letters of "developer." overlap their edge.
		-->
		<div class="relative my-auto py-10 md:py-12">
			<h1
				data-hero-headline
				class="relative z-10 text-[clamp(2.9rem,9.8vw,8.75rem)] leading-[0.92] font-medium tracking-[-0.045em] lowercase md:max-w-[62%]"
			>
				{#each site.heroHeadline.split(' ') as word, i (word)}
					<span class="mask-line"><span style="--rise-delay: {120 + i * 90}ms">{word}{#if i === site.heroHeadline.split(' ').length - 1}<span class="text-accent">.</span>{/if}</span></span>
				{/each}
			</h1>

			<!-- Desktop composition — absolutely placed in the right 46% of the band -->
			<div
				data-hero-art
				class="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block"
				aria-label="Selected work: {frames.map((f) => f.label).join(', ')}"
				role="group"
			>
				{#each frames as frame (frame.src)}
					<a
						data-hero-frame
						href={frame.href}
						style={frame.style}
						class="hero-frame pointer-events-auto absolute block overflow-hidden rounded-md bg-paper-2 shadow-[0_28px_60px_-24px_rgba(20,19,17,0.45)] ring-1 ring-ink/10 transition-shadow hover:shadow-[0_32px_70px_-24px_rgba(20,19,17,0.55)]"
					>
						<img
							src={frame.src}
							alt={frame.alt}
							loading="eager"
							decoding="async"
							style="aspect-ratio: {frame.ratio}"
							class="block h-auto w-full"
						/>
						<span class="sr-only">{frame.label}</span>
					</a>
				{/each}
			</div>
		</div>

		<div
			data-hero-tagline
			class="grid gap-8 border-t border-line pt-6 md:grid-cols-12 md:items-end"
		>
			<div use:reveal={{ delay: 260 }} class="max-w-xl md:col-span-6">
				<p class="text-[1.0625rem] leading-relaxed text-ink md:text-lg">
					{site.heroLead}
				</p>
				<div class="mt-7 flex flex-wrap items-center gap-3">
					<a
						href="#projects"
						class="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
					>
						View selected work
					</a>
					<a
						href="#connect"
						class="inline-flex items-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
					>
						Get in touch
					</a>
				</div>
			</div>

		<!--
			Mobile composition: one substantial preview below the lead with the
			second frame peeking behind it. No pointer tracking, no photograph —
			the reading order stays role → lead → actions → work.
		-->
			<div class="relative aspect-[4/3] self-start md:hidden" aria-label="Selected work: Mivi, SAUT" role="group">
			<a
				href={frames[1].href}
				class="absolute top-0 right-0 block w-[46%] rotate-3 overflow-hidden rounded-md bg-paper-2 shadow-[0_20px_40px_-20px_rgba(20,19,17,0.4)] ring-1 ring-ink/10"
			>
				<img src={frames[1].src} alt={frames[1].alt} loading="lazy" decoding="async" style="aspect-ratio: {frames[1].ratio}" class="block h-auto w-full" />
			</a>
			<a
				href={frames[0].href}
				class="absolute top-[14%] left-0 block w-[86%] -rotate-2 overflow-hidden rounded-md bg-paper-2 shadow-[0_24px_50px_-20px_rgba(20,19,17,0.45)] ring-1 ring-ink/10"
			>
				<img src={frames[0].src} alt={frames[0].alt} loading="eager" decoding="async" style="aspect-ratio: {frames[0].ratio}" class="block h-auto w-full" />
			</a>
			</div>
			<div
				use:reveal={{ delay: 180 }}
				class="grid gap-3 text-[13px] font-medium tracking-[0.06em] lowercase text-dim sm:grid-cols-3 md:col-span-6 md:ml-auto md:max-w-md"
			>
				<div class="border-l border-line pl-3">
					<span class="block text-ink">9 years</span>
					<span>shipping client products</span>
				</div>
				<div class="border-l border-line pl-3">
					<span class="block text-ink">cms / commerce</span>
					<span>systems that teams can run</span>
				</div>
				<div class="border-l border-line pl-3">
					<!-- accent-text, not accent: 13px on paper needs 4.5:1, and #e8490f is 3.39:1 -->
					<span class="block text-accent-text">scroll craft</span>
					<span>motion with a performance budget</span>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* Finished arrangement without JS: position from the custom properties, rest tilt. */
	.hero-frame {
		left: var(--x);
		top: var(--y);
		width: var(--w);
		transform: rotate(var(--r));
	}
</style>
