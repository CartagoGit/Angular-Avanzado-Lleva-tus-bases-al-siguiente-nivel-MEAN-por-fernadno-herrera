import { Injectable } from '@angular/core';
import { CrudHttp } from '../../../models/http/crud-http.model';
import { Doctor, DoctorProps } from '../../../models/mongo-models/doctor.model';



/**
 * ? Rutas popias del modelo de Usuarios
 */
const modelEndpoints: {} = {};
//* Tipado de los endpoints
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/doctors';

/**
 * ? Servicio para realizar peticiones http a las rutas del backend
 * @export
 * @class DoctorsService
 * @typedef {DoctorsService}
 * @extends {CrudHttp<Endpoints>}
 */
@Injectable({
	providedIn: 'root',
})
export class DoctorsService extends CrudHttp<
	Doctor,
	Endpoints,
	Omit<DoctorProps, 'password'>
> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Métodos
}
