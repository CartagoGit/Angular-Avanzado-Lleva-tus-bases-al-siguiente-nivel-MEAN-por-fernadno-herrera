import { RequestHandler } from 'express';
import { body, check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: RequestHandler[]; addInList: RequestHandler[] }}
 */
export const doctorsMiddlewares: {
	post: RequestHandler[];
	addInList: RequestHandler[];
	removeFromList: RequestHandler[];
} = {
	post: [
		check(
			'user',
			getMessageErrorValidation('user', { required: true, mongoId: true })
		)
			.isMongoId()
			.not()
			.isEmpty(),
	],
	addInList: [
		check(
			'patients.values',
			getMessageErrorValidation('patients', { array: true })
		)
			.if(body('patients.values').notEmpty())
			.isArray(),
		check(
			'hospitals.values',
			getMessageErrorValidation('hospitals', { array: true })
		)
			.if(body('hospitals.values').notEmpty())
			.isArray(),
		check(
			'patients.values.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
		check(
			'hospitals.values.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
	],
	removeFromList: [
		check('patients', getMessageErrorValidation('patients', { array: true }))
			.if(body('patients.values').notEmpty())
			.isArray(),
		check(
			'hospitals',
			getMessageErrorValidation('hospitals', { array: true })
		)
			.if(body('hospitals.values').notEmpty())
			.isArray(),
		check(
			'patients.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
		check(
			'hospitals.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
	],
};
