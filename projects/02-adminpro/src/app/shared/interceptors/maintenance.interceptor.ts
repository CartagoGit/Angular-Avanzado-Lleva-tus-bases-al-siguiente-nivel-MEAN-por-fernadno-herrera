import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpInterceptor,
	HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError, tap } from 'rxjs';
import {
	DefaultErrorResponse,
	DefaultResponse,
} from '../services/http/interfaces/response.interfaces';

import { Router } from '@angular/router';
import { StateService } from '../services/settings/state.service';
import { paths } from '../constants/paths.constant';

@Injectable()
export class MaintenanceInterceptor implements HttpInterceptor {
	private _maintenancePath = paths.getPath('maintenance');

	constructor(private _router: Router, private _stateSvc: StateService) {}

	/**
	 * ? Interceptor que coloca la pagina en estado de mantenimiento
	 * @public
	 * @param {HttpRequest<unknown>} request
	 * @param {HttpHandler} next
	 * @returns {Observable<HttpEvent<unknown>>}
	 */
	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			tap((resp) => {
				const { body, type } = resp as any;
				const { status_code } = (body as DefaultResponse) || {};
				if (status_code !== 503 && (type === null || type === undefined))
					this._finishMaintenance();

				// throw { status_code: 503 };
			}),
			catchError((error: DefaultErrorResponse) => {
				const { status_code } = error;
				if (status_code === 503) this._startMaintenance();
				else this._finishMaintenance();

				return throwError(() => error);
			})
		);
	}

	/**
	 * ? Comienza el mantenimiento al recibir un status 503 desde el servidor
	 * @private
	 */
	private _startMaintenance() {
		this._stateSvc.isMaintenance = true;
		this._stateSvc.isFinishedMaintenance = false;
		this._router.navigate([this._maintenancePath?.path]);
	}

	/**
	 * ? Termina el estado de mantenimiento cuando se deja de recibir un 503 desde el servidor
	 * @private
	 */
	private _finishMaintenance() {
		this._stateSvc.isMaintenance = false;
		if (!this._stateSvc.isFinishedMaintenance) {
			this._stateSvc.isFinishedMaintenance = true;
			// this._router.navigate(['/']);
		}
	}
}
