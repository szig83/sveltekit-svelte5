import type { PageServerLoad } from './$types';
import { customError } from '$lib/server/errorLog';

export const load: PageServerLoad = (async (event) => {
	console.log(event);
	const parent = await event.parent();

	const e = customError('Nagy a baaajaaaaa!', event);
	console.error('szar', e);
	return {
		error: e.message
	};
}) satisfies PageServerLoad;
