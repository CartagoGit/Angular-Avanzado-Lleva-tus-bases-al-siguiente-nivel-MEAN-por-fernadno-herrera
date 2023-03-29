import { Show } from '../common/utils.interface';
/**
 * ? Props base que reciben todos los modelos de mongo
 * @export
 * @interface BaseModelsProps
 * @typedef {BaseModelsProps}
 */
export interface BaseModelsProps {
	createdAt: Date;
	updatedAt: Date;
	id: string;
	user_creator: string;
	user_modifier: string;
}

/**
 * ? Interfaz para los parametros de los modelos con el id obligatorio
 * * Util para realizar consultas put
 * @export
 * @typedef {ModelPropsAndId}
 * @template ModelParams
 */
export type ModelPropsAndId<ModelParams extends BaseModelsProps> = Required<
	Pick<ModelParams, 'id'>
> &
	Partial<Omit<ModelParams, keyof BaseModelsProps>>;
