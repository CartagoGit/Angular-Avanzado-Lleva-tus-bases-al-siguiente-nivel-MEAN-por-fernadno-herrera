import { Injectable } from '@angular/core';
import { Route, Router, UrlTree } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _loginPath = paths.getPath('login');

	// ANCHOR : constructor
	constructor(private _stateSvc: StateService, private _router: Router) {}

	// ANCHOR : methods
	canMatch(route: Route): boolean {
		console.log('dash', route);
		if (!this._stateSvc.isAuthenticated) {
			console.log('dashboard guard',!this._stateSvc.isAuthenticated, 'asdasdasdasdasdasdasd' );
			this._router.navigate([this._loginPath?.fullPath]);
			return false;
		}
		return true;
	}
}
