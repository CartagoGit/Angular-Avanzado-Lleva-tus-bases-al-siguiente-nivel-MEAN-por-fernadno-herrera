import { Model, model, Schema } from 'mongoose';

/**
 * ? Crea el esquema del modelo de Doctores en MongoDb
 * @type {Schema<any>}
 */
export const DoctorSchema: Schema<any> = new Schema(
	{
		image: {
			type: String,
		},
		user_creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		hospital: {
			type: Schema.Types.ObjectId,
			ref: 'Hospital',
		},
		//TODO Añadir usuarios que tienen este medico
	}
	//* Si quisieramos cambiar "doctors" por "doctores" al crearse el modelo en mongoDb
	// , { collection :'doctores'}
);

/**
 * ? Reasigna los parametros a mostrar en las respuestas del modelo (no modifica los datos de la base de datos, solo la respuesta)
 */
DoctorSchema.method('toJSON', function () {
	const { __v, _id, ...rest } = this.toObject();

	return { ...rest, id: _id };
});

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
export const DoctorModel: Model<any> = model('Doctor', DoctorSchema);
