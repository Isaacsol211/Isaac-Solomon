<script lang="ts">
	let {
		index = 0,
		compact = false
	}: {
		/** Which service is active — drives which state is drawn. */
		index?: number;
		/** Inline beside a row on small screens: no caption, tighter box. */
		compact?: boolean;
	} = $props();

	/*
	 * A working diagram, not a screenshot. Five states, one per service, drawn
	 * from the site's own linework: hairline strokes, paper fills, one orange
	 * signal. Each state explains what the capability does — content fields
	 * assembling into a page, an option updating a cart, blocks driven by a
	 * scroll position, checks across three devices, a product carried through
	 * versions. Transitions are transform and opacity only, 250–400ms, and
	 * they switch off under reduced motion. Everything is decorative to
	 * assistive tech; the list beside it is the content.
	 */
</script>

<div class={compact ? 'diagram diagram--compact' : 'diagram'} aria-hidden="true">
	<svg viewBox="0 0 400 280" class="block h-auto w-full" fill="none" stroke-linecap="round" stroke-linejoin="round">
		<!-- 1 · Storefront — an option is chosen, the cart updates -->
		<g class="state" class:is-active={index === 0}>
			<rect x="34" y="42" width="196" height="196" rx="10" class="ln" />
			<rect x="50" y="58" width="164" height="96" rx="6" class="fill-2" />
			<path d="M78 130l28-34 22 26 16-18 26 26" class="ln-soft" />
			<text x="50" y="176" class="lbl">duopods · black</text>
			<g class="chips">
				<rect x="50" y="186" width="40" height="18" rx="9" class="ln-key" />
				<rect x="96" y="186" width="40" height="18" rx="9" class="chip-on" />
				<rect x="142" y="186" width="40" height="18" rx="9" class="ln-key" />
			</g>
			<rect x="50" y="212" width="164" height="16" rx="8" class="btn" />
			<text x="132" y="223" text-anchor="middle" class="btn-lbl">add to cart</text>
			<!-- cart, top right -->
			<path d="M292 62h14l12 44h46l10-30h-60" class="ln-key" />
			<circle cx="322" cy="118" r="4" class="ln-key" />
			<circle cx="354" cy="118" r="4" class="ln-key" />
			<g class="badge">
				<circle cx="366" cy="58" r="12" class="accent-fill" />
				<text x="366" y="62" text-anchor="middle" class="badge-n badge-0">0</text>
				<text x="366" y="62" text-anchor="middle" class="badge-n badge-1">1</text>
			</g>
			<path d="M236 194h40" class="ln arrow" />
			<path d="M270 188l8 6-8 6" class="ln arrow" />
		</g>

		<!-- 2 · CMS — content fields assemble into a page -->
		<g class="state" class:is-active={index === 1}>
			<rect x="30" y="52" width="110" height="26" rx="6" class="ln-key" /><text x="42" y="69" class="lbl">title</text>
			<rect x="30" y="96" width="110" height="56" rx="6" class="ln-key" /><text x="42" y="113" class="lbl">body</text><path d="M42 126h70M42 138h50" class="ln-soft" />
			<rect x="30" y="170" width="110" height="60" rx="6" class="ln-key" /><text x="42" y="187" class="lbl">image</text><path d="M46 222l22-26 16 18 14-12 20 20" class="ln-soft" />
			<path d="M156 140h36" class="ln arrow" /><path d="M186 134l8 6-8 6" class="ln arrow" />
			<!-- page -->
			<rect x="212" y="42" width="158" height="196" rx="8" class="ln" />
			<rect x="224" y="54" width="134" height="12" rx="3" class="slot slot-a" />
			<rect x="224" y="76" width="134" height="70" rx="4" class="slot slot-c" />
			<rect x="224" y="156" width="60" height="8" rx="2" class="slot slot-b" />
			<rect x="224" y="170" width="120" height="6" rx="2" class="slot slot-b" />
			<rect x="224" y="182" width="96" height="6" rx="2" class="slot slot-b" />
			<g class="grid3">
				<rect x="224" y="204" width="40" height="22" rx="3" class="fill-2" />
				<rect x="271" y="204" width="40" height="22" rx="3" class="fill-2" />
				<rect x="318" y="204" width="40" height="22" rx="3" class="fill-2" />
			</g>
		</g>

		<!-- 3 · Scroll-driven — a scroll position drives the frames -->
		<g class="state" class:is-active={index === 2}>
			<rect x="34" y="42" width="12" height="196" rx="6" class="ln" />
			<rect x="37" y="46" width="6" height="52" rx="3" class="thumb" />
			<g class="frames">
				<rect x="72" y="60" width="66" height="44" rx="5" class="frame frame-0" />
				<rect x="72" y="118" width="66" height="44" rx="5" class="frame frame-1" />
				<rect x="72" y="176" width="66" height="44" rx="5" class="frame frame-2" />
			</g>
			<path d="M154 140h40" class="ln arrow" /><path d="M184 134l8 6-8 6" class="ln arrow" />
			<!-- the stage: one big frame whose content advances -->
			<rect x="210" y="60" width="160" height="160" rx="8" class="ln-key" />
			<g class="reel">
				<rect x="222" y="72" width="136" height="136" rx="6" class="fill-2" />
				<circle cx="290" cy="140" r="22" class="reel-mark" />
			</g>
			<path d="M222 228h136" class="ln-soft" />
			<circle cx="222" cy="228" r="3" class="tick" />
			<circle cx="290" cy="228" r="3" class="tick" />
			<circle cx="358" cy="228" r="3" class="tick" />
			<circle cx="222" cy="228" r="4" class="playhead" />
		</g>

		<!-- 4 · QA — the same check, across three devices -->
		<g class="state" class:is-active={index === 3}>
			<rect x="30" y="66" width="150" height="100" rx="8" class="ln-key" />
			<path d="M84 180h42M105 166v14" class="ln-soft" />
			<rect x="204" y="52" width="66" height="132" rx="12" class="ln-key" />
			<rect x="298" y="52" width="66" height="132" rx="6" class="ln-key" />
			<circle cx="237" cy="176" r="3" class="ln-soft" />
			<g class="check check-0"><circle cx="105" cy="116" r="16" class="check-ring" /><path d="M97 116l6 6 11-12" class="check-mark" /></g>
			<g class="check check-1"><circle cx="237" cy="112" r="16" class="check-ring" /><path d="M229 112l6 6 11-12" class="check-mark" /></g>
			<g class="check check-2"><circle cx="331" cy="112" r="16" class="check-ring" /><path d="M323 112l6 6 11-12" class="check-mark" /></g>
			<g class="report">
				<rect x="30" y="206" width="334" height="30" rx="6" class="ln" />
				<circle cx="48" cy="221" r="5" class="accent-fill" />
				<path d="M64 221h120M200 221h60" class="ln-soft" />
				<text x="350" y="225" text-anchor="end" class="lbl">3 / 3</text>
			</g>
		</g>

		<!-- 5 · Long-term — one product carried through versions -->
		<g class="state" class:is-active={index === 4}>
			<path d="M40 150h320" class="ln" />
			<g class="node node-0"><circle cx="60" cy="150" r="7" class="node-dot" /><text x="60" y="184" text-anchor="middle" class="lbl">v1</text></g>
			<g class="node node-1"><circle cx="150" cy="150" r="7" class="node-dot" /><text x="150" y="184" text-anchor="middle" class="lbl">rewrite</text></g>
			<g class="node node-2"><circle cx="240" cy="150" r="7" class="node-dot" /><text x="240" y="184" text-anchor="middle" class="lbl">rebrand</text></g>
			<g class="node node-3"><circle cx="340" cy="150" r="7" class="node-dot" /><text x="340" y="184" text-anchor="middle" class="lbl">v2</text></g>
			<rect x="44" y="82" width="32" height="40" rx="4" class="fill-2 ver" />
			<rect x="130" y="76" width="40" height="46" rx="4" class="fill-2 ver" />
			<rect x="216" y="70" width="48" height="52" rx="4" class="fill-2 ver" />
			<rect x="310" y="62" width="60" height="60" rx="4" class="fill-2 ver ver-now" />
			<line x1="60" y1="150" x2="340" y2="150" class="progress" />
		</g>
	</svg>
