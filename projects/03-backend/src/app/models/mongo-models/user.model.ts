import { Model, model, Schema } from 'mongoose';
import { Role } from '../../interfaces/roles.interface';
import { BaseModel, IBase } from './base.model';

export interface IUser extends IBase {
	name: string;
	email: string;
	password: string;
	images: string[];
	role: Role;
	google: boolean;
}
/**
 * ? Crea el esquema del modelo de Usuarios en MongoDb
 * @type {Schema<IUser>}
 */
export const UserSchema: Schema<IUser> = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		images: [
			{
				type: String,
			},
		],
		role: {
			type: String,
			required: true,
			default: 'USER_ROLE' as Role,
		},
		google: {
			type: Boolean,
			default: false,
		},
	}
	// { timestamps: true } //* Añade createdAt y updatedAt
);

// /**
//  * ? Reasigna los parametros a mostrar en las respuestas del modelo (no modifica los datos de la base de datos, solo la respuesta)
//  */
// UserSchema.method('toJSON', function () {
// 	const { __v, _id, password, ...rest } = this.toObject();
// 	return { ...rest, id: _id };
// });

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<IUser>}
 */
export const UserModel: Model<IUser> = model<IUser>(
	'User',
	new Schema(Object.assign({}, BaseModel.schema.obj, UserSchema.obj), {
		timestamps: true,
	})
);
