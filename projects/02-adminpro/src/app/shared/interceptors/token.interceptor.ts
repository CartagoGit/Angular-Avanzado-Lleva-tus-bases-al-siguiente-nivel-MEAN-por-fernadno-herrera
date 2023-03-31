import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../services/settings/storage.service';
import { StateService } from '../services/settings/state.service';
import { DefaultErrorResponse } from '../interfaces/http/response.interfaces';
import { TypeToken } from '../interfaces/http/request.interface';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private _storageSvc: StorageService,
		private _stateSvc: StateService
	) {}

	public intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token: TypeToken = this._storageSvc.local.get(
			'token',
			'string'
		) as string | undefined;
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		// if (!!token) this._stateSvc.login(token as string);

		return next.handle(request).pipe(
			catchError((error: DefaultErrorResponse) => {
				const { status_code } = error;
				if (status_code === 401) {
					console.log(error);
					this._stateSvc.logout();
				}
				return throwError(() => error);
			})
		);
	}
}
