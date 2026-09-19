<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { about, experience, experienceNote } from '$lib/content';
	import StoryHead from './StoryHead.svelte';
	import StoryArt from './StoryArt.svelte';
</script>

<section id="about" class="story bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<div class="mx-auto max-w-5xl">
		<div use:reveal class="grid items-center gap-y-12 md:grid-cols-2 md:gap-x-16">
			<!-- the bust, echoing the real green-shirt portrait, on a mustard block -->
			<div class="relative flex justify-center md:order-2">
				<span class="absolute right-6 bottom-4 block size-40 bg-mustard" aria-hidden="true"></span>
				<StoryArt kind="bust" class="relative h-auto w-[min(64vw,20rem)]" />
			</div>

			<div class="md:order-1">
				<StoryHead n="02" label="chapter two" title="About me" />
				<p class="mt-8 max-w-md text-xl leading-snug font-medium tracking-tight md:text-2xl">
					{about.lead}
					<em class="font-serif font-normal text-dim italic">{about.leadAccent}</em>
				</p>
				{#each about.paragraphs.slice(0, 2) as paragraph, i (i)}
					<p class="mt-5 max-w-md text-[15px] leading-relaxed text-dim">{paragraph}</p>
				{/each}
			</div>
		</div>

		<!-- a small worklife timeline, kept as the chapter's closing note -->
		<div id="experience" class="mt-16 scroll-mt-28 md:mt-24">
			<p use:reveal class="font-serif text-xl text-dim italic">and where the years went —</p>
			<ol use:reveal class="mt-4 border-b border-line">
				{#each experience as job (job.from + job.role)}
					<li class="grid gap-1 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
						<p class="text-base font-medium tabular-nums text-dim">{job.from} — {job.to}</p>
						<div>
							<h3 class="font-medium">{job.role} <span class="font-normal text-dim">@ {job.company}</span></h3>
							<p class="mt-1 max-w-2xl text-sm leading-relaxed text-dim">{job.description}</p>
						</div>
					</li>
				{/each}
			</ol>
			<p class="mt-5 text-sm text-dim">{experienceNote}</p>
		</div>
	</div>
</section>
