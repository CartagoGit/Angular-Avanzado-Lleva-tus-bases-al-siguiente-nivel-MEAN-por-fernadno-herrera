import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { paths } from '../constants/paths.constant';
import { AuthService } from '../services/http/auth.service';
import { StateService } from '../services/settings/state.service';
import { StorageService } from '../services/settings/storage.service';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationGuard {
	// ANCHOR : variables
	private _dashboardPath = paths.getPath('dashboard');
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
		console.log('auth');
		if (this._stateSvc.isMaintenance) {
			this._router.navigate([this._maintenancePath?.fullPath]);
			return false;
		}

		const token = this._storageSvc.local.get('token') as string | undefined;
		if (!!token) this._stateSvc.login(token);
		return !token;
	}
}
