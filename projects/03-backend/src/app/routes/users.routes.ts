import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { UserModel } from '../models/mongo/user.model';
import { check } from 'express-validator';
import {
	getStringErrorRequireParam,
	getStringErrorUniqueParam,
} from '../helpers/default-responses';

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
			check('name', getStringErrorRequireParam('name')).not().isEmpty(),
			check('password', getStringErrorRequireParam('password'))
				.not()
				.isEmpty(),
			check(
				'email',
				'Email must be an email format, is required and must be unique'
			)
				.isEmail()
				.not()
				.isEmpty()
				.custom(async (email) => {
					const existEmail = await UserModel.findOne({ email });
					return (
						!!existEmail &&
						Promise.reject(getStringErrorUniqueParam({ email }))
					);
				}),
			// validatorCheck,
		],
	},
});
