import { check } from 'express-validator';
import { getMessageErrorValidation } from '../helpers/default-responses.helper';

/**
 * ? Middlewares especificos para el modelo de usuarios
 * @type {{ post: any[]}}
 */
export const doctorsMiddlewares: { post: any[]; addInList: any[] } = {
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
		).isArray(),
		check(
			'hospitals.values',
			getMessageErrorValidation('hospitals', { array: true })
		).isArray(),
		check(
			'patients.values.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
		check(
			'hospitals.values.*',
			getMessageErrorValidation('patients', { mongoId: true })
		).isMongoId(),
	],
};
