import { Injectable } from '@angular/core';
import { CoreHttp } from './models/core-http.model';

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

	public getRenewToken() {
		
	}


}
