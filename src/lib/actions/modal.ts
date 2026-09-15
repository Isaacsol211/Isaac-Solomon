import type { Action } from 'svelte/action';

type ModalOptions = {
	/** Called on Escape. The caller decides what "close" means (usually flips its own state). */
	onclose: () => void;
	/**
	 * Element to return focus to on destroy. Defaults to whatever was focused
	 * when the modal mounted — normally the control that opened it.
	 */
	restoreFocusTo?: HTMLElement | null;
	/** Selector for the element to focus on open. Falls back to the first focusable. */
	initialFocus?: string;
};

const FOCUSABLE =
	'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * One modal implementation for the site. `role="dialog"` and `aria-modal`
 * describe a modal; they do not make one. This action does the four things the
 * attributes only promise:
 *
 *  1. Inerts everything outside the dialog — not just siblings of one known
 *     parent, but every sibling on the path from the dialog up to <body>. That
 *     removes the page from both the tab order and the accessibility tree,
 *     wherever the dialog happens to be mounted.
 *  2. Locks page scroll.
 *  3. Traps Tab / Shift+Tab inside the dialog, and closes on Escape.
 *  4. Restores focus to the opener on destroy.
 *
 * The dialog's semantic boundary is the element this action is applied to, so
 * whatever should be reachable while the dialog is open — close, next, theme —
 * has to be rendered inside it. Everything else is inert by construction.
 */
export const modal: Action<HTMLElement, ModalOptions> = (node, options) => {
	let opts = options;
	const opener = opts.restoreFocusTo ?? (document.activeElement as HTMLElement | null);

	// 1. inert the rest of the document
	const inerted: HTMLElement[] = [];
	for (let el: HTMLElement | null = node; el && el !== document.body; el = el.parentElement) {
		for (const sibling of el.parentElement?.children ?? []) {
			if (sibling !== el && sibling instanceof HTMLElement && !sibling.inert) {
				sibling.inert = true;
				inerted.push(sibling);
			}
		}
	}

	// 2. scroll lock
	const hadLock = document.documentElement.classList.contains('overflow-hidden');
	document.documentElement.classList.add('overflow-hidden');

	const focusables = () =>
		[...node.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length > 0);

	// 3. keyboard
	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			event.preventDefault();
			opts.onclose();
			return;
		}
		if (event.key !== 'Tab') return;

		const items = focusables();
		if (items.length === 0) return;
		const first = items[0];
		const last = items[items.length - 1];
		const current = document.activeElement as HTMLElement | null;

		if (event.shiftKey && current === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && current === last) {
			event.preventDefault();
			first.focus();
		} else if (!current || !node.contains(current)) {
			event.preventDefault();
			first.focus();
		}
	};
	document.addEventListener('keydown', onKeydown);

	// initial focus — next frame so transitions and bind:this have settled
	requestAnimationFrame(() => {
		const target =
			(opts.initialFocus && node.querySelector<HTMLElement>(opts.initialFocus)) || focusables()[0];
		target?.focus();
	});

	return {
		update(next) {
			opts = next;
		},
		destroy() {
			document.removeEventListener('keydown', onKeydown);
			inerted.forEach((el) => (el.inert = false));
			if (!hadLock) document.documentElement.classList.remove('overflow-hidden');
			// 4. focus restore — only if the opener is still in the document and visible
			if (opener?.isConnected && opener.getClientRects().length > 0) opener.focus();
		}
	};
};
