import { QueryOptions } from 'mongoose';
import { Hospital } from '../../models/mongo-models/hospital.model';
import { Doctor } from '../../models/mongo-models/doctor.model';
import { User } from '../../models/mongo-models/user.model';
import { DefaultResponse } from './response.interfaces';

/**
 * ? Interfaces para las respuestas de las busquedas en todos los modelos
 * @export
 * @interface RequestEverywhere
 * @typedef {RequestEverywhere}
 */
export interface RequestEverywhere {
	status_code: number;
	data: CollectionModels;
	searching: string;
	ok: boolean;
	message: string;
	method: string;
	query: QueryOptions<any>;
	db_state: string;
}

/**
 * ? Interfaces para las respuestas de la data de las busquedas en todos los modelos
 * @export
 * @interface CollectionModels
 * @typedef {CollectionModels}
 */
export interface CollectionModels {
	Users: DefaultResponse<User>;
	Hospitals: DefaultResponse<Hospital>;
	Doctors: DefaultResponse<Doctor>;
}
