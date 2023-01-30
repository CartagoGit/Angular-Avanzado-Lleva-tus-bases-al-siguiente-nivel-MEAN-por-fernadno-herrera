import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { UserModel } from '../models/mongo/user.model';
import { check } from 'express-validator';
import {
	getErrorUniqueParam,
	getMessageErrorValidation,
} from '../helpers/default-responses';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		middlewares: [
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
	},
});
