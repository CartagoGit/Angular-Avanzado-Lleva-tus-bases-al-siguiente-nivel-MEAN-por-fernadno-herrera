import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/settings/state.service';
import { paths } from '../constants/paths.constant';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MaintenanceGuard {
	private _loginPath = paths.getPath('login');

	constructor(private _router: Router, private _stateSvc: StateService) {}
	public canMatch(): Observable<boolean> | boolean {
		console.log('maintenance');
		if (!this._stateSvc.isMaintenance) {
			this._router.navigate([this._loginPath?.path]);
			return false;
		}
		return true;
	}
}
