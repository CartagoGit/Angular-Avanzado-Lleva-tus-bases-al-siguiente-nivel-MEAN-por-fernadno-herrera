import { Model, model, Schema } from 'mongoose';

/**
 * ? Crea el esquema del modelo de Hospitales en MongoDb
 * @type {Schema<any>}
 */
export const HospitalSchema: Schema<any> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
		},
		user_creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true }
	//* Si quisieramos cambiar "hospitals" por "hospitales" al crearse el modelo en mongoDb
	// , { collection :'hospitales'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
export const HospitalModel: Model<any> = model('Hospital', HospitalSchema);
