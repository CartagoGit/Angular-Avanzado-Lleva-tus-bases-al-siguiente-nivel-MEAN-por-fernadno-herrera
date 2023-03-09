import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
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
	canMatch(): boolean {
		const token = localStorage.getItem('token');
		if (!token) {
			this._router.navigate([this._loginPath?.path]);
			return false;
		}
		return true;
	}
}
