import { BaseModelsProps } from "../../models/mongo-models/adds/base-models.model";


//* Interfaz para los parametros expecificos del modelo sin las propiedades base
export type ModelSpecificProps<Model extends BaseModelsProps> = Partial<
	Omit<Model, keyof BaseModelsProps>
>;

//* Interfaz para los parametros de los modelos con el id obligatorio
export type ModelPropsAndId<Model extends BaseModelsProps> = ModelId &
	ModelSpecificProps<Model>;

//* Interfaz para los parametros de los modelos con el id obligatorio
export type ModelId = Required<Pick<BaseModelsProps, 'id'>>;

//* Tipo de los id de los modelos
export type TypeId<Model extends BaseModelsProps = BaseModelsProps> =
	Model['id'];


