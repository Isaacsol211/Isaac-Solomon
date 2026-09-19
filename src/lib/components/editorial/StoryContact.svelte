<script lang="ts">
	import { connect, site, socials } from '$lib/content';

	const year = new Date().getFullYear();
	const mailto = (subject: string, body: string) =>
		`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
</script>

<section id="connect" class="story bg-story-paper px-5 pt-20 pb-10 sm:px-8 md:pt-28">
	<div class="mx-auto max-w-5xl">
		<!-- the back cover -->
		<p class="font-serif text-2xl text-dim italic md:text-3xl">{connect.eyebrow}</p>
		<div class="mt-4 flex items-end gap-5">
			<h2 class="text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] font-medium tracking-[-0.02em]">
				let's <span class="font-serif font-normal text-accent italic">talk.</span>
			</h2>
			<span class="mb-3 hidden size-9 bg-cobalt md:block" aria-hidden="true"></span>
		</div>

		<p class="mt-8 max-w-xl text-[15px] leading-relaxed text-ink">{connect.blurb}</p>

		<!-- the two routes, each opening a drafted email -->
		<div class="mt-10 grid max-w-3xl gap-x-12 gap-y-8 border-t border-line pt-8 sm:grid-cols-2">
			{#each connect.routes as route (route.label)}
				<div>
					<p class="font-serif text-lg text-dim italic">{route.label}</p>
					<p class="mt-2 text-sm leading-relaxed text-dim">{route.body}</p>
					<a
						href={mailto(route.subject, route.mailBody)}
						class="group mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent-text"
					>
						<span class="underline decoration-line underline-offset-4 group-hover:decoration-accent-text">{route.linkLabel}</span>
						<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
					</a>
				</div>
			{/each}
		</div>

		<a
			href="mailto:{site.email}"
			class="group mt-10 inline-flex items-center gap-3 rounded-full border-2 border-ink px-6 py-3.5 text-base transition-colors hover:bg-ink hover:text-story-paper sm:text-lg"
		>
			{site.email}
			<span aria-hidden="true" class="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
		</a>

		<!-- colophon -->
		<footer class="mt-20 border-t border-line pt-8 md:mt-28">
			<div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
				<div>
					<p class="flex items-center gap-2 text-lg font-medium tracking-tight">
						<span class="text-accent" aria-hidden="true">✱</span>
						{site.name}<span class="text-accent">.</span>
					</p>
					<p class="mt-2 text-sm text-dim">{site.role} at {site.employer}. {site.location}.</p>
				</div>
				<ul class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
					{#each socials as social (social.label)}
						<li>
							<a href={social.href} target="_blank" rel="noopener noreferrer" class="text-dim transition-colors hover:text-ink">
								{social.label} ↗
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-xs text-dim">
				<p>© {year} {site.name}. Set in Space Grotesk &amp; Instrument Serif.</p>
				<a href="#top" class="inline-flex items-center gap-2 transition-colors hover:text-ink">back to the cover ↑</a>
			</div>
		</footer>
	</div>
</section>
