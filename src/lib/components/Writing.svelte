<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { writing, writingHomeNote } from '$lib/content';
	import Eyebrow from './Eyebrow.svelte';

	// Case studies are already reachable via the project cards above —
	// the homepage strip only surfaces the standalone essays & deep dives.
	const essays = writing.filter((a) => !a.tag.startsWith('Case Study')).slice(0, 2);
</script>

<section id="writing" class="border-t border-line px-5 py-20 sm:px-8 md:py-32">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-10 md:grid-cols-12">
			<div class="md:col-span-4">
				<div use:reveal class="md:sticky md:top-28">
					<Eyebrow index="05" title="Writing" />
					<p class="mt-6 max-w-xs text-sm leading-relaxed text-dim">
						{writingHomeNote}
					</p>
					<a
						href="/writing"
						class="group mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
					>
						All writing ({writing.length})
						<span
							aria-hidden="true"
							class="transition-transform duration-300 group-hover:translate-x-1">→</span
						>
					</a>
				</div>
			</div>

			<div class="md:col-span-8">
				<ol class="border-b border-line">
					{#each essays as article, i (article.href)}
						<li use:reveal={{ delay: 80 * i }} class="border-t border-line">
							<a href={article.href} class="group block py-8 md:py-10">
								<p class="text-xs font-medium tracking-[0.2em] uppercase text-dim">
									{article.tag} — {article.readingTime}
								</p>
								<h3
									class="mt-4 font-serif text-3xl leading-[1.1] italic transition-colors duration-300 group-hover:text-accent sm:text-4xl md:text-5xl"
								>
									{article.title}
									<span
										aria-hidden="true"
										class="ml-1 inline-block not-italic text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
										>→</span
									>
								</h3>
								<p class="mt-4 max-w-xl text-sm leading-relaxed text-dim md:text-base">
									{article.description}
								</p>
							</a>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</section>
