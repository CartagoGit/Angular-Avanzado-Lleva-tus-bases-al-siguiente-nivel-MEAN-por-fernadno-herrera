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
	public images!: string[];
	public name!: string;

	constructor(props: HospitalProps) {
		super(props);
	}
}
