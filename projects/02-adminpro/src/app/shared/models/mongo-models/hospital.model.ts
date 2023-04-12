import { BaseModels, BaseModelsProps } from './adds/base-models.model';

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
	address: string;
}

/**
 * ? Modelo de Hospitales a recibir desde el back
 * @export
 * @class Hospital
 * @typedef {Hospital}
 * @implements {HospitalProps}
 */
export class Hospital
	extends BaseModels<HospitalProps>
	implements HospitalProps
{
	// ANCHOR : Variables
	public images!: string[];
	public name!: string;
	public address!: string;


	// ANCHOR : Constructor
	constructor(props: HospitalProps) {
		super({...props, classModel: 'Hospital'});
	}
}
