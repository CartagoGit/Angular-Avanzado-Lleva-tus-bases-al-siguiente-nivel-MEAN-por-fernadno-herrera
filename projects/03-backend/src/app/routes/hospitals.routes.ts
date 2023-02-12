import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { hospitalsMiddlewares } from './../middlewares/hospitals.middleware';
import { hospitalsController } from '../controllers/hospitals.controller';

/**
 * * /api/hospitals
 */

/**
 * ? Crea las rutas de hospitales y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const hospitalsRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		middlewares: hospitalsMiddlewares.post,
	},
	//* Especificos de esta BD
	isDoctor: {
		route: '/is-doctor/:id',
		type: 'get',
		hasAdminValidator: false,
	},
	getDoctors: {
		route: '/get-doctors/:id',
		type: 'get',
		modelController: hospitalsController.getDoctors,
		hasAdminValidator: false,
	},
	getHospitals: {
		route: '/get-patients/:id',
		type: 'get',
		modelController: hospitalsController.getPatients,
		hasAdminValidator: false,
	},
});
