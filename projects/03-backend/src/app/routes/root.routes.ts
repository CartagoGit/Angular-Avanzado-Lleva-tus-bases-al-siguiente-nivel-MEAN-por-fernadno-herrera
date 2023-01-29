import { Request, Response } from 'express';
import { rootResponse } from '../helpers/default-responses';
import { Routes } from '../models/routes.model';
import { usersRoutes } from './users.routes';


/**
 * * /api/
 */

export const rootRoutes: Routes = new Routes({
	base: {
		route: '/',
		callback: (_req: Request, res: Response) => {
			rootResponse('home', res);
		},
		type: 'get',
	},
	users: {
		route: '/users',
		callback: usersRoutes.router,
		type: 'use',
	},
});
