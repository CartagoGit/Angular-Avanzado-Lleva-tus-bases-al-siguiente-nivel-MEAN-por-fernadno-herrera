import { Model, model, ObjectId, Schema } from 'mongoose';
import { BaseModel, IBase } from './base.model';
import { HospitalSchema } from './hospital.model';
import { UserSchema } from './user.model';

export interface IDoctor extends IBase {
	images: string;
	user: typeof UserSchema.obj;
	hospitals: (typeof HospitalSchema.obj)[];
	patients: (typeof UserSchema.obj)[];
}
/**
 * ? Crea el esquema del modelo de Doctores en MongoDb
 * @type {Schema< IDoctor>}
 */
export const DoctorSchema: Schema<IDoctor> = new Schema(
	{
		images: [
			{
				type: String,
			},
		],

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
				// unique: true,
				autopopulate: true,
			},
		],
		patients: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				unique: true,
				autopopulate: true,
			},
		],
	}
	// { timestamps: true }
	//* Si quisieramos cambiar "doctors" por "doctores" al crearse el modelo en mongoDb
	// , { collection :'doctores'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<IDoctor>}
 */
export const DoctorModel: Model<IDoctor> = model<IDoctor>(
	'Doctor',
	new Schema(Object.assign({}, BaseModel.schema.obj, DoctorSchema.obj), {
		timestamps: true,
	})
);
