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
		controller: (_req: Request, res: Response) => {
			rootResponse('home', res);
		},
		type: 'get',
	},
	users: {
		route: '/users',
		controller: usersRoutes.router,
		type: 'use',
	},
});
