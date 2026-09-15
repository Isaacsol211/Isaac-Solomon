<script lang="ts">
	import type { photos } from '$lib/content';

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

	let dialogEl = $state<HTMLElement>();
	let closeBtn = $state<HTMLButtonElement>();

	function close() {
		index = -1;
		onclose?.();
	}

	function step(delta: number) {
		if (!open) return;
		index = (index + delta + items.length) % items.length;
	}

	// Focus the close button on open so the keyboard starts inside the dialog.
	$effect(() => {
		if (open) closeBtn?.focus();
	});

	// The page behind must not scroll or be reachable while the dialog is up.
	$effect(() => {
		if (!open) return;
		document.documentElement.classList.add('overflow-hidden');
		return () => document.documentElement.classList.remove('overflow-hidden');
	});

	function onkeydown(event: KeyboardEvent) {
		if (!open) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			close();
			return;
		}
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			step(1);
			return;
		}
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			step(-1);
			return;
		}

		if (event.key === 'Tab' && dialogEl) {
			const focusables = [...dialogEl.querySelectorAll<HTMLElement>('button:not([disabled])')].filter(
				(el) => el.getClientRects().length > 0
			);
			if (focusables.length === 0) return;

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const current = document.activeElement as HTMLElement | null;

			if (event.shiftKey && current === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && current === last) {
				event.preventDefault();
				first.focus();
			} else if (!current || !focusables.includes(current)) {
				event.preventDefault();
				first.focus();
			}
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
		bind:this={dialogEl}
		role="dialog"
		aria-modal="true"
		aria-label="{photo.place} — {photo.location}"
		class="fixed inset-0 z-[70] flex flex-col bg-coal/95 backdrop-blur-sm"
	>
		<div class="flex items-center justify-between gap-4 px-5 py-4 text-cream sm:px-8">
			<p class="text-[11px] font-medium tracking-[0.22em] lowercase text-cream/60">
				{index + 1} / {items.length}
			</p>
			<button
				bind:this={closeBtn}
				type="button"
				onclick={close}
				class="rounded-full border border-cream/25 px-4 py-2 text-xs font-medium lowercase transition-colors hover:border-cream/70"
			>
				Close
			</button>
		</div>

		<div class="flex min-h-0 flex-1 items-center justify-center px-5 sm:px-8">
			<img
				src={photo.src}
				alt={photo.alt}
				width={photo.w}
				height={photo.h}
				class="max-h-full max-w-full object-contain"
			/>
		</div>

		<div
			class="flex flex-wrap items-center justify-between gap-4 px-5 py-5 text-cream sm:px-8 md:py-6"
		>
			<div class="max-w-xl">
				<p class="text-sm font-medium">{photo.place} <span class="text-cream/50">— {photo.location}</span></p>
				<p class="mt-1 text-sm leading-relaxed text-cream/65">{photo.description}</p>
			</div>
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
