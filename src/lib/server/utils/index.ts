/**
 * Szerver oldali segédfüggvények
 */
// import { redirect, type RequestEvent } from '@sveltejs/kit';
// import { link } from '$lib/common/utils';

// import { error } from '@sveltejs/kit';
// import { env } from '$env/dynamic/private';
// import { readFileSync, existsSync, mkdirSync } from 'fs';

//import { fileTypeFromFile } from 'file-type';
//import { clientConfig as config } from '$lib/common/config';
//import type { ILayoutSettings } from '$lib/server/class/layout';
//import type { IQueryResult } from './class/database';
//import { message as superFormMessage } from 'sveltekit-superforms/server';
//import ErrorLog from '$lib/server/class/log/error';

/*const authGuard = (event: RequestEvent): unknown => {
	const authUser = event.locals.authUser;
	if (authUser) {
		return authUser;
	} else {
		const preLink = link('', event);
		const redirectUrl = event.url.pathname.replace(preLink + '/', '');
		throw redirect(307, `${preLink}?url=${redirectUrl}`);
	}
};*/

// const getImage = async (path: string, onlyInfo: boolean = false) => {
// 	if (path) {
// 		try {
// 			let imageExists = true;
// 			let imagePath = `${process.cwd()}/${path}`;
// 			if (!existsSync(imagePath)) {
// 				imageExists = false;
// 				imagePath = `${process.cwd()}/${env.PROTECTED_FILES_PATH}/pix.png`;
// 			}
// 			const ft = await fileTypeFromFile(imagePath);

// 			if (onlyInfo) {
// 				return {
// 					mime: ft?.mime ?? 'image/jpeg',
// 					imageExists
// 				};
// 			}

// 			const imageSource = readFileSync(imagePath);
// 			return {
// 				image: imageSource,
// 				mime: ft?.mime ?? 'image/jpeg',
// 				imageExists
// 			};
// 		} catch (e) {
// 			return null;
// 		}
// 	}
// 	return null;
// };

// const getLayoutSettings = (event: RequestEvent): ILayoutSettings => {
// 	const appThemeSize =
// 		event.cookies.get('theme-size') ??
// 		event.locals.authUser?.user_layout_settings?.appThemeSize ??
// 		config.app.defaultAdminLayoutSettings.appThemeSize;
// 	const appThemeMode =
// 		event.cookies.get('theme-mode') ??
// 		event.locals.authUser?.user_layout_settings?.appThemeMode ??
// 		config.app.defaultAdminLayoutSettings.appThemeMode;
// 	const appTheme =
// 		event.cookies.get('theme') ??
// 		event.locals.authUser?.user_layout_settings?.appTheme ??
// 		config.app.defaultAdminLayoutSettings.appTheme;
// 	return {
// 		appThemeSize,
// 		appThemeMode,
// 		appTheme
// 	};
// };

/**
 *
 * @param { RequestEvent } event
 * @param { any }superForm Superform object
 * @param { IQueryResult } result Database query result
 * @returns
 */
// const formMessage = (event: RequestEvent, superForm: any, result: IQueryResult) => {
// 	if (result.status === 'success') {
// 		return superFormMessage(superForm, result.message);
// 	} else {
// 		const errorMessage = result.message ?? 'error';

// 		/**
// 		 * If the error is critical, we log it
// 		 */
// 		if (result.status === 'error') {
// 			new ErrorLog(event).write(
// 				Object.assign({ message: errorMessage }, { stack: new Error().stack as string })
// 			);
// 		}

// 		return superFormMessage(superForm, errorMessage, {
// 			status: result.status === 'fail' ? 422 : 500
// 		});
// 	}
// };

/**
 * Betölti a kliens oldali segédfüggvényeket is
 */
/*export * from '$lib/common/utils';
export {
	authGuard,
	apiGuard,
	apiCsrfTokenGenerate,
	apiCsrfTokenCheck,
	explodePath,
	formMessage,
	getImage,
	getLayoutSettings,
	createFolderFromPath
};
*/

export * from '../../common/utils';
export * from './csrfToken';
export * from './fileSystem';
export * from './guard';
