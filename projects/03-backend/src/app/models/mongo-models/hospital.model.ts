import { Model, model, Schema } from 'mongoose';

/**
 * ? Crea el esquema del modelo de Hospitales en MongoDb
 * @type {Schema<any>}
 */
export const HospitalSchema: Schema<any> = new Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
}
//* Si quisieramos cambiar "hospitals" por "hospitales" al crearse el modelo en mongoDb
// , { collection :'hospitales'}
);

/**
 * ? Reasigna los parametros a mostrar en las respuestas del modelo (no modifica los datos de la base de datos, solo la respuesta)
 */
HospitalSchema.method('toJSON', function () {
	const { __v, _id, ...rest } = this.toObject();

	return { ...rest, id: _id };
});

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
export const HospitalModel: Model<any> = model('Hospital', HospitalSchema);
