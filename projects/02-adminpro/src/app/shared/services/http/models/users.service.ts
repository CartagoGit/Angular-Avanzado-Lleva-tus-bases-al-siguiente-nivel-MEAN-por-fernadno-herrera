import { Injectable } from '@angular/core';
import { CrudHttp } from './crud-http.model';
import { User, UserProps } from '../../../models/mongo-models/user.model';

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
 * @extends {CrudHttp<Endpoints>}
 */
@Injectable({
	providedIn: 'root',
})
export class UsersService extends CrudHttp<
	User,
	Endpoints,
	Omit<UserProps, 'password'>
> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Métodos
}
