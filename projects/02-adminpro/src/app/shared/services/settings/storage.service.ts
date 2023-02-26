import { Injectable } from '@angular/core';

//* Tipos a guardar en el storage
const localFields = { token: 'token-jwt' };
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
	public get(field: FieldsKeys<T>): unknown {
		const stringValue = localStorage.getItem(this.fields[field] as string);
		return stringValue ? JSON.parse(stringValue) : undefined;
	}

	/**
	 * ? Establece el valor en el campo
	 * @param field
	 * @param value
	 */
	public set(field: FieldsKeys<T>, value: unknown): void {
		const stringify = JSON.stringify(value);
		localStorage.setItem(this.fields[field] as string, stringify);
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
