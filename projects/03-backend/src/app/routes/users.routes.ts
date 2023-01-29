import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';

/**
 * * /api/users
 */

export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
});
