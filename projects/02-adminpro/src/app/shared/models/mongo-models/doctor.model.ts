import { BaseModels, BaseModelsProps } from './adds/base-models.model';
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
export class Doctor extends BaseModels<DoctorProps> implements DoctorProps {
	// ANCHOR : Variables
	public images!: string[];
	public user!: User;
	public hospitals!: Hospital[];
	public patients!: User[];

	// ANCHOR : Constructor
	constructor(props: DoctorProps) {
		super({ ...props, classModel: 'Doctor' });
	}
}
