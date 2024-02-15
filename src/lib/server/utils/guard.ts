import { csrfTokenCheck } from './csrfToken';
import { error } from '@sveltejs/kit';

const apiGuard = (
	request: Request,
	withAuthGuard: boolean = false,
	locals: App.Locals | null = null
): void => {
	const csrfTokenHeader = request.headers.get('X-CSRF-Token') ?? '';

	if (!csrfTokenCheck(csrfTokenHeader)) {
		throw error(401);
	}

	/*if (withAuthGuard && !locals?.authUser) {
		throw error(401);
	}*/
};

export { apiGuard };
