<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { site } from '$lib/content';

	const year = new Date().getFullYear();
</script>

<section id="top" class="relative overflow-hidden px-5 pt-32 pb-14 sm:px-8 md:pt-44 md:pb-20">
	<!-- signature mark — outlined ✱ that turns as the page scrolls -->
	<span
		aria-hidden="true"
		class="text-outline spin-on-scroll pointer-events-none absolute -top-10 -right-14 font-medium select-none text-[14rem] leading-none md:-top-4 md:right-8 md:text-[22rem]"
	>
		✱
	</span>

	<div class="relative mx-auto max-w-6xl">
		<div
			use:reveal
			class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line pb-5 text-xs font-medium tracking-[0.25em] uppercase text-dim"
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

		<h1
			class="mask-line mt-8 text-[clamp(4.2rem,15vw,13.5rem)] leading-[0.9] font-medium tracking-[-0.045em] md:mt-12"
		>
			<span style="--rise-delay: 120ms">{site.role}<span class="text-accent">.</span></span>
		</h1>

		<div class="mt-8 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between">
			<p class="mask-line font-serif text-3xl text-dim italic sm:text-4xl md:text-5xl">
				<span style="--rise-delay: 320ms">— &amp; {site.tagline}</span>
			</p>
			<div use:reveal={{ delay: 240 }} class="max-w-sm md:text-right">
				<p class="text-base leading-relaxed text-dim">
					Hi, I'm <span class="font-medium text-ink">{site.name}</span>.
					{site.heroIntro}
				</p>
			</div>
		</div>
	</div>
</section>
