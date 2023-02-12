import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { usersController } from '../controllers/users.controller';
import { usersMiddlewares } from '../middlewares/users.middleware';

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
		hasJwtValidator: false,
	},
	put: {
		...coreRoutes.routes['put'],
		modelController: usersController.put,
		middlewares: usersMiddlewares.put,
		hasAdminValidator: false,
		hasSameUserValidator: true,
	},
	delete: {
		...coreRoutes.routes['delete'],
		hasAdminValidator: false,
		hasSameUserValidator: true,
	},
	isDoctor: {
		route: '/is-doctor/:id',
		type: 'get',
		coreController: usersController.isDoctor,
		hasAdminValidator: false,
	},
});
