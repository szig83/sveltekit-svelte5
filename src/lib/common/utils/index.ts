import type { Page, RequestEvent } from '@sveltejs/kit';
import { clientConfig as config } from '../config';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Dictionary structure
 */
type DictionaryStruct = Record<string, any> | null;

const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

/**
 * Generate random string
 * @param {number} length - Random string length
 * @param {number} type - 1: lowercases, 2: lowercases, uppercases, 3: lowercases, uppercases, numbers
 * @returns
 */
const generateRandomString = (length: number, type: number = 1): string => {
	let result = '';
	let characters = '';
	const lowerCaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
	const upperCaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numberCharacters = '0123456789';
	if (type === 1) {
		characters += lowerCaseCharacters;
	} else if (type === 2) {
		characters += lowerCaseCharacters + upperCaseCharacters;
	} else if (type === 3) {
		characters += lowerCaseCharacters + upperCaseCharacters + numberCharacters;
	}

	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charactersLength);
		result += characters.charAt(randomIndex);
	}

	return result;
};

/**
 * Transform the target url depending on the language.
 * @param { string } slug - Link slug
 * @param { Page<Record<string, string>, string | null> | null } pageStore - Sveltekit $page variable
 * @returns string - Transformed href
 */
const hrefTransform = (
	slug: string,
	pageStore: Page<Record<string, string>, string | null> | null | RequestEvent = null
): string => {
	const sitePath = pageStore?.url.pathname.startsWith(config.common.adminSite.path)
		? config.common.adminSite.path + '/'
		: '/';

	if (slug.startsWith('/')) {
		slug = slug.substring(1);
	}
	let transformedLink = sitePath + slug;
	if (pageStore?.params && pageStore?.params.lang) {
		transformedLink = sitePath + pageStore.params.lang + '/' + slug;
	}

	return transformedLink === '/' ? transformedLink : transformedLink.replace(/\/$/, '');
};

/**
 * Get text from the dictionary (depending on the language).
 * If placeholders like {0}, {1}, and so on are detected in the text retrieved using the specified `key` param,
 * they will be substituted with the corresponding values provided in the `interpolationValues` parameter.
 * @param { DictionaryStruct } dictionary - Dictionary
 * @param { string } key - Key in the dictionary (identifier of the searched text, e.g. errorCode.e404).
 * @param { (string | number)[] } interpolationValues - Values to replace placeholders in the translated text.
 * @param { string } defaultText - Default text if not found in the dictionary.
 * @returns
 */
const getText = (
	dictionary: DictionaryStruct | string = null,
	key: string = '',
	interpolationValues: (number | string)[] = [],
	defaultText: string = ''
): string => {
	const noResultText = defaultText.length > 0 ? defaultText : key.length > 0 ? `*${key}*` : '*****';
	if (typeof dictionary === 'string') {
		return dictionary;
	}

	if (dictionary && key.length > 0) {
		let result: DictionaryStruct | string = dictionary;
		const keys = `${key}`.split('.');

		for (const k of keys) {
			result = (result as Record<string, unknown>)[k] as DictionaryStruct | string;
			if (!result) {
				return noResultText;
			}
		}

		// Replace placeholders based on key pattern and interpolation values
		let translatedText = result as string;
		interpolationValues.forEach((param, index) => {
			const placeholder = `{${index}}`;
			translatedText = translatedText.replace(placeholder, param.toString());
		});

		return translatedText.replaceAll('\n', '<br>');
	} else {
		return noResultText;
	}
};

/*
const getTextOrObject = (obj: any, searchTerm: string): DictionaryStruct | string | undefined => {
	if (typeof obj !== 'object' || obj === null) {
		return undefined;
	}

	if (Array.isArray(obj)) {
		for (const item of obj) {
			const result = getTextOrObject(item, searchTerm);
			if (result !== null) {
				return result;
			}
		}
		return undefined;
	}

	if (obj.hasOwnProperty(searchTerm)) {
		return obj[searchTerm];
	}

	for (const key in obj) {
		const result = getTextOrObject(obj[key], searchTerm);
		if (result !== undefined) {
			return result;
		}
	}

	return undefined;
};*/

/**
 * Get cookie value
 * @param { string } cookieName - Cookie name
 * @returns Cookie value
 */
const getCookieValue = (cookieName: string): string | null => {
	const layoutCookieStr = document.cookie
		.split('; ')
		.find((row) => row.startsWith(`${cookieName}=`))
		?.split('=')[1];
	if (layoutCookieStr) {
		return decodeURIComponent(layoutCookieStr);
	}
	/*const cookies = document.cookie.split('; ');
	for (const cookie of cookies) {
		const [name, value] = cookie.split('=');
		if (name === cookieName) {
			return decodeURIComponent(value);
		}
	}
	*/
	return null;
};

/**
 * Sleep
 * @param { number } ms - Sleep time in miliseconds
 * @returns
 */
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Api call
 * @param csrfToken
 * @param endpoint
 * @param method
 * @param data
 * @param event
 * @returns
 */
