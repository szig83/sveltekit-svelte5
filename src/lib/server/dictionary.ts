import type { DictionaryStruct } from '$lib/common/utils';
import type { RequestEvent } from '@sveltejs/kit';
import { config } from '$lib/server/config';

/**
 * Szótár osztály publikus interfész
 */
interface IDictionaryStruct {
	loadApp(): Promise<DictionaryStruct>;
	loadOne(dictionaryName: string): Promise<DictionaryStruct>;
	loadMany(dictionaryNames: string[]): Promise<DictionaryStruct>;
	loadOneWithApp(dictionaryName: string): Promise<DictionaryStruct>;
	loadManyWithApp(dictionaryNames: string[]): Promise<DictionaryStruct>;
}

/**
 * A szótárakat kezelő osztály.
 * @class Dictionary
 */
export default class Dictionary implements IDictionaryStruct {
	/**
	 * A nyelvi kód (hu,en...stb)
	 * @private
	 * @type { string }
	 */
	private lang: string;
	/**
	 * A betöltendő szótárak nevei
	 * @private
	 * @type { string[] }
	 */
	private dictionaryNames: string[] = [];

	/**
	 * Szótárakat kezelő osztály konstruktora.
	 * @param { RequestEvent } event - Sveltekit event
	 */
	constructor(event: RequestEvent) {
		this.lang = event.locals.lang;
	}

	/**
	 * A szótárfájlok betöltését végző metódus. A megadott szótárnév alapján betölti az adott nyelvű szótárfájlt.
	 * Ha nem találja a megadott nyelvű szótárfájlt, akkor az alapértelmezett nyelvűt tölti be.
	 * Ha az alapértelmezett nyelvű szótárfájl sem található, akkor null értéket ad vissza.
	 * @private
	 * @param { string } dictionaryName - a betöltendő szótárfájl neve.
	 * @returns Promise<DictionaryStruct> - a betöltött szótár objektum.
	 */
	private async load(dictionaryName: string): Promise<DictionaryStruct> {
		try {
			return (await import(`../languages/${this.lang}/${dictionaryName}.json`)).default;
		} catch (e) {
			try {
				return (
					await import(
						`../languages/${config.common.publicSite.defaultLang}/${dictionaryName}.json`
					)
				).default;
			} catch (e) {
				return null;
			}
		}
	}

	/**
	 * A betöltendő szótárfájl nevének hozzáadása a betöltendő szótárak neveihez.
	 * @private
	 * @param { string } name - a betöltendő szótárfájl neve.
	 * @returns void
	 */
	private addDictionaryName(name: string): void {
		if (!this.dictionaryNames.includes(name)) {
			this.dictionaryNames.push(name);
		}
	}

	/**
	 * A betöltendő szótárak összegyűjtése.
	 * @private
	 * @returns Promise<DictionaryStruct[]> - a betöltött szótárak objektumai.
	 */
	private async collectDictionaries(isWrapped: boolean = true): Promise<DictionaryStruct[]> {
		const dictionaries: DictionaryStruct[] = [];

		for (const name of this.dictionaryNames) {
			const dictionary: DictionaryStruct = await this.load(name);
			if (dictionary) {
				const wrapper: DictionaryStruct = {};
				wrapper[name] = dictionary;
				dictionaries.push(isWrapped ? wrapper : dictionary);
			}
		}

		return dictionaries;
	}

	/*private createObject<T>(key: keyof T, value: T[keyof T]) {
		const obj: { [K in keyof T]: T[keyof T] } = {} as { [K in keyof T]: T[keyof T] };
		obj[key] = value;
		return obj;
	}*/

	/**
	 * Alkalmazás szótárának betöltése. A betöltendő szótár neve a konfigurációs fájlban van megadva.
	 * @returns Promise<DictionaryStruct> - a betöltött szótár objektum.
	 */
	async loadApp(): Promise<DictionaryStruct> {
		this.addDictionaryName(config.common.appDictionary);
		const dictionaries: DictionaryStruct[] = await this.collectDictionaries();
		return Object.assign({}, ...dictionaries);
	}

	/**
	 * Egy szótár betöltése.
	 * @param { string } dictionaryName - A betöltendő szótárfájl neve.
	 * @returns Promise<DictionaryStruct> - A betöltött szótár objektum.
	 */
	async loadOne(dictionaryName: string, isWrapped: boolean = true): Promise<DictionaryStruct> {
		this.addDictionaryName(dictionaryName);
		const dictionaries: DictionaryStruct[] = await this.collectDictionaries(isWrapped);
		return Object.assign({}, ...dictionaries);
	}

	/**
	 * Több szótár betöltése egyszerre.
	 * @param { string[] } dictionaryNames - A betöltendő szótárfájlok nevei.
	 * @returns Promise<DictionaryStruct> - A betöltött szótár objektum. A betöltött szótárak objektumai össze vannak fűzve.
	 */
	async loadMany(dictionaryNames: string[]): Promise<DictionaryStruct> {
		for (const name of dictionaryNames) {
			this.addDictionaryName(name);
		}
		const dictionaries: DictionaryStruct[] = await this.collectDictionaries();
		return Object.assign({}, ...dictionaries);
	}

	/**
	 * Egy szótár betöltése az alkalmazás szótárával együtt.
	 * @param { string } dictionaryName - A betöltendő szótárfájl neve.
	 * @returns Promise<DictionaryStruct> - A betöltött szótár objektum. A betöltött szótárak objektumai össze vannak fűzve.
	 */
	async loadOneWithApp(dictionaryName: string): Promise<DictionaryStruct> {
		this.addDictionaryName(config.common.appDictionary);
		return this.loadOne(dictionaryName);
	}

	/**
	 * Több szótár betöltése az alkalmazás szótárával együtt.
	 * @param { string[] } dictionaryNames - A betöltendő szótárfájlok nevei.
	 * @returns Promise<DictionaryStruct> - A betöltött szótár objektum. A betöltött szótárak objektumai össze vannak fűzve.
	 */
	async loadManyWithApp(dictionaryNames: string[]): Promise<DictionaryStruct> {
		this.addDictionaryName(config.common.appDictionary);
		return this.loadMany(dictionaryNames);
	}
}
