import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
	getOptionsParsed,
	getParamsWithOptions,
} from '../../../helpers/get-query-options.helper';
import { QueryOptions } from '../../../interfaces/http/request.interface';
import { DefaultResponse } from '../../../interfaces/http/response.interfaces';
import { CrudHttp } from '../../../models/http/crud-http.model';
import { Doctor, DoctorProps } from '../../../models/mongo-models/doctor.model';

/**
 * ? Rutas popias del modelo de Usuarios
 */
/**
 * ? Rutas popias del modelo de Usuarios
 * @type {{
	getPatients: string;
	getDoctors: string;
}}
 */
const modelEndpoints: {
	getDoctorsByName: string;
} = {
	getDoctorsByName: '/get-doctors-by-name',
};

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
	/**
	 * ? Obtiene los doctores por su nombre
	 * @public
	 * @param {string} name
	 * @param {?QueryOptions<DoctorProps>} [options]
	 * @param {boolean} [useDefaultOptions=true]
	 * @returns {Observable<DefaultResponse<Doctor[]>>}
	 */
	public getDoctorsByName(
		name: string,
		options?: QueryOptions<DoctorProps>,
		useDefaultOptions: boolean = true
	): Observable<DefaultResponse<Doctor[]>> {
		// const optionsParsed = getOptionsParsed(options as any, useDefaultOptions);
		// const params = { name, options: optionsParsed } as {
		// 	[key: string]: string;
		// } & { options?: string };
		const params = getParamsWithOptions(
			{ name } as any,
			options,
			useDefaultOptions
		);

		return this._http
			.get<DefaultResponse<Doctor[]>>(
				this.getUrlEndpoint('getDoctorsByName'),
				{ params }
			)
			.pipe(
				//* Si el valor de la pagina es mayor al total de paginas, se vuelve a realizar la peticion con la pagina 1
				switchMap((res) => {
					const page = options?.page || 1;
					const totalPages = res.pagination?.totalPages || 0;
					if (totalPages === 0 || page <= totalPages) return of(res);

					return this.getDoctorsByName(
						name,
						{ ...options, page: 1 },
						useDefaultOptions
					);
				})
			);
	}
}
