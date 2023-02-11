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
			required: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			unique: true,
			ref: 'User',
			required: true,
			autopopulate: true,
		},
		hospitals: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Hospital',
				required: true,
				unique: true,
				autopopulate: true
			},
		],
		patients: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				unique: true,
				autopopulate: true
			},
		],
	},
	{ timestamps: true }
	//* Si quisieramos cambiar "doctors" por "doctores" al crearse el modelo en mongoDb
	// , { collection :'doctores'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
export const DoctorModel: Model<any> = model('Doctor', DoctorSchema);
