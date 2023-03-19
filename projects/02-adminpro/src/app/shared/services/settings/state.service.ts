import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { StorageService } from './storage.service';
import { User, UserProps } from '../../models/mongo-models/user.model';

@Injectable({
	providedIn: 'root',
})
export class StateService {
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

	constructor(private _storageSvc: StorageService, private _router: Router) {}

	/**
	 * ? Elimina el token del storage y cambia el estado de autenticacion a deslogueado
	 * @public
	 * @param {boolean} [redirect=true]
	 */
	public logout(redirect: boolean = true): void {
		// console.log(google.accounts.oauth2.revoke());
		// const token = this._storageSvc.local.get('token') as string;
		this._storageSvc.local.delete('token');
		this.isAuthenticated = false;
		this.user = undefined;
		if (!!redirect) this._router.navigate([this._loginPath?.fullPath]);
		// google?.accounts?.id?.revoke('email@email.com', () => {});
	}

	/**
	 * ? Establece el token en el storage y cambia el estado de autenticacion a logueado
	 * @public
	 * @param {string} token
	 * @param {boolean} [redirect=true]
	 */
	public login(data : {token: string, userProps : UserProps , redirect?: boolean } ): void {
		const { token, redirect, userProps } = data;
		this._storageSvc.local.set('token', token);
		this.isAuthenticated = true;
		this.user = new User(userProps)
		if (!!redirect) {
			this._router.navigate([this._dashboardPath?.fullPath]);
		}
	}
}
