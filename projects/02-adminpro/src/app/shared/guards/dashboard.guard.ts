import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { paths } from '../constants/paths.constant';
import { AuthService } from '../services/http/auth.service';
import { StateService } from '../services/settings/state.service';
import { StorageService } from '../services/settings/storage.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _loginPath = paths.getPath('login');

	// ANCHOR : constructor
	constructor(
		private _stateSvc: StateService,
		private _router: Router,
		private _storage: StorageService,
		private _authSvc: AuthService
	) {}

	// ANCHOR : methods
	canMatch(): boolean | Observable<boolean> {
		return this._authSvc.renewToken().pipe(
			map(() => true),
			catchError(() => {
				 console.log("❗canMatch  ➽ _loginPath ➽ ⏩" , this._loginPath?.fullPath);
				this._router.navigate([this._loginPath?.fullPath]);
				return of(false);
			})
		);
		// const token = this._storage.local.get('token');
		// console.log("❗dash  ➽ token ➽ ⏩" , token);
		// console.log("❗canMatch  ➽ _loginPath ➽ ⏩" , this._loginPath?.fullPath);
		// if (!token) {
		// 	this._router.navigate([this._loginPath?.fullPath]);
		// 	return false;
		// }
		// return true;
	}
}
