import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';

/**
 * * /api/doctors
 */

/**
 * ? Crea las rutas de medicos y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const doctorsRoutes: Routes = new Routes({
	...coreRoutes.routes,
	
});
