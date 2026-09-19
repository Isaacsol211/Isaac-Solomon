<script lang="ts">
	import { onMount } from 'svelte';
	import { site, photos, photographyPage } from '$lib/content';
	import Nav from '$lib/components/Nav.svelte';
	import Connect from '$lib/components/Connect.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';

	type Photo = (typeof photos)[number];
	const byPlace = (place: string) => photos.find((photo) => photo.place === place)!;
	const series = [
		{ id: 'mountains', label: 'Mountains', items: photos.filter((p) => p.series === 'Mountains') },
		{ id: 'after-dark', label: 'After Dark', items: photos.filter((p) => p.series === 'After Dark') },
		{ id: 'places', label: 'Places', items: photos.filter((p) => p.series === 'Places') }
	];
	const heroPhoto = photos[0];
	const daylight = ['Into the Fog', 'Forest Road', 'Tea Country', 'Qutub Minar'].map(byPlace);
	const summit = byPlace('The Summit');
	const starlight = byPlace('Starlight');
	const nightPair = ['Base Camp', 'Platform 2'].map(byPlace);
	const ocean = byPlace('Deep Blue');
	const selected = { label: 'Selected edit', items: [...daylight, summit, starlight, ...nightPair] };
	type Collection = { label: string; items: Photo[] };
	let collection = $state<Collection>(selected);
	let lightboxIndex = $state(-1);
	const chapters = [
		{ id: 'selected', label: 'Selected' },
		{ id: 'night', label: 'Night' },
		{ id: 'sea', label: 'Sea' },
		{ id: 'archive', label: 'Collection' }
	];
	let activeChapter = $state('selected');

	function openPhoto(photo: Photo, sequence: Collection = selected) {
		collection = sequence;
		lightboxIndex = sequence.items.indexOf(photo);
	}

	// Only the navigation responds to scroll; the photographs remain composed.
	onMount(() => {
		const sections = chapters.map(({ id }) => document.getElementById(id)!);
		let frame = 0;
		const update = () => {
			frame = 0;
			let current = chapters[0].id;
			sections.forEach((section, i) => {
				if (section.getBoundingClientRect().top <= window.innerHeight * .35) current = chapters[i].id;
			});
			activeChapter = current;
		};
		const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return () => {
			window.removeEventListener('scroll', schedule);
			window.removeEventListener('resize', schedule);
			cancelAnimationFrame(frame);
		};
	});

	function imageSrc(photo: Photo) {
		return photo.src.replace('.jpg', '-800.jpg');
	}
</script>

<svelte:head>
	<title>Photography — {site.name}</title>
	<link rel="alternate" type="text/markdown" href="{site.url}/photography.md" />
	<meta name="description" content="Photography by Isaac Solomon. Mountain fog, camp lights, quiet platforms and open water. Explore twenty photographs from across India." />
	<link rel="canonical" href="{site.url}/photography" />
</svelte:head>

