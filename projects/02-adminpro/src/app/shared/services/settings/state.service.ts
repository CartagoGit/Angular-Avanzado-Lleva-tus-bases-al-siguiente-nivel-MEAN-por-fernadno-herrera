import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { StorageService } from './storage.service';
import { User, UserProps } from '../../models/mongo-models/user.model';
import {
	Observer,
	Observable,
	BehaviorSubject,
	map,
	distinctUntilChanged,
} from 'rxjs';
import { isEqual } from '../../helpers/object.helper';

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
	constructor(private _storageSvc: StorageService, private _router: Router) {}

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
			setParam: <P extends keyof T>(param: P, newValue: T[P]) => void;
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
		setParam: <P extends keyof T>(param: P, newValue: T[P]) => void;
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
				[`${keyString}$`]: observable.pipe(
					map((obj) => obj[key]),
					//*  Solo permitimos comparaciones profundas en los parametros que se especifiquen o si se especifica que se permitan en todos
					distinctUntilChanged(
						isAllowedDeepParam(key) ? isEqual : (x, y) => x === y
					)
				),
			};
		}
		const firstState = observer.value;
		const state$ = observable.pipe(
			distinctUntilChanged(
				allowDeepChanges && allowDeepChangesInState
					? isEqual
					: (x, y) => x === y
			)
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
