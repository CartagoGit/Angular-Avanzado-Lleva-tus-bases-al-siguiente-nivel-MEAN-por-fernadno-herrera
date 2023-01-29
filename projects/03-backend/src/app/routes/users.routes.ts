import { Request, Response } from 'express';
import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { UserModel } from '../models/mongo/user.model';
import {
	defaultErrorResponse,
	getErrorUniqueParam,
} from '../helpers/default-responses';
import { CallbackMethod } from '../interfaces/response.interface';
import { check } from 'express-validator';
import { validatorCheck } from '../middlewares/validator.middleware';
import { getStringErrorUniqueParam } from '../helpers/default-responses';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		// callback: async (req: Request, res: Response) => {
		// 	const email = req.body?.email;
		// 	const existEmail = !!email && (await UserModel.findOne({ email }));
		// 	if (!!existEmail) {
		// 		defaultErrorResponse(
		// 			res,
		// 			req,
		// 			getErrorUniqueParam({ email }),
		// 			'MONGO',
		// 			409
		// 		);
		// 		return;
		// 	}
		// 	(coreRoutes.routes['post'].callback as CallbackMethod)(req, res);
		// },
		middlewares: [
			check('name', 'Name is required').not().isEmpty(),
			check('password', 'Password is required').not().isEmpty(),
			check(
				'email',
				'Email must be an email format, is required and must be unique'
			)
				.isEmail()
				.not()
				.isEmpty()
				.custom(async (email) => {
					const existEmail = await UserModel.findOne({ email });
					if (!!existEmail) {
						return Promise.reject(getStringErrorUniqueParam({ email }));
					}
					return;
				}),
			validatorCheck,
		],
	},
});
