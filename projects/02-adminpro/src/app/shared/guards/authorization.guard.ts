import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';
import { Observable, of, tap, catchError, map, throwError } from 'rxjs';
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

	// ANCHOR : constructor
	constructor(
		private _stateSvc: StateService,
		private _router: Router,
		private _storage: StorageService,
		private _authSvc: AuthService
	) {}

	// ANCHOR : methods
	canMatch(route: Route): boolean | Observable<boolean> {
		// const token = this._storage.local.get('token');
		return this._authSvc.renewToken().pipe(
			map((resp) => {
				if (!resp) throw 'No hay token';
				this._router.navigate([this._dashboardPath?.fullPath]);
				return false;
			}),
			catchError(() => of(true))
		);

		// if (!!token) {
		// 	console.log('authorization guard');
		// 	this._router.navigate([this._dashboardPath?.fullPath]);
		// 	return false;
		// }
		// return true;
	}
}
