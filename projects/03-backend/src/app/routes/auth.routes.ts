import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { authController } from '../controllers/auth.controller';
import { authMiddlewares } from '../middlewares/auth.middleware';
import { usersMiddlewares } from '../middlewares/users.middleware';
import { usersController } from '../controllers/users.controller';

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
	register: {
		route: '/register',
		middlewares: usersMiddlewares.post,
		modelController: usersController.post,
		type: 'post',
		hasAdminValidator: false,
		hasSameUserValidator: false,
		hasJwtValidator: false,
	},
	renewToken: {
		route: '/renew-token',
		modelController: authController.renewToken,
		type: 'get',
		hasAdminValidator: false,
		hasSameUserValidator: false,
		hasJwtValidator: true,
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
	googleClientId: {
		route: '/google-client-id',
		type: 'get',
		modelController: authController.googleClientId,
		hasAdminValidator: false,
		hasSameUserValidator: false,
		hasJwtValidator: false,
	},
});
