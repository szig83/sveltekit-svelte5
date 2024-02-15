import { error, type RequestHandler } from '@sveltejs/kit';
import { apiGuard } from '$lib/server/utils';
import { json } from '@sveltejs/kit';
//import User from '$lib/server/class/user';
import { config } from '$lib/server/config';
import { generateRandomString } from '$lib/server/utils';

export const POST: RequestHandler = (async ({ request }) => {
	apiGuard(request);
	//console.log(generateRandomString(5));
	//console.log(cookies.getAll());
	//console.log(config);
	//console.log(request);
	if (true) {
		return json({ status: 'ok' });
	}
	throw error(500);
}) satisfies RequestHandler;
