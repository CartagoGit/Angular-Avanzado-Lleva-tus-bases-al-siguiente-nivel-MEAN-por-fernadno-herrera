import { BaseModelsProps } from "../../interfaces/models/base-model.interface";


/**
 * ? Propiedades que recibe el Modelo de Hospitales a recibir desde el back
 * @export
 * @interface HospitalProps
 * @typedef {HospitalProps}
 * @extends {BaseModelsProps}
 */
export interface HospitalProps extends BaseModelsProps {

	images: string[];
	name: string;
}

/**
 * ? Modelo de Hospitales a recibir desde el back
 * @export
 * @class Hospital
 * @typedef {Hospital}
 * @implements {HospitalProps}
 */
export class Hospital implements HospitalProps {
	public id!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
	public user_creator!: string;
	public user_modifier!: string;

	public images!: string[];
	public name!: string;



	constructor(props: HospitalProps) {
		for (let [key, value] of Object.entries(props)) {
			this[key as keyof this] = value;
		}
	}
}
