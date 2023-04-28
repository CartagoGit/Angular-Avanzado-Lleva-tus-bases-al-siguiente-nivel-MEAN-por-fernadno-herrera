import { Model, model, Schema } from 'mongoose';
import { BaseModel, IBase } from './base.model';

export interface IHospital extends IBase {
	name: string;
	images: string[];
	address: string;
	phone: string;
}
/**
 * ? Crea el esquema del modelo de Hospitales en MongoDb
 * @type {Schema<{
	name: string;
	images: string[];
	address: string;
	phone: string;
} & IBase>}
 */
export const HospitalSchema: Schema<IHospital> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
			},
		],
		address: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: false,
		},
	}
	// { timestamps: true }
	//* Si quisieramos cambiar "hospitals" por "hospitales" al crearse el modelo en mongoDb
	// , { collection :'hospitales'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
// export const HospitalModel: Model<any> = model('Hospital', HospitalSchema);
export const HospitalModel: Model<any> = model(
	'Hospital',
	new Schema(Object.assign({}, BaseModel.schema.obj, HospitalSchema.obj), {
		timestamps: true,
	})
);
