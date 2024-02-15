import { config } from '$lib/server/config';
import log, { type LogParams, type LogData } from './log';
import type { RequestEvent } from '@sveltejs/kit';
import Dictionary from '$lib/server/dictionary';
import { getText } from '$lib/common/utils';
import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';

/**
 * Display final error message to client.
 * @param logData
 * @param event
 * @returns
 */
async function displayError(logData: LogData, event: RequestEvent | null): Promise<string> {
	const defaultText = 'Hiba történt...';
	try {
		const texts = await new Dictionary(<RequestEvent>event).loadOne('error');
		const statusCode = logData.status.startsWith('5') ? '5xx' : logData.status;

		return getText(texts, `error.errorCode.e${statusCode}`, [], defaultText);
	} catch (e) {
		return defaultText;
	}
}

const customError = (message: string, event: RequestEvent, toDisplay: boolean = false) => {
	let stack = '';

	try {
		throw new Error(message);
	} catch (e) {
		if (dev) {
			stack = <string>(<Error>e).stack;
		}
		errorLog(400, e, event, { logFilePostfix: 'custom' });
	}

	if (toDisplay) {
		error(400, {
			message,
			stack: stack
		});
	}

	return {
		message,
		stack
	};
};

/**
 * Error log function.
 * @param {unknown} error - Error object
 * @param {RequestEvent | null} event - SvelteKit event, default: null
 * @param {Partial<LogParams>} customParams - Custom log parameters, default: {}
 */
export default async function errorLog(
	status: number,
	error: unknown,
	event: RequestEvent | null = null,
	customParams: Partial<LogParams> = {}
) {
	const defaultParams: LogParams = {
		logDirSub: config.server.log.logDirError,
		logFilePrefix: config.server.log.logFilePrefixError
	};
	const params: LogParams = { ...defaultParams, ...customParams };

	const logData: LogData = Object.assign(
		{ status: <string>status.toString() },
		{ message: <string>(<Error>error).message },
		{ stack: <string>(<Error>error).stack }
	);

	log(event, params).write(logData);

	//console.log(event);
	const text = await displayError(logData, event);
	return {
		displayError: text,
		stack: dev ? logData.stack : ''
	};
}

export { customError };
