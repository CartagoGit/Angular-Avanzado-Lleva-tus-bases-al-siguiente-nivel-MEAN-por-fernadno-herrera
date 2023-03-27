import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { DefaultErrorResponse } from '../interfaces/http/response.interfaces';


@Injectable()
export class ChangeTypeResponseInterceptor implements HttpInterceptor {
	private _retryDelay = 100;
	private _retryMaxAttempts = 1;
	constructor() {}

	/**
	 * ? Interceptor que cambia la response en caso de error en las respuestas Http, y reintenta la peticion en caso de error
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
			// retry({ count: this._retryMaxAttempts, delay: this._retryDelay }),
			catchError((httpErrorResponse: HttpErrorResponse) => {
				return throwError(
					() => httpErrorResponse.error as DefaultErrorResponse
				);
			})
		);
	}
}
