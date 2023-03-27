import { Injectable } from '@angular/core';
import { CrudHttp } from '../../../models/http/crud-http.model';
import {
	Hospital,
	HospitalProps,
} from '../../../models/mongo-models/hospital.model';


/**
 * ? Rutas popias del modelo de Usuarios
 * @type {{
	getPatients: string;
	getDoctors: string;
}}
 */
const modelEndpoints: {
	getPatients: string;
	getDoctors: string;
} = {
	getPatients: '/get-patients/',
	getDoctors: '/get-doctors/',
};
//* Tipado de los endpoints
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/hospitals';

/**
 * ? Servicio para realizar peticiones http a las rutas del backend
 * @export
 * @class HospitalsService
 * @typedef {HospitalsService}
 * @extends {CrudHttp<Endpoints>}
 */
@Injectable({
	providedIn: 'root',
})
export class HospitalsService extends CrudHttp<
	Hospital,
	Endpoints,
	Omit<HospitalProps, 'password'>
> {
	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Métodos
}
