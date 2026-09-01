// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		/** Cloudflare Pages bindings — ASSETS lets /mcp read prerendered pages. */
		interface Platform {
			env?: {
				ASSETS?: { fetch: (input: Request | URL | string) => Promise<Response> };
			};
		}
	}
}

export {};
