import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';

/**
 * * /api/hospitals
 */

/**
 * ? Crea las rutas de usuarios y añade los middlewares y controladores especificos que difieren del general, con validaciones y comprobaciones
 * @type {Routes}
 */
export const hospitalsRoutes: Routes = new Routes({
	...coreRoutes.routes,
});
