import { Routes } from '../models/routes.model';
import { coreRoutes } from './core.routes';
import { filesController } from '../controllers/files.controller';
import { filesMiddlewares } from '../middlewares/files.middleware';

/**
 * * /api/files
 */

/**
 * ? Crea las para busquedas generales en cualquier modelo
 * @type {Routes}
 */

export const filesRoutes: Routes = new Routes({
	root: coreRoutes.routes['root'],
	upload: {
		route: '/upload/:nameModel/:typeFile/:id',
		type: 'put',
		modelController: filesController.upload,
		middlewares: [filesMiddlewares.basic].flat(),
		hasAdminValidator: false,
		hasSameUserValidator: true,
	},
});
