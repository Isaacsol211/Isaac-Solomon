/**
 * Reproducible lab performance baseline.
 *
 *   node scripts/perf-baseline.mjs [--base http://localhost:4174] [--runs 5] [--label local]
 *
 * Drives headless Chrome over the DevTools Protocol against each page, under a
 * fixed CPU/network profile, and writes medians plus every raw sample to
 * docs/perf/<date>-<label>-<sha>.json. The previous baseline claimed "cold"
 * because it navigated to about:blank between runs; that does not clear the
 * HTTP cache, and its later runs silently reused JS/CSS. This one:
 *
 *   - first visit:  Network.clearBrowserCache + setCacheDisabled(true) per run
 *   - repeat visit: cache enabled, one warm-up load discarded, then measured
 *   - N runs per page per mode, median reported, all samples kept
 *   - Chrome version, commit, profile and timestamps recorded in the output
 *
 * It measures front-end delivery, not TTFB: localhost serves instantly. Pass
 * --base https://isaacsolomon.dev --label deployed to measure the real edge.
 * Static load numbers say nothing about scroll smoothness; use a trace for that.
 */
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import http from 'node:http';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const WebSocket = require('ws');

const args = Object.fromEntries(
	process.argv.slice(2).map((a, i, all) => (a.startsWith('--') ? [a.slice(2), all[i + 1]] : [])).filter(Boolean)
);
const BASE = args.base ?? 'http://localhost:4174';
const RUNS = Number(args.runs ?? 5);
const LABEL = args.label ?? 'local';
const PAGES = ['/', '/photography', '/writing/saut'];
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9399;

/** Mid-range phone on a poor connection: 4x CPU, ~Slow 4G. */
const PROFILE = {
	cpuThrottle: 4,
	network: { latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 },
	viewport: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true }
};

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const sha = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
const chrome = execSync(`"${CHROME}" --version`).toString().trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (u) =>
	new Promise((res, rej) =>
		http.get(u, (r) => { let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d))); }).on('error', rej)
	);
const median = (xs) => { const s = [...xs].filter((x) => x != null).sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : null; };

const proc = spawn(CHROME, [`--remote-debugging-port=${PORT}`, '--headless=new', `--user-data-dir=/tmp/perf-baseline-${Date.now()}`, 'about:blank'], { stdio: 'ignore' });

try {
	let tabs;
	for (let i = 0; i < 40; i++) { try { tabs = await getJSON(`http://127.0.0.1:${PORT}/json/list`); if (tabs.length) break; } catch {} await sleep(300); }
	const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl, { perMessageDeflate: false, maxPayload: 1e8 });
	let id = 0; const pending = new Map();
	ws.on('message', (m) => { const x = JSON.parse(m); if (pending.has(x.id)) { pending.get(x.id)(x); pending.delete(x.id); } });
	await new Promise((r) => ws.on('open', r));
	const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
	const ev = async (expression) => (await send('Runtime.evaluate', { returnByValue: true, expression, awaitPromise: true })).result?.result?.value;

	await send('Page.enable'); await send('Network.enable');
	await send('Emulation.setCPUThrottlingRate', { rate: PROFILE.cpuThrottle });
	await send('Network.emulateNetworkConditions', { offline: false, ...PROFILE.network });
	await send('Emulation.setDeviceMetricsOverride', PROFILE.viewport);

	const measure = async (path) => {
		await send('Page.navigate', { url: 'about:blank' }); await sleep(300);
		await send('Page.navigate', { url: BASE + path }); await sleep(9000);
		const m = await ev(`(()=>{
			const nav=performance.getEntriesByType('navigation')[0];
			const paints=Object.fromEntries(performance.getEntriesByType('paint').map(p=>[p.name,Math.round(p.startTime)]));
			const res=performance.getEntriesByType('resource');
			return {fcp:paints['first-contentful-paint']??null,
				dcl:Math.round(nav.domContentLoadedEventEnd), load:Math.round(nav.loadEventEnd),
				ttfb:Math.round(nav.responseStart), requests:res.length,
				transferKB:Math.round(res.reduce((a,r)=>a+(r.transferSize||0),0)/1024),
				fromCache:res.filter(r=>r.transferSize===0&&r.decodedBodySize>0).length};})()`);
		const lcp = await ev(`new Promise(res=>{try{const po=new PerformanceObserver(l=>{const e=l.getEntries();res(Math.round(e[e.length-1].startTime))});po.observe({type:'largest-contentful-paint',buffered:true});setTimeout(()=>res(null),1500)}catch{res(null)}})`);
		return { ...m, lcp };
	};

	const results = {};
	for (const path of PAGES) {
		results[path] = { first: [], repeat: [] };
		// first visit — genuinely cold every run
		await send('Network.setCacheDisabled', { cacheDisabled: true });
		for (let i = 0; i < RUNS; i++) {
			await send('Network.clearBrowserCache');
			results[path].first.push(await measure(path));
			process.stdout.write(`  ${path} first ${i + 1}/${RUNS}\r`);
		}
		// repeat visit — cache on, one warm-up discarded
		await send('Network.setCacheDisabled', { cacheDisabled: false });
		await measure(path);
		for (let i = 0; i < RUNS; i++) {
			results[path].repeat.push(await measure(path));
			process.stdout.write(`  ${path} repeat ${i + 1}/${RUNS}\r`);
		}
		console.log(`  ${path} done            `);
	}
	ws.close();

	const KEYS = ['fcp', 'lcp', 'dcl', 'load', 'ttfb', 'requests', 'transferKB'];
	const summary = Object.fromEntries(Object.entries(results).map(([p, modes]) => [p, Object.fromEntries(
		Object.entries(modes).map(([mode, runs]) => [mode, Object.fromEntries(KEYS.map((k) => [k, median(runs.map((r) => r[k]))]))])
	)]));

	const out = { generated: new Date().toISOString(), label: LABEL, base: BASE, commit: sha, chrome, runs: RUNS, profile: PROFILE, summary, samples: results };
	const dir = join(root, 'docs', 'perf'); mkdirSync(dir, { recursive: true });
	const file = join(dir, `${out.generated.slice(0, 10)}-${LABEL}-${sha}.json`);
	writeFileSync(file, JSON.stringify(out, null, 2));

	console.log(`\n${chrome} · ${sha} · ${LABEL} · ${BASE} · ${RUNS} runs/mode · medians\n`);
	console.log('| Page | Visit | FCP | LCP | DCL | Load | Req | KB |');
	console.log('|---|---|---|---|---|---|---|---|');
	for (const [p, modes] of Object.entries(summary)) for (const [mode, s] of Object.entries(modes))
		console.log(`| \`${p}\` | ${mode} | ${s.fcp} | ${s.lcp} | ${s.dcl} | ${s.load} | ${s.requests} | ${s.transferKB} |`);
	console.log(`\nwrote ${file.replace(root + '/', '')}`);
} finally {
	proc.kill();
}
