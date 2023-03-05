import { Injectable } from '@angular/core';
import { objectMap, objectKeyMap } from '../../helpers/object-map.helper';

//* Tipos de storage
type TypesStorage = 'local' | 'session';
/**
 * ? Interfaz de las propiedades para elegir el tipo de storage
 * @interface BasicStorageProps
 * @typedef {BasicStorageProps}
 * @template T
 */
interface BasicStorageProps<T> {
	fields: T;
	typeStorage: TypesStorage;
}

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	// ANCHOR : Variables

	private _initLocalFields = {
		token: 'token-jwt',
		theme: 'theme',
		userRemember: 'user-remember',
	};

	private _prueba = {
		juajua: {
			juju: {
				posi: 'si',
			},
		},
		lororo: {
			perrete: 's',
		},
	};

	private _pruebanum = {
		num1: {
			nombre: 'un nombre',
			num: 2,
		},
		num2: {
			nombre: 'un nombre 2',
			num: 5,
		},
		num3: {
			nombre: 'un nombre 2',
			num: 5,
		},
	};

	private _initSessionFields = {};

	private _prefix = 'cartagopro';

	// private _localFields: Record<keyof typeof this._initLocalFields, string> =
	private _localFields = objectMap(
		this._initLocalFields,
		(value, key, index, array) => this._prefix + '-' + value
	);

	// private _pruebaFF : Record<keyof typeof this._prueba, string> = objectMap(this._prueba, (value, key, index, array) => 'hola'
	private _pruebaFF = objectMap(this._prueba, (value, key, index, array) => ({
		jojo: { jiji: '' },
	}));

	private _pruebaCambiandoKeyFF = objectMap(
		this._prueba,
		(value, key, index, array) => ({
			[`${key}uyyyy`]: { jiji: value },
		})
	);

	private _pruebaCambiandoKeyFF2 = objectMap(
		this._prueba,
		(value, key, index, array) => ({
			[key + 'uyyyy']: { jiji: value },
		})
	);

	private _pruebanumop: Record<
		keyof typeof this._pruebanum,
		(typeof this._pruebanum)[keyof typeof this._pruebanum]
	> = objectMap(this._pruebanum, (value) => {
		this._pruebaFF
		return {
			...value,
			num: value.num + 1,
		};
	});

	private _changeKey = objectKeyMap(this._prueba, (key) => key + 'uyyyy');

	private _sessionFields: Record<
		keyof typeof this._initSessionFields,
		string
	> = objectMap(
		this._initSessionFields,
		(value) => this._prefix + '-' + value
	);

	public local = new BasicStorage<typeof this._localFields>({
		fields: this._localFields,
		typeStorage: 'local',
	});
	public session = new BasicStorage<typeof this._sessionFields>({
		fields: this._sessionFields,
		typeStorage: 'session',
	});

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Métodos

	/**
	 * ? Limpia todos los storage o el storage indicado
	 * @public
	 * @param {?TypesStorage} [storage]
	 */
	public clear(storage?: TypesStorage) {
		if (!storage) {
			for (let param in this) {
				if (this[param] instanceof BasicStorage)
					(this[param] as BasicStorage<any>).clear();
			}
		}
		if (storage === 'local') this.local.clear();
		else if (storage === 'session') this.session.clear();
	}
}

/**
 * ? Clase basica para cada tipo de Storage
 * * Recibe el tipado de ese storage como generico
 * @class BasicStorage
 * @typedef {BasicStorage}
 * @template T
 */
class BasicStorage<T> {
	// ANCHOR Variables
	// public typeStorage;
	public fields;
	public name;

	private _typesStorages: Record<TypesStorage, Storage> = {
		local: window.localStorage,
		session: window.sessionStorage,
	};

	public get typeStorage() {
		return this._typesStorages[this.name];
	}

	//ANCHOR Cosntructor
	constructor(data: BasicStorageProps<T>) {
		const { fields, typeStorage } = data;
		this.fields = fields;

		// this.typeStorage = typesStorages[typeStorage];
		this.name = typeStorage;
	}
	/**
	 * ? Recupera el valor del campo
	 * @public
	 * @param {keyof T} field
	 * @param {('string' | 'array' | 'object' | 'number' | 'boolean')} [type='string']
	 * @returns {unknown}
	 */
	public get(
		field: keyof T,
		type: 'string' | 'array' | 'object' | 'number' | 'boolean' = 'string'
	): unknown {
		const stringValue = this.typeStorage.getItem(
			this.fields[field] as string
		);
		if (
			stringValue === '' ||
			stringValue === null ||
			stringValue === undefined
		) {
			return undefined;
		}
		let value: any = stringValue;
		if (type === 'array' || type === 'object')
			value = JSON.parse(stringValue);
		else if (type === 'boolean')
			value = stringValue === 'true' ? true : false;
		else if (type === 'number') value = Number(stringValue);

		return value;
	}

	/**
	 * ? Establece el valor en el campo
	 * @public
	 * @param {keyof T} field
	 * @param {unknown} value
	 */
	public set(field: keyof T, value: unknown): void {
		if (typeof value === 'object') value = JSON.stringify(value);
		else value = String(value);
		localStorage.setItem(this.fields[field] as string, value as string);
	}

	/**
	 * ? Elimina el campo del storage
	 * @public
	 * @param {keyof T} field
	 */
	public delete(field: keyof T): void {
		this.typeStorage.removeItem(this.fields[field] as string);
	}

	/**
	 * ? Limpia el storage
	 * @public
	 */
	public clear(): void {
		this.typeStorage.clear();
	}
}
