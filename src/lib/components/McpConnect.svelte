<script lang="ts">
	import { mcp } from '$lib/content';

	/**
	 * Claude has no deep link that installs a connector — the documented claude://
	 * scheme only opens chats, Code and Cowork sessions. So the most this can do is
	 * hand over the exact command and URL, one click each.
	 */
	const steps = [
		{
			id: 'cli',
			client: 'Claude Code',
			value: `claude mcp add --transport http --scope user ${mcp.name} ${mcp.url}`,
			hint: 'Run it in any terminal — --scope user makes it available in every project.'
		},
		{
			id: 'app',
			client: 'Claude Desktop & claude.ai',
			value: mcp.url,
			hint: 'Settings → Connectors → Add custom connector, then paste this URL.'
		}
	];

	let open = $state(false);
	let copiedId = $state('');
	let copyTimer: ReturnType<typeof setTimeout>;

	async function copy(id: string, value: string) {
		try {
			await navigator.clipboard.writeText(value);
			copiedId = id;
			clearTimeout(copyTimer);
			copyTimer = setTimeout(() => (copiedId = ''), 2000);
		} catch {
			// Clipboard unavailable (permissions/insecure context) — the text stays selectable
		}
	}
</script>

<div class="mt-3">
	<button
		type="button"
		aria-expanded={open}
		aria-controls="mcp-connect-panel"
		onclick={() => (open = !open)}
		class="inline-flex items-center gap-2 text-sm text-cream/50 transition-colors hover:text-cream"
	>
		or connect this site to Claude
		<span
			aria-hidden="true"
			class="text-xs transition-transform duration-300 {open ? 'rotate-90' : ''}"
		>
			→
		</span>
	</button>

	{#if open}
		<div
			id="mcp-connect-panel"
			class="mt-5 max-w-xl rounded-2xl border border-cream/15 p-5 sm:p-6"
		>
			<p class="text-sm leading-relaxed text-cream/60">{mcp.blurb}</p>

			<ul class="mt-5 space-y-5">
				{#each steps as step (step.id)}
					<li>
						<p class="text-xs font-medium tracking-[0.25em] uppercase text-cream/40">
							{step.client}
						</p>
						<div class="mt-2 flex flex-col items-start gap-2 sm:flex-row sm:gap-3">
							<code
								class="w-full min-w-0 rounded-lg bg-cream/5 px-3 py-2.5 font-mono text-xs leading-relaxed break-words text-cream/80 sm:flex-1"
								>{step.value}</code
							>
							<button
								type="button"
								onclick={() => copy(step.id, step.value)}
								class="shrink-0 rounded-full border border-cream/25 px-3.5 py-2 text-xs transition-colors hover:border-cream hover:bg-cream hover:text-coal"
							>
								{copiedId === step.id ? 'Copied ✓' : 'Copy'}
							</button>
						</div>
						<p class="mt-2 text-xs leading-relaxed text-cream/40">{step.hint}</p>
					</li>
				{/each}
			</ul>

			<p class="sr-only" aria-live="polite">
				{copiedId ? 'Copied to clipboard' : ''}
			</p>
		</div>
	{/if}
</div>
