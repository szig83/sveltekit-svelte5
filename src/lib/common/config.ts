/**
 * Kliens oldalról elérhető beállítások
 */
export const clientConfig = {
	/* Általános alkalmazás beállítások */
	common: {
		publicSite: {
			path: '/' /* Elérési útvonal */,
			defaultLang: 'hu' /* Alapértelmezett nyelv */,
			availableLangs: ['hu', 'en'] /* Engedélyezett nyelvek */,
			defaultHome: {
				hu: 'fooldal'
			} /* Alapértelmezett főoldal slug-ok a különböző nyelveken. */,
			defaultLayoutSettings: {
				appThemeMode: 'light',
				appThemeColor: 'default',
				appThemeSize: '100'
			},
			cookieMaxAge: 60 * 60 * 24 * 7 * 4 /*1 honap*/,
			fieldValidationType:
				'optional' /* Alapértelmezett mező validálási típus megjelenítés. required|optional|both */
		},
		adminSite: {
			path: '/admin' /* Elérési útvonal */,
			defaultLang: 'hu' /* Alapértelmezett nyelv */,
			availableLangs: ['hu', 'en'] /* Engedélyezett nyelvek */,
			defaultHome: {
				hu: 'fooldal',
				en: 'home'
			} /* Alapértelmezett főoldal slug-ok a különböző nyelveken. */,
			defaultLayoutSettings: {
				appThemeMode: 'light',
				appThemeColor: 'default',
				appThemeSize: '100'
			},
			cookieMaxAge: 60 * 60 * 24 * 7 /*1 het*/,
			fieldValidationType:
				'optional' /* Alapértelmezett mező validálási típus megjelenítés. required|optional|both */
		},
		appDictionary: 'app' /* Alkalmazás szótár neve */,
		isDataDecoding: false /* Adatok küldése előtt dekódolja azokat */
	}
};

/**
 * Password strength options
 * @property { number } minLenght Minimum password length
 * @property { number } exceptLowercaseCount Minimum lowercase characters
 * @property { number } exceptUppercaseCount Minimum uppercase characters
 * @property { number } exceptDigitCount Minimum digits
 * @property { number } exceptSpecialCharCount Minimum special characters
 * @property { number } minFulfilledConditions Minimum fulfilled conditions
 */
export const passwordStrengthOptions = {
	minLenght: 5,
	exceptLowercaseCount: 1,
	exceptUppercaseCount: 1,
	exceptDigitCount: 1,
	exceptSpecialCharCount: 1,
	minFulfilledConditions: 1
} as const;
