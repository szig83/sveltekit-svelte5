import type { PageServerLoad } from './$types';
import Dictionary from '$lib/server/dictionary';

export const load: PageServerLoad = (async (event) => {
	const parent = await event.parent();

	const texts = await new Dictionary(event).loadOne('user');
	if (parent.texts) {
		parent.texts = { ...parent.texts, ...texts };
	}

	return { ...parent };
}) satisfies PageServerLoad;
