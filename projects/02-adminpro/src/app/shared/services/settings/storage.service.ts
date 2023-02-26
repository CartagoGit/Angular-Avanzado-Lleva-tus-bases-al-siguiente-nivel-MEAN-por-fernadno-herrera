import { Injectable } from '@angular/core';

//* Tipos a guardar en el storage
const localFields = { token: 'token-jwt', theme: 'theme' };
const sessionFields = {};

//* Tipado de campos del localstorage
type LocalFields = typeof localFields;
type SessionFields = typeof sessionFields;
type FieldsKeys<T> = keyof T;

/**
 * ? Interfaz de las propiedades para elegir el tipo de storage
 * @interface BasicStorageProps
 * @typedef {BasicStorageProps}
 * @template T
 */
interface BasicStorageProps<T> {
	fields: T;
	typeStorage: 'local' | 'session';
}

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	// ANCHOR : Variables

	public local = new BasicStorage<LocalFields>({
		fields: localFields,
		typeStorage: 'local',
	});
	public session = new BasicStorage<SessionFields>({
		fields: sessionFields,
		typeStorage: 'session',
	});

	// ANCHOR : Constructor
	constructor() {}

	// ANCHOR : Métodos
}

class BasicStorage<T> {
	public typeStorage;
	public fields;

	constructor(data: BasicStorageProps<T>) {
		const { fields, typeStorage } = data;
		this.fields = fields;
		this.typeStorage =
			typeStorage === 'local' ? localStorage : sessionStorage;
	}
	/**
	 * ? Recupera el valor del campo
	 * @public
	 * @param {Fields} field
	 * @returns {unknown}
	 */
	public get(
		field: FieldsKeys<T>,
		type: 'string' | 'array' | 'object' | 'number' | 'boolean' = 'string'
	): unknown {
		const stringValue = localStorage.getItem(this.fields[field] as string);
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
	 * @param field
	 * @param value
	 */
	public set(field: FieldsKeys<T>, value: unknown): void {
		if (typeof value === 'object') value = JSON.stringify(value);
		value = String(value);
		localStorage.setItem(this.fields[field] as string, value as string);
	}

	/**
	 * ? Elimina el campo del storage
	 * @public
	 * @param {Fields} field
	 */
	public delete(field: FieldsKeys<T>): void {
		localStorage.removeItem(this.fields[field] as string);
	}

	/**
	 * ? Limpia el storage
	 * @public
	 */
	public clear(): void {
		localStorage.clear();
	}
}
