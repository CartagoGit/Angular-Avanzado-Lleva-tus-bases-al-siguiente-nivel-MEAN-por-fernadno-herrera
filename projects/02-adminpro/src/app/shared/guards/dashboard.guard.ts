import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';
import { AuthService } from '../services/http/auth.service';
import { map, Observable, take, timer } from 'rxjs';
import { StorageService } from '../services/settings/storage.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _maintenancePath = paths.getPath('maintenance');
	private _isPassedTime = true;
	private _isLogued = false;

	// ANCHOR : constructor
	constructor(
		private _router: Router,
		private _stateSvc: StateService,
		private _authSvc: AuthService,
		private _storageSvc: StorageService
	) {}

	// ANCHOR : methods
	public canMatch(): boolean | Observable<boolean> {
		// return true
		if (this._stateSvc.isMaintenance) {
			this._router.navigate([this._maintenancePath?.fullPath]);
			return false;
		}
		const token = this._storageSvc.local.get('token') as string | undefined;
		if (!token) this._stateSvc.logout();

		if (!this._isPassedTime) return this._isLogued;

		return this._authSvc.renewToken(token).pipe(
			take(1),
			map((resp) => {
				this._isPassedTime = false;
				timer(100).subscribe(() => {
					this._isLogued = false;
					this._isPassedTime = true
				});
				if (!resp || !resp.ok) {
					this._stateSvc.logout();
					this._isLogued = false;
					return false;
				}
				this._isLogued = true;
				return true;
			})
		);
	}
}
