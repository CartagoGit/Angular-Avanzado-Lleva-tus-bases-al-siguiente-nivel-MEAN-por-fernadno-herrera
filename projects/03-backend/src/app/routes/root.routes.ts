import { Request, Response } from 'express';
import { rootResponse } from '../helpers/default-responses';
import { Routes } from '../models/routes.model';
import { usersRoutes } from './users.routes';

/**
 * * /api/
 */

/**
 * ? Crea las rutas desde la base de la api
 * @type {Routes}
 */
export const rootRoutes: Routes = new Routes({
	root: {
		route: '/',
		coreController: async (_req: Request) => {
			return rootResponse('home');
		},
		type: 'get',
	},
	users: {
		route: '/users',
		routeRouter: usersRoutes.router,
		type: 'use',
	},
});
