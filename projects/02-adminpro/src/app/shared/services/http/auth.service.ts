import { Injectable } from '@angular/core';
import { CoreHttp } from './models/core-http.model';
import { Observable } from 'rxjs';
import { DefaultResponse } from './interfaces/response.interfaces';

/**
 * ? Endpoints del modelo
 * @type {{ renewToken: string; login: string; googleLogin: string; googleClientId: string; }}
 */
const modelEndpoints: {
	renewToken: string;
	login: string;
	register: string;
	googleLogin: string;
	googleClientId: string;
} = {
	renewToken: '/renew-token',
	login: '/login',
	register: '/register',
	googleLogin: '/google-login',
	googleClientId: '/google-client-id',
};
//* Tipado de los endpoints del modelo
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/auth';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends CoreHttp<Endpoints> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Métodos

	/**
* ? Observable para realizar el login en la BD
	 * @public
	 * @param {{
			password: string;
			email: string;
		}} body
	 * @returns {Observable<DefaultResponse>}
	 */
	public getLogin(body: {
		password: string;
		email: string;
	}): Observable<DefaultResponse> {
		return this._http.post<DefaultResponse>(this.routes.login, body);
	}

	public getRenewToken() {}
}
