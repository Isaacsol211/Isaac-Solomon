<script lang="ts">
	/* A chapter break: a hairline with a centred mark, like a printed section rule. */
	let { mark = '✱' }: { mark?: string } = $props();
</script>

<div class="story bg-story-paper" aria-hidden="true">
	<div class="mx-auto flex max-w-5xl items-center gap-4 px-5 sm:px-8">
		<span class="h-px flex-1 bg-line"></span>
		<span class="text-accent">{mark}</span>
		<span class="size-1.5 rounded-full bg-line"></span>
		<span class="size-1.5 rounded-full bg-line"></span>
		<span class="h-px flex-1 bg-line"></span>
	</div>
</div>
