import type { Handle, HandleServerError } from '@sveltejs/kit';
import { layout } from '$lib/stores/layout';
import errorLog from '$lib/server/errorLog';
import { config } from '$lib/server/config';
import { env } from '$env/dynamic/private';
import { parseBoolean } from '$lib/common/utils';

/**
 * System error handling
 * @param {unknown} error - Error object
 * @param {RequestEvent} event - Request event
 * @returns {Promise<void>}
 * @see {@link https://kit.svelte.dev/docs/hooks#shared-hooks-handleerror}
 */
export const handleError: HandleServerError = (async ({ error, event, status }) => {
	console.log('error handle', error);
	const log = await errorLog(status, error, event, {
		saveToDatabase: parseBoolean(env.ERROR_LOG_SAVE_TO_DATABASE)
	});
	return {
		message: log.displayError,
		stack: log.stack
	};
}) satisfies HandleServerError;

export const handle: Handle = async ({ event, resolve }) => {
	const isAdminSite = (event.locals.isAdminSite = event.url.pathname.startsWith(
		config.common.adminSite.path
	));

	const defaultLang = isAdminSite
		? config.common.adminSite.defaultLang
		: config.common.publicSite.defaultLang;
	event.locals.lang = event.params.lang ?? defaultLang;

	//console.log(event.locals.lang);

	let themeMode = 'system';
	const cookieLayout = <string>event.cookies.get('layout');
	if (cookieLayout) {
		const cl = JSON.parse(cookieLayout);
		layout.set(cl);
		if (cl) {
			themeMode = cl.theme;
		}
	}

	themeMode = themeMode === 'system' ? '' : themeMode;

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('class=""', `class="${themeMode}"`)
	});

	return response;
};
