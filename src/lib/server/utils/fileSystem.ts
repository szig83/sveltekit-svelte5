import { existsSync, mkdirSync } from 'fs';

const createFolderFromPath = (path: string): boolean => {
	const pathArray = path.split('/');
	let currentPath = '';
	for (let i = 0; i < pathArray.length; i++) {
		currentPath += pathArray[i] + '/';
		if (!existsSync(currentPath)) {
			try {
				mkdirSync(currentPath);
			} catch (e) {
				return false;
			}
		}
	}
	return true;
};

/**
 * Explode path to folder and filename
 * @param { string } path - Path to explode
 * @returns { string[] } - [folderName, fileName]
 */
const explodePath = (path: string): string[] => {
	const lastDirectorySeparatorIndex = path.lastIndexOf('/');
	const folderName = '/' + path.substring(0, lastDirectorySeparatorIndex);
	const fileName = path.substring(lastDirectorySeparatorIndex + 1);
	return [folderName, fileName];
};

export { createFolderFromPath, explodePath };
