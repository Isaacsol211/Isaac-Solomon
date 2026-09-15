<script lang="ts">
	import type { photos } from '$lib/content';
	import { modal } from '$lib/actions/modal';
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from '$lib/motion';

	type Photo = (typeof photos)[number];

	let {
		items,
		index = $bindable(-1),
		onclose
	}: {
		/** The set the lightbox pages through — usually one series. */
		items: Photo[];
		/** Index into `items`, or -1 when closed. Bindable so the page can open it. */
		index: number;
		/** Called after close, so the caller can restore focus to the thumbnail. */
		onclose?: () => void;
	} = $props();

	const open = $derived(index >= 0 && index < items.length);
	const photo = $derived(open ? items[index] : undefined);


	function close() {
		index = -1;
		onclose?.();
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
	 * Escape, the Tab trap, scroll lock, background inert and focus restore all
	 * belong to the modal action. Only the arrow keys are this dialog's own.
	 * The previous version had aria-modal and a trap but never made the page
	 * behind inert — a screen reader could read straight past the dialog.
	 */
	function onkeydown(event: KeyboardEvent) {
		if (!open) return;
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
		aria-label="{photo.place} — {photo.location}"
		use:modal={{ onclose: close, initialFocus: '[data-close]' }}
		transition:fade={{ duration: d(180) }}
		class="fixed inset-0 z-[70] flex flex-col bg-coal/95 backdrop-blur-sm"
	>
		<div class="flex items-center justify-between gap-4 px-5 py-4 text-cream sm:px-8">
			<p class="text-[11px] font-medium tracking-[0.22em] lowercase text-cream/60">
				{index + 1} / {items.length}
			</p>
			<button
				data-close
				type="button"
				onclick={close}
				class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
			>
				Close
			</button>
		</div>

		<div class="relative flex min-h-0 flex-1 items-center justify-center px-5 sm:px-8">
			{#key index}
				<img
					src={photo.src}
					alt={photo.alt}
					width={photo.w}
					height={photo.h}
					in:fly={{ x: 28 * direction, duration: d(240), opacity: 0 }}
					out:fade={{ duration: d(120) }}
					class="absolute max-h-full max-w-[calc(100%-2.5rem)] object-contain sm:max-w-[calc(100%-4rem)]"
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
