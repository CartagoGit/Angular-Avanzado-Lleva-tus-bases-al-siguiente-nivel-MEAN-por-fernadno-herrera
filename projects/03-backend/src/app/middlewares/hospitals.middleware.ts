import { check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: any[]}}
 */
export const hospitalsMiddlewares: { post: any[] } = {
	post: [
		check('name', getMessageErrorValidation('name', { required: true }))
			.not()
			.isEmpty(),
		
	],
};
