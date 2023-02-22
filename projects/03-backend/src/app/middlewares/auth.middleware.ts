import { RequestHandler } from 'express';
import { check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{
	login: RequestHandler[];
	googleLogin: RequestHandler[];
}}
 */
export const authMiddlewares: {
	login: RequestHandler[];
	googleLogin: RequestHandler[];
} = {
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
	googleLogin: [
		check(
			'token',
			getMessageErrorValidation('token', { required: true })
		).notEmpty(),
	],
};
