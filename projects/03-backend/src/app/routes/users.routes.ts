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
	getByQuery: {
		...coreRoutes.routes['getByQuery'],
		modelController: usersController.getByQuery,
	},
	post: {
		...coreRoutes.routes['post'],
		//* Llamamos al controllador de usuarios para este metodo ya que difiere del core
		modelController: usersController.post,
		//* Añadimos middlewares especificos para los usuarios
		middlewares: usersMiddlewares.post,
		hasAdminValidator: false,
		hasJwtValidator: false,
		hasSameUserValidator: false,
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
	//* Especificos de esta BD
	isDoctor: {
		route: '/is-doctor/:id',
		type: 'get',
		modelController: usersController.isDoctor,
		hasAdminValidator: false,
	},
	getDoctors: {
		route: '/get-doctors/:id',
		type: 'get',
		modelController: usersController.getDoctors,
		hasAdminValidator: false,
	},
	getHospitals: {
		route: '/get-hospitals/:id',
		type: 'get',
		modelController: usersController.getHospitals,
		hasAdminValidator: false,
	},
});
