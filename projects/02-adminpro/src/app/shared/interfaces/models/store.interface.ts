import { Observable } from 'rxjs';

//* Tipado de las propiedades del modelo Store
export interface StoreProps<T> {
	state: T;
	options?: StoreOptions<T>;
}

//* Tipado de Opciones para el store
export interface StoreOptions<T> {
	allowDeepChanges?: boolean;
	allowDeepChangesInParams?: (keyof T)[] | boolean;
	allowDeepChangesInState?: boolean;
	denyDeepChangesInParams?: (keyof T)[];
}

//* Tipado de Objeto que contiene los observables de cada parametro del estado
export type StoreParams<T> = {
	[key in keyof T & string as `${key}$`]: Observable<T[key]>;
};
