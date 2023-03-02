import { Injectable } from '@angular/core';
import { CanMatch, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from '../services/settings/state.service';

@Injectable({
	providedIn: 'root',
})
export class AuthenticatedGuard {
	constructor(private _stateSvc: StateService, private _router: Router) {}

	public canMatch(_route: Route, segments: UrlSegment[]): boolean {
		// const { path = '' } = segments[0] || {};

		// const globalRoutes = ['nonpagefound'];
		// if (globalRoutes.includes(path)) return false;

		// const authRoutes = ['login', 'register', 'terms'];
		// console.log(
		// 	path,
		// 	'-',
		// 	authRoutes.includes(path),
		// 	this._stateSvc.isAuthenticated
		// );
		// if (authRoutes.includes(path)) {
		// 	if (this._stateSvc.isAuthenticated) {
		// 		console.log('hola');
		// 		this._router.navigate(['/dashboard']);
		// 		return false;
		// 	} else {
		// 	}
		// } else {
		// 	if (!this._stateSvc.isAuthenticated) {
		// 		this._router.navigate(['/login']);
		// 		return false; // TODO
		// 	}
		// }

		return true;
	}
}
