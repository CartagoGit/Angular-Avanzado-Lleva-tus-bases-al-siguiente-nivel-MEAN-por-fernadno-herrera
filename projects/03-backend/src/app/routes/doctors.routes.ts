import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { doctorsMiddlewares } from '../middlewares/doctors.middleware';

/**
 * * /api/doctors
 */

/**
 * ? Crea las rutas de medicos y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const doctorsRoutes: Routes = new Routes({
	...coreRoutes.routes,
	post: {
		...coreRoutes.routes['post'],
		middlewares: doctorsMiddlewares.post,
	},
	addInList: {
		...coreRoutes.routes['addInList'],
		middlewares: doctorsMiddlewares.addInList,
	},
});
