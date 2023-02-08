import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { usersMiddlewares } from '../middlewares/models-middlewares/users.middleware';
import { usersController } from '../controllers/users.controller';

/**
 * * /api/users
 */

/**
 * ? Crea las rutas de usuarios y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const usersRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		//* Llamamos al controllador de usuarios para este metodo ya que difiere del core
		modelController: usersController.post,
		//* Añadimos middlewares especificos para los usuarios
		middlewares: usersMiddlewares.post,
		hasAdminValidator: false,
		hasJwtValidator: false
	},
	put: {
		...coreRoutes.routes['put'],
		modelController: usersController.put,
		middlewares: usersMiddlewares.put,
		hasSameUserValidator: true,
	},

});

