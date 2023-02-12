import { Request } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { rootResponse } from '../helpers/default-responses.helper';
import { getSectionFromUrl } from '../helpers/get-model-section.helper';

/**
 * $ Cualquier colleccion de datos
 * * Añadir a las rutas especificas
 */

/**
 * ? Las rutas generales para todas las peticiones
 * @type {Routes}
 */
export const coreRoutes: Routes = new Routes({
	root: {
		route: '/',
		coreController: async (req: Request) => {
			return rootResponse(getSectionFromUrl(req));
		},
		type: 'get',
	},
	getAll: {
		route: '/get-all',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.getAll,
		type: 'get',
	},
	getById: {
		route: '/get-by-id/:id',
		hasJwtValidator: true,
		hasSameUserValidator: true,
		coreController: coreController.getById,
		type: 'get',
	},
	getByQuery: {
		route: '/get-by-query/',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.getByQuery,
		type: 'get',
	},
	post: {
		route: '/post',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.post,
		type: 'post',
	},
	put: {
		route: '/put/:id',
		hasJwtValidator: true,
		hasSameUserValidator: true,
		coreController: coreController.put,
		type: 'put',
	},

	delete: {
		route: '/delete/:id',
		hasJwtValidator: true,
		hasSameUserValidator: true,
		coreController: coreController.delete,
		type: 'delete',
	},
	deleteCollection: {
		route: '/delete-collection',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.deleteCollection,
		type: 'delete',
	},
	addInList: {
		route: '/add-in-list/:id',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.addInList,
		type: 'patch',
	},
	removeFromList: {
		route: '/remove-from-list/:id',
		hasJwtValidator: true,
		hasAdminValidator: true,
		coreController: coreController.removeFromList,
		type: 'patch',
	},
});
