import { Injectable } from '@angular/core';
import { Router, Route } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class AuthorizationGuard {
	// ANCHOR : variables
	private _dashboardPath = paths.getPath('dashboard');

	// ANCHOR : constructor
	constructor(private _stateSvc: StateService, private _router: Router) {}

	// ANCHOR : methods
	canMatch(route: Route): boolean {
		console.log('auth', route);
		if (!!this._stateSvc.isAuthenticated ) {
			console.log('authorization guard');
			this._router.navigate([this._dashboardPath?.path]);
			return false;
		}
		return true;
	}
}
