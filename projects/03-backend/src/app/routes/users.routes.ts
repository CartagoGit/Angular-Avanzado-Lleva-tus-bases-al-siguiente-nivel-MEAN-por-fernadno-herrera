import { Routes } from '../models/routes.model';
import { Request, Response } from 'express';

export const usersRoutes: Routes = new Routes({
	base: {
		route: '/',
		middleware: (_req: Request, res: Response) => {
			res.json({
				message: 'really? Api Backend',
				ok: true,
			});
		},
		type: 'get',
	},
	users: {
		route: '/users',
		middleware: (_req: Request, res: Response) => {
			res.json({
				message: 'Users Home Api',
				ok: true,
			});
		},
	},
});
