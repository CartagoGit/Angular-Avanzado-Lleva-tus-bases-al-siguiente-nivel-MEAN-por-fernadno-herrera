import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';
import { AuthService } from '../services/http/auth.service';
import { map, Observable } from 'rxjs';
import { StorageService } from '../services/settings/storage.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _maintenancePath = paths.getPath('maintenance');

	// ANCHOR : constructor
	constructor(
		private _router: Router,
		private _stateSvc: StateService,
		private _authSvc: AuthService,
		private _storageSvc: StorageService
	) {}

	// ANCHOR : methods
	canMatch(): boolean | Observable<boolean> {
		// return true
		if (this._stateSvc.isMaintenance) {
			this._router.navigate([this._maintenancePath?.fullPath]);
			return false;
		}
		const token = this._storageSvc.local.get('token') as string | undefined;
		if (!token) this._stateSvc.logout();

		return this._authSvc.renewToken(token).pipe(
			map((resp) => {
				if (!resp || !resp.ok) {
					this._stateSvc.logout();
					return false;
				}
				return true;
			})
		);
	}
}
