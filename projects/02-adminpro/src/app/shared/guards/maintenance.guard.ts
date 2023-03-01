import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class MaintenanceGuard {
	constructor(private _router: Router, private _stateSvc: StateService) {}
	public canMatch(): boolean {
		if (this._stateSvc.isMaintenance) {
			this._router.navigate(['/maintenance']);
			return false;
		}
		return true;
	}
}
