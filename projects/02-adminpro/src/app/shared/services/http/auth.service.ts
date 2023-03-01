import { Injectable } from '@angular/core';
import { CoreHttp } from './models/core-http.model';
import { Observable, of } from 'rxjs';
import {
	DefaultResponse,
	ResponseUserModel,
} from './interfaces/response.interfaces';
import { AuthDefaultResponse } from './interfaces/request.interface';
import { HttpHeaders } from '@angular/common/http';

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
	 * @param {AuthDefaultResponse} body
	 * @returns {Observable<DefaultResponse | undefined>}
	 */
	public login(
		body: AuthDefaultResponse
	): Observable<DefaultResponse | undefined> {
		if (!this._isPossibleAndTimer()) return of(undefined);
		return this._http.post<DefaultResponse>(this.routes.login, body);
	}

	/**
	 * ? Observable para registrar un nuevo usuario
	 * @public
	 * @param {AuthDefaultResponse} body
	 * @returns {Observable<DefaultResponse | undefined>}
	 */
	public register(
		body: AuthDefaultResponse
	): Observable<DefaultResponse | undefined> {
		if (!this._isPossibleAndTimer()) return of(undefined);
		return this._http.post<DefaultResponse>(this.routes.register, body);
	}

	/**
	 * ? Observable para renuevar el token jwt
	 * @public
	 * @returns {Observable<DefaultResponse | undefined>}
	 */
	public renewToken(token?: string): Observable<DefaultResponse | undefined> {
		if (!this._isPossibleAndTimer()) return of(undefined);
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		});
		return this._http.get<DefaultResponse>(this.routes.renewToken, {
			headers,
		});
	}

	/**
	 * ? Observable para loguearse en google
	 * @public
	 * @param {string} token
	 * @returns {(Observable<DefaultResponse<ResponseUserModel> | undefined>)}
	 */
	public googleLogin(
		token: string
	): Observable<DefaultResponse<ResponseUserModel> | undefined> {
		if (!this._isPossibleAndTimer()) return of(undefined);
		return this._http.post<DefaultResponse<ResponseUserModel>>(
			this.routes.googleLogin,
			{
				token,
			}
		);
	}

	/**
	 * ? Observable que devuelve el codigo id de cliente para Google
	 * @public
	 * @returns {Observable<DefaultResponse | undefined>}
	 */
	public googleClientId(): Observable<DefaultResponse<string> | undefined> {
		if (!this._isPossibleAndTimer()) return of(undefined);
		return this._http.get<DefaultResponse<string>>(
			this.routes.googleClientId
		);
	}
}
