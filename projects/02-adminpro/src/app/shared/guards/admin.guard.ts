import { Injectable } from '@angular/core';
import { CanMatch, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class AdminGuard {
	constructor(private _stateSvc: StateService) {}

	canMatch(): boolean {
		if (this._stateSvc.user?.role !== 'ADMIN_ROLE') {
			return false;
		}
		return true;
	}
}
