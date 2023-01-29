import { model, Schema } from 'mongoose';

export const UserSchema = new Schema({
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
	image: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: 'USER_ROLE',
	},
	google: {
		type: Boolean,
		default: false,
	},
});

export const UserModel = model('User', UserSchema);
