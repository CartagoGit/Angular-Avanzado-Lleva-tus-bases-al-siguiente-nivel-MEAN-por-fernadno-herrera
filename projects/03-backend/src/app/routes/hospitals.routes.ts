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
		modelController: hospitalsController.post,
	},
});
