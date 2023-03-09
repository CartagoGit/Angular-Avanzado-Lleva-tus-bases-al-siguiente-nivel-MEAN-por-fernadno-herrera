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
		const token = localStorage.getItem('token');
		if (!!token) {
			console.log('authorization guard');
			this._router.navigate([this._dashboardPath?.fullPath]);
			return false;
		}
		return true;
	}
}
