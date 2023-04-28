import { Model, model, Schema, ObjectId } from 'mongoose';
import { UserModel } from './user.model';

export interface IBase {
	user_creator: Schema.Types.ObjectId;
	user_modifier: Schema.Types.ObjectId;
}
/**
 * ? Crea el esquema del modelo Base en MongoDb
 * @type {Schema<IBase>}
 */
export const BaseSchema: Schema<IBase> = new Schema(
	{
		user_creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		user_modifier: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	}
	// { timestamps: true }
	//* Si quisieramos cambiar "Bases" por "Basees" al crearse el modelo en mongoDb
	// , { collection :'Basees'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<IBase>}
 */
export const BaseModel: Model<IBase> = model<IBase>('Base', BaseSchema);
