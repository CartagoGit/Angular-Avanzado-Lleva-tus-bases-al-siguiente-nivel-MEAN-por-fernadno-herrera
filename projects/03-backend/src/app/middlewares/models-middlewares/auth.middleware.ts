import { check } from 'express-validator';
import { getMessageErrorValidation } from '../../helpers/default-responses';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: any[]; put: any[] }}
 */
export const authMiddlewares: { login: any[] } = {
	login: [
		check(
			'email',
			getMessageErrorValidation('email', { required: true, formated: true })
		)
			.isEmail()
			.not()
			.isEmpty(),
		check(
			'password',
			getMessageErrorValidation('password', { required: true })
		)
			.not()
			.isEmpty(),
	],
};
