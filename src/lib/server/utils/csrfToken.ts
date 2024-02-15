import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

//----------------API CSRF TOKEN----------------

/**
 * Csrf tokenben használt dátum kezdő karakterek száma, ahol szétválasztjuk a lejárati időt
 */
const csrfTokenExtDateStartChar = 5;

/**
 * Csrf token lejárati idejő intervallum miliszekundumban
 */
const expireInterval = 2 * 60 * 60 * 1000;

/**
 * CSRF token generálás API hívásokhoz
 * @returns { string }
 */
const csrfTokenGenerate = (): string => {
	const expDate = new Date(new Date().getTime() + expireInterval).getTime().toString();
	const csrfToken =
		expDate.slice(0, csrfTokenExtDateStartChar) +
		env.CSRF_TOKEN +
		expDate.slice(csrfTokenExtDateStartChar);
	return btoa(csrfToken);
};

/**
 * CSRF token ellenőrzés API hívásoknál
 * @param {string} csrfToken
 * @returns {boolean}
 */
const csrfTokenCheck = (csrfToken: string): boolean => {
	csrfToken = atob(csrfToken);
	const expDate = parseInt(csrfToken.replace(env.CSRF_TOKEN, ''));
	const now = new Date().getTime();
	return now <= expDate;
};

//----------------API CSRF TOKEN----------------

export { csrfTokenGenerate, csrfTokenCheck };
