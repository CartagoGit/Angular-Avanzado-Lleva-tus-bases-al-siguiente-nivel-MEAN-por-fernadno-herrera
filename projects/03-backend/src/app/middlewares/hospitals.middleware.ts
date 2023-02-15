import { RequestHandler } from 'express';
import { check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: RequestHandler[]}}
 */
export const hospitalsMiddlewares: { post: RequestHandler[] } = {
	post: [
		check('name', getMessageErrorValidation('name', { required: true }))
			.not()
			.isEmpty(),

	],
};
