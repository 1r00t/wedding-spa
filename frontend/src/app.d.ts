// /* eslint-disable @typescript-eslint/no-unused-vars */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user: {
			isAuthenticated: boolean
			username: string
		}
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

declare namespace svelte.JSX {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface HTMLProps<T> {
		onclick_outside?: (e: CustomEvent) => void
	}
}
