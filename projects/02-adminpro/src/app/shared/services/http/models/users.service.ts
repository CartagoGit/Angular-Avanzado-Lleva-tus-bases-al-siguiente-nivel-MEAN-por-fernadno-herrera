import { Injectable } from '@angular/core';
import { BasicHttp } from './basic-http.model';

/**
 * ? Rutas popias del modelo de Usuarios
 * @type {{ isDoctor: string; getDoctors: string; getHospitals: string; }}
 */
const modelEndpoints: {
	isDoctor: string;
	getDoctors: string;
	getHospitals: string;
} = {
	isDoctor: '/is-doctor/',
	getDoctors: '/get-doctors/',
	getHospitals: '/get-hospitals/',
};
//* Tipado de los endpoints
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/users';

/**
 * ? Servicio para realizar peticiones http a las rutas del backend
 * @export
 * @class UsersService
 * @typedef {UsersService}
 * @extends {BasicHttp<Endpoints>}
 */
@Injectable({
	providedIn: 'root',
})
export class UsersService extends BasicHttp<Endpoints> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Métodos
}
