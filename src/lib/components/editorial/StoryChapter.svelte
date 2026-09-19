<script lang="ts">
	import StoryDeco from './StoryDeco.svelte';

	const artSrc = { lookup: '/story/hero.webp', deskcat: '/story/cat.webp', bust: '/story/about.webp' };

	let {
		n,
		label,
		title,
		body,
		href,
		linkLabel,
		accent,
		art,
		reverse = false
	}: {
		/** Chapter numeral, e.g. '01'. The three intro sections are a real sequence. */
		n: string;
		/** Serif whimsy line above the title. */
		label: string;
		title: string;
		body: string;
		href: string;
		linkLabel: string;
		/** Which flat block sits behind the illustration. */
		accent: 'cobalt' | 'grass' | 'mustard' | 'accent';
		art: 'lookup' | 'deskcat' | 'bust';
		/** false: art left, text right. true: text left, art right. */
		reverse?: boolean;
	} = $props();

	const block = $derived(
		{
			cobalt: 'bg-cobalt',
			grass: 'bg-grass',
			mustard: 'bg-mustard',
			accent: 'bg-accent'
		}[accent]
	);
</script>

<section id={n === '01' ? 'work-intro' : 'about'} class="story bg-story-paper px-5 py-20 sm:px-8 md:py-28">
	<div class="mx-auto grid max-w-5xl items-center gap-y-12 md:grid-cols-2 md:gap-x-16">
		<!-- illustration on its offset colour block -->
		<div class="relative flex justify-center {reverse ? 'md:order-2' : ''}">
			<span class="absolute bottom-4 {reverse ? 'right-6' : 'left-6'} block size-40 {block}" aria-hidden="true"></span>
			<img src={artSrc[art]} alt="" aria-hidden="true" class="relative block w-[min(60vw,18rem)]" />
		</div>

		<!-- the chapter's text -->
		<div class={reverse ? 'md:order-1' : ''}>
			<div class="flex items-center gap-5">
				<span class="text-[clamp(4rem,9vw,7rem)] font-medium leading-none tracking-tight">{n}</span>
				<div>
					<p class="font-serif text-xl text-dim italic sm:text-2xl">{label}</p>
					<h2 class="text-2xl font-medium tracking-[0.02em] uppercase sm:text-3xl">{title}</h2>
					<StoryDeco kind="squiggle" class="mt-1.5 block h-2 w-24" />
				</div>
			</div>

			<p class="mt-8 max-w-md text-[15px] leading-relaxed text-ink">{body}</p>

			<a
				href={href}
				class="group mt-7 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent-text focus-visible:text-accent-text"
			>
				<span class="underline decoration-line underline-offset-4 group-hover:decoration-accent-text">{linkLabel}</span>
				<span aria-hidden="true" class="transition-transform group-hover:translate-x-1">→</span>
			</a>
		</div>
	</div>
</section>
