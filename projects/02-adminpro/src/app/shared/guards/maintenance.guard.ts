import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class MaintenanceGuard {
	constructor(private _router: Router, private _stateSvc: StateService) {}
	public canMatch(_route: Route, segments: UrlSegment[]): boolean {
		// const { path = '' } = segments[0] || {};
		// console.log('location', window.location);
		// const {pathname: path} = window.location
		// if (this._stateSvc.isMaintenance && path !== 'maintenance') {
		// 	this._router.navigate(['/maintenance']);
		// 	return false;
		// } else if (!this._stateSvc.isMaintenance && path === 'maintenance') {
		// 	this._router.navigate(['/']);
		// 	return false;
		// }
		return true;
	}
}
