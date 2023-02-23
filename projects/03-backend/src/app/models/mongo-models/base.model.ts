import { Model, model, Schema } from 'mongoose';
/**
 * ? Crea el esquema del modelo Base en MongoDb
 * @type {Schema<any>}
 */
export const BaseSchema: Schema<any> = new Schema(
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
	},
	// { timestamps: true }
	//* Si quisieramos cambiar "Bases" por "Basees" al crearse el modelo en mongoDb
	// , { collection :'Basees'}
);

/**
 * ? Exporta el modelo de Mongoose
 * @type {Model<any>}
 */
export const BaseModel: Model<any> = model('Base', BaseSchema);
