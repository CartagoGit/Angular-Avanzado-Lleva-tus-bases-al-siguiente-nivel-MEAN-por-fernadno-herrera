import { check } from 'express-validator';
import {
	getMessageErrorValidation,
	getErrorUniqueParam,
} from '../../helpers/default-responses';
import { UserModel } from '../../models/mongo-models/user.model';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: any[]; put: any[] }}
 */
export const usersMiddlewares: { post: any[]; put: any[] } = {
	post: [
		check('name', getMessageErrorValidation('name', { required: true }))
			.not()
			.isEmpty(),
		check(
			'password',
			getMessageErrorValidation('password', { required: true })
		)
			.not()
			.isEmpty(),
		check(
			'email',
			getMessageErrorValidation('email', {
				required: true,
				unique: true,
				formated: true,
			})
		)
			.isEmail()
			.not()
			.isEmpty()
			.custom(async (email) => {
				const existEmail = await UserModel.findOne({ email });
				return (
					!!existEmail && Promise.reject(getErrorUniqueParam({ email }))
				);
			}),
	],
	put: [
		check('name', getMessageErrorValidation('name', { required: true }))
			.not()
			.isEmpty(),

		check(
			'email',
			getMessageErrorValidation('email', {
				required: true,
				unique: true,
				formated: true,
			})
		)
			.isEmail()
			.not()
			.isEmpty()
			.custom(async (email) => {
				const existEmail = await UserModel.findOne({ email });
				return (
					!!existEmail && Promise.reject(getErrorUniqueParam({ email }))
				);
			}),
		check('role', getMessageErrorValidation('role', { required: true }))
			.not()
			.isEmpty(),
	],
};
