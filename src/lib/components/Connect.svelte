<script lang="ts">
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal';
	import { connect, nav as navLinks, site, socials } from '$lib/content';
	import ArrowUpRight from './ArrowUpRight.svelte';
	import Eyebrow from './Eyebrow.svelte';

	const year = new Date().getFullYear();
	let time = $state('');

	onMount(() => {
		const format = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit' });
		const tick = () => (time = format.format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	});
</script>

<section
	id="connect"
	class="relative overflow-hidden bg-coal text-cream dark:border-t dark:border-cream/10"
>
	<div class="relative mx-auto max-w-6xl px-5 pt-20 pb-8 sm:px-8 md:pt-32">
		<div use:reveal>
			<Eyebrow index="05" title="Contact" tone="dark" />
		</div>

		<p use:reveal={{ delay: 80 }} class="mt-10 font-serif text-2xl text-cream/70 italic md:text-3xl">
			{connect.eyebrow}
		</p>
		<h2
			use:reveal={{ delay: 140 }}
			class="mt-3 text-[clamp(3.2rem,10vw,9rem)] leading-[0.95] font-medium tracking-[-0.03em]"
		>
			Let's <em class="font-serif font-normal text-accent italic">connect.</em>
		</h2>

		<p use:reveal={{ delay: 200 }} class="mt-8 max-w-xl leading-relaxed text-cream/60">
			{connect.blurb}
		</p>
		<a
			use:reveal={{ delay: 260 }}
			href="mailto:{site.email}"
			class="group relative mt-8 inline-flex items-center gap-4 overflow-hidden rounded-full border border-cream/25 px-6 py-4 text-base transition-colors duration-500 before:absolute before:inset-0 before:translate-y-[101%] before:bg-cream before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-cream hover:text-coal hover:before:translate-y-0 sm:px-8 sm:text-lg md:text-xl"
		>
			<span class="relative">{site.email}</span>
			<ArrowUpRight
				class="relative size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
			/>
		</a>

		<footer class="relative mt-20 border-t border-cream/15 pt-12 md:mt-28">
			<div class="grid gap-12 md:grid-cols-12">
				<div class="md:col-span-6">
					<p class="text-2xl font-medium tracking-tight">
						{site.name}<span class="text-accent">.</span>
					</p>
					<p class="mt-3 max-w-sm text-sm leading-relaxed text-cream/50">
						{site.role} & {site.tagline}. {site.location}.
					</p>
					<p class="mt-6 text-xs font-medium tracking-[0.25em] uppercase text-cream/40">
						Local time — <span class="text-cream/70 tabular-nums">{time || '··:··'}</span>
					</p>
				</div>

				<nav class="md:col-span-3" aria-label="Footer">
					<h3 class="text-xs font-medium tracking-[0.25em] uppercase text-cream/40">Sitemap</h3>
					<ul class="mt-4 space-y-2.5">
						{#each navLinks as link (link.href)}
							<li>
								<a href={link.href} class="text-cream/70 transition-colors hover:text-cream">
									{link.label}
								</a>
							</li>
						{/each}
					</ul>
				</nav>

				<div class="md:col-span-3">
					<h3 class="text-xs font-medium tracking-[0.25em] uppercase text-cream/40">Elsewhere</h3>
					<ul class="mt-4 space-y-2.5">
						{#each socials as social (social.label)}
							<li>
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class="group inline-flex items-center gap-1.5 text-cream/70 transition-colors hover:text-cream"
								>
									{social.label}
									<ArrowUpRight class="size-3 opacity-50 transition-opacity group-hover:opacity-100" />
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</div>

			<div
				class="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-cream/15 py-6 text-xs text-cream/40"
			>
				<p>© {year} {site.name}. All rights reserved.</p>
				<p class="hidden sm:block">
					Set in Space Grotesk &amp; Instrument Serif. Built with SvelteKit, deployed on Cloudflare.
				</p>
				<a href="#top" class="inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-cream">
					Back to top <span aria-hidden="true">↑</span>
				</a>
			</div>
		</footer>
	</div>
</section>
