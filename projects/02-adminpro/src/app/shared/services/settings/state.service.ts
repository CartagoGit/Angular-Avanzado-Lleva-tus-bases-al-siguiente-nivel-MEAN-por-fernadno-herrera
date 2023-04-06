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
	constructor(private _storageSvc: StorageService, private _router: Router) {
		const algo = {
			isCharging: false,
			data: [],
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
		const { observer, state$, state, params, getState } = store;
		const { data$, pagination$, meta$, isCharging$ } = params;

		state$.subscribe((state) => {
			console.log('STATE-->', state);
		});
		meta$.subscribe((meta) => {
			console.log('META-->', meta);
		});

		isCharging$.subscribe((isCharging) => {
			console.log('ISCHARGING-->', isCharging);
		});
		observer.next({
			...getState(),
			meta: {
				...state.meta,
				total: 100,
			},
		});

		observer.next({
			...getState(),
			meta: {
				...state.meta,
				pages: 10,
			},
		});
		observer.next({
			...getState(),
			meta: {
				...state.meta,
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
	}

	// ANCHOR : Methods

	/**
	 * ? Metodo para crear un store de donde observar los cambios en cualquier estado que se pase como argumento
	 * @public
	 * @template T
	 * @param {T} obj
	 * @returns {{
			observer: Observer<T>;
			state$: Observable<T>;
			state: T;
			params: { [key in keyof T & string as `${key}$`]: Observable<T[key]> };
			getState: () => T;
		}}
	 */
	public createStore<T extends { [key in keyof T]: T[key] }>(
		obj: T
	): {
		observer: Observer<T>;
		state$: Observable<T>;
		state: T;
		params: { [key in keyof T & string as `${key}$`]: Observable<T[key]> };
		getState: () => T;
	} {
		const observer = new BehaviorSubject(obj);

		//* Creamos un observable para cada propiedad del objeto
		let params = {} as {
			[key in keyof T & string as `${key}$`]: Observable<T[key]>;
		};

		for (let key of Object.keys(obj)) {
			params = {
				...params,
				[`${key}$`]: observer.pipe(
					map((obj) => obj[key as keyof T]),
					distinctUntilChanged(isEqual)
				),
			};
		}

		return {
			observer,
			state$: observer.asObservable().pipe(distinctUntilChanged(isEqual)),
			get state() {
				return observer.value;
			},
			params,
			getState: () => observer.value,
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
