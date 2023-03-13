import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StorageService } from '../services/settings/storage.service';
import { DefaultErrorResponse } from '../services/http/interfaces/response.interfaces';
import { Router } from '@angular/router';
import { paths } from '../constants/paths.constant';
import { StateService } from '../services/settings/state.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(
		private _storageSvc: StorageService,
		private _stateSvc: StateService
	) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		const token: string | undefined = this._storageSvc.local.get(
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
					this._stateSvc.logout()
				}
				return throwError(() => error);
			})
		);
	}
}
