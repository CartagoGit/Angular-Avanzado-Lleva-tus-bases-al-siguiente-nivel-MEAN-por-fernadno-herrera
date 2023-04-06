import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { StorageService } from './storage.service';
import { User, UserProps } from '../../models/mongo-models/user.model';
import {
	Observer,
	Observable,
	BehaviorSubject,
	of,
	map,
	distinctUntilChanged,
	first,
	firstValueFrom,
} from 'rxjs';
import { isEqual } from '../../helpers/object.helper';
import { switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	// ANCHOR : Variables
	public isMaintenance: boolean = false;
	public isFinishedMaintenance: boolean = true;
	public user: User | undefined;

	private _isAuthenticated: boolean = false;
	private _loginPath = paths.getPath('login');
	private _dashboardPath = paths.getPath('dashboard');

	get isAuthenticated(): boolean {
		return this._isAuthenticated;
	}

	set isAuthenticated(value: boolean) {
		this._isAuthenticated = value;
	}

	// ANCHOR : Constructor
	constructor(private _storageSvc: StorageService, private _router: Router) {
		const algo = {
			isCharging: false,
			data: [] as boolean[],
			meta: {
				total: 0,
				pages: 0,
				page: 0,
			},
			pagination: {
				page: 0,
				limit: 0,
			},
		};

		const store = this.createStore(algo);
		const {
			observer,
			state$,
			firstState,
			params,
			getState,
			setState,
			setParam,
			getParam,
			finishState,
		} = store;
		const { data$, pagination$, meta$, isCharging$ } = params;

		state$.subscribe((state) => {
			console.log('STATE-->', state);
		});
		meta$.subscribe((meta) => {
			console.log('META-->', meta);
		});

		isCharging$.subscribe({
			next: (isCharging) => {
				console.log('ISCHARGING-->', isCharging);
			},
			complete: () => console.log('se completo'),
		});
		observer.next({
			...getState(),
			meta: {
				...getState().meta,
				total: 100,
			},
		});

		observer.next({
			...getState(),
			meta: {
				...getState().meta,
				pages: 10,
			},
		});
		observer.next({
			...getState(),
			meta: {
				...getState().meta,
				pages: 10,
			},
		});
		observer.next({
			...getState(),
			isCharging: true,
		});
		observer.next({
			...getState(),
			isCharging: true,
		});
		observer.next({
			...getState(),
			isCharging: true,
		});
		observer.next({
			...getState(),
			isCharging: true,
		});
		observer.next({
			...getState(),
			isCharging: true,
		});
		// setState({
		// 	...getState(),
		// 	pagination: {
		// 		...getState().pagination,
		// 		page: 2,
		// 	},
		// });
		setParam('pagination', {
			...getParam('pagination'),
			page: 2,
			limit: 10,
		});
		console.log('BEFORE RESET PAGINATION', { ...getState() });
		store.resetParam('pagination');
		console.log('AFTER RESET PAGINATION', { ...getState() });
		finishState();
		observer.next({
			...getState(),
			isCharging: true,
		});
		console.log(getState());
	}

	// ANCHOR : Methods

	/**
	 * ? Metodo para crear un store de donde observar los cambios en cualquier estado que se pase como argumento
	 * @public
	 * @template T
	 * @param {T} state
	 * @param {?{
				allowDeepChanges?: boolean;
				allowDeepChangesInParams?: (keyof T)[] | boolean;
				allowDeepChangesInState?: boolean;
			}} [options]
	 * @returns {{
			observer: Observer<T>;
			state$: Observable<T>;
			firstState: T;
			params: { [key in keyof T & string as `${key}$`]: Observable<T[key]> };
			getState: () => T;
			setState: (newState: T) => void;
			resetState: () => void;
			getParam: <P extends keyof T>(param: P) => T[P];
			setParam: <P extends keyof T>(param: P, value: T[P]) => void;
			resetParam: (param: keyof T) => void;
			completeState: () => void;
		}}
	 */
	public createStore<T extends { [key in keyof T]: T[key] }>(
		state: T,
		options?: {
			allowDeepChanges?: boolean;
			allowDeepChangesInParams?: (keyof T)[] | boolean;
			allowDeepChangesInState?: boolean;
		}
	): {
		/** Observer del estado */
		observer: Observer<T>;
		/** Observable que emite el estado actual */
		state$: Observable<T>;
		/** Estado inicial */
		firstState: T;
		/** Objeto que contiene los observables de cada parametro del estado */
		params: { [key in keyof T & string as `${key}$`]: Observable<T[key]> };
		/** Metodo que retorna el estado actual */
		getState: () => T;
		/** Metodo que establece un nuevo estado */
		setState: (newState: T) => void;
		/** Metodo que resetea el estado a su estado inicial */
		resetState: () => void;
		/** Metodo que retorna el valor de un parametro del estado */
		getParam: <P extends keyof T>(param: P) => T[P];
		/** Metodo que establece un nuevo valor a un parametro del estado */
		setParam: <P extends keyof T>(param: P, value: T[P]) => void;
		/** Metodo que resetea el valor de un parametro del estado a su estado inicial */
		resetParam: (param: keyof T) => void;
		/** Metodo que completa los Observables del estado */
		completeState: () => void;
	} {
		const {
			allowDeepChanges = true,
			allowDeepChangesInParams = true,
			allowDeepChangesInState = true,
		} = options || {};
		const observer = new BehaviorSubject(state);
		const observable = observer.asObservable();

		//* Creamos un observable para cada propiedad del objeto
		let params = {} as {
			[key in keyof T & string as `${key}$`]: Observable<T[key]>;
		};

		const allowedObservable = <V>(value: V): Observable<V> =>
			of(value).pipe(distinctUntilChanged(isEqual));
		const notAllowedObservable = <V>(value: V): Observable<V> =>
			of(value).pipe(distinctUntilChanged());

		for (let key of Object.keys(state)) {
			params = {
				...params,
				[`${key}$`]: observer.pipe(
					map((obj) => obj[key as keyof T]),
					switchMap((value) => {
						//* Solo permitimos comparaciones profundas en los parametros que se especifiquen o si se especifica que se permitan en todos
						if (allowDeepChanges && !!allowDeepChangesInParams) {
							if (Array.isArray(allowDeepChangesInParams)) {
								if (allowDeepChangesInParams.includes(key as keyof T))
									return allowedObservable(value);
								else return notAllowedObservable(value);
							} else if (!!allowDeepChangesInParams)
								return allowedObservable(value);
							else return notAllowedObservable(value);
						} else return notAllowedObservable(value);
					})
				),
			};
		}

		const firstState = observer.value;

		const state$ = observable.pipe(
			switchMap((state) => {
				//* Solo permitimos comparaciones profundas en el estado si se especifica que se permitan
				if (allowDeepChanges && allowDeepChangesInState)
					return allowedObservable(state);
				else return notAllowedObservable(state);
			})
		);

		return {
			observer,
			state$,
			firstState,
			params,
			getState: () => observer.value,
			setState: (newState: T) => observer.next(newState),
			resetState: () => observer.next(firstState),
			getParam: <P extends keyof T>(param: P) => observer.value[param],
			setParam: <P extends keyof T>(param: P, value: T[P]) => {
				observer.next({
					...observer.value,
					[param]: value,
				});
			},
			resetParam: (param: keyof T) => {
				observer.next({
					...observer.value,
					[param]: firstState[param],
				});
			},
			completeState: () => observer.complete(),
		};
	}

	/**
	 * ? Elimina el token del storage y cambia el estado de autenticacion a deslogueado
	 * @public
	 * @param {boolean} [redirect=true]
	 */
	public logout(redirect: boolean = true): void {
		this._storageSvc.local.delete('token');
		this.isAuthenticated = false;
		this.user = undefined;
		if (!!redirect) this._router.navigate([this._loginPath?.fullPath]);
		// google?.accounts?.id?.revoke('email@email.com', () => {});
	}

	/**
	 * ? Establece el token en el storage y cambia el estado de autenticacion a logueado
	 * @public
	 * @param {{
			token: string;
			userProps: UserProps;
			redirect?: boolean;
			forceRenewUser?: boolean;
		}} data
	 */
	public login(data: {
		token: string;
		userProps: UserProps;
		redirect?: boolean;
		forceRenewUser?: boolean;
	}): void {
		const {
			token,
			redirect = true,
			userProps,
			forceRenewUser = false,
		} = data;
		this._storageSvc.local.set('token', token);
		this.isAuthenticated = true;
		if (!this.user || forceRenewUser) this.user = new User(userProps);
		if (!!redirect) {
			this._router.navigate([this._dashboardPath?.fullPath]);
		}
	}
}
