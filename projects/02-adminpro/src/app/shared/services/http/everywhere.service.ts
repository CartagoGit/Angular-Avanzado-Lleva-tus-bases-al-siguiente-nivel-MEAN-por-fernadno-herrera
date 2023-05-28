import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreHttp } from '../../models/http/core-http.model';
import { QueryOptions } from '../../interfaces/http/request.interface';

/**
 * ? Endpoints del modelo
 * @type {{ renewToken: string; login: string; googleLogin: string; googleClientId: string; }}
 */
const modelEndpoints: {
	getFrom: (fields: string, search: string) => string;
} = {
	getFrom: (field: string, search: string) => `/get-from/${field}/${search}`, // -> /get-from/name/a?limit=3&include=true
};
//* Tipado de los endpoints del modelo
type Endpoints = typeof modelEndpoints;

//* Ruta del modelo
const modelRouteEndpoint = '/files';

@Injectable({
	providedIn: 'root',
})
export class EverywhereService extends CoreHttp<Endpoints> {
	// ANCHOR : Variables

	// ANCHOR : Constructor
	constructor() {
		super({ modelEndpoints, modelRouteEndpoint });
	}

	// ANCHOR : Methods

	/**
	 * ? Recupera los datos de las colecciones que sean iguales al campo que se solicite
	 * @public
	 * @returns {Observable<any>}
	 */
	public getFrom(
		data: { field: string; search: string },
		options: QueryOptions<any>
	): Observable<any> {
		const params = {
			options: JSON.stringify(options),
		};
		const { field, search } = data;
		return this._http.get(modelEndpoints.getFrom(field, search), { params });
	}
}
