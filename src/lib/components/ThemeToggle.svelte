<script lang="ts">
	import { onMount } from 'svelte';

	let {
		tone = 'light'
	}: { tone?: 'light' | 'dark' } = $props();

	let dark = $state(false);

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = (event: MediaQueryListEvent) => {
			if (!localStorage.getItem('theme')) applyTheme(event.matches);
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	});

	function applyTheme(value: boolean) {
		dark = value;
		document.documentElement.classList.toggle('dark', value);
		document
			.querySelector('meta[name="theme-color"]')
			?.setAttribute('content', value ? '#161412' : '#f1efea');
	}

	function toggleTheme() {
		applyTheme(!dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}
</script>

<button
	type="button"
	onclick={toggleTheme}
	aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
	class="grid size-10 place-items-center rounded-full border transition-colors duration-300 {tone === 'dark'
		? 'border-cream/25 hover:border-cream/60'
		: 'border-line hover:border-dim'}"
>
	{#if dark}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-4"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
			/>
		</svg>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="size-4"
			aria-hidden="true"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
	{/if}
</button>
