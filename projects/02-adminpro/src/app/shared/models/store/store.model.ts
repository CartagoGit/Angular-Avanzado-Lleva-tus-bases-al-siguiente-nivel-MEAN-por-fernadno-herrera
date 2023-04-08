import {
	Observable,
	BehaviorSubject,
	map,
	distinctUntilChanged,
	takeUntil,
	Subject,
	finalize,
	tap,
} from 'rxjs';
import { isEqual } from '../../helpers/object.helper';
import { basicLogError } from '../../helpers/log.helper';
import {
	StoreOptions,
	StoreParams,
} from '../../interfaces/models/store.interface';
import { NonArrayType } from '../../interfaces/common/utils.interface';

/**
 * ? Clase store de donde observar los cambios en cualquier estado que se pase en el constructor
 * @export
 * @class createStore
 * @typedef {createStore}
 * @template T
 */
export class Store<T extends { [key in keyof T]: T[key] }> {
	// ANCHOR : Propiedades

	/** Observer del estado - Readonly */
	public readonly observer: BehaviorSubject<T>;
	/** Observable que emite el estado actual - Readonly */
	public readonly state$: Observable<T>;
	/** Estado inicial - Readonly */
	public readonly firstState: T;
	/** Objeto que contiene los observables de cada parametro del estado - Readonly */
	public readonly params: StoreParams<T>;
	/** Opciones del store - Readonly */
	public readonly options: StoreOptions<T>;

	// * Observable que emite cuando se destruye el store cancelando las subscripciones que dependan de ella
	private readonly _destroyState$ = new Subject<void>();

	//* Propiedades para obligar a reenviar el estado aunque no haya cambios
	private _resendState: boolean = false;
	private _resendParams: boolean | (keyof T)[] = false;

	// ANCHOR : Constructor
	constructor(state: NonArrayType<T>, options?: StoreOptions<T>) {
		console.log("❗constructor  ➽ state ➽ ⏩" , state);
		const {
			allowDeepChanges = true,
			allowDeepChangesInState = true,
			allowDeepChangesInParams = true,
			denyDeepChangesInParams = [],
		} = options || {};
		this.options = {
			allowDeepChanges,
			allowDeepChangesInState,
			allowDeepChangesInParams,
			denyDeepChangesInParams,
		};
		this._isOkAllowedOptions(this.options);

		this.observer = new BehaviorSubject<T>(state);
		const observable: Observable<T> = this.observer.asObservable().pipe(
			finalize(() => {
				this._destroyState$.complete();
			}),
			takeUntil(this._destroyState$)
		);

		const state$: Observable<T> = observable.pipe(
			distinctUntilChanged((x, y) => {
				console.log(
					x,
					y,
					x === y,
					allowDeepChanges,
					allowDeepChangesInState
				);
				if (this._resendState) return false;
				else {
					return allowDeepChanges && allowDeepChangesInState
						? isEqual(x, y)
						: x === y;
				}
			}),
			tap((value) => console.log(value))
		);

		this.state$ = state$;
		this.params = this._makeParamsObservables({
			state,
			options: this.options,
			state$,
		});
		this.firstState = this.observer.value;
	}

	// ANCHOR : Metodos publicos

	/**
	 * ? Metodo que retorna el estado actual
	 * @returns {T}
	 */
	public getState = (): T => ({ ...this.observer.value });

	/**
	 * ? Metodo que establece un nuevo estado
	 * @param {T} newState
	 */
	public setState = (newState: T): void => this.observer.next(newState);

	/**
	 * ? Metodo que resetea el estado a su estado inicial
	 */
	public resetState = (): void => this.observer.next(this.firstState);

	/**
	 * ? Metodo que obliga a recargar el estado aunque no haya cambiado
	 */
	public reloadState = (): void => {
		this._resendState = true;
		this.observer.next(this.getState());
		this._resendState = false;
	};

	/**
	 * ? Metodo que obliga a recargar los parametros del estado aunque no hayan cambiado
	 * * Se puede pasar un array de parametros para reenviar solo esos parametros
	 * * Se puede pasar true para reenviar todos los parametros
	 * @param {?(keyof T)[] | boolean} [params]
	 */
	public reloadParams = (params?: (keyof T)[] | boolean): void => {
		this._resendParams = params || true;
		this.reloadState();
		this._resendParams = false;
	};

	/**
	 * ? Metodo que obliga a recargar todos los parametros del estado aunque no hayan cambiado
	 */
	public reloadFull = (): void => {
		this.reloadParams(true);
	};

	/**
	 * ? Metodo que retorna el valor de un parametro del estado
	 * @template P
	 * @param {P} param
	 * @returns {T[P]}
	 */
	public getParam = <P extends keyof T>(param: P): T[P] => ({
		...this.observer.value[param],
	});

