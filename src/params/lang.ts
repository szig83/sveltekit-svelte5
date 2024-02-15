import type { ParamMatcher } from '@sveltejs/kit';
import { clientConfig as config } from '$lib/common/config';

/**
 * Opcionális nyelvi paraméter (lang) ellenőrző, ami csak a nyelvi (hu,en...stb) paramétereket engedi.
 * @param {string} param - Az url-ben lévő lang paraméter
 * @returns {boolean}
 * @see https://kit.svelte.dev/docs/advanced-routing#matching
 */

export const match = ((param) => {
	const regex = new RegExp(`^(${config.common.publicSite.availableLangs.join('|')})$`);
	return regex.test(param);
}) satisfies ParamMatcher;
