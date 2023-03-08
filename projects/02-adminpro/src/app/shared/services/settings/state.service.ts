import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../../constants/paths.constant';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root',
})
export class StateService {
	public isMaintenance: boolean = false;
	public isFinishedMaintenance: boolean = true;
	private _isAuthenticated: boolean = false;

	get isAuthenticated(): boolean {
		console.log('se pilla el auth', this._isAuthenticated);
		return this._isAuthenticated;
	}

	set isAuthenticated(value: boolean) {
		console.log('se setea el auth', value);
		this._isAuthenticated = value;
	}

	private _loginPath = paths.getPath('login');
	private _dashboardPath = paths.getPath('dashboard');

	constructor(private _storageSvc: StorageService, private _router: Router) {}

	public logout(): void {
		this._storageSvc.local.delete('token');
		this.isAuthenticated = false;
		this._router.navigate([this._loginPath?.fullPath]);
	}

	public login(token : string) : void {
		this._storageSvc.local.set('token', token);
		this.isAuthenticated = true;
		this._router.navigate([this._dashboardPath?.fullPath])
	}
}
