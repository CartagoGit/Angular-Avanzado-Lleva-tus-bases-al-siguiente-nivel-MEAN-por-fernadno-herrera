import { Request, Response } from 'express';
import { coreController } from '../controllers/core.controller';

import { Routes } from '../models/routes.model';
import { rootResponse } from '../helpers/default-responses';
import { getSectionFromUrl } from '../helpers/get-model-section.helper';

/**
 * $ Cualquier colleccion de datos
 */

/**
 * ? Las rutas generales para todas las peticiones
 * @type {Routes}
 */
export const coreRoutes: Routes = new Routes({
	base: {
		route: '/',
		coreController: async (req: Request) => {
			return rootResponse(getSectionFromUrl(req));
		},
		type: 'get',
	},
	getAll: {
		route: '/get-all',
		coreController: coreController.getAll,
		type: 'get',
	},
	getById: {
		route: '/get-by-id/:id',
		coreController: coreController.getById,
		type: 'get',
	},
	post: {
		route: '/post',
		coreController: coreController.post,
		type: 'post',
	},
	put: {
		route: '/put/:id',
		coreController: coreController.put,
		type: 'put',
	},
});
