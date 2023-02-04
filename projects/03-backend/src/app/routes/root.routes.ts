import { Request, Response } from 'express';
import { rootResponse } from '../helpers/default-responses';
import { Routes } from '../models/routes.model';
import { usersRoutes } from './users.routes';

/**
 * * /api/
 */

export const rootRoutes: Routes = new Routes({
	root: {
		route: '/',
		coreController: async (_req: Request, res: Response) => {
			return rootResponse('home', res);
		},
		type: 'get',
	},
	users: {
		route: '/users',
		routeRouter: usersRoutes.router,
		type: 'use',
	},
});
