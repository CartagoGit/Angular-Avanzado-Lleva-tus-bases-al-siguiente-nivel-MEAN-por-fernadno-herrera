import { BaseModelsProps } from '../interfaces/base-model.interface';
import { Hospital } from './hospital.model';
import { User } from './user.model';
/**
 * ? Propiedades que recibe el Modelo de medicos a recibir desde el back
 * @export
 * @interface DoctorProps
 * @typedef {DoctorProps}
 * @extends {BaseModelsProps}
 */
export interface DoctorProps extends BaseModelsProps {
	user: User;
	hospitals: Hospital[];
	patients: User[];
	images: string[];
}

/**
 * ? Modelo de Medicos a recibir desde el back
 * @export
 * @class Doctor
 * @typedef {Doctor}
 * @implements {DoctorProps}
 */
export class Doctor implements DoctorProps {
	public id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
	public user_creator!: string;
	public user_modifier!: string;

	public images!: string[];
	public user!: User;
	public hospitals!: Hospital[];
	public patients!: User[];


	constructor(props: DoctorProps) {
		for (let [key, value] of Object.entries(props)) {
			this[key as keyof this] = value;
		}
	}
}
