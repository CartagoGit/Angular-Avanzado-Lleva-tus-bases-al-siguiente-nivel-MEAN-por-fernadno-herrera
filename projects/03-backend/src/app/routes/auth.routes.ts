import { Routes } from '../models/routes.model';
import { coreController } from '../controllers/core.controller';
import { coreRoutes } from './core.routes';
import { authController } from '../controllers/auth.controller';
import { authMiddlewares } from '../middlewares/auth.middleware';

/**
 * * /api/auth
 */

/**
 * ? Crea las rutas de para autenticacion y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const authRoutes: Routes = new Routes({
	root: coreRoutes.routes['root'],
	login: {
		route: '/login',
		middlewares: authMiddlewares.login,
		coreController: authController.login,
		type: 'post',
	},
});
