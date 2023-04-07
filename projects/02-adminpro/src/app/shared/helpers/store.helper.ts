import { Store } from '../models/state/store.model';
import { StoreOptions } from '../interfaces/models/store.interface';


/**
 * ? Funcion que crea un nuevo store
 * @template T
 * @param {T} state
 * @param {?StoreOptions<T>} [options]
 * @returns {Store<T>}
 */
export const createStore = <T extends { [key in keyof T]: T[key] }>(
	state: T,
	options?: StoreOptions<T>
): Store<T> => {
	return new Store(state, options);
};
