import { check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: any[]}}
 */
export const doctorsMiddlewares: { post: any[] } = {
	post: [
		check(
			'user',
			getMessageErrorValidation('user', { required: true, mongoId: true })
		)
			.isMongoId()
			.not()
			.isEmpty(),
			
	],
};
