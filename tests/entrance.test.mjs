import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const html = readFileSync(new URL('../src/app.html', import.meta.url), 'utf8');
const bootstrap = html.match(/<script id="site-entrance-bootstrap">([\s\S]*?)<\/script>/)[1];

function visit({ storage = new Map(), pathname = '/', hash = '', type = 'navigate', reduced = false, blocked = false } = {}) {
	const classes = new Set();
	const listeners = new Map();
	const timers = new Map();
	const target = (prefix) => ({
		addEventListener: (name, handler) => listeners.set(`${prefix}:${name}`, handler),
		removeEventListener: (name) => listeners.delete(`${prefix}:${name}`)
	});
	const motion = { matches: reduced, ...target('motion') };
	runInNewContext(bootstrap, {
		document: { documentElement: { classList: { add: (name) => classes.add(name), remove: (name) => classes.delete(name) } }, ...target('document') },
		window: target('window'),
		location: { pathname, hash },
		performance: { getEntriesByType: () => [{ type }] },
		matchMedia: () => motion,
		localStorage: {
			getItem: (key) => storage.get(key),
			setItem: (key, value) => { if (blocked) throw new Error('Storage unavailable'); storage.set(key, value); }
		},
		setTimeout: (callback, delay) => { timers.set(1, { callback, delay }); return 1; },
		clearTimeout: (id) => timers.delete(id)
	});
	return { classes, listeners, timers, storage };
}

test('first homepage visit plays once, including when refreshed before completion', () => {
	const first = visit();
	assert.ok(first.classes.has('site-entering'));
	assert.equal(visit({ storage: first.storage, type: 'reload' }).classes.size, 0);
	assert.equal(visit({ storage: first.storage }).classes.size, 0);
});

test('reload, history traversal, deep links and reduced motion skip the entrance', () => {
	for (const options of [{ type: 'reload' }, { type: 'back_forward' }, { pathname: '/photography' }, { pathname: '/writing/mivi' }, { hash: '#projects' }, { reduced: true }]) {
		const state = visit(options);
		assert.equal(state.classes.size, 0);
		assert.equal(state.timers.size, 0);
	}
});

test('blocked storage fails open instead of replaying on every visit', () => {
	const state = visit({ blocked: true });
	assert.equal(state.classes.size, 0);
	assert.equal(state.listeners.size, 0);
});

test('the entrance expires without Svelte hydration or asset loading', () => {
	const state = visit();
	const timeout = state.timers.get(1);
	assert.equal(timeout.delay, 2500);
	timeout.callback();
	assert.equal(state.classes.size, 0);
	assert.equal(state.listeners.size, 0);
	assert.equal(state.timers.size, 0);
});

test('interaction, preference changes and pagehide dismiss and clean up immediately', () => {
	for (const event of ['document:pointerdown', 'document:keydown', 'document:wheel', 'document:touchstart', 'document:focusin', 'motion:change', 'window:pagehide']) {
		const state = visit();
		state.listeners.get(event)();
		assert.equal(state.classes.size, 0, event);
		assert.equal(state.listeners.size, 0, event);
		assert.equal(state.timers.size, 0, event);
	}
});
