import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { paths } from '../constants/paths.constant';
import { AuthService } from '../services/http/auth.service';
import { StateService } from '../services/settings/state.service';

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
		private _stateSvc: StateService
	) {}

	// ANCHOR : methods
	canMatch(): boolean | Observable<boolean> {
		if (this._stateSvc.isMaintenance) {
			this._router.navigate([this._maintenancePath?.fullPath]);
			return false;
		}
		return true;
	}
}
