import { Request, Response } from 'express';
import { Routes } from '../models/routes.model';
import { usersRoutes } from './users.routes';
import { rootResponse } from '../helpers/root-response';

/**
 * * /api/
 */

export const rootRoutes: Routes = new Routes({
	base: {
		route: '/',
		middleware: (_req: Request, res: Response) => {
			rootResponse('home', res);
		},
		type: 'get',
	},
	users: {
		route: '/users',
		middleware: usersRoutes.router,
	},
});
