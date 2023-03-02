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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(private _storageSvc: StorageService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this._storageSvc.local.get(
					'token',
					'string'
				)}`,
			},
		});

		return next.handle(request).pipe(catchError((error: DefaultErrorResponse) => {
			const {status_code}= error;
			if(status_code === 401){
				console.log(error);
			}
			return throwError(()=> error)
		}));
	}
}