</div>

<style>
	.diagram {
		border: 1px solid var(--color-line);
		border-radius: 1.25rem;
		background: var(--color-paper);
		padding: 1rem 1rem 1rem;
	}
	/* At 168px wide the labels would be smudges; the compact form is linework only. */
	.diagram--compact text {
		display: none;
	}
	.diagram--compact {
		width: 184px;
		max-width: 100%;
		padding: 0.5rem;
		border-radius: 0.75rem;
	}
	.diagram svg {
		--dur: 0.32s;
	}
	/*
	 * Two weights, because one pale hairline for everything read as an unfinished
	 * wireframe. `ln-key` is whatever the state is actually about — the chips and
	 * the cart, the fields and the slots, the devices and their checks — and it is
	 * drawn in ink. `ln` is containers and frames; `ln-soft` is connectors and
	 * incidental detail. The accent stays reserved for the thing that changes.
	 */
	.ln-key { stroke: var(--color-ink); stroke-width: 1.75; }
	.ln { stroke: var(--color-line); stroke-width: 1.5; }
	.ln-soft { stroke: var(--color-line); stroke-width: 1.5; opacity: 0.6; }
	.fill-2 { fill: var(--color-paper-2); stroke: var(--color-line); stroke-width: 1; }
	.lbl { fill: var(--color-dim); font: 500 11px/1 'Space Grotesk Variable', system-ui, sans-serif; letter-spacing: 0.08em; }
	.accent-fill { fill: var(--color-accent); }

	/* states: only the active one is drawn; the rest are held invisible */
	.state { opacity: 0; transition: opacity var(--dur) ease; }
	.state.is-active { opacity: 1; }

	/* 1 storefront */
	.chip-on { fill: var(--color-accent); stroke: var(--color-accent); }
	.btn { fill: var(--color-line); transition: fill var(--dur) ease; }
	.btn-lbl { fill: var(--color-paper); font: 600 10px/1 'Space Grotesk Variable', system-ui, sans-serif; letter-spacing: 0.12em; }
	.is-active .btn { fill: var(--color-ink); }
	.badge-n { fill: var(--color-paper); font: 700 10px/1 'Space Grotesk Variable', system-ui, sans-serif; transition: opacity var(--dur) ease; }
	.badge-1 { opacity: 0; }
	.is-active .badge-0 { opacity: 0; transition-delay: 0.35s; }
	.is-active .badge-1 { opacity: 1; transition-delay: 0.35s; }
	.badge { transition: transform var(--dur) ease; transform-origin: 366px 58px; }
	.is-active .badge { transform: scale(1.12); transition-delay: 0.35s; }
	.arrow { opacity: 0.5; }

	/* 2 cms: the page slots fill in order */
	.slot { fill: var(--color-ink); opacity: 0.16; transition: opacity var(--dur) ease; }
	.is-active .slot-a { opacity: 0.85; transition-delay: 0.1s; }
	.is-active .slot-c { opacity: 0.85; transition-delay: 0.2s; }
	.is-active .slot-b { opacity: 0.6; transition-delay: 0.3s; }
	.grid3 { opacity: 0.5; transition: opacity var(--dur) ease; }
	.is-active .grid3 { opacity: 1; transition-delay: 0.4s; }

	/* 3 scroll: the thumb moves, the frames shift, the playhead advances */
	.thumb { fill: var(--color-accent); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
	.is-active .thumb { transform: translateY(96px); }
	.frame { fill: var(--color-paper-2); stroke: var(--color-line); stroke-width: 1; transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity var(--dur) ease; opacity: 0.5; }
	.is-active .frame-0 { opacity: 0.35; transform: translateY(-58px); }
	.is-active .frame-1 { opacity: 1; stroke: var(--color-ink); stroke-width: 1.75; transform: translateY(-58px); }
	.is-active .frame-2 { opacity: 0.35; transform: translateY(-58px); }
	.reel-mark { fill: var(--color-accent); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: 290px 140px; }
	.is-active .reel-mark { transform: scale(1.25); }
	.tick { fill: var(--color-line); }
	.playhead { fill: var(--color-accent); transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
	.is-active .playhead { transform: translateX(68px); }

	/* 4 qa: checks pass one after another, then the report line fills */
	.check-ring { stroke: var(--color-line); stroke-width: 1.5; transition: stroke var(--dur) ease; }
	.is-active .check-ring { stroke: var(--color-ink); }
	.check-mark { stroke: var(--color-accent); stroke-width: 2.5; opacity: 0; transition: opacity var(--dur) ease; }
	.is-active .check-0 .check-mark { opacity: 1; transition-delay: 0.1s; }
	.is-active .check-1 .check-mark { opacity: 1; transition-delay: 0.25s; }
	.is-active .check-2 .check-mark { opacity: 1; transition-delay: 0.4s; }
	.report { opacity: 0.4; transition: opacity var(--dur) ease; }
	.is-active .report { opacity: 1; transition-delay: 0.5s; }

	/* 5 long-term: the line fills from v1 to now, nodes light in turn */
	.node-dot { fill: var(--color-paper); stroke: var(--color-ink); stroke-width: 1.75; transition: fill var(--dur) ease, stroke var(--dur) ease; }
	.is-active .node-dot { fill: var(--color-accent); stroke: var(--color-accent); }
	.is-active .node-1 .node-dot { transition-delay: 0.12s; }
	.is-active .node-2 .node-dot { transition-delay: 0.24s; }
	.is-active .node-3 .node-dot { transition-delay: 0.36s; }
	.progress { stroke: var(--color-accent); stroke-width: 2; stroke-dasharray: 280; stroke-dashoffset: 280; transition: stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
	.is-active .progress { stroke-dashoffset: 0; }
	.ver { stroke: var(--color-ink); opacity: 0.45; transition: opacity var(--dur) ease; }
	.is-active .ver { opacity: 0.7; }
	.is-active .ver-now { opacity: 1; stroke: var(--color-accent); stroke-width: 1.75; }

	@media (prefers-reduced-motion: reduce) {
		.diagram svg * { transition: none !important; }
	}
</style>
