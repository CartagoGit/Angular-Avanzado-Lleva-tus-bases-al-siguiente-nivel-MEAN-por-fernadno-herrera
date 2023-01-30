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

UserSchema.method('toJSON', function () {
	const { __v, _id, password, ...rest } = this.toObject();

	return { ...rest, id: _id };
});

export const UserModel = model('User', UserSchema);
