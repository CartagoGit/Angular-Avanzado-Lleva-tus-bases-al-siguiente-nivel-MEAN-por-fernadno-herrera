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
import {
	StoreOptions,
	StoreParams,
} from '../../interfaces/models/store.interface';

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

	private readonly _destroyState$ = new Subject<void>();

	// ANCHOR : Constructor
	constructor(state: T, options?: StoreOptions<T>) {
		const {
			allowDeepChanges = true,
			allowDeepChangesInState = true,
			allowDeepChangesInParams = true,
		} = options || {};
		this.options = {
			allowDeepChanges,
			allowDeepChangesInState,
			allowDeepChangesInParams,
		};

		this.observer = new BehaviorSubject<T>(state);
		const observable = this.observer.asObservable().pipe(
			finalize(() => {
				console.log('finalize');
				this._destroyState$.complete();
			})
		);

		const state$ = observable.pipe(
			takeUntil(this._destroyState$),
			distinctUntilChanged(
				allowDeepChanges && allowDeepChangesInState
					? isEqual
					: (x, y) => x === y
			)
		);
		this.state$ = state$;
		this.params = this._makeParamsObservables({
			state,
			options: this.options,
			state$,
		});
		this.firstState = this.observer.value;
	}

	/**
	 * ? Metodo que retorna el estado actual
	 * @returns {T}
	 */
	public getState = (): T => this.observer.value;

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
	 * ? Metodo que retorna el valor de un parametro del estado
	 * @template P
	 * @param {P} param
	 * @returns {T[P]}
	 */
	public getParam = <P extends keyof T>(param: P): T[P] =>
		this.observer.value[param];

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
	 * ? Metodo que completa los Observables del estado
	 */
	public completeState = (): void => this.observer.complete();

	/**
	 * ? Metodo para desuscribirse al observable del sujeto
	 * * Hay que tener en cuenta que esto no cierra el resto de subscripciones que dependan de este subject, solo cierra la subscripcion del subject
	 */
	public unsuscribeState = (): void => {
		this._destroyState$.next();
		this._destroyState$.complete();
		this._destroyState$.unsubscribe();
		console.log({destroyClosed: this._destroyState$.closed, destroyObserved: this._destroyState$.observed});
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

	/**
	 * ? Metodo que crea un observable para cada parametro del estado
	 * @param {{
			state: T;
			options?: StoreOptions<T>;
			observable: Observable<T>;
		}} data
	 * @returns {StoreParams<T>}
	 */
	private _makeParamsObservables = (data: {
		state: T;
		options: StoreOptions<T>;
		state$: Observable<T>;
	}): StoreParams<T> => {
		const { state, options, state$ } = data;
		const { allowDeepChanges, allowDeepChangesInParams } = options;
		//* Creamos un observable para cada propiedad del objeto
		let params = {} as StoreParams<T>;

		for (let keyString of Object.keys(state)) {
			const key = keyString as keyof T;

			//* Funcion que verifica si se permite comparaciones profundas en un parametro
			const isAllowedDeepParam = (key: keyof T) => {
				if (!allowDeepChanges || !allowDeepChangesInParams) return false;
				if (Array.isArray(allowDeepChangesInParams)) {
					return allowDeepChangesInParams.includes(key);
				}
				return true;
			};
			params = {
				...params,
				[`${keyString}$`]: state$.pipe(
					takeUntil(this._destroyState$),
					map((obj) => obj[key]),
					//*  Solo permitimos comparaciones profundas en los parametros que se especifiquen o si se especifica que se permitan en todos
					distinctUntilChanged(
						isAllowedDeepParam(key) ? isEqual : (x, y) => x === y
					)
				),
			};
		}
		return params;
	};
}

const otroEstado = new Store(
	{
		prueba: 'mundo',
		idea: {
			idea1: 'idea1',
			isAlgo: true,
		},
	},
	{
		allowDeepChangesInState: true,
		allowDeepChangesInParams: ['prueba', 'idea'],
	}
);

const { idea$, prueba$ } = otroEstado.params;
const {
	isObserved,
	firstState,
	completeState,
	getState,
	getParam,
	isClosed,
	options,
	state$,
	resetState,
	setParam,
	setState,
	unsuscribeState,
} = otroEstado;

const estado = { isObserved: isObserved(), isClosed: isClosed() };
console.log(estado);

const subState = state$.subscribe((state) => console.log('ESTADO-->', state));
const subIdea = idea$.subscribe((idea) => console.log('IDEA-->', idea));
const subPrueba = prueba$.subscribe((prueba) =>
	console.log('PRUEBA-->', prueba)
);
console.log({
	subState: subState.closed,
	subIdea: subIdea.closed,
	subPrueba: subPrueba.closed,
});

console.log({ isObserved: isObserved(), isClosed: isClosed(), options });

console.log('---------------------> NEXT');
setState({ prueba: 'tiroriori', idea: { idea1: 'idea1', isAlgo: true } });
console.log('---------------------> NEXT');
setState({
	prueba: 'tiroriori',
	idea: { idea1: 'po no se si es ideal', isAlgo: true },
});
console.log('---------------------> NEXT');
setState({
	prueba: 'tiroriori2',
	idea: { idea1: 'po no se si es ideal', isAlgo: true },
});
console.log('---------------------> NEXT');
setState({
	prueba: 'tiroriori2',
	idea: { idea1: 'po no se si es ideal', isAlgo: true },
});
console.log('---------------------> NEXT');
setState({
	prueba: 'tiroriori2',
	idea: { idea1: 'po no se si es ideal', isAlgo: true },
});
console.log('---------------------> RESET');
resetState();

console.log({ isObserved: isObserved(), isClosed: isClosed(), options });
// completeState();
console.log({ isObserved: isObserved(), isClosed: isClosed(), options });
console.log({
	subState: subState.closed,
	subIdea: subIdea.closed,
	subPrueba: subPrueba.closed,
});
unsuscribeState();
console.log({ isObserved: isObserved(), isClosed: isClosed(), options });
console.log({
	subState: subState.closed,
	subIdea: subIdea.closed,
	subPrueba: subPrueba.closed,
});
// console.log('---------------------> NEXT');
// setParam('idea', {
// 	idea1: 'po no se si es ideal',
// 	isAlgo: true,
// });
// console.log({ isObserved: isObserved(), isClosed: isClosed(), options });
// console.log({
// 	subState: subState.closed,
// 	subIdea: subIdea.closed,
// 	subPrueba: subPrueba.closed,
// });
//

// const mySubject = new Subject<number>();

// const mySubscription = mySubject
// 	.pipe(
// 		//   tap(value => console.log(`Received value: ${value}`)),
// 		tap({
// 			complete: () => console.log('Source completed prueba'),
// 			unsubscribe: () => console.log('Subscription unsubscribed prueba'),
// 		})
// 	)
// 	.subscribe();

// mySubject.next(1); // Output: Received value: 1
// mySubject.next(2); // Output: Received value: 2

// mySubscription.unsubscribe(); // Output: Subscription unsubscribed