{#snippet photograph(photo: Photo, sizes: string, eager = false, sequence: Collection = selected)}
	<button type="button" class="photo-button" onclick={() => openPhoto(photo, sequence)} aria-label="Open {photo.place} — {photo.location}">
		<img
			src={imageSrc(photo)}
			srcset="{imageSrc(photo)} {photo.w / 2}w, {photo.src} {photo.w}w"
			{sizes}
			alt={photo.alt}
			width={photo.w}
			height={photo.h}
			loading={eager ? 'eager' : 'lazy'}
			decoding="async"
		/>
		<span class="open-photo" aria-hidden="true">View photograph <span>↗</span></span>
	</button>
{/snippet}

{#snippet caption(photo: Photo)}
	<span>{photo.place}</span>
	<span>{photo.location}</span>
{/snippet}

<Nav onDark />

<main id="main" class="relative z-10 bg-paper">
	<section id="top" class="photo-hero" aria-labelledby="photo-title">
		<img class="hero-image" src={heroPhoto.src} srcset="{imageSrc(heroPhoto)} 800w, {heroPhoto.src} 1600w" sizes="100vw" alt={heroPhoto.alt} width={heroPhoto.w} height={heroPhoto.h} fetchpriority="high" />
		<div class="hero-scrim" aria-hidden="true"></div>
		<div class="hero-bottom">
			<div class="hero-title-mask"><h1 id="photo-title">photography<span>.</span></h1></div>
			<div class="hero-footer">
				<p>{photographyPage.lead}</p>
				<a href="#selected">Explore the photographs <span aria-hidden="true">↓</span></a>
			</div>
		</div>
		<button class="hero-credit" type="button" onclick={() => openPhoto(heroPhoto, series[0])}>Above the Clouds <span aria-hidden="true">↗</span></button>
	</section>

	<nav class="chapter-nav" aria-label="Photography chapters">
		<div class="photo-container">
			<div class="chapter-links">
			{#each chapters as chapter (chapter.id)}
				<a href="#{chapter.id}" aria-current={activeChapter === chapter.id ? 'location' : undefined}>{chapter.label}</a>
			{/each}
			</div>
		</div>
	</nav>

	<section id="selected" class="daylight photo-container" aria-labelledby="selected-heading">
		<div class="edit-heading">
			<h2 id="selected-heading">Selected photographs<span>Eight from the collection</span></h2>
			<p>From daylight into the night.</p>
		</div>
		<div class="daylight-grid">
			{#each daylight as photo, i (photo.src)}
				<figure class="day-frame day-frame-{i + 1}">
					{@render photograph(photo, i === 0 || i === 3 ? '(min-width: 1440px) 734px, (min-width: 768px) 58vw, 100vw' : '(min-width: 1440px) 406px, (min-width: 768px) 32vw, 100vw', i === 0)}
					<figcaption class="photo-caption">{@render caption(photo)}</figcaption>
				</figure>
			{/each}
		</div>
		<div class="summit-spread">
			<figure>{@render photograph(summit, '(min-width: 768px) 72vw, 100vw')}<figcaption class="photo-caption">{@render caption(summit)}</figcaption></figure>
		</div>
	</section>

	<section id="night" class="night-room" aria-labelledby="night-heading">
		<div class="photo-container">
			<div class="night-heading">
				<h2 id="night-heading">When the light changes.</h2>
				<p>Sankri. Kedarkantha. Cavalry Barracks.<br />Stars, tent light and station lamps.</p>
			</div>
			<figure class="star-frame">
				{@render photograph(starlight, '100vw')}
				<figcaption class="photo-caption">{@render caption(starlight)}</figcaption>
			</figure>
			<div class="night-pair">
				{#each nightPair as photo (photo.src)}
					<figure>{@render photograph(photo, '(min-width: 768px) 44vw, 100vw')}<figcaption class="photo-caption">{@render caption(photo)}</figcaption></figure>
				{/each}
			</div>
		</div>
	</section>

	<section id="sea" class="sea-room" aria-labelledby="sea-heading">
		<div class="sea-spread photo-container">
			<div class="sea-copy">
				<p class="sea-place">Vizag / Bay of Bengal</p>
				<h2 id="sea-heading">Deep<br />blue.</h2>
				<p class="sea-note">{ocean.description}</p>
			</div>
			<figure>{@render photograph(ocean, '(min-width: 768px) 480px, 100vw', false, series[2])}<figcaption class="photo-caption">{@render caption(ocean)}</figcaption></figure>
		</div>
	</section>

	<section id="archive" class="archive photo-container" aria-labelledby="archive-heading">
		<div class="archive-heading">
			<h2 id="archive-heading">The full collection.</h2>
			<p>{photos.length} photographs / 3 series<br />Open a frame to take a closer look.</p>
		</div>
		<nav class="archive-nav" aria-label="Browse the archive">
			{#each series as group (group.id)}
				<a href="#{group.id}">{group.label}<span>{group.items.length}</span></a>
			{/each}
		</nav>
		{#each series as group (group.id)}
			<div class="archive-series" id={group.id}>
				<h3>{group.label}<span>{group.items.length} photographs</span></h3>
				<div class="archive-grid">
					{#each group.items as photo (photo.src)}
						<figure>{@render photograph(photo, '(min-width: 1024px) 22vw, (min-width: 768px) 30vw, 45vw', false, group)}<figcaption class="photo-caption">{@render caption(photo)}</figcaption></figure>
					{/each}
				</div>
			</div>
		{/each}
	</section>
</main>

<Lightbox items={collection.items} collectionLabel={collection.label} bind:index={lightboxIndex} />
<Connect compact />

<style>
	main { --chapter-clearance: 129px; }
	.photo-container { width: min(100% - 6rem, 1280px); margin-inline: auto; }
	.photo-hero { position: relative; isolation: isolate; min-height: 720px; height: 100svh; max-height: 1100px; overflow: hidden; color: #f1efea; background: #101820; }
	.hero-image, .hero-scrim { position: absolute; inset: 0; width: 100%; height: 100%; }
	.hero-image { object-fit: cover; object-position: 50% 45%; animation: landscape-settle 1.8s cubic-bezier(.2,.65,.3,1) both; }
	.hero-scrim { background: linear-gradient(180deg, #07121c66, transparent 35%, #07121c20 55%, #07121ce0); }
	.hero-bottom { position: absolute; bottom: 90px; inset-inline: 4.5%; }
	.hero-title-mask { overflow: hidden; padding-bottom: 36px; margin-bottom: -36px; }
	h1 { font-family: var(--font-serif); font-size: clamp(76px, 18vw, 260px); font-weight: 400; letter-spacing: -.045em; line-height: .95; animation: title-arrive 1.15s .1s cubic-bezier(.2,.65,.3,1) both; }
	h1 span { color: var(--color-accent); }
	.hero-footer { display: flex; justify-content: space-between; align-items: end; gap: 2rem; margin-top: 2rem; padding-top: 1.3rem; border-top: 1px solid #f1efea55; font-size: 14px; }
	.hero-footer p { max-width: 25rem; line-height: 1.6; }
	.hero-footer a { display: flex; gap: 2rem; align-items: center; padding-block: .5rem; }
	.hero-credit { position: absolute; bottom: 24px; right: 4.5%; font-size: 12px; cursor: zoom-in; color: #f1efeacc; padding: .5rem 0; }
	.hero-credit span { margin-left: 1rem; }
	.chapter-nav { position: sticky; top: 76px; z-index: 30; border-bottom: 1px solid var(--color-line); background: var(--color-paper); }
	.chapter-nav > div { display: flex; justify-content: flex-end; align-items: center; gap: 2rem; }
	.chapter-links { display: flex; gap: 2rem; }
	.chapter-links a { position: relative; display: flex; align-items: center; min-height: 52px; font-size: 13px; color: var(--color-dim); transition: color 180ms; }
	.chapter-links a::after { content: ''; position: absolute; bottom: -1px; inset-inline: 0; height: 2px; background: currentColor; transform: scaleX(0); transition: transform 180ms; }
	.chapter-links a[aria-current], .chapter-links a:hover { color: var(--color-ink); }
	.chapter-links a[aria-current]::after { transform: scaleX(1); }
	#selected, #night, #sea, #archive { scroll-margin-top: var(--chapter-clearance); }
	.daylight { padding-block: 64px 90px; }
	.edit-heading { display: flex; justify-content: space-between; align-items: end; gap: 3rem; margin-bottom: 40px; }
	.edit-heading h2 { font-size: clamp(24px, 2.3vw, 34px); font-weight: 500; letter-spacing: -.03em; line-height: 1.15; }
	.edit-heading h2 span { display: block; margin-top: 10px; color: var(--color-dim); font-size: 12px; font-weight: 400; letter-spacing: 0; }
	.edit-heading p { color: var(--color-dim); font-size: 13px; }
	.daylight-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 32px; row-gap: 90px; align-items: start; }
	.day-frame-1 { grid-column: 1 / 8; }
	.day-frame-2 { grid-column: 9 / 13; margin-top: clamp(80px, 8vw, 120px); }
	.day-frame-3 { grid-column: 1 / 5; margin-top: 100px; }
	.day-frame-4 { grid-column: 6 / 13; }
	.photo-button { position: relative; display: block; width: 100%; cursor: zoom-in; }
	.photo-button img { display: block; width: 100%; height: auto; }
	.open-photo { pointer-events: none; position: absolute; right: 16px; bottom: 16px; display: flex; gap: 1.5rem; align-items: center; background: #f1efea; color: #181613; padding: 12px 16px; border-radius: 2px; font-size: 12px; opacity: 0; transform: translateY(6px); transition: opacity 180ms, transform 180ms; }
	.photo-button:hover .open-photo, .photo-button:focus-visible .open-photo { opacity: 1; transform: none; }
	.photo-caption { display: flex; justify-content: space-between; gap: 1rem; margin-top: 13px; font-size: 12px; line-height: 1.5; }
	.photo-caption span:last-child { color: var(--color-dim); text-align: right; }
	.summit-spread { width: min(100%, 960px); margin: 80px auto 0; }
	.night-room { background: #101820; color: #f1efea; padding-block: 90px 110px; }
	.night-heading { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: 48px; }
	.night-heading h2 { max-width: 650px; font-family: var(--font-serif); font-size: clamp(46px, 6vw, 88px); font-weight: 400; line-height: 1; letter-spacing: -.025em; }
	.night-heading p { color: #bbc8d0; font-size: 13px; line-height: 1.7; }
	.night-room .photo-caption span:last-child { color: #bbc8d0; }
	.night-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; align-items: start; margin-top: 70px; }
	.night-pair figure:last-child { margin-top: 100px; }
	.sea-room { background: #12364a; color: #f1efea; padding-block: 100px; }
	.sea-spread { display: grid; grid-template-columns: 1fr 1.2fr; align-items: center; gap: clamp(40px, 6vw, 80px); max-width: 1080px; }
	.sea-copy { justify-self: end; width: 100%; max-width: 320px; }
	.sea-spread figure { width: 100%; max-width: 480px; justify-self: end; }
	.sea-place { font-size: 13px; color: #c0d0d9; }
	.sea-copy h2 { margin-block: 2rem; font-family: var(--font-serif); font-size: clamp(86px, 9vw, 132px); line-height: .85; letter-spacing: -.035em; font-weight: 400; }
	.sea-note { max-width: 16rem; font-size: 15px; line-height: 1.7; color: #c0d0d9; }
	.sea-room .photo-caption span:last-child { color: #c0d0d9; }
	.archive { padding-block: 90px 110px; }
	.archive-heading { display: flex; justify-content: space-between; gap: 2rem; align-items: end; }
	.archive-heading h2 { font-size: clamp(32px, 4vw, 56px); line-height: 1.1; letter-spacing: -.04em; font-weight: 500; }
	.archive-heading p { font-size: 13px; color: var(--color-dim); line-height: 1.7; }
	.archive-nav { display: flex; flex-wrap: wrap; gap: 1.5rem; margin-top: 32px; padding-block: 12px; border-block: 1px solid var(--color-line); }
	.archive-nav a { display: inline-flex; align-items: center; gap: .5rem; min-height: 44px; font-size: 13px; }
	.archive-nav a:hover { text-decoration: underline; text-underline-offset: 5px; }
	.archive-nav span { color: var(--color-dim); font-size: 11px; }
	.archive-series { margin-top: 44px; scroll-margin-top: 144px; }
	.archive-series h3 { display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid var(--color-line); padding-bottom: 16px; margin-bottom: 24px; font-size: 22px; }
	.archive-series h3 span { font-size: 12px; color: var(--color-dim); }
	.archive-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 32px 24px; align-items: start; }
	.archive-grid .photo-button { aspect-ratio: 4 / 3; }
	.archive-grid .photo-button img { height: 100%; object-fit: cover; } /* the lightbox shows the full frame */
	.archive-grid .photo-caption { font-size: 11px; gap: .5rem; }
	.archive-grid .open-photo { padding: 8px 10px; font-size: 11px; bottom: 8px; right: 8px; }
	@keyframes landscape-settle { from { transform: scale(1.045); } to { transform: scale(1); } }
	@keyframes title-arrive { from { transform: translateY(110%); } to { transform: translateY(0); } }
	@media (min-width: 1024px) { main { --chapter-clearance: 125px; } .chapter-nav { top: 72px; } }
	@media (min-width: 768px) and (max-width: 1023px) {
		.photo-container { width: calc(100% - 4rem); }
		.daylight-grid { column-gap: 24px; }
		.day-frame-1 { grid-column: 1 / 8; }
		.day-frame-2 { grid-column: 9 / 13; margin-top: 90px; }
		.archive-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
	}
	@media (max-width: 767px) {
		.photo-container { width: calc(100% - 40px); }
		.photo-hero { min-height: 620px; max-height: 900px; }
			.hero-bottom { inset-inline: 20px; bottom: 86px; }
		h1 { font-size: clamp(64px, 20vw, 154px); }
		.hero-footer { flex-direction: column; align-items: start; gap: 1.2rem; margin-top: 24px; font-size: 14px; }
		.hero-footer p { max-width: 20rem; }
		.hero-credit { right: 20px; font-size: 11px; }
			.chapter-links { width: 100%; justify-content: space-between; gap: 1rem; }
		.chapter-links a { font-size: 12px; }
		.daylight { padding-block: 36px 56px; }
		.edit-heading { display: block; margin-bottom: 28px; }
		.edit-heading p { display: none; }
		.daylight-grid { display: flex; flex-direction: column; gap: 40px; }
		.day-frame { width: 100%; margin: 0; }
		.day-frame-2 { width: 83%; align-self: end; }
		.day-frame-3 { width: 83%; }
		.photo-caption { font-size: 11px; gap: .5rem; margin-top: 10px; }
		.summit-spread { display: block; margin-top: 40px; }
		.night-room { padding-block: 56px 64px; }
		.night-heading { display: block; margin-bottom: 30px; }
		.night-heading p { margin-top: 20px; }
		.night-pair { grid-template-columns: 1fr; gap: 36px; margin-top: 36px; }
		.night-pair figure:last-child { margin-top: 0; }
		.sea-room { padding-block: 56px; }
		.sea-spread { grid-template-columns: 1fr; gap: 32px; }
		.sea-copy { max-width: none; display: grid; grid-template-columns: 1fr 1fr; column-gap: 20px; align-items: end; }
		.sea-place { grid-column: 1 / -1; margin-bottom: 24px; font-size: 12px; }
		.sea-copy h2 { font-size: 80px; margin: 0; }
		.sea-note { font-size: 13px; padding-bottom: 5px; }
		.sea-spread figure { max-width: 380px; }
		.archive { padding-block: 56px 70px; }
		.archive-heading { display: block; }
		.archive-heading p { margin-top: 18px; }
		.archive-nav { column-gap: 1rem; margin-top: 24px; }
		.archive-series { margin-top: 36px; }
		.archive-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 16px; }
		.archive-grid .photo-caption { display: block; font-size: 11px; }
		.archive-grid .photo-caption span { display: block; text-align: left; }
		.archive-grid .open-photo { display: none; }
	}
	/* Touch: the pill only on the selected edit; elsewhere the caption carries the cue. */
	@media (hover: none) {
		#selected .open-photo { opacity: 1; transform: none; padding: 8px 10px; font-size: 11px; bottom: 10px; right: 10px; }
		.photo-caption span:first-child::after { content: ' ↗'; color: var(--color-dim); }
	}
	/* Dark theme: the night room is close to dark paper, so hairlines mark its edges. */
	:global(.dark) .night-room { box-shadow: inset 0 1px 0 rgb(241 239 234 / 0.08), inset 0 -1px 0 rgb(241 239 234 / 0.08); }
	@media (prefers-reduced-motion: reduce) { .hero-image, h1 { animation: none; } .open-photo { transition: none; transform: none; } .chapter-links a, .chapter-links a::after { transition: none; } }
</style>
