import { Routes } from '../models/routes.model';
import { Request, Response } from 'express';
import { usersController } from '../controllers/users.controller';
import { rootResponse } from '../helpers/root-response';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	base: {
		route: '/',
		middleware: (_req: Request, res: Response) => {
			rootResponse('users', res);
		},
		type: 'get',
	},
	users: {
		route: '/get-all',
		middleware: usersController.getUsers,
	},
	userById: {
		route: '/get-by-id',
		middleware: usersController.getUserById,
	},
});
