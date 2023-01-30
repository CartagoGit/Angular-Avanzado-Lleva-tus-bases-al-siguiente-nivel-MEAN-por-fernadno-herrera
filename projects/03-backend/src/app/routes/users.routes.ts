import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { usersMiddlewares } from '../middlewares/users/users.middleware';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		middlewares: usersMiddlewares.post,
	},
});
