
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CoreHttp } from '../../models/http/core-http.model';
import { QueryOptions } from '../../interfaces/http/request.interface';
import { RequestEverywhere } from '../../interfaces/http/everywhere.interfaces';
import { User } from '../../models/mongo-models/user.model';
import { Doctor } from '../../models/mongo-models/doctor.model';
import { Hospital } from '../../models/mongo-models/hospital.model';

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
const modelRouteEndpoint = '/everywhere';

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
		return this._http
			.get<RequestEverywhere>(
				this.getUrlEndpoint('root').slice(0, -1) +
					modelEndpoints.getFrom(field, search),
				{ params }
			)
			.pipe(
				map((res) => {
					const { data } = res;
					const Users =
						data?.Users?.data?.map((user) => {
							return new User(user);
						}) || ([] as User[]);
					const Doctors =
						data?.Doctors?.data?.map((doctor) => {
							return new Doctor(doctor);
						}) || ([] as Doctor[]);
					const Hospitals =
						data?.Hospitals?.data?.map((hospital) => {
							return new Hospital(hospital);
						}) || ([] as Hospital[]);
					res.data.Users.data = Users;
					res.data.Doctors.data = Doctors;
					res.data.Hospitals.data = Hospitals;
					return res;
				})
			);
	}
}
