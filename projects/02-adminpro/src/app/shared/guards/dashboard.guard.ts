import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { paths } from '../constants/paths.constant';
import { AuthService } from '../services/http/auth.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _loginPath = paths.getPath('login');

	// ANCHOR : constructor
	constructor(private _router: Router, private _authSvc: AuthService) {}

	// ANCHOR : methods
	canMatch(): Observable<boolean> {
		return this._authSvc.renewToken().pipe(
			map(() => true),
			catchError(() => {
				this._router.navigate([this._loginPath?.fullPath]);
				return of(false);
			})
		);
	}
}
