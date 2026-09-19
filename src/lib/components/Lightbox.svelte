<script lang="ts">
	import type { photos } from '$lib/content';
	import { modal } from '$lib/actions/modal';
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/motion';

	type Photo = (typeof photos)[number];

	let {
		items,
		collectionLabel = '',
		index = $bindable(-1)
	}: {
		/** The set the lightbox pages through — usually one series. */
		items: Photo[];
		/** Identifies the sequence opened from the page: selected edit or archive series. */
		collectionLabel?: string;
		/** Index into `items`, or -1 when closed. Bindable so the page can open it. */
		index: number;
	} = $props();

	const open = $derived(index >= 0 && index < items.length);
	const photo = $derived(open ? items[index] : undefined);


	function close() {
		index = -1;
	}

	/* Which way the last step went, so the next frame arrives from that side. */
	let direction = $state(1);

	function step(delta: number) {
		if (!open) return;
		direction = delta;
		index = (index + delta + items.length) % items.length;
	}

	/*
	 * 180–250ms, read live: the dialog fades in, each frame slides a short way
	 * from the side it was stepped towards and the caption fades with it.
	 * Under reduced motion every duration is 0 and the swap is a cut.
	 */
	const d = (ms: number) => (prefersReducedMotion() ? 0 : ms);

	/*
	 * Swipe, for the phone where there is no keyboard and the Previous/Next
	 * buttons are a thumb-stretch away. A horizontal run of more than 48px that
	 * is also clearly more horizontal than vertical pages the archive; anything
	 * else is left alone, so a vertical drag or a tap still behaves normally.
	 * The buttons stay: this is an addition, not a replacement.
	 */
	let touchX = 0;
	let touchY = 0;
	let singleTouch = false;
	let zoomed = $state(false);

	$effect(() => {
		void index;
		zoomed = false;
	});

	function ontouchstart(event: TouchEvent) {
		singleTouch = event.touches.length === 1;
		const t = event.changedTouches[0];
		touchX = t.clientX;
		touchY = t.clientY;
	}

	function ontouchend(event: TouchEvent) {
		// Panning a zoomed image and pinch gestures must never advance the gallery.
		if (zoomed || !singleTouch || event.touches.length > 0) return;
		const t = event.changedTouches[0];
		const dx = t.clientX - touchX;
		const dy = t.clientY - touchY;
		if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
		step(dx < 0 ? 1 : -1);
	}

	/*
	 * Escape, the Tab trap, scroll lock, background inert and focus restore all
	 * belong to the modal action. Only the arrow keys are this dialog's own.
	 */
	function onkeydown(event: KeyboardEvent) {
		if (!open || zoomed) return;
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			step(1);
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			step(-1);
		}
	}
</script>

<svelte:window {onkeydown} />

{#if open && photo}
	<!--
		A real dialog with real buttons: the review asked for close, previous and
		next that a keyboard can reach, not a div that swallows clicks. The image
		is never cropped here — this is the one place every frame is shown whole.
	-->
		<div
			role="dialog"
			aria-modal="true"
			tabindex="-1"
			aria-label="{photo.place} — {photo.location}"
			use:modal={{ onclose: close, initialFocus: '[data-close]' }}
			transition:fade={{ duration: d(180) }}
			{ontouchstart}
			{ontouchend}
			class="fixed inset-0 z-[70] flex flex-col bg-coal/95 backdrop-blur-sm"
		>
			<div class="flex items-center justify-between gap-4 px-5 py-4 text-cream sm:px-8">
				<p aria-live="polite" aria-atomic="true" class="text-xs leading-relaxed text-cream/70">
					{#if collectionLabel}<span class="block sm:mr-3 sm:inline">{collectionLabel}</span>{/if}
					<span class="tabular-nums">{index + 1} / {items.length}</span>
				</p>
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => (zoomed = !zoomed)}
						class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
						aria-pressed={zoomed}
					>
						{zoomed ? 'Fit' : 'Zoom'}
					</button>
					<button
						data-close
						type="button"
						onclick={close}
						class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
					>
						Close
					</button>
				</div>
			</div>

			<div
				data-lenis-prevent
				class="relative flex min-h-0 flex-1 px-5 sm:px-8 {zoomed
					? 'items-start justify-start overflow-auto overscroll-contain'
					: 'items-center justify-center overflow-hidden'}"
			>
				{#key index}
					<img
						src={photo.src}
						alt={photo.alt}
						width={photo.w}
						height={photo.h}
						in:fly={{ x: 28 * direction, duration: d(240), opacity: 0 }}
						out:fade={{ duration: d(120) }}
						class="{zoomed
							? 'relative mt-4 block shrink-0 max-w-none self-start object-contain'
							: 'absolute max-h-full max-w-[calc(100%-2.5rem)] object-contain sm:max-w-[calc(100%-4rem)]'}"
						style={zoomed ? `height: auto; width: min(${photo.w}px, 160vw);` : undefined}
					/>
				{/key}
			</div>

			<div
				class="flex flex-wrap items-center justify-between gap-4 px-5 py-5 text-cream sm:px-8 md:py-6"
			>
				{#key index}
					<div class="max-w-xl" in:fade={{ duration: d(200), delay: d(60) }}>
						<p class="text-sm font-medium">{photo.place} <span class="text-cream/50">— {photo.location}</span></p>
						<p class="mt-1 text-sm leading-relaxed text-cream/65">{photo.description}</p>
					</div>
				{/key}
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={() => step(-1)}
						class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
					>
						Previous
					</button>
					<button
						type="button"
						onclick={() => step(1)}
						class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
					>
						Next
					</button>
				</div>
			</div>
		</div>
	{/if}
