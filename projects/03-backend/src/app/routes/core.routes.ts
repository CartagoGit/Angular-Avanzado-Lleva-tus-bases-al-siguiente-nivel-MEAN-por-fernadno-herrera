import { Request } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { rootResponse } from '../helpers/default-responses';
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
		coreController: coreController.getAll,
		type: 'get',

	},
	getById: {
		route: '/get-by-id/:id',
		hasJwtValidator: true,
		coreController: coreController.getById,
		type: 'get',
	},
	getByQuery: {
		route: '/get-by-query/',
		hasJwtValidator: true,
		coreController: coreController.getByQuery,
		type: 'get',
	},
	post: {
		hasJwtValidator: false,
		route: '/post',
		coreController: coreController.post,
		type: 'post',
	},
	put: {
		hasJwtValidator: true,
		route: '/put/:id',
		coreController: coreController.put,
		type: 'put',
	},

	delete: {
		hasJwtValidator: true,
		route: '/delete/:id',
		coreController: coreController.delete,
		type: 'delete',
	},
	deleteCollection: {
		hasJwtValidator: true,
		route: '/delete-collection',
		coreController: coreController.deleteCollection,
		type: 'delete',
	},
});
