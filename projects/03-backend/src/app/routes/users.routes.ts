import { Request, Response } from 'express';
import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { UserModel } from '../models/mongo/user.model';
import { defaultErrorResponse } from '../helpers/default-response';
import { CallbackMethod } from '../interfaces/response.interface';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		callback: async (req: Request, res: Response) => {
			const { email } = req.body;
			const existEmail = await UserModel.findOne({ email });
			if (!!existEmail) {
				defaultErrorResponse(
					res,
					req,
					new Error('Email exists in DB. That param must be unique'),
					'MONGO',
					409
				);
				return;
			}
			(coreRoutes.routes['post'].callback as CallbackMethod)(req, res);
		},
	},
});
