import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { everywhereController } from '../controllers/everywhere.controller';

/**
 * * /api/everywhere
 */

/**
 * ? Crea las para busquedas generales en cualquier modelo
 * @type {Routes}
 */

export const everywhereRoutes: Routes = new Routes({
	root: coreRoutes.routes['root'],
	getFromEverywhere: {
		route: '/get-from/:field/:search',
		type: 'get',
		modelController: everywhereController.getFrom
	},
});
