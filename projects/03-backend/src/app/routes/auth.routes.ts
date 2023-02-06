import { Routes } from '../models/routes.model';
import { coreController } from '../controllers/core.controller';
import { coreRoutes } from './core.routes';

/**
 * * /api/auth
 */
export const authRoutes: Routes = new Routes({
	root: coreRoutes.routes['root'],
});
