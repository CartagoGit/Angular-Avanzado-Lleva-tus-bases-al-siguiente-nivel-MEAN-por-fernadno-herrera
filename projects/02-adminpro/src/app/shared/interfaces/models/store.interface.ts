import { Observable } from 'rxjs';
import { Pagination } from '../http/pagination.interface';
import { PaginationData } from '../http/request.interface';

/**
 * * Tipado de las propiedades del modelo Store
 */
export interface StoreProps<T> {
	state: T;
	options?: StoreOptions<T>;
}

/**
 * * Tipado de Opciones para el store
 */
export interface StoreOptions<T> {
	allowDeepChanges?: boolean;
	allowDeepChangesInParams?: (keyof T)[] | boolean;
	allowDeepChangesInState?: boolean;
	denyDeepChangesInParams?: (keyof T)[];
	skipFirst?: boolean;
}

/**
 * *	Tipado de Objeto que contiene los observables de cada parametro del estado
 */
export type StoreParams<T> = {
	[key in keyof T & string as `${key}$`]: Observable<T[key]>;
};

/**
 * ? Modelo predefinido para estados
 * @export
 * @interface DefaultState
 * @typedef {DefaultState}
 */
export interface DefaultState<Model extends any> {
	isLoading: boolean;
	data: Model[];
	meta: Pagination;
	pagination: PaginationData;
	search?: string;
}
