import { Injectable } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { StateService } from '../services/settings/state.service';
import { AuthService } from '../services/http/auth.service';
import { paths } from '../constants/paths.constant';
import { Observable, concatMap, of, catchError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MaintenanceGuard {
	private _maintenancePath = paths.getPath('maintenance');

	constructor(
		private _router: Router,
		private _stateSvc: StateService,
		private _authSvc: AuthService
	) {}
	public canMatch(route: Route): Observable<boolean> {
		return this._authSvc.renewToken().pipe(
			concatMap((resp) => {
				// this._stateSvc.login(resp?.token!);
				return this._checkMaintenanceRoute(route);
			}),
			catchError(() => {
				console.log('Catch in maintenance guard');
				this._stateSvc.logout();
				return this._checkMaintenanceRoute(route);
			})
		);
	}

	/**
	 * ? En caso de error en la respuesta o en caso de respuesta correcta devuelve si esta en mantenimiento y lleva a la ruta de mantenimiento o no
	 * @private
	 * @param {Route} route
	 * @returns {Observable<boolean>}
	 */
	private _checkMaintenanceRoute(route: Route): Observable<boolean> {
		let result: boolean;
		if (this._stateSvc.isMaintenance) {
			if (route.path !== this._maintenancePath?.name) {
				this._router.navigate([this._maintenancePath?.path]);
				result = false;
			}
			result = true;
		} else {
			if (route.path === this._maintenancePath?.name) {
				this._router.navigate([this._maintenancePath?.path]);
				result = false;
			}
			result = true;
		}
		return of(result);
	}
}
