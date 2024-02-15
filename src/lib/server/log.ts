import { config } from '$lib/server/config';
import { mkdirSync, appendFileSync } from 'fs';
import moment from 'moment';
import type { RequestEvent } from '@sveltejs/kit';

/**
 * Separated log places (admin, main, etc.) types
 */
type LogDirSite = 'admin' | 'main';

/**
 * Log data type
 */
type LogData = Record<string, string>;

/**
 * Log parameters
 */
interface LogParams {
	logDirSub: string;
	logDirSite?: LogDirSite;
	logFilePrefix?: string;
	logFilePostfix?: string;
	saveToDatabase?: boolean;
}

/**
 * Write log data to file and optionally to database
 * @param {string | Record<string, string>} data - Log data
 * @param {LogParams} params - Log parameters
 * @returns {void}
 */
function writeLog(data: string | Record<string, string>, params: LogParams): void {
	const logDirSub = params.logDirSub ? `${params.logDirSub}/` : '';
	const logDirSite = params.logDirSite ?? '';
	const logFilePrefix = params.logFilePrefix ? `${params.logFilePrefix}_` : '';
	const logFilePostfix = params.logFilePostfix ? `_${params.logFilePostfix}` : '';
	const saveToDatabase = params.saveToDatabase ?? false;

	const logDir = `${config.server.log.logDir}/${logDirSub}${logDirSite}`;
	const logFilePath = `${logDir}/${logFilePrefix}${moment().format('YYYY-MM-DD')}${logFilePostfix}.log`;

	const logData = {
		logDate: moment().format('YYYY-MM-DD HH:mm:ss'),
		message: '',
		stack: '',
		status: ''
	};

	if (typeof data === 'string') {
		logData.message = data;
	} else {
		logData.message = 'Message: ' + data.message;
		logData.stack = data.stack;
		logData.status = data.status;
	}

	const logContent =
		logData.logDate +
		'\n' +
		'Status: ' +
		logData.status +
		'\n' +
		logData.message +
		(logData.stack !== '' ? '\n' + logData.stack : '') +
		'\n---------------------------------------\n';

	let fileSaveSuccess = false;
	try {
		mkdirSync(logDir, { recursive: true });
		appendFileSync(logFilePath, logContent);
		fileSaveSuccess = true;
	} catch (error) {}

	if (saveToDatabase) {
		console.log('Save log to database');
		//TODO: Save log to database
		if (!fileSaveSuccess) {
			//TODO: Save to database that file save failed
		}
	}
}

/**
 * Log function
 * @param {RequestEvent | null} event - SvelteKit event, default: null
 * @param {Partial<LogParams>} customParams - Custom log parameters, default: {}
 */
export default function log(
	event: RequestEvent | null = null,
	customParams: Partial<LogParams> = {}
) {
	const defaultParams: LogParams = {
		logDirSub: 'default',
		logDirSite:
			event && event.url.pathname && event.url.pathname.startsWith(config.common.adminSite.path)
				? 'admin'
				: 'main',
		logFilePrefix: '',
		logFilePostfix: ''
	};

	const params: LogParams = { ...defaultParams, ...customParams };

	return {
		write: (data: string | Record<string, string>) => {
			writeLog(data, params);
		}
	};
}

export type { LogParams, LogData };
