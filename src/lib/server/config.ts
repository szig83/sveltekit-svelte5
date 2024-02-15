import { clientConfig } from '$lib/common/config';
import { env } from '$env/dynamic/private';

/**
 * Szerver oldalról elérhető beállítások
 */
const serverConfig = {
	server: {
		/* Elérési utak */
		path: {
			publicUploadFolder: `${env.UPLOAD_FOLDER}/public` /* Publikus fájlok elérési útja */,
			protectedUploadFolder: `${env.UPLOAD_FOLDER}/protected` /* Védett fájlok elérési útja */,
			userImages: `${env.UPLOAD_FOLDER ?? '_uploads'}/protected/user/[user-id]/images` /* Felhasználói képek elérési útja */
		},
		/* Biztonsági beállítások */
		security: {
			passwordHistoryLimit: 3 /* Last used passwords limit */
		},
		/* Naplózás beállítások */
		log: {
			logDir: env.LOG_DIR ?? '_logs' /* Naplózás főkönyvtár */,
			logDirError: 'error' /* Naplózás hiba alkönyvtár */,
			logFilePrefixError: '' /* Naplózás hiba fájl előtagja */
		}
	}
};

export const config = { ...clientConfig, ...serverConfig };
