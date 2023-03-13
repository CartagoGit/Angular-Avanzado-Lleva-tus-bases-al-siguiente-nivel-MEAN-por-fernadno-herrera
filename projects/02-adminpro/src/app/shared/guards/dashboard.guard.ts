import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class DashboardGuard {
	// ANCHOR : variables
	private _maintenancePath = paths.getPath('maintenance');
	private _loginPath = paths.getPath('login');

	// ANCHOR : constructor
	constructor(private _router: Router, private _stateSvc: StateService) {}

	// ANCHOR : methods
	canMatch(): boolean {
		if (this._stateSvc.isMaintenance) {
			this._router.navigate([this._maintenancePath?.fullPath]);
			return false;
		}
		return true;
	}
}
