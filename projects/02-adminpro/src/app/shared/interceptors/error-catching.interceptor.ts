import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { DefaultErrorResponse } from '../services/http/interfaces/response.interfaces';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {
	private _retryDelay = 300;
	private _retryMaxAttempts = 2;
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			retry({ count: 2, delay: this._retryDelay }),
			catchError((error: HttpErrorResponse) => {
				return throwError(() => error.error as DefaultErrorResponse);
			})
		);
	}
}
