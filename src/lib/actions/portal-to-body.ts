import type { Action } from 'svelte/action';

/**
 * Moves a node to <body> so fixed-position overlays aren't captured by any
 * transformed ancestor further up the component tree.
 */
export const portalToBody: Action<HTMLElement> = (node) => {
	if (typeof document === 'undefined') return {};

	const marker = document.createComment('portal-to-body');
	const parent = node.parentNode;
	if (!parent) return {};

	parent.insertBefore(marker, node);
	document.body.appendChild(node);

	return {
		destroy() {
			marker.parentNode?.insertBefore(node, marker);
			marker.remove();
		}
	};
};
