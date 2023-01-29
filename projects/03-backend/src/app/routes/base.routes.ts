import { Request, Response } from 'express';
import { Routes } from '../models/routes.model';
import { usersRoutes } from './users.routes';

export const baseRoutes: Routes = new Routes({
	base: {
		route: '/',
		middleware: (_req: Request, res: Response) => {
			res.json({
				message: 'Home Api Backend',
				ok: true,
			});
		},
		type: 'get',
	},
	users: {
		route: '/users',
		middleware: usersRoutes.router,
	},
});
