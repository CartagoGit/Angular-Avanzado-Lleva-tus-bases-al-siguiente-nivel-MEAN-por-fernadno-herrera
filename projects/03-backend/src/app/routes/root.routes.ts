import { Request } from 'express';
import { rootResponse } from '../helpers/default-responses';
import { Routes } from '../models/routes.model';
import { authRoutes } from './auth.routes';
import { hospitalsRoutes } from './hospitals.routes';
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
	auth: {
		route: '/auth',
		routeRouter: authRoutes.router,
		type: 'use',
	},
	users: {
		route: '/users',
		routeRouter: usersRoutes.router,
		type: 'use',
	},
	hospitals: {
		route: '/hospitals',
		routeRouter: hospitalsRoutes.router,
		type: 'use',
	},
});
