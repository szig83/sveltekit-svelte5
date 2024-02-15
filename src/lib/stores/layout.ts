import { writable } from 'svelte/store';

export const layout = writable({
	size: 'default',
	theme: 'light',
	color: 'default'
});
