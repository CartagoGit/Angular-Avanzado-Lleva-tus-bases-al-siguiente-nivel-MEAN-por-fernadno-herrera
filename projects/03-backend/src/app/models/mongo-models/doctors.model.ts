import { Model, model, ObjectId, Schema } from 'mongoose';
import { BaseModel, IBase } from './base.model';
import { HospitalModel, HospitalSchema } from './hospital.model';
import { UserModel } from './user.model';

export interface IDoctor extends IBase {
	images: string;
	user: typeof UserModel;
	hospitals: (typeof HospitalModel)[];
	patients: (typeof UserModel)[];
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
				validate: {
					validator: async function (hospitalId: ObjectId) {
						const doctor = this as IDoctor;
						// const hospitals = doctor.user. ;

						console.log('❗doctor ➽ ⏩', doctor);
						// const hospitals =
						// 	doctor.hospitals as (typeof HospitalSchema.obj)[];
						return false;
						// return !hospitals.some((hospital) =>
						//   hospital.equals(hospitalId)
						// );
					},
					message: (props: typeof HospitalSchema.obj) =>
						`Hospital '${props['name']}' is already assigned to this doctor.`,
				},
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
