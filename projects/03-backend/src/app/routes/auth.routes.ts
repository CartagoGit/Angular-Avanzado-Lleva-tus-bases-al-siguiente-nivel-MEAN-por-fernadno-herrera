import { Routes } from '../models/routes.model';
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
		modelController: authController.login,
		type: 'post',
		hasAdminValidator: false,
		hasSameUserValidator: false,
		hasJwtValidator: false,
	},
	googleLogin: {
		route: '/google-login',
		type: 'post',
		middlewares: authMiddlewares.googleLogin,
		modelController: authController.googleLogin,
		hasAdminValidator: false,
		hasSameUserValidator: false,
		hasJwtValidator: false,
	},
});
