import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from '../../../interfaces/http/response.interfaces';
import { CrudHttp } from '../../../models/http/crud-http.model';
import { DoctorProps } from '../../../models/mongo-models/doctor.model';
import { TypeId } from '../../../interfaces/models/base-model-utils.interface';
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

	/**
	 * ? Obtiene los doctores de un hospital
	 * @public
	 * @param {string} id
	 * @returns {*}
	 */
	public getDoctors(id: TypeId): Observable<DefaultResponse<DoctorProps[]>> {
		return this._http.get<DefaultResponse<DoctorProps[]>>(
			this.getUrlEndpoint('getDoctors', id)
		);
	}


	/**
	 * ? Obtiene los pacientes de un hospital
	 * @public
	 * @param {TypeId} id
	 * @returns {Observable<DefaultResponse<DoctorProps[]>>}
	 */
	public getPatients(id: TypeId): Observable<DefaultResponse<DoctorProps[]>> {
		return this._http.get<DefaultResponse<DoctorProps[]>>(
			this.getUrlEndpoint('getPatients', id)
		);
	}
}