	/**
	 * ? Metodo que establece un nuevo valor a un parametro del estado
	 * @template P
	 * @param {P} param
	 * @param {T[P]} value
	 */
	public setParam = <P extends keyof T>(param: P, value: T[P]): void => {
		this.observer.next({
			...this.observer.value,
			[param]: value,
		});
	};

	/**
	 * ? Metodo que resetea el valor de un parametro del estado a su estado inicial
	 * @param {keyof T} param
	 */
	public resetParam = (param: keyof T): void => {
		this.observer.next({
			...this.observer.value,
			[param]: this.firstState[param],
		});
	};

	/**
	 * ? Metodo que completa, cierra y termina todas las subscripciones a los Observables que dependan del estado
	 * * A tener en cuenta que esto ocurre por el pipe finalize del observable del estado que triggerea el complete del destroyState$
	 */
	public endState = (): void => {
		this.observer.complete();
		this.observer.unsubscribe();
	};

	/**
	 * ? Metodo que muestra si el estado esta siendo observado
	 * @returns {boolean}
	 */
	public isObserved = (): boolean => this.observer.observed;

	/**
	 * ? Metodo que muestra si el estado esta cerrado
	 * @returns {boolean}
	 */
	public isClosed = (): boolean => this.observer.closed;

	// ANCHOR PRIVATE METHODS

	/**
	 * ? Metodo que crea un observable para cada parametro del estado
	 * @param {{
			state: T;
			options: StoreOptions<T>;
			state$: Observable<T>;
		}} data
	 * @returns {StoreParams<T>}
	 */
	private _makeParamsObservables = (data: {
		state: T;
		options: StoreOptions<T>;
		state$: Observable<T>;
	}): StoreParams<T> => {
		const { state, options, state$ } = data;

		//* Creamos un observable para cada propiedad del objeto
		let params = {} as StoreParams<T>;

		for (let keyString of Object.keys(state)) {
			const key = keyString as keyof T;
			params = {
				...params,
				[`${keyString}$`]: state$.pipe(
					takeUntil(this._destroyState$),
					map((obj) => obj[key]),
					//*  Solo permitimos comparaciones profundas en los parametros que se especifiquen o si se especifica que se permitan en todos
					distinctUntilChanged((x, y) => {
						if (this._isForceResendParam(key)) return false;
						else {
							return this._isAllowedDeepParam(key, options)
								? isEqual(x, y)
								: x === y;
						}
					})
				),
			};
		}
		return params;
	};

	/**
	 * ? Metodo que verifica si se debe reenviar el estado obligatoriamente
	 * @param {keyof T} key
	 * @returns {boolean}
	 */
	private _isForceResendParam = (key: keyof T): boolean => {
		if (!this._resendState) return false;
		if (Array.isArray(this._resendParams)) {
			return this._resendParams.includes(key);
		}
		return this._resendParams;
	};

	/**
	 * ? Metodo que verifica si se permite comparaciones profundas en un parametro
	 * @param {keyof T} key
	 * @param {StoreOptions<T>} options
	 * @returns {boolean}
	 */
	private _isAllowedDeepParam = (
		key: keyof T,
		options: StoreOptions<T>
	): boolean => {
		const {
			allowDeepChanges,
			allowDeepChangesInParams,
			denyDeepChangesInParams,
		} = options;
		if (
			!allowDeepChanges ||
			!allowDeepChangesInParams ||
			denyDeepChangesInParams?.includes(key)
		)
			return false;
		if (Array.isArray(allowDeepChangesInParams)) {
			return allowDeepChangesInParams.includes(key);
		}
		return true;
	};

	/**
	 * ? Comprueba que no se denieguen los mismos parametros que se estan permitiendo
	 * @private
	 * @param {StoreOptions<T>} options
	 * @returns {boolean}
	 */
	private _isOkAllowedOptions(options: StoreOptions<T>): boolean {
		const { allowDeepChangesInParams, denyDeepChangesInParams } = options;
		let isOk: boolean = true;
		if (!Array.isArray(allowDeepChangesInParams)) isOk = true;
		else if (
			denyDeepChangesInParams?.some((deniedParam) =>
				allowDeepChangesInParams.includes(deniedParam)
			)
		) {
			isOk = false;
		}
		if (!isOk) {
			basicLogError({
				className: 'Store',
				methodName: 'constructor',
				message:
					'Allows and deny deep changes in params are not compatible',
				reason: 'allow and deny cannot be the same',
				line: 61,
				file: 'store.model.ts',
				infoObject: {
					allowDeepChangesInParams,
					denyDeepChangesInParams,
				},
			});
		}
		return isOk;
	}
}