const apiCall = async (
	csrfToken: string,
	endpoint: string,
	method: string,
	data: unknown = null,
	event?: RequestEvent
) => {
	console.log('apiCall', csrfToken);
	const headers = {
		'Content-Type': 'application/json',
		'X-CSRF-Token': csrfToken
	};

	const requestOptions = {
		method: method,
		headers: headers
	} as {
		method: string;
		headers: Record<string, string>;
		body?: string;
	};
	if (method !== 'GET' && method !== 'HEAD') {
		requestOptions.body = data ? JSON.stringify(data) : '';
	}

	if (event) {
		return await event.fetch(`/api/${endpoint}`, requestOptions);
	}
	return await fetch(`/api/${endpoint}`, requestOptions);
};

const applyLayoutSettings = (
	name: string,
	value: string,
	target: 'html' | 'body' = 'body'
): void => {
	if (name) {
		let targetElement = document.body;
		if (target === 'html' || name === 'theme-size') {
			targetElement = document.documentElement;
		}

		if (value) {
			targetElement.setAttribute(`data-${name}`, value);
			document.cookie = `${name}=${value}; max-age=${config.common.publicSite.cookieMaxAge}; path=/; SameSite=Lax`;
			//window.localStorage.setItem(name, value);
		} else {
			targetElement.removeAttribute(`data-${name}`);
			document.cookie = `${name}=${value}; max-age=0; path=/; SameSite=Lax`;
		}
	}
};

/**
 * Encode data
 * @param { T } data - Data to encode
 * @returns Encoded data
 */
const dataEncode = <T = string>(data: T): string | T => {
	if (config.common.isDataDecoding) {
		return (
			generateRandomString(5, 3) +
			btoa(encodeURIComponent(JSON.stringify(data)))
				.split('')
				.reverse()
				.join('')
		);
	}

	return data;
};

/**
 * Decode data
 * @param { string } data - Encoded data
 * @returns Decoded data
 */
const dataDecode = <T = string>(data: string): T | string => {
	if (config.common.isDataDecoding) {
		return JSON.parse(decodeURIComponent(atob(data.slice(5).split('').reverse().join(''))));
	}
	return data as string;
};

const logout = () => {
	document.cookie = `sessionID=''; max-age=0; path=/; SameSite=Strict`;
};

/**
 * SvelteKit custom page param matcher logic
 * @param { string } param
 * @returns
 */
const pageParamMatcher = (param: string, slugs: string[]) => {
	const regex = new RegExp(`^(?!.*(${config.common.publicSite.availableLangs.join('|')})).{1,20}$`);
	const regex2 = new RegExp(`^(${slugs.join('|')})$`);
	return regex.test(param) && regex2.test(param);
};

type ValidationError = Record<string, string[]>;
/**
 * Translate validation errors from dictionary
 * @param errors - Validation errors object (e.g. { email: ['required', 'email'] })
 * @param texts - Dictionary
 * @returns - Translated validation errors object
 */
const translateValidationErrors = (
	errors: ValidationError,
	texts: DictionaryStruct
): ValidationError => {
	// Check if there are any validation errors
	if (!errors) {
		return {};
	}

	// Initialize an object to store translated errors
	const translatedErrors: ValidationError = {};

	// Iterate through each field with validation errors
	for (const key in errors) {
		if (Object.hasOwn(errors, key)) {
			//if (Object.prototype.hasOwnProperty.call(errors, key)) {
			const messages = errors[key];

			// Translate each error message for the current field
			const translatedMessages = messages.map((validatorPattern: string) => {
				// Split the validator pattern into validator message and parameters
				const [validatorMessage, paramStr] = validatorPattern.split('|');
				const params = paramStr ? paramStr.split('$') : [];

				// Translate the validator message and replace placeholders with corresponding parameters.
				// Use the `getText` function to get the translated validator message from the dictionary.
				// If the message is not found, default to `validatorMessage`.
				return getText(texts, validatorMessage, params, validatorMessage);
			});

			// Store the translated error messages for the current field
			translatedErrors[key] = translatedMessages;
		}
	}

	// Return the object containing translated validation errors
	return translatedErrors;
};

/**
 * This function shortens a string to a specified length for the purpose of display.
 * @param { string } originalString The string to be shortened
 * @param { number } maxLength The maximum length of the string
 * @param {number } lastPartLength The length of the last part of the string
 */
function shortenString(
	originalString: string,
	maxLength: number = 30,
	lastPartLength: number = 10
): string {
	const ellipsis = '...';

	if (originalString.length <= maxLength) {
		return originalString;
	}

	const firstPartLength = maxLength - ellipsis.length - lastPartLength;
	const firstPart = originalString.slice(0, firstPartLength);
	const lastPart = originalString.slice(lastPartLength * -1);

	return `${firstPart}${ellipsis}${lastPart}`;
}

/**
 * Parse boolean value from string
 * @param value
 * @returns boolean | undefined
 */
const parseBoolean = (value: string): boolean | undefined => {
	if (value === 'true') {
		return true;
	} else if (value === 'false') {
		return false;
	} else {
		return undefined;
	}
};

//EXPORTS
export {
	apiCall,
	cn,
	generateRandomString,
	getCookieValue,
	getText,
	//getTextOrObject,
	hrefTransform,
	sleep,
	applyLayoutSettings,
	dataEncode,
	dataDecode,
	logout,
	pageParamMatcher,
	parseBoolean,
	translateValidationErrors,
	shortenString
};

export type { DictionaryStruct };
