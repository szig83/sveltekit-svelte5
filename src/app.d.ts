// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Error {
			backLinkText?: string;
			isHistoryBack?: boolean;
			stack?: string;
		}
		interface Locals {
			lang: string;
			isAdminSite: boolean;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
